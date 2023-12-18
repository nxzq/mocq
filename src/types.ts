export interface Config {
  [key:string]: MocQ<object>
}

export type MocQ<T extends object> = {
  generator: MockDataGenerator<T>
  count: number
  connections?: {
    [key: string]: (data: any[]) => Overrides<T>
  }
  handler?: (data: any[]) => Promise<unknown | void> | unknown | void
}

export type MockDataGenerator<T> = (index: number) => T

export type Overrides<T> = Partial<{
  [K in keyof T]: (index?: number) => unknown
}>