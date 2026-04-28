  <script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 底部导航栏配置
const tabs = [
  {
    path: '/index',
    name: 'index',
    label: 'hello',
    icon: '🏠'
  },
  {
    path: '/blog',
    name: 'blog',
    label: '博客',
    icon: '📝'
  },
  {
    path: '/user',
    name: 'user',
    label: '我',
    icon: '👤'
  }
]

// 当前激活的tab
const activeTab = computed(() => {
  console.log('watch  route.path', route.path);
  return tabs.find(tab => tab.path === route.path)?.path || ''
})

// 切换tab
const switchTab = (tab: typeof tabs[0]) => {
  if (tab.path !== route.path) {
    router.push(tab.path)
  }
}
</script>

<template>
  <div class="bottom-tab-bar">
    {{ route.path }}
    <div
      v-for="tab in tabs"
      :key="tab.path"
      class="tab-item"
      :class="{ active: activeTab === tab.path }"
      @click="switchTab(tab)"
    >
      <div class="tab-icon">{{ tab.icon }}</div>
      <div class="tab-label">{{ tab.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-item:hover {
  background-color: #f5f5f5;
}

.tab-item.active {
  color: #007aff;
}

.tab-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.tab-label {
  font-size: 12px;
  font-weight: 500;
}
</style>