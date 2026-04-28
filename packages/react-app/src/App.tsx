import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RouterConfig from '@/router'
import BottomTabBar from '@/components/layout/BottomTabBar'
import { useAuthStore } from '@/stores/auth'
import '@/App.css'

function App() {
  const location = useLocation()
  const { initAuth } = useAuthStore()

  // 初始化认证状态
  useEffect(() => {
    initAuth()
  }, [initAuth])

  // 检查当前路由是否需要显示底部导航栏
  const showBottomTabBar = location.pathname === '/' ||
                          location.pathname === '/index' ||
                          location.pathname === '/blog' ||
                          location.pathname === '/user'

  return (
    <div className="app-container">
      <main className="main-content">
        <RouterConfig />
      </main>
      {showBottomTabBar && <BottomTabBar />}
    </div>
  )
}

export default App