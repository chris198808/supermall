<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/home.svg" slot="icon" alt="" />
        <img
          src="~assets/img/tabbar/home_active.svg"
          slot="icon-selected"
          alt=""
        />
        <div slot="tabmess">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/tabbar/category.svg" slot="icon" alt="" />
        <img
          src="~assets/img/tabbar/category_active.svg"
          slot="icon-selected"
          alt=""
        />
        <div slot="tabmess">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/img/tabbar/shopcart.svg" slot="icon" alt="" />
        <img
          src="~assets/img/tabbar/shopcart_active.svg"
          slot="icon-selected"
          alt=""
        />
        <div slot="tabmess">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/tabbar/profile.svg" slot="icon" alt="" />
        <img
          src="~assets/img/tabbar/profile_active.svg"
          slot="icon-selected"
          alt=""
        />
        <div slot="tabmess">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>
<style scoped>
</style>