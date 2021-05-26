import {
  debounce
} from "common/utils.js";
export const mixin = {
  data() {
    return {
      // 图片加载完成后刷新
      imgLoadListener: null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("goodsImagesLoad", () => {
    //   // this.$refs.bscroll.refresh();
    //   // 对实时监听的图片是否加载完毕进行防抖操作
    //   // console.log(this.$refs.bscroll.refresh);
    //   // debounce(this.$refs.bscroll.refresh, 300);
    //   refresh();
    // });

    this.imgLoadListener = () => {
      refresh();
    };

    this.$bus.$on("goodsImageLoad", this.imgLoadListener);
  },
}
