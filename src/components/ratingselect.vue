<template>
<div class="ratingselect">
	<div class="rating-type">
		<span @click="select(2,$event)" class="block-positive" :class="{'block-active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
		<span @click="select(0,$event)"  class="block-positive" :class="{'block-active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
		<span @click="select(1,$event)"  class="block-negative" :class="{'block-active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
	</div>
	<div @click="toggleContent" class="switch" :class="{'switch-active':onlyContent}">
		<span class="icon-check-circle"></span>
		<span class="text">只看有内容的评价</span>
	</div>
</div>
</template>
<script>
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
export default{
	props:{
		ratings:{
			type:Array,
			default(){
				return [];
			}
		},
		onlyContent:{
			type:Boolean,
			default:false
		},
		selectType:{
			type:Number,
			default:ALL
		},
		desc:{
			type:Object,
			default(){
				return{
					all:'全部',
					positive:'满意',
					negative:'不满意'
				};
			}
		}
	},
	computed:{
		positives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===POSITIVE;
			});
		},
		negatives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===NEGATIVE;
			});
		}
	},
	methods:{
		select(type,event){
			if(!event._constructed){
				return;
			}
			this.selectType=type;
			this.$emit('ratingtypeSelect',type);
		},
		toggleContent(event){
			if(!event._constructed){
				return;
			}
			this.onlyContent=!this.onlyContent;
			this.$emit('contentToggle',this.onlyContent);
		}
	}
};
</script>
<style>
.rating-type{
	padding:18px 0;
	margin: 0 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	font-size: 0;
}
.block-positive{
	display: inline-block;
	padding: 8px 12px;
	margin-right: 8px;
	border-radius: 1px;
	color: #000;
	font-size: 12px;
	line-height: 16px;
	background: rgba(0,160,220,0.2);
}
.block-negative{
	display: inline-block;
	padding: 8px 12px;
	margin-right: 8px;
	border-radius: 1px;
	color: #000;
	font-size: 12px;
	line-height: 16px;
	background: rgba(77,85,93,0.2);
}
.block .count{
	margin-left: 2px;
	font-size: 8px;
}
.block-active{
	color: #fff;
	background: rgb(0,160,220);
}

.switch{
	padding: 12px 18px;
	line-height: 24px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	color: rgb(147,153,159);
	font-size: 0;

}
.switch .text{
	font-size: 12px;
	vertical-align: top;
}
.switch .icon-check-circle{
	display: inline-block;
	margin-right: 6px;
	width: 24px;
	height: 24px;
	background-image: url('check.png');
	background-size: 24px;
	background-repeat: no-repeat;
}
.switch-active .icon-check-circle{
	background-image: url('check-on.png');
}
</style>