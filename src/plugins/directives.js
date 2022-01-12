import { escapeHtml } from '@/utils/escapeHtml'
import store from '@/store'

export default {
  richText: {
    bind: function (el, binding, vNode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vNode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  },
  hasRole: {
    inserted: function (el, binding, vNode) {
      const roles = store.state.userInfo.roles || ['user']
      if (!roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  },
  hasPermission: {
    inserted: function (el, binding, vNode) {
      const types = vNode.context.$route.meta.types
      const values = binding.value
      let flag = true
      for (const v of values) {
        if (!types.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
