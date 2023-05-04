import Vue from 'vue';

var modeData = {
  modeStyle:{
    background: 'url("C:/Users/LINDA/Desktop/web前端教育訓練/lotterystation/src/assets/mode_2.png")'
  }
}

// 更改選擇模式
var mode = new Vue({
  el:"#mode",
  data(){
    return{
      modeStyle:{
        background: 'url("C:/Users/LINDA/Desktop/web前端教育訓練/lotterystation/src/assets/mode_2.png")'
      }      
    }
  }
})
mode.changeMode(modeStyle);

// 更改選擇距離
//var dist = new Vue({
  //el:"#dist",
  //selectedDist:this.name
//})
//dist.changeDistance(selectedDist);

//export default {
  //methods:{
    //changeMode(img) {
      //alert("changeMode");
      //return{
        //img
      //},
      //changeDistance(){
        //alert("changeDist");
      //}
    //}
  //} 
//}
