<script lang="ts" setup>
import { ref } from 'vue';
// 引入 onLoad 钩子
import { onLoad, onShow } from '@dcloudio/uni-app';

onLoad(options => {
  // 页面加载时会调用这里
  console.log('blog 页面 onLoad', options);
});

onShow(() => {
  // 页面显示时会调用这里
  console.log('blog 页面 onShow');
});

const blog = ref({
  title: 'uni-app 博客示例',
  author: 'GitHub Copilot',
  date: '2026-03-10',
  content: `
		uni-app 是一个使用 Vue.js 开发所有前端应用的框架，支持编译到 iOS、Android、H5 以及各种小程序平台。
		本页面为博客内容演示，包含标题、作者、时间、正文和点赞功能。
	`,
});

const likes = ref(0);
function like() {
  likes.value++;
}
</script>

<template>
  <view class="blog-container">
    <view class="blog-title">{{ blog.title }}</view>
    <view class="blog-meta">
      <text>作者：{{ blog.author }}</text>
      <text class="blog-date">{{ blog.date }}</text>
    </view>
    <view class="blog-content">
      {{ blog.content }}
    </view>
    <view class="blog-actions">
      <button class="like-btn" @click="like">👍 点赞 {{ likes }}</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.blog-container {
  padding: 32rpx;
  background: #fff;
  min-height: 100vh;
}
.blog-title {
  font-size: 44rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}
.blog-meta {
  color: #888;
  font-size: 24rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
}
.blog-content {
  font-size: 32rpx;
  line-height: 1.8;
  margin-bottom: 32rpx;
  white-space: pre-line;
}
.blog-actions {
  text-align: right;
}
.like-btn {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  padding: 12rpx 32rpx;
  font-size: 28rpx;
}
</style>
