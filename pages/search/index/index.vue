<template>
	<view style="margin: 0 20rpx;">
		<view class="search_bar" style="width: 100%;">
			<u-search @blur="search" bg-color="#fcbd71" placeholder="搜索电影名" :clearabled="true" v-model="keyword" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
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
		<view style="height: 30rpx;"></view>
		<u-divider v-if="data.length>0">我是有底线的</u-divider>
		<u-modal v-model="show" :content="content" :zoom="true" :mask-close-able="true"></u-modal>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				data: [],
				pageUtil: {
					pageNo: 1,
					pageSize: 100,
				},
				show: false,
				content: '啥也没找到哦，换个词试试吧'
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
			search() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let uri = '/page?pageNo=1&pageSize=' + this.pageUtil.pageSize + '&keyword=' + this.keyword;
				this.$u.get(uri, {
				
				}).then(res => {
					if(res.content.length>0) {
						this.data = res.content
						
					} else {
						this.show = true
					}
					uni.hideLoading();
					
				})
			}
			
		},
		onLoad(option) {
			
			if(option.keyword!=''&&option.keyword!=undefined) {
				this.keyword = option.keyword
				this.search();
			}
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#2b85e4',
			    animation: {
			        duration: 1500,
			        timingFunc: 'easeIn'
			    }
			})
			uni.setNavigationBarTitle({
			    title: '搜索'
			});
			
		},
	}
</script>

<style>
.search_bar {
	width: 100%;
	margin-top: 4rpx;
}
</style>
