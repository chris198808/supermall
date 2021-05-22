<template>
  <div class="detail">
    <detail-nav-bar :titles="titles" />
    <detail-swiper :banners="banners" />
    <goods-base-info />
  </div>
</template>

<script>
// 公共组件
// 数据请求
import { getDetailData, GoodsBaseInfos } from "network/detail";
// 当前页面子组件
import DetailNavBar from "./childDetail/DetailNavBar";
import DetailSwiper from "./childDetail/DetailSwiper";
import GoodsBaseInfo from "./childDetail/GoodsBaseInfo";
export default {
  name: "Detail",
  data() {
    return {
      iid: this.$route.params.iid,
      // navbar 标题
      titles: ["商品", "参数", "评论", "推荐"],
      banners: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    GoodsBaseInfo,
  },
  created() {
    getDetailData(this.iid).then((res) => {
      console.log(res);
      const itemInfo = res.data.result.itemInfo;
      const columns = res.data.result.columns;
      const services = res.data.result.shopInfo.services;
      // 轮播图数据
      this.banners = itemInfo.topImages;
      // 商品基本信息数据对象

      this.goodsBaseInfo = new GoodsBaseInfos(itemInfo, columns, services);
      console.log(this.goodsBaseInfo);
      // 店铺信息数据
    });
  },
  destroyed() {
    console.log("detail销毁");
  },
};
</script>

<style scoped>
</style>