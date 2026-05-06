<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <button class="blog-btn" @click="goBlog">进入博客</button>
      <navigator url="/pages/user/user" class="user-link">
        <view class="user-card">
          <text>用户中心</text>
          <text class="arrow">›</text>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const title = ref('Hello');
// 跳转到 blog 页面
const goBlog = () => {
  uni.switchTab({
    url: '/pages/blog/blog',
  });
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.blog-btn {
  margin-top: 32rpx;
  padding: 16rpx 48rpx;
  font-size: 28rpx;
  color: #fff;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(79, 172, 254, 0.15);
  cursor: pointer;
  transition: background 0.3s;
}
.blog-btn:active {
  background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
}
</style>
