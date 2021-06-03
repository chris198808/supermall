// import Vue from 'vue' 
import Toast from './Toast'
const obj = {}
// Vue.use() 会调用 install函数，该函数会默认传入一个Vue对象
obj.install = function (Vue) {
  // 1-创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2-new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3-将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  // 4-将div包裹的组件，添加到body中。toast.$el 就是这个整个的div
  document.body.appendChild(toast.$el)


  // 5-将这个toast对象添加到Vue原型中 
  Vue.prototype.$toast = toast


}
export default obj