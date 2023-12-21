import { logger, emphasisLogText, emphasisErrorText, muteLogText } from './logger'
import { Config } from "./types";

export const generate = <T extends Config>(
  config: T,
  executionOrder: Array<keyof typeof config>
): { [K in keyof T]: ReturnType<T[K]['generator']>[] } => {
  logger.info('data generation init...')
  const result: { [K in keyof T]: ReturnType<T[K]['generator']>[] } = {} as any

  for(const key of executionOrder) {
    logger.system('generation', String(key))
    
  const { generator, count, connections } = config[key as keyof T]
  const data: ReturnType<T[typeof key]['generator']>[] = []

  for(let i = 0; i < count; i++) {
    const generatedData = generator(i);
    if (typeof generatedData !== 'object') {
      const message = (emphasisFn: (x: string) => string) => `generator for key ${emphasisFn(String(key))} must return an object`
      logger.error(message(emphasisLogText))
      throw new Error(message(emphasisErrorText))
    }

    if (connections) {
      let mergedData = { ...generatedData } as ReturnType<T[typeof key]['generator']>
      for (const connectionKey in connections) {
        i==0&&logger.system('connection', `${connectionKey} ➜ ${String(key)}`)
        if (!(connectionKey in config)) {
          i==0&&logger.warn(`${emphasisLogText(String(key))} connection key ${emphasisLogText(String(connectionKey))} is not present in config ${muteLogText('skipped')}`)
        } else {
          const connectionFn = connections[connectionKey]
          const connectionData = connectionFn(i, result[connectionKey as keyof T])
          if (typeof connectionData !== 'object') {
            const message = (emphasisFn: (x: string) => string) => `${emphasisFn(String(key))} connection key ${emphasisFn(String(connectionKey))} must return an object`
            logger.error(message(emphasisLogText))
            throw new Error(message(emphasisErrorText))
          }
          mergedData = { ...mergedData, ...connectionData } as ReturnType<T[typeof key]['generator']>
        }
      }
      data.push(mergedData)
    } else {
      data.push(generatedData as ReturnType<T[typeof key]['generator']>)
    }
  }

  result[key as keyof T] = data as ReturnType<T[typeof key]['generator']>[]
}
return result
}