import { logger, emphasisLogText, emphasisErrorText, muteLogText } from './logger'
import { MocQ, InferMocQGeneric } from './types'

export const generate = <T extends { [K in keyof T]: MocQ<InferMocQGeneric<T[K]>> }>(
  config: T,
  executionOrder: Array<keyof T>
): { [K in keyof T]: InferMocQGeneric<T[K]>[] } => {
  logger.info('data generation init...')
  const result = {} as { [K in keyof T]: InferMocQGeneric<T[K]>[] }

  for(const key of executionOrder) {
    logger.system('generation', String(key))
    
    const configuration = config[key]
    const { generator, count, connections } = configuration as MocQ<InferMocQGeneric<typeof configuration>>
    const data = []

    for(let i = 0; i < count; i++) {
      const generatedData = generator(i)
      if (typeof generatedData !== 'object') {
        const message = (emphasisFn: (x: string) => string) => `generator for key ${emphasisFn(String(key))} must return an object`
        logger.error(message(emphasisLogText))
        throw new Error(message(emphasisErrorText))
      }

      if (connections) {
        let mergedData = { ...generatedData }
        for (const connectionKey in connections) {
          i==0&&logger.system('connection', `${connectionKey} ➜ ${String(key)}`)
          if (!(connectionKey in config)) {
            i==0&&logger.warn(`${emphasisLogText(String(key))} connection key ${emphasisLogText(String(connectionKey))} is not present in config ${muteLogText('skipped')}`)
          } else {
            const connectionFn = connections[connectionKey]
            const connectionData = connectionFn(result[connectionKey as keyof T], i, mergedData)
            if (typeof connectionData !== 'object') {
              const message = (emphasisFn: (x: string) => string) => `${emphasisFn(String(key))} connection key ${emphasisFn(String(connectionKey))} must return an object`
              logger.error(message(emphasisLogText))
              throw new Error(message(emphasisErrorText))
            }
            mergedData = { ...mergedData, ...connectionData }
          }
        }
        data.push(mergedData)
      } else {
        data.push(generatedData)
      }
    }

    result[key] = data 
  }
  logger.success('data generation complete')
  return result
}
