<template>
  <div class="login-container">
    <div class="login-header">
      <h1 class="title">欢迎登录</h1>
      <p class="subtitle">请输入您的账户信息</p>
    </div>

    <div class="login-form">
      <div class="input-group">
        <input
          class="input-field"
          type="text"
          v-model="formData.username"
          placeholder="请输入用户名或手机号"
          @input="onUsernameInput"
        />
      </div>

      <div class="input-group">
        <input
          class="input-field"
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.password"
          placeholder="请输入密码"
          @input="onPasswordInput"
        />
        <span class="password-toggle" @click="togglePassword">{{
          showPassword ? '隐藏' : '显示'
        }}</span>
      </div>

      <div class="remember-forgot">
        <label class="checkbox-label" @click="toggleRemember">
          <div class="checkbox" :class="{ checked: formData.rememberMe }">
            <span v-if="formData.rememberMe" class="checkmark">✓</span>
          </div>
          <span class="checkbox-text">记住我</span>
        </label>
        <router-link to="/forgot-password" class="forgot-link">忘记密码?</router-link>
      </div>

      <button
        class="login-button"
        :class="{ disabled: !canLogin }"
        :disabled="!canLogin"
        @click="handleLogin"
      >
        登录
      </button>

      <div class="register-section">
        <span class="register-text">还没有账号？</span>
        <router-link to="/register" class="register-link">立即注册</router-link>
      </div>
    </div>

    <div class="social-login">
      <div class="divider">
        <span class="divider-text">其他登录方式</span>
      </div>

      <div class="social-buttons">
        <button class="social-btn wechat" @click="socialLogin('wechat')">
          微信登录
        </button>
        <button class="social-btn qq" @click="socialLogin('qq')">QQ登录</button>
        <button class="social-btn alipay" @click="socialLogin('alipay')">
          支付宝登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

// 显示密码
const showPassword = ref(false)

// 计算属性：判断是否可以登录
const canLogin = computed(() => {
  return formData.username.trim().length > 0 && formData.password.length >= 6
})

onMounted(() => {
  // 检查是否已登录
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 用户名输入事件
const onUsernameInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  formData.username = target.value
}

// 密码输入事件
const onPasswordInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  formData.password = target.value
}

// 切换记住我
const toggleRemember = () => {
  formData.rememberMe = !formData.rememberMe
}

// 处理登录
const handleLogin = async () => {
  if (!canLogin.value) {
    alert('请输入正确的用户名和密码')
    return
  }

  console.log('登录信息:', formData)

  // 显示加载状态
  const loading = ref(true)

  try {
    await authStore.login(formData.username, formData.password, formData.rememberMe)
    alert('登录成功')
    // 登录成功后跳转到首页
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  } finally {
    loading.value = false
  }
}

// 社交登录
const socialLogin = async (type: string) => {
  console.log(`${type}登录`)
  alert(`使用${type}登录（演示功能）`)

  try {
    await authStore.socialLogin(type)
    alert(`${type}登录成功`)
    router.push('/')
  } catch (error) {
    console.error(`${type}登录失败:`, error)
    alert(`${type}登录失败`)
  }
}
</script>

<style scoped lang="scss">
.login-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  .login-header {
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

  .login-form {
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

    .remember-forgot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;

        .checkbox {
          width: 30px;
          height: 30px;
          border: 2px solid #ddd;
          border-radius: 6px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          &.checked {
            background-color: #007aff;
            border-color: #007aff;
          }

          .checkmark {
            color: #fff;
            font-size: 20px;
            line-height: 1;
          }
        }

        .checkbox-text {
          font-size: 24px;
          color: #666;
        }
      }

      .forgot-link {
        font-size: 24px;
        color: #007aff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .login-button {
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

    .register-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;

      .register-text {
        font-size: 24px;
        color: #666;
        margin-right: 10px;
      }

      .register-link {
        font-size: 24px;
        color: #007aff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .social-login {
    margin-top: 60px;

    .divider {
      text-align: center;
      position: relative;
      margin-bottom: 40px;

      .divider-text {
        font-size: 24px;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
        padding: 0 20px;
        position: relative;
        z-index: 2;
        border-radius: 10px;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        right: 0;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 1;
      }
    }

    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 30px;

      .social-btn {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.1);
        }

        &.wechat {
          background-color: #07c160;
        }

        &.qq {
          background-color: #12b7f5;
        }

        &.alipay {
          background-color: #00a0e9;
        }
      }
    }
  }
}
</style>