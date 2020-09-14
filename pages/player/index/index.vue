<template>
	<view style="font-family: '宋体';">
		<view>
			<video style="width: 100%;" :title="data.name" autoplay="true" show-progress="true" :poster="data.cover" id="myVideo" :src="data.current.link" controls></video>
		</view>
		<view class="detail-container">
			<view>
				<p style="color: #2b85e4;font: italic bold 12px/30px Georgia, serif;">当前播放：<span style="color: #a0cfff;">{{data.current.title}}</span></p>
				<u-line color="#a0cfff" />
			</view>
			<view style="display: flex;justify-content: space-around;">
				<p style="font-weight: 300;color: #f29100 ;">P2P加速，把本片分享给朋友一起来组队加速吧！</p>
				<button class="share-btn" open-type="share" size="mini" type="primary">分享</button>
			</view>
			
			<view>
				<view style="margin-top: 30rpx;">
					<view v-for="(item, index) in data.resources" :key="index" class="nav" :class="{ choose:data.current.index == index}" @click="cho(index)">{{item.label}}</view>
				</view>
				<view>
					<view v-for="(item, index) in data.resources" :key="index" v-if="index==data.current.index" class="player_box">
						<view v-for="(item2, index2) in item.links" :key="index2" class="box_child" :class="{ titlech:item2.link == data.current.link}" @click="play(item2)">{{item2.title}}</view>
					</view>
				</view>
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
			cho(index) {
				this.data.current.index = index
			},
			play(item) {
				this.data.current.title = item.title;
				this.data.current.link = item.link;
				
			},
			
		},
		onLoad(option) {
			
			this.data = JSON.parse(option.data)
			this.$u.mpShare = {
				title: this.data.name + '  在线观看', // 默认为小程序名称，可自定义
				// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
				// 支持PNG及JPG，默认为当前页面的截图
				imageUrl: this.data.cover
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
			    title: this.data.name
			});
			
		}
	}
</script>

<style>
	p {
		font: italic bold 12px/30px Georgia, serif;
	}
	.titlech {
		background-color: #2b85e4;
		color: #FFFFFF;
		border-radius: 15rpx;
	}
</style>
