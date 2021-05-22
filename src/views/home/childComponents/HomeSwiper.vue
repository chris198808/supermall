<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  data() {
    return {
      isImgLoad: false,
    };
  },
  props: {
    banners: Array,
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    swiperImageLoad() {
      // this.$emit("swiperImageLoad");

      if (!this.isImgLoad) {
        this.$emit("swiperImageLoad");
        this.isImgLoad = true;
      }
    },
  },
};
</script>
<style scoped>
</style>