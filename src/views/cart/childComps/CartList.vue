<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartLists" :key="index" :item="item"/> 
  </div>
</template>

<script>
import CartListItem from './CartListItem'
export default {
  name:'CartList',
  props:{
    cartLists:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    CartListItem
  }
}
</script>

<style scoped>
.cart-list{
  width: 100%;
  overflow: hidden;
}
</style>