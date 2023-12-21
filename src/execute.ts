import { Config } from './types'
import { logger, emphasisLogText } from './logger'

export const execute = async <T extends Config>(
  config: T,
  data: { [K in keyof T]: ReturnType<T[K]["generator"]>[]; },
  executionOrder: Array<keyof typeof config>
): Promise<void> => {
      logger.info('data execution init...')
      for (const key of executionOrder) {
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
}