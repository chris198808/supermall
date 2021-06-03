<template>
  <div class="detail">
    <!-- 商品信息 -->
    <detail-nav-bar :titles="titles" @offTop="offTop" ref="detailNavBar" />
    <better-scroll class="wrapper" ref="scroll" @scroll="scroll">
      <detail-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <goods-base-info :goods-base-info="goodsBaseInfo" />
      <shop-info :shop-info="shopInfo" />
      <goods-info :goods-info="goodsInfo" @imgload="imgload" />
      <!-- 参数 -->
      <goods-params :goods-params="goodsParams" ref="params" />
      <!-- 评论 -->
      <comment :comment="comment" ref="comment" />
      <!-- 热门推荐 -->
      <recommend :goods="recommends" ref="recommend" />
    </better-scroll>
    <!-- 底端工具栏 -->
    <detail-bottom-nav @addCart="addCart"/>
    <!-- 返回顶部 -->
    <back-top v-show="isShow" @click.native="backTop"/>

    <!-- 提示框 -->
    <toast :is-show-toast="isShowToast" :toast-info="toastInfo"/>
  </div>
</template>

<script>
// 常量
import { BACK_TOP } from "common/const"
// 公共组件
import BetterScroll from "components/common/scroll/BetterScroll"; 
import Toast from "components/common/toast/Toast"
// 公共方法
import { mixin,backTop } from "common/mixin";
// 映射Vuex中的actions方法
import { mapActions } from "vuex"
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
import DetailBottomNav from './childDetail/DetailBottomNav' 

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
      // "商品", "参数", "评论", "推荐" 距离顶部的距离
      offTopArr: [],
      // 当前标题和内容联动
      currentIndex: 0, 
      isShowToast: false,
      toastInfo: ""
    };
  },
  components: {
    // 公共组件
    BetterScroll, 
    Toast,

    // 本页面子组件
    DetailNavBar,
    DetailSwiper,
    GoodsBaseInfo,
    ShopInfo,
    GoodsInfo,
    GoodsParams,
    Comment,
    Recommend,
    DetailBottomNav 
  },
  methods: {
    imgload() {
      // const refresh = debounce(this.$refs.scroll.refresh, 1000);
      this.$refs.scroll.refresh();
      // 商品的位置 y:0
      this.offTopArr.push(0),
        // 参数的位置
        this.offTopArr.push(this.$refs.params.$el.offsetTop);
      // 评论的位置
      this.offTopArr.push(this.$refs.comment.$el.offsetTop);
      // 热门推荐的位置
      this.offTopArr.push(this.$refs.recommend.$el.offsetTop);
      this.offTopArr.push(Number.MAX_VALUE)
      // console.log(this.offTopArr);
    },
    offTop(index) {
      let scrollY = this.offTopArr[index];
      // console.log(scrollY);
      this.$refs.scroll.getBackTop(0, -scrollY);
    },
    scroll(posion) {
      // console.log(this.$refs.scroll.getScrollY());
      // - 0, 2671, 3516, 3804
      // - 商品：Y>=0 && Y<2671
      // - 参数：Y>=2671 && Y< 3516
      // - 评论：Y>=3516 && Y<3804
      // - 推荐：Y>3804
 
      let posionY = -posion.y; 
      let iLength = this.offTopArr.length 
      for (let i = 0; i < iLength-1; i++) {
        //  每滚动一个像素都会调用一下

        // 复杂做法
      //   if (
      //     // (this.currentIndex !== i) 控制输出（赋值）的频率
      //     // (i < iLength-1 && posionY >= this.offTopArr[i] && posionY < this.offTopArr[i + 1])
      //       // 条件1：i < iLength-1 | 判断区间： 在 0 和 某个数字 之间 （0 ~ 3） 
      //     // (i === iLength-1 && posionY >= this.offTopArr[i])
      //       // 条件2：判断大于等于 | i === iLength-1
          
      //     (this.currentIndex !== i) &&
      //     ((i < iLength-1 && posionY >= this.offTopArr[i] && posionY < this.offTopArr[i + 1]) ||
      //     (i === iLength-1 && posionY >= this.offTopArr[i]))
      //   ) {
      //     this.currentIndex = i
      //   }
      // }

      // hack做法 
      if((this.currentIndex !== i) && (posionY >= this.offTopArr[i] && posionY < this.offTopArr[i+1])){
        this.currentIndex = i 
      }
      }

      // 给标题栏currentIndex赋值
      this.$refs.detailNavBar.currentIndex = this.currentIndex

       // posionY大于600显示backTop 
      this.isShow = posionY > BACK_TOP 
       
    },
    addCart(){
      
      // 将购物车列表需要的数据打包传递
      // iid,产品图片1张，标题，描述，价格
      const pro = {}
      pro.iid = this.iid
      pro.img = this.banners[0]
      pro.titles = this.goodsBaseInfo.title
      pro.lowNowPrice = this.goodsBaseInfo.lowNowPrice
      pro.desc = this.goodsBaseInfo.desc
      // console.log(pro);

       // 1- 数据处理完成，通过promise返回 文本信息 
      this.$store.dispatch('addCart',pro).then(res=>{

        // 1-普通方式 使用 toast
        /**
         this.toastInfo = res 
        this.isShowToast = true

        setTimeout(()=>{
          this.isShowToast = false
          this.toastInfo = ""
        },1500)
         */
        // 2-组件封装的插件
       
      
      // 将文本信息 传给 Toast.vue
      this.$toast.showToast(res,2000)
      })
    },
    // 轮播图图片加载完成refresh
    swiperImgLoad(){
      this.$refs.scroll.refresh()
    }
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
    // 7-热门推荐
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
      // console.log("recommends:" + this.recommends);
    });
  },
  mixins: [mixin,backTop],
  // mixins:[backTop],
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

  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
 
</style>