<template>
	<view class="my-blog-container">
		<view class="blog-header">
			<text class="title">我的博客</text>
			<view class="header-actions">
				<button class="stats-btn" @click="showStats">
					<text class="stats-icon">📊</text>
					<text class="stats-text">数据</text>
				</button>
			</view>
		</view>

		<!-- 博客概览 -->
		<view class="overview-section">
			<view class="overview-grid">
				<view class="overview-item">
					<text class="overview-number">{{ stats.totalPosts }}</text>
					<text class="overview-label">文章总数</text>
				</view>
				<view class="overview-item">
					<text class="overview-number">{{ stats.totalViews }}</text>
					<text class="overview-label">总阅读量</text>
				</view>
				<view class="overview-item">
					<text class="overview-number">{{ stats.totalLikes }}</text>
					<text class="overview-label">总点赞数</text>
				</view>
				<view class="overview-item">
					<text class="overview-number">{{ stats.totalComments }}</text>
					<text class="overview-label">总评论数</text>
				</view>
			</view>
		</view>

		<!-- 文章管理 -->
		<view class="management-section">
			<text class="section-title">文章管理</text>
			<view class="management-actions">
				<button class="action-btn publish-btn" @click="createNewArticle">
					<text class="btn-icon">✏️</text>
					<text class="btn-text">写文章</text>
				</button>
				<button class="action-btn draft-btn" @click="goToDrafts">
					<text class="btn-icon">📝</text>
					<text class="btn-text">草稿箱</text>
				</button>
				<button class="action-btn category-btn" @click="manageCategories">
					<text class="btn-icon">📂</text>
					<text class="btn-text">分类管理</text>
				</button>
				<button class="action-btn setting-btn" @click="goToBlogSettings">
					<text class="btn-icon">⚙️</text>
					<text class="btn-text">博客设置</text>
				</button>
			</view>
		</view>

		<!-- 最近文章 -->
		<view class="recent-section">
			<view class="section-header">
				<text class="section-title">最近文章</text>
				<navigator url="/pages/user/my-posts" class="view-all">
					<text>查看全部</text>
					<text class="arrow">›</text>
				</navigator>
			</view>

			<view class="articles-list">
				<view
					v-for="article in recentArticles"
					:key="article.id"
					class="article-item"
					@tap="editArticle(article)"
				>
					<view class="article-content">
						<text class="article-title">{{ article.title }}</text>
						<text class="article-excerpt">{{ article.excerpt || article.content.slice(0, 60) }}...</text>

						<view class="article-meta">
							<text class="meta-item">{{ formatDate(article.publishedAt) }}</text>
							<text class="meta-separator">·</text>
							<text class="meta-item">浏览: {{ article.views }}</text>
							<text class="meta-separator">·</text>
							<text class="meta-item">点赞: {{ article.likes }}</text>
							<text class="meta-separator">·</text>
							<text class="meta-item">评论: {{ article.comments }}</text>
						</view>

						<view class="article-tags">
							<text
								v-for="tag in article.tags.slice(0, 3)"
								:key="tag"
								class="tag"
							>
								#{{ tag }}
							</text>
							<text v-if="article.tags.length > 3" class="tag-more">...</text>
						</view>
					</view>

					<view class="article-status">
						<text class="status-badge" :class="article.status">{{ getStatusText(article.status) }}</text>
					</view>
				</view>

				<!-- 空状态 -->
				<view v-if="recentArticles.length === 0" class="empty-articles">
					<image
						class="empty-icon"
						src="/static/images/empty-articles.png"
						mode="aspectFit"
					></image>
					<text class="empty-text">还没有发布过文章</text>
					<text class="empty-subtext">开始你的创作之旅吧</text>
					<button class="create-first-btn" @click="createNewArticle">发布第一篇</button>
				</view>
			</view>
		</view>

		<!-- 访客统计 -->
		<view class="visitor-section">
			<view class="section-header">
				<text class="section-title">访客统计</text>
				<text class="time-range">最近7天</text>
			</view>

			<view class="visitor-stats">
				<view class="stat-row">
					<text class="stat-label">昨日访客</text>
					<text class="stat-value">{{ visitorStats.yesterday }}</text>
				</view>
				<view class="stat-row">
					<text class="stat-label">今日访客</text>
					<text class="stat-value">{{ visitorStats.today }}</text>
				</view>
				<view class="stat-row">
					<text class="stat-label">累计访客</text>
					<text class="stat-value">{{ visitorStats.total }}</text>
				</view>
				<view class="stat-row">
					<text class="stat-label">平均停留</text>
					<text class="stat-value">{{ visitorStats.avgStayTime }}分钟</text>
				</view>
			</view>

			<view class="visitor-chart-placeholder">
				<text class="chart-note">📈 访客趋势图表</text>
				<text class="chart-hint">(此处显示最近7天访客变化趋势)</text>
			</view>
		</view>

		<!-- 快捷操作 -->
		<view class="quick-actions">
			<text class="section-title">快捷操作</text>
			<view class="quick-buttons">
				<button class="quick-btn" @click="checkComments">
					<text class="quick-icon">💬</text>
					<text class="quick-text">查看评论</text>
				</button>
				<button class="quick-btn" @click="checkMessages">
					<text class="quick-icon">📨</text>
					<text class="quick-text">站内信</text>
				</button>
				<button class="quick-btn" @click="analyticsReport">
					<text class="quick-icon">📊</text>
					<text class="quick-text">分析报告</text>
				</button>
				<button class="quick-btn" @click="seoOptimization">
					<text class="quick-icon">🔍</text>
					<text class="quick-text">SEO优化</text>
				</button>
			</view>
		</view>

		<!-- 新建文章按钮 -->
		<view class="floating-button">
			<button class="create-article-btn" @click="createNewArticle">
				<text class="btn-text">+</text>
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 博客统计数据
const stats = reactive({
	totalPosts: 8,
	totalViews: 12500,
	totalLikes: 856,
	totalComments: 234
})

