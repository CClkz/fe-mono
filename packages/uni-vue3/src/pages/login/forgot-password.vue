<template>
  <view class="forgot-password-container">
    <view class="forgot-password-header">
      <text class="title">找回密码</text>
      <text class="subtitle">请输入您的手机号以找回密码</text>
    </view>

    <view class="forgot-password-form">
      <view class="input-group">
        <input
          class="input-field"
          type="text"
          v-model="formData.phone"
          placeholder="请输入手机号"
          @input="onPhoneInput"
        />
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

      <view class="input-group">
        <input
          class="input-field"
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.newPassword"
          placeholder="请输入新密码"
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
          placeholder="请确认新密码"
          @input="onConfirmPasswordInput"
        />
        <text class="password-toggle" @click="toggleConfirmPassword">{{
          showConfirmPassword ? '隐藏' : '显示'
        }}</text>
      </view>

      <button
        class="reset-button"
        :class="{ disabled: !canReset }"
        :disabled="!canReset"
        @click="handleResetPassword"
      >
        重置密码
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// 表单数据
const formData = reactive({
  phone: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
});

// 显示密码
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 验证码倒计时
const countdown = ref(0);

// 计算属性：判断是否可以重置密码
const canReset = computed(() => {
  return (
    /^1[3-9]\d{9}$/.test(formData.phone) &&
    formData.code.length === 6 &&
    formData.newPassword.length >= 6 &&
    formData.newPassword === formData.confirmPassword
  );
});

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// 手机号输入事件
const onPhoneInput = (e: any) => {
  formData.phone = e.target.value;
};

// 密码输入事件
const onPasswordInput = (e: any) => {
  formData.newPassword = e.target.value;
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

// 处理重置密码
const handleResetPassword = () => {
  if (!canReset.value) {
    uni.showToast({
      title: '请填写完整并正确的信息',
      icon: 'none',
    });
    return;
  }

  // 模拟重置密码过程
  uni.showLoading({
    title: '重置中...',
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '密码重置成功',
      icon: 'success',
    });

    // 重置成功后跳转到登录页
    uni.redirectTo({
      url: '/pages/login/login',
    });
  }, 1500);
};
</script>

<style lang="scss">
.forgot-password-container {
  padding: 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  .forgot-password-header {
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

  .forgot-password-form {
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

    .reset-button {
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
  }
}
</style>
