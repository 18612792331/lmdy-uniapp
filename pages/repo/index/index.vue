<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="search_bar" style="width: 70%;">
			<u-search @blur="goSearch" placeholder="搜索电影名" :clearabled="true" bg-color="#f7f9fa" v-model="keyword" :show-action="true"
			 action-text="搜索" :animation="true"></u-search>
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
			<u-tabs name="name" :list="yearList" :current="yearCurrent" @change="yearChange"></u-tabs>
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
		<u-divider v-if="!add">我是有底线的</u-divider>
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
					year: ''
				},
				data: [],
				scrollTop: 0,
				areaList: [],
				areaCurrent: 0,
				genreList: [],
				genreCurrent: 0,
				yearList: [{
					name: '全部'
				}, {
					name: '2020'
				}, {
					name: '2019'
				}, {
					name: '2018'
				}, {
					name: '2017'
				}, {
					name: '2016'
				}, {
					name: '2015'
				}, {
					name: '2014'
				}, {
					name: '2013'
				}, {
					name: '2012'
				}, {
					name: '2011'
				}, {
					name: '00年代'
				}, {
					name: '90年代'
				}, {
					name: '80年代'
				}, {
					name: '更早'
				}],
				yearCurrent: 0,

				add: true
			}
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
			yearChange(index) {
				this.add = true;
				this.yearCurrent = index;
				this.pageUtil.year = this.yearList[index].name
				this.restPageData();
			},
			genreChange(index) {
				this.add = true;
				this.genreCurrent = index;
				let genre = this.genreList[index];
				this.pageUtil.genre = genre.name;
				this.restPageData();
			},
			areaChange(index) {
				this.add = true;
				this.areaCurrent = index;
				let area = this.areaList[index];
				this.pageUtil.area = area.condition;
				this.restPageData();
			},
			tabc(item) {
				this.add = true;
				this.yearCurrent = 0;
				this.areaCurrent = 0;
				this.genreCurrent = 0;
				this.tab_current = item.index;

				this.pageUtil.area = '';
				this.pageUtil.genre = '';
				this.pageUtil.year = '';
				this.pageUtil.type = item.type;
				this.getCondition(this.pageUtil.type);
				this.restPageData();
			},
			restPageData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let uri = '/page?pageNo=1&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil.type + '&area=' + this.pageUtil
					.area + '&genre=' + this.pageUtil.genre + '&year=' + this.pageUtil.year;
				this.$u.get(uri, {

				}).then(res => {
					this.data = res.content;
					uni.hideLoading();
				})
			},
			pageData(scroll) {
				if (this.add) {
					console.log(this.scrollTop)
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					let uri = '/page?pageNo=' + this.pageUtil.pageNo + '&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil.type + '&area=' + this.pageUtil
						.area + '&genre=' + this.pageUtil.genre + '&year=' + this.pageUtil.year;
					this.$u.get(uri, {

					}).then(res => {
					
						if (res.content.length > 0) {
							this.data.push(...res.content)
							if (scroll) {
								this.$nextTick(function(){
									uni.pageScrollTo({
									    scrollTop: this.scrollTop + 300,
									    duration: 1500
									});
								})
							}
							
							
						} else {
							this.add = false;
						}

						uni.hideLoading();
					})
				}

			},
			/**
			 *  页面滑动事件
			 */
			onPageScroll: function(e) {
				this.scrollTop = e.scrollTop;

			},
			onReachBottom() {
				console.log('到底')
				this.pageUtil.pageNo+=1;
				this.pageData(true);
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
					res.genreList.forEach(data => {
						this.genreList.push({
							name: data
						})
					})
					uni.hideLoading();
				})
			}

		},
		onLoad() {
			this.pageData(false);
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
		color: #303133;
		font-weight: 800;
	}
</style>
