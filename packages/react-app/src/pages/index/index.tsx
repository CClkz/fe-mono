import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './index.css'

const IndexPage = () => {
  const [title] = useState('Hello')
  const navigate = useNavigate()

  // 跳转到 blog 页面
  const goBlog = () => {
    navigate('/blog')
  }

  return (
    <div className="content">
      <div className="text-area">
        <h1 className="title">{title}</h1>
        <button className="blog-btn" onClick={goBlog}>
          进入博客
        </button>
        <Link to="/user" className="user-link">
          <div className="user-card">
            <span>用户中心</span>
            <span className="arrow">›</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default IndexPage