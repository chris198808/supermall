import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 自定义提示框插件
Vue.use(toast)
// vue-lazyload 图片懒加载 插件
Vue.use(VueLazyload, {
  loading:require('assets/img/common/placeholder.png') //加载时 占位图片
})

// 解决移动端点击300ms延时问题
fastclick.attach(document.body)

// 将事件总线添加到Vue对象中
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store, 
}).$mount('#app')
