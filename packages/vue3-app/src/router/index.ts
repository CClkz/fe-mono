import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 页面组件导入（使用懒加载）
const IndexPage = () => import('@/pages/index/index.vue')
const BlogPage = () => import('@/pages/blog/blog.vue')
const UserPage = () => import('@/pages/user/user.vue')
const LoginPage = () => import('@/pages/login/login.vue')
const RegisterPage = () => import('@/pages/login/register.vue')
const ForgotPasswordPage = () => import('@/pages/login/forgot-password.vue')
const ProfilePage = () => import('@/pages/user/profile.vue')
const SettingsPage = () => import('@/pages/user/settings.vue')
const MyPostsPage = () => import('@/pages/user/my-posts.vue')
const MyCommentsPage = () => import('@/pages/user/my-comments.vue')
const FavoritesPage = () => import('@/pages/user/favorites.vue')
const MyBlogPage = () => import('@/pages/user/my-blog.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: IndexPage,
    meta: {
      title: '首页',
      isTab: true
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogPage,
    meta: {
      title: '博客',
      isTab: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    meta: {
      title: '用户中心',
      isTab: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
    meta: {
      title: '找回密码'
    }
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      title: '个人资料',
      requiresAuth: true
    }
  },
  {
    path: '/user/settings',
    name: 'settings',
    component: SettingsPage,
    meta: {
      title: '设置',
      requiresAuth: true
    }
  },
  {
    path: '/user/my-posts',
    name: 'my-posts',
    component: MyPostsPage,
    meta: {
      title: '我的帖子',
      requiresAuth: true
    }
  },
  {
    path: '/user/my-comments',
    name: 'my-comments',
    component: MyCommentsPage,
    meta: {
      title: '我的评论',
      requiresAuth: true
    }
  },
  {
    path: '/user/favorites',
    name: 'favorites',
    component: FavoritesPage,
    meta: {
      title: '我的收藏',
      requiresAuth: true
    }
  },
  {
    path: '/user/my-blog',
    name: 'my-blog',
    component: MyBlogPage,
    meta: {
      title: '我的博客',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查登录状态
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      // 跳转到登录页
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }

  next()
})

export default router