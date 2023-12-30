const log = (...params: any): void => {
  {
    const verbose = process.env.MOCQ_VERBOSE
    if (verbose === 'true')
      console.log(...params)
  }
}

type systemLogType = 'generation' | 'connection' | 'execution' | 'evaluation' | 'validation' 

export const emphasisLogText = (text: string) => {
  return `\x1b[1;36m"${text}"\x1b[0m`
}

export const emphasisErrorText = (text: string) => {
  return `"${text}"`
}

export const muteLogText = (text: string) => {
  return `\x1b[1;37m[${text}]\x1b[0m`
}

export const mocqLogText = (text: string) => {
  return `\x1b[0;36m${text}\x1b[0m`
}

const prefix = mocqLogText('[mocq]')

export const logger = {
  info: (content: string): void => {
    log(prefix, mocqLogText(content))
  },
  error: (content: string): void => {
    console.error(prefix, '\x1b[1;31m[ERROR]\x1b[0m', content)
  },
  success: (content: any): void => {
    log(prefix, `\x1b[1;32m${content} ✅\x1b[0m`)
  },
  log: (...content: any): void => {
    log(...content)
  },
  system: (type: systemLogType, ...content: any): void => {
    if (type === 'connection')
      log(prefix, '\x1b[0;34m[connecting mock data]\x1b[0m', ...content)
    if (type === 'evaluation')
      log(prefix, '\x1b[0;34m[evaluating connection]\x1b[0m', ...content)
    if (type === 'execution')
      log(prefix, '\x1b[0;35m[executing mock data handler]\x1b[0m', ...content)
    if (type === 'generation')
      log(prefix, '\x1b[0;32m[generating mock data]\x1b[0m', ...content)
    if (type === 'validation')
      log(prefix, '\x1b[0;37m[validating configuration]\x1b[0m', ...content)
  },
  warn: (content: any): void => {
    console.warn(prefix, '\x1b[0;33m[WARNING]\x1b[0m', content)
  },
}