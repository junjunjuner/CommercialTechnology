<template>
  <div>
    <div class="resource-content">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="70">
      </el-progress>
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
          <el-form-item label="选择资源" prop="file">
            <el-upload
              drag
              class="many-file"
              ref="file"
              action="#"
              name="resouceFiles"
              :http-request="addFiles"
              :with-credentials="true"
              :before-upload="beforeUPload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :on-exceed="handleExceed"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-progress="handleProcess"
              :show-file-list="false"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="files" v-for="(item, index) in fileList" :key="index">
              <!--<span class="test" ref="itemStyle">-->
                <!--{{item}}-->
                <div class="test" :class="{'activeStyle':true}" ref="itemStyle" :style="'width:' + progressPercent + '%'">{{item}}</div>
              <!--</span>-->
              <span v-show="progressFlag" class="head-img">
                <el-progress type="circle" :percentage="progressPercent"></el-progress>
              </span>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div>
      <el-button @click="submitForm()" class="resource-button">开始上传</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resourceUpload',
  data () {
    return {
      allfiles: [],
      progressFlag: false,
      progressPercent: 0,
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
        ],
        file: [
          {
            required: true,
            validator: this.validateFile
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
    /* 表单验证的方法**/
    validateFile: function (rule, value, callback) {
      if (!this.$refs.file.uploadFiles.length) {
        callback(new Error('请选择要上传的文件'))
      } else {
        callback()
      }
    },
    addFiles (content) {
      console.log(content)
      this.fileList.push(content.file.name)
      let formData = new FormData()
      formData.append('resouceFiles', content.file)
      let config = {
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
        }
      }
      this.allfiles.push({'name': content.file.name, 'Percent': this.progressPercent})
      console.log(this.allfiles)
      this.progressFlag = true
      this.$api.uploadapi.resource(formData, config)
        .then(res => {
          // if (this.progressPercent === 100) {
          //   this.progressFlag = false
          //   this.progressPercent = 0
          // }
          console.log(res)
        })
        .error(err => {
          console.log(err)
        })
    },
    beforeUPload (file) {
      if (this.fileList.indexOf(file.name) > -1) {
        this.$message.warning(file.name + ' 已在上传列表哦~')
        return false
      } else {
        return file
      }
    }
    // handleChange (file, fileList) {
    //   this.fileList = fileList
    //   console.log(this.fileList.indexOf(file.name))
    //   if (this.fileList.indexOf(file.name) === -1) {
    //     this.fileList.push(file.name)
    //   }
    // }
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
    padding: 0 9px 0 0;
    text-align: center;
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
  /*问题名称、问题描述间距*/
  .resource-detail >>> .el-form-item {
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
  /*提示位置及样式*/
  .upload-tip {
    margin-top: 44px;
    /*float: right;*/
    color: rgb(23, 191, 227);
    font-size: 14px;
    line-height: 16px;
    font-family: Arial;
    margin-bottom: 10px;
    /*margin-left: 866px;*/
    text-align: right;
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
  .many-file >>> .el-upload-dragger{
    width: 273px;
    height: auto;
  }
  .many-file >>> .el-upload-dragger:hover {
    border-color: #30c2e7;
  }
  .many-file >>> .el-upload-dragger .el-upload__text em {
    color: rgb(23, 191, 227);;
  }
  /*上传附件样式设计*/
  .test {
    background-color: lightgray;
    }
  .activeStyle {
    background-color: red;
  }

</style>
