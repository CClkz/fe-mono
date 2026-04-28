<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'

const route = useRoute()

// 检查当前路由是否需要显示底部导航栏
const showBottomTabBar = computed(() => {
  return route.meta.isTab === true
})
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <RouterView />
    </main>
    <BottomTabBar v-if="showBottomTabBar" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-bottom: 60px; /* 为底部导航栏预留空间 */
}
</style>
