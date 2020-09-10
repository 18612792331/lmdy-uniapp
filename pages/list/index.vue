<template>
	<view class="switch-content">
		<!-- <view class="most-expected">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" class="scroll-view_H"
			 @scroll="scroll">
				<view v-for="(item, index) in data" :key="index" class="expected-item">
					<image :src="item.cover" class='poster'></image>
					<view class='name line-ellipsis'>{{item.name}}</view>
					<view class='data line-ellipsis'>年份：{{item.year}}</view>
					<view class='data'>{{item.state}}</view>
				</view>
			</scroll-view>
		</view> -->
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view v-for="(item, index) in data" :key="index" class="movie-section">
					
					<image class="movie-img" :src="item.cover"></image>
					    <view class="movie-info">
					      <view class="movie-name line-ellipsis">{{item.name}}
					        <text class='version'>{{item.state}}</text>
					      </view>
					      <!-- <view class='movie-score line-ellipsis'>
					        <view wx:if='{{movie.globalReleased}}'>
					          <text wx:if='{{movie.sc}}'>观众评<text class='grade'>{{movie.sc}}</text></text>
					          <text wx:else>暂无评分</text>
					        </view>
					        <view wx:else>
					          <text class='grade'>{{movie.wish}}</text>人想看</view>
					      </view> -->
					      <view class="movie-star line-ellipsis" v-if="item.actor">主演：{{item.actor.join(', ')}}</view>
					      <view v-if="item.year">{{item.year}}上映</view>
					      <view class="movie-showInfo line-ellipsis">{{item.state}}</view>
					    </view>
					    <view class='buy-tickets'>
					      <!-- <view wx:if='{{movie.showst===3}}' class='btn'>购票</view>
					      <view wx:elif='{{movie.showst===1}}' class='btn want-see'>想看</view> -->
					      <view class='btn pre-sale'>播放</view>
					    </view>
					
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				data: [],
				pageUtil: {
					pageNo: 1,
					pageSize: 20,
					type: 1
				}
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			page() {
				let uri = '/page?pageNo=' + this.pageUtil.pageNo + '&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil
					.type
				this.$u.get(uri, {

				}).then(res => {
					this.data = res.content
					console.log(this.data)

				})
			},
		},
		onLoad(option) {
			console.log('type', option.type)
			this.pageUtil.type = option.type
			this.page();
		}
	}
</script>

<style>
</style>
