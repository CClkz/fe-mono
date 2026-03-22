export interface UserInfo {
  nickname: string
  username: string
  avatar: string
  level: string
  postsCount: number
  commentsCount: number
  favoritesCount: number
}

export interface LoginFormData {
  username: string
  password: string
  rememberMe: boolean
}