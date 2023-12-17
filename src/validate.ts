import { logger } from "./logger"
import { Config } from "."

export const validate = <T>(config: T extends Config ? T : Config) => {
  logger.info('validating config and determining execution order...')
  const configurationKeys = Object.keys(config) as Array<keyof typeof config>
  function orderByDependencies(arr: Array<keyof typeof config>) {
    const visited = new Set()
    const sorted = [] as Array<keyof typeof config>
    const tempStack = new Set()
  
    function visit(key: keyof typeof config) {
      if (tempStack.has(key)) {
        logger.error(`Cyclic dependencies detected involving key "${String(key)}"\n\t↳set \x1b[0;36mMOCQ_VERBOSE\x1b[0m env variable to \x1b[0;36mtrue\x1b[0m to help debug`)
      }
  
      if (!visited.has(key)) {
        logger.system('validation', key)
        tempStack.add(key)
        if (config[key].connections !== undefined) {
          Object.keys(config[key].connections!).forEach(connectionKey => {
            logger.system('evaluation', `${connectionKey} ➜ ${String(key)}`)
            const dependency = arr.find(key => key === connectionKey)
            if (connectionKey === key)
              logger.error(`key "${connectionKey}" cannot reference itself in connections`)
            if (dependency) {
              visit(dependency)
            } else 
              logger.error(`key "${connectionKey}" is not present in config but referenced in key "${String(key)}" connections`)
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