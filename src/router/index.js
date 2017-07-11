import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
	linkActiveClass:'active',
  routes:[{
  	path: '/goods', component: require('../components/goods.vue')
  },{
  	path: '/ratings', component: require('../components/ratings.vue')
  },{
  	path:'/seller',component: require('../components/seller.vue')
  },{
  	path:'*',redirect:'/goods'
  }]
})

// 输出router
export default router;