<template>
  <div class="wrapper">
    <slot />
    <my-footer />
  </div>
</template>

<script>
import MyFooter from '@/components/Footer'

export default {
  name: 'Layout',
  components: {
    MyFooter
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables";

.wrapper {
  padding-bottom: $footer-height;
}
</style>
