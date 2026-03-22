<template>
  <div class="settings-container">
    <h1 class="page-title">设置</h1>

    <div class="settings-list">
      <div class="settings-group">
        <h2 class="group-title">账号设置</h2>
        <div class="settings-item">
          <span class="item-text">修改密码</span>
          <span class="arrow">›</span>
        </div>
        <div class="settings-item">
          <span class="item-text">绑定手机</span>
          <span class="arrow">›</span>
        </div>
        <div class="settings-item">
          <span class="item-text">绑定邮箱</span>
          <span class="arrow">›</span>
        </div>
      </div>

      <div class="settings-group">
        <h2 class="group-title">通知设置</h2>
        <div class="settings-item toggle-item">
          <span class="item-text">系统通知</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notifications.system" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-item toggle-item">
          <span class="item-text">评论提醒</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notifications.comments" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-item toggle-item">
          <span class="item-text">点赞提醒</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notifications.likes" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-group">
        <h2 class="group-title">隐私设置</h2>
        <div class="settings-item toggle-item">
          <span class="item-text">个人资料公开</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="privacy.profilePublic" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-item toggle-item">
          <span class="item-text">帖子公开</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="privacy.postsPublic" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-item toggle-item">
          <span class="item-text">收藏公开</span>
          <label class="toggle-switch">
            <input type="checkbox" v-model="privacy.favoritesPublic" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-group">
        <h2 class="group-title">其他</h2>
        <div class="settings-item">
          <span class="item-text">关于我们</span>
          <span class="arrow">›</span>
        </div>
        <div class="settings-item">
          <span class="item-text">帮助中心</span>
          <span class="arrow">›</span>
        </div>
        <div class="settings-item">
          <span class="item-text">版本信息</span>
          <span class="version">v1.0.0</span>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-item logout-item" @click="handleLogout">
          <span class="item-text logout-text">退出登录</span>
          <span class="arrow">›</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const notifications = reactive({
  system: true,
  comments: true,
  likes: true
})

const privacy = reactive({
  profilePublic: true,
  postsPublic: true,
  favoritesPublic: false
})

const handleLogout = () => {
  if (window.confirm('确定要退出登录吗？')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
.settings-container {
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

  .settings-list {
    max-width: 800px;
    margin: 0 auto;

    .settings-group {
      background-color: #fff;
      border-radius: 20px;
      padding: 20px 0;
      margin-bottom: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      .group-title {
        font-size: 32px;
        font-weight: bold;
        color: #333;
        padding: 0 40px 20px;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 20px;
      }

      .settings-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 40px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        transition: background-color 0.2s;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: #f9f9f9;
        }

        &.toggle-item {
          cursor: default;
          &:hover {
            background-color: transparent;
          }
        }

        &.logout-item:hover {
          background-color: #fff5f5;
        }

        .item-text {
          font-size: 30px;
          color: #333;

          &.logout-text {
            color: #ff4757;
          }
        }

        .arrow {
          font-size: 36px;
          color: #ccc;
        }

        .version {
          font-size: 28px;
          color: #888;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;

          input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;

            &:before {
              position: absolute;
              content: "";
              height: 26px;
              width: 26px;
              left: 4px;
              bottom: 4px;
              background-color: white;
              transition: .4s;
              border-radius: 50%;
            }
          }

          input:checked + .toggle-slider {
            background-color: #007aff;
          }

          input:checked + .toggle-slider:before {
            transform: translateX(26px);
          }
        }
      }
    }
  }
}
</style>