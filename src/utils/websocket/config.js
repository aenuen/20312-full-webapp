import { isDevMode } from '@/config'

const wsConfig = {
  url: isDevMode ? '127.0.0.1' : '127.0.0.1',
  port: isDevMode ? 22001 : 22001
}

export default wsConfig
