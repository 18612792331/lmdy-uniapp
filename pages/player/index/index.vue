<template>
	<view>
		<view>
			<video style="width: 100%;" id="myVideo" :src="data.current.link" @error="videoErrorCallback" controls></video>
		</view>
		<view class="detail-container">
			<view>
				<p style="color: #2b85e4;font: italic bold 12px/30px Georgia, serif;">当前播放：<span style="color: #a0cfff;">{{data.current.title}}</span></p>

				<u-line color="#2b85e4" />
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
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		},
		onLoad(option) {
			this.data = JSON.parse(option.data)
		},
	}
</script>

<style>
	p {
		font: italic bold 12px/30px Georgia, serif;
	}
</style>
