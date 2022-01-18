<template>
  <div class='container01'>
    <my-header title='新增帖子' :hasBack='true' :zIndex='1000' />
    <div class='container02'>
      <input type='text' placeholder='请输入帖子标题' v-model='title' />
      <div class='line' />
      <textarea placeholder='请输入帖子内容' v-model='content' />
      <div class='img-container'>
        <div
          v-for='(item, index) in fileList'
          :key='index'
          class='img-box'
          :style="{ background: 'url(' + item + ') no-repeat center' }"
        >
          <span class='delete-img' @click='deleteImg(index)'>x</span>
        </div>
        <button class='add-img' @click='chooseImg'>+</button>
      </div>
      <div class='line' />
      <div class='flex-between' @click='showCatalog=true'>
        <span>发帖类型</span>
        <span class='grey'>{{ catalog.value }} ></span>
      </div>
      <div class='line' />
      <div class='flex-between' @click='showIntegral=true'>
        <span>奖励积分</span>
        <span class='grey'>{{ integral.value }} ></span>
      </div>
      <button class='submit' @click='submit' :style="{ background: isValidate ? '#02D199' : '#CCCCCC' }">
        发布
      </button>
    </div>
    <mt-popup v-model='showCatalog' popup-transition='popup-fade' style='width:100%'>
      <mt-picker :slots='slots01' valueKey='value' @change='onValuesChange01' />
    </mt-popup>
    <mt-popup v-model='showIntegral' popup-transition='popup-fade' style='width:100%'>
      <mt-picker :slots='slots02' valueKey='value' @change='onValuesChange02' />
    </mt-popup>
    <input type='file' id='imgField' @change='getFile' accept='image/png, image/jpeg, image/jpg' style='display:none' />
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import DataSlots01 from './modules/data_slots01'
import DataSlots02 from './modules/data_slots02'
import { integralArray } from 'plugins-methods'
import { contentUpload } from '@/api/content'
import { userCount } from '@/api/user'
import { postDispatch } from '@/api/post'

export default {
  name: 'newPost',
  components: { MyHeader },
  data () {
    return {
      title: '',
      content: '',
      showCatalog: false,
      showIntegral: false,
      fileList: [],
      slots01: DataSlots01,
      slots02: DataSlots02,
      catalog: {},
      integral: {}
    }
  },
  computed: {
    isValidate () {
      return !!(this.title && this.content)
    }
  },
  mounted () {
    userCount({ reqIntegral: 1 }).then(({ code, data }) => {
      if (code === 200) {
        const { countIntegral } = data
        if (countIntegral < 20) {
          this.$Toast('您的积分少于 20 ，无法发帖！')
        } else {
          const tempIntegral = integralArray
          tempIntegral.push(200, 500)
          tempIntegral.forEach(item => {
            if (item <= countIntegral) {
              this.slots02[0].values.push({ key: `${item}`, value: `${item}积分` })
            }
          })
        }
      }
    })
  },
  methods: {
    chooseImg () {
      document.getElementById('imgField').click()
    },
    deleteImg (index) {
      this.fileList.splice(index, 1)
    },
    getFile (e) {
      const img = e.target.files[0]
      if (img.size > 3145728) {
        this.$Toast('请选择3M以内的图片！')
      } else {
        this.$Loading.show()
        const form = new FormData()
        form.append('file', img, img.name)
        contentUpload(form).then(({ code, msg, data }) => {
          this.$Loading.close()
          if (code === 200) {
            this.fileList.push(data)
          } else {
            this.$Toast(msg)
          }
        })
      }
    },
    onValuesChange01 (picker, values) {
      this.catalog = values[0]
    },
    onValuesChange02 (picker, values) {
      this.integral = values[0]
    },
    generateImageTag (imgList) { // 把图片地址拼装成标签
      let tagStr = ''
      imgList.forEach(item => {
        tagStr += '<br /><img src="' + item + '" style="max-width:90%;" alt /><br />'
      })
      return tagStr
    },
    submit () {
      if (this.isValidate) {
        this.$Loading.show()
        postDispatch.use('mCreate', {
          title: this.title,
          catalog: 'ask',
          integral: '20',
          content: (this.content + this.generateImageTag(this.fileList))
        }).then(({ code, msg }) => {
          this.$Loading.close()
          if (code === 200) {
            Object.assign(this.$data, this.$options.data.call(this)) // 清空当前页面的数据
            this.$Toast('发帖成功！')
            this.$router.back()
          } else {
            this.$Toast(msg)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import "style.scss";
</style>
