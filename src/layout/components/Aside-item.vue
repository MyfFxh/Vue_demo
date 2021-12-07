<!--
 * @Date: 2021-12-07 11:05:17
 * @LastEditTime: 2021-12-07 16:54:02
 * @FilePath: \vue-admin-demo\src\layout\components\Aside-item.vue
-->
<template>
  <!-- hidden 属性：是否显示在导航上，例如login -->
  <div v-if="!item.hidden">
    <!-- 没有一个孩子或仅有一个孩子时。并且没有标识一直显示 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <el-menu-item
        v-if="onlyOneChild.meta"
        :index="resolvePath(onlyOneChild.path)"
        :class="{'submenu-title-noDropdown':!isNest}"
      >
        <i :class="'el-icon-'+ onlyOneChild.meta.icon" />
        <span slot="title">{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else>
      <template
        v-if="onlyOneChild.meta"
        slot="title"
      >
        <i :class="'el-icon-'+ item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <aside-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="child.path"
      />
    </el-submenu>
  </div> 
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name: 'AsideItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    /**
     * 为处理component：Layout中只有一个儿子的现象
     */
    hasOneShowingChild(children=[], parent) {
      const showingChildren = children.filter(item => {
        if(item.hidden) {
          return false
        }else {
          this.onlyOneChild = item // 保存唯一的一个儿子
          return true
        }
      })
      if (showingChildren.length ===1) {
        return true
      }else if (showingChildren.length ===0){
        // 如果没有儿子的话， 显示当前父亲
        this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
        return true
      }else{
        return false
      }
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>

</style>