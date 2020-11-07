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
          meta:{className:0},
          component: ()=>import('../components/groupSpace/group'),
        },
        {
          path: '/index/groupSet',
          name: 'groupSet',
          meta:{className:1},
          component: ()=>import('../components/groupSetting/setting'),
        },

      ]
    },
    {
      path: '/resport',
      name: 'resport',
      component: ()=>import('../components/editResport/index'),
    },
    {
      path: '/resume',
      name: 'resume',
      meta:{className:2},
      component: ()=>import('../components/Resume/resume'),
    }
  ]
})
