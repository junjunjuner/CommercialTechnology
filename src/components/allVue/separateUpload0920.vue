<template>
  <div>
    <div class="qa-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="qa-detail">
          <el-form-item label="问题" prop="name">
            <el-input v-model="form.name" placeholder="批量上传时可不填"></el-input>
          </el-form-item>
          <el-form-item label="答案" prop="desc">
            <el-input type="textarea" v-model="form.desc" placeholder="批量上传时可不填"></el-input>
          </el-form-item>
        </div>
        <div class="level-type">
          <el-form-item label="问题级别" prop="level">
            <el-select v-model="form.level" placeholder="请选择" class="type">
              <el-option label="一级加密" value="加密1"></el-option>
              <el-option label="二级加密" value="加密2"></el-option>
              <el-option label="三级加密" value="加密3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="一级分类" class="must" prop="firsttype">
            <div class="type-select">
              <el-select v-model="form.firsttype" class="type">
                <el-option v-for="item in typedata" :value="item.label" :label="item.label" :key="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <div></div>
          <el-form-item label="二级分类" class="not-must" prop="secondtype">
            <div class="type-select">
              <el-select v-model="form.secondtype" class="type">
                <el-option v-for="item in typedata" :value="item.label" :label="item.label" :key="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="qaupload-button">
        <el-button class="single-button" @click="singleSubmit">开始上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Bg2 from '@/assets/picture/logo.png'
export default {
  name: 'separateUpload',
  data () {
    return {
      form: {
        name: '',
        desc: '',
        level: '',
        firsttype: '',
        secondtype: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空哦~',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '描述不能为空哦~',
            trigger: 'blur'
          }
        ],
        level: [
          {
            required: true,
            message: '级别不能为空哦~',
            trigger: 'change'
          }
        ],
        firsttype: [
          {
            required: true,
            message: '一级分类不能为空哦~',
            trigger: 'change'
          }
        ],
        secondtype: [
          {
            required: true,
            message: '二级分类不能为空哦~',
            trigger: 'change'
          }
        ]
      },
      typedata: [
        {value: 'one', label: '离心机'},
        {value: 'two', label: '风管机'},
        {value: 'three', label: '其他'}
      ],
      bg2: Bg2
    }
  },
  methods: {
    singleSubmit () {
      var self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('formMap', JSON.stringify(self.form))
          console.log(formData.get('formMap'))
          // 上传到后台,后台返回状态到前端,根据后台状态返回数据信息
          let status = 200
          if (status === 200) {
            let tip1 = '已上传成功'
            let tip2 = '如需重新修改,请到个人中心-知识管理页面进行修改'
            this.resultSubmit(this.bg2, tip1, tip2)
          } else {
            let tip1 = '上传失败,请重新上传'
            let tip2 = ''
            this.resultSubmit(this.bg2, tip1, tip2)
          }
        }
      })
      // this.resultSubmit()
    },
    saveCheckOper () {
      var self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('formMap', JSON.stringify(self.form))
          console.log(formData.get('formMap'))
          formData.append('batchFile', self.fileList[0])
          console.log(formData.get('batchFile'))
        }
      })
    },
    resultSubmit (picture, tip1, tip2) {
      const h = this.$createElement
      this.$msgbox({
        message: h('p', null, [
          h('div', {
            style: {
              backgroundImage: 'url(' + picture + ')',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '50px',
              height: '50px'
            }
          }),
          h('div', null, tip1),
          h('div', null, tip2)
        ]),
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          done()
        }
      })
    }
  }
}
</script>

<style scoped>
  /*!*主体部分 *!*/
  /*.qa-content {*/
    /*margin-top: 80px;*/
  /*}*/
  /*表单旁边字体部分 */
  .qa-content >>> .el-form-item__label {
    font-size: 16px;
    color: rgb(51, 51, 51);
    line-height: 19px;
    width: 90px !important;
    padding: 0 9px 0 0;
    text-align: center;
  }
  /*表单内容部分*/
  .qa-content >>> .el-form-item__content {
    margin-left: 110px !important;
    font-size: 13px;
  }
  /*表单文本域部分*/
  .qa-content >>> .el-textarea__inner {
    height: 259px;
    line-height: 16px;
    font-family: Arial;
  }
  /*问题名称、问题描述间距*/
  .qa-detail >>> .el-form-item {
    margin-bottom: 25px;
  }
  /*问题级别、类型部分间距*/
  .level-type >>> .el-form-item {
    margin-bottom: 20px;
  }
  /*问题级别、类型部分选择框长度*/
  .type >>> .el-input__inner {
    width: 273px;
  }
  /*底部按钮位置*/
  .qaupload-button {
    margin: 80px 0 0 450px;
  }
  /*单独上传*/
  .single-button {
    width: 180px;
    height: 40px;
    font-size: 16px;
    background-color: rgb(23, 191, 227);
    border-color: white;
    color: white;
  }

</style>
