<template>
  <div class="goods-info" v-if="Object.keys(goodsInfo).length != 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ goodsInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ goodsInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in goodsInfo.detailImage[0].list"
        :src="item"
        alt=""
        @load="imgload"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsInfo",
  data() {
    return {
      // 存放产品图片的数量
      imgsNum: 0,
      imgCount: 0,
    };
  },
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgload() {
      // 发射一次刷新请求。
      // 开启一个计数器，如果计数器的值 === 图片的数量， 发射刷新请求。
      // console.log(++this.imgCount);
      if (++this.imgCount === this.imgsNum) {
        this.$emit("imgload");
      }
    },
  },
  watch: {
    goodsInfo() {
      // 存放产品图片的数量
      this.imgsNum = this.goodsInfo.detailImage[0].list.length;
      // console.log(this.imgsNum);
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>