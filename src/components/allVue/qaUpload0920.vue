<template>
  <div>
    <div class="method-select">
      <el-radio v-model="radio" label="1">单条上传</el-radio>
      <el-radio v-model="radio" label="2">批量上传</el-radio>
    </div>
    <div v-if="radio === '1'">
      <separate-upload></separate-upload>
    </div>
    <div v-else>
      <batch-upload></batch-upload>
    </div>
  </div>
</template>

<script>
import SeparateUpload from './separateUpload0920'
import BatchUpload from '../upload/QAupload/batchUpload'
export default {
  name: 'qaUpload',
  components: {BatchUpload, SeparateUpload},
  data () {
    return {
      radio: '1'
    }
  }
}
</script>

<style scoped>
  .method-select {
    margin-top: 54px;
    margin-bottom: 10px;
    line-height: 16px;
    margin-left: 113px;
  }
  .method-select >>> .el-radio__label {
    font-size: 16px;
  }
  .method-select >>> .el-radio__input.is-checked+.el-radio__label {
    color: #30c2e7;
  }
  .method-select >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #30c2e7;
    background: #30c2e7;
  }

</style>
