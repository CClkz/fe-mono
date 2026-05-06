<template>
  <view class="user-center">
    <!-- 用户头像和基本信息区域 -->
    <view class="user-header">
      <image
        v-if="isLoggedIn"
        class="avatar"
        :src="userInfo.avatar || '/static/images/default-avatar.png'"
        @tap="changeAvatar"
      ></image>
      <view class="user-info">
        <text class="nickname">{{ userInfo.nickname || '未登录用户' }}</text>
        <text class="username" v-if="userInfo.username && isLoggedIn"
          >@{{ userInfo.username }}</text
        >
        <text class="level" v-if="userInfo.level && isLoggedIn"
          >等级: {{ userInfo.level }}</text
        >
      </view>
    </view>

    <!-- 未登录时显示登录按钮 -->
    <view v-if="!isLoggedIn" class="login-prompt">
      <button class="login-btn" @click="goToLogin">立即登录</button>
      <text class="login-desc">登录后享受更多功能</text>
    </view>

    <!-- 用户数据统计（仅登录后显示） -->
    <view v-if="isLoggedIn" class="user-stats">
      <view class="stat-item" @tap="goToMyPosts">
        <text class="stat-number">{{ userInfo.postsCount || 0 }}</text>
        <text class="stat-label">帖子</text>
      </view>
      <view class="stat-item" @tap="goToMyComments">
        <text class="stat-number">{{ userInfo.commentsCount || 0 }}</text>
        <text class="stat-label">评论</text>
      </view>
      <view class="stat-item" @tap="goToFavorites">
        <text class="stat-number">{{ userInfo.favoritesCount || 0 }}</text>
        <text class="stat-label">收藏</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list">
      <view v-if="isLoggedIn" class="menu-item" @tap="goToProfile">
        <text class="menu-text">个人资料</text>
        <text class="arrow">›</text>
      </view>
      <view v-if="isLoggedIn" class="menu-item" @tap="goToSettings">
        <text class="menu-text">设置</text>
        <text class="arrow">›</text>
      </view>
      <view v-if="isLoggedIn" class="menu-item" @tap="goToMyBlog">
        <text class="menu-text">我的博客</text>
        <text class="arrow">›</text>
      </view>
      <view v-if="isLoggedIn" class="menu-item" @tap="logout">
        <text class="menu-text logout-text">退出登录</text>
        <text class="arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { ref, reactive, onMounted } from 'vue';

// 模拟用户信息
const userInfo = reactive({
  nickname: '张三',
  username: 'zhangsan',
  avatar: '/static/images/default-avatar.png',
  level: 'Lv.8',
  postsCount: 15,
  commentsCount: 42,
  favoritesCount: 23,
});

const isLoggedIn = ref(false); // 默认为未登录状态

onShow(() => {
  console.log('用户中心页面 onShow');
  //   checkLoginStatus()
});

// 组件挂载时检查本地存储中的登录状态
onMounted(() => {
  console.log('用户中心页面 onMounted');
  checkLoginStatus();
});

// 检查本地存储中的登录状态
const checkLoginStatus = () => {
  try {
    const loginData = uni.getStorageSync('loginData');
    if (loginData && loginData.token && loginData.userInfo) {
      // 如果本地存储中有登录信息，则设置为已登录状态
      isLoggedIn.value = true;
      Object.assign(userInfo, loginData.userInfo);
    } else {
      isLoggedIn.value = false;
    }
  } catch (e) {
    console.error('获取登录状态失败:', e);
    isLoggedIn.value = false;
  }
};

// 更换头像
const changeAvatar = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }

  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      console.log('res', res);

      userInfo.avatar = res.tempFilePaths[0];
      // 更新本地存储中的用户信息
      updateUserInfoStorage();
      console.log('选择头像:', res.tempFilePaths[0]);
    },
  });
};

// 更新本地存储中的用户信息
const updateUserInfoStorage = () => {
  if (isLoggedIn.value) {
    try {
      const loginData = uni.getStorageSync('loginData');
      if (loginData && loginData.token) {
        loginData.userInfo = { ...userInfo };
        uni.setStorageSync('loginData', loginData);
      }
    } catch (e) {
      console.error('更新用户信息失败:', e);
    }
  }
};

// 跳转到登录页面
const goToLogin = () => {
  uni.redirectTo({
    url: '/pages/login/login',
  });
};

// 跳转到我的帖子
const goToMyPosts = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }
  uni.navigateTo({
    url: '/pages/user/my-posts',
  });
};

// 跳转到我的评论
const goToMyComments = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }
  uni.navigateTo({
    url: '/pages/user/my-comments',
  });
};

// 跳转到我的收藏
const goToFavorites = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }
  uni.navigateTo({
    url: '/pages/user/favorites',
  });
};

// 跳转到个人资料
const goToProfile = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }
  uni.navigateTo({
    url: '/pages/user/profile',
  });
};

// 跳转到设置
const goToSettings = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }
  uni.navigateTo({
    url: '/pages/user/settings',
  });
};

// 跳转到我的博客
const goToMyBlog = () => {
  if (!isLoggedIn.value) {
    goToLogin();
    return;
  }
  uni.navigateTo({
    url: '/pages/user/my-blog',
  });
};

// 退出登录
const logout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: res => {
      if (res.confirm) {
        // 清除本地存储中的登录信息
        uni.removeStorageSync('loginData');

        // 重置用户状态
        isLoggedIn.value = false;
        userInfo.nickname = undefined;
        userInfo.username = undefined;
        userInfo.level = undefined;
        userInfo.avatar = '/static/images/default-avatar.png';
        userInfo.postsCount = 0;
        userInfo.commentsCount = 0;
        userInfo.favoritesCount = 0;

        console.log('用户已退出登录');
      }
    },
  });
};
</script>

<style lang="scss">
.user-center {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;

  .user-header {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 30rpx;
    }

    .user-info {
      flex: 1;

      .nickname {
        font-size: 36rpx;
        font-weight: bold;
        display: block;
      }

      .username {
        font-size: 28rpx;
        color: #888;
        display: block;
        margin-top: 10rpx;
      }

      .level {
        font-size: 24rpx;
        color: #ff6b35;
        display: block;
        margin-top: 10rpx;
      }
    }
  }

  .login-prompt {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 60rpx 40rpx;
    text-align: center;
    margin-bottom: 20rpx;

    .login-btn {
      background: linear-gradient(to right, #667eea, #764ba2);
      color: #fff;
      border-radius: 10rpx;
      width: 100%;
      margin-bottom: 20rpx;
    }

    .login-desc {
      font-size: 24rpx;
      color: #888;
    }
  }

  .user-stats {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx 0;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20rpx;

    .stat-item {
      text-align: center;

      .stat-number {
        font-size: 36rpx;
        font-weight: bold;
        display: block;
      }

      .stat-label {
        font-size: 24rpx;
        color: #888;
        display: block;
        margin-top: 10rpx;
      }
    }
  }

  .menu-list {
    background-color: #fff;
    border-radius: 20rpx;
    overflow: hidden;

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .menu-text {
        font-size: 30rpx;
        color: #333;

        &.logout-text {
          color: #ff4757;
        }
      }

      .arrow {
        font-size: 36rpx;
        color: #ccc;
      }
    }
  }
}
</style>
