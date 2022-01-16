<!--suppress HtmlUnknownAttribute, JSUnresolvedFunction -->
<template>
  <div>
    <my-header :title="detail.title || '页面详情'" :hasBack='true' :zIndex='1000' />
    <div class='wrapper'>
      <div class='detail-head'>{{ detail.title }}</div>
      <div class='detail-info'>
        <div class='detail-info-head'>
          <div class='avatar'>
            <img :src='detail.uid && detail.uid.avatar' alt />
          </div>
          <div class='cont'>
            <p class='name'>{{ detail.uid && detail.uid.name }}</p>
            <p class='time'>{{ detail.created | dateDist }}</p>
          </div>
        </div>
        <div class='detail-info-body' v-richText='detail.content' />
        <div class='detail-info-foot'>{{ detail.reads }} 阅读</div>
      </div>
      <div class='comments'>
        <div class='title'>评论</div>
        <ul
          v-infinite-scroll='loadMore'
          infinite-scroll-disabled='loading'
          infinite-scroll-distance='30'
          class='comments-lists'
        >
          <li class='item' v-for='(item,index) in comments' :key="'comments-' + index">
            <div class='detail-info-head'>
              <div class='user'>
                <div class='avatar'>
                  <img :src='item.uid && item.uid.avatar' alt />
                </div>
                <div class='cont'>
                  <p class='name'>{{ item.uid && item.uid.name }}</p>
                  <p class='time'>{{ item.created | dateDist }}・评论了帖子</p>
                </div>
              </div>
              <div class='hands' @click='setLike(item)'>
                <svg-icon icon='zan' />
                <span>{{ item.like }}</span>
              </div>
            </div>
            <div class='detail-body' v-richText='item.content' />
          </li>
        </ul>
        <div class='info' v-if='comments.length === 0'>暂无评论，赶紧来抢沙发吧~~~</div>
        <div class='loading' v-if='loading'>
          <mt-spinner type='fading-circle' />
          加载中...
        </div>
        <div class='info' v-if='isEnd'>没有更多了~~~</div>
      </div>
    </div>

    <div class='detail-bottom' :class="{'fixed': isFocus ||faceStatus, 'on': faceStatus}">
      <span class='bottom-input-wrap'>
        <svg-icon icon='advice' />
        <input
          class='input'
          type='text'
          placeholder='写评论...'
          v-model='commentContent'
          v-on:keyup.enter='submitComment'
          @focus='focus()'
          @blur='blur()'
        />
        <span @click.stop='showFace()'>
          <svg-icon icon='smile' class='face' />
        </span>
      </span>
      <ul class='bottom-right'>
        <li :class="{'row': !showText}">
          <svg-icon icon='bianji' />
          <p>
            <span v-show='showText'>评论</span>
            {{ detail.answer }}
          </p>
        </li>
        <li :class="{'row': !showText}" @click='collect(detail._id)'>
          <svg-icon icon='shoucang' />
          <p>
            <span v-show='showText'>{{ detail.isCollect ? '取消收藏' : '收藏' }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class='detail-face' :class="{'on': faceStatus}" ref='faces'>
      <ul>
        <li class='detail-face-item' v-for='(value,key) in faces' :key="'face-' + key">
          <img :src='value' alt />
        </li>
        <li class='clear' />
      </ul>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import BScroll from 'better-scroll'
import { publicCommentList, publicPostDetail } from '@/api/public'
import { collectToggle } from '@/api/collect'
import { commentMCreate, commentSetLike } from '@/api/comment'
import Paging from '../../utils/paging'
import { mapGetters } from 'vuex'
import { faces } from 'plugins-methods'
import DataComments from './modules/data_comments'
import DataDetail from './modules/data_detail'

export default {
  name: 'detail',
  props: ['pid'],
  components: {
    MyHeader
  },
  data () {
    return {
      faces,
      comments: DataComments,
      detail: DataDetail,
      showText: true,
      loading: false,
      isEnd: false,
      isFocus: false,
      faceStatus: false,
      scroll: null,
      commentContent: '',
      paging: {} // 分页对象
    }
  },
  mounted () {
    this.getPostDetail()
    const wrap = this.$refs.faces
    const faceHandler = (evt) => {
      if (!wrap.contains(evt.target) && this.faceStatus) {
        this.faceStatus = false
      }
    }
    document.removeEventListener('touchstart', faceHandler)
    document.addEventListener('touchstart', faceHandler)
    this.paging = new Paging( // 初始化分页对象
      publicCommentList, // 后台请求数据的 api
      { page: 0, limit: 10 }, // 后台分页初始化参数
      this.comments // 前端渲染用的数组
    )
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isLogin: 'user/isLogin'
    })
  },
  watch: {
    faceStatus (nVal) {
      if (!nVal) {
        this.scroll.scrollTo(0, 0)
      }
    },
    pid () { // 实时刷新页面
      this.paging.clear()
      this.getPostDetail()
      this.getCommentsList()
    }
  },
  created () {
    this.comments = []
  },
  methods: {
    showFace () {
      this.faceStatus = !this.faceStatus
      if (this.faceStatus) {
        this.scroll = new BScroll(this.$refs.faces)
      }
    },
    setLike (item) {
      commentSetLike({ cid: item._id }).then(({ code, msg, data }) => {
        if (code === 200) {
          item.like += data
          this.$Toast(msg)
        } else {
          this.$Toast(msg)
        }
      })
    },
    focus () {
      this.isFocus = true
    },
    blur () {
      this.isFocus = false
    },
    loadMore () {
      this.isEnd = this.paging.isEnd()
      if (this.isEnd) return
      this.loading = true
      this.getCommentsList()
    },
    getPostDetail () {
      publicPostDetail({ pid: this.pid }).then(({ code, data }) => {
        if (code === 200) {
          this.detail = data
        }
      })
    },
    getCommentsList () {
      this.paging.next({ pid: this.pid }, () => {
        this.loading = false
      })
    },
    collect (pid) {
      this.$Loading.show()
      collectToggle({
        title: this.detail.title,
        pid: pid,
        isCollect: this.detail.isCollect
      }).then(({ code, msg }) => {
        if (code === 200) {
          this.detail.isCollect = !this.detail.isCollect
        }
        this.$Loading.close()
        this.$Toast(msg)
      })
    },
    submitComment () {
      if (!this.isLogin) {
        this.$Toast('请登录后再发表评论！')
        return
      }
      if (this.commentContent === '') {
        this.$Toast('评论内容不能为空！')
        return
      }
      this.$Loading.show()
      commentMCreate({
        pid: this.detail._id,
        uid: this.detail.uid._id,
        hUid: this.user._id,
        content: this.commentContent
      }).then(({ code, msg }) => {
        this.$Loading.close()
        if (code === 200) {
          this.loading = true
          this.paging.clear()
          this.detail.answer = +this.detail.answer + 1
          this.commentContent = ''
          this.getCommentsList()
        }
        this.$Toast(msg)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'style';
</style>
