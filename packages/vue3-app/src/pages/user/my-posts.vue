<template>
  <div class="posts-container">
    <h1 class="page-title">我的帖子</h1>

    <div class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-header">
          <h3 class="post-title">{{ post.title }}</h3>
          <span class="post-date">{{ post.date }}</span>
        </div>
        <p class="post-content">{{ post.content }}</p>
        <div class="post-stats">
          <span class="stat">👍 {{ post.likes }}</span>
          <span class="stat">💬 {{ post.comments }}</span>
          <span class="stat">👁 {{ post.views }}</span>
        </div>
        <div class="post-actions">
          <button class="action-btn edit-btn">编辑</button>
          <button class="action-btn delete-btn">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 入门指南',
    date: '2026-03-20',
    content: '本文介绍了Vue 3 Composition API的基本用法和最佳实践...',
    likes: 42,
    comments: 8,
    views: 256
  },
  {
    id: 2,
    title: 'TypeScript 类型系统深入解析',
    date: '2026-03-18',
    content: 'TypeScript 的类型系统提供了强大的类型安全保证...',
    likes: 28,
    comments: 5,
    views: 189
  },
  {
    id: 3,
    title: 'Vite 构建工具配置指南',
    date: '2026-03-15',
    content: 'Vite 是一个现代化的前端构建工具，本文介绍其配置方法...',
    likes: 35,
    comments: 12,
    views: 312
  }
])
</script>

<style scoped lang="scss">
.posts-container {
  padding: 40px;
  min-height: 100vh;
  background-color: #f5f5f5;

  .page-title {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 40px;
    text-align: center;
  }

  .posts-list {
    max-width: 800px;
    margin: 0 auto;

    .post-item {
      background-color: #fff;
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .post-title {
          font-size: 36px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .post-date {
          font-size: 24px;
          color: #888;
        }
      }

      .post-content {
        font-size: 28px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .post-stats {
        display: flex;
        gap: 30px;
        margin-bottom: 20px;

        .stat {
          font-size: 24px;
          color: #888;
        }
      }

      .post-actions {
        display: flex;
        gap: 20px;

        .action-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 24px;
          cursor: pointer;
          transition: opacity 0.3s;

          &.edit-btn {
            background: linear-gradient(to right, #667eea, #764ba2);
            color: #fff;
          }

          &.delete-btn {
            background-color: #ff4757;
            color: #fff;
          }

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }
}
</style>