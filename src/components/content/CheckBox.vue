<template>
  <div class="checkbox"> 
    <span class="check-btn" :class="{checked:isChecked}">
      <img v-show="isChecked" src="~assets/img/cart/tick.svg" alt="">
    </span>
  </div>
</template>

<script>
export default {
  name:"Checkbox",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.check-btn{
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px #ccc solid;
}
.check-btn img{
  position: absolute;
  left: 3px;
  top: 3px;

  width: 12px;
  height: 12px;
}
.checked{
  border: 0;
  background-color: var(--color-tint);
}
</style>