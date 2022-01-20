<!--suppress JSAnnotator -->
<template>
  <div>
    <div class='grey'>
      <my-header title='签到中心' :zIndex='100' />
      <div class='bg'>
        <div class='wrapper'>
          <span class='fav'><svg-icon icon='fav2' /><i /></span>
          <span>可用积分：{{ userInfo.integral }}</span>
        </div>
      </div>
      <div class='board'>
        <div class='board-wrapper'>
          <div class='title'>已经连续签到<span>{{ count }}</span>天</div>
          <ul class='sign-bar'>
            <li class='item' v-for='(item,index) in weeks' :key="'weeks' + index">
              <i>{{ checked.includes(index) ? '' : preIntegral[index] }}</i>
              <svg-icon icon='check' class='active' v-show='checked.includes(index)'></svg-icon>
              <span>{{ item }}</span>
              <div
                class='line'
                v-show='(index +1 < weeks.length -1 && checked.includes(index + 1) && checked.includes(index))'
              ></div>
            </li>
          </ul>
          <mt-button type='primary' size='large' class='btn' :class="{'signed': isSign}" @click='userSign()'>
            {{ !isSign ? '签到' : '已签到' }}
          </mt-button>
        </div>
        <IntegralTable />
      </div>
      <div class='sign-modal' v-show='isShow'>
        <div class='title'>恭喜您，签到成功!</div>
        <div class='desc'>恭喜您已获得{{ expectedIntegral }}积分</div>
        <mt-button type='primary' class='btn' @click='close()'>好的</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import { mapActions } from 'vuex'
import { diffNumberDays, getDateDay } from '@/libs/dayjs'
import { integralCount, pmWeek, pmDate } from 'plugins-methods'
import IntegralTable from './components/integralTable'

export default {
  name: 'Sign',
  components: { MyHeader, IntegralTable },
  data () {
    return {
      weeks: [],
      checked: [],
      preIntegral: [],
      isShow: false,
      count: 0
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    isSign () {
      return this.$store.state.user.userInfo.isSign
    },
    expectedIntegral () { // 预期的签到积分
      return integralCount(this.userInfo.count + 1)
    }
  },
  mounted () {
    this.renderList()
  },
  created () {
    this.weeks = pmWeek.weekCn(true)
    console.log(pmDate.dateOneWeek(new Date()))
  },
  methods: {
    ...mapActions({ sign: 'user/sign' }),
    async userSign () {
      if (this.isSign) {
        this.$Toast('您已签到！')
      } else {
        this.$Loading.show()
        const result = await this.sign()
        if (result.code === 200) {
          this.isShow = true
          this.renderList()
        }
        this.$Loading.close()
      }
    },
    close () {
      this.isShow = false
    },
    renderList () {
      this.checked = []
      const today = getDateDay()
      const lastSignDate = this.userInfo.lastSign
      // 如果签到有中断，签到次数清零
      const isFirstSign = lastSignDate ? (diffNumberDays(lastSignDate) > 1) : true
      let count = isFirstSign ? 0 : this.userInfo.count
      this.count = count
      if (this.isSign) {
        this.checked.push(today)
        count--
      }
      for (let i = 1; i <= count; i++) { // 渲染之前的签到节点
        const yesterday = today - i
        if (yesterday < 0) {
          break
        }
        this.checked.push(yesterday)
      }
      for (let i = 0; i < 7; i++) {
        if (i < today) {
          this.preIntegral.push('未签到')
        } else {
          this.preIntegral.push('+' + integralCount(i + count))
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
