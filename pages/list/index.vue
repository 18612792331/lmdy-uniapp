<template>
	<view class="switch-content">
		<view id="listArea">
			<view v-for="(item, index) in data" :key="index" class="movie-section"  @click="detail(item)">

				<image class="movie-img" :src="item.cover"></image>
				<view class="movie-info">
					<view class="movie-name line-ellipsis">{{item.name}}
						<text class='version'>{{item.state}}</text>
					</view>
					<view class='movie-score line-ellipsis'>
						<view>
							<text>年份：<text class='grade'>{{item.year}}</text></text>
						</view>
					</view>
					<view class="movie-star line-ellipsis" v-if="item.alias">别名：{{item.alias.replace('：', '')}}</view>
					<view class="movie-star line-ellipsis" v-if="item.area">地区：{{item.area}}</view>
					<view class="movie-star line-ellipsis" v-if="item.actor">主演：{{item.actor.join(', ')}}</view>
				</view>

			</view>
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				data: [],
				pageUtil: {
					pageNo: 1,
					pageSize: 20,
					type: 1
				},
				scrollTop: 0
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
			page() {
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				uni.showNavigationBarLoading()
				let uri = '/page?pageNo=' + this.pageUtil.pageNo + '&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil
					.type
				this.$u.get(uri, {

				}).then(res => {
					
					this.data.push(...res.content)
					uni.hideLoading();
					uni.hideNavigationBarLoading()
					
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
				this.page();
			}
		},
		onLoad(option) {
			this.pageUtil.type = option.type
			this.page();
		},
		onReady() {
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#2b85e4',
			    animation: {
			        duration: 1500,
			        timingFunc: 'easeIn'
			    }
			})
			if(this.pageUtil.type==1) {
				uni.setNavigationBarTitle({
				    title: '最新电影'
				});
			}
			if(this.pageUtil.type==2) {
				uni.setNavigationBarTitle({
				    title: '最新剧集'
				});
			}
			if(this.pageUtil.type==1) {
				uni.setNavigationBarTitle({
				    title: '最新动漫'
				});
			}
			
			
		}
	}
</script>

<style>
</style>
