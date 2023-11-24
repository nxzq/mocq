export type DataSource = {
  [key: string]: CallableFunction
}

export type Generator<T=unknown> = {
  generate: (props?: { count?: number, overrides?: Overrides<T>}) => T[]
}

/*
  extends Record<string, string>
*/

export type Overrides<T> = Partial<{
  [K in keyof T]: CallableFunction
}>

export type Action<T> = {
  name: string
  generator: Generator<T>
  count: number
  handler?: {
    execType: 'batch' | 'iterate'
    callback: () => Promise<void>
    concurrency?: number
  }
  connections?: {
    actionName: string
    // possible connection helper function
    // merge?: string
    // orphanRate?: number
    callback: (data: any[]) => Overrides<T>
  }[]
}

export type Workflow = {
  preHandler?: CallableFunction
  actions: Action[]
  postHandler?: CallableFunction
}