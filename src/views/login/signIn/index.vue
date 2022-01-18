<!--suppress JSAnnotator -->
<template>
  <div class='wrapper'>
    <my-header title='登录' />
    <div class='logo'>
      <img src='@/assets/images/logo.jpg' alt />
    </div>
    <div class='form'>
      <validation-observer ref='observer'>
        <validation-provider tag='div' class='outer' name='email' rules='required|email' v-slot='{errors}'>
          <div class='input-wrap' :class="{'error-outline': errors.length > 0}">
            <svg-icon icon='person' />
            <input type='text' placeholder='请输入用户名' v-model='account' />
          </div>
          <span class='error'>{{ errors[0] }}</span>
        </validation-provider>
        <div class='input-wrap'>
          <svg-icon icon='lock' />
          <input type='password' placeholder='请输入密码' v-model='password' />
        </div>
        <div class='input-wrap flex'>
          <div class='code-input'>
            <svg-icon icon='images' />
            <input type='text' placeholder='请输入验证码' v-model='authCode' />
          </div>
          <div v-html='svg' class='code' @click='_getCode()' />
        </div>
        <div class='form-controls'>
          <router-link :to="{name: 'signUp'}">注册</router-link>
          <router-link :to="{name: 'forget'}">忘记密码</router-link>
        </div>
        <div>
          <mt-button type='primary' @click='_login()' size='large'>登录</mt-button>
        </div>
        <div class='form-bottom'>
          <svg-icon icon='qq' class='icon-qq' />
          <svg-icon icon='weixin' class='icon-weixin' />
          <svg-icon icon='weibo' class='icon-weibo' />
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  components: {
    MyHeader,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      svg: '',
      account: '',
      password: '',
      authCode: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    ...mapActions({
      captcha: 'user/captcha',
      login: 'user/login'
    }),
    async _getCode () {
      const { code, data } = await this.captcha()
      if (code === 200) {
        this.svg = data
      }
    },
    async _login () {
      const result = await this.login({
        account: this.account,
        password: this.password,
        authCode: this.authCode
      })
      if (result.code === 200) {
        await this.$router.push({ name: 'index' })
      } else {
        this.$Toast(result.msg)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
