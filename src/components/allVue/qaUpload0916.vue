<template>
  <div>
    <div class="qa-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="qa-detail">
          <el-form-item label="问题名称" prop="name">
            <el-input v-model="form.name" placeholder="批量上传时可不填"></el-input>
          </el-form-item>
          <el-form-item label="问题描述" prop="desc">
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
        </div>
      <!--</el-form>-->
    <!--</div>-->
    <div class="qaupload-button">
      <el-button class="many-button" @click="manySubmit()">批量上传</el-button>
      <el-dialog
        title="批量导入"
        :visible.sync="manysubmit"
        width="30%"
        close-on-press-escape="false"
        destroy-on-close="true"
        close-on-click-modal="false">
        <a href="/static/mytest.xlsx" download>模板文件</a>
        <el-form-item prop="file">
        <el-upload
          class="many-file"
          ref="file"
          action="https://jsonplaceholder.typicode.com/posts/"
          v-model="form.file"
          :on-change="uploadChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :limit="1"
          show-file-list>
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">上传文件说明</div>
        </el-upload>
        </el-form-item>
        <el-button @click="manysubmit = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-dialog>
      <el-button class="single-button" @click="singleSubmit">开始上传</el-button>
    </div>
      </el-form>
  </div>
  </div>
</template>

<script>
import Bg2 from '@/assets/picture/logo.png'
let name = [
  {
    required: false,
    message: '名称不能为空哦~',
    trigger: 'blur'
  }
]
let desc = [
  {
    required: false,
    message: '描述不能为空哦~',
    trigger: 'blur'
  }
]
export default {
  name: 'qaUpload',
  data () {
    return {
      fileList: [],
      form: {
        name: '',
        desc: '',
        level: '',
        firsttype: '',
        secondtype: '',
        firsttype_other: '',
        secondtype_other: '',
        file: ''
      },
      rules: {
        name,
        desc,
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
        // file: [
        //   {
        //     required: true,
        //     message: '请选择文件后再上传哦~~',
        //     trigger: 'change'
        //   }
        // ]
      },
      typedata: [
        {value: 'one', label: '离心机'},
        {value: 'two', label: '风管机'},
        {value: 'three', label: '其他'}
      ],
      manysubmit: false,
      bg2: Bg2
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
    manySubmit () {
      console.log(this.$refs.form)
      Object.assign(this.rules, {
        name,
        desc,
        file: []
      })
      this.$refs.form.validate(valid => {
        if (valid) {
          this.manysubmit = true
        } else {
          console.log(valid)
        }
      })
      // setTimeout(() => {
      //   this.$refs.form.clearValidate(['name', 'desc'])
      // }, 0)
    },
    submitForm () {
      console.log(this.$refs.form)
      Object.assign(this.rules, {
        name,
        desc,
        file: [{validator: this.validateFile}]
      })
      this.$refs.form.validate(valid => {
        if (valid) {
          this.manysubmit = false
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
    },
    singleSubmit () {
      Object.assign(this.rules, {
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
        ]
      })
      setTimeout(() => {
        this.$refs.form.validateField(['name', 'desc'])
      }, 0)
      this.$refs.form.validate()
    },
    uploadChange: function (file, filelist) {
      if (filelist.length && filelist.length >= 1) {
        /* 引用对象然后验证表单域-这个可以清除上一步不通过时的提示 */
        this.$refs.form.validateField('file')
      }
      if (filelist.length > 1) {
        filelist.splice(0, 1)
      }
      this.$refs.file.$el.children[0].children[1].value = ''
    },
    /* 表单验证的方法**/
    validateFile: function (rule, value, callback) {
      if (!this.$refs.file.uploadFiles.length) {
        callback(new Error('请选择要上传的文件'))
        // } else if (this.$refs.uploadMaterialFile.uploadFiles.length > 1) {
        //   callback(new Error('每次上传只支持一个文件'));
      } else {
        var regx = new RegExp('(.xlsx)$|(.doc)$|(.docx)$|(.xls)$')
        /* 这里有个坑，单文件上传，第一次上传错误格式接着上传第二次格式，列表中数组值有两个 */
        if (!regx.test(this.$refs.file.uploadFiles[this.$refs.file.uploadFiles.length - 1].name)) {
          callback(new Error('文件格式只支持xlsx、doc、docx、xls'))
        }
        callback()
      }
    }
  }
}
</script>

<style scoped>
   /*主体部分 */
  .qa-content {
    margin-top: 80px;
  }
   /*表单旁边字体部分 */
  .qa-content >>> .el-form-item__label {
    font-size: 16px;
    color: rgb(51, 51, 51);
    line-height: 19px;
    width: 90px !important;
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
  .qa-detail >>> .el-form-item {
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
   /*底部按钮位置*/
   .qaupload-button {
     margin: 80px 0 0 450px;
   }
   /*批量上传*/
  .many-button {
    width: 180px;
    height: 40px;
    font-size: 16px;
    margin-right: 40px;
    background-color: white;
    border: 1px solid rgb(23, 191, 227);
    color: rgb(23, 191, 227);
  }
   .many-button:focus {
     border-color: rgb(23, 191, 227);
   }
   .many-button:hover, .single-button:hover {
     font-size: 18px;
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
