<template>
  <div class='list'>
    <div class='page-loadmore-wrapper' ref='wrapper' :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :bottomMethod='loadBottom'
        :bottomAllLoaded='isEnd'
        :topDistance='topDistance'
        :bottomDistance='bottomDistance'
        :bottomLoadingText='bottomLoadingText'
        :topMethod='loadTop'
        :topPullText='topPullText'
        :auto-fill='false'
        @bottom-status-change='handleBottomChange'
        @top-status-change='handleTopChange'
        ref='loadmore'
      >
        <slot />
        <div slot='top' class='mint-loadmore-top'>
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading' && showSpin">
            <mt-spinner :type='spinType' />
          </span>
          <span class='text'>{{ bottomLoadingText }}</span>
        </div>
        <div slot='bottom' class='mint-loadmore-bottom'>
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading' && showSpin">
            <mt-spinner :type='spinType' />
          </span>
          <span class='text'>{{ bottomLoadingText }}</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyScroll',
  props: {
    catalog: {
      type: String,
      default: ''
    },
    bottomLoadingText: {
      type: String,
      default: '加载中...'
    },
    topPullText: {
      type: String,
      default: '加载中...'
    },
    distance: {
      type: Number,
      default: 0
    },
    topDistance: {
      type: Number,
      default: 50
    },
    bottomDistance: {
      type: Number,
      default: 20
    },
    showSpin: {
      type: Boolean,
      default: true
    },
    spinType: {
      type: String,
      default: 'double-bounce'
    },
    isEnd: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      topStatus: '',
      bottomStatus: '',
      wrapperHeight: 0
    }
  },
  watch: {
    distance () {
      this.$nextTick(() => {
        this.wrapperHeight =
          document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top -
          this.distance
      })
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      this.$emit('on-loadTop', this.endTopLoaded)
    },
    endTopLoaded () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.$emit('on-loadBottom', this.endBottomLoaded)
    },
    endBottomLoaded () {
      this.$refs.loadmore.onBottomLoaded()
    }
  },
  mounted () {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top -
      this.distance
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
