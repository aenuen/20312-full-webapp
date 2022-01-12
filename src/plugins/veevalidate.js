import { extend, localize } from 'vee-validate'
// eslint-disable-next-line
import { confirmed, email, is_not, length, max, min, required } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('min', min)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)
extend('is_not', is_not)
extend('nickname', {
  validate: value => {
    return !(/^\d+/).test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', { // 使用扩展运算符，扩展中文包
  messages: { // 全局定义message
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    password: '密码',
    rePassword: '确认密码',
    oldPassword: '旧密码',
    nickname: '昵称',
    username: '账号',
    authCode: '验证码',
    title: '标题',
    catalog: '分类'
  },
  fields: { // 针对不同的name，定义不同的message消息
    catalog: {
      is_not: '请选择{_field_}'
    },
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    },
    name: {
      min: (field, { length }) => {
        return `请在${field}输入至少${length}个字符`
      }
    },
    password: {
      confirmed: (field, { target }) => {
        return `两次输入的${field}不一致！`
      }
    }
  }
})
