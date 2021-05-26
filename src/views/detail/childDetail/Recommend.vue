<template>
  <div class="recommend">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="goods" />
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
  name: "Recommend",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style scoped>
.recommend {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>> 