import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress 配置

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  // 确定用户是否已登录
  const hasToken = getToken()
  // console.log(hasToken, 'www')
  if (!hasToken) {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
