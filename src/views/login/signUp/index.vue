<!--suppress JSAnnotator -->
<template>
  <div class='wrapper'>
    <my-header title='注册' />
    <div class='form'>
      <div class='input-wrap'>
        <svg-icon icon='person' />
        <input type='text' placeholder='请输入用户名' v-model='username' />
      </div>
      <div class='input-wrap'>
        <svg-icon icon='name' />
        <input type='text' placeholder='请输入昵称' v-model='name' />
      </div>
      <div class='input-wrap'>
        <svg-icon icon='lock' />
        <input type='password' placeholder='请输入密码' v-model='password' />
      </div>
      <div class='input-wrap'>
        <svg-icon icon='lock' />
        <input type='password' placeholder='请两次输入密码' v-model='confirm' />
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
        <router-link :to="{name: 'forget'}">忘记密码</router-link>
      </div>
      <div class="button">
        <mt-button type='primary' @click='submit()' size='large'>注册</mt-button>
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
  name: 'SignUp',
  components: { MyHeader },
  data () {
    return {
      svg: '',
      username: '',
      name: '',
      password: '',
      confirm: '',
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
        // 返回到前端svg图片数据
        this.svg = result.data
      } else {
        // 请求失败，或者异常
      }
    },
    goBack () {
      this.$router.back()
    },
    async submit () {
      const result = await loginDispatch.use('signUp', {
        sid: this.$store.state.user.sid,
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code
      })
      this.$Toast(result.msg)
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
