export const logger = {
  log: (content: string): void => {
    const verbose = process.env.MOCQ_VERBOSE
    if (verbose === 'true')
      console.log('\x1b[0;36mmocq\x1b[0m', content)
  },
  error: (error: string): void => {
    console.log('\x1b[0;36mmocq\x1b[0m', '\x1b[0;31m[ERROR]\x1b[0m', error)
  }
}