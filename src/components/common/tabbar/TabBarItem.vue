<template>
  <div class="tabbaritem" @click="getPath">
    <div v-if="!isActive">
      <slot name="icon"></slot>
    </div>
    <div v-else>
      <slot name="icon-selected"></slot>
    </div>
    <div :class="active"><slot name="tabmess"></slot></div>
    <!-- <img src="~assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>
<script>
export default {
  props: {
    path: String,
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path == this.path;
    },
    active() {
      return this.isActive ? "active" : "";
    },
  },
  methods: {
    getPath() {
      // console.log(this.path);
      this.$router.push({
        path: this.path,
      });
    },
  },
};
</script>
<style scoped>
.tabbaritem {
  flex: 1;
  text-align: center;
}
.tabbaritem img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
}
.active {
  color: red;
}
</style>