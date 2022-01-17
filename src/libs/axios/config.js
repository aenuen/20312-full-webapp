const isDevMode = process.env.NODE_ENV === 'development'

export default {
  baseUrl: isDevMode ? 'http://localhost:20310' : 'http://localhost:20310'
}
