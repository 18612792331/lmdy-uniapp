<template>
	<view style="font-family: '宋体';">
		<view v-if="tag==1">
			<video style="width: 100%;" @timeupdate="videoTimeUpdateEvent" :title="data.name" autoplay="true" show-progress="true"
			 :poster="data.cover" id="myVideo" :src="data.current.link" controls></video>
		</view>
		<view class="detail-container">
			<view v-if="tag==1">
				<p style="color: #2b85e4;font: italic bold 12px/30px Georgia, serif;">当前播放：<span style="color: #a0cfff;">{{data.current.title}}</span></p>
				<u-line color="#a0cfff" />
			</view>
			<view style="display: flex;justify-content: space-around;">
				<p style="font-weight: 300;color: #f29100 ;">P2P加速，把本片分享给朋友一起来组队加速吧！</p>
				<button class="share-btn" open-type="share" size="mini" type="primary">分享</button>
			</view>

			<view>
				<view style="margin-top: 30rpx;">
					<view v-for="(item, index) in data.resources" :key="index" class="nav" :class="{ choose:data.current.index == index}"
					 @click="cho(index)">{{item.label}}</view>
				</view>
				<view>
					<view v-for="(item, index) in data.resources" :key="index" v-if="index==data.current.index" class="player_box">
						<view v-for="(item2, index2) in item.links" :key="index2" class="box_child line-ellipsis" :class="{ titlech:item2.link == data.current.link}"
						 @click="play(item2)">{{item2.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :show-cancel-button="true" :zoom="true" @confirm="confirm" :mask-close-able="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tag: 0,
				videoContext: {}, // 用于绑定视频标签
				data: {},
				currentTime: 0,
				show: false,
				content: '是否继续上次进度播放'
			}
		},
		methods: {
			confirm(e) {
				console.log('点击了确认')
				this.videoContext.seek(this.data.current.currentTime)
			},
			videoTimeUpdateEvent(e) { // 播放进度改变
				// e.detail.currentTime为每次触发时,视频的当前播放时间
				this.currentTime = Number(e.detail.currentTime);
				console.log('播放进度条改变', this.currentTime)
				// 试看结束 this.class_info.freed_time为试看时间
				// if (currentTime >= this.class_info.freed_time) {
				// 	// 试看结束,在这做一些想做的操作,例如停止视频播放
				// 	this.videoContext.exitFullScreen();
				// 	this.videoContext.pause();
				// 	this.videoContext.seek(0);
				// }
			},
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
		onUnload() {
			let that = this;
			that.videoStorage = uni.getStorageSync('videoSchedule')
			if (that.videoStorage) {
				console.log('videoSchedule', that.videoStorage)
				const index = that.videoStorage.findIndex(item => item.id === that.data.id)
				that.data.current.currentTime = that.currentTime;
				if (index === -1) {

					that.videoStorage.unshift(that.data)
					uni.setStorage({
						key: 'videoSchedule',
						data: this.videoStorage,
						success: function() {
							console.log('success')
						}
					})
				} else { //缓存中已有相同视频，改变已看时间替换缓存
					that.videoStorage.splice(index, 1)
					that.videoStorage.unshift(that.data)
					uni.setStorage({
						key: 'videoSchedule',
						data: that.videoStorage
					})
				}
			} else {
				console.log('没找到')
				that.data.current.currentTime = that.currentTime;
				let arr = [];
				arr.push(that.data)

				uni.setStorageSync('videoSchedule', arr);
			}

		},
		onLoad(option) {
			const value = uni.getStorageSync('tag');
			this.tag = value;
			// 创建视频实例指向视频控件
			this.videoContext = uni.createVideoContext('myVideo');
			this.data = JSON.parse(option.data)
			if (this.data.current.currentTime > 5) {
				this.show=true
				console.log(this.data.current.currentTime)
			}
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
