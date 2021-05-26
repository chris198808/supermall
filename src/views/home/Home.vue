<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      class="tab-control"
      @TabName="getTabName"
      ref="tabControl1"
      v-show="isfixed"
    />
    <better-scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="getScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control
        :titles="titles"
        class="tab-control"
        @TabName="getTabName"
        ref="tabControl2"
      />
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
import { debounce } from "common/utils.js";
import { mixin } from "common/mixin";

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
      isfixed: false,
      // TabControl与顶部的距离
      tabControlOffTop: 0,
      // 记录离开时Y轴的值
      y: 0,
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.getBackTop(0, 0);
    },
    getScroll(position) {
      // console.log(-position.y);
      // 默认backTop图标隐藏
      // 如果y轴滚动到800，则显示 backTop 图标
      this.isShow = -position.y > 800;
      // 当getScroll滚动到tabControl.offsetTop的位置 537，固定tabControl
      /**
       * 产生的效果，由于固定定位脱离标准流，分类栏 到达指定位置后 一闪消失。
       * scroll用的是translate滚动，translate滚动对固定定位的元素也进行移动，可能已经移动到其他位置。
       * 使用以上方法无效。
       *
       * 解决方案：
       * 拷贝一份tabControl组件，放在需要顶部显示位置，先隐藏。
       * 当元tabControl组件滚动到指定位置，显示拷贝的tabControl组件。
       */
      // 得到 tabControl元素 与顶部的距离
      // console.log("得到 tabControl元素 与顶部的距离" + this.tabControlOffTop);
      this.isfixed = -position.y >= this.tabControlOffTop;
    },
    pullingUp() {
      this.getHomeGoodsData(this.currentTabName);
      // console.log("home 上拉刷新");
      this.$refs.scroll.finishPullUp();
    },
    swiperImageLoad() {
      // console.log("swiperImageLoad");
      this.$refs.scroll.refresh();
      // debounce(this.$refs.scroll.refresh, 5000);
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabControlOffTop = this.$refs.tabControl2.$el.offsetTop;
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
  mixins: [mixin],
  activated() {
    // 解决有时候会返回到顶部问题：先刷新一下，重新把高度算一遍
    this.$refs.scroll.refresh();
    // 激活组件时将跳转到离开时Y轴的值
    this.$refs.scroll.getBackTop(0, this.y);
    console.log("组件被激活.Y:" + this.y);
  },
  deactivated() {
    // 离开组件记录当前Y轴滚动的状态
    this.y = this.$refs.scroll.getScrollY();
    console.log("组件失去激活状态.Y:" + this.y);
    // 离开组件，销毁 图片加载完成后刷新事件
    this.$bus.$off("goodsImageLoad", this.imgLoadListener);
  },
};
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}
.home-navbar {
  /* 使用了better-scroll,滚动区域独立 ，形成了标准流，自然贴合到navbar下方*/
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  background: var(--color-tint);
  text-align: center;
  color: #fff;
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
  /* 使用 bsroll插件后失效 */
  /* position: sticky;
  top: 44px;
  z-index: 9; */
  /* 提升一下层级，但不脱离标准流 */
  position: relative;
  z-index: 9;
}
/* .isfixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
</style>