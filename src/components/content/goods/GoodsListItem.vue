<template>
  <div class="goods-list-item" @click="skipDetail">
    <!-- <img @load="goodsImageLoad" :src="item.show.img" :alt="item.title" /> -->
    <img @load="goodsImageLoad" :src="detailImg" :alt="item.title" />
    <div class="goods-info">
      <p>{{ item.title }}</p>
      <span class="price">{{ item.price }}</span>
      <span class="collect">{{ item.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isPath: this.$route.path,
    };
  },
  computed: {
    detailImg() {
      // 自己的思路
      // if (this.isPath == "/home") {
      //   console.log(this.isPath);
      //   return this.item.show.img;
      // } else if (this.isPath == "/detail") {
      //   console.log(this.isPath);
      //   return this.item.image;
      // }

      // 老师的思路
      return this.item.image || this.item.show.img;
    },
  },
  methods: {
    goodsImageLoad() {
      this.$bus.$emit("goodsImageLoad");
    },
    skipDetail() {
      // 需要有返回，使用push设置跳转，replace设置没有返回
      // this.$router.push("/detail/" + this.item.iid);
      this.$router.push({ path: "/detail", query: { iid: this.item.iid } });
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  /* 文字超出显示... */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  /* 添加收藏图标 */
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>