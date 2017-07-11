<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overtiew-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
					
				</div>
				<div class="overtiew-right">
					<div class="score-wrapper">
						<span class="right-title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="right-score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="right-title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="right-score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="delivery-title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>	
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" v-on:ratingtypeSelect="ratingtypeselect" v-on:contentToggle="contenttoggle"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<div class="name">{{rating.username}}</div>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
								<p class="rating-text">{{rating.text}}</p>
								<div class="recommend" v-show="rating.recommend.length">
									<span class="icon-thum-up"></span>
									<span clsass="recommend-item" v-for="item in rating.recommend">{{item}}</span>
								</div>
								<div class="time" >{{rating.rateTime}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import star from './star';
import split from './split';
import ratingselect from './ratingselect';
import Vue from 'vue';

const ALL=2;
const ERR_OK=0;

export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			ratings:[],
			showFlag:false,
			selectType:ALL,
			onlyContent:true
		};

	},
	methods:{
		needShow(type,text){
			if(this.onlyContent && !text){
				return false;
			}
			if(this.selectType===ALL){
				return true;
			}else{
				return type===this.selectType;
			}
		},
		ratingtypeselect(type){
			this.selectType=type;
			this.$nextTick(()=>{
				this.scroll.refresh();
			});
		},
		contenttoggle(type){
			this.onlyContent=type;
			this.$nextTick(()=>{
				this.scroll.refresh();
			});
		}
	},
	created(){
		this.$http.get('/api/ratings').then((response)=>{
			response=response.body;
			if(response.errno===ERR_OK){
				this.ratings=response.data;
				this.$nextTick(()=>{
					this.scroll=new BScroll(this.$refs.ratings,{
						click:true
					});
				});
			}
		});
	},
	components:{
		star,
		split,
		ratingselect
	}
}

</script>
<style>
.ratings{
	position: absolute;
	top: 174px;
	bottom: 0;
	width: 100%;
	left: 0;
	overflow: hidden;
}
.overview{
	padding: 18px 0;
	width: 100%;
	overflow: hidden;
}
.overtiew-left{
	width: 30%;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
	float: left;
	padding: 10px 0;
}
.overtiew-right{
	float: left;
	padding-left:14px;
	line-height: 18px;
}
.score{
	margin-bottom: 6px;
	line-height: 28px;
	font-size: 24px;
	color: rgb(225,153,0);
}
.overtiew-left .title{
	margin-bottom: 8px;
	line-height: 12px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.rank{
	line-height: 10px;
	font-size: 10px;
	color:rgb(147,153,159);
}
.score-wrapper{
	margin-bottom: 8px;
	font-size: 0;
}
.right-title{
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
}
.star{
	display: inline-block;
	margin: 0 0 0 8px;
	line-height: 18px;
}
.right-score{
	display: inline-block;
	font-size: 12px;
	color: rgb(255,153,0);
}
.delivery-wrapper{
	font-size: 0;
}
.delivery-title{
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);	
}
.delivery{
	margin-left: 12px;
	font-size: 12px;
	color: rgb(147,153,159);
}
.rating-wrapper{
	padding: 0 18px;
}
.rating-item{
	display: flex;
	padding: 18px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.avatar img{
	border-radius: 50%;
}
.content .name{
	line-height: 12px;
	font-size: 10px;
	color: rgb(7,17,27);
	margin-bottom: 4px;
	margin-left: 0;
}
.star-wrapper{
	font-size: 0;
	margin:0 0 6px 0; 
	text-align: left;
} 
.star-wrapper .star{
	display: inline-block;
	vertical-align: top;
	margin:0 6px 0 0;
}
.delivery{
	display: inline-block;
	vertical-align: top;
	color: rgb(147,153,159);
}
.rating-text{
	line-height: 18px;
	font-size: 12px;
	margin-bottom: 8px;
}
.recommend{
	line-height: 16px;
	color: rgb(147,153,159);
	font-size: 10px;
	margin-bottom: 4px;
}
.recommend span{
	margin-left: 3px;
}
.icon-thum-up{
 	display: inline-block;
 	width: 16px;
 	height: 16px;
 	background-size: 16px;
 	background-repeat: no-repeat;
 	background-image: url('thum-up.png');
}
.recommend-item{

	padding: 0 6px;
	border: 1px solid rgba(7,17,27,0.1);
	border-radius: 1px;
	background: #fff;
}

</style>
