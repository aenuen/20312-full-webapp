<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <my-header title='个人主页' :zIndex='100' />
    {{ countMyComment }}
    <div class='bg'>
      <div class='wrapper'>
        <div class='user'>
          <img :src="user.avatar || '/img/bear-200-200.jpg'" alt />
        </div>
        <div class='title'>{{ user.nickname || user.email }}</div>
        <div class='desc'>{{ user.descript || '这家伙很懒，什么也没有留下。' }}</div>
      </div>
      <ul class='stat'>
        <li>
          <span class='num'>{{ countMyComment }}</span>
          <span>评论</span>
        </li>
        <li>
          <span class='num'>{{ countMyLikes }}</span>
          <span>点赞</span>
        </li>
        <li>
          <span class='num'>{{ countMyCollect }}</span>
          <span>收藏</span>
        </li>
        <li>
          <span class='num'>{{ countMyBeLikes }}</span>
          <span>获赞</span>
        </li>
      </ul>
      <ul class='tabs'>
        <li class='tab-item' :class="{'active': index === 0}" @click='choose(0)'>动态</li>
        <li class='tab-item' :class="{'active': index === 1}" @click='choose(1)'>资料</li>
      </ul>
      <ul class='tabs-content'>
        <li v-if='index === 0'>
          <ul class='content-box'>
            <li class='content-item' v-for='(item, index) in postList' :key='index'>
              <div class='header'>
                <img :src="user.avatar || '/img/bear-200-200.jpg'" class='img' alt />
                <span>{{ user.username }}</span>
              </div>
              <div class='title'>{{ item.title }}</div>
              <div class='desc'>{{ item.content }}</div>
              <div class='bottom flex'>
                <div>
                  <span class='reads'>
                    <svg-icon icon='eye-open' />{{ item.reads }}
                  </span>
                </div>
                <div>
                  <span>
                    <svg-icon icon='delete' />
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li v-if='index === 1'>
          <ul class='info'>
            <li>基本信息</li>
            <li>
              <div class='tag'>性别</div>
              <div class='tag-info'>{{ user.gender === '0' ? '男' : '女' }}</div>
            </li>
            <li>
              <div class='tag'>家乡</div>
              <div class='tag-info'>{{ user.location }}</div>
            </li>
            <li>
              <div class='tag'>职业</div>
              <div class='tag-info'>未填写</div>
            </li>
            <li>
              <div class='tag'>社龄</div>
              <div class='tag-info'>{{ user.created }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { userDispatch } from '@/api/user'
import { postMyPost } from '@/api/post'

export default {
  name: 'center',
  data () {
    return {
      index: 0,
      countMyComment: 0,
      countMyLikes: 0,
      countMyCollect: 0,
      countMyBeLikes: 0,
      postList: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  mounted () {
    userDispatch.use('count', {
      reqComment: 1,
      reqHands: 1,
      reqCollect: 1,
      reqHandsOnMe: 1
    }).then(({ code, data }) => {
      this.countMyComment = data.countMyComment
      this.countMyLikes = data.countMyLikes
      this.countMyCollect = data.countMyCollect
      this.countMyBeLikes = data.countMyBeLikes
    })
    postMyPost({ uid: this.user._id, page: 1, limit: 10 }).then(res => {
      this.postList = res.data
    })
  },
  methods: {
    choose (val) {
      this.index = val
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/styles/_mixin';
@import '~@/assets/styles/_variables';

.bg {
  background-image: url('~@/assets/images/my_bg@2x.png');
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 400px;
  background-position: 0 $header-height;
  z-index: 0;

  .wrapper {
    margin: $header-height + 150 auto 0 auto;
    // padding-top: $header-height + 30;
    width: 686px;
    height: 224px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 16px 0px rgba(36, 37, 37, 0.08);
    border-radius: 16px;
    position: relative;
    text-align: center;
    padding-top: 70px;
    box-sizing: border-box;
  }

  .user {
    position: absolute;
    left: 50%;
    top: -60px;
    margin-left: -60px;

    &:after {
      content: '';
      position: absolute;
      width: 140px;
      height: 140px;
      background: #fff;
      border-radius: 50%;
      top: -10px;
      left: -10px;
      z-index: -1;
    }

    img {
      border-radius: 50%;
      width: 120px;
      height: 120px;
    }
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    padding-bottom: 35px;
  }

  .desc {
    font-size: 26px;
    color: #999999;
  }
}

.stat {
  height: 200px;
  background: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;

  li {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    color: #666;
    font-size: 28px;

    .num {
      font-size: 32px;
      color: #333;
      padding-bottom: 10px;
    }
  }

  // box-shadow: 0px 4px 6px 0px rgba(36, 37, 37, 0.08);
}

.tabs {
  height: 88px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 6px 0px rgba(36, 37, 37, 0.08);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  z-index: 80;
  position: relative;

  .tab-item {
    flex: 1;
    font-size: 28px;
    font-weight: bold;
    color: #666666;
    text-align: center;
    position: relative;

    &.active {
      color: #02d199;

      &:after {
        content: '';
        position: absolute;
        width: 48px;
        height: 4px;
        background: #02d199;
        bottom: -29px;
        left: 50%;
        margin-left: -24px;
      }
    }
  }
}

// content-box
.content-box {
  background: #fff;
  padding: 0 30px;

  .flex {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .content-item {
    align-items: center;
    padding: 30px 20px;
    @extend %border-line;
  }

  .title {
    color: #333;
    font-size: 30px;
    font-weight: bold;
    overflow: hidden;
    line-height: 38px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 15px;
  }

  .desc {
    font-size: 24px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 32px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 30px;
  }

  .header {
    margin-bottom: 30px;

    span {
      font-size: 26px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-left: 10px;
    }

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .bottom {
    color: #999;
    font-size: 24px;

    .reads,
    .hands {
      margin-right: 20px;
    }
  }

  .svg-icon {
    font-size: 36px;
  }
}

.info {
  padding: 20px;
  font-size: 28px;
  color: #333;

  .tag {
    color: #999999;
    padding-top: 48px;
    padding-bottom: 24px;
  }
}
</style>
