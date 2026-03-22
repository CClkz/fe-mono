<template>
  <div class="profile-container">
    <h1 class="page-title">个人资料</h1>

    <div class="profile-form">
      <div class="form-group">
        <label class="form-label">昵称</label>
        <input
          class="form-input"
          type="text"
          v-model="profile.nickname"
          placeholder="请输入昵称"
        />
      </div>

      <div class="form-group">
        <label class="form-label">用户名</label>
        <div class="form-static">{{ profile.username }}</div>
      </div>

      <div class="form-group">
        <label class="form-label">邮箱</label>
        <input
          class="form-input"
          type="email"
          v-model="profile.email"
          placeholder="请输入邮箱"
        />
      </div>

      <div class="form-group">
        <label class="form-label">个人简介</label>
        <textarea
          class="form-textarea"
          v-model="profile.bio"
          placeholder="请输入个人简介"
          rows="4"
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">头像</label>
        <div class="avatar-upload">
          <img :src="profile.avatar" alt="头像" class="avatar-preview" />
          <input
            type="file"
            accept="image/*"
            @change="handleAvatarUpload"
            class="avatar-input"
          />
          <button class="avatar-btn" @click="triggerAvatarUpload">更换头像</button>
        </div>
      </div>

      <div class="form-actions">
        <button class="save-btn" @click="saveProfile">保存修改</button>
        <button class="cancel-btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const profile = ref({
  nickname: '',
  username: '',
  email: '',
  bio: '',
  avatar: '',
})

onMounted(() => {
  // 初始化表单数据
  profile.value.nickname = authStore.userInfo.nickname
  profile.value.username = authStore.userInfo.username
  profile.value.email = `${authStore.userInfo.username}@example.com`
  profile.value.bio = '这个人很懒，什么都没有留下~'
  profile.value.avatar = authStore.userInfo.avatar
})

const triggerAvatarUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = handleAvatarUpload
  input.click()
}

const handleAvatarUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const avatarUrl = e.target?.result as string
      profile.value.avatar = avatarUrl
      console.log('头像已更新:', avatarUrl)
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  // 更新用户信息
  authStore.updateUserInfo({
    nickname: profile.value.nickname,
    avatar: profile.value.avatar,
  })

  alert('个人资料已保存')
  console.log('保存的个人资料:', profile.value)
}

const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.profile-container {
  padding: 40px;
  min-height: 100vh;
  background-color: #f5f5f5;

  .page-title {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 40px;
    text-align: center;
  }

  .profile-form {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    .form-group {
      margin-bottom: 40px;

      .form-label {
        display: block;
        font-size: 28px;
        color: #333;
        margin-bottom: 16px;
        font-weight: 500;
      }

      .form-input {
        width: 100%;
        height: 80px;
        border: 2px solid #e5e5e5;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 28px;
        box-sizing: border-box;

        &:focus {
          border-color: #007aff;
          outline: none;
        }
      }

      .form-static {
        font-size: 28px;
        color: #666;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
      }

      .form-textarea {
        width: 100%;
        border: 2px solid #e5e5e5;
        border-radius: 10px;
        padding: 20px;
        font-size: 28px;
        box-sizing: border-box;
        resize: vertical;

        &:focus {
          border-color: #007aff;
          outline: none;
        }
      }

      .avatar-upload {
        display: flex;
        align-items: center;
        gap: 30px;

        .avatar-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e5e5e5;
        }

        .avatar-input {
          display: none;
        }

        .avatar-btn {
          padding: 16px 32px;
          background: linear-gradient(to right, #667eea, #764ba2);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 24px;
          cursor: pointer;
          transition: opacity 0.3s;

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 60px;

      .save-btn {
        padding: 20px 60px;
        background: linear-gradient(to right, #667eea, #764ba2);
        color: #fff;
        border: none;
        border-radius: 10px;
        font-size: 32px;
        font-weight: bold;
        cursor: pointer;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.9;
        }
      }

      .cancel-btn {
        padding: 20px 60px;
        background-color: #f0f0f0;
        color: #666;
        border: none;
        border-radius: 10px;
        font-size: 32px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #e0e0e0;
        }
      }
    }
  }
}
</style>