<template>
  <view class="login-container">
    <view class="login-header">
      <text class="title">欢迎登录</text>
      <text class="subtitle">请输入您的账户信息</text>
    </view>

    <view class="login-form">
      <view class="input-group">
        <input
          class="input-field"
          type="text"
          v-model="formData.username"
          placeholder="请输入用户名或手机号"
        />
      </view>

      <view class="input-group">
        <input
          class="input-field"
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.password"
          placeholder="请输入密码"
        />
        <text class="password-toggle" @click="togglePassword">{{
          showPassword ? '隐藏' : '显示'
        }}</text>
      </view>

      <view class="remember-forgot">
        <label class="checkbox-label" @click="toggleRemember">
          <view class="checkbox" :class="{ checked: formData.rememberMe }">
            <text v-if="formData.rememberMe" class="checkmark">✓</text>
          </view>
          <text class="checkbox-text">记住我</text>
        </label>
        <navigator url="/pages/login/forgot-password" class="forgot-link"
          >忘记密码?</navigator
        >
      </view>

      <button
        class="login-button"
        :class="{ disabled: !canLogin }"
        :disabled="!canLogin"
        @click="handleLogin"
      >
        登录
      </button>

      <view class="register-section">
        <text class="register-text">还没有账号？</text>
        <navigator url="/pages/login/register" class="register-link"
          >立即注册</navigator
        >
      </view>
    </view>

    <view class="social-login">
      <view class="divider">
        <text class="divider-text">其他登录方式</text>
      </view>

      <view class="social-buttons">
        <button class="social-btn wechat" @click="socialLogin('wechat')">
          微信登录
        </button>
        <button class="social-btn qq" @click="socialLogin('qq')">QQ登录</button>
        <button class="social-btn alipay" @click="socialLogin('alipay')">
          支付宝登录
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  rememberMe: false,
});

// 显示密码
const showPassword = ref(false);

// 计算属性：判断是否可以登录
const canLogin = computed(() => {
  return formData.username.trim().length > 0 && formData.password.length >= 6;
});

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// 用户名输入事件
const onUsernameInput = (e: any) => {
  formData.username = e.target.value;
};

// 密码输入事件
const onPasswordInput = (e: any) => {
  formData.password = e.target.value;
};

// 切换记住我
const toggleRemember = () => {
  formData.rememberMe = !formData.rememberMe;
};

// 处理登录
const handleLogin = () => {
  if (!canLogin.value) {
    uni.showToast({
      title: '请输入正确的用户名和密码',
      icon: 'none',
    });
    return;
  }

  // 这里添加登录逻辑
  console.log('登录信息:', formData);

  // 模拟登录过程
  uni.showLoading({
    title: '登录中...',
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '登录成功',
      icon: 'success',
    });

    // 登录成功后保存登录状态到本地存储
    saveLoginStatus();

    // 登录成功后跳转到hello页面（index页面）
    uni.switchTab({
      url: '/pages/index/index',
    });
  }, 1500);
};

// 保存登录状态到本地存储
const saveLoginStatus = () => {
  try {
    // 模拟生成token和用户信息
    const loginData = {
      token: 'mock_token_' + Date.now(), // 实际项目中这里应该是真实的token
      userInfo: {
        nickname: formData.username,
        username: formData.username,
        avatar: '/static/images/default-avatar.png',
        level: 'Lv.1',
        postsCount: 0,
        commentsCount: 0,
        favoritesCount: 0,
      },
      rememberMe: formData.rememberMe,
      loginTime: Date.now(),
    };

    uni.setStorageSync('loginData', loginData);
    console.log('登录状态已保存到本地存储');
  } catch (e) {
    console.error('保存登录状态失败:', e);
  }
};

// 社交登录
const socialLogin = (type: string) => {
  console.log(`${type}登录`);
  uni.showToast({
    title: `使用${type}登录`,
    icon: 'none',
  });

  // 社交登录成功后同样保存登录状态并跳转
  setTimeout(() => {
    saveLoginStatus();
    uni.switchTab({
      url: '/pages/index/index',
    });
  }, 1000);
};
</script>

<style lang="scss">
.login-container {
  padding: 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  .login-header {
    text-align: center;
    margin-bottom: 80rpx;

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

  .login-form {
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

    .remember-forgot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;

      .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;

        .checkbox {
          width: 30rpx;
          height: 30rpx;
          border: 2rpx solid #ddd;
          border-radius: 6rpx;
          margin-right: 10rpx;
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

        .checkbox-text {
          font-size: 24rpx;
          color: #666;
        }
      }

      .forgot-link {
        font-size: 24rpx;
        color: #007aff;
        text-decoration: none;
      }
    }

    .login-button {
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

    .register-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40rpx;

      .register-text {
        font-size: 24rpx;
        color: #666;
        margin-right: 10rpx;
      }

      .register-link {
        font-size: 24rpx;
        color: #007aff;
        text-decoration: none;
      }
    }
  }

  .social-login {
    margin-top: 60rpx;

    .divider {
      text-align: center;
      position: relative;
      margin-bottom: 40rpx;

      .divider-text {
        font-size: 24rpx;
        color: #999;
        background-color: #f0f0f0;
        padding: 0 20rpx;
        position: relative;
        z-index: 2;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        right: 0;
        height: 1rpx;
        background-color: #e5e5e5;
        z-index: 1;
      }
    }

    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 30rpx;

      .social-btn {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20rpx;
        border: none;

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
