<template>
	<view style="font-family: '宋体';">
		<view class="poster-bg">
			<image style="height: 100%;width: 100%;" mode="aspectFill" :src="data.cover"></image>
		</view>
		<view class="detail">
			<view>
				<span class="g-font-46" style="text-shadow: 5px 6px 2px #83ACDB">{{data.name}}</span>
				<span v-if="data.year">{{data.year}}</span>
			</view>
			<view class="detail-container">
				<view style="margin-top: 30rpx;">
					<image mode="aspectFit" style="width: 60%;" :src="data.cover"></image>
				</view>
				<view style="margin-top: 30rpx;">
					<u-button shape="square" type="primary" size="medium" :ripple="true" ripple-bg-color="#69d1e1" @click="mplay">立即播放</u-button>
				</view>
			</view>
			<view style="text-align: left; margin: 30rpx 40rpx 30rpx 40rpx;line-height: 60rpx;">
				<p v-if="data.alias">别名：<span>{{ data.alias.replace('：', '') }}</span></p>
				<p v-if="data.genre">类型：<span>{{ data.genre }}</span></p>
				<p v-if="data.area">地区：<span>{{ data.area }}</span></p>
				<p v-if="data.language">语言：<span>{{ data.language }}</span></p>
				<p v-if="data.director">导演：<span>{{ data.director }}</span></p>
				<p v-if="data.actor">主演：<span>{{ data.actor.join(', ') }}</span></p>
				<p v-if="data.introduce" style="font:italic 12px/30px Georgia,serif;">简介：<span>{{ data.introduce }}</span></p>
				<!-- <p>选集：</p> -->
				<view style="margin-top: 30rpx;">
					<view v-for="(item, index) in data.resources" :key="index" class="nav" :class="{ choose:current == index}" @click="cho(index)">{{item.label}}</view>
				</view>
				<view>
					<view v-for="(item, index) in data.resources" :key="index" v-if="index==current" class="player_box">
						<view v-for="(data, index2) in item.links" :key="index2" class="box_child" @click="play(data)">{{data.title}}</view>
					</view>
				</view>
			</view>
			<view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				current: 0,

			}
		},
		methods: {
			mplay() {
				this.data.current = this.data.resources[0].links[0]
				this.data.current.index = this.current;
				this.$u.route({
					url: '/pages/player/index/index',
					params: {
						data: JSON.stringify(this.data)
					}
				})
				
			},
			play(item) {
				this.data.current = item;
				this.data.current.index = this.current;
				this.$u.route({
					url: '/pages/player/index/index',
					params: {
						data: JSON.stringify(this.data)
					}
				})
			},
			cho(index) {
				this.current = index
			}

		},
		onLoad(option) {
			this.data = JSON.parse(option.data)
		},
	}
</script>

<style>
	

	.detail {
		height: 100%;
		width: 100%;
		min-height: 100%;
		background-color: rgba(30, 41, 61, 0.7);
		text-align: center;
		color: #FFFFFF;
	}

	

	.pic {
		width: 60%;
		margin: 0 auto;
		overflow: hidden;
	}


</style>
