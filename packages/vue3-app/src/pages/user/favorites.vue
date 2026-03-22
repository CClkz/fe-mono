<template>
  <div class="favorites-container">
    <h1 class="page-title">我的收藏</h1>

    <div class="favorites-list">
      <div v-for="item in favorites" :key="item.id" class="favorite-item">
        <div class="favorite-header">
          <h3 class="item-title">{{ item.title }}</h3>
          <span class="item-type" :class="item.type">{{ item.typeText }}</span>
        </div>
        <p class="item-content">{{ item.content }}</p>
        <div class="item-footer">
          <span class="item-author">作者：{{ item.author }}</span>
          <span class="item-date">收藏时间：{{ item.favoriteDate }}</span>
        </div>
        <div class="item-actions">
          <button class="action-btn view-btn">查看</button>
          <button class="action-btn remove-btn">取消收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const favorites = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 入门指南',
    type: 'post',
    typeText: '帖子',
    content: '本文详细介绍了Vue 3 Composition API的使用方法和最佳实践...',
    author: '张三',
    favoriteDate: '2026-03-20',
    tags: ['Vue', 'Composition API', '前端']
  },
  {
    id: 2,
    title: 'TypeScript 高级类型技巧',
    type: 'article',
    typeText: '文章',
    content: '掌握TypeScript的高级类型技巧可以大大提高开发效率...',
    author: '李四',
    favoriteDate: '2026-03-18',
    tags: ['TypeScript', '类型系统', '前端']
  },
  {
    id: 3,
    title: 'Vite 插件开发指南',
    type: 'tutorial',
    typeText: '教程',
    content: '学习如何开发自己的Vite插件，扩展构建工具功能...',
    author: '王五',
    favoriteDate: '2026-03-15',
    tags: ['Vite', '插件', '构建工具']
  }
])
</script>

<style scoped lang="scss">
.favorites-container {
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

  .favorites-list {
    max-width: 800px;
    margin: 0 auto;

    .favorite-item {
      background-color: #fff;
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      .favorite-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .item-title {
          font-size: 36px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .item-type {
          font-size: 24px;
          padding: 6px 16px;
          border-radius: 20px;
          color: #fff;

          &.post {
            background-color: #667eea;
          }

          &.article {
            background-color: #07c160;
          }

          &.tutorial {
            background-color: #ff9800;
          }
        }
      }

      .item-content {
        font-size: 28px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .item-author {
          font-size: 24px;
          color: #888;
        }

        .item-date {
          font-size: 24px;
          color: #888;
        }
      }

      .item-actions {
        display: flex;
        gap: 20px;

        .action-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 24px;
          cursor: pointer;
          transition: opacity 0.3s;

          &.view-btn {
            background: linear-gradient(to right, #667eea, #764ba2);
            color: #fff;
          }

          &.remove-btn {
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