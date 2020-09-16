<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="search_bar" style="width: 70%;">
			<u-search @blur="goSearch" placeholder="搜索电影名" :clearabled="true" bg-color="#f7f9fa" v-model="keyword" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<view class="content">
			<view style="margin-top: 28rpx;">
				<u-section title="热门电影" font-size="35" sub-title="查看更多" @click="more(1)"></u-section>
			</view>
			<view class="dy_box">
				<view class="box_child" v-for="(item, index) in dyData" @click="detail(item)">
					<u-image width="100%" height="300rpx" fade="true" :duration="1000" border-radius="10" :src="item.cover"></u-image>
					<view class="tip line-ellipsis">{{item.state}}</view>
					<view>
						<p class="name line-ellipsis">{{item.name}}</p>
					</view>
				</view>
			</view>
			<view style="margin-top: 28rpx;">
				<u-section title="最新剧集" font-size="35" sub-title="查看更多" @click="more(2)"></u-section>
			</view>
			<view class="dy_box">
				<view class="box_child" v-for="(item, index) in dsjData" @click="detail(item)">
					<u-image width="100%" height="280rpx" fade="true" :duration="1000" border-radius="10" :src="item.cover"></u-image>
					<view class="tip line-ellipsis">{{item.state}}</view>
					<view>
						<p class="name line-ellipsis">{{item.name}}</p>
					</view>
				</view>
			</view>
			<view style="margin-top: 28rpx;">
				<u-section title="最新动漫" font-size="35" sub-title="查看更多" @click="more(4)"></u-section>
			</view>
			<view class="dy_box">
				<view class="box_child" v-for="(item, index) in dmData" @click="detail(item)">
					<u-image width="100%" height="300rpx" fade="true" :duration="1000" border-radius="10" :src="item.cover"></u-image>
					<view class="tip line-ellipsis">{{item.state}}</view>
					<view>
						<p class="name line-ellipsis">{{item.name}}</p>
					</view>
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
				dmData: [],
				pageUtil: {
					pageNo: 1,
					pageSize: 6,
					type: 1
				},
				keyword: ''
			}
		},
		onLoad() {
			this.dyPage();
			this.dsjPage();
			this.dmPage();

		},
		methods: {
			more(type) {
				this.$u.route({
					url: 'pages/list/index',
					params: {
						type: type
					}
				})
			},
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
			},
			dmPage() {
				let uri = '/page?pageNo=1&pageSize=' + this.pageUtil.pageSize + '&type=4'
				this.$u.get(uri, {
			
				}).then(res => {
					this.dmData = res.content
			
				})
			},
			goSearch() {
				console.log(this.keyword)
				this.$u.route({
					url: 'pages/search/index/index',
					params: {
						keyword: this.keyword
					}
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

.search_bar {
	width: 100%;
	margin-top: 4rpx;
}
	

	.dy_box {
		margin-top: 10px;
		width: 100%;
		text-align: center;
		display: flex;
		align-content: flex-start;
		flex-flow: row wrap;
		justify-content: space-around;
	}

	.box_child {
		flex: 0 0 30%;
		margin-bottom: 10px;
		position: relative;
		text-align: center;
	}

	.tip {
		background: #000;
		opacity: 0.5;
		color: #fff;
		width: 90%;
		position: absolute;
		bottom: 19px;
		left: 12rpx;
		font-size: 25rpx;
		border-radius: 10rpx;
	}
	.name {
		color: #303133 ;
		font-weight: 800;
	}
</style>
