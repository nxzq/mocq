/* eslint-disable @typescript-eslint/no-explicit-any */

/** @see MocQ for implementation details */
export interface Config {
  [key: string]: MocQ<any>
}

/** {@link [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api)} */
export type MocQ<T extends object> = {
  generator: DataGenerator<T>
  count: number
  connections?: {
    [key: string]: DataConnection<T>
  }
  handler?: DataHandler<T>
}

/** {@link [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#generator---required)} */
export type DataGenerator<T> = (index: number) => T

/** {@link [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#connections---optional)} */
export type DataConnection<T> = (connectionKeyData: any[], index: number, indexData: T) => Partial<T>

/** {@link [[mocq] API documentation](https://nxzq.github.io/mocq/docs/api#handler---optional)} */
export type DataHandler<T> = (data: T[]) => Promise<void> | void
