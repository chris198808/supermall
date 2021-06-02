<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-box class="check-box" :is-checked="checkState"  @click.native="checkedAll" /><span>全选</span>
    </div>
    <div class="sum">
      合计：{{sum}}
    </div>
    <div class="computed">
      去计算(0)
    </div> 
  </div>
</template>

<script>
import CheckBox from "components/content/CheckBox" 
export default {
  name:"CartBottomBar",
  props:{
    cartLists:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    CheckBox 
  },
  computed:{
    sum(){ 
      return "¥" + this.cartLists.filter(item => item.checked != false)
                                 .reduce((prev,item) => prev + item.lowNowPrice * item.count, 0)
                                 .toFixed(2)
    },
    checkState(){
      // - 状态的显示
      // this.cartLists.filter(item => item.checked == false) 过滤出数组中checked未选中，数组元素
      // this.cartLists.filter(item => item.checked == false).length 未选中 数组元素的个数
      // !(this.cartLists.filter(item => item.checked == false).length) 对数组长度取反 0 或者 非0 | 个数为0 说明全选，!0 = true
      // filter和find 相比，find在此场景下效率更高一些，找到第一个，停止遍历
      // filter返回值是一个符合条件都数组，find返回值是第一个符合条件的对象
      // every返回值是一个布尔值。如果所有元素都通过检测返回 true，否则返回 false。
      // some返回值是一个布尔值。对每个数组进行遍历，发现符合条件的元素停止变量，返回 true

      // this.cartLists.length === 0 购物车数量为0时，让默认全选按钮，不选中
      if(this.cartLists.length === 0) return false
      // return !(this.cartLists.filter(item => item.checked == false).length)
      // return !(this.cartLists.find(item => item.checked == false))
      // return this.cartLists.every(item => item.checked)
      return !(this.cartLists.some(item => item.checked == false))
    }
  },
  methods: {
    checkedAll(){ 
      // - 点击效果的展示
      //   - 产品列表 全选的状态下，点击 全选按钮，全部取消 选中状态
      //   - 产品列表 有一个未选中或全部未选中状态，点击 全选按钮， 选中全部
      // forEach 高阶函数，遍历数组
      // console.log(this.checkState);
      if(this.checkState){
        this.cartLists.forEach(item => {
          item.checked = false
        });
      }else{
        this.cartLists.forEach(item => {
          item.checked = true
        });
      }
    },
  }
}
</script>

<style scoped>
.bottom-bar{
  display: flex;
  position: relative;
  z-index: 9;

  height: 41px;
  line-height: 40px;
  background-color:#eeeeee;
  border-top: 1px solid #d6d6d6;
  font-size: 14px;

}
.check-all{
  width: 22%;
  margin-left: 6px; 
  padding-right: 20px; 

  color: #888888;
}
.check-all span{
  padding-left: 20px;
}
.check-box{
  position: absolute;
  top: 4px;   
}
.sum{
  width: 50%;
}
.computed{
  width: 28%;
  background-color: #fc471e;
  text-align: center;
  color: #fff;
}
</style>