webpackJsonp([3],{16:function(t,n,e){e(22);var i=e(7)(e(60),e(19),null,null);t.exports=i.exports},17:function(t,n,e){"use strict";var i=e(1),a=e(51),o=e(6);i.a.use(a.a);var s=new a.a({routes:[{path:"/",name:"Search",component:function(t){e.e(0).then(function(){var n=[e(64)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/quiz",name:"Quiz",component:function(t){e.e(1).then(function(){var n=[e(63)];t.apply(null,n)}.bind(this)).catch(e.oe)}}]});s.beforeEach(function(t,n,e){o.a.commit("updateLoadingStatus",{isLoading:!0}),e()}),s.afterEach(function(t){o.a.commit("updateLoadingStatus",{isLoading:!1})}),n.a=s},18:function(t,n,e){e(23);var i=e(7)(e(59),e(20),null,null);t.exports=i.exports},19:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{height:"100%"},attrs:{id:"app"}},[e("loading",{model:{value:t.isLoading,callback:function(n){t.isLoading=n},expression:"isLoading"}}),t._v(" "),e("div",{staticClass:"app-content"},[e("router-view")],1)],1)},staticRenderFns:[]}},20:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading"},[e("div",{staticClass:"weui-mask_transparent"}),t._v(" "),e("div",{staticClass:"weui-toast",style:{position:t.position}},[e("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),e("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},22:function(t,n){},23:function(t,n){},57:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(1),a=e(15),o=e.n(a),s=e(17),u=e(16),r=e.n(u),c=e(6);o.a.attach(document.body),i.a.config.productionTip=!1,new i.a({router:s.a,store:c.a,render:function(t){return t(r.a)}}).$mount("#app-box")},58:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var i="DOCTOR"},59:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}}},6:function(t,n,e){"use strict";var i=e(55),a=e.n(i),o=e(1),s=e(8),u=e(58);o.a.use(s.b);var r=new s.b.Store({state:{isLoading:!1,doctor:""},mutations:a()({updateLoadingStatus:function(t,n){t.isLoading=n.isLoading}},u.a,function(t,n){t.doctor=n.doctor})});n.a=r},60:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(56),a=e.n(i),o=e(18),s=e.n(o),u=e(8);n.default={data:function(){return{}},components:{Loading:s.a},computed:a()({},e.i(u.a)({isLoading:function(t){return t.isLoading}})),create:function(){console.log(this.isLoading)},methods:{}}}},[57]);
//# sourceMappingURL=app.9ad2136f026ff0a5a1ad.js.map