import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      component:()=>import('../components/index'),
      redirect:"/index/group",
      children:[
        {
          path: '/index/group',
          name: 'group',
          component: ()=>import('../components/groupSpace/group'),
        },
        {
          path: '/index/groupSet',
          name: 'groupSet',
          component: ()=>import('../components/groupSetting/setting'),
        }
      ]
    },
    {
      path: '/resport',
      name: 'resport',
      component: ()=>import('../components/editResport/index'),
    }
  ]
})
