import Vue from 'vue';
import lotteryStation from './lotteryStation.vue';
//import * as VueGoogleMaps from 'vue2-google-maps';
//import App from './App.vue'

Vue.config.productionTip = false

//new Vue({
  //render: h => h(App),
//}).$mount('#app')

new Vue({
  render: h => h(lotteryStation),
}).$mount('#app')

//Vue.use(VueGoogleMaps,{
  //load:{
    //key:"AIzaSyApEA9EftcZTKkjUacMSeOKAkNTrhHcgH4"
  //}
//})