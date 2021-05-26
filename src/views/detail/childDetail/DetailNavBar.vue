<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <div
          v-for="(item, index) in titles"
          class="title"
          @click="getTabTitle(index)"
          :class="{ isActive: currentIndex === index }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    NavBar,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getTabTitle(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.back {
  padding-top: 4px;
  text-align: center;
}
.back img {
  margin-top: 3px;
}
.titles {
  display: flex;
}
.title {
  flex: 1;
  font-size: 14px;
  text-align: center;
}
.isActive {
  color: var(--color-high-text);
}
</style>

