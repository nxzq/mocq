
import { validate } from './validate'
import { createGenerator } from './generator'
import { Config, MocQ, MockDataGenerator } from './types'
import { logger, emphasisLogText } from './logger'

type extractMocQType<T> = T extends MocQ<infer X> ? X : unknown

export * from './types'
export const mocq = <T>(config: T extends Config ? T : Config) => {
  const keys = validate(config)
  type extractGeneric<T> = T extends MockDataGenerator<infer X> ? X : unknown
  const generate = () => {
    logger.info('data generation init...')
    const context = Object.assign({}, ...keys.map(x => {
      const _tmp = config[x]
      return {x: [] as extractMocQType<typeof _tmp>[]}
    })) as { [K in keyof typeof config]: extractMocQType<typeof config[K]>[]}
    for (const key of keys) {
      logger.system('generation', String(key))
      const _dataSource = config[key].generator
      type _type = extractGeneric<typeof _dataSource>
      const _generator = createGenerator<_type>(_dataSource)
      if (config[key].connections) {
        let overrides = {}
        for (const connection in config[key].connections) {
          logger.system('connection', `${connection} ➜ ${String(key)}`)
          overrides = { ...overrides, ...config[key].connections![connection](context[connection])}
        }
        Object.defineProperty(context, key, {
          value: _generator.generate({ count: config[key].count, overrides }) as _type[]
        });
      }
      else {
        Object.defineProperty(context, key, {
          value: _generator.generate({ count: config[key].count }) as _type[]
        });
      }
    }
    logger.success('data generation complete')
    return context
  }
  return {
    generate,
    execute: async () => {
      const data = generate()
      logger.info('data execution init...')
      for (const key of keys) {
        if (config[key].handler !== undefined) {
          logger.system('execution', String(key))
          try {
            await config[key].handler!(data[key])
          } catch (e: Error | any) {
            logger.error(`error occurred while executing handler for key "${emphasisLogText(String(key))}"`)
            throw new Error(e.message)
          }
        }
      }
      logger.success('data execution complete')
      return { data }
    }
  }
}