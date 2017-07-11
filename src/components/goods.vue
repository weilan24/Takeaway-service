<template>
<div>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="foot-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="content-name">{{food.name}}</h2>
								<p class="content-description">{{food.description}}</p>
								<div class="content-extra">
									<span class="extra-count">月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="content-price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods" ></shopCart>
	</div>
	<foodDetail :food="selectedFood" ref="foodDetail"></foodDetail>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import shopCart from './shopCart'
import cartcontrol from './cartcontrol'
import foodDetail from './foodDetail'

const ERR_OK=0;
export default {
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			goods:[],
			listHeight:[],
			scrollY:0,
			selectedFood:{}

		};
	},
	computed:{
		currentIndex(){
			for(var i=0;i<this.listHeight.length;i++){
				var height1=this.listHeight[i];
				var height2=this.listHeight[i+1];
				if((!height2) || (this.scrollY>=height1&&this.scrollY<height2)){
					return i;
				}
			}
			return 0;
		},
		selectFoods(){
			var foods=[];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food);
					}
				});
			});
			return foods;
		}
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
		this.$http.get('/api/goods').then((response)=>{
			response=response.body;
			if(response.errno===ERR_OK){
				this.goods=response.data;
				this.$nextTick(() => {
					this._initScroll();
					this._calculateHeight();
				});
			}	
		});
		
	},
	methods:{
		selectMenu(index){
			var foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			var el=foodList[index];
			this.foodsScroll.scrollToElement(el,300);
		},
		_initScroll(){
			this.meunScroll=new BScroll(this.$refs.menuWrapper,{
				click:true
			});
			this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
				click:true,
				probeType:3
			});
			this.foodsScroll.on('scroll',(pos)=>{
				this.scrollY=Math.abs(Math.round(pos.y));
			});
		},
		_calculateHeight(){
			var foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			var height=0;
			this.listHeight.push(height);
			for(var i=0;i<foodList.length;i++){
				var item=foodList[i];
				height+=item.clientHeight;
				this.listHeight.push(height);
			}
		},
		selectFood(food,event){
			if(!event._constructed){
				return;
			}
			this.selectedFood = food;
			this.$refs.foodDetail.show();
		},

	},
	components:{
		shopCart,
		cartcontrol,
		foodDetail
	},
};
</script>
<style>
.goods{
	position: absolute;
	top:174px;
	bottom: 48px;
	display: flex;
	width: 100%;
	overflow: hidden;
}
.menu-wrapper{
	flex:0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.foods-wrapper{
	flex:1;
}
.menu-item{
	text-align: center;
	vertical-align: middle;
	height: 40px;
	width: 100%;
	line-height: 16px;
	border-bottom: 1px rgba(7,17,27,0.2) solid;
	padding:18px 0 0 0;
}
.current{
	position: relative;
	margin-top: -1px;
	z-index: 10;
	background: #fff;
	font-weight: bold;
}
 .text{
	width: 100%;
	/*vertical-align: bottom;*/
	font-size: 14px;
	/*padding-top: -6px;*/

}
.icon{margin-right: 0;}
.decrease{
	background-image: url('goods/decrease_3@2x.png');	
}
.discount{
	background-image: url('goods/discount_3@2x.png');
}
.special{
	background-image: url('goods/special_3@2x.png');
}
.invoice{
	background-image: url('goods/invoice_3@2x.png');
}
.guarantee{
	background-image: url('goods/guarantee_3@2x.png');
}

/*右侧列表样式*/
.foods-wrapper .title{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color: rgb(147,153,159);
	background-color: #f3f5f7;
}
.food-item{
	margin: 18px;
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(7,17,27,0.2);
	position: relative;
}
.food-item:last-child{
	border: none;
	margin-bottom: 0;
}
.food-item .icon{
	/*margin-right: 32px;*/
}
.food-item .content{
	margin-left: 48px;
}
.content-name{
	margin: 2px 0 8px 0;
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.content-description,.content-extra{
	margin-bottom: 8px;
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.extra-count{margin-right: 4px;}

.content-price{
	font-weight: 700;
	line-height: 24px;
}
.content-price .now{
	margin-right: 8px;
	font-size: 14px;
	font-weight: bold;
	color: rgb(240,20,20);
}
.content-price .old{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}

.cartcontrol-wrapper{
	position: absolute;
	right: 0px;
	bottom: 12px;

}


</style>