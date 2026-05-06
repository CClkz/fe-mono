<template>
	<view class="profile-container">
		<view class="profile-header">
			<text class="title">个人资料</text>
		</view>

		<view class="profile-content">
			<!-- 头像区域 -->
			<view class="avatar-section">
				<image
					class="avatar"
					:src="userInfo.avatar || '/static/images/default-avatar.png'"
					@tap="changeAvatar"
				></image>
				<view class="avatar-actions">
					<text class="avatar-tip">点击更换头像</text>
				</view>
			</view>

			<!-- 基本信息表单 -->
			<view class="form-section">
				<view class="form-item">
					<text class="form-label">昵称</text>
					<input
						class="form-input"
						type="text"
						v-model="formData.nickname"
						placeholder="请输入昵称"
						maxlength="20"
					/>
				</view>

				<view class="form-item">
					<text class="form-label">用户名</text>
					<input
						class="form-input"
						type="text"
						v-model="formData.username"
						placeholder="请输入用户名"
						maxlength="20"
						:disabled="true"
					/>
				</view>

				<view class="form-item">
					<text class="form-label">个人简介</text>
					<textarea
						class="form-textarea"
						v-model="formData.bio"
						placeholder="介绍一下自己吧..."
						maxlength="200"
						auto-height
					/>
					<text class="char-count">{{ formData.bio.length }}/200</text>
				</view>

				<view class="form-item">
					<text class="form-label">邮箱</text>
					<input
						class="form-input"
						type="email"
						v-model="formData.email"
						placeholder="请输入邮箱"
					/>
				</view>

				<view class="form-item">
					<text class="form-label">手机号</text>
					<input
						class="form-input"
						type="number"
						v-model="formData.phone"
						placeholder="请输入手机号"
						maxlength="11"
					/>
				</view>

				<view class="form-item">
					<text class="form-label">性别</text>
					<picker
						class="form-picker"
						:value="genderIndex"
						:range="genderOptions"
						@change="onGenderChange"
					>
						<view class="picker-view">
							<text>{{ formData.gender || '请选择' }}</text>
							<text class="picker-arrow">›</text>
						</view>
					</picker>
				</view>

				<view class="form-item">
					<text class="form-label">生日</text>
					<picker
						class="form-picker"
						mode="date"
						:value="formData.birthday"
						start="1900-01-01"
						end="2026-03-15"
						@change="onBirthdayChange"
					>
						<view class="picker-view">
							<text>{{ formData.birthday || '请选择生日' }}</text>
							<text class="picker-arrow">›</text>
						</view>
					</picker>
				</view>
			</view>

			<!-- 保存按钮 -->
			<view class="action-buttons">
				<button
					class="save-btn"
					:class="{ disabled: !isChanged }"
					:disabled="!isChanged"
					@click="saveProfile"
				>
					保存修改
				</button>
				<button class="cancel-btn" @click="goBack">取消</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 模拟用户信息
const userInfo = reactive({
	nickname: '张三',
	username: 'zhangsan',
	avatar: '/static/images/default-avatar.png',
	bio: '我是一个热爱编程的开发者',
	email: 'zhangsan@example.com',
	phone: '13800138000',
	gender: '男',
	birthday: '1990-01-01'
})

// 表单数据
const formData = reactive({
	nickname: '',
	username: '',
	bio: '',
	email: '',
	phone: '',
	gender: '',
	birthday: ''
})

// 性别选项
const genderOptions = ['男', '女', '保密']
const genderIndex = ref(0)

// 计算属性：判断表单是否有变化
const isChanged = computed(() => {
	return JSON.stringify(formData) !== JSON.stringify({
		nickname: userInfo.nickname,
		username: userInfo.username,
		bio: userInfo.bio,
		email: userInfo.email,
		phone: userInfo.phone,
		gender: userInfo.gender,
		birthday: userInfo.birthday
	})
})

// 组件挂载时初始化数据
onMounted(() => {
	// 从本地存储获取用户信息
	try {
		const loginData = uni.getStorageSync('loginData')
		if (loginData && loginData.userInfo) {
			Object.assign(userInfo, loginData.userInfo)
		}
	} catch (e) {
		console.error('获取用户信息失败:', e)
	}

	// 初始化表单数据
	Object.assign(formData, userInfo)
	genderIndex.value = genderOptions.indexOf(userInfo.gender)
})

