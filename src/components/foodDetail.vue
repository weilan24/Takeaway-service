<template>
<div v-show="showFlag" class="foodDetail" ref="food">
	<div class="foodDetail-content">
		<div class="image-header">
			<img :src="food.image">
			<div class="icon-back" @click="hide">
				<span class="icon-arrow_left"></span>
			</div>
		</div>
		<div class="food-content">
			<h1 class="food-title">{{food.name}}</h1>
			<div class="food-detail">
				<span class="sell-count">月售{{food.sellCount}}份</span>
				<span class="food-rating">好评率{{food.rating}}</span>
			</div>
			<div class="food-price">
				<span class="now">￥{{food.price}}</span>
				<span class="old" v-show="food.oldPrice"> ￥{{food.oldPrice}}</span>
			</div>
			<div class="cartcontrol-wrapper">
				<cartcontrol :food="food"></cartcontrol>
			</div>
			<div class="food-buy" @click.event.prevent="addFirst" v-show="food.count===0 || (!food.count)">加入购物车
			</div>
		</div>
		<split v-show="food.info"></split>
		<div class="food-info" v-show="food.info">
			<h1 class="title">商品信息</h1>
			<div class="text">{{food.info}}</div>
		</div>
		<split v-show="food.info"></split>
		<div class="rating">
			<div class="title">商品评价</div>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingtypeSelect="ratingtypeselect" v-on:contentToggle="contenttoggle"></ratingselect>
			<div class="rating-wrapper">
				<ul v-show="food.ratings && food.ratings.length">
					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
						<div class="user">
							<span class="name">{{rating.username}}</span>
							<img src="rating.avatar" class="avatar" width="12" height="12">
						</div>
						<div class="time" >{{rating.rateTime}}</div>
						<p class="text">
							<span :class="{'icon-thum-up':rating.rateType===0,'icon-thum-down':rating.rateType===1}"></span>{{rating.text}}
						</p>
					</li>
				</ul>
				<div class="no-rating" v-show="(!food.ratings) || (!food.ratings.length)">暂无评价</div>
				
			</div>
		</div>
	</div>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from './cartcontrol';
import Vue from 'vue';
import split from './split';
import ratingselect from './ratingselect';

const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;

export default{
	props:{
		food:{
			type:Object
		},
	},
	data(){
		return{
			showFlag:false,
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
		};
	},
	methods:{
		show(){
			this.showFlag=true;
			this.selectType=ALL;
			this.onlyContent=true;
			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.food,{
						click:true
					});
				}else{
					this.scroll.refresh();
				}
			});
		},
		hide(){
			this.showFlag=false;
		},
		addFirst(event){
			// console.log('ssss');
			// if(event._constructed){
			// 	return;
			// }
			Vue.set(this.food,'count',1);
		},
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
	components:{
		cartcontrol,
		split,
		ratingselect
	}
};
</script>
<style>
.foodDetail{
	position: fixed;
	left: 0;
	top: 0;
	bottom: 48px;
	z-index: 101px;
	width: 100%;
	background: #fff;
}
.image-header{
	position: relative;
	width: 100%;
	height: 0;
	/*padding-top: 100%;
	相当于设置为宽度的100%，所以是一个宽高相等的图片*/
	padding-top: 100%;
}
.image-header img{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.icon-back{
	position: absolute;
	top: 10px;
	left: 0px;
}
.icon-arrow_left{
	display: block;
	padding: 10px;
	width: 30px;
	height: 30px;
	background-size: 30px;
	background-image: url('back.png');
	background-repeat: no-repeat;

}
.food-content{
	padding: 18px;
	position: relative;
}
.food-title{
	line-height: 14px;
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: 700;
	color: rgb(7,17,27);
}
.food-detail{
	margin-bottom: 18px;
	line-height: 10px;
	height: 10px;
	font-size: 0;
}
.sell-count,.food-rating{
	font-size: 10px;
	color: rgb(147,153,159);
}
.sell-count{
	margin-right: 12px;
}

.food-price{
	font-weight: 700;
	line-height: 24px;
}
.food-price .now{
	margin-right: 8px;
	font-size: 14px;
	font-weight: bold;
	color: rgb(240,20,20);
}
.food-price .old{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.cartcontrol-wrapper{
	position: absolute;
	right: 14px;
	bottom: 14px;
}
.food-buy{
	position: absolute;
	right: 18px;
	bottom: 18px;
	z-index: 10;
	height: 26px;
	line-height: 26px;
	padding: 0 12px;
	font-size: 10px;
	color: #fff;
	background: rgb(0,160,260);
	border-radius: 12px;
	/*border: 1px solid rgb(0,160,260);*/
}
.food-info{
	padding: 18px;
}
.food-info .name{
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color:rgb(7,17,27);
}
.food-info .text{
	line-height: 24px;

	font-size: 12px;
	color: rgb(77,85,93);
}

.rating{
	padding-top: 18px;
}
.rating .title{
	line-height: 12px;
	margin:0 0 0 18px;
	font-size: 14px;
}

.rating-wrapper{
	padding: 0 18px;
}
.rating-item{
	position: relative;
	padding: 16px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.user{
	position: absolute;
	right: 0;
	top: 16px;
	line-height: 12px;
	font-size: 0px;
}
.user .name{
	display: inline-block;
	vertical-align: top;
	margin-right: 6px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.user .avatar{
	border-radius: 50%;
}
.time{
	margin-bottom: 6px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.user .text{
	line-height: 16px;
	font-size: 12px;
	color: rgb(7,17,27);

}
.icon-thum-up,.icon-thum-down{
	margin-right: 4px;
	display: inline-block;
	width: 16px;
	height: 16px;
	background-size: 16px;
	background-repeat: no-repeat;

}
.icon-thum-up{
	background-image: url('thum-up.png')
}
.icon-thum-down{
	background-image: url('thum-down.png')
}
.no-rating{
	padding: 16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
}

</style>