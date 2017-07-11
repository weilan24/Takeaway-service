<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img :src="seller.avatar" width="64" height="64">
    	</div>
		<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="description">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<!-- 假设supports存在的话 -->
    		<div v-if="seller.supports" class="supports">
    			<!-- 动态绑定 -->
    			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<div v-if="seller.supports" class="support-count" @click="showDetail()">
    		<span class="count">{{seller.supports.length}}个</span>
    	</div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
    	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>

    <div v-show="datailShow" class="detail">
    	<!-- 使用sticky-footers -->
    	<div class="detail-wrapper clearfix">
    		<div class="detail-main">
    			<h1 class="name">{{seller.name}}</h1>
    			<div class="star-wrapper">
    				<star :size="48" :score="seller.score"></star>
    			</div>
    			<div class="detail-title">
    				<div class="line"></div>
    				<div class="text">优惠信息</div>
    				<div class="line"></div>
    			</div>
    			<ul v-if="seller.supports" class="detail-supports">
    				<li class="detail-support-item" v-for="(item,index) in seller.supports">
    					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
    					<span class="text">{{seller.supports[index].description}}</span>
    				</li>
    			</ul>
    			<div class="detail-title">
    				<div class="line"></div>
    				<div class="text">商家公告</div>
    				<div class="line"></div>
    			</div>
    			<div class="bulletin">
    				<p class="content">{{seller.bulletin}}</p>
    			</div>
    		</div>
    	</div>
    	<div class="detail-close" @click="hideDetail()">
    		<span class="detail-close-icon" > </span>
    	</div>
    </div>
  </div>
</template>

<!-- <script type="text/ecmascript-6"> -->
<script>
import star from './star.vue'
  export default {
  	props:{
  		seller:{
  			type: Object
  		}
  	},
  	data(){
  		return{
  			datailShow:false,
  		};  
  	},
  	methods:{
  		showDetail(){
  			return this.detailShow=true;
  		},
  		hideDetail(){
  			return this.detailShow=false;
  		}
  	},
  	created(){
  		this.classMap = ['decrease','discount','special','invoice','guarantee'];
  	},
  	components:{
  		star// 注册star
  	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
body.html{
	line-height: 1;
	font-weight: 200;
	/*系统会识别第一位字体，如果识别不了，往后识别*/
	font-family: 'PingFang','STHeitiSC-Light','Helvetica-Light';
}
.clearfix{
	display: inline-block;
	overflow: hidden;
}
.header{
	color: #fff;
	position: relative;
	background: rgba(7,17,27,0.5);
}
.content-wrapper{
	padding: 24px 12px 16px 24px;
	position: relative;
}
.avatar{
	display: inline-block;
}
.avatar img{
	border-radius: 4px;
}
.content{
	display: inline-block;
	margin-left: 16px;
	font-size: 14px;
	vertical-align: top;
}
.title{
	margin: 2px 0 8px 0;
}
.brand{
	display: inline-block;
	vertical-align: top;
	width: 30px;
	height: 18px;
	background-image: url('header/brand@2x.png');
	background-size:30px 18px ;
	background-repeat: no-repeat;
}
.name{
	margin-left: 6px;
	font-size: 16px;
	line-height: 18px;
	font-weight: bold;
}
.description{
	margin-bottom: 10px;
	line-height: 12px;
	font-size: 12px;

}
.icon{
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 4px;
	background-size: 12px;
	background-repeat: no-repeat;
} 
.decrease{
	background-image: url('header/decrease_1@2x.png');	
}
.discount{
	background-image: url('header/discount_1@2x.png');
}
.special{
	background-image: url('header/special_1@2x.png');
}
.invoice{
	background-image: url('header/invoice_1@2x.png');
}
.guarantee{
	background-image: url('header/guarantee_1@2x.png');
}
.supports .text{
	font-size: 12px;
	line-height: 12px;
	vertical-align: top;
}
.support-count{
	position: absolute;
	right: 12px;
	bottom: 24px;
	padding: 0 8px;
	height: 24px;
	width: 30px;
	line-height: 24px;
	border-radius: 14px;
	background: rgba(0,0,0,0.2);
	text-align: left;
	font-size: 10px;
}
.support-count .count{
	display: inline-block;
	width: 28px;
	height: 24px;
	margin-right: 4px;
	background-size: 12px;
	background-repeat: no-repeat;
	background-image:url('header/more.png'); 
	background-position: right center;
}
.support-arrow-tight{
}
.bulletin-wrapper{
	height: 28px;
	line-height: 28px;
	padding: 0 22px 0 12px;
	white-space: nowrap;/*折行*/
	overflow: hidden;
	text-overflow:ellipsis;
	/*父元素设置font-size：0px;能消除子元素的空白间隙*/
	/*font-size: 0px;*/
	position: relative;
	background: rgba(7,17,27,0.1);
	font-size: 12px;
}
.bulletin-title{
	display: inline-block;
	vertical-align: top;
	margin-top: 8px;
	width: 22px;
	height: 12px;
	background-image: url('header/bulletin@2x.png') ;
	background-size: 22px 12px;
	background-repeat: no-repeat;
}


.bulletin-wrapper .icon-keyboard_arrow_right{
	position: absolute;
	font-size: 10px;
	right: 12px;
	top: 8px;
}
.background{
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: -1;
	filter:blur(10px);/*模糊化*/
}
.detail{
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100%;
	height:100%;
	overflow: auto;
	background: rgba(7,17,27,0.8);
}
/*弹出层*/
.detail-wrapper{
	min-height: 100%;/*设置最小高度*/
	width: 100%;
}
.detail-main{
	margin-top: 64px;
	padding-bottom: 64px;
}
.detail-main .name{
	line-height: 16px;
	text-align: center;
	font-size: 16px;
	font-weight:700
}
.detail-close{
	position: relative;
	width: 34px;
	height: 20px;
	margin:-64px auto;
	padding-top: 10px;
	clear: both;
	/*font-size: 12px; */
}
.detail-close-icon{
	display: inline-block;
	width: 28px;
	height: 28px;
	background-size: 28px;
	background-repeat: no-repeat;
	background-image:url('close.png'); 	 
}

.star-wrapper{
	margin-top: 18px;
	text-align: center;
	padding: 2px 0;
}
.detail-title{
	display: flex;
	width: 80%;
	margin: 30px auto 24px auto;
}
.detail-title .line{
	flex:1;
	position: relative;
	top: -6px;
	border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail-title .text{
	padding: 0 14px;
	font-weight: 700;
	font-size: 14px;
}
.detail-supports{
	width: 80%;
	margin: 0 auto;

}
.detail-support-item{
	padding: 0 12px;
	margin-bottom: 12px;
	font-size: 0;
}
.detail-support-item .icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: top;
	margin-right: 6px;
	background-size: 16px 16px;
	background-repeat: no-repeat;

}
.detail-support-item .text{
	line-height: 12px;
	font-size: 12px;

}
.bulletin{
	width: 80%;
	margin: 0 auto;
}
.bulletin .content{
	padding: 0 12px;
	line-height: 24px;
	font-size: 12px;
}



</style>
