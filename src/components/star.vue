<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass"
		 class="star-item" track-by="$index"></span>
	</div>
</template>
<script>
const LENGTH=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off';
export default {
	props:{
		size:{
			type:Number
		},
		score:{
			type:Number
		}
	},
	computed:{
		starType(){
			return 'star-'+this.size
		},
		itemClasses(){
		var result=[];
		var score=Math.floor(this.score*2)/2;
		var hasDecimal=(score%1 !==0);
		var integer=Math.floor(score);
		for(var i=0;i<integer;i++){
			result.push(CLS_ON)
		}
		if(hasDecimal){
			result.push(CLS_HALF);
		}
		while(result.length<LENGTH){
			result.push(CLS_OFF)
		}
		return result;
		}
	}
}
</script>
<style >
.star{
font-size: 0;

} 
.star-item{
	display: inline-block;
	background-repeat: no-repeat;
}
 .star-item{
	width: 20px;
	height: 20px;
	margin-right: 22px;
	background-size: 20px 20px;
}
.star-item:last-child{
	margin-right: 0;
}
.star-48 .on{
	background-image: url('star/star48_on@2x.png');
}
.star-48 .half{
	background-image: url('star/star48_half@2x.png');
}
.star-48 .off{
	background-image: url('star/star48_off@2x.png');
}
.star-36 .star-item{
	width: 15px;
	height: 15px;
	margin-right: 16px;
	background-size: 15px 15px;
}
.star-36 .on{
	background-image: url('star/star48_on@2x.png');
}
.star-36 .half{
	background-image: url('star/star48_half@2x.png');
}
.star-36 .off{
	background-image: url('star/star48_off@2x.png');
}

.star-24 .star-item{
	width: 10px;
	height: 10px;
	margin-right: 3px;
	background-size: 10px 10px;
}
.star-24 .on{
	background-image: url('star/star48_on@2x.png');
}
.star-24 .half{
	background-image: url('star/star48_half@2x.png');
}
.star-24 .off{
	background-image: url('star/star48_off@2x.png');
}

</style>