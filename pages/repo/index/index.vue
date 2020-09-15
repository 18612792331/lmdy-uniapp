<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="search_bar" style="width: 70%;">
			<u-search @blur="goSearch" placeholder="搜索电影名" :clearabled="true" bg-color="#f7f9fa" v-model="keyword" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<view class="tab">
			<view v-for="(item, index) in tab" :key="index" @click="tabc(item)">
				<view class="tab-c" :class="{ tabcchoose:tab_current == index}">
					{{item.title}}
				</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;">
			<u-tabs name="title" :list="areaList" :current="areaCurrent" @change="areaChange"></u-tabs>
			<u-tabs name="name" :list="genreList" :current="genreCurrent" @change="genreChange"></u-tabs>
		</view>
		<view class="dy_box">
			<view class="box_child" v-for="(item, index) in data" @click="detail(item)">
				<u-image width="100%" height="280rpx" fade="true" :duration="1000" :src="item.cover"></u-image>
				<view class="tip line-ellipsis">{{item.state}}</view>
				<view>
					<p class="name line-ellipsis">{{item.name}}</p>
				</view>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [{
					type: 1,
					title: '电影',
					index: 0
				}, {
					type: 2,
					title: '电视剧',
					index: 1
				}, {
					type: 4,
					title: '动漫',
					index: 2
				}, {
					type: 3,
					title: '综艺',
					index: 3
				}],
				tab_current: 0,
				pageUtil: {
					pageNo: 1,
					pageSize: 39,
					type: 1,
					area: '',
					genre: '',
				},
				data: [],
				scrollTop: 0,
				areaList: [],
				areaCurrent: 0,
				genreList: [],
				genreCurrent: 0,
			}
		},
		methods: {
			genreChange(index) {
				this.genreCurrent = index;
				let genre = this.genreList[index];
				this.pageUtil.genre = genre.name;
				this.restPageData();
			},
			areaChange(index) {
				this.areaCurrent = index;
				let area = this.areaList[index];
				this.pageUtil.area = area.condition;
				this.restPageData();
			},
			tabc(item) {
				this.tab_current = item.index;
				this.pageUtil.type = item.type;
				this.getCondition(this.pageUtil.type);
				this.restPageData();
			},
			restPageData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let uri = '/page?pageNo=1&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil.type + '&area=' + this.pageUtil.area + '&genre=' + this.pageUtil.genre;
				this.$u.get(uri, {
				
				}).then(res => {
					this.data = res.content;
					uni.hideLoading();
				})
			},
			pageData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let uri = '/page?pageNo=1&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil.type + '&area=' + this.pageUtil.area + '&genre=' + this.pageUtil.genre;
				this.$u.get(uri, {

				}).then(res => {
					this.data.push(...res.content)
					uni.hideLoading();
				})
			},
			/**
			 *  页面滑动事件
			 */
			onPageScroll: function(e) {
				this.scrollTop = e.scrollTop;
				
			},
			onReachBottom() {
				console.log('到底')
				this.pageUtil.pageNo++;
				this.pageData();
			},
			goSearch() {
				this.$u.route({
					url: 'pages/search/index/index',
					params: {
						keyword: this.keyword
					}
				})
			},
			getCondition(type) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let uri = '/condition/' + type
				this.$u.get(uri, {
				
				}).then(res => {
					
					this.areaList = res.areaDTOList;
					this.genreList = [];
					res.genreList.forEach(data=>{
						this.genreList.push({name: data})
					})
					uni.hideLoading();
				})
			}

		},
		onLoad() {
			this.pageData();
			this.getCondition(this.pageUtil.type)

		},
	}
</script>

<style>
	.tab {
		margin-top: 10rpx;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: space-around;
	}

	.tab-c {
		color: #82848a;

	}

	.tabcchoose {
		color: #ff9900;
		font-size: 40rpx;
		font-weight: bold;
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
