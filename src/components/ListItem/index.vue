<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<template>
  <li class='list-box' @click='showDetail(item._id)'>
    <div class='list-head'>
      <div class='title'>
        <span class='type' :class="['type-'+item.catalog]">{{ item.catalog | catalogFilter }}</span>
        <span class='ellipsis'>{{ item.title }}</span>
      </div>
    </div>
    <div class='author'>
      <div class='inline-block' @click.stop='showUser(item.uid._id)'>
        <img class='head' :src="item.uid.pic || '/images/header.jpg'" alt />
        <span class='name'>{{ item.uid.name || '未知用户' }}</span>
        <i class='vip' v-show="item.uid.isVip !== '0'">VIP{{ item.uid.isVip }}</i>
      </div>
    </div>
    <div class='list-body'>
      <div class='info' v-richText='item.content' />
      <img class='fmt' :src='item.snapshot' v-show='item.snapshot' />
    </div>
    <div class='list-footer'>
      <div class='left'>
        <span class='reply-num'>{{ item.answer }} 回复</span>
        <span class='timer'>{{ item.created | dateDist }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import { catalogs } from '@/config'

export default {
  name: 'list-item',
  props: ['item'],
  methods: {
    showUser (id) {
      this.$emit('on-show-user', id)
    },
    showDetail (id) {
      this.$emit('on-show-detail', id)
    }
  },
  filters: {
    catalogFilter (v) {
      return catalogs[v]
    }
  }
}
</script>

<style lang='scss' scoped>
@import './listitem.scss';
</style>
