import { ADD_COUNT, ADD_PRO } from './mutations-type'

export const actions = {
  addCart(content, payload) {
    return new Promise((resolve, reject) => {

      let oldPro = null
      for (let item of content.state.cartList) {
        if (item.iid === payload.iid) {
          oldPro = item
        }
      }
      if (oldPro) { 
        content.commit(ADD_COUNT, oldPro)
        resolve("添加到购物车+1")
        
      } else {
        content.commit(ADD_PRO, payload)
        resolve("添加到购物车")
      }
      
     }) 
  }
}