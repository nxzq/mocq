const log = (...params: any): void => {
  {
    const verbose = process.env.MOCQ_VERBOSE
    if (verbose === 'true')
      console.log(...params)
  }
}

const prefix = '\x1b[0;36mmocq\x1b[0m'

type systemLogType = 'generation' | 'connection' | 'execution' | 'evaluation' | 'validation' 

export const logger = {
  info: (content: string): void => {
    log(prefix, `\x1b[0;36m${content}\x1b[0m`)
  },
  error: (content: string): void => {
    console.error(prefix, '\x1b[1;31m[ERROR]\x1b[0m', content)
    throw new Error(content)
  },
  success: (content: any): void => {
    console.log(prefix, `\x1b[1;32m${content} ✅\x1b[0m`)
  },
  log: (...content: any): void => {
    log(...content)
  },
  system: (type: systemLogType, ...content: any): void => {
    if (type === 'connection')
      log(prefix, '\x1b[0;34m[connecting mock data]\x1b[0m', ...content)
    if (type === 'evaluation')
      log(prefix, '\x1b[0;30m[evaluating connection]\x1b[0m', ...content)
    if (type === 'execution')
      log(prefix, '\x1b[0;35m[executing mock data handler]\x1b[0m', ...content)
    if (type === 'generation')
      log(prefix, '\x1b[0;32m[generating mock data]\x1b[0m', ...content)
    if (type === 'validation')
      log(prefix, '\x1b[0;30m[validating configuration]\x1b[0m', ...content)
  },
  // warn: (content: any): void => {
  //   console.warn(prefix, '\x1b[1;33m[WARNING]\x1b[0m', content)
  // },
}