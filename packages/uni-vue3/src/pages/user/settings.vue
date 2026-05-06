<template>
	<view class="settings-container">
		<view class="settings-header">
			<text class="title">设置</text>
		</view>

		<view class="settings-content">
			<!-- 账号安全 -->
			<view class="section">
				<text class="section-title">账号安全</text>
				<view class="menu-list">
					<view class="menu-item" @tap="goToChangePassword">
						<text class="menu-text">修改密码</text>
						<text class="arrow">›</text>
					</view>
					<view class="menu-item" @tap="goToAccountSecurity">
						<text class="menu-text">账号安全</text>
						<text class="arrow">›</text>
					</view>
					<view class="menu-item" @tap="goToLoginDevices">
						<text class="menu-text">登录设备管理</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>

			<!-- 通知设置 -->
			<view class="section">
				<text class="section-title">通知设置</text>
				<view class="menu-list">
					<view class="switch-item">
						<text class="menu-text">新消息通知</text>
						<switch
							:checked="notifications.newMessage"
							@change="onNewMessageChange"
							color="#007aff"
						/>
					</view>
					<view class="switch-item">
						<text class="menu-text">点赞和评论通知</text>
						<switch
							:checked="notifications.likesComments"
							@change="onLikesCommentsChange"
							color="#007aff"
						/>
					</view>
					<view class="switch-item">
						<text class="menu-text">系统通知</text>
						<switch
							:checked="notifications.system"
							@change="onSystemChange"
							color="#007aff"
						/>
					</view>
					<view class="switch-item">
						<text class="menu-text">邮件通知</text>
						<switch
							:checked="notifications.email"
							@change="onEmailChange"
							color="#007aff"
						/>
					</view>
				</view>
			</view>

			<!-- 隐私设置 -->
			<view class="section">
				<text class="section-title">隐私设置</text>
				<view class="menu-list">
					<view class="switch-item">
						<text class="menu-text">私密账号</text>
						<switch
							:checked="privacy.privateAccount"
							@change="onPrivateAccountChange"
							color="#007aff"
						/>
					</view>
					<view class="switch-item">
						<text class="menu-text">在线状态</text>
						<switch
							:checked="privacy.showOnlineStatus"
							@change="onOnlineStatusChange"
							color="#007aff"
						/>
					</view>
					<view class="menu-item" @tap="goToBlockedUsers">
						<text class="menu-text">黑名单管理</text>
						<text class="arrow">›</text>
					</view>
					<view class="menu-item" @tap="goToDataPrivacy">
						<text class="menu-text">数据与隐私</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>

			<!-- 通用设置 -->
			<view class="section">
				<text class="section-title">通用设置</text>
				<view class="menu-list">
					<view class="menu-item" @tap="goToLanguage">
						<text class="menu-text">语言</text>
						<view class="menu-right">
							<text class="current-language">简体中文</text>
							<text class="arrow">›</text>
						</view>
					</view>
					<view class="menu-item" @tap="goToTheme">
						<text class="menu-text">主题</text>
						<view class="menu-right">
							<text class="current-theme">跟随系统</text>
							<text class="arrow">›</text>
						</view>
					</view>
					<view class="menu-item" @tap="goToClearCache">
						<text class="menu-text">清理缓存</text>
						<view class="menu-right">
							<text class="cache-size">{{ cacheSize }}</text>
							<text class="arrow">›</text>
						</view>
					</view>
					<view class="menu-item" @tap="goToAbout">
						<text class="menu-text">关于我们</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>

			<!-- 退出登录按钮 -->
			<view class="logout-section">
				<button class="logout-btn" @click="logout">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// 通知设置
const notifications = reactive({
	newMessage: true,
	likesComments: true,
	system: false,
	email: false
})

// 隐私设置
const privacy = reactive({
	privateAccount: false,
	showOnlineStatus: true
})

// 缓存大小
const cacheSize = ref('12.5 MB')

// 组件挂载时从本地存储加载设置
onMounted(() => {
	loadSettings()
})

// 从本地存储加载设置
const loadSettings = () => {
	try {
		const settings = uni.getStorageSync('userSettings')
		if (settings) {
			if (settings.notifications) {
				Object.assign(notifications, settings.notifications)
			}
			if (settings.privacy) {
				Object.assign(privacy, settings.privacy)
			}
		}
	} catch (e) {
		console.error('加载设置失败:', e)
	}
}

