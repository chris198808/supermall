<template>
  <div>
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComponents/HomeSwiper";

import { getHomeMultidata } from "network/home.js";
export default {
  data() {
    return {
      banners: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
  },
  created() {
    getHomeMultidata().then((res) => {
      this.banners = res.data.data.banner.list;
    });
  },
};
</script>
<style scoped>
.home-navbar {
  background: var(--color-tint);
  text-align: center;
  color: #fff;
}
</style>