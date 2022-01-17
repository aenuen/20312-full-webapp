import store from '@/store'

export const getToken = () => {
  return store.state.user.token
}
