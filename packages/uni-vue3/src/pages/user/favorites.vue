<template>
	<view class="favorites-container">
		<view class="favorites-header">
			<text class="title">我的收藏</text>
			<view class="stats">
				<text class="stat-item">共 {{ favorites.length }} 条</text>
			</view>
		</view>

		<!-- 分类筛选 -->
		<view class="category-section">
			<view class="category-tabs">
				<view
					v-for="category in categories"
					:key="category.id"
					class="category-tab"
					:class="{ active: activeCategory === category.id }"
					@tap="switchCategory(category.id)"
				>
					<text class="category-text">{{ category.label }}</text>
					<text class="category-count">{{ getCategoryCount(category.id) }}</text>
				</view>
			</view>
		</view>

		<!-- 收藏列表 -->
		<view class="favorites-list">
			<view
				v-for="(item, index) in filteredFavorites"
				:key="item.id"
				class="favorite-item"
				@tap="viewItem(item)"
			>
				<view class="item-header">
					<view class="item-type">
						<text class="type-badge" :class="item.type">{{ getTypeText(item.type) }}</text>
					</view>
					<view class="item-time">{{ formatDate(item.collectedAt) }}</view>
				</view>

				<view class="item-content">
					<text class="item-title">{{ item.title }}</text>
					<text class="item-excerpt" v-if="item.excerpt">{{ item.excerpt.slice(0, 80) }}...</text>
				</view>

				<view class="item-footer">
					<view class="item-meta">
						<text v-if="item.author" class="meta-item">作者: {{ item.author }}</text>
						<text v-if="item.views" class="meta-separator">·</text>
						<text v-if="item.views" class="meta-item">浏览: {{ item.views }}</text>
						<text v-if="item.likes" class="meta-separator">·</text>
						<text v-if="item.likes" class="meta-item">点赞: {{ item.likes }}</text>
					</view>

					<view class="item-tags" v-if="item.tags && item.tags.length > 0">
						<text
							v-for="tag in item.tags.slice(0, 3)"
							:key="tag"
							class="tag"
						>
							#{{ tag }}
						</text>
						<text v-if="item.tags.length > 3" class="tag-more">...</text>
					</view>
				</view>

				<view class="item-actions">
					<button
						class="action-btn view-btn"
						@tap.stop="viewItem(item)"
					>
						查看
					</button>
					<button
						class="action-btn remove-btn"
						@tap.stop="removeFavorite(item, index)"
					>
						取消收藏
					</button>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-if="filteredFavorites.length === 0" class="empty-state">
				<image
					class="empty-icon"
					src="/static/images/empty-favorites.png"
					mode="aspectFit"
				></image>
				<text class="empty-text">{{ getEmptyText() }}</text>
				<text class="empty-subtext">发现精彩内容，收藏起来慢慢看</text>
				<button class="explore-btn" @click="goToBlog">去发现内容</button>
			</view>
		</view>

		<!-- 批量操作 -->
		<view v-if="favorites.length > 0" class="batch-actions">
			<view class="batch-select" @tap="toggleSelectMode">
				<view class="checkbox" :class="{ checked: isSelectMode }">
					<text v-if="isSelectMode" class="checkmark">✓</text>
				</view>
				<text class="select-text">批量操作</text>
			</view>

			<view v-if="isSelectMode" class="batch-buttons">
				<button
					class="batch-btn"
					:class="{ disabled: selectedCount === 0 }"
					:disabled="selectedCount === 0"
					@click="batchRemove"
				>
					批量删除 ({{ selectedCount }})
				</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 收藏分类
const categories = [
	{ id: 'all', label: '全部' },
	{ id: 'article', label: '文章' },
	{ id: 'post', label: '帖子' },
	{ id: 'video', label: '视频' },
	{ id: 'image', label: '图片' }
]

const activeCategory = ref('all')

