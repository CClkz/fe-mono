import { useLocation, useNavigate } from 'react-router-dom'
import './BottomTabBar.css'

// 底部导航栏配置
const tabs = [
  {
    path: '/index',
    name: 'index',
    label: 'hello',
    icon: '🏠'
  },
  {
    path: '/blog',
    name: 'blog',
    label: '博客',
    icon: '📝'
  },
  {
    path: '/user',
    name: 'user',
    label: '我',
    icon: '👤'
  }
]

const BottomTabBar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 当前激活的tab
  const activeTab = tabs.find(tab => tab.path === location.pathname)?.path || ''

  // 切换tab
  const switchTab = (tab: typeof tabs[0]) => {
    if (tab.path !== location.pathname) {
      navigate(tab.path)
    }
  }

  return (
    <div className="bottom-tab-bar">
      <div>{location.pathname}</div>
      {tabs.map(tab => (
        <div
          key={tab.path}
          className={`tab-item ${activeTab === tab.path ? 'active' : ''}`}
          onClick={() => switchTab(tab)}
        >
          <div className="tab-icon">{tab.icon}</div>
          <div className="tab-label">{tab.label}</div>
        </div>
      ))}
    </div>
  )
}

export default BottomTabBar