<template>
  <div>
    <ul class="links">
      <li>
        <router-link to="/hot/hotPost">热门帖子</router-link>
      </li>
      <li>
        <router-link to="/hot/hotComment">热门评论</router-link>
      </li>
      <li>
        <router-link to="/hot/hotSign">签到排行</router-link>
      </li>
    </ul>
    <router-view />
    <my-footer />
  </div>
</template>

<script>
import MyFooter from '@/components/Footer'

export default {
  name: 'Hot',
  components: { MyFooter }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
