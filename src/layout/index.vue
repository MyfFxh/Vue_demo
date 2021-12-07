<template>
  <el-container>
    <el-aside width="200px">
      <m-aside />
    </el-aside>
    <el-container>
      <el-header><m-header /></el-header>
      <el-main><router-view /></el-main>
      <el-footer><m-footer /></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import MAside from './components/Aside.vue'
import MHeader from './components/Header.vue'
import MFooter from './components/Footer.vue'
export default {
  name: 'Layout',
  components:{
    MAside,
    MHeader,
    MFooter
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
aside {
  margin-bottom:0;
  padding: 0
}
</style>