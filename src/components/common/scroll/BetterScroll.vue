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
    // 1-创建 BScroll 对象
    const bscroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      // observeImage: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 将bscroll对象保存起来
    this.bscroll = bscroll;
    // 2-监听 scroll 滚动的位置
    this.bscroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    // 3-监听 scroll 滚动到底部
    this.bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      // console.log("上拉刷新");
    });
  },
  methods: {
    getBackTop(x, y, time = 500) {
      // bscroll不为空情况下 往下执行
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.bscroll && this.bscroll.finishPullUp();
    },
    refresh() {
      console.log("图片加载完毕~");
      this.bscroll && this.bscroll.refresh();
    },
    getScrollY() {
      return this.bscroll ? this.bscroll.y : 0;
      // console.log(this.bscroll.y);
    },
  },
};
</script>

<style scoped>
</style>