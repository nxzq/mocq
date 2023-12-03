export { createGenerator as generator } from './generator'
import { Config } from './types'

export const mocq = (config: Config) => {
  const actions = Object.keys(config)
  // TODO: set + length check to removed dupes (throw error)
  console.log('🚧 actions: ', actions)
  // TODO: create execution order (throw error for cyclical connections)
  const generate = () => {
    const context: { [K in keyof Config]: any[] } = {}
    for (const action of actions) {
      if (config[action].connections) {
        let overrides = {}
        for (const connection in config[action].connections) {
          overrides = { ...overrides, ...config[action].connections![connection](context[connection])}
        }
        Object.defineProperty(context, action, {
          value: config[action].generator.generate({ count: config[action].count, overrides })
        });
      }
      else {
        Object.defineProperty(context, action, {
          value: config[action].generator.generate({ count: config[action].count })
        });
      }
    }
    return context
  }
  return {
    generate,
    execute: () => {
      const data = generate()
      for (const action of actions) {
        if (config[action].handler) {
          if (config[action].handler!.execType === 'batch')
            config[action].handler!.callback(data[action])
          else if (config[action].handler!.execType === 'iterate')
            data[action].map(x => config[action].handler!.callback(x))
        }
      }
      return { data }
    }
  }
}
