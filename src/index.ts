
import { createGenerator } from './generator'
import { Config, MocQ, DataSource } from './types'
import { logger } from './logger'

const dataGenLogPrefix = '\x1b[0;32m[generating mock data]\x1b[0m'

type extractMocQType<T> = T extends MocQ<infer X> ? X : unknown

export const mocq = <T>(config: T extends Config ? T : Config) => {
  const actions = Object.keys(config) as Array<keyof typeof config>
  // TODO: set + length check to removed dupes (throw error)
  // TODO: create execution order (throw error for cyclical connections)
  type extractGeneric<T> = T extends DataSource<infer X> ? X : unknown
  const generate = () => {
    logger.log('\x1b[0;36mdata generation init...\x1b[0m')
    const context = Object.assign({}, ...actions.map(x => {
      const _tmp = config[x]
      return {x: [] as extractMocQType<typeof _tmp>[]}
    })) as { [K in keyof typeof config]: extractMocQType<typeof config[K]>[]}
    for (const action of actions) {
      logger.log(`${dataGenLogPrefix} ${String(action)}`)
      const _dataSource = config[action].generator
      type _type = extractGeneric<typeof _dataSource>
      const _generator = createGenerator<_type>(_dataSource)
      if (config[action].connections) {
        let overrides = {}
        for (const connection in config[action].connections) {
          logger.log(`\x1b[0;34m[connecting mock data]\x1b[0m ${connection} -> ${String(action)}`)
          overrides = { ...overrides, ...config[action].connections![connection](context[connection])}
        }
        Object.defineProperty(context, action, {
          value: _generator.generate({ count: config[action].count, overrides }) as _type[]
        });
      }
      else {
        Object.defineProperty(context, action, {
          value: _generator.generate({ count: config[action].count }) as _type[]
        });
      }
    }
    logger.log('\x1b[0;36mdata generation complete ✅\x1b[0m')
    return context
  }
  return {
    generate,
    execute: () => {
      const data = generate()
      logger.log('\x1b[0;36mdata execution init...\x1b[0m')
      for (const action of actions) {
        if (config[action].handler !== undefined) {
          logger.log(`\x1b[0;35m[executing mock data handler]\x1b[0m ${String(action)}`)
          config[action].handler!(data[action])
        }
      }
      logger.log('\x1b[0;36mdata execution complete ✅\x1b[0m')
      return { data }
    }
  }
}

export * from './types'