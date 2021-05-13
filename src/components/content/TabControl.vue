<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      @click="getTabActive(index)"
      :class="{ active: currentIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    getTabActive(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.active {
  color: var(--color-high-text);
}
.active span {
  padding: 2px;
  border-bottom: 2px solid var(--color-tint);
}
</style>