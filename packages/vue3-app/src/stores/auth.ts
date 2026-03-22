import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { UserInfo } from '@/types/user'

export interface LoginData {
  token: string
  userInfo: UserInfo
  rememberMe: boolean
  loginTime: number
}

export const useAuthStore = defineStore('auth', () => {
  // 用户信息
  const userInfo = reactive<UserInfo>({
    nickname: '',
    username: '',
    avatar: '/src/assets/default-avatar.png',
    level: '',
    postsCount: 0,
    commentsCount: 0,
    favoritesCount: 0
  })

  // 登录状态
  const isLoggedIn = ref(false)
  const token = ref('')

  // 初始化时检查本地存储
  const initAuth = () => {
    try {
      const loginDataStr = localStorage.getItem('loginData')
      if (loginDataStr) {
        const loginData: LoginData = JSON.parse(loginDataStr)
        if (loginData.token && loginData.userInfo) {
          token.value = loginData.token
          Object.assign(userInfo, loginData.userInfo)
          isLoggedIn.value = true
          console.log('从本地存储恢复登录状态')
        }
      }
    } catch (error) {
      console.error('初始化认证状态失败:', error)
      clearAuth()
    }
  }

  // 登录
  const login = async (username: string, password: string, rememberMe: boolean = false) => {
    // 模拟登录API调用
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 模拟生成token和用户信息
        const mockToken = `mock_token_${Date.now()}`
        const mockUserInfo: UserInfo = {
          nickname: username,
          username: username,
          avatar: '/src/assets/default-avatar.png',
          level: 'Lv.1',
          postsCount: 0,
          commentsCount: 0,
          favoritesCount: 0
        }

        // 更新状态
        token.value = mockToken
        Object.assign(userInfo, mockUserInfo)
        isLoggedIn.value = true

        // 保存到本地存储
        if (rememberMe) {
          const loginData: LoginData = {
            token: mockToken,
            userInfo: mockUserInfo,
            rememberMe,
            loginTime: Date.now()
          }
          localStorage.setItem('loginData', JSON.stringify(loginData))
        }

        console.log('登录成功')
        resolve()
      }, 1000)
    })
  }

  // 社交登录
  const socialLogin = async (type: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockToken = `social_token_${type}_${Date.now()}`
        const mockUserInfo: UserInfo = {
          nickname: `${type}用户`,
          username: `${type}_user`,
          avatar: '/src/assets/default-avatar.png',
          level: 'Lv.2',
          postsCount: 5,
          commentsCount: 10,
          favoritesCount: 3
        }

        token.value = mockToken
        Object.assign(userInfo, mockUserInfo)
        isLoggedIn.value = true

        const loginData: LoginData = {
          token: mockToken,
          userInfo: mockUserInfo,
          rememberMe: true,
          loginTime: Date.now()
        }
        localStorage.setItem('loginData', JSON.stringify(loginData))

        console.log(`${type}登录成功`)
        resolve()
      }, 1000)
    })
  }

  // 登出
  const logout = () => {
    clearAuth()
    console.log('用户已退出登录')
  }

  // 清除认证信息
  const clearAuth = () => {
    token.value = ''
    isLoggedIn.value = false
    Object.assign(userInfo, {
      nickname: '',
      username: '',
      avatar: '/src/assets/default-avatar.png',
      level: '',
      postsCount: 0,
      commentsCount: 0,
      favoritesCount: 0
    })
    localStorage.removeItem('loginData')
  }

  // 更新用户信息
  const updateUserInfo = (newInfo: Partial<UserInfo>) => {
    Object.assign(userInfo, newInfo)

    // 更新本地存储
    if (isLoggedIn.value) {
      const loginDataStr = localStorage.getItem('loginData')
      if (loginDataStr) {
        try {
          const loginData: LoginData = JSON.parse(loginDataStr)
          loginData.userInfo = { ...loginData.userInfo, ...newInfo }
          localStorage.setItem('loginData', JSON.stringify(loginData))
        } catch (error) {
          console.error('更新用户信息失败:', error)
        }
      }
    }
  }

  // 更换头像
  const updateAvatar = (avatarUrl: string) => {
    userInfo.avatar = avatarUrl
    updateUserInfo({ avatar: avatarUrl })
  }

  return {
    userInfo,
    isLoggedIn,
    token,
    initAuth,
    login,
    socialLogin,
    logout,
    clearAuth,
    updateUserInfo,
    updateAvatar
  }
})