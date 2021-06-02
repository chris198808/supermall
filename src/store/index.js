// 1-引入
import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
// 2-安装
Vue.use(Vuex)

// 3-建立一个store实例
const state = {
  cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 4-导出挂载对象
export default store