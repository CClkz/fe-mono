import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

// 页面组件懒加载
const IndexPage = lazy(() => import('@/pages/index'))
const BlogPage = lazy(() => import('@/pages/blog'))
const UserPage = lazy(() => import('@/pages/user'))
const LoginPage = lazy(() => import('@/pages/login'))
const RegisterPage = lazy(() => import('@/pages/login/register'))
const ForgotPasswordPage = lazy(() => import('@/pages/login/forgot-password'))
const ProfilePage = lazy(() => import('@/pages/user/profile'))
const SettingsPage = lazy(() => import('@/pages/user/settings'))
const MyPostsPage = lazy(() => import('@/pages/user/my-posts'))
const MyCommentsPage = lazy(() => import('@/pages/user/my-comments'))
const FavoritesPage = lazy(() => import('@/pages/user/favorites'))
const MyBlogPage = lazy(() => import('@/pages/user/my-blog'))

// 路由守卫组件
const AuthGuard = ({ children, requiresAuth }: { children: React.ReactNode, requiresAuth?: boolean }) => {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (requiresAuth && !isLoggedIn) {
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [requiresAuth, isLoggedIn, navigate, location])

  if (requiresAuth && !isLoggedIn) {
    return null
  }

  return <>{children}</>
}

// 页面标题设置组件
const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}

const RouterConfig = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/index" replace />} />

        <Route path="/index" element={
          <>
            <PageTitle title="首页" />
            <IndexPage />
          </>
        } />

        <Route path="/blog" element={
          <>
            <PageTitle title="博客" />
            <BlogPage />
          </>
        } />

        <Route path="/user" element={
          <>
            <PageTitle title="用户中心" />
            <UserPage />
          </>
        } />

        <Route path="/login" element={
          <>
            <PageTitle title="登录" />
            <LoginPage />
          </>
        } />

        <Route path="/register" element={
          <>
            <PageTitle title="注册" />
            <RegisterPage />
          </>
        } />

        <Route path="/forgot-password" element={
          <>
            <PageTitle title="找回密码" />
            <ForgotPasswordPage />
          </>
        } />

        <Route path="/user/profile" element={
          <AuthGuard requiresAuth>
            <>
              <PageTitle title="个人资料" />
              <ProfilePage />
            </>
          </AuthGuard>
        } />

        <Route path="/user/settings" element={
          <AuthGuard requiresAuth>
            <>
              <PageTitle title="设置" />
              <SettingsPage />
            </>
          </AuthGuard>
        } />

        <Route path="/user/my-posts" element={
          <AuthGuard requiresAuth>
            <>
              <PageTitle title="我的帖子" />
              <MyPostsPage />
            </>
          </AuthGuard>
        } />

        <Route path="/user/my-comments" element={
          <AuthGuard requiresAuth>
            <>
              <PageTitle title="我的评论" />
              <MyCommentsPage />
            </>
          </AuthGuard>
        } />

        <Route path="/user/favorites" element={
          <AuthGuard requiresAuth>
            <>
              <PageTitle title="我的收藏" />
              <FavoritesPage />
            </>
          </AuthGuard>
        } />

        <Route path="/user/my-blog" element={
          <AuthGuard requiresAuth>
            <>
              <PageTitle title="我的博客" />
              <MyBlogPage />
            </>
          </AuthGuard>
        } />
      </Routes>
    </Suspense>
  )
}

export default RouterConfig