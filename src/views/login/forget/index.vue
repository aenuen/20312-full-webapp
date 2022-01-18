<!--suppress JSAnnotator -->
<template>
  <div class='wrapper'>
    <my-header title='找回密码' />
    <div class='form'>
      <div class='input-wrap'>
        <svg-icon icon='person' />
        <input type='text' placeholder='请输入用户名' v-model='username' />
      </div>
      <div class='input-wrap flex'>
        <div class='code-input'>
          <svg-icon icon='images' />
          <input type='text' placeholder='请输入验证码' v-model='code' />
        </div>
        <div v-html='svg' class='code' @click='_getCode()' />
      </div>
      <div class='form-controls'>
        <router-link :to="{name: 'signIn'}">已有账号</router-link>
        <router-link :to="{name: 'signUp'}">注册</router-link>
      </div>
      <div class='button'>
        <mt-button type='primary' @click='submit()' size='large'>确定发送</mt-button>
        <mt-button @click='goBack()' size='large'>取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import { mapActions } from 'vuex'
import loginDispatch from '@/api/login'

export default {
  name: 'Forget',
  components: { MyHeader },
  data () {
    return {
      svg: '',
      username: '',
      code: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    ...mapActions({
      captcha: 'user/captcha'
    }),
    async _getCode () {
      const result = await this.captcha()
      if (result.code === 200) {
        this.svg = result.data
      }
    },
    async submit () {
      const result = await loginDispatch.use('findCode', {
        username: this.username,
        code: this.code,
        sid: this.$store.state.sid
      })
      if (result.code === 200) {
        this.$Toast('邮件发送成功！2s后跳转')
        setTimeout(() => {
          this.$router.push({ name: 'index' })
        }, 2000)
      }
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
