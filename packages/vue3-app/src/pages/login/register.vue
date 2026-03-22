<template>
  <div class="register-container">
    <div class="register-header">
      <h1 class="title">用户注册</h1>
      <p class="subtitle">创建您的账户</p>
    </div>

    <div class="register-form">
      <div class="input-group">
        <input
          class="input-field"
          type="text"
          v-model="formData.username"
          placeholder="请输入用户名"
        />
      </div>

      <div class="input-group">
        <input
          class="input-field"
          type="email"
          v-model="formData.email"
          placeholder="请输入邮箱"
        />
      </div>

      <div class="input-group">
        <input
          class="input-field"
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.password"
          placeholder="请输入密码（至少6位）"
        />
        <span class="password-toggle" @click="togglePassword">{{
          showPassword ? '隐藏' : '显示'
        }}</span>
      </div>

      <div class="input-group">
        <input
          class="input-field"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="formData.confirmPassword"
          placeholder="请确认密码"
        />
        <span class="password-toggle" @click="toggleConfirmPassword">{{
          showConfirmPassword ? '隐藏' : '显示'
        }}</span>
      </div>

      <button
        class="register-button"
        :class="{ disabled: !canRegister }"
        :disabled="!canRegister"
        @click="handleRegister"
      >
        注册
      </button>

      <div class="login-section">
        <span class="login-text">已有账号？</span>
        <router-link to="/login" class="login-link">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 显示密码
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 计算属性：判断是否可以注册
const canRegister = computed(() => {
  return (
    formData.username.trim().length > 0 &&
    formData.email.includes('@') &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword
  )
})

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// 处理注册
const handleRegister = () => {
  if (!canRegister.value) {
    alert('请填写完整的注册信息')
    return
  }

  console.log('注册信息:', formData)
  alert('注册成功（演示功能）')
  // 注册成功后跳转到登录页
  router.push('/login')
}
</script>

<style scoped lang="scss">
.register-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  .register-header {
    text-align: center;
    margin-bottom: 80px;

    .title {
      font-size: 48px;
      font-weight: bold;
      color: #fff;
      display: block;
      margin-bottom: 20px;
    }

    .subtitle {
      font-size: 28px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .register-form {
    background-color: #fff;
    border-radius: 20px;
    padding: 50px 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    .input-group {
      position: relative;
      margin-bottom: 40px;

      .input-field {
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

      .password-toggle {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: #007aff;
        cursor: pointer;
        user-select: none;
      }
    }

    .register-button {
      width: 100%;
      height: 80px;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
      transition: opacity 0.3s;

      &.disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      &:not(.disabled):hover {
        opacity: 0.9;
      }
    }

    .login-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;

      .login-text {
        font-size: 24px;
        color: #666;
        margin-right: 10px;
      }

      .login-link {
        font-size: 24px;
        color: #007aff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>