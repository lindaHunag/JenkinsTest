<template>
<body :class="{'mapMode': mapMode}">
  <div id="app">
      <div :class="[mapMode ? 'titleAllMapMode':'titleAllListMode']">
        <div class="title">附近投注站</div>
        <div :class="[mapMode ? 'modeMapMode': 'modeListMode']" id="mode" @click="changeMode" :style="{backgroundImage: 'url(' + modeImg + ')'}">
        </div>
      </div>
      <select v-model="selectedDist" class="selectDist" id="selectDist" @change="changeDistance($event)" v-if="mapMode">
        <option class="dist" value=1>1公里</option>
        <option class="dist" value=2>2公里</option>
        <option class="dist" value=5>5公里</option>
      </select>
    <!--投注站資訊-->
      <!-- <ul :class="[mapMode ? 'lotteryInfoAllMapMode' : 'lotteryInfoAllListMode']">
        <li :class="[mapMode ? 'lotteryInfoMapMode': 'lotteryInfoListMode']" v-for="(station, index) in stationInfo" :key="index">
          <table :class="[mapMode ? 'lotteryInfoDetailMapMode': 'lotteryInfoDetailListMode']">
          <tr>
          <td class="name">{{station.name}}</td>
          <td class="locationDist">{{station.distance}}公里</td>
          </tr>
          <tr>
          <td class="address">{{station.address}}</td>
          <td class="navigation"><button class="navigationBtn" @click="getDirection">導航</button></td>
          </tr>
        </table>
        </li>
      </ul> -->
      <swiper :class="[mapMode ? 'lotteryInfoAllSlideMapMode' : 'lotteryInfoAllSlideListMode']">
          <swiper-slide :class="[mapMode ? 'lotteryInfoSlideMapMode' : 'lotteryInfoSlideListMode']" v-for="(station, index) in stationInfo" :key="index">
            <div class="name">{{station.name}}</div>
            <div class="locationDist">{{station.distance}}公里</div>
            <div class="address">{{station.address}}</div>
            <div class="navigation"><button class="navigationBtn" @click="getDirection">導航</button></div>
          </swiper-slide>
          <swiper-slide :class="[mapMode ? 'lotteryInfoSlideMapMode' : 'lotteryInfoSlideListMode']">Slide 2</swiper-slide>
      </swiper>
    <!--地圖-->
    <div id="map">
    </div>
    <GmapMap
      :center="center"
      :zoom="16"
      map-type-id="roadmap"
      :options="options"
      style="width:100%; height: 100vh; margin-top: 24px;" v-if="mapMode">
      <GmapMarker v-for="(station, index) in stationInfo" :key="index" @click="showInfo"
        :icon='{
          url:require("./assets/position.png"),
          scaledSize:{width:40, height: 58}
          }'
        :position="{lat: parseFloat(station.lat), lng: parseFloat(station.lon)}"
        :clickable="true"
        :draggable="false"/>
    </GmapMap>
  </div>
</body>  
</template>

<script>
import Vue from 'vue';
import modeImg from './assets/mode_1.png';
import modeImg2 from './assets/mode_2.png'
import markerIcon from './assets/position_center.png'
/* import google from 'google' */
import * as VueGoogleMaps from 'vue2-google-maps';
import axios from "axios";
/* import VueAwesomeSwiper from 'vue-awesome-swiper' */
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
var nowLat,nowLng;

Vue.use(VueGoogleMaps,{
  load:{
    key:"AIzaSyApEA9EftcZTKkjUacMSeOKAkNTrhHcgH4",
    //libraries:"places"
  },
  installComponents: true
});

