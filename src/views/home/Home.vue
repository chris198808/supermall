<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend :recommends="recommends" />
    <home-feature />
    <tab-control :titles="titles" />

    <!-- 占位 -->
    <ul>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
      <li>'占位'</li>
    </ul>
  </div>
</template>
<script>
// 公共组件 common-公共组件，content-本项目相关的业务组件
import NavBar from "components/common/navbar/NavBar";
import TabBar from "../../components/common/tabbar/TabBar";
import TabControl from "components/content/TabControl";

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
    };
  },
  components: {
    NavBar,
    TabBar,
    TabControl,

    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then((res) => {
        // 返回请求的数据，并且page+1
        this.goods[type].page += 1;
        // 将得到的值，赋给另一个数组list
        // 基础用法
        /* 
        for (const list of res.data.data.list) {
          this.goods[type].list.push(list);
        }
        */
        // 高阶函数
        this.goods[type].list.push(...res.data.data.list);
      });
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
  padding-top: 44px;
}
</style>