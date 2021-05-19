<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      bscroll: {},
    };
  },
  props: {
    // probeType 根据实际情况判断，需要实时监听滚动的页面设置为3，不需要实时监听时设为0
    // probeType:2,只有手指滑动屏幕时实时派发
    // probeType:3 任何时候都会实施派发
    probeType: {
      type: Number,
      defalut: 0,
    },
    // 有些界面不需要上拉加载功能，为了性能应该考虑关闭
    pullUpLoad: {
      type: Boolean,
      defalut: false,
    },
  },
  mounted() {
    const bscroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      observeImage: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    this.bscroll = bscroll;
    this.bscroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    this.bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      // console.log("上拉刷新");
      this.bscroll.finishPullUp();
    });
  },
  methods: {
    getBackTop(x, y, time = 500) {
      this.bscroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>