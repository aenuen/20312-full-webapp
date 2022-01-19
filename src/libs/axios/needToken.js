import { publicPath } from 'plugins-methods'
import store from '@/store'

export default (url) => {
  let needToken = false
  publicPath.map((path) => {
    needToken = needToken || path.test(url)
  })
  const token = store.state.user.token
  return !needToken && token ? `Bearer ${token}` : null
}
