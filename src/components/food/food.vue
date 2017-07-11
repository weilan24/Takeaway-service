<template>
<div v-show="showFlag" class="food">
	<div class="food-content">
		<div class="image-header">
			<img :src="food.image">
			<div class="icon-back" @click="hide">
				<span class="icon-arrow_left"></span>
			</div>
		</div>
		<div class="detail-content">
			<h1 class="title">{{food.name}}</h1>
			<div class="food-detail">
				<span class="sell-count">月售{{food.sellCount}}份</span>
				<span class="rating">好评率{{food.rating}}</span>
			</div>
			<div class="price">
				<span class="now">￥{{food.price}}</span>
				<span class="old" v-show="food.oldPrice"> ￥{{food.oldPrice}}</span>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default{
	props:{
		food:{
			type:Object
		},
	},
	data(){
		return{
			showFlag:true
		}
	},
	methods:{
		show(){
			this.showFlag=true;
		},
		hide(){
			this.showFlag=false;
		}
	}
};
</script>
<style>
.food{
	position: fixed;
	left: 0;
	top: 0;
	bottom: 48px;
	z-index: 101px;
	width: 100%;
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
.food-content-list{

}
</style>