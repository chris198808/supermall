import { ADD_COUNT, ADD_PRO } from './mutations-type'

export const actions = {
  addCart(content, payload) {
    let oldPro = null
    for (let item of content.state.cartList) {
      if (item.iid === payload.iid) {
        oldPro = item
      }
    }
    if (oldPro) { 
      content.commit(ADD_COUNT, oldPro)
      
    } else {
      content.commit(ADD_PRO, payload)
    }
    
  }
}