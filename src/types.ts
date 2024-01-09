export interface Config {
  [key: string]: MocQ<object>
}

export type MocQ<T> = {
  generator: DataGenerator<T>
  count: number
  connections?: {
    [key: string]: DataConnection<T>
  }
  handler?: DataHandler
}

export type DataGenerator<T> = (index: number) => T

export type DataConnection<T> = (index: number, connectionKeyData: any[]) => Partial<T>

export type DataHandler = (data: any[]) => Promise<void> | void
