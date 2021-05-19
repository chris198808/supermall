<template>
  <div class="goods-list">
    <goods-list-item v-for="item of goods" :item="item" />
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
  created() {
    // console.log(this.goods);
  },
};
</script>
<style scoped>
.goods-list {
  display: flex;
  /* 换行；默认不换行-nowrap */
  flex-wrap: wrap;
  /* 内容对齐：平分空间 */
  justify-content: space-evenly;
}
</style>