<template>
  <div>
    <my-header title='我的收藏' bkColor='#fff' :zIndex='100'></my-header>
    <div class='container'>
      <div class='content'>
        <ul
          v-infinite-scroll='getList'
          infinite-scroll-disabled='loading'
          infinite-scroll-distance='30'
          class='content-box'
        >
          <li class='content-item' v-for='(item, index) in postList' :key='index'>
            <div class='header'>
              <img :src="item.tid.uid.pic || '/img/bear-200-200.jpg'" class='img' alt />
              <span>{{ item.tid.uid.name }}</span>
            </div>
            <div
              class='title'
              @click="$router.push({ name: 'detail', params: { tid: item.tid._id } })"
            >{{ item.tid.title }}
            </div>
            <div class='desc'>{{ item.tid.content }}</div>
            <div class='bottom flex'>
              <div>
                <span class='hands'>
                  <svg-icon icon='zan'></svg-icon>
                </span>
                <span class='reads'>
                  <svg-icon icon='eye-open'></svg-icon>
                  {{ item.tid.answer }}
                </span>
              </div>
              <div>
                <svg-icon icon='delete'></svg-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from '@/utils/paging'
import { collectList } from '@/api/collect'

export default {
  name: 'myfav',
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
      this.paging.next({ uid: this.uid }, res => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
