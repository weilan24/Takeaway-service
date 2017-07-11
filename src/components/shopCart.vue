<template>
<div>
<div class="shopcart">
	<div class="sh-content">
		<div class="sh-content-left" @click="toggleList" >
			<div class="logo-wrapper">
				<div class="logo" :class="{'highlight':totalCount>0}">
					<span class="shop-icon"></span>
				</div>
				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
			</div>
			<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="sh-content-right" @click.prevent="pay">
			<div class="pay" :class="payClass">{{payDesc}}</div>
		</div>
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="list-title">购物车</h1>
				<span class="list-empty" @click.prevernt="empty">清空</span>
			</div>
			<div class="list-content" ref="listConent">
				<ul>
					<li class="list-food" v-for="food in selectFoods">
						<span class="list-name">{{food.name}}</span>
						<div class="list-price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="list-cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
<div class="list-mask" v-show="listShow" @click="hideList"></div>
</div>
</template>
<script>
import cartcontrol from './cartcontrol'
import BScroll from 'better-scroll'

export default {
	props:{
		selectFoods:{
			type:Array,
			default(){
				return [
				{price:5,count:1}
				];
			}
		},
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0			
		}
	},
	data(){
		return{
			fold:true
		};
	},
	computed:{
		totalPrice(){
			var total=0;
			this.selectFoods.forEach((food)=>{
				total += food.price * food.count;
			});
			return total;
		},
		totalCount(){
			var count=0;
			this.selectFoods.forEach((food)=>{
				count+=food.count;
			});
			return count;
		},
		payDesc(){
			if(this.totalPrice===0){
				return `￥${this.minPrice}元起送`;
			}else if(this.totalPrice<this.minPrice){
				var diff=this.minPrice-this.totalPrice;
				return `还差￥${diff}元起送`;
			}else{
				return '去结算';
			}
		},
		payClass(){
			if(this.totalPrice<this.minPrice){
				return 'not-enough';
			}else{
				return 'enough';
			}
		},
		listShow(){
			if(!this.totalCount){
				this.fold=true;
				return false;
			}
			var show = !this.fold;
			if(show){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.listConent,{
							click: true
						});
					}else{
						this.scroll.refresh();
					}
				});
			}
			return show;
		},
		
	},
	methods:{
		toggleList(){
			if(!this.totalCount){
				return;
			}
			this.fold=!this.fold;
		},
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0;
			});
		},
		hideList(){
			this.fold=true;
		},
		pay(){
			if(this.totalPrice<this.minPrice){
				return;
			}
			window.alert(`支付${this.totalPrice}`);
		}
	},
	components:{
		cartcontrol
	}
};
</script>
<style type="text/css">
.shopcart{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 48px;
	z-index: 50;	
}
.sh-content{
	background: #141d27;
	overflow: hidden;
}
.sh-content-left{
	float: left;
	width: 70%;
}
.sh-content-right{
	float: left;
	width: 30%;
}
.logo-wrapper,.price,.desc{
	display: inline-block;
}
.logo-wrapper{
	position: relative;
	bottom: 0px;
	margin: 0 12px;
	width: 48px;
	height: 48px;
	/*vertical-align: top;*/
	border-radius: 50%;


}
.logo{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: #2b343c;
}
.logo-wrapper .highlight{
	background: rgb(0,160,220);
}
.sh-content-left .highlight{
	color: #fff;
}
.shop-icon{
	display: inline-block;
	width: 48px;
	height: 48px;
	background-size: 28px;
	background-image: url('cart.png');
	background-repeat: no-repeat;
	background-position: center; 
}
.price{
	vertical-align:top;
	line-height: 24px;
	margin-top: 12px;
	padding-right: 12px;
	border-right: 2px solid rgba(255,255,255,0.1);
	font-size: 18px;
	font-weight: 700;
	color: rgba(255,255,255,0.4);
}
.desc{
	vertical-align: top;
	line-height: 24px;
	margin: 12px 0 0 12px;
	font-size: 14px;
	color: rgba(255,255,255,0.4);
	font-weight: 200
}
.pay{
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 16px;
	
}
.not-enough{
	color:  rgba(255,255,255,0.4);
	background-color: #2b333b;
}
.enough{
	background: #00b43c;
	color: #fff;
}

.num{
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 14px;
	line-height: 14px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
	background-color: rgb(240,20,20);
}


.shopcart-list{
	position: absolute;
	bottom: 48px;
	left: 0;
	z-index: 100;
	width: 100%;
	/*color: #fff;*/
}

.list-header{
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	background: #f3f5f7;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	overflow: hidden;
}
.list-title{
	float: left;
	font-size: 14px;
	color: rgb(7,17,27);
}
.list-empty{
	float: right;
	font-size: 12px;
	color: rgb(0,160,220);
}
.list-content{
	padding: 0 18px;
	max-height: 217px;
	overflow: hidden;
	background: #fff;
}
.list-food{
	position: relative;
	padding: 12px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);;
}
.list-name{
	line-height: 20px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.list-price{
	position: absolute;
	right: 110px;
	bottom: 12px;
	line-height: 20px;
	font-weight: 700;
	color:rgb(240,20,20);
}
.list-cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 6px;
}
.list-mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 40px;
	background: rgba(7,17,27,0.5);
}



</style>