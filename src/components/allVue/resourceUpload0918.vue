<template>
  <div>
    <div class="resource-content">
      <div class="upload-tip"><span>命名规则：XXX+XXXX+XXXX</span><span>如：YYYYYYYYY</span></div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="resource-detail">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资源描述" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </div>
        <div class="level-type">
          <el-form-item label="资源级别" prop="level">
            <el-select v-model="form.level" placeholder="请选择" class="type">
              <el-option label="一级加密" value="加密1"></el-option>
              <el-option label="二级加密" value="加密2"></el-option>
              <el-option label="三级加密" value="加密3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="必填" class="must" prop="firsttype">
            <div class="type-select">
              <el-select v-model="form.firsttype" class="type">
                <el-option v-for="item in typedata" :value="item.label" :label="item.label" :key="item.value">
                </el-option>
              </el-select>
              <el-input class="other" v-model="form.firsttype_other" v-show="form.firsttype == '其他'? true: false" prop="firsttype_other">
              </el-input>
            </div>
          </el-form-item>
          <div></div>
          <el-form-item label="非必填" class="not-must" prop="secondtype">
            <div class="type-select">
              <el-select v-model="form.secondtype" class="type">
                <el-option v-for="item in typedata" :value="item.label" :label="item.label" :key="item.value">
                </el-option>
              </el-select>
              <el-input class="other" v-model="form.secondtype_other" v-show="form.secondtype == '其他'? true: false" prop="secondtype_other">
              </el-input>
            </div>
          </el-form-item>
          <!--<el-form-item label="选择资源">-->
            <!--<el-upload class="upload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple show-file-list>-->
              <!--<i class="el-icon-upload"></i>-->
              <!--<div class="upload-text">将文档拖到此处，或<em>点击上传</em></div>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
        </div>
      </el-form>
    </div>
    <div>
      <!--<div class="img2" :style="{backgroundImage: 'url(' + bg2 + ')',backgroundRepeat: 'no-repeat',backgroundSize: '50px',height:'50px'}"></div>-->
      <el-button @click="openMessage()" class="resource-button">开始上传</el-button>
      <el-dialog
        title="批量导入"
        :visible.sync="resourceDialog"
        width="30%"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        :close-on-click-modal="false">
        <!--<el-form-item prop="file">-->
        <el-upload
          class="many-file"
          ref="file"
          action="#"
          v-model="form.file"
          :http-request="addFiles"
          :on-change="uploadChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          multiple
          show-file-list>
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">上传文件说明</div>
        </el-upload>
        <!--</el-form-item>-->
        <el-button @click="resourceDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Bg2 from '@/assets/picture/logo.png'
export default {
  name: 'resourceUpload',
  data () {
    return {
      bg2: Bg2,
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
            message: '必填项不能为空哦~',
            trigger: 'change'
          }
        ]
      },
      typedata: [
        {value: 'one', label: '离心机'},
        {value: 'two', label: '风管机'},
        {value: 'three', label: '其他'}
      ],
      resourceDialog: false,
      fileList: []
    }
  },
  methods: {
    handlePreview (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed (file, fileList) {
      console.log(file)
    },
    openMessage () {
      this.$refs.form.clearValidate(['file'])
      Object.assign(this.rules, {
        file: []
      })
      this.$refs.form.validate(valid => {
        if (valid) {
          this.resourceDialog = true
        } else {
          console.log(valid)
        }
      })
    },
    submitForm () {
      Object.assign(this.rules, {
        file: [{validator: this.validateFile}]
      })
      this.saveCheckOper()
      this.resultSubmit()
    },
    uploadChange: function (file, filelist) {
      // if (filelist.length && filelist.length >= 1) {
      //   /* 引用对象然后验证表单域-这个可以清除上一步不通过时的提示 */
      //   this.$refs.form.validateField('file')
      // }
      // if (filelist.length > 1) {
      //   filelist.splice(0, 1)
      // }
      // this.$refs.file.$el.children[0].children[1].value = ''
    },
    /* 表单验证的方法**/
    validateFile: function (rule, value, callback) {
      if (!this.$refs.file.uploadFiles.length) {
        callback(new Error('请选择要上传的文件'))
        // } else if (this.$refs.uploadMaterialFile.uploadFiles.length > 1) {
        //   callback(new Error('每次上传只支持一个文件'));
      } else {
        callback()
      }
    },
    saveCheckOper () {
      var self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('formMap', JSON.stringify(self.form))
          console.log(formData.get('formMap'))
          self.fileList.forEach((fileObj, index) => {
            formData.append('file_' + index, fileObj)
          })
          formData.append('fileNum', self.fileList.length)
        }
      })
    },
    addFiles (file) {
      // console.log(file)
      this.fileList.push(file.file)
      console.log(this.fileList)
    },
    resultSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.resourceDialog = false
          const h = this.$createElement
          this.$msgbox({
            message: h('p', null, [
              h('div', {
                style: {
                  backgroundImage: 'url(' + this.bg2 + ')',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '50px',
                  height: '50px'
                }
              }),
              h('div', null, '已上传成功')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              done()
            }
          })
        } else {
          console.log(valid)
        }
      })
    }
  }
}
</script>

<style scoped>
  /*主体部分 */
  .resource-content {
    margin-top: 54px;
  }
  /*表单旁边字体部分 */
  .resource-content >>> .el-form-item__label {
    font-size: 16px;
    color: rgb(51, 51, 51);
    line-height: 19px;
    width: 90px !important;
  }
  /*表单内容部分*/
  .resource-content >>> .el-form-item__content {
    margin-left: 110px !important;
    font-size: 13px;
  }
  /*表单文本域部分*/
  .resource-content >>> .el-textarea__inner {
    height: 259px;
    line-height: 16px;
    font-family: Arial;
  }
  /*必填、非必填整体（包含其他选项）长度*/
  .type-select {
    width: 530px;
  }
  /*必填字体大小、颜色*/
  .must >>> .el-form-item__label {
    font-size: 13px;
    color: rgb(23, 191, 227);
  }
  /*非必填字体大小、颜色*/
  .not-must >>> .el-form-item__label {
    font-size: 13px;
    color: rgb(153, 51, 225);
  }
  /*问题名称、问题描述间距*/
  .resource-detail >>> .el-form-item {
    margin-bottom: 25px;
  }
  /*问题级别、类型部分间距*/
  .level-type >>> .el-form-item {
    margin-bottom: 10px;
  }
  /*问题级别、类型部分选择框长度*/
  .type >>> .el-input__inner {
    width: 273px;
  }
  /*其他文本框位置及长度*/
  .other{
    float: right;
    width: 210px;
  }
  /*提示位置及样式*/
  .upload-tip {
    margin-top: 44px;
    /*float: right;*/
    color: rgb(23, 191, 227);
    font-size: 14px;
    line-height: 16px;
    font-family: Arial;
    margin-bottom: 10px;
    margin-left: 866px;
  }
  .upload-tip span {
    margin-left: 10px;
  }
  /*上传按钮*/
  .resource-button {
    width: 180px;
    height: 40px;
    font-size: 16px;
    margin: 80px 0 0 580px;
    background-color: rgb(23, 191, 227);
    border-color: white;
    color: white;
  }
  .resource-button:focus {
    border-color: rgb(23, 191, 227);
  }
  .resource-button:hover {
    font-size: 18px;
  }

</style>
