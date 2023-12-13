export interface Config {
  [key:string]: MocQ<unknown>
}

export type MocQ<T> = {
  generator: DataSource<T>
  count: number
  connections?: {
    [key: string]: (data: any[]) => Overrides<T>
  }
  handler?: (data: any[]) => Promise<unknown | void> | unknown | void
}

export type DataSource<T> = {
  [K in keyof T]: (index?: number) => unknown
}

export type Overrides<T> = Partial<{
  [K in keyof T]: (index?: number) => unknown
}>