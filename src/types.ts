export type DataSource = {
  [key: string]: CallableFunction
}

export type Generator<T=unknown> = {
  generate: (props?: { count?: number, overrides?: Overrides<T>}) => T[]
}

export type Overrides<T> = Partial<{
  [K in keyof T]: CallableFunction
}>

export type Connection = {
  [key: string]: CallableFunction
}

export type BatchHandler = ((data: any[]) => Promise<unknown | void> | unknown | void)
export type IterateHandler = ((data: any) => Promise<unknown | void> | unknown | void)

export type Config = {
  [key:string]: {
    generator: Generator
    count: number
    connections?: {
      [key: string]: (data: any[]) => Connection
    }
    handler?: {
      execType: 'batch' | 'iterate'
      callback: BatchHandler | IterateHandler
      // concurrency?: number
    }
  }
}