// 最近文章
const recentArticles = reactive([
	{
		id: 1,
		title: 'Vue 3 Composition API 深度解析',
		excerpt: '深入探讨 Vue 3 Composition API 的设计理念、使用方法和最佳实践...',
		content: 'Vue 3 Composition API 是 Vue 3 最重要的新特性之一...',
		publishedAt: '2026-03-14 10:30:00',
		views: 1250,
		likes: 86,
		comments: 24,
		status: 'published',
		tags: ['Vue', 'Composition API', '教程']
	},
	{
		id: 2,
		title: 'UniApp 性能优化实战',
		excerpt: '分享我们在 UniApp 项目中遇到的性能问题和解决方案...',
		content: 'UniApp 作为一个跨平台框架，在性能方面需要注意...',
		publishedAt: '2026-03-13 15:20:00',
		views: 890,
		likes: 45,
		comments: 12,
		status: 'published',
		tags: ['UniApp', '性能优化', '实战']
	},
	{
		id: 3,
		title: 'TypeScript 类型体操入门',
		excerpt: 'TypeScript 类型系统的高级用法，让你的代码更加类型安全...',
		content: 'TypeScript 的类型系统非常强大，可以进行复杂的...',
		publishedAt: '2026-03-12 09:15:00',
		views: 0,
		likes: 0,
		comments: 0,
		status: 'draft',
		tags: ['TypeScript', '类型系统', '高级']
	}
])

// 访客统计
const visitorStats = reactive({
	yesterday: 128,
	today: 65,
	total: 12500,
	avgStayTime: 3.5
})

// 组件挂载时从本地存储加载数据
onMounted(() => {
	loadBlogData()
})

// 加载博客数据
const loadBlogData = () => {
	try {
		const blogData = uni.getStorageSync('userBlogData')
		if (blogData) {
			if (blogData.stats) {
				Object.assign(stats, blogData.stats)
			}
			if (blogData.recentArticles) {
				recentArticles.splice(0, recentArticles.length, ...blogData.recentArticles)
			}
		}
	} catch (e) {
		console.error('加载博客数据失败:', e)
	}
}

