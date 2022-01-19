<!--suppress HtmlUnknownAttribute -->
<template>
  <div>
    <my-header title='浏览历史' bkColor='#fff' :zIndex='100' />
    <div class='container'>
      <div class='content'>
        <ul v-infinite-scroll='getList' infinite-scroll-disabled='loading' infinite-scroll-distance='30'
            class='content-box'
        >
          <li class='content-item' v-for='(item, index) in postList' :key='index'>
            <div class='header'>
              <img :src="item.pid.uid.avatar || '/images/header.jpg'" class='img' alt />
              <span>{{ item.pid.uid.nickname }}</span>
            </div>
            <div class='title' @click="$router.push({ name: 'detail', params: { pid: item.pid._id } })">
              {{ item.pid.title }}
            </div>
            <div class='desc'>
              {{ item.pid.content }}
            </div>
            <div class='bottom flex'>
              <div>
                <span class='reads'>
                  <svg-icon icon='eye-open' />{{ item.pid.answer }}
                </span>
              </div>
              <div>
                <span @click="deleteHistory(item._id,index)">
                  <svg-icon icon='delete' />
                </span>
              </div>
            </div>
          </li>
          <li v-if='isEnd' class='scrollNoMore'>没有更多了~~~</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from '../../../libs/paging'
import { postHistory, postDispatch } from '@/api/post'

export default {
  name: 'myHistory',
  data () {
    return {
      postList: [],
      loading: false,
      isEnd: false,
      paging: {}
    }
  },
  mounted () {
    this.paging = new Paging(
      postHistory,
      { page: 0, limit: 10 },
      this.postList,
      'data' // 后台返回数据的键
    )
  },
  computed: {
    uid () {
      return this.$store.state.user.userInfo._id
    }
  },
  methods: {
    getList () {
      this.isEnd = this.paging.isEnd()
      if (this.isEnd) {
        return
      }
      this.loading = true
      this.paging.next({ uid: this.uid }, () => {
        this.loading = false
      })
    },
    deleteHistory (hid, index) {
      postDispatch.use('historyDelete', { hid }).then(({ code, msg }) => {
        if (code === 200) {
          this.postList.splice(index, 1)
        }
        this.$Toast(msg)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../myCollect/style";
</style>
