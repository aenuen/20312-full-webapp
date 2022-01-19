<template>
  <div>
    <my-header :hasBack='true' title='修改密码' :zIndex='100' />
    <div class='container'>
      <mt-field label='旧密码' placeholder='请输入旧密码' type='newPassword' v-model='postForm.oldPassword' />
      <mt-field label='新密码' placeholder='请输入新密码' type='newPassword' v-model='postForm.newPassword' />
      <mt-field label='确认密码' placeholder='请再次输入新密码' type='newPassword' v-model='postForm.confirmPassword' />
      <div class='ctrls'>
        <mt-button type='primary' size='large' @click='submit()'>确定</mt-button>
        <mt-button type='default' size='large' @click='$router.back()'>取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import { userDispatch } from '@/api/user'

export default {
  name: 'passwd',
  components: { MyHeader },
  data () {
    return {
      postForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submit () {
      const { oldPassword, newPassword, confirmPassword } = this.postForm
      if (!oldPassword) {
        this.$Toast('旧密码不能为空！')
      } else if (!oldPassword) {
        this.$Toast('新密码不能为空！')
      } else if (!newPassword) {
        this.$Toast('确认密码不能为空！')
      } else if (oldPassword === newPassword) {
        this.$Toast('新旧密码一致，无需重复修改！')
      } else if (newPassword !== confirmPassword) {
        this.$Toast('两次密码输入不一致！')
      } else {
        userDispatch.use('password', { oldPassword, newPassword, confirmPassword }).then(({ code, msg }) => {
          if (code === 200) {
            this.postForm = {
              ...this.postForm,
              ...{
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
              }
            }
          }
          this.$Toast(msg)
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
