<template>
  <div class="detail">
    <detail-nav-bar :titles="titles" />
    <better-scroll class="wrapper" ref="scroll">
      <detail-swiper :banners="banners" />
      <goods-base-info :goods-baseInfo="goodsBaseInfo" />
      <shop-info :shop-info="shopInfo" />
      <goods-info :goods-info="goodsInfo" @imgload="imgload" />
      <goods-params :goods-params="goodsParams" />
      <comment :comment="comment" />
      <recommend :goods="recommends" />
    </better-scroll>
  </div>
</template>

<script>
// 公共组件
import BetterScroll from "components/common/scroll/BetterScroll";
// 公共方法
import { debounce } from "common/utils";
import { mixin } from "common/mixin";
// 数据请求
import { getDetailData, getRecommend, GoodsBaseInfos } from "network/detail";
// 当前页面子组件
import DetailNavBar from "./childDetail/DetailNavBar";
import DetailSwiper from "./childDetail/DetailSwiper";
import GoodsBaseInfo from "./childDetail/GoodsBaseInfo";
import ShopInfo from "./childDetail/ShopInfo";
import GoodsInfo from "./childDetail/GoodsInfo";
import GoodsParams from "./childDetail/GoodsParams";
import Comment from "./childDetail/Comment";
import Recommend from "./childDetail/Recommend";

export default {
  name: "Detail",
  data() {
    return {
      iid: this.$route.query.iid,
      // navbar 标题
      titles: ["商品", "参数", "评论", "推荐"],
      banners: [],
      // 商品基本信息
      goodsBaseInfo: {},
      // 店铺信息
      shopInfo: {},
      // 产品图片信息
      goodsInfo: {},
      // 产品参数
      goodsParams: {},
      // 评论
      comment: {},
      // 热门推荐
      recommends: [],
    };
  },
  components: {
    // 公共组件
    BetterScroll,
    // 本页面子组件
    DetailNavBar,
    DetailSwiper,
    GoodsBaseInfo,
    ShopInfo,
    GoodsInfo,
    GoodsParams,
    Comment,
    Recommend,
  },
  methods: {
    imgload() {
      // const refresh = debounce(this.$refs.scroll.refresh, 1000);
      this.$refs.scroll.refresh();
    },
  },
  created() {
    getDetailData(this.iid).then((res) => {
      console.log(res);
      const data = res.data.result;

      // 1-轮播图数据
      this.banners = data.itemInfo.topImages;

      // 2-商品基本信息数据对象
      this.goodsBaseInfo = new GoodsBaseInfos(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3-店铺信息数据
      this.shopInfo = data.shopInfo;

      // 4-产品图片信息
      this.goodsInfo = data.detailInfo;

      // 5-产品参数
      this.goodsParams = data.itemParams;

      // 6-评论
      this.comment = data.rate;
    });

    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
      console.log("recommends:" + this.recommends);
    });
  },
  mixins: [mixin],
  destroyed() {
    console.log("detail销毁");
    this.$bus.$off("goodsImageLoad", this.imgLoadListener);
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
}
.wrapper {
  position: relative;
  z-index: 10;
  background-color: #fff;

  height: calc(100% - 44px);
  overflow: hidden;
}
</style>