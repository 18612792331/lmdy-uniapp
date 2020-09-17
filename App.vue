<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let uri = '/tag';
			this.$u.get(uri, {
			
			}).then(res => {
				console.log(res)
				uni.setStorageSync('tag', res);
			
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import './common/app.css';
	
	
</style>
