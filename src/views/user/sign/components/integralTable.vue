<template>
  <div class='board-wrapper'>
    <div class='title center'>签到规则</div>
    <p>1.“签到”可获得的社区积分。规则如下:</p>
    <table>
      <thead>
      <tr>
        <td>连续签到天数</td>
        <td>每天活动积分</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>小于5天</td>
        <td>5积分</td>
      </tr>
      <tr>
        <td>小于5天</td>
        <td>5积分</td>
      </tr>
      <tr>
        <td>大于或等于5天</td>
        <td>10积分</td>
      </tr>
      <tr>
        <td>大于或等于15天</td>
        <td>15积分</td>
      </tr>
      <tr>
        <td>大于或等于30天</td>
        <td>20积分</td>
      </tr>
      <tr>
        <td>大于或等于100天</td>
        <td>30积分</td>
      </tr>
      <tr>
        <td>大于或等于365天</td>
        <td>50积分</td>
      </tr>
      </tbody>
    </table>
    <p>2.中间若有间隔，则连续天数重新计算。</p>
    <p>3.不可复用程序自动签到，否则积分清零。</p>
  </div>
</template>

<script>
export default {
  name: 'IntegralTable'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/_variables";

.board-wrapper {
  padding: 35px 30px;
  background: #fff;
  border-radius: 12px;
  min-height: 375px;
  margin-bottom: 25px;
  box-shadow: 0 8px 16px 0 rgba(36, 37, 37, 0.08);

  .title {
    font-size: 32px;
    font-weight: bold;

    &.center {
      text-align: center;
      padding-bottom: 20px;
    }
  }

  table {
    width: 100%;
    line-height: 80px;
    border-collapse: collapse;
    border: 1px solid $border-color;
    color: #666666;

    thead {
      background: #f6f6f6;
    }

    tr {
      border-bottom: 1px solid $border-color;
    }

    td {
      font-size: 16px;
      width: 50%;
      text-align: center;
    }
  }

  p {
    font-size: 16px;
    padding: 10px 0;
  }
}
</style>
