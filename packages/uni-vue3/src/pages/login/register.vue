<template>
  <view class="register-container">
    <view class="register-header">
      <text class="title">用户注册</text>
      <text class="subtitle">创建您的账户</text>
    </view>

    <view class="register-form">
      <view class="input-group">
        <input
          class="input-field"
          type="text"
          v-model="formData.username"
          placeholder="请输入用户名"
          @input="onUsernameInput"
        />
      </view>

      <view class="input-group">
        <input
          class="input-field"
          type="text"
          v-model="formData.phone"
          placeholder="请输入手机号"
          @input="onPhoneInput"
        />
      </view>

      <view class="input-group">
        <input
          class="input-field"
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.password"
          placeholder="请输入密码"
          @input="onPasswordInput"
        />
        <text class="password-toggle" @click="togglePassword">{{
          showPassword ? '隐藏' : '显示'
        }}</text>
      </view>

      <view class="input-group">
        <input
          class="input-field"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="formData.confirmPassword"
          placeholder="请确认密码"
          @input="onConfirmPasswordInput"
        />
        <text class="password-toggle" @click="toggleConfirmPassword">{{
          showConfirmPassword ? '隐藏' : '显示'
        }}</text>
      </view>

      <view class="verification-code">
        <input
          class="input-field code-input"
          type="text"
          v-model="formData.code"
          placeholder="请输入验证码"
        />
        <button
          class="code-btn"
          :disabled="countdown > 0"
          @click="sendVerificationCode"
        >
          {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
        </button>
      </view>

      <button
        class="register-button"
        :class="{ disabled: !canRegister }"
        :disabled="!canRegister"
        @click="handleRegister"
      >
        注册
      </button>

      <view class="login-section">
        <text class="login-text">已有账号？</text>
        <navigator url="/pages/login/login" class="login-link"
          >立即登录</navigator
        >
      </view>
    </view>

    <view class="agreement">
      <label class="checkbox-label" @click="toggleAgreement">
        <view class="checkbox" :class="{ checked: formData.agreed }">
          <text v-if="formData.agreed" class="checkmark">✓</text>
        </view>
        <text class="agreement-text"
          >我已阅读并同意<text class="agreement-link" @click="viewAgreement"
            >《用户协议》</text
          >和<text class="agreement-link" @click="viewPrivacy"
            >《隐私政策》</text
          ></text
        >
      </label>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// 表单数据
const formData = reactive({
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  code: '',
  agreed: false,
});

// 显示密码
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 验证码倒计时
const countdown = ref(0);

// 计算属性：判断是否可以注册
const canRegister = computed(() => {
  return (
    formData.username.trim().length >= 3 &&
    /^1[3-9]\d{9}$/.test(formData.phone) &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    formData.code.length === 6 &&
    formData.agreed
  );
});

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// 用户名输入事件
const onUsernameInput = (e: any) => {
  formData.username = e.target.value;
};

// 手机号输入事件
const onPhoneInput = (e: any) => {
  formData.phone = e.target.value;
};

// 密码输入事件
const onPasswordInput = (e: any) => {
  formData.password = e.target.value;
};

// 确认密码输入事件
const onConfirmPasswordInput = (e: any) => {
  formData.confirmPassword = e.target.value;
};

// 发送验证码
const sendVerificationCode = () => {
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
    });
    return;
  }

  // 模拟发送验证码
  console.log('发送验证码到:', formData.phone);

  // 开始倒计时
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);

  uni.showToast({
    title: '验证码已发送',
    icon: 'success',
  });
};

// 切换同意协议
const toggleAgreement = () => {
  formData.agreed = !formData.agreed;
};

// 查看用户协议
const viewAgreement = () => {
  uni.navigateTo({
    url: '/pages/login/agreement',
  });
};

// 查看隐私政策
const viewPrivacy = () => {
  uni.navigateTo({
    url: '/pages/login/privacy',
  });
};

// 处理注册
const handleRegister = () => {
  if (!canRegister.value) {
    uni.showToast({
      title: '请填写完整并正确的信息',
      icon: 'none',
    });
    return;
  }

  // 模拟注册过程
  uni.showLoading({
    title: '注册中...',
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '注册成功',
      icon: 'success',
    });

    // 注册成功后跳转到登录页
    uni.redirectTo({
      url: '/pages/login/login',
    });
  }, 1500);
};
</script>

<style lang="scss">
.register-container {
  padding: 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  .register-header {
    text-align: center;
    margin-bottom: 60rpx;

    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #fff;
      display: block;
      margin-bottom: 20rpx;
    }

    .subtitle {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .register-form {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 50rpx 40rpx;
    box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);

    .input-group {
      position: relative;
      margin-bottom: 40rpx;

      .input-field {
        width: 100%;
        height: 80rpx;
        border: 2rpx solid #e5e5e5;
        border-radius: 10rpx;
        padding: 0 20rpx;
        font-size: 28rpx;

        &:focus {
          border-color: #007aff;
        }
      }

      .password-toggle {
        position: absolute;
        right: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24rpx;
        color: #007aff;
        z-index: 2;
      }
    }

    .verification-code {
      position: relative;
      margin-bottom: 40rpx;
      display: flex;
      gap: 20rpx;

      .code-input {
        flex: 1;
      }

      .code-btn {
        width: 200rpx;
        height: 80rpx;
        background-color: #f0f0f0;
        color: #666;
        border: 2rpx solid #e5e5e5;
        border-radius: 10rpx;
        font-size: 24rpx;

        &:disabled {
          background-color: #e5e5e5;
          color: #999;
        }
      }
    }

    .register-button {
      width: 100%;
      height: 80rpx;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: #fff;
      border: none;
      border-radius: 10rpx;
      font-size: 32rpx;
      font-weight: bold;

      &.disabled {
        background-color: #ccc;
      }
    }

    .login-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40rpx;

      .login-text {
        font-size: 24rpx;
        color: #666;
        margin-right: 10rpx;
      }

      .login-link {
        font-size: 24rpx;
        color: #007aff;
        text-decoration: none;
      }
    }
  }

  .agreement {
    margin-top: 40rpx;

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      cursor: pointer;

      .checkbox {
        width: 30rpx;
        height: 30rpx;
        border: 2rpx solid #ddd;
        border-radius: 6rpx;
        margin-right: 10rpx;
        margin-top: 4rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        &.checked {
          background-color: #007aff;
          border-color: #007aff;
        }

        .checkmark {
          color: #fff;
          font-size: 20rpx;
          line-height: 1;
        }
      }

      .agreement-text {
        font-size: 24rpx;
        color: #666;
        flex: 1;

        .agreement-link {
          color: #007aff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
