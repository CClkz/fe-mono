<template>
  <div class="myblog-container">
    <div class="myblog-header">
      <h1 class="page-title">我的博客</h1>
      <button class="create-btn" @click="createNewPost">创建新文章</button>
    </div>

    <div class="blog-stats">
      <div class="stat-item">
        <span class="stat-number">{{ stats.totalPosts }}</span>
        <span class="stat-label">文章总数</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.totalViews }}</span>
        <span class="stat-label">总阅读量</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.totalLikes }}</span>
        <span class="stat-label">总点赞数</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.totalComments }}</span>
        <span class="stat-label">总评论数</span>
      </div>
    </div>

    <div class="blog-posts">
      <h2 class="section-title">最新文章</h2>
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-header">
          <h3 class="post-title">{{ post.title }}</h3>
          <span class="post-status" :class="post.status">{{ post.statusText }}</span>
        </div>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-meta">
          <span class="meta-item">发布时间：{{ post.publishDate }}</span>
          <span class="meta-item">分类：{{ post.category }}</span>
          <span class="meta-item">标签：{{ post.tags.join(', ') }}</span>
        </div>
        <div class="post-stats">
          <span class="stat">👁 {{ post.views }}</span>
          <span class="stat">👍 {{ post.likes }}</span>
          <span class="stat">💬 {{ post.comments }}</span>
        </div>
        <div class="post-actions">
          <button class="action-btn edit-btn">编辑</button>
          <button class="action-btn delete-btn">删除</button>
          <button class="action-btn preview-btn">预览</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stats = ref({
  totalPosts: 15,
  totalViews: 2560,
  totalLikes: 420,
  totalComments: 89
})

const posts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 实战技巧',
    status: 'published',
    statusText: '已发布',
    excerpt: '本文分享在实际项目中使用Vue 3 Composition API的一些技巧和经验...',
    publishDate: '2026-03-20',
    category: '前端开发',
    tags: ['Vue', 'Composition API', '实战'],
    views: 256,
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    title: 'TypeScript 类型体操入门',
    status: 'draft',
    statusText: '草稿',
    excerpt: '学习TypeScript高级类型操作，提升类型编程能力...',
    publishDate: '2026-03-18',
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统', '进阶'],
    views: 0,
    likes: 0,
    comments: 0
  },
  {
    id: 3,
    title: 'Vite 插件开发全攻略',
    status: 'published',
    statusText: '已发布',
    excerpt: '从零开始开发Vite插件，完整教程包含常见场景和最佳实践...',
    publishDate: '2026-03-15',
    category: '构建工具',
    tags: ['Vite', '插件', '构建工具'],
    views: 312,
    likes: 35,
    comments: 12
  }
])

const createNewPost = () => {
  alert('创建新文章（演示功能）')
  console.log('创建新文章')
}
</script>

<style scoped lang="scss">
.myblog-container {
  padding: 40px;
  min-height: 100vh;
  background-color: #f5f5f5;

  .myblog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .page-title {
      font-size: 48px;
      font-weight: bold;
      color: #333;
      margin: 0;
    }

    .create-btn {
      padding: 20px 40px;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .blog-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-bottom: 60px;

    .stat-item {
      background-color: #fff;
      border-radius: 20px;
      padding: 40px 20px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-number {
        font-size: 48px;
        font-weight: bold;
        color: #667eea;
        display: block;
        margin-bottom: 10px;
      }

      .stat-label {
        font-size: 24px;
        color: #888;
        display: block;
      }
    }
  }

  .blog-posts {
    max-width: 1000px;
    margin: 0 auto;

    .section-title {
      font-size: 36px;
      font-weight: bold;
      color: #333;
      margin-bottom: 30px;
    }

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

        .post-status {
          font-size: 24px;
          padding: 6px 16px;
          border-radius: 20px;

          &.published {
            background-color: #07c160;
            color: #fff;
          }

          &.draft {
            background-color: #ff9800;
            color: #fff;
          }
        }
      }

      .post-excerpt {
        font-size: 28px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .post-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        margin-bottom: 20px;

        .meta-item {
          font-size: 24px;
          color: #888;
        }
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

          &.preview-btn {
            background-color: #07c160;
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