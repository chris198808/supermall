<template>
  <div id="app">
    <!-- 保持路由状态：vue内置组件 -->
    <!-- 处在keep-alive里的组件，都不会被重新created，mounted，destroy -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar.vue";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