// 保存设置到本地存储
const saveSettings = () => {
	try {
		const settings = {
			notifications: { ...notifications },
			privacy: { ...privacy }
		}
		uni.setStorageSync('userSettings', settings)
	} catch (e) {
		console.error('保存设置失败:', e)
	}
}

// 通知设置变化
const onNewMessageChange = (e: any) => {
	notifications.newMessage = e.detail.value
	saveSettings()
}

const onLikesCommentsChange = (e: any) => {
	notifications.likesComments = e.detail.value
	saveSettings()
}

const onSystemChange = (e: any) => {
	notifications.system = e.detail.value
	saveSettings()
}

const onEmailChange = (e: any) => {
	notifications.email = e.detail.value
	saveSettings()
}

// 隐私设置变化
const onPrivateAccountChange = (e: any) => {
	privacy.privateAccount = e.detail.value
	saveSettings()
}

const onOnlineStatusChange = (e: any) => {
	privacy.showOnlineStatus = e.detail.value
	saveSettings()
}

// 跳转到修改密码页面
const goToChangePassword = () => {
	uni.navigateTo({
		url: '/pages/user/change-password'
	})
}

// 跳转到账号安全
const goToAccountSecurity = () => {
	uni.navigateTo({
		url: '/pages/user/account-security'
	})
}

// 跳转到登录设备管理
const goToLoginDevices = () => {
	uni.navigateTo({
		url: '/pages/user/login-devices'
	})
}

// 跳转到黑名单管理
const goToBlockedUsers = () => {
	uni.navigateTo({
		url: '/pages/user/blocked-users'
	})
}

// 跳转到数据与隐私
const goToDataPrivacy = () => {
	uni.navigateTo({
		url: '/pages/user/data-privacy'
	})
}

// 跳转到语言设置
const goToLanguage = () => {
	uni.navigateTo({
		url: '/pages/user/language'
	})
}

// 跳转到主题设置
const goToTheme = () => {
	uni.navigateTo({
		url: '/pages/user/theme'
	})
}

// 清理缓存
const goToClearCache = () => {
	uni.showModal({
		title: '清理缓存',
		content: '确定要清理缓存吗？这会删除临时文件，但不会影响您的个人数据。',
		success: (res) => {
			if (res.confirm) {
				uni.showLoading({
					title: '清理中...'
				})

				setTimeout(() => {
					uni.hideLoading()
					cacheSize.value = '0 MB'
					uni.showToast({
						title: '缓存清理完成',
						icon: 'success'
					})
				}, 1000)
			}
		}
	})
}

// 跳转到关于我们
const goToAbout = () => {
	uni.navigateTo({
		url: '/pages/user/about'
	})
}

// 退出登录
const logout = () => {
	uni.showModal({
		title: '确认退出',
		content: '确定要退出登录吗？',
		success: (res) => {
			if (res.confirm) {
				// 清除本地存储中的登录信息
				uni.removeStorageSync('loginData')

				// 跳转到登录页面
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		}
	})
}
</script>

<style lang="scss">
.settings-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.settings-header {
		margin-bottom: 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}

	.settings-content {
		.section {
			background-color: #fff;
			border-radius: 20rpx;
			margin-bottom: 30rpx;

			.section-title {
				display: block;
				padding: 30rpx 40rpx 20rpx;
				font-size: 28rpx;
				color: #666;
				font-weight: bold;
			}

			.menu-list {
				.menu-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 40rpx;
					border-top: 1rpx solid #f0f0f0;

					&:first-child {
						border-top: none;
					}

					.menu-text {
						font-size: 30rpx;
						color: #333;
					}

					.menu-right {
						display: flex;
						align-items: center;
						gap: 20rpx;

						.current-language,
						.current-theme {
							font-size: 26rpx;
							color: #999;
						}

						.cache-size {
							font-size: 26rpx;
							color: #999;
						}
					}

					.arrow {
						font-size: 36rpx;
						color: #ccc;
					}
				}

				.switch-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 40rpx;
					border-top: 1rpx solid #f0f0f0;

					&:first-child {
						border-top: none;
					}

					.menu-text {
						font-size: 30rpx;
						color: #333;
					}
				}
			}
		}

		.logout-section {
			margin-top: 40rpx;

			.logout-btn {
				width: 100%;
				height: 80rpx;
				background-color: #fff;
				color: #ff4757;
				border: 2rpx solid #ff4757;
				border-radius: 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
}
</style>