export default {
  name:"lotteryStation",
  data(){
    return{
      map: null,
      marker: {position:{lat: 25.084987946164247, lng: 121.57745364602187}},
      center: {lat: 25.0810263244162, lng: 121.57520030000002},
      options: {
        mapTypeControl: false, // 是否能切換地圖樣式
        scaleControl: false, // 是否顯示地圖比例尺
        streetViewControl: false, // 是否能使用街景功能
        fullscreenControl: false, // 是否開啟全螢幕地圖功能
        disableDefaultUI: true,
        scrollwheel: true, // 是否支援滑鼠滾輪
        clickableIcons: false // 地圖標記是否可點擊
      },
      selectedDist: 1,
      modeImg: modeImg,
      mapMode: true,
      markerIcon: markerIcon,
      stationInfo: [],
      stationLat: "",
      stationLng: "",
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted(){
    this.initMap();
  },
  // 定義方法
  methods:{
    // 初始化地圖
    initMap(){
      // 取得定位
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(nowPosition => {
          nowLat = nowPosition.coords.latitude;
          nowLng = nowPosition.coords.longitude;
          this.center = {lat: parseFloat(nowLat), lng: parseFloat(nowLng)};
        }, err => {
          alert("取得當前位置失敗");
          alert(err);
        });
      }
      // 初始化地圖
        /* this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: this.center
        }); */
      //alert("當前位置: " + this.center);
      this.getLotteryStationPosition();
    },
    // 取得投注站資訊
    getLotteryStationPosition(){
      let headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Encrypt': "0"
      }
      let searchData = {
        "lat": this.center.lat,
        "lon": this.center.lng,
        "distance": 1
      }
      axios.post("https://smuat.megatime.com.tw/taiwanlottery/api/Home/Station",
        searchData,{headers})
      .then((res) => {
        console.log(res.data);
        //alert(res.data.content.list);
        //alert("中心位置" + this.center.lat);
        this.stationInfo = res.data.content.list;
        //alert(this.stationInfo);
        //this.stationName = this.stationInfo[0].name;
      })
      .catch((err) =>{
        console.log(err);
        alert("取得投注站資訊失敗");
        alert(err);
      }) 
    },
    // 更改選擇模式
    changeMode() {
      //alert("changeMode");
      if (this.modeImg === modeImg) {
        this.modeImg = modeImg2;
        this.mapMode = false;
      } else {
        this.modeImg = modeImg;
        this.mapMode = true;
      }  
    },
    // 更改選擇距離
    changeDistance(e){
      //alert("changeDist");
      // 取得定位
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(nowPosition => {
          nowLat = nowPosition.coords.latitude;
          nowLng = nowPosition.coords.longitude;
          this.center = {lat: parseFloat(nowLat), lng: parseFloat(nowLng)};
        }, err => {
          alert("取得當前位置失敗");
          alert(err);
        });
      }
      //alert("當前位置: " + this.center);
      this.selectedDist = e.target.value;
      //alert(e.target.value);
      // 串接投注站資訊
      let headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Encrypt': "0"
      }
      let searchData = {
        "lat": this.center.lat,
        "lon": this.center.lng,
        "distance": parseInt(this.selectedDist)
      }
      axios.post("https://smuat.megatime.com.tw/taiwanlottery/api/Home/Station",
        searchData,{headers})
      .then((res) => {
        console.log(res.data);
        //alert(res.data.content.list);
        //alert(this.selectedDist);
        this.stationInfo = res.data.content.list;
      })
      .catch((err) =>{
        console.log(err);
        alert("串接失敗");
        alert(err);
      })
    },
    // 導航
    getDirection(){
      
    },
    // 投注站資訊移動
    showInfo(){

    }
  }
}

</script>

