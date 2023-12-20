
import { validate } from './validate'
import { generate } from './generate'
import { Config } from './types'
import { logger, emphasisLogText } from './logger'

export const mocq = <T>(config: T extends Config ? T : Config) => {
  const keys = validate(config)
  return {
    generate: () => generate(config, keys),
    execute: async () => {
      const data = generate(config, keys)
      logger.info('data execution init...')
      for (const key of keys) {
        if (config[key].handler !== undefined) {
          logger.system('execution', String(key))
          try {
            await config[key].handler!(data[key])
          } catch (e: Error | any) {
            logger.error(`error occurred while executing handler for key ${emphasisLogText(String(key))}`)
            throw new Error(e.message)
          }
        }
      }
      logger.success('data execution complete')
      return { data }
    }
  }
}