<template>
  <div>
    <scroll :distance='footerHeight' :isEnd='isEnd' @on-loadTop='loadTop' @on-loadBottom='loadBottom'>
      <ul>
        <list-item
          v-for='(item, index) in lists'
          :key="'catalog' + index"
          :item='item'
          @on-show-user='goUser'
          @on-show-detail='goDetail'
        />
        <li class='info'>没有更多啦~</li>
      </ul>
    </scroll>
    <img alt class='add-post' src='@/assets/images/add-post.png' @click="$router.push({ name: 'newPost' })" />
  </div>
</template>

<script>
import { publicDispatch } from '@/api/public'
import ListItem from '@/components/ListItem'
import Scroll from '@/components/Scroll'

export default {
  name: 'catalog',
  props: ['catalog'],
  components: {
    ListItem,
    Scroll
  },
  data () {
    return {
      page: 0,
      limit: 10,
      lists: [],
      isEnd: false,
      isRepeat: false,
      handle: {},
      footerHeight: 0
    }
  },
  watch: {
    catalog (nVal) {
      this.catalog = nVal
      this.page = 0
      this.init()
    },
    $route () { // 每次进入首页的时候都刷新
      this.$router.go(0)
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    initHeight () {
      this.footerHeight = document.getElementsByClassName('layout-footer')[0].offsetHeight
    },
    init () {
      if (typeof this.handle === 'function') {
        this.handle()
      }
      this.isEnd = false
      this.isRepeat = false
      this.lists = []
      this._getList()
    },
    loadTop (end) {
      this.page = 0
      this.handle = end
      this.init()
    },
    loadBottom (end) {
      this.page++
      this.handle = end
      this._getList()
    },
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      publicDispatch.use('postList', {
        catalog: this.catalog,
        page: this.page,
        limit: this.limit,
        sort: 'created'
      }).then(({ code, data }) => {
        this.isRepeat = false // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
        if (code === 200) {
          if (data.length < this.limit) { // 判断res.data的长度，如果小于20条，则是最后页
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = data
          } else {
            this.lists = this.lists.concat(data)
          }
        }
        if (typeof this.handle === 'function') {
          this.handle()
        }
        this.initHeight()
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$Toast(err.message)
        }
      })
    },
    goUser (id) {
    },
    goDetail (pid) {
      this.$router.push({ name: 'detail', params: { pid } })
    },
    goNewPost () {
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/styles/_mixin.scss';

ul {
  padding: 0;
  margin: 0;
  background-color: #f3f6f8;
}

.add-post {
  position: fixed;
  bottom: 120px;
  right: 10px;
}

.info {
  color: #999;
  font-size: 24px;
  text-align: center;
  padding: 30px;
}
</style>
