<!--suppress HtmlUnknownAttribute -->
<template>
  <div>
    <my-header title='我的收藏' bkColor='#fff' :zIndex='100' />
    <div class='container'>
      <div class='content'>
        <ul v-infinite-scroll='getList' infinite-scroll-disabled='loading' infinite-scroll-distance='30'
            class='content-box'
        >
          <li class='content-item' v-for='(item, index) in postList' :key='index'>
            <div class='header'>
              <img :src="item.pid.uid.avatar || '/images/header.jpg'" class='img' alt />
              <span>{{ item.pid.uid.name }}</span>
            </div>
            <div class='title' @click="$router.push({ name: 'detail', params: { pid: item.pid._id } })">
              {{ item.pid.title }}
            </div>
            <div class='desc'>{{ item.pid.content }}</div>
            <div class='bottom flex'>
              <div>
                <span class='reads'>
                  <svg-icon icon='eye-open' />
                  {{ item.pid.answer }}
                </span>
              </div>
              <div>
                <span @click="deleteCollect(item._id,index)">
                  <svg-icon icon='delete' />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import Paging from '@/libs/paging'
import { collectList, collectDispatch } from '@/api/collect'

export default {
  name: 'MyCollect',
  components: { MyHeader },
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
      collectList,
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
      this.loading = true
      this.paging.next({ uid: this.uid }, () => {
        this.loading = false
      })
    },
    deleteCollect (cid, index) {
      collectDispatch.use('delete', { cid }).then(({ code, msg }) => {
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
@import "style";
</style>
