<!--suppress JSUnresolvedFunction -->
<template>
  <div>
    <div class='wrapper'>
      <ul class='ctrls'>
        <li :class="{'active': current === 0 }" @click='setIndex(0)'>热门评论</li>
        <li :class="{'active': current === 1 }" @click='setIndex(1)'>最新评论</li>
      </ul>
    </div>
    <div class='content'>
      <my-scroll :distance='footerHeight' :isEnd='isEnd' @on-loadTop='loadTop' @on-loadBottom='loadBottom'>
        <ul class='content-box'>
          <li class='content-item' v-for='(item,index) in lists' :key="'sign-comments-' + index">
            <div class='num first' v-if='index === 0'>01</div>
            <div class='num second' v-else-if='index === 1'>02</div>
            <div class='num third' v-else-if='index === 2'>03</div>
            <div class='num common' v-else-if='index < 9'>{{ '0' + (index + 1) }}</div>
            <div class='num common' v-else-if='index < 50 && index >=9'>{{ index + 1 }}</div>
            <div class='num' v-else></div>
            <img class='user' :src="item.hUid? item.hUid.avatar : '/bear-200-200.jpg'" alt />
            <div class='column no-between'>
              <div class='title'>{{ item.hUid && item.hUid.nickname ? item.hUid.nickname : 'imooc' }}</div>
              <div class='read' v-if='current === 0'>
                <span>{{ item.count }}</span> 条评论
              </div>
              <div class='read' v-else>{{ item.created | dateDist }} 发表了评论</div>
            </div>
          </li>
        </ul>
      </my-scroll>
    </div>
    <my-footer />
  </div>
</template>

<script>
import MyFooter from '@/components/Footer'
import MyScroll from '@/components/Scroll'
import { publicDispatch } from '@/api/public'

export default {
  name: 'HotComment',
  components: { MyFooter, MyScroll },
  data () {
    return {
      current: 0,
      page: 0,
      limit: 10,
      lists: [],
      footerHeight: 100,
      handle: {},
      isEnd: false,
      isRepeat: false
    }
  },
  mounted () {
    this.dispatch()
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
      this.dispatch()
    },
    loadTop (end) {
      this.page = 0
      this.handle = end
      this.lists = []
      this.init()
    },
    loadBottom (end) {
      this.page++
      this.handle = end
      this.init()
    },
    async dispatch () {
      const handler = (res) => {
        // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
        this.isRepeat = false
        // 对于异常的判断，res.code 非200，我们给用户一个提示
        // 判断是否lists长度为0，如果为零即可以直接赋值
        // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
        if (typeof this.handle === 'function') {
          this.handle()
        }
        this.initHeight()
      }
      try {
        const result = await this._getHotComments()
        handler(result)
      } catch (err) {
        this.isRepeat = false
        if (err) {
          this.$Toast(err.message)
        }
      }
    },
    setIndex (val) {
      this.current = val
      this.lists = []
      this.page = 0
      this.init()
    },
    async _getHotComments () {
      return await publicDispatch.use('commentHot', {
        type: this.localType,
        index: this.current,
        page: this.page,
        limit: this.limit
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
