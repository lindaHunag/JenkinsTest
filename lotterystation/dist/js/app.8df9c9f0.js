(function(t){function e(e){for(var n,l,s=e[0],r=e[1],c=e[2],d=0,p=[];d<s.length;d++)l=s[d],Object.prototype.hasOwnProperty.call(a,l)&&a[l]&&p.push(a[l][0]),a[l]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);A&&A(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],n=!0,s=1;s<o.length;s++){var r=o[s];0!==a[r]&&(n=!1)}n&&(i.splice(e--,1),t=l(l.s=o[0]))}return t}var n={},a={app:0},i=[];function l(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,l),o.l=!0,o.exports}l.m=t,l.c=n,l.d=function(t,e,o){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(o,n,function(e){return t[e]}.bind(null,n));return o},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],r=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var A=r;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},4090:function(t,e,o){"use strict";o("d35d")},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("body",{class:{mapMode:t.mapMode}},[n("div",{attrs:{id:"app"}},[n("div",{class:{titleAllMapMode:t.mapMode,titleAllListMode:!t.mapMode}},[n("div",{staticClass:"title"},[t._v("附近投注站")]),n("div",{class:{modeMapMode:t.mapMode,modeListMode:!t.mapMode},style:{backgroundImage:"url("+t.modeImg+")"},attrs:{id:"mode"},on:{click:t.changeMode}})]),t.mapMode?n("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedDist,expression:"selectedDist"}],staticClass:"selectDist",attrs:{id:"selectDist"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedDist=e.target.multiple?o:o[0]},function(e){return t.changeDistance(e)}]}},[n("option",{staticClass:"dist",attrs:{value:"1"}},[t._v("1公里")]),n("option",{staticClass:"dist",attrs:{value:"2"}},[t._v("2公里")]),n("option",{staticClass:"dist",attrs:{value:"5"}},[t._v("5公里")])]):t._e(),n("ul",{class:{lotteryInfoAllMapMode:t.mapMode,lotteryInfoAllListMode:!t.mapMode},attrs:{id:"lotteryInfoAll"}},t._l(t.stationInfo,(function(e,o){return n("li",{key:o,class:{lotteryInfoMapMode:t.mapMode,lotteryInfoListMode:!t.mapMode}},[n("table",{class:{lotteryInfoDetailMapMode:t.mapMode,lotteryInfoDetailListMode:!t.mapMode}},[n("tr",[n("td",{staticClass:"name"},[t._v(t._s(e.name))]),n("td",{staticClass:"locationDist"},[t._v(t._s(e.distance)+"公里")])]),n("tr",[n("td",{staticClass:"address"},[t._v(t._s(e.address))]),n("td",{staticClass:"navigation"},[n("button",{staticClass:"navigationBtn",on:{click:t.getDirection}},[t._v("導航")])])])])])})),0),t.mapMode?n("GmapMap",{staticStyle:{width:"100%",height:"650px","margin-top":"24px"},attrs:{center:t.center,zoom:16,"map-type-id":"roadmap",options:t.options}},t._l(t.stationInfo,(function(t,e){return n("GmapMarker",{key:e,attrs:{icon:{url:o("9b25"),scaledSize:{width:40,height:58}},position:{lat:parseFloat(t.lat),lng:parseFloat(t.lon)},clickable:!1,draggable:!1}})})),1):t._e()],1)])},i=[],l=o("b888"),s=o.n(l),r=o("ceda"),c=o.n(r),A=o("bc5c"),d=o.n(A),p=o("755e"),u=o("bc3a"),m=o.n(u);n["a"].use(p,{load:{key:"AIzaSyApEA9EftcZTKkjUacMSeOKAkNTrhHcgH4"},installComponents:!0});var f={name:"AddGoogleMap",data:function(){return{marker:{position:{lat:25.084987946164247,lng:121.57745364602187}},center:{lat:25.0810263244162,lng:121.57520030000002},options:{mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,fullscreenControl:!1,disableDefaultUI:!0,scrollwheel:!0,clickableIcons:!1},selectedDist:1,modeImg:s.a,mapMode:!0,markerIcon:d.a,stationInfo:[],stationName:"",stationLat:"",stationLng:"",stationAddress:"",stationDist:"",firstPosition:!1,startX:0,endX:0,slideStyle:{left:0,transition:"none"}}},mounted:function(){this.initMap()},methods:{initMap:function(){var t=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){t.center.lat=parseFloat(e.coords.latitude),t.center.lng=parseFloat(e.coords.longitude)}),(function(t){})),this.getLotteryStationPosition()},getLotteryStationPosition:function(){var t=this,e={"Content-Type":"application/json;charset=utf-8",Encrypt:"0"},o={lat:this.center.lat,lon:this.center.lng,distance:1};m.a.post("https://smuat.megatime.com.tw/taiwanlottery/api/Home/Station",o,{headers:e}).then((function(e){console.log(e.data),t.stationInfo=e.data.content.list})).catch((function(t){console.log(t),alert("取得投注站資訊失敗"),alert(t)}))},changeMode:function(){this.modeImg===s.a?(this.modeImg=c.a,this.mapMode=!1):(this.modeImg=s.a,this.mapMode=!0)},changeDistance:function(t){var e=this;this.selectedDist=t.target.value;var o={"Content-Type":"application/json;charset=utf-8",Encrypt:"0"},n={lat:25.0810263244162,lon:121.57520030000002,distance:parseInt(this.selectedDist)};m.a.post("https://smuat.megatime.com.tw/taiwanlottery/api/Home/Station",n,{headers:o}).then((function(t){console.log(t.data),e.stationInfo=t.data.content.list})).catch((function(t){console.log(t),alert("串接失敗"),alert(t)}))},getDirection:function(){}}},g=f,C=(o("4090"),o("2877")),K=Object(C["a"])(g,a,i,!1,null,null,null),v=K.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(v)}}).$mount("#app")},"9b25":function(t,e,o){t.exports=o.p+"img/position.f79c14dd.png"},b888:function(t,e){t.exports="data:image/png;base64,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"},bc5c:function(t,e,o){t.exports=o.p+"img/position_center.9c91f8c2.png"},ceda:function(t,e){t.exports="data:image/png;base64,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"},d35d:function(t,e,o){}});
//# sourceMappingURL=app.8df9c9f0.js.map