// 收藏数据
const favorites = reactive([
	{
		id: 1,
		type: 'article',
		title: 'Vue 3 响应式系统原理解析',
		excerpt: '本文将深入分析 Vue 3 响应式系统的实现原理，包括 Proxy、Reflect、依赖收集等核心概念...',
		author: 'Vue 官方团队',
		url: '/pages/blog/detail?id=1',
		views: 3200,
		likes: 245,
		tags: ['Vue', '响应式', '原理'],
		collectedAt: '2026-03-14 09:30:00'
	},
	{
		id: 2,
		type: 'post',
		title: 'UniApp 跨平台开发的最佳实践',
		excerpt: '分享我们在使用 UniApp 开发跨平台应用时的一些经验和最佳实践，包括性能优化、兼容性处理等...',
		author: '资深开发者',
		url: '/pages/blog/detail?id=2',
		views: 1850,
		likes: 128,
		tags: ['UniApp', '跨平台', '最佳实践'],
		collectedAt: '2026-03-13 16:45:00'
	},
	{
		id: 3,
		type: 'article',
		title: 'TypeScript 高级类型编程技巧',
		excerpt: '掌握 TypeScript 的高级类型编程技巧，可以让我们编写出更加类型安全和易于维护的代码...',
		author: 'TypeScript 专家',
		url: '/pages/blog/detail?id=3',
		views: 4200,
		likes: 312,
		tags: ['TypeScript', '类型编程', '技巧'],
		collectedAt: '2026-03-12 11:20:00'
	},
	{
		id: 4,
		type: 'video',
		title: '前端工程化实战教程',
		excerpt: '从零开始搭建完整的前端工程化体系，包括构建工具、代码规范、自动化测试等...',
		author: '工程化专家',
		url: '/pages/video/detail?id=1',
		views: 8500,
		likes: 589,
		tags: ['前端工程化', '构建', '自动化'],
		collectedAt: '2026-03-11 14:15:00'
	},
	{
		id: 5,
		type: 'image',
		title: '精美前端设计素材合集',
		excerpt: '收集整理了一系列高质量的前端设计素材，包括 UI 组件、图标、配色方案等...',
		author: '设计师',
		url: '/pages/gallery/detail?id=1',
		views: 2300,
		likes: 167,
		tags: ['设计素材', 'UI', '资源'],
		collectedAt: '2026-03-10 20:30:00'
	},
	{
		id: 6,
		type: 'article',
		title: 'Webpack 5 配置完全指南',
		excerpt: '全面介绍 Webpack 5 的配置方法和最佳实践，帮助开发者更好地理解和掌握这个强大的构建工具...',
		author: '构建工具专家',
		url: '/pages/blog/detail?id=4',
		views: 5600,
		likes: 398,
		tags: ['Webpack', '构建工具', '配置'],
		collectedAt: '2026-03-09 10:05:00'
	}
])

// 选择模式
const isSelectMode = ref(false)
const selectedItems = ref<number[]>([])

// 计算属性
const selectedCount = computed(() => selectedItems.value.length)

// 计算属性：筛选后的收藏
const filteredFavorites = computed(() => {
	if (activeCategory.value === 'all') {
		return favorites
	}
	return favorites.filter(item => item.type === activeCategory.value)
})

// 获取分类数量
const getCategoryCount = (categoryId: string) => {
	if (categoryId === 'all') {
		return favorites.length
	}
	return favorites.filter(item => item.type === categoryId).length
}

// 获取类型文本
const getTypeText = (type: string) => {
	const typeMap: Record<string, string> = {
		article: '文章',
		post: '帖子',
		video: '视频',
		image: '图片'
	}
	return typeMap[type] || '未知'
}

// 组件挂载时从本地存储加载数据
onMounted(() => {
	loadFavoritesFromStorage()
})

// 从本地存储加载收藏
const loadFavoritesFromStorage = () => {
	try {
		const savedFavorites = uni.getStorageSync('userFavorites')
		if (savedFavorites && Array.isArray(savedFavorites)) {
			favorites.splice(0, favorites.length, ...savedFavorites)
		}
	} catch (e) {
		console.error('加载收藏失败:', e)
	}
}

// 保存收藏到本地存储
const saveFavoritesToStorage = () => {
	try {
		uni.setStorageSync('userFavorites', favorites)
	} catch (e) {
		console.error('保存收藏失败:', e)
	}
}

