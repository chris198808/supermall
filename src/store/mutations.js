import { ADD_COUNT,ADD_PRO } from './mutations-type'
export const mutations = {
  [ADD_COUNT](state, oldPro) {
    oldPro.count +=1
  },
  [ADD_PRO](state,payload) {
    payload.count = 1
    payload.checked = false
    state.cartList.push(payload)
    
  } 
}