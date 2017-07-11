<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 保留组建切换状态 -->
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
</template>

<script>
  import header from './components/header'

  
  const ERR_OK=0;

  export default {
    data(){
      return{
        seller:{}
      };
    },
    created(){
      this.$http.get('/api/seller').then((response) => {
        response=response.body;
        if(response.errno===ERR_OK){
          this.seller=response.data;
          console.log(this.seller);
        }
      });
    },
    components:{
      'v-header':header

    }
  }
</script>

<style>
 /*display:flex;弹性布局*/
  .tab{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
  }
  .tab:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;/*相对于父元素百分百宽度*/
    border-top:1px solid rgba(7,17,27,0.1);
    content: '';
  }
  @media (-webkit-min-device-pixel-ratio:1.5),(min-device-piel-ratio:1.5){
    .tab:after{
      -webkit-transform:scaleY(0.7);
      transform:scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-ratio:2),(min-device-piel-ratio:2){
    .tab:after{
      -webkit-transform:scaleY(0.5);
      transform:scaleY(0.5);
    }
  }
 
  .tab-item{
    float: left;
    width: 33%;
    text-align: center;
  }
  .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .tab-item .active{
    color: rgb(240,20,20); 
  }
  


</style>
