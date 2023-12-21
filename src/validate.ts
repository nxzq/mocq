import { logger, emphasisLogText, emphasisErrorText, mocqLogText } from './logger'
import { Config } from "./types"

export const validate = <T>(config: T extends Config ? T : Config): Array<keyof typeof config> => {
  logger.info('validating config and determining execution order...')
  const configurationKeys = Object.keys(config) as Array<keyof typeof config>
  function orderByDependencies(arr: Array<keyof typeof config>) {
    const visited = new Set()
    const sorted = [] as Array<keyof typeof config>
    const tempStack = new Set()
  
    function visit(key: keyof typeof config) {
      if (tempStack.has(key)) {
        const message = (emphasisFn: (x: string) => string) => `cyclic dependencies detected involving key ${emphasisFn(String(key))}`
        logger.error(`${message(emphasisLogText)}\n\t↳ set ${mocqLogText('MOCQ_VERBOSE')} env variable to ${mocqLogText('true')} to help debug`)
        throw new Error(message(emphasisErrorText))
      }
  
      if (!visited.has(key)) {
        logger.system('validation', key)
        if (typeof config[key].generator !== 'function') {
          const message = (emphasisFn: (x: string) => string) => `generator for key ${emphasisFn(String(key))} must be a function`
          logger.error(message(emphasisLogText))
          throw new Error(message(emphasisErrorText))
        }
        const sampleGeneratorReturn = config[key].generator(0)
        if (typeof sampleGeneratorReturn !== 'object') {
          const message = (emphasisFn: (x: string) => string) => `generator for key ${emphasisFn(String(key))} must return an object`
          logger.error(message(emphasisLogText))
          throw new Error(message(emphasisErrorText))
        }
        tempStack.add(key)
        if (config[key].connections !== undefined) {
          Object.keys(config[key].connections!).forEach(connectionKey => {
            logger.system('evaluation', `${connectionKey} ➜ ${String(key)}`)
            const dependency = arr.find(key => key === connectionKey)
            if (connectionKey === key) {
              const message = (emphasisFn: (x: string) => string) => `key ${emphasisFn(connectionKey)} cannot reference itself in connections`
              logger.error(message(emphasisLogText))
              throw new Error(message(emphasisErrorText)) 
            }
            if (typeof config[key].connections![connectionKey] !== 'function') {
              const message = (emphasisFn: (x: string) => string) => `${emphasisFn(String(key))} connection key ${emphasisFn(String(connectionKey))} must be a function`
              logger.error(message(emphasisLogText))
              throw new Error(message(emphasisErrorText))
            }
            const sampleConnectionReturn = config[key].connections![connectionKey](0, [config[key].generator(0)])
            if (typeof sampleConnectionReturn !== 'object') {
              const message = (emphasisFn: (x: string) => string) => `${emphasisFn(String(key))} connection key ${emphasisFn(String(connectionKey))} must return an object`
              logger.error(message(emphasisLogText))
              throw new Error(message(emphasisErrorText))
            }
            if (dependency) {
              visit(dependency)
            } else {
              const message = (emphasisFn: (x: string) => string) => `connection key ${emphasisFn(connectionKey)} is not present in config but referenced in ${emphasisFn(String(key))}`
              logger.error(message(emphasisLogText))
              throw new Error(message(emphasisErrorText))
            }
          })
        }
        visited.add(key)
        sorted.push(key)
        tempStack.delete(key)
      }
    }
  
    arr.forEach(key => {
      visit(key)
    })

    return sorted
  }
  const keys = orderByDependencies(configurationKeys)
  logger.success('config valid, execution order set')
  logger.log(`\t↳ ${keys.join(' ➜ ')}`)
  return keys
}