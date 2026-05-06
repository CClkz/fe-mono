<template>
	<view class="my-comments-container">
		<view class="comments-header">
			<text class="title">我的评论</text>
			<view class="stats">
				<text class="stat-item">共 {{ comments.length }} 条</text>
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

		<!-- 评论列表 -->
		<view class="comments-list">
			<view
				v-for="(comment, index) in filteredComments"
				:key="comment.id"
				class="comment-item"
			>
				<view class="comment-header">
					<view class="post-info" @tap="goToPost(comment.postId)">
						<text class="post-title">《{{ comment.postTitle }}》</text>
						<text class="post-author">作者: {{ comment.postAuthor }}</text>
					</view>
					<view class="comment-time">{{ formatDate(comment.createdAt) }}</view>
				</view>

				<view class="comment-content">
					<text class="comment-text">{{ comment.content }}</text>
				</view>

				<view class="comment-actions">
					<view class="action-item" @tap="likeComment(comment, index)">
						<text class="action-icon">❤️</text>
						<text class="action-count">{{ comment.likes }}</text>
					</view>
					<view class="action-item" @tap="replyComment(comment)">
						<text class="action-icon">💬</text>
						<text class="action-count">回复</text>
					</view>
					<view class="action-item" @tap="editComment(comment, index)">
						<text class="action-icon">✏️</text>
						<text class="action-count">编辑</text>
					</view>
					<view class="action-item" @tap="deleteComment(comment, index)">
						<text class="action-icon">🗑️</text>
						<text class="action-count">删除</text>
					</view>
				</view>

				<!-- 回复列表 -->
				<view v-if="comment.replies && comment.replies.length > 0" class="replies-list">
					<view
						v-for="reply in comment.replies"
						:key="reply.id"
						class="reply-item"
					>
						<view class="reply-header">
							<text class="reply-author">{{ reply.author }}</text>
							<text class="reply-time">{{ formatDate(reply.createdAt) }}</text>
						</view>
						<view class="reply-content">
							<text class="reply-text">{{ reply.content }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-if="filteredComments.length === 0" class="empty-state">
				<image
					class="empty-icon"
					src="/static/images/empty-comments.png"
					mode="aspectFit"
				></image>
				<text class="empty-text">还没有发表过评论</text>
				<text class="empty-subtext">去文章下面留下你的见解吧</text>
				<button class="explore-btn" @click="goToBlog">去逛逛博客</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 选项卡
const tabs = [
	{ id: 'all', label: '全部' },
	{ id: 'recent', label: '最近' },
	{ id: 'popular', label: '热门' },
	{ id: 'replied', label: '有回复' }
]

const activeTab = ref('all')

// 排序选项
const sortOptions = ['最新评论', '最多点赞', '最早评论']
const sortIndex = ref(1)

// 评论数据
const comments = reactive([
	{
		id: 1,
		postId: 1,
		postTitle: '如何快速入门 Vue 3',
		postAuthor: '技术大神',
		content: '这篇文章对 Vue 3 的讲解非常详细，尤其是 Composition API 的部分，让我对响应式系统有了更深的理解。感谢作者的分享！',
		createdAt: '2026-03-14 14:30:00',
		updatedAt: '2026-03-14 14:30:00',
		likes: 15,
		isLiked: false,
		replies: [
			{
				id: 1,
				author: '文章作者',
				content: '谢谢你的肯定！很高兴对你有帮助。',
				createdAt: '2026-03-14 15:00:00'
			}
		]
	},
	{
		id: 2,
		postId: 2,
		postTitle: 'UniApp 跨平台开发实践',
		postAuthor: '前端开发者',
		content: '我们公司也在用 UniApp 开发跨平台应用，确实大大提高了开发效率。不过有些原生功能还是需要自己写插件扩展。',
		createdAt: '2026-03-13 16:20:00',
		updatedAt: '2026-03-13 16:20:00',
		likes: 8,
		isLiked: true,
		replies: []
	},
	{
		id: 3,
		postId: 3,
		postTitle: 'TypeScript 类型系统详解',
		postAuthor: 'TypeScript专家',
		content: '请问文章中提到的条件类型在实际项目中有哪些应用场景？感觉这个概念比较抽象。',
		createdAt: '2026-03-12 11:15:00',
		updatedAt: '2026-03-12 11:15:00',
		likes: 3,
		isLiked: false,
		replies: [
			{
				id: 2,
				author: '文章作者',
				content: '条件类型通常用在泛型工具类型中，比如 ReturnType、Parameters 等。在构建复杂类型系统时很有用。',
				createdAt: '2026-03-12 14:30:00'
			},
			{
				id: 3,
				author: '热心网友',
				content: '我们项目中用条件类型来做类型守卫，根据不同的参数类型返回不同的类型，可以大大减少类型断言。',
				createdAt: '2026-03-12 16:45:00'
			}
		]
	},
	{
		id: 4,
		postId: 4,
		postTitle: '前端性能优化技巧',
		postAuthor: '性能优化专家',
		content: '文中提到的懒加载和代码分割确实很实用，不过在实际项目中还需要考虑缓存策略和请求合并。',
		createdAt: '2026-03-10 20:40:00',
		updatedAt: '2026-03-10 20:40:00',
		likes: 22,
		isLiked: false,
		replies: []
	},
	{
		id: 5,
		postId: 5,
		postTitle: '小程序登录流程设计',
		postAuthor: '小程序架构师',
		content: '我们项目中也实现了类似的登录流程，但还加了 token 刷新机制和防重放攻击。建议作者可以补充这部分内容。',
		createdAt: '2026-03-09 13:25:00',
		updatedAt: '2026-03-09 13:25:00',
		likes: 12,
		isLiked: true,
		replies: [
			{
				id: 4,
				author: '文章作者',
				content: '很好的建议！token 刷新和防重放确实是登录安全的重要环节，我会在后续文章中进行补充。',
				createdAt: '2026-03-09 18:00:00'
			}
		]
	}
])

// 计算属性：筛选后的评论
const filteredComments = computed(() => {
	let filtered = [...comments]

	// 按选项卡筛选
	switch (activeTab.value) {
		case 'recent':
			// 最近一周的评论
			const oneWeekAgo = new Date()
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
			filtered = filtered.filter(comment => new Date(comment.createdAt) > oneWeekAgo)
			break
		case 'popular':
			// 点赞数超过10的评论
			filtered = filtered.filter(comment => comment.likes >= 10)
			break
		case 'replied':
			// 有回复的评论
			filtered = filtered.filter(comment => comment.replies && comment.replies.length > 0)
			break
	}

	// 按排序选项排序
	switch (sortIndex.value) {
		case 0: // 最新评论
			filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			break
		case 1: // 最多点赞
			filtered.sort((a, b) => b.likes - a.likes)
			break
		case 2: // 最早评论
			filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
			break
	}

	return filtered
})

// 组件挂载时从本地存储加载数据
onMounted(() => {
	loadCommentsFromStorage()
})

// 从本地存储加载评论
const loadCommentsFromStorage = () => {
	try {
		const savedComments = uni.getStorageSync('userComments')
		if (savedComments && Array.isArray(savedComments)) {
			comments.splice(0, comments.length, ...savedComments)
		}
	} catch (e) {
		console.error('加载评论失败:', e)
	}
}

// 保存评论到本地存储
const saveCommentsToStorage = () => {
	try {
		uni.setStorageSync('userComments', comments)
	} catch (e) {
		console.error('保存评论失败:', e)
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
	const diffMinutes = Math.floor(diffTime / (1000 * 60))
	const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	if (diffMinutes < 60) {
		return `${diffMinutes}分钟前`
	} else if (diffHours < 24) {
		return `${diffHours}小时前`
	} else if (diffDays === 1) {
		return '昨天'
	} else if (diffDays < 7) {
		return `${diffDays}天前`
	} else {
		return date.toISOString().split('T')[0].replace(/-/g, '/')
	}
}

// 点赞评论
const likeComment = (comment: any, index: number) => {
	if (comment.isLiked) {
		comment.likes--
		comment.isLiked = false
	} else {
		comment.likes++
		comment.isLiked = true
	}
	saveCommentsToStorage()
}

// 回复评论
const replyComment = (comment: any) => {
	uni.showModal({
		title: `回复评论`,
		content: '请输入回复内容:',
		editable: true,
		placeholderText: '输入回复内容...',
		success: (res) => {
			if (res.confirm && res.content) {
				const newReply = {
					id: Date.now(),
					author: '当前用户',
					content: res.content,
					createdAt: new Date().toISOString()
				}

				if (!comment.replies) {
					comment.replies = []
				}
				comment.replies.push(newReply)
				saveCommentsToStorage()

				uni.showToast({
					title: '回复成功',
					icon: 'success'
				})
			}
		}
	})
}

// 编辑评论
const editComment = (comment: any, index: number) => {
	uni.showModal({
		title: `编辑评论`,
		content: '编辑评论内容:',
		editable: true,
		placeholderText: '输入新的评论内容...',
		showCancel: true,
		confirmText: '保存',
		cancelText: '取消',
		success: (res) => {
			if (res.confirm && res.content) {
				comment.content = res.content
				comment.updatedAt = new Date().toISOString()
				saveCommentsToStorage()

				uni.showToast({
					title: '编辑成功',
					icon: 'success'
				})
			}
		}
	})
}

// 删除评论
const deleteComment = (comment: any, index: number) => {
	uni.showModal({
		title: '确认删除',
		content: `确定要删除这条评论吗？删除后无法恢复。`,
		success: (res) => {
			if (res.confirm) {
				comments.splice(index, 1)
				saveCommentsToStorage()

				uni.showToast({
					title: '删除成功',
					icon: 'success'
				})
			}
		}
	})
}

// 跳转到文章
const goToPost = (postId: number) => {
	uni.navigateTo({
		url: `/pages/blog/detail?id=${postId}`
	})
}

// 去博客页面
const goToBlog = () => {
	uni.switchTab({
		url: '/pages/blog/blog'
	})
}
</script>

<style lang="scss">
.my-comments-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.comments-header {
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

	.comments-list {
		.comment-item {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.comment-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 20rpx;

				.post-info {
					flex: 1;

					.post-title {
						font-size: 28rpx;
						font-weight: bold;
						color: #007aff;
						display: block;
						margin-bottom: 8rpx;
					}

					.post-author {
						font-size: 24rpx;
						color: #999;
					}
				}

				.comment-time {
					font-size: 24rpx;
					color: #999;
				}
			}

			.comment-content {
				margin-bottom: 20rpx;

				.comment-text {
					font-size: 28rpx;
					color: #333;
					line-height: 1.6;
				}
			}

			.comment-actions {
				display: flex;
				justify-content: flex-end;
				gap: 30rpx;

				.action-item {
					display: flex;
					align-items: center;
					gap: 8rpx;

					.action-icon {
						font-size: 28rpx;
					}

					.action-count {
						font-size: 24rpx;
						color: #666;
					}
				}
			}

			.replies-list {
				margin-top: 30rpx;
				padding-top: 20rpx;
				border-top: 1rpx solid #f0f0f0;

				.reply-item {
					background-color: #f8f9fa;
					border-radius: 10rpx;
					padding: 20rpx;
					margin-bottom: 15rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.reply-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;

						.reply-author {
							font-size: 26rpx;
							color: #666;
							font-weight: bold;
						}

						.reply-time {
							font-size: 22rpx;
							color: #999;
						}
					}

					.reply-content {
						.reply-text {
							font-size: 26rpx;
							color: #333;
							line-height: 1.5;
						}
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
				font-size: 32rpx;
				color: #999;
				display: block;
				margin-bottom: 15rpx;
			}

			.empty-subtext {
				font-size: 26rpx;
				color: #ccc;
				display: block;
				margin-bottom: 40rpx;
			}

			.explore-btn {
				background: linear-gradient(to right, #667eea, #764ba2);
				color: #fff;
				border-radius: 10rpx;
				font-size: 28rpx;
				padding: 20rpx 60rpx;
				border: none;
			}
		}
	}
}
</style>