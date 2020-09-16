<template>
	<view class="switch-content">
		<view id="listArea">
			<view v-for="(item, index) in data" :key="index" class="movie-section" @click="play(item)">

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
			}
		},
		methods: {
			play(item) {
				this.$u.route({
					url: '/pages/player/index/index',
					params: {
						data: JSON.stringify(item)
					}
				})
			},
		},
		onLoad(option) {
			let that = this;
			const value = uni.getStorageSync('videoSchedule');
			if (value) {
				that.data = value;
			}

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
			uni.setNavigationBarTitle({
				title: '浏览历史'
			});


		}
	}
</script>

<style>

</style>
