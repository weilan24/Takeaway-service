<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="overview-title">{{seller.name}}</h1>
				<div class="overview-desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="seller-bulletin">
				<h1 class="seller-bulletin-title">公告与活动</h1>
				<div class="seller-content-wrapper">
					<p class="seller-content-text">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="detail-supports">
    				<li class="detail-support-item" v-for="(item,index) in seller.supports">
    					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
    					<span class="text">{{seller.supports[index].description}}</span>
    				</li>
    			</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import star from './star';
import split from './split';

export default {
	props:{
		seller:{
			type:Object
		}
	},
	created(){
  		this.classMap = ['decrease','discount','special','invoice','guarantee'];
  	},
  	watch:{
  		'seller'(){
  			this._initScroll();
  		}
  	},
  	mounted(){
  		this._initScroll();
  		
  	},
  	methods:{
  		_initScroll(){
  			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.seller,{
						click:true
					});
				}else{
					this.scroll.refresh();
				}
			});
  		}
  	},
	components:{
		star,
		split
	},
}
</script>
<style>
.seller{
	position: absolute;
	top: 174px;
	bottom: 0;
	width: 100%;
	left: 0;
	overflow: hidden;
}

.overview{
	width: 100%;
}
.overview-title{
	margin:18px 0 8px 18px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 18px;
}
.overview-desc{
	padding-bottom: 14px;
	line-height: 20px;
	height: 20px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	font-size: 0;
}
.star{
	display: inline-block;
	margin: 0 8px 0 18px;
	vertical-align: top;
}
.overview-desc .text{
	margin-right: 12px;
	/*display: inline-block;*/
	vertical-align: top;
	font-size: 12px;
	color: rgb(77,85,93);
}
.remark{
	padding-top: 18px;
	display: flex;
}
.block{
	flex:1;/*均分*/
	text-align: center;
	border-right: 1px solid rgba(7,17,27,0.1);
	padding: 18px;
}
h2{
	margin-bottom: 4px;
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.block .content{
	margin: 0;
}
.block .stress{
	font-size: 28px;
	font-weight: 200;
	line-height: 28px;
	color: rgb(7,1,7,27)；
}
.seller-bulletin{
	padding: 18px;
}
.seller-bulletin-title{
	font-size: 14px;
}
.seller-content-wrapper{
	padding: 8px 12px;
}
.seller-content-text{
	font-size: 12px;
	font-weight: 200;
	color: rgb(240,20,20);
	line-height: 24px;
}
.seller-bulletin .detail-support-item{
	line-height: 14px;
}
.pics{
	padding: 18px;
}
.pic .title{
	margin-bottom: 12px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;
}
.pic-wrapper{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
}
.pic-list{
	font-size: 0;
}
.pic-item{
	display: inline-block;
	margin-right: 6px;
	width: 120px;
	height: 90px;
}
.info{
	padding: 18px 18px 0 18px;
	color: rgb(7,17,27);
}
.info .title{
	padding-bottom: 12px;
	line-height: 14px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	font-size: 14px;
}
.info-item{
	padding:16px;
	font-size: 12px;
	line-height: 16px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}

</style>