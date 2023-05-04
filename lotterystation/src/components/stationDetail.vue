<script>
export default {
  name: 'stationDetail'
}
</script>

<style> 
  html,
  body {
    width: 100%;
    height: 100%; 
    padding: 0;
    margin: 0;
  }
  .title{
    position: relative;
    height: 6%;
    width: 100%;
    text-align: center;
    font-size: 22px;
    margin-top: 10px;
    color: orangered;
    /*border: 1px solid red;*/
    background: none;
  }
  .mode{
    position: relative;
    height: 37px;
    width: 85px;
    margin-top: -2px;
    margin-right: 10px;
    float: right;
    /*border: 1px solid red;*/
    background-image: url("/img/mode_1.png");
    background-size: 100% 100%;
    background-repeat:no-repeat;
    box-shadow: 1px 1px 3px 2px rgba(0.1, 0.1, 0.1, 0.1);
    cursor: pointer;
  }
#map {
    height: 94%;
    width: 100%;
    z-index: 0;
}
</style>

<template>
<div>
    <div class="title">
        附近投注站
        <div class="mode" id="mode" v-on:click="changeMode"></div>
    </div>
    <div class="selectDist" id="selectDist">
        <button id = "dist" class="dist" value="1">1公里</button>
        <div class="selectDist-content">
            <div value="2" v-on:click="changeDistance">2公里</div>
            <div value="5" v-on:click="changeDistance">5公里</div>
        </div>
    </div>
    <!--輪播-->
    <div id="lotteryInfoAll" class="lotteryInfoAll">
    </div>
    <!--地圖-->
    <div id="map"></div>
</div>
</template>