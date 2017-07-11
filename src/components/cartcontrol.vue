<template>
<div class="cartcontrol">
	<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
		<span class="cart-descrease-icon"></span>
	</div>
	<div class="cart-count" v-show="food.count>0">
		{{food.count}}
	</div>
	<div class="cart-add" @click.stop.prevent="addCart">
		<span class="cart-add-icon"></span>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
export default{
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		addCart(event){
			if(!event._constructed){
				return;
			}
			if(!this.food.count){
				Vue.set(this.food,'count',1)
			}else{
				this.food.count++;
			}
		},
		decreaseCart(event){
			if(!event._constructed){
				return;
			}
			if(this.food.count){
				this.food.count--;
			}
		},
	}
};
</script>
<style>
.cartcontrol{

}
.cart-decrease,.cart-add{
	display: inline-block;
	padding: 6px;  /*增加padding，可以增加点击区域*/
	width: 24px;
	height: 24px;
}
.cart-descrease-icon,.cart-add-icon{
	display: inline-block;
	width: 28px;
	height: 28px;
	background-size: 24px;
	background-position: center;
	background-repeat: no-repeat;
}
.cart-descrease-icon{
	background-image: url('des.png'); 
}
.cart-add-icon{
	background-image: url('add.png'); 
}
.cart-count{
	display: inline-block;
	vertical-align:bottom;
	width: 20px;
	height: 24px;
	padding: 6px 0;
	line-height: 24px;
	text-align: center;
	font-size: 12px;
	color: rgb(147,153,159);
}

</style>