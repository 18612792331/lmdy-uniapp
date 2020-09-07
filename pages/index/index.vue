<template>
	<view class="content">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="search_bar" @click="gotosearch">
			<u-search placeholder="搜索电影名" :clearabled="true" :show-action="false" bg-color="#f7f9fa" disabled="false"></u-search>
		</view>
		<view style="margin-top: 28rpx;">
			<u-section title="热门推荐" font-size="35" sub-title="查看更多"></u-section>
		</view>
		<view class="dy_box">
			<view class="box_child" v-for="(item, index) in dyData" @click="detail(item)">
				<u-image width="100%" height="300rpx" fade="true" :duration="1000" border-radius="20" :src="item.cover"></u-image>
				<span class="tip">{{item.state}}</span>
				<view>
					<p>{{item.name}}</p>
				</view>
			</view>
		</view>
		<view style="margin-top: 28rpx;">
			<u-section title="热门好剧" font-size="35" sub-title="查看更多"></u-section>
		</view>
		<view class="dy_box">
			<view class="box_child" v-for="(item, index) in dsjData" @click="detail(item)">
				<u-image width="100%" height="300rpx" fade="true" :duration="1000" border-radius="20" :src="item.cover"></u-image>
				<span class="tip">{{item.state}}</span>
				<view>
					<p>{{item.name}}</p>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				dyData: [],
				dsjData: [],
				pageUtil: {
					pageNo: 1,
					pageSize: 6,
					type: 1
				}
			}
		},
		onLoad() {
			this.dyPage();
			this.dsjPage();

		},
		methods: {
			detail(item) {
				this.$u.route({
					url: 'pages/detailInfo/index',
					params: {
						data: JSON.stringify(item)
					}
				})
			},
			dyPage() {
				let uri = '/page?pageNo=' + this.pageUtil.pageNo + '&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil
					.type
				this.$u.get(uri, {

				}).then(res => {
					this.dyData = res.content

				})
			},
			dsjPage() {
				let uri = '/page?pageNo=1&pageSize=' + this.pageUtil.pageSize + '&type=2'
				this.$u.get(uri, {
			
				}).then(res => {
					this.dsjData = res.content
			
				})
			}

		}
	}
</script>

<style lang="scss">
	.content {
		margin-left: 16rpx;
		margin-right: 16rpx;
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.search_bar {
		width: 100%;
		margin-top: 4rpx;
	}

	.dy_box {
		margin-top: 20px;
		width: 100%;
		text-align: center;
		display: flex;
		align-content: flex-start;
		flex-flow: row wrap;
		justify-content: space-around;
	}

	.box_child {
		flex: 0 0 30%;
		margin-bottom: 20px;
	}

	.tip {
		width: 100%;
		padding-left: 5px;
		background-color: rgba(0, 0, 0, .50);
		color: #FFFFFF;
		font-size: 23rpx;
		position: relative;
		left: 0px;
		bottom: 45rpx;
	}
</style>
