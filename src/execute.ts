import { logger, emphasisLogText } from './logger'
import { MocQ, InferMocQGeneric } from './types'
import { getErrorMessage } from './utils'

export const execute = async <T extends { [K in keyof T]: MocQ<InferMocQGeneric<T[K]>> }>(
  config: T,
  data: { [K in keyof T]: InferMocQGeneric<T[K]>[] },
  executionOrder: Array<keyof T>
): Promise<void> => {
  logger.info('data execution init...')
  for (const key of executionOrder) {
    const configuration = config[key]
    const { handler } = configuration as MocQ<InferMocQGeneric<typeof configuration>>
    if (handler !== undefined) {
      logger.system('execution', String(key))
      try {
        await handler(data[key])
      } catch (e: unknown) {
        logger.error(`error occurred while executing handler for key ${emphasisLogText(String(key))}`)
        throw new Error(getErrorMessage(e))
      }
    }
  }
  logger.success('data execution complete')
}
