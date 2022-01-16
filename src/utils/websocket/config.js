export const isDevMode = process.env.NODE_ENV === 'development'

const wsConfig = {
  url: isDevMode ? '127.0.0.1' : '127.0.0.1',
  port: isDevMode ? 22001 : 22001
}

export default wsConfig
