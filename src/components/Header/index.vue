<template>
  <div class="header" :style="{zIndex: zIndex,  'background-color': bkColor}">
    <div class="head-left" @click="goBack()" v-if="hasBack">
      <slot name="h-left">
        <svg-icon icon="arrow-left"></svg-icon>
        <span class="left-text" v-if="backText">{{ backText }}</span>
      </slot>
    </div>
    <div class="head-content">
      <slot name="h-center">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="head-right">
      <slot name="h-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-header',
  props: {
    title: { type: String, default: '' },
    backText: { type: String, default: '返回' },
    zIndex: { type: Number, default: 0 },
    back: { type: Function },
    bkColor: { type: String },
    hasBack: { type: Boolean, default: true }
  },
  methods: {
    goBack () {
      if (this.back) {
        this.back()
        return
      }
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