<style>
  html,
  body {
    width: 100%;
    height: 100%; 
    padding: 0;
    margin: 0;
    position: relative;
  }
  .mapMode{
    width: 100%;
    height: 100%; 
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  .titleAllMapMode{
    position: relative;
    z-index: 40;
    height: 30px;
    width: 100%;
    top: 10px;
    margin-bottom: 10px;
    /*border: 1px solid red;*/
  }
  .modeMapMode{
    position: relative;
    height: 37px;
    width: 85px;
    margin-top: -2px;
    margin-right: 10px;
    float: right;
    background-size: 100% 100%;
    background-repeat:no-repeat;
    box-shadow: 1px 1px 3px 2px rgba(0.1, 0.1, 0.1, 0.1);
    cursor: pointer;
  }
  .titleAllListMode{
    position: fixed;
    z-index: 40;
    height: 58px;
    width: 100%;
    line-height: 58px; /*行高(垂直置中)*/
    top: 0px;
    margin-bottom: 10px;
    background: white;
  }
  .modeListMode{
    position: relative;
    height: 37px;
    width: 85px;
    margin-top: 10px;
    margin-right: 10px;
    float: right;
    background-size: 100% 100%;
    background-repeat:no-repeat;
    box-shadow: 1px 1px 3px 2px rgba(0.1, 0.1, 0.1, 0.1);
    cursor: pointer;
  }
  .title{
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: rgb(255, 136, 0);
    /*border: 1px solid red;*/
    font-weight:bold;
  }
/*#map {
    height: 600px;
    width: 98%;
    z-index: 0;
}*/

/*距離選擇*/
.selectDist{
  position: absolute;
  top: 100px;
  right: 3%;
  z-index: 20;
  width: 18%;
  height: 5%;
  display: inline-block;
  /*border: 1px solid orangered;*/
  border-radius: 5px;
  /*下拉箭頭設定*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgb(255, 136, 0);
  opacity: 0.8;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.dist{
  width: 100%;
  height: 200%;
  border: none;
  background-color: rgb(255, 136, 0);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
}
.selectDist option:hover{
  background-color: rgb(255, 136, 0);
}
.selectDist:hover{
  display: block;
}
.selectDist:hover .dist{
  background-color: rgb(255, 136, 0);
}

/*投注站資料*/
/*地圖模式*/
.lotteryInfoAllSlideMapMode{
  position: absolute;
  z-index: 20;
  bottom: 5%;
  left: 5%;
  width: 90%;
  height: 100px;
  /* border: 1px solid red; */
}
.lotteryInfoSlideMapMode {
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgb(255, 136, 0);
  height: 100px;
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.lotteryInfoAllSlideListMode{
  position: relative;
  z-index: 20;
  width: 90%;
  height: 100%;
  top: 60px;
  left: 5%;
  padding: 0;
  overflow-y: auto; /*可滑動*/
  overflow-x: hidden;
}
.lotteryInfoSlideListMode{
  height: 100px;
  border-radius: 10px;
  background-color: white;
  /* border: 1px solid orangered; */
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
.name{
  width: 65%;
  height: 30px;
  padding-top: 15px;
  padding-left: 30px;
  color: rgb(255, 136, 0);
  font-size: 20px;
  font-weight:bold;
  float: left;
  /* border: 1px solid red; */
}
.address{
  width: 65%;
  padding-left: 30px;
  padding-top: 15px;
  color: balck;
  font-size: 15px;
  font-weight:bold;
  float: left;
  /* border: 1px solid red; */
}
.locationDist{
  width: 30%;
  color: rgb(255, 136, 0);
  font-size: 15px;
  text-align: center;
  padding-top: 20px;
  font-weight:bold;
  float: left;
  /* border: 1px solid red; */
}
.navigation{
  width: 30%;
  height: 40px;
  float: left;
  padding-top: -10px;
  position: relative;
  /* border: 1px solid red; */
}
.navigationBtn{
  width: 60px;
  height: 40px;
  position: absolute; 
  top: 0;             
  bottom: 0;           
  left: 0;        
  right: 0;
  margin: auto;
  background-color: rgb(255, 145, 0);
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
/*地圖模式*/
/* .lotteryInfoAllMapMode{
  position: absolute;
  z-index: 20;
  bottom: 5%;
  right: 0;
  width: 100%;
  height: 120px; */
  /*white-space: nowrap; /*不會換行*/
  /*overflow-x: auto; /*可滑動*/
  /*overflow-y: hidden;
  /* border: 1px solid red; */
/* } */

/*.lotteryInfoAll::-webkit-scrollbar{ /*可隱藏滾動條*/
  /*display: none;
}*/
/* .lotteryInfoMapMode{
  display: inline-block; */
  /* border: 1px solid red; */
  /* width: 100%;
  height: 100%;
} */
/* .lotteryInfoDetailMapMode{
  width: 90%;
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgb(255, 136, 0);
  margin-left: 5%;
  height: 100%;
} */
/*清單模式*/
/* .lotteryInfoAllListMode{
  position: relative;
  z-index: 20;
  width: 100%;
  height: 100%;
  top: 60px;
  left: 0;
  padding: 0; */
  /*overflow-y: auto; 可滑動*/
  /* overflow-x: hidden; */
  /* border: 1px solid red; */
/* } */
/* .lotteryInfoListMode{
  width: 90%;
  height: 100%;
  margin-bottom: 2%;
  display: inline-block;
  margin-left: 5%; */
  /* border: 1px solid blue; */
/* } */
/* .lotteryInfoDetailListMode{
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: white; */
  /*border: 1px solid orangered;*/
  /* box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.1);
} */
/*.name{
   width: 70%;
  height: 10%;
  padding-left: 3%;
  padding-top: 10px;
  color: rgb(255, 136, 0);
  font-size: 20px;
  font-weight:bold;
  border: 1px solid red; 
}*/
/*.address{
  padding-left: 3%;
  color: balck;
  font-size: 15px;
  font-weight:bold;
  /* border: 1px solid red; 
}*/
/*.locationDist{
  width: 30%;
  color: rgb(255, 136, 0);
  font-size: 15px;
  text-align: center;
  padding-top: 10px;
  font-weight:bold;
  /* border: 1px solid red; 
}*/
/*.navigation{
  position: relative;
}
.navigationBtn{
  width: 80%;
  height: 80%;
  position: absolute; 
  top: 0;             
  bottom: 0;           
  left: 0;        
  right: 0;
  margin: auto;
  background-color: rgb(255, 145, 0);
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}*/

</style>
