<template>
	<view>
		<view class="poster-bg">
			<image style="height: 100%;width: 100%;" mode="aspectFill" :src="data.cover"></image>
		</view>
		<view class="detail">
			<view>
				<span class="g-font-46">捉妖记</span>
				<span>2015年</span>
			</view>
			<view class="detail-container">
				<view style="margin-top: 30rpx;">
					<image style="width: 60%;" :src="data.cover"></image>
				</view>
				<view style="margin-top: 30rpx;">
					<u-button shape="square" type="primary" size="medium" :ripple="true" ripple-bg-color="#69d1e1">立即播放</u-button>
				</view>
			</view>
			<view style="text-align: left; margin: 30rpx 40rpx 30rpx 40rpx;">
				<p v-if="data.alias">别名：<span>{{ data.alias.replace('：', '') }}</span></p>
				<p v-if="data.genre">类型：<span>{{ data.genre }}</span></p>
				<p v-if="data.area">地区：<span>{{ data.area }}</span></p>
				<p v-if="data.language">语言：<span>{{ data.language }}</span></p>
				<p v-if="data.director">导演：<span>{{ data.director }}</span></p>
				<p v-if="data.actor">主演：<span>{{ data.actor.join(', ') }}</span></p>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},

			}
		},
		methods: {

		},
		onLoad(option) {
			this.data = JSON.parse(option.data)
			console.log(this.data)


		},
	}
</script>

<style>
	.poster-bg {
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		font-size: 0;
		position: fixed;
		z-index: -1;
	}

	.detail {
		height: 100%;
		width: 100%;
		min-height: 100%;
		background-color: rgba(30, 41, 61, 0.7);
		text-align: center;
		color: #FFFFFF;
	}

	.detail-container {
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}

	.pic {
		width: 60%;
		margin: 0 auto;
		overflow: hidden;
	}
</style>
