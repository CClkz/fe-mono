import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo, LoginData } from '@/types/user'

interface AuthState {
  userInfo: UserInfo
  isLoggedIn: boolean
  token: string

  // Actions
  initAuth: () => void
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>
  socialLogin: (type: string) => Promise<void>
  logout: () => void
  clearAuth: () => void
  updateUserInfo: (newInfo: Partial<UserInfo>) => void
  updateAvatar: (avatarUrl: string) => void
}

const defaultUserInfo: UserInfo = {
  nickname: '',
  username: '',
  avatar: '/src/assets/default-avatar.png',
  level: '',
  postsCount: 0,
  commentsCount: 0,
  favoritesCount: 0
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userInfo: defaultUserInfo,
      isLoggedIn: false,
      token: '',

      initAuth: () => {
        try {
          const loginDataStr = localStorage.getItem('loginData')
          if (loginDataStr) {
            const loginData: LoginData = JSON.parse(loginDataStr)
            if (loginData.token && loginData.userInfo) {
              set({
                token: loginData.token,
                userInfo: loginData.userInfo,
                isLoggedIn: true
              })
              console.log('从本地存储恢复登录状态')
            }
          }
        } catch (error) {
          console.error('初始化认证状态失败:', error)
          get().clearAuth()
        }
      },

      login: async (username: string, password: string, rememberMe: boolean = false) => {
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
            set({
              token: mockToken,
              userInfo: mockUserInfo,
              isLoggedIn: true
            })

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
      },

      socialLogin: async (type: string) => {
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

            set({
              token: mockToken,
              userInfo: mockUserInfo,
              isLoggedIn: true
            })

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
      },

      logout: () => {
        get().clearAuth()
        console.log('用户已退出登录')
      },

      clearAuth: () => {
        set({
          token: '',
          isLoggedIn: false,
          userInfo: defaultUserInfo
        })
        localStorage.removeItem('loginData')
      },

      updateUserInfo: (newInfo: Partial<UserInfo>) => {
        set((state) => ({
          userInfo: { ...state.userInfo, ...newInfo }
        }))

        // 更新本地存储
        const { isLoggedIn } = get()
        if (isLoggedIn) {
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
      },

      updateAvatar: (avatarUrl: string) => {
        get().updateUserInfo({ avatar: avatarUrl })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn,
        token: state.token
      })
    }
  )
)