<!--suppress JSAnnotator -->
<template>
  <div>
    <div class='grey'>
      <div class='bg'></div>
      <div class='wrapper'>
        <div class='profile'>
          <div class='info'>
            <img class='pic' :src="isLogin ? user.avatar: '/img/header.jpg'" alt />
            <div class='user'>
              <p class='name'>{{ isLogin ? user.nickname : '请登录' }}</p>
              <p class='fav'>
                <svg-icon icon='fav2' class='icon-fav' />
                积分：{{ user.integer }}
              </p>
            </div>
            <router-link class='link' :to="{name: 'center'}">个人主页 ></router-link>
          </div>
          <ul class='stats'>
            <li class='item'>
              <router-link :to="{name: 'myPost'}">
                <p>{{ countMyPost }}</p>
                <p class='title'>我的帖子</p>
              </router-link>
            </li>
            <li class='item'>
              <router-link :to="{name: 'myCollect'}">
                <p>{{ countMyCollect }}</p>
                <p class='title'>收藏夹</p>
              </router-link>
            </li>
            <li class='item'>
              <router-link :to="{name: 'myhistory'}">
                <p>{{ countMyHistory }}</p>
                <p class='title'>最近浏览</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class='center-wrapper'>
        <ul class='center-list first'>
          <li v-for='(item,index) in lists' :key="'center-' + index" @click='goTo(item.routeName)'>
            <i :class='item.icon' />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <ul class='center-list'>
          <li v-for='(item,index) in routes' :key="'center-' + index">
            <router-link :to='item.path'>
              <i :class='item.icon' />
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <my-footer />
    </div>
  </div>
</template>

<script>
import MyFooter from '@/components/Layout/footer'
import { mapGetters } from 'vuex'
import { userCount } from '@/api/user'

export default {
  name: 'User',
  components: { MyFooter },
  data () {
    return {
      lists: [
        {
          name: '我的帖子',
          icon: 'icon-teizi',
          routeName: 'myPost'
        },
        {
          name: '修改设置',
          icon: 'icon-setting',
          routeName: 'settings'
        },
        {
          name: '修改密码',
          icon: 'icon-lock2',
          routeName: 'passwd'
        },
        {
          name: '签到中心',
          icon: 'icon-qiandao',
          routeName: 'sign'
        },
        {
          name: '购买记录',
          icon: 'icon-qiandao',
          routeName: '404'
        },
        {
          name: '赞助商',
          icon: 'icon-jiangbei',
          routeName: '404'
        }
      ],
      routes: [
        {
          name: '提问',
          icon: 'icon-question',
          path: '/index/ask'
        },
        {
          name: '分享',
          icon: 'icon-share',
          path: '/index/share'
        },
        {
          name: '讨论',
          icon: 'icon-taolun',
          path: '/index/discuss'
        },
        {
          name: '建议',
          icon: 'icon-advise',
          path: '/index/advise'
        }
      ],
      countMyPost: 0,
      countMyCollect: 0,
      countMyHistory: 0
    }
  },
  mounted () {
    if (this.isLogin) {
      userCount({
        reqPost: 1, // 统计我的帖子
        reqCollect: 1, // 统计我的收藏
        reqHistory: 1 // 统计我的浏览历史
      }).then(({ code, data }) => {
        if (code === 200) {
          const { countMyPost, countMyCollect, countMyHistory } = data
          this.countMyPost = countMyPost
          this.countMyCollect = countMyCollect
          this.countMyHistory = countMyHistory
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isLogin: 'user/isLogin'
    })
  },
  methods: {
    goTo (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
