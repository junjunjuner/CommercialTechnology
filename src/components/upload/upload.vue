<template>
  <div>
    <div class="header">头部</div>
    <div id="upload-content">
      <div v-if="activeName==='first'">
        <batch-upload>
          <slot name="qa-batch-upload"></slot>
        </batch-upload>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="问答上传" name="first">
          <qa-upload></qa-upload>
        </el-tab-pane>
        <el-tab-pane label="资源上传" name="second">
          <resource-upload></resource-upload>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import QaUpload from './QAupload/qaUpload'
import ResourceUpload from './ResourceUpload/resourceUpload'
import BatchUpload from './QAupload/batchUpload'
export default {
  name: 'upload',
  components: {BatchUpload, ResourceUpload, QaUpload},
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    // handleClick (tab, event) {
    //   console.log(tab, event)
    // }
  }
}
</script>

<style scoped>
  #upload-content {
    margin: 0 19%;
    /*margin: 0 360px;*/
    /*width: 1184px;*/
    min-width: 612px;
    position: relative;
  }
  #upload-content >>> #tab-first {
    font-size:18px;
    margin-left: 30px;
  }
  #upload-content >>> #tab-second {
    font-size:18px;
    padding-left: 50px;
  }
  #upload-content >>> .el-tabs__item {
    font-weight: 700;
    margin-bottom: 3px;
    /*padding: 0 30px;*/
    color: #999999;
  }
  #upload-content >>> .el-tabs__item:hover {
    color: #17BFE3;
  }
  #upload-content >>> .el-tabs__item.is-active {
    color: #17BFE3;
  }
  #upload-content >>> .el-tabs__active-bar {
    height: 4px;
    width: 135px !important;
    background-color: #17BFE3;
  }
  .batch-upload {
    float: right;
    position: absolute;
    top: 100px;
  }
</style>