// 切换分类
const switchCategory = (categoryId: string) => {
	activeCategory.value = categoryId
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

// 查看收藏项
const viewItem = (item: any) => {
	if (isSelectMode.value) {
		// 在选择模式下，点击进行选择
		toggleSelectItem(item.id)
	} else {
		// 正常模式下，跳转到对应页面
		uni.navigateTo({
			url: item.url
		})
	}
}

// 移除收藏
const removeFavorite = (item: any, index: number) => {
	uni.showModal({
		title: '确认取消收藏',
		content: `确定要取消收藏《${item.title}》吗？`,
		success: (res) => {
			if (res.confirm) {
				favorites.splice(index, 1)
				saveFavoritesToStorage()

				uni.showToast({
					title: '已取消收藏',
					icon: 'success'
				})
			}
		}
	})
}

// 切换选择模式
const toggleSelectMode = () => {
	isSelectMode.value = !isSelectMode.value
	if (!isSelectMode.value) {
		selectedItems.value = []
	}
}

// 切换选择项
const toggleSelectItem = (itemId: number) => {
	const index = selectedItems.value.indexOf(itemId)
	if (index === -1) {
		selectedItems.value.push(itemId)
	} else {
		selectedItems.value.splice(index, 1)
	}
}

// 批量删除
const batchRemove = () => {
	if (selectedItems.value.length === 0) return

	uni.showModal({
		title: '确认批量删除',
		content: `确定要删除 ${selectedItems.value.length} 个收藏项吗？`,
		success: (res) => {
			if (res.confirm) {
				// 删除选中的项
				for (let i = favorites.length - 1; i >= 0; i--) {
					if (selectedItems.value.includes(favorites[i].id)) {
						favorites.splice(i, 1)
					}
				}

				// 清空选择
				selectedItems.value = []
				isSelectMode.value = false
				saveFavoritesToStorage()

				uni.showToast({
					title: '批量删除成功',
					icon: 'success'
				})
			}
		}
	})
}

// 获取空状态文本
const getEmptyText = () => {
	if (activeCategory.value === 'all') {
		return '还没有任何收藏'
	}
	return `没有${categories.find(c => c.id === activeCategory.value)?.label}收藏`
}

// 去博客页面
const goToBlog = () => {
	uni.switchTab({
		url: '/pages/blog/blog'
	})
}
</script>

<style lang="scss">
.favorites-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.favorites-header {
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

	.category-section {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;

		.category-tabs {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;

			.category-tab {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx 30rpx;
				border-radius: 10rpx;
				background-color: #f8f9fa;
				border: 2rpx solid #f0f0f0;

				&.active {
					background-color: #007aff;
					border-color: #007aff;

					.category-text,
					.category-count {
						color: #fff;
					}
				}

				.category-text {
					font-size: 28rpx;
					color: #333;
					font-weight: bold;
					margin-bottom: 8rpx;
				}

				.category-count {
					font-size: 22rpx;
					color: #999;
				}
			}
		}
	}

	.favorites-list {
		.favorite-item {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.item-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.item-type {
					.type-badge {
						display: inline-block;
						padding: 6rpx 16rpx;
						border-radius: 8rpx;
						font-size: 22rpx;
						font-weight: bold;

						&.article {
							background-color: #e6f7ff;
							color: #1890ff;
						}

						&.post {
							background-color: #f6ffed;
							color: #52c41a;
						}

						&.video {
							background-color: #fff7e6;
							color: #fa8c16;
						}

						&.image {
							background-color: #f9f0ff;
							color: #722ed1;
						}
					}
				}

				.item-time {
					font-size: 24rpx;
					color: #999;
				}
			}

			.item-content {
				margin-bottom: 20rpx;

				.item-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 15rpx;
					line-height: 1.4;
				}

				.item-excerpt {
					font-size: 28rpx;
					color: #666;
					line-height: 1.6;
				}
			}

			.item-footer {
				margin-bottom: 20rpx;

				.item-meta {
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

				.item-tags {
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

			.item-actions {
				display: flex;
				justify-content: flex-end;
				gap: 20rpx;

				.action-btn {
					padding: 12rpx 24rpx;
					border-radius: 8rpx;
					font-size: 24rpx;
					border: none;

					&.view-btn {
						background-color: #f0f0f0;
						color: #333;
					}

					&.remove-btn {
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

	.batch-actions {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 30rpx 40rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.batch-select {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.checkbox {
				width: 36rpx;
				height: 36rpx;
				border: 2rpx solid #ddd;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				&.checked {
					background-color: #007aff;
					border-color: #007aff;

					.checkmark {
						color: #fff;
						font-size: 24rpx;
					}
				}
			}

			.select-text {
				font-size: 28rpx;
				color: #333;
			}
		}

		.batch-buttons {
			.batch-btn {
				padding: 20rpx 40rpx;
				background: linear-gradient(to right, #ff4d4f, #ff7875);
				color: #fff;
				border: none;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-weight: bold;

				&.disabled {
					background-color: #ccc;
				}
			}
		}
	}
}
</style>