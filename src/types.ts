/* eslint-disable @typescript-eslint/no-explicit-any */

/** 
 * generic configuration interface 
 * @see MocQ for implementation details
 * @docs [[mocq] documentation](https://nxzq.github.io/mocq/) 
*/
export interface Config {
  [key: string]: MocQ<any>
}

/** 
 * data object configuration syntax
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api)
 * @example
 * ```typescript
 * type User = {
 *   name: string
 * };
 * 
 * type mocqConfig = {
 *    users: MocQ<User>
 * };
 * 
 * const config: mocqConfig = {
 *   users: {
 *     // ...
 *   }
 * };
 * 
 * const { generate, execute } = mocq(config);
 * ```
*/
export type MocQ<T extends object> = {
  generator: DataGenerator<T>
  count: number
  connections?: {
    [key: string]: DataConnection<T>
  }
  handler?: DataHandler<T>
}

/** 
 * infer base data object type from MocQ configuration type 
 * @see MocQ for implementation details 
 * @docs [[mocq] documentation](https://nxzq.github.io/mocq/) 
*/
export type inferMocQGeneric<X> = X extends MocQ<infer T> ? T : unknown

/** 
 * generic function to create an instance of data object
 * @see MocQ for implementation details 
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#generator---required) 
*/
export type DataGenerator<T extends object> = (index: number) => T

/** 
 * generic function to amend an instance of data object
 * @see MocQ for implementation details 
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#connections---optional)
*/
export type DataConnection<T extends object> = (connectionKeyData: any[], index: number, indexData: T) => Partial<T>

/** 
 * function to run against generated data when `execute()` is invoked
 * @see MocQ for implementation details 
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#handler---optional)
*/
export type DataHandler<T extends object> = (data: T[]) => Promise<void> | void
