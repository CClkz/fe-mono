<template>
  <div class="comments-container">
    <h1 class="page-title">我的评论</h1>

    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <span class="post-title">帖子：{{ comment.postTitle }}</span>
          <span class="comment-date">{{ comment.date }}</span>
        </div>
        <p class="comment-content">{{ comment.content }}</p>
        <div class="comment-stats">
          <span class="stat">👍 {{ comment.likes }}</span>
          <span class="stat">💬 {{ comment.replies }}</span>
        </div>
        <div class="comment-actions">
          <button class="action-btn edit-btn">编辑</button>
          <button class="action-btn delete-btn">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const comments = ref([
  {
    id: 1,
    postTitle: 'Vue 3 Composition API 入门指南',
    date: '2026-03-21',
    content: '这篇文章对我帮助很大，特别是关于ref和reactive的对比部分。',
    likes: 5,
    replies: 2
  },
  {
    id: 2,
    postTitle: 'TypeScript 类型系统深入解析',
    date: '2026-03-19',
    content: '类型守卫的部分讲得很清楚，解决了我在实际开发中的困惑。',
    likes: 3,
    replies: 1
  },
  {
    id: 3,
    postTitle: 'Vite 构建工具配置指南',
    date: '2026-03-16',
    content: 'Vite的热更新速度确实很快，配置也比Webpack简单很多。',
    likes: 8,
    replies: 3
  }
])
</script>

<style scoped lang="scss">
.comments-container {
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

  .comments-list {
    max-width: 800px;
    margin: 0 auto;

    .comment-item {
      background-color: #fff;
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .post-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }

        .comment-date {
          font-size: 24px;
          color: #888;
        }
      }

      .comment-content {
        font-size: 28px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
        padding-left: 20px;
        border-left: 4px solid #667eea;
      }

      .comment-stats {
        display: flex;
        gap: 30px;
        margin-bottom: 20px;

        .stat {
          font-size: 24px;
          color: #888;
        }
      }

      .comment-actions {
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