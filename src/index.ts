import { validate } from './validate'
import { generate } from './generate'
import { execute } from './execute'
import { MocQ, InferMocQGeneric } from './types'

export * from './types'
/** 
 * data creation, connection & execution coordination utility
 * @docs [[mocq] documentation](https://nxzq.github.io/mocq/) 
*/
export const mocq = <T extends { [K in keyof T]: MocQ<InferMocQGeneric<T[K]>> }>(config: T) => {
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
