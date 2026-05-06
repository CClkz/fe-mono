<template>
	<view class="my-posts-container">
		<view class="posts-header">
			<text class="title">我的帖子</text>
			<view class="stats">
				<text class="stat-item">共 {{ posts.length }} 篇</text>
			</view>
		</view>

		<!-- 筛选和排序 -->
		<view class="filter-section">
			<view class="filter-tabs">
				<view
					v-for="tab in tabs"
					:key="tab.id"
					class="tab"
					:class="{ active: activeTab === tab.id }"
					@tap="switchTab(tab.id)"
				>
					<text class="tab-text">{{ tab.label }}</text>
				</view>
			</view>

			<view class="sort-options">
				<picker
					:value="sortIndex"
					:range="sortOptions"
					@change="onSortChange"
				>
					<view class="sort-picker">
						<text class="sort-text">排序: {{ sortOptions[sortIndex] }}</text>
						<text class="arrow">▼</text>
					</view>
				</picker>
			</view>
		</view>

		<!-- 帖子列表 -->
		<view class="posts-list">
			<view
				v-for="(post, index) in filteredPosts"
				:key="post.id"
				class="post-item"
				@tap="viewPostDetail(post)"
			>
				<view class="post-content">
					<text class="post-title">{{ post.title }}</text>
					<text class="post-excerpt">{{ post.content.slice(0, 60) }}...</text>

					<view class="post-meta">
						<text class="meta-item">{{ formatDate(post.createdAt) }}</text>
						<text class="meta-separator">·</text>
						<text class="meta-item">浏览: {{ post.views }}</text>
						<text class="meta-separator">·</text>
						<text class="meta-item">点赞: {{ post.likes }}</text>
						<text class="meta-separator">·</text>
						<text class="meta-item">评论: {{ post.comments }}</text>
					</view>

					<view class="post-status">
						<text class="status-badge" :class="post.status">{{ getStatusText(post.status) }}</text>
					</view>
				</view>

				<view class="post-actions">
					<button
						class="action-btn edit-btn"
						@tap.stop="editPost(post)"
					>
						编辑
					</button>
					<button
						class="action-btn delete-btn"
						@tap.stop="deletePost(post, index)"
					>
						删除
					</button>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-if="filteredPosts.length === 0" class="empty-state">
				<image
					class="empty-icon"
					src="/static/images/empty-posts.png"
					mode="aspectFit"
				></image>
				<text class="empty-text">还没有发布过帖子</text>
				<button class="create-btn" @click="createNewPost">去发布第一篇</button>
			</view>
		</view>

		<!-- 新建帖子按钮 -->
		<view class="floating-button">
			<button class="create-post-btn" @click="createNewPost">
				<text class="btn-text">+</text>
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 选项卡
const tabs = [
	{ id: 'all', label: '全部' },
	{ id: 'published', label: '已发布' },
	{ id: 'draft', label: '草稿' },
	{ id: 'pending', label: '待审核' }
]

const activeTab = ref('all')

// 排序选项
const sortOptions = ['最新发布', '最多浏览', '最多点赞', '最多评论']
const sortIndex = ref(0)

// 帖子数据
const posts = reactive([
	{
		id: 1,
		title: '如何快速入门 Vue 3',
		content: 'Vue 3 是 Vue.js 的最新版本，带来了许多新特性和改进...',
		createdAt: '2026-03-14 10:30:00',
		updatedAt: '2026-03-14 10:30:00',
		views: 1250,
		likes: 86,
		comments: 24,
		status: 'published',
		tags: ['Vue', '前端', '教程']
	},
	{
		id: 2,
		title: 'UniApp 跨平台开发实践',
		content: 'UniApp 是一个使用 Vue.js 开发所有前端应用的框架...',
		createdAt: '2026-03-13 15:20:00',
		updatedAt: '2026-03-13 15:20:00',
		views: 890,
		likes: 45,
		comments: 12,
		status: 'published',
		tags: ['UniApp', '跨平台', '小程序']
	},
	{
		id: 3,
		title: 'TypeScript 类型系统详解',
		content: 'TypeScript 的类型系统非常强大，可以帮助我们在开发过程中...',
		createdAt: '2026-03-12 09:15:00',
		updatedAt: '2026-03-12 09:15:00',
		views: 0,
		likes: 0,
		comments: 0,
		status: 'draft',
		tags: ['TypeScript', '类型系统']
	},
	{
		id: 4,
		title: '前端性能优化技巧',
		content: '性能优化是前端开发中非常重要的一部分...',
		createdAt: '2026-03-10 14:40:00',
		updatedAt: '2026-03-10 14:40:00',
		views: 2100,
		likes: 120,
		comments: 36,
		status: 'published',
		tags: ['性能优化', '前端']
	},
	{
		id: 5,
		title: '小程序登录流程设计',
		content: '小程序登录流程需要考虑用户认证、权限控制等多个方面...',
		createdAt: '2026-03-09 11:25:00',
		updatedAt: '2026-03-09 11:25:00',
		views: 0,
		likes: 0,
		comments: 0,
		status: 'pending',
		tags: ['小程序', '登录', '认证']
	}
])

// 计算属性：筛选后的帖子
const filteredPosts = computed(() => {
	let filtered = [...posts]

	// 按选项卡筛选
	if (activeTab.value !== 'all') {
		filtered = filtered.filter(post => post.status === activeTab.value)
	}

	// 按排序选项排序
	switch (sortIndex.value) {
		case 0: // 最新发布
			filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			break
		case 1: // 最多浏览
			filtered.sort((a, b) => b.views - a.views)
			break
		case 2: // 最多点赞
			filtered.sort((a, b) => b.likes - a.likes)
			break
		case 3: // 最多评论
			filtered.sort((a, b) => b.comments - a.comments)
			break
	}

	return filtered
})

