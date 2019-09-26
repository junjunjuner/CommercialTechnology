<template>
  <div>
    <div slot="qa-batch-upload" class="qa-batch">
      <div class="demo-excel">
        <a href="/static/mytest.xlsx" download>模板文件</a>
      </div>
      <el-button class="many-button" @click="useTip = true ">批量上传</el-button>
      <el-dialog
        class="batch-dialog"
        title="批量导入"
        :visible.sync="useTip"
        height="500px"
        width="36%"
        :center="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
          <el-upload
            class="many-file"
            ref="file"
            action="/api/upload/api/batch-knowlwdge"
            name="fromExcel"
            :with-credentials="true"
            accept=".xlsx,.xls"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            show-file-list>
            <el-button class="select-file">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              <div>导入方法:</div>
              <div>1.下载对应模板文件</div>
              <div>2.根据模板文件中的字段要求进行填写</div>
              <div>3.选择填好的文件作为上传文件</div>
            </div>
          </el-upload>
          <span slot="footer" class="submit-button">
            <el-button @click="submitForm">提 交</el-button>
          </span>
        <!--<div class="submit-button">-->
          <!--&lt;!&ndash;<el-button @click="useTip = false">取消</el-button>&ndash;&gt;-->
          <!--<el-button type="primary" @click="submitForm">提 交</el-button>-->
        <!--</div>-->
      </el-dialog>
      <div class="my-tip">
        <upload-success :show.sync="successFlag"></upload-success>
        <upload-fail :show.sync="failFlag"></upload-fail>
      </div>
    </div>
    </div>
</template>

<script>
import Bg2 from '@/assets/picture/logo.png'
import UploadSuccess from '../uplaodDialoag/uploadSuccess'
import UploadFail from '../uplaodDialoag/uploadFail'
// import https from '../../../https.js'
export default {
  name: 'batchUpload',
  components: {UploadFail, UploadSuccess},
  data () {
    return {
      bg2: Bg2,
      useTip: false,
      fileList: [],
      successFlag: false,
      failFlag: false
    }
  },
  methods: {
    handleExceed (file, fileList) {
      return this.$message.warning('只能上传一个文件哦～如需修改，请删除原文件后重新选择')
    },
    submitForm () {
      if (this.$refs.file.uploadFiles.length !== 0) {
        this.$refs.file.submit()
        // if (this.beforeUpload(this.$refs.file.uploadFiles[0]) === true) {
        //   this.$refs.file.submit()
        // }
      } else {
        return this.$message.warning('请选择文件后提交哦～')
      }
    },
    beforeUpload (file) {
      let myxlsx = file.name.split('.')
      if (myxlsx[myxlsx.length - 1] === 'xlsx' || myxlsx[myxlsx.length - 1] === 'xls') {
        return true
      } else {
        this.$message.warning('仅支持excel文件，请选择正确的文件类型哦～')
        return false
      }
    },
    uploadSuccess (res, file, fileList) {
      console.log(res)
      if (res.code === 200) {
        this.useTip = false
        this.$refs.file.clearFiles()
        this.successFlag = true
        // this.commonMethod.successSubmit()
      } else {
        this.useTip = false
        this.$refs.file.clearFiles()
        this.failFlag = true
      }
    },
    uploadError (err, file, fileList) {
      console.log(err)
      this.useTip = false
      this.$refs.file.clearFiles()
      this.failFlag = true
    }
  }
}
</script>

<style scoped>
  /*批量上传所在位置*/
  .qa-batch {
    width: 300px;
    height: 40px;
    position: absolute;
    left: 89%;
    top: 3px;
    z-index: 3000;
  }
  .qa-batch-upload[data-v-22aafccb] >>> .el-form-item__content {
    font-size: 16px !important;
  }
  /*模板文件字体颜色*/
  a:-webkit-any-link {
    color: #006699 !important;
    text-decoration: white;
  }
  /*模板文件*/
  .demo-excel {
    width: 100px;
    height: 38px;
    float: left;
    line-height: 40px;
    text-align: center;
    border-bottom: 2px solid #006699;
    /*z-index: 1;*/
  }
  /*批量上传按钮*/
  .many-button {
    color: white;
    background-color: rgba(0,102,153,1);
    font-size: 16px;
    text-align: center;
    width: 120px;
    height: 40px;
    margin-left: 30px;
  }
  .batch-dialog >>> .el-dialog {
    min-height: 360px;
    min-width: 420px;
  }
  /*批量上传dialog*/
  .batch-dialog >>> .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: rgb(51, 51, 51);
    font-weight: 700;
  }
  /*选择文件按钮*/
  .select-file {
    color: white;
    background-color: rgba(0,102,153,1);
    font-size: 16px;
    text-align: center;
    width: 120px;
    height: 40px;
  }
  .el-upload__tip {
    font-size: 13px;
    color: #10699d;
    margin-top: 20px;
  }
  .el-upload__tip div {
    margin-bottom: 5px;
  }
  .submit-button button{
    width: 120px;
    height: 40px;
    font-size: 16px;
    background-color: rgb(23, 191, 227);
    border-color: white;
    color: white;
    /*float: right;*/
  }
  .batch-dialog >>> .el-upload-list {
    min-height: 50px;
  }

</style>
