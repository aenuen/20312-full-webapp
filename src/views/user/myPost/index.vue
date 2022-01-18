<!--suppress HtmlUnknownAttribute, JSAnnotator -->
<template>
  <div>
    <my-header :zIndex='10' title='我的帖子' />
    <div class='container'>
      <div class='content'>
        <ul
          v-infinite-scroll='loadMore'
          infinite-scroll-disabled='loading'
          infinite-scroll-distance='30'
          class='content-box'
        >
          <li class='content-item flex' v-for='(item, index) in postList' :key='index'>
            <div class='column'>
              <div class='title' @click="$router.push({ name: 'detail', params: { tid: item._id } })">
                {{ item.title }}
              </div>
              <div class='bottom flex'>
                <div>
                  <span class='reads'>{{ item.answer }}回复</span>
                  <span class='time'>{{ item.created | senvenDayShow }}</span>
                </div>
                <div @click='deletePost(item._id,index)'>
                  <svg-icon icon='delete' />
                </div>
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
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import { postDispatch, postMyPost } from '@/api/post'
import { senvenDayShow } from '@/libs/dayjs'
import Paging from '@/libs/paging'

export default {
  name: 'MyPost',
  filters: {
    senvenDayShow (value) {
      return senvenDayShow(value)
    }
  },
  data () {
    return {
      postList: [],
      loading: false,
      isEnd: false,
      paging: {}
    }
  },
  mounted () {
    this.paging = new Paging( // 初始化分页对象
      postMyPost, // 后台请求数据的 api
      { page: 1, limit: 10 }, // 后台分页初始化参数
      this.postList // 前端渲染用的数组
    )
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    loadMore () {
      this.isEnd = this.paging.isEnd()
      if (this.isEnd) {
        return
      }
      this.getList()
    },
    getList () {
      this.loading = true
      this.paging.next({ uid: this.user._id }, res => {
        this.loading = false
      })
    },
    deletePost (pid, index) {
      MessageBox.confirm('确定删除该帖子吗?').then(action => {
        postDispatch.use('delete', { pid }).then(({ code, msg }) => {
          if (code === 200) {
            this.postList.splice(index, 1)
          } else {
            this.$Toast(msg)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
