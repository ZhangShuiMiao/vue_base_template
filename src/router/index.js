import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export  const routes = [
  {
    path: "/login",
    name: 'Login',
   component:()=>import('@/views/login/index')
  },
  
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router