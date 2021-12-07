<template>
  <div>
    <el-scrollbar>
      <!-- element-ui 的滚动条 官方没有 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        mode="vertical"
        router
      >
        <aside-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import AsideItem from './Aside-item.vue'
import variables from '@/styles/variables.scss'
export default {
  name: 'Aside',
  components: { AsideItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path} = route // 获取路由的meta和path，用于定位当前显示的页面
      if (meta.activeMenu) {
        // 如果有设置 activeMenu，则返回activeMenu
        // 一般当path为动态路由时，设置activeMenu
        return meta.activeMenu
      }
      // 如果没有则直接返回path，用于定位
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return this.sidebar.opend
    }
  }
}
</script>

<style>

</style>