// 组件挂载时从本地存储加载数据
onMounted(() => {
	loadPostsFromStorage()
})

// 从本地存储加载帖子
const loadPostsFromStorage = () => {
	try {
		const savedPosts = uni.getStorageSync('userPosts')
		if (savedPosts && Array.isArray(savedPosts)) {
			posts.splice(0, posts.length, ...savedPosts)
		}
	} catch (e) {
		console.error('加载帖子失败:', e)
	}
}

// 保存帖子到本地存储
const savePostsToStorage = () => {
	try {
		uni.setStorageSync('userPosts', posts)
	} catch (e) {
		console.error('保存帖子失败:', e)
	}
}

// 切换选项卡
const switchTab = (tabId: string) => {
	activeTab.value = tabId
}

// 排序变化
const onSortChange = (e: any) => {
	sortIndex.value = e.detail.value
}

// 格式化日期
const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	const now = new Date()
	const diffTime = now.getTime() - date.getTime()
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	if (diffDays === 0) {
		return '今天'
	} else if (diffDays === 1) {
		return '昨天'
	} else if (diffDays < 7) {
		return `${diffDays}天前`
	} else {
		return date.toISOString().split('T')[0].replace(/-/g, '/')
	}
}

// 获取状态文本
const getStatusText = (status: string) => {
	const statusMap: Record<string, string> = {
		published: '已发布',
		draft: '草稿',
		pending: '待审核',
		deleted: '已删除'
	}
	return statusMap[status] || '未知'
}

// 查看帖子详情
const viewPostDetail = (post: any) => {
	uni.navigateTo({
		url: `/pages/blog/detail?id=${post.id}`
	})
}

// 编辑帖子
const editPost = (post: any) => {
	uni.navigateTo({
		url: `/pages/user/edit-post?id=${post.id}`
	})
}

// 删除帖子
const deletePost = (post: any, index: number) => {
	uni.showModal({
		title: '确认删除',
		content: `确定要删除帖子《${post.title}》吗？删除后无法恢复。`,
		success: (res) => {
			if (res.confirm) {
				// 从数组中移除
				posts.splice(index, 1)
				savePostsToStorage()

				uni.showToast({
					title: '删除成功',
					icon: 'success'
				})
			}
		}
	})
}

// 创建新帖子
const createNewPost = () => {
	uni.navigateTo({
		url: '/pages/user/create-post'
	})
}
</script>

<style lang="scss">
.my-posts-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.posts-header {
		margin-bottom: 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			display: block;
			margin-bottom: 10rpx;
		}

		.stats {
			.stat-item {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.filter-section {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;

		.filter-tabs {
			display: flex;
			margin-bottom: 30rpx;

			.tab {
				flex: 1;
				text-align: center;
				padding: 20rpx 0;
				border-bottom: 4rpx solid transparent;

				&.active {
					border-bottom-color: #007aff;

					.tab-text {
						color: #007aff;
						font-weight: bold;
					}
				}

				.tab-text {
					font-size: 28rpx;
					color: #666;
				}
			}
		}

		.sort-options {
			.sort-picker {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.sort-text {
					font-size: 26rpx;
					color: #007aff;
					margin-right: 10rpx;
				}

				.arrow {
					font-size: 20rpx;
					color: #999;
				}
			}
		}
	}

	.posts-list {
		.post-item {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.post-content {
				margin-bottom: 20rpx;

				.post-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 15rpx;
				}

				.post-excerpt {
					font-size: 28rpx;
					color: #666;
					line-height: 1.5;
					display: block;
					margin-bottom: 15rpx;
				}

				.post-meta {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: 10rpx;

					.meta-item {
						font-size: 24rpx;
						color: #999;
					}

					.meta-separator {
						font-size: 24rpx;
						color: #999;
						margin: 0 10rpx;
					}
				}

				.post-status {
					.status-badge {
						display: inline-block;
						padding: 4rpx 12rpx;
						border-radius: 6rpx;
						font-size: 20rpx;

						&.published {
							background-color: #e6f7ff;
							color: #1890ff;
						}

						&.draft {
							background-color: #f6ffed;
							color: #52c41a;
						}

						&.pending {
							background-color: #fff7e6;
							color: #fa8c16;
						}
					}
				}
			}

			.post-actions {
				display: flex;
				justify-content: flex-end;
				gap: 20rpx;

				.action-btn {
					padding: 12rpx 24rpx;
					border-radius: 8rpx;
					font-size: 24rpx;
					border: none;

					&.edit-btn {
						background-color: #f0f0f0;
						color: #333;
					}

					&.delete-btn {
						background-color: #ff4d4f;
						color: #fff;
					}
				}
			}
		}

		.empty-state {
			text-align: center;
			padding: 80rpx 40rpx;

			.empty-icon {
				width: 200rpx;
				height: 200rpx;
				margin-bottom: 30rpx;
			}

			.empty-text {
				font-size: 30rpx;
				color: #999;
				display: block;
				margin-bottom: 40rpx;
			}

			.create-btn {
				background: linear-gradient(to right, #667eea, #764ba2);
				color: #fff;
				border-radius: 10rpx;
				font-size: 28rpx;
				padding: 20rpx 60rpx;
				border: none;
			}
		}
	}

	.floating-button {
		position: fixed;
		right: 40rpx;
		bottom: 80rpx;

		.create-post-btn {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: #fff;
			border: none;
			box-shadow: 0 4rpx 20rpx rgba(102, 126, 234, 0.3);

			.btn-text {
				font-size: 48rpx;
				font-weight: bold;
			}
		}
	}
}
</style>