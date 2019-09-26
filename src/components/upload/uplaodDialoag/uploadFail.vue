<template>
  <div v-if="show">
    <el-dialog
      class="my-dialog"
      :visible.sync="show"
      width="36%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true">
      <div class="right-icon">
        <img src="../../../assets/picture/test.jpg" class="myimg">
        <div class="tip1">上传失败，请重新上传</div>
        <!--<div class="tip2">如需重新修改，请进入个人中心-知识管理页面进行修改</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="closeShow" class="confirm">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'uploadFail',
  props: ['show'],
  methods: {
    closeShow () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
  .my-dialog >>> .el-dialog {
    min-height: 360px;
    min-width: 420px;
    border-radius: 10px;
    border: 1px solid rgba(121,121,121,1);
  }
  .right-icon {
    text-align: center;
  }
  .myimg {
    width: 89px;
    height: 89px;
  }
  .tip1 {
    color: #17BFE3;
    font-size: 22px;
    font-family: 微软雅黑;
  }
  .confirm {
    width: 140px;
    height: 40px;
    font-size: 15px;
    background-color: rgb(23, 191, 227);
    border-color: white;
    color: white;
  }

</style>
