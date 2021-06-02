<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar> 
    <better-scroll class="wrapper" ref="scroll">
      <cart-list :cart-lists='cartLists'/>  
    </better-scroll>
    <!-- 底部工具栏 -->
    <cart-bottom-bar :cart-lists='cartLists'/>
  </div>
</template>
<script>
// 公共组件
import NavBar from 'components/common/navbar/NavBar' 
import BetterScroll from 'components/common/scroll/BetterScroll'
// 辅助函数
import { mapGetters, cartLists } from 'vuex'
// 当前页面子组件
import CartList from './childComps/CartList' 
import CartBottomBar from './childComps/CartBottomBar' 
export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    BetterScroll,
    CartBottomBar 
  },
  computed:{
    // 数组形式
    ...mapGetters(['cartLength', 'cartLists']) 
    // 对象形式
    // ...mapGetters({
    //   cartNum :'cartLength'
    // })
  },
  activated() { 
    this.$refs.scroll.refresh()
  },
};
</script>
<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
}
.wrapper{
  height: calc(100% - 44px - 49px - 41px);
  overflow: hidden;
}
</style>