import { logger, emphasisLogText, mocqLogText } from "./logger"
import { Config } from "./types"

export const validate = <T>(config: T extends Config ? T : Config) => {
  logger.info('validating config and determining execution order...')
  const configurationKeys = Object.keys(config) as Array<keyof typeof config>
  function orderByDependencies(arr: Array<keyof typeof config>) {
    const visited = new Set()
    const sorted = [] as Array<keyof typeof config>
    const tempStack = new Set()
  
    function visit(key: keyof typeof config) {
      if (tempStack.has(key)) {
        const message = `cyclic dependencies detected involving key ${emphasisLogText(String(key))}`
        logger.error(`${message}\n\t↳ set ${mocqLogText('MOCQ_VERBOSE')} env variable to ${mocqLogText('true')} to help debug`)
        throw new Error(message)
      }
  
      if (!visited.has(key)) {
        logger.system('validation', key)
        if (typeof config[key].generator !== 'function') {
          const message = `generator for key ${emphasisLogText(String(key))} must be a function`
          logger.error(message)
          throw new Error(message)
        }
        if (typeof config[key].generator(0) !== 'object') {
          const message = `generator for key ${emphasisLogText(String(key))} must return an object`
          logger.error(message)
          throw new Error(message)
        }
        tempStack.add(key)
        if (config[key].connections !== undefined) {
          Object.keys(config[key].connections!).forEach(connectionKey => {
            logger.system('evaluation', `${connectionKey} ➜ ${String(key)}`)
            const dependency = arr.find(key => key === connectionKey)
            if (connectionKey === key) {
              const message = `key ${emphasisLogText(connectionKey)} cannot reference itself in connections`
              logger.error(message)
              throw new Error(message) 
            }
            if (typeof config[key].connections![connectionKey] !== 'function') {
              const message = `${emphasisLogText(String(key))} connection key ${emphasisLogText(String(connectionKey))} must be a function`
              logger.error(message)
              throw new Error(message)
            }
            if (dependency) {
              visit(dependency)
            } else {
              const message = `connection key ${emphasisLogText(connectionKey)} is not present in config but referenced in ${emphasisLogText(String(key))}`
              logger.error(message)
              throw new Error(message)
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