// 保存博客数据
const saveBlogData = () => {
	try {
		const blogData = {
			stats: { ...stats },
			recentArticles: [...recentArticles]
		}
		uni.setStorageSync('userBlogData', blogData)
	} catch (e) {
		console.error('保存博客数据失败:', e)
	}
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

// 显示统计数据
const showStats = () => {
	uni.navigateTo({
		url: '/pages/user/blog-stats'
	})
}

// 创建新文章
const createNewArticle = () => {
	uni.navigateTo({
		url: '/pages/user/create-article'
	})
}

// 前往草稿箱
const goToDrafts = () => {
	uni.navigateTo({
		url: '/pages/user/drafts'
	})
}

// 管理分类
const manageCategories = () => {
	uni.navigateTo({
		url: '/pages/user/categories'
	})
}

// 博客设置
const goToBlogSettings = () => {
	uni.navigateTo({
		url: '/pages/user/blog-settings'
	})
}

// 编辑文章
const editArticle = (article: any) => {
	uni.navigateTo({
		url: `/pages/user/edit-article?id=${article.id}`
	})
}

// 查看评论
const checkComments = () => {
	uni.navigateTo({
		url: '/pages/user/my-comments'
	})
}

// 查看站内信
const checkMessages = () => {
	uni.navigateTo({
		url: '/pages/user/messages'
	})
}

// 分析报告
const analyticsReport = () => {
	uni.navigateTo({
		url: '/pages/user/analytics'
	})
}

// SEO优化
const seoOptimization = () => {
	uni.navigateTo({
		url: '/pages/user/seo'
	})
}
</script>

<style lang="scss">
.my-blog-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.blog-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}

		.header-actions {
			.stats-btn {
				background-color: #f0f0f0;
				color: #333;
				border: none;
				border-radius: 8rpx;
				padding: 12rpx 24rpx;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				gap: 8rpx;

				.stats-icon {
					font-size: 28rpx;
				}
			}
		}
	}

	.overview-section {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 30rpx;

		.overview-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 30rpx;

			.overview-item {
				text-align: center;

				.overview-number {
					font-size: 48rpx;
					font-weight: bold;
					color: #007aff;
					display: block;
					margin-bottom: 10rpx;
				}

				.overview-label {
					font-size: 24rpx;
					color: #666;
				}
			}
		}
	}

	.management-section {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 30rpx;

		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			display: block;
			margin-bottom: 30rpx;
		}

		.management-actions {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;

			.action-btn {
				background-color: #f8f9fa;
				border: 2rpx solid #f0f0f0;
				border-radius: 10rpx;
				padding: 30rpx 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 15rpx;

				&.publish-btn {
					background-color: #e6f7ff;
					border-color: #91d5ff;
				}

				&.draft-btn {
					background-color: #f6ffed;
					border-color: #b7eb8f;
				}

				&.category-btn {
					background-color: #fff7e6;
					border-color: #ffd591;
				}

				&.setting-btn {
					background-color: #f9f0ff;
					border-color: #d3adf7;
				}

				.btn-icon {
					font-size: 48rpx;
				}

				.btn-text {
					font-size: 24rpx;
					color: #333;
					font-weight: bold;
				}
			}
		}
	}

	.recent-section {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 30rpx;

		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.section-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}

			.view-all {
				display: flex;
				align-items: center;
				gap: 8rpx;

				text {
					font-size: 26rpx;
					color: #007aff;
				}

				.arrow {
					font-size: 32rpx;
					color: #007aff;
				}
			}
		}

		.articles-list {
			.article-item {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #f0f0f0;

				&:last-child {
					border-bottom: none;
				}

				.article-content {
					flex: 1;

					.article-title {
						font-size: 32rpx;
						font-weight: bold;
						color: #333;
						display: block;
						margin-bottom: 15rpx;
						line-height: 1.4;
					}

					.article-excerpt {
						font-size: 28rpx;
						color: #666;
						line-height: 1.6;
						display: block;
						margin-bottom: 15rpx;
					}

					.article-meta {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						margin-bottom: 15rpx;

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

					.article-tags {
						display: flex;
						flex-wrap: wrap;
						gap: 15rpx;

						.tag {
							font-size: 22rpx;
							color: #007aff;
							background-color: #e6f7ff;
							padding: 4rpx 12rpx;
							border-radius: 6rpx;
						}

						.tag-more {
							font-size: 22rpx;
							color: #999;
						}
					}
				}

				.article-status {
					margin-left: 30rpx;

					.status-badge {
						display: inline-block;
						padding: 6rpx 16rpx;
						border-radius: 8rpx;
						font-size: 22rpx;
						font-weight: bold;

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

			.empty-articles {
				text-align: center;
				padding: 60rpx 40rpx;

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

				.create-first-btn {
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

	.visitor-section {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 30rpx;

		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.section-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}

			.time-range {
				font-size: 24rpx;
				color: #999;
			}
		}

		.visitor-stats {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 30rpx;
			margin-bottom: 40rpx;

			.stat-row {
				text-align: center;

				.stat-label {
					font-size: 24rpx;
					color: #666;
					display: block;
					margin-bottom: 10rpx;
				}

				.stat-value {
					font-size: 36rpx;
					font-weight: bold;
					color: #007aff;
					display: block;
				}
			}
		}

		.visitor-chart-placeholder {
			background-color: #f8f9fa;
			border-radius: 10rpx;
			padding: 60rpx 40rpx;
			text-align: center;

			.chart-note {
				font-size: 28rpx;
				color: #007aff;
				display: block;
				margin-bottom: 15rpx;
			}

			.chart-hint {
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.quick-actions {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 120rpx;

		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			display: block;
			margin-bottom: 30rpx;
		}

		.quick-buttons {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;

			.quick-btn {
				background-color: #f8f9fa;
				border: 2rpx solid #f0f0f0;
				border-radius: 10rpx;
				padding: 30rpx 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 15rpx;

				.quick-icon {
					font-size: 48rpx;
				}

				.quick-text {
					font-size: 24rpx;
					color: #333;
					font-weight: bold;
				}
			}
		}
	}

	.floating-button {
		position: fixed;
		right: 40rpx;
		bottom: 80rpx;

		.create-article-btn {
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