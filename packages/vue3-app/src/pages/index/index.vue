<template>
  <div class="content">
    <div class="text-area">
      <h1 class="title">{{ title }}</h1>
      <button class="blog-btn" @click="goBlog">进入博客</button>
      <router-link to="/user" class="user-link">
        <div class="user-card">
          <span>用户中心</span>
          <span class="arrow">›</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('Hello')
const router = useRouter()

// 跳转到 blog 页面
const goBlog = () => {
  router.push('/blog')
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.text-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.title {
  font-size: 36px;
  color: #8f8f94;
  margin-bottom: 20px;
}

.blog-btn {
  margin-top: 32px;
  padding: 16px 48px;
  font-size: 28px;
  color: #fff;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 32px;
  box-shadow: 0 4px 16px rgba(79, 172, 254, 0.15);
  cursor: pointer;
  transition: background 0.3s;
}

.blog-btn:hover {
  background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
}

.blog-btn:active {
  transform: translateY(1px);
}

.user-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
  max-width: 300px;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.user-card span {
  font-size: 28px;
  color: #333;
}

.arrow {
  font-size: 36px;
  color: #ccc;
}
</style>