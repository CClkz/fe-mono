<template>
  <div class="forgot-container">
    <div class="forgot-header">
      <h1 class="title">找回密码</h1>
      <p class="subtitle">请输入您的注册邮箱</p>
    </div>

    <div class="forgot-form">
      <div class="input-group">
        <input
          class="input-field"
          type="email"
          v-model="email"
          placeholder="请输入注册邮箱"
        />
      </div>

      <div class="input-group" v-if="showVerificationCode">
        <input
          class="input-field"
          type="text"
          v-model="verificationCode"
          placeholder="请输入验证码"
        />
        <span class="verification-btn" @click="sendVerificationCode" :disabled="isSending">
          {{ isSending ? `${countdown}s` : '发送验证码' }}
        </span>
      </div>

      <div class="input-group" v-if="showNewPassword">
        <input
          class="input-field"
          :type="showPassword ? 'text' : 'password'"
          v-model="newPassword"
          placeholder="请输入新密码"
        />
        <span class="password-toggle" @click="togglePassword">{{
          showPassword ? '隐藏' : '显示'
        }}</span>
      </div>

      <button
        class="submit-button"
        :class="{ disabled: !canSubmit }"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        {{ submitButtonText }}
      </button>

      <div class="back-section">
        <router-link to="/login" class="back-link">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const showPassword = ref(false)
const showVerificationCode = ref(false)
const showNewPassword = ref(false)
const isSending = ref(false)
const countdown = ref(60)
let countdownTimer: number | null = null

// 计算属性：判断是否可以提交
const canSubmit = computed(() => {
  if (!showVerificationCode.value && !showNewPassword.value) {
    return email.value.includes('@')
  } else if (showVerificationCode.value && !showNewPassword.value) {
    return verificationCode.value.length === 6
  } else if (showVerificationCode.value && showNewPassword.value) {
    return newPassword.value.length >= 6
  }
  return false
})

// 提交按钮文本
const submitButtonText = computed(() => {
  if (!showVerificationCode.value && !showNewPassword.value) {
    return '发送验证码'
  } else if (showVerificationCode.value && !showNewPassword.value) {
    return '验证验证码'
  } else {
    return '重置密码'
  }
})

// 发送验证码
const sendVerificationCode = () => {
  if (!email.value.includes('@')) {
    alert('请输入有效的邮箱地址')
    return
  }

  isSending.value = true
  countdown.value = 60

  // 模拟发送验证码
  console.log('向邮箱发送验证码:', email.value)
  alert('验证码已发送到您的邮箱（演示功能）')

  // 开始倒计时
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      isSending.value = false
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }, 1000)

  // 显示验证码输入框
  showVerificationCode.value = true
}

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 处理提交
const handleSubmit = () => {
  if (!showVerificationCode.value) {
    sendVerificationCode()
  } else if (showVerificationCode.value && !showNewPassword.value) {
    // 验证验证码
    if (verificationCode.value === '123456') { // 演示验证码
      alert('验证码正确')
      showNewPassword.value = true
    } else {
      alert('验证码错误，请重试')
    }
  } else {
    // 重置密码
    console.log('重置密码:', { email: email.value, newPassword: newPassword.value })
    alert('密码重置成功（演示功能）')
    router.push('/login')
  }
}

// 清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped lang="scss">
.forgot-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  .forgot-header {
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

  .forgot-form {
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

      .verification-btn {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: #007aff;
        cursor: pointer;
        user-select: none;

        &[disabled] {
          color: #ccc;
          cursor: not-allowed;
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

    .submit-button {
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

    .back-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;

      .back-link {
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