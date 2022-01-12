export const isDevMode = process.env.NODE_ENV === 'development'

export const baseUrl = isDevMode ? 'http://localhost:20310' : 'http://localhost:20310'

export const publicPath = [/^\/public/, /^\/login/]

export const wsConfig = {
  url: isDevMode ? '127.0.0.1' : '127.0.0.1',
  port: isDevMode ? 22001 : 22001
}

export const axiosConfig = {
  baseUrl: isDevMode ? 'http://localhost:20310' : 'http://localhost:20310'
}
