export interface Config {
  [key:string]: MocQ<any>
}

export type MocQ<T> = {
  generator: MockDataGenerator<T>
  count: number
  connections?: {
    [key: string]: MockDataConnection<T>
  }
  handler?: MockDataHandler<T>
}

export type MockDataGenerator<T> = (index: number) => T

export type MockDataConnection<T> = (index: number, connectionKeyData: any[]) => Partial<T>

export type MockDataHandler<T> = (data: T[]) => Promise<void> | void
