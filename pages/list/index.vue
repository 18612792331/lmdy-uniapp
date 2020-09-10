<template>
	<view class="switch-content">
		<view id="listArea">
			<view v-for="(item, index) in data" :key="index" class="movie-section">

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
					<view class="movie-star line-ellipsis" v-if="item.area">地区：{{item.area}}</view>
					<view class="movie-star line-ellipsis" v-if="item.director">导演：{{item.director}}</view>
					<view class="movie-star line-ellipsis" v-if="item.actor">主演：{{item.actor.join(', ')}}</view>
				</view>

			</view>
			<!-- <u-back-top :scroll-top="scrollTop"></u-back-top> -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0, //屏幕高度
				bottomDistinct: 200, //距离底部多少像素时触发
				isLoading: false, //防止频繁触发
				data: [],
				pageUtil: {
					pageNo: 1,
					pageSize: 20,
					type: 1
				},
				scrollTop: 0
			}
		},
		methods: {
			page() {
				uni.showToast({
					icon: "loading",
					title: "加载数据"
				})
				let uri = '/page?pageNo=' + this.pageUtil.pageNo + '&pageSize=' + this.pageUtil.pageSize + '&type=' + this.pageUtil
					.type
				this.$u.get(uri, {

				}).then(res => {
					this.data.push(...res.content)
					uni.hideLoading();
					//恢复事件触发
					this.isLoading = false;


				})
			},

			/**
			 *  页面滑动事件
			 */
			onPageScroll: function(e) {
				// this.scrollTop = e.scrollTop;
				const scrollTop = e.scrollTop; //滚动条距离页面顶部的像素
				// console.log('scrollTop', scrollTop)

				//防止重复触发
				if (this.isLoading) {
					return;
				}

				const query = uni.createSelectorQuery().in(this);
				query.select('#listArea').boundingClientRect(data => {
					// console.log('bottomDistinct', this.bottomDistinct)
					let height = data.height; //listArea节点的高度
					// console.log('height', height)
					//如果设置的事件触发距离 大于等于 (节点的高度-屏幕高度-滚动条到顶部的距离)
					if (this.bottomDistinct >= height - this.screenHeight - scrollTop) {
						//阻止时间重复触发
						this.isLoading = true;
						this.pageUtil.pageNo++;
						this.page();


						// setTimeout(() => {
						// 	//测试数据
						// 	let arr = new Array(5).fill(0);
						// 	arr = arr.map((v, i) => this.info.length + i + 1);

						// 	//数据填充
						// 	this.info = this.info.concat(arr);
						// 	//恢复事件触发
						// 	this.isLoading = false;
						// }, 1500);
					}
				}).exec();
			}
		},
		onLoad(option) {
			//页面加载时取得屏幕高度
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			console.log('type', option.type)
			this.pageUtil.type = option.type
			this.page();
		}
	}
</script>

<style>
</style>
