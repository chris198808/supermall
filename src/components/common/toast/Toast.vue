<template>
  <div class="toast" v-show="isShowToast" >{{toastInfo}}</div> 
</template>

<script>
export default {
  name:"Toast", 
  data() {
    return {
      isShowToast:false,
      toastInfo:""
    }
  },
  methods: {
    showToast(res,duration=1500){
      this.isShowToast = true,
      this.toastInfo = res,
      setTimeout(()=>{
        this.isShowToast = false,
        this.toastInfo = ""
      },duration)
    }
  },
}
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    
  }

</style>