/* eslint-disable @typescript-eslint/no-explicit-any */

/** 
 * @deprecated use {@link MocQ} type for each individual key instead
 * generic configuration interface 
 * @see MocQ for implementation details
 * @docs [[mocq] documentation](https://nxzq.github.io/mocq/) 
*/
export interface Config {
  [key: string]: MocQ<object>
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
export type InferMocQGeneric<X extends object> = X extends MocQ<infer T> ? T : object

/** 
 * generic function to create an instance of data object
 * @see MocQ for implementation details 
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#generator---required) 
*/
export type DataGenerator<T extends object> = (index: number) => T

/** 
 * generic function to amend an instance of data object with data from another data object
 * @see MocQ for implementation details 
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#connections---optional)
*/
export type DataConnection<T extends object> = (connectionKeyData: any[], index: number, indexData: T) => Partial<T>

/** 
 * function to run against resolved data when `execute()` is invoked
 * @see MocQ for implementation details 
 * @docs [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#handler---optional)
*/
export type DataHandler<T extends object> = (data: T[]) => Promise<void> | void
