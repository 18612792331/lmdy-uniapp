<template>
	<view>
		<view class="tx-w">
			<view class="tx">
				<image class="tx-img" :src="yonghuwx.avatarUrl"></image>
				<view class="zx"></view>
			</view>
			<view class="name">{{yonghuwx.nickName}} </view>
			<view class="name-qm">自然的美好的，你的</view>
		</view>
		<view style="text-align: center;margin-top: 50rpx;">
			<u-button type="warning" size="medium" @click="history">浏览历史</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yonghuwx: []
			}
		},
		onLoad(){
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					// 获取用户信息				
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {				
							that.yonghuwx = infoRes.userInfo
							console.log(that.yonghuwx)
						}
					});
				}
			});
		},
		methods: {
			history() {
				this.$u.route({
					url: 'pages/personal/history/history',
					
				})
			}
		}
	}
</script>

<style>
	.tx-w{
		margin-top:100upx;
		border-bottom:1px solid #ff9900;
	}
	
	.tx{
		text-align:center;
	}
	
	.tx image{
		width:140upx;
		height:140upx;
		border-radius: 50%;
	}
	
	.name{
		text-align:center;
		margin-top:20upx;
	}
	
	.name-qm{
		text-align:center;
		margin-top:20upx;
		margin-bottom: 30rpx;
		font-size:30upx;
		color: #a0cfff;
	}
</style>
