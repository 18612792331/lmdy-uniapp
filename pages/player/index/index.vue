<template>
	<view>
		<view>
			<video id="myVideo" src="https://douban.donghongzuida.com/20200718/5734_f1fc9c36/index.m3u8"
			 @error="videoErrorCallback" controls></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		}
	}
</script>

<style>

</style>
