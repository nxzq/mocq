import { validate } from './validate'
import { generate } from './generate'
import { execute } from './execute'
import { Config } from './types'

export * from './types'
export const mocq = <T>(config: T extends Config ? T : Config) => {
  const keys = validate(config)
  return {
    generate: () => ({ data: generate(config, keys) }),
    execute: async () => {
      const data = generate(config, keys)
      await execute(config, data, keys)
      return { data }
    }
  }
}