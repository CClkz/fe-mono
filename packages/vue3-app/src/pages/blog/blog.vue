<template>
  <div class="blog-container">
    <h1 class="blog-title">{{ blog.title }}</h1>
    <div class="blog-meta">
      <span>作者：{{ blog.author }}</span>
      <span class="blog-date">{{ blog.date }}</span>
    </div>
    <div class="blog-content">
      {{ blog.content }}
    </div>
    <div class="blog-actions">
      <button class="like-btn" @click="like">👍 点赞 {{ likes }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

onMounted(() => {
  console.log('blog 页面加载完成')
})

const blog = ref({
  title: 'Vite + Vue3 + TypeScript 博客示例',
  author: 'GitHub Copilot',
  date: '2026-03-22',
  content: `
    Vite 是一个现代化的前端构建工具，提供了极速的开发体验。
    Vue 3 是一个渐进式 JavaScript 框架，使用 Composition API 提供了更好的 TypeScript 支持。
    TypeScript 为 JavaScript 添加了类型系统，提高了代码的可维护性和开发效率。
    本页面为博客内容演示，包含标题、作者、时间、正文和点赞功能。
  `,
})

const likes = ref(0)

function like() {
  likes.value++
}
</script>

<style scoped lang="scss">
.blog-container {
  padding: 32px;
  background: #fff;
  min-height: 100vh;
}

.blog-title {
  font-size: 44px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.blog-meta {
  color: #888;
  font-size: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
}

.blog-content {
  font-size: 32px;
  line-height: 1.8;
  margin-bottom: 32px;
  white-space: pre-line;
  color: #555;
}

.blog-actions {
  text-align: right;
}

.like-btn {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 28px;
  cursor: pointer;
  transition: background 0.3s;
}

.like-btn:hover {
  background: #f57c00;
}

.like-btn:active {
  transform: translateY(1px);
}
</style>