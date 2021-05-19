<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <better-scroll
      class="wrapper"
      ref="bscroll"
      :probeType="3"
      @scroll="getScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control :titles="titles" class="tab-control" @TabName="getTabName" />
      <goods-list :goods="currentTab" :test="titles" :key="currentTabName" />
    </better-scroll>
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>
<script>
// 公共组件 common-公共组件，content-本项目相关的业务组件
import NavBar from "components/common/navbar/NavBar";
import TabBar from "components/common/tabbar/TabBar";
import BetterScroll from "components/common/scroll/BetterScroll";
import TabControl from "components/content/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/BackTop";

// 本页面的子组件
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";
import HomeFeature from "./childComponents/HomeFeature";

// 引入的方法
import { getHomeMultidata, getHomeGoodsData } from "network/home.js";
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentTabName: "pop",
      // 是否显示返回顶部图标
      isShow: false,
    };
  },
  components: {
    // 公共组件
    NavBar,
    TabBar,
    BetterScroll,
    TabControl,
    GoodsList,
    BackTop,

    // 当前页面子组件
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  methods: {
    // Dom方法
    getTabName(index) {
      switch (index) {
        case 0:
          this.currentTabName = "pop";
          break;
        case 1:
          this.currentTabName = "new";
          break;
        case 2:
          this.currentTabName = "sell";
          break;
      }
    },
    backTop() {
      this.$refs.bscroll.getBackTop(0, 0);
    },
    getScroll(position) {
      console.log(-position.y);
      // 默认backTop图标隐藏
      // 如果y轴滚动到800，则显示 backTop 图标
      this.isShow = -position.y > 800;
    },
    pullingUp() {
      this.getHomeGoodsData(this.currentTabName);
      console.log("home 上拉刷新");
    },

    // 数据请求方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      let page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then((res) => {
        // 将得到的值，赋给另一个数组list
        // 基础用法
        /* 
        for (const list of res.data.data.list) {
          this.goods[type].list.push(list);
        }
        */
        // 高阶函数
        this.goods[type].list.push(...res.data.data.list);
        // 返回请求的数据，并且page+1
        this.goods[type].page += 1;
      });
    },
  },
  computed: {
    currentTab() {
      return this.goods[this.currentTabName].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
};
</script>
<style scoped>
.home-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: var(--color-tint);
  text-align: center;
  color: #fff;
}
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
}
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  /* height: calc(100%); */
  /* overflow: hidden; */
}
.tab-control {
  /* 滚动到指定位置后，粘住 */
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>