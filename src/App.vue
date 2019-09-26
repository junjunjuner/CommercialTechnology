<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  min-width: 1100px;
}
input::-webkit-input-placeholder{
  color: rgb(153, 153, 153) !important;
}
textarea::-webkit-input-placeholder{
  color: rgb(153, 153, 153) !important;
}
.el-textarea__inner,.el-input__inner {
  color: rgb(0, 0, 0);
}
.el-textarea__inner {
  height: 259px;
  line-height: 16px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.el-button {
  /*font-weight: 400;*/
  line-height: 19px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  border-radius: 5px;
}
.el-form-item__label:before {
  /*content: '*';*/
  color: rgb(23,191,227) !important;
  margin-right: 4px;
  font-size: 28px;
  float: left;
  line-height: 32px;
}
</style>