// 更换头像
const changeAvatar = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			console.log('选择头像:', res.tempFilePaths[0])
			userInfo.avatar = res.tempFilePaths[0]
			formData.avatar = res.tempFilePaths[0]
			saveToLocalStorage()
		}
	})
}

// 性别选择变化
const onGenderChange = (e: any) => {
	const index = e.detail.value
	genderIndex.value = index
	formData.gender = genderOptions[index]
}

// 生日选择变化
const onBirthdayChange = (e: any) => {
	formData.birthday = e.detail.value
}

// 保存到本地存储
const saveToLocalStorage = () => {
	try {
		const loginData = uni.getStorageSync('loginData')
		if (loginData && loginData.token) {
			loginData.userInfo = { ...loginData.userInfo, ...formData, avatar: userInfo.avatar }
			uni.setStorageSync('loginData', loginData)
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
		}
	} catch (e) {
		console.error('保存用户信息失败:', e)
		uni.showToast({
			title: '保存失败',
			icon: 'none'
		})
	}
}

// 保存个人资料
const saveProfile = () => {
	if (!isChanged.value) return

	// 验证表单数据
	if (!formData.nickname.trim()) {
		uni.showToast({
			title: '请输入昵称',
			icon: 'none'
		})
		return
	}

	// 模拟保存到服务器
	uni.showLoading({
		title: '保存中...'
	})

	setTimeout(() => {
		uni.hideLoading()

		// 更新用户信息
		Object.assign(userInfo, formData)
		userInfo.avatar = userInfo.avatar // 保持头像不变

		// 保存到本地存储
		saveToLocalStorage()

		// 跳转回用户中心
		uni.navigateBack()
	}, 1000)
}

// 返回上一页
const goBack = () => {
	uni.navigateBack()
}
</script>

<style lang="scss">
.profile-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.profile-header {
		margin-bottom: 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}

	.profile-content {
		.avatar-section {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 40rpx;
			text-align: center;
			margin-bottom: 30rpx;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				margin-bottom: 20rpx;
			}

			.avatar-actions {
				.avatar-tip {
					font-size: 24rpx;
					color: #007aff;
				}
			}
		}

		.form-section {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 40rpx;
			margin-bottom: 30rpx;

			.form-item {
				margin-bottom: 40rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.form-label {
					font-size: 28rpx;
					color: #333;
					display: block;
					margin-bottom: 15rpx;
				}

				.form-input {
					width: 100%;
					height: 80rpx;
					border: 2rpx solid #e5e5e5;
					border-radius: 10rpx;
					padding: 0 20rpx;
					font-size: 28rpx;
					box-sizing: border-box;

					&:focus {
						border-color: #007aff;
					}

					&:disabled {
						background-color: #f5f5f5;
						color: #999;
					}
				}

				.form-textarea {
					width: 100%;
					min-height: 120rpx;
					border: 2rpx solid #e5e5e5;
					border-radius: 10rpx;
					padding: 20rpx;
					font-size: 28rpx;
					box-sizing: border-box;

					&:focus {
						border-color: #007aff;
					}
				}

				.char-count {
					display: block;
					text-align: right;
					font-size: 24rpx;
					color: #999;
					margin-top: 10rpx;
				}

				.form-picker {
					.picker-view {
						width: 100%;
						height: 80rpx;
						border: 2rpx solid #e5e5e5;
						border-radius: 10rpx;
						padding: 0 20rpx;
						font-size: 28rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-sizing: border-box;

						.picker-arrow {
							font-size: 36rpx;
							color: #ccc;
						}
					}
				}
			}
		}

		.action-buttons {
			display: flex;
			gap: 30rpx;

			.save-btn {
				flex: 1;
				height: 80rpx;
				background: linear-gradient(to right, #667eea, #764ba2);
				color: #fff;
				border: none;
				border-radius: 10rpx;
				font-size: 32rpx;
				font-weight: bold;

				&.disabled {
					background-color: #ccc;
				}
			}

			.cancel-btn {
				flex: 1;
				height: 80rpx;
				background-color: #fff;
				color: #333;
				border: 2rpx solid #e5e5e5;
				border-radius: 10rpx;
				font-size: 32rpx;
			}
		}
	}
}
</style>