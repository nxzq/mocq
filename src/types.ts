export interface Config {
  [key:string]: MocQ<object>
}

export type MocQ<T> = {
  generator: MockDataGenerator<T>
  count: number
  connections?: {
    [key: string]: MockDataConnection<T>
  }
  handler?: MockDataHandler
}

export type MockDataGenerator<T> = (index: number) => T

export type MockDataConnection<T> = (index: number, connectionKeyData: any[]) => Partial<T>

export type MockDataHandler = (data: any[]) => Promise<void> | void
