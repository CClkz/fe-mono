<template>
  <div class="user-center">
    <!-- 用户头像和基本信息区域 -->
    <div class="user-header">
      <img
        v-if="authStore.isLoggedIn"
        class="avatar"
        :src="authStore.userInfo.avatar"
        @click="changeAvatar"
        alt="用户头像"
      />
      <div class="user-info">
        <span class="nickname">{{ authStore.userInfo.nickname || '未登录用户' }}</span>
        <span class="username" v-if="authStore.userInfo.username && authStore.isLoggedIn"
          >@{{ authStore.userInfo.username }}</span
        >
        <span class="level" v-if="authStore.userInfo.level && authStore.isLoggedIn"
          >等级: {{ authStore.userInfo.level }}</span
        >
      </div>
    </div>

    <!-- 未登录时显示登录按钮 -->
    <div v-if="!authStore.isLoggedIn" class="login-prompt">
      <button class="login-btn" @click="goToLogin">立即登录</button>
      <span class="login-desc">登录后享受更多功能</span>
    </div>

    <!-- 用户数据统计（仅登录后显示） -->
    <div v-if="authStore.isLoggedIn" class="user-stats">
      <div class="stat-item" @click="goToMyPosts">
        <span class="stat-number">{{ authStore.userInfo.postsCount || 0 }}</span>
        <span class="stat-label">帖子</span>
      </div>
      <div class="stat-item" @click="goToMyComments">
        <span class="stat-number">{{ authStore.userInfo.commentsCount || 0 }}</span>
        <span class="stat-label">评论</span>
      </div>
      <div class="stat-item" @click="goToFavorites">
        <span class="stat-number">{{ authStore.userInfo.favoritesCount || 0 }}</span>
        <span class="stat-label">收藏</span>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-list">
      <div v-if="authStore.isLoggedIn" class="menu-item" @click="goToProfile">
        <span class="menu-text">个人资料</span>
        <span class="arrow">›</span>
      </div>
      <div v-if="authStore.isLoggedIn" class="menu-item" @click="goToSettings">
        <span class="menu-text">设置</span>
        <span class="arrow">›</span>
      </div>
      <div v-if="authStore.isLoggedIn" class="menu-item" @click="goToMyBlog">
        <span class="menu-text">我的博客</span>
        <span class="arrow">›</span>
      </div>
      <div v-if="authStore.isLoggedIn" class="menu-item" @click="logout">
        <span class="menu-text logout-text">退出登录</span>
        <span class="arrow">›</span>
      </div>
    </div>

    <!-- 头像上传输入框（隐藏） -->
    <input
      ref="avatarInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleAvatarUpload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const avatarInput = ref<HTMLInputElement>()

onMounted(() => {
  console.log('用户中心页面加载')
  authStore.initAuth()
})

// 更换头像
const changeAvatar = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  avatarInput.value?.click()
}

// 处理头像上传
const handleAvatarUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const avatarUrl = e.target?.result as string
      authStore.updateAvatar(avatarUrl)
      console.log('头像已更新:', avatarUrl)
    }
    reader.readAsDataURL(file)
  }
  // 清空输入框，以便可以再次选择同一文件
  input.value = ''
}

// 跳转到登录页面
const goToLogin = () => {
  router.push('/login')
}

// 跳转到我的帖子
const goToMyPosts = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  router.push('/user/my-posts')
}

// 跳转到我的评论
const goToMyComments = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  router.push('/user/my-comments')
}

// 跳转到我的收藏
const goToFavorites = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  router.push('/user/favorites')
}

// 跳转到个人资料
const goToProfile = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  router.push('/user/profile')
}

// 跳转到设置
const goToSettings = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  router.push('/user/settings')
}

// 跳转到我的博客
const goToMyBlog = () => {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  router.push('/user/my-blog')
}

// 退出登录
const logout = () => {
  if (window.confirm('确定要退出登录吗？')) {
    authStore.logout()
    console.log('用户已退出登录')
  }
}
</script>

<style scoped lang="scss">
.user-center {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;

  .user-header {
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-right: 30px;
      cursor: pointer;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .avatar:hover {
      transform: scale(1.05);
    }

    .user-info {
      flex: 1;

      .nickname {
        font-size: 36px;
        font-weight: bold;
        display: block;
        color: #333;
      }

      .username {
        font-size: 28px;
        color: #888;
        display: block;
        margin-top: 10px;
      }

      .level {
        font-size: 24px;
        color: #ff6b35;
        display: block;
        margin-top: 10px;
      }
    }
  }

  .login-prompt {
    background-color: #fff;
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    margin-bottom: 20px;

    .login-btn {
      background: linear-gradient(to right, #667eea, #764ba2);
      color: #fff;
      border-radius: 10px;
      width: 100%;
      padding: 16px;
      font-size: 28px;
      border: none;
      cursor: pointer;
      transition: opacity 0.3s;
      margin-bottom: 20px;
    }

    .login-btn:hover {
      opacity: 0.9;
    }

    .login-desc {
      font-size: 24px;
      color: #888;
    }
  }

  .user-stats {
    background-color: #fff;
    border-radius: 20px;
    padding: 30px 0;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    .stat-item {
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      .stat-number {
        font-size: 36px;
        font-weight: bold;
        display: block;
        color: #333;
      }

      .stat-label {
        font-size: 24px;
        color: #888;
        display: block;
        margin-top: 10px;
      }
    }
  }

  .menu-list {
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background-color 0.2s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #f9f9f9;
      }

      .menu-text {
        font-size: 30px;
        color: #333;

        &.logout-text {
          color: #ff4757;
        }
      }

      .arrow {
        font-size: 36px;
        color: #ccc;
      }
    }
  }
}
</style>