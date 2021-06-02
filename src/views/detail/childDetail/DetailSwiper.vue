<template>
  <swiper class="swper">
    <swiper-item v-for="(item,index) in banners">
      <img :src="item" alt="" @load="swiperImgLoad"  :key="index"/>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  data(){
    return{
      count:0
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    swiperImgLoad(){
      if(++this.count === this.banners.length){
      this.$emit('swiperImgLoad')
      }
    }
  },
};
</script>

<style scoped>
.swper {
  height: 300px;
}
</style>