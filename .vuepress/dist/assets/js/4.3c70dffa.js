(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{350:function(e,t,n){},352:function(e,t,n){},353:function(e,t,n){},354:function(e,t,n){},355:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=355},356:function(e,t,n){},416:function(e,t,n){"use strict";n(350)},417:function(e,t,n){"use strict";n(352)},418:function(e,t,n){"use strict";n(353)},420:function(e,t,n){"use strict";n(354)},423:function(e,t,n){"use strict";n.r(t),n.d(t,"getOne",(function(){return r})),n.d(t,"getStyles",(function(){return s}));n(9),n(319),n(163),n(69),n(173),n(11),n(12);var r=function(e,t){return window.fetch("https://wfwf9k3tn7.execute-api.us-west-2.amazonaws.com/production/process/"+(new Date).getTime()+parseInt(1e3*Math.random()),{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify({css:{contentType:"css",id:"css",options:{},syntax:e,version:"default",textInput:t}})}).then((function(e){return e.json()})).then((function(e){return e.success?e.payload.css.errors&&e.payload.css.errors.length?{success:!1,error:e.payload.css.errors.map((function(e){return e.message})).join("\n")}:{success:!0,style:e.payload.css.textOutput}:{success:!1,error:e.errors.map((function(e){return e.message})).join("\n")}}),(function(e){return Promise.resolve({success:!1,error:e.message})}))},s=function(e){return e=e.map((function(e){return e.lang?["scss","sass","less","stylus"].includes(e.lang)?r(e.lang,e.content):Promise.resolve({success:!1,error:""}):Promise.resolve({success:!0,style:e.content})})),Promise.all(e)}},425:function(e,t,n){"use strict";n(356)},452:function(e,t,n){"use strict";n.r(t);var r=n(65),s=n(43),i=(n(101),n(170),n(175),n(97),n(313),n(45),n(9),n(69),n(29),n(314),n(385),n(386),n(396),n(317),n(397),n(398),n(399),n(400),n(344),n(345),n(401),n(402),n(346),n(403),n(347),n(404),n(405),n(406),n(407),n(408),n(409),n(348),n(410),n(411),n(412),n(413),n(349)),o={tabSize:2,mode:"text/x-vue",styleActiveLine:!0,lineNumbers:!0,styleSelectedText:!0,line:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],highlightSelectionMatches:{showToken:/\w/,annotateScrollbar:!0},hintOptions:{completeSingle:!0},keyMap:"sublime",matchBrackets:!0,showCursorWhenSelecting:!0,extraKeys:{Ctrl:"autocomplete"}},a=(n(163),n(414)),c=n.n(a),l=n(323).debounce,u=(n(415),{components:{VueElementLoading:c.a},props:{jsLabs:{type:Array,default:function(){return[]}},js:{type:[Array,String],default:function(){return[]}},cssLabs:{type:Array,default:function(){return[]}},css:{type:[Array,String],default:function(){return[]}},value:{type:Object,required:!0},themeColor:{type:String,default:"#409eff"}},mounted:function(){var e=this;if(this.hasDocument()){var t=this.$refs.iframe,n=t.contentWindow.document,r=this.cssLabs.map((function(e){return'<link rel="stylesheet" href="'.concat(e,'" />')})),s=this.jsLabs.map((function(e){return'<script src="'.concat(e,'"><\/script>')})),i=Array.isArray(this.js)?this.js:[this.js],o=Array.isArray(this.css)?this.css:[this.css],a="\n<!DOCTYPE html>\n  <html>\n    <head>\n      ".concat(r.join("\n"),"\n      <style>").concat(o.join("\n"),"</style>\n      <script src='https://cdn.jsdelivr.net/npm/vue@2.6.11'><\/script>\n      ").concat(s.join("\n"),"\n      <script>").concat(i.join("\n"),'<\/script>\n      <script>\n        // 错误处理\n        var errorHandler = function(error) {\n          var el = document.getElementById(\'error\')\n          el.innerHTML = \'<pre style="color: red">\' + error.stack +\'</pre>\'\n        }\n        Vue.config.warnHandler = function(msg) { errorHandler(new Error(msg)) }\n        Vue.config.errorHandler = errorHandler\n        Vue.config.productionTip = false\n        Vue.config.devtools = false\n      <\/script>\n    </head>\n    <body id="body">\n      <div><pre id="error" style="color: red"></pre></div>\n      <div id="box"></div>\n    </body>\n</html>');n.open(),n.write(a),n.close(),t.onload=function(){e.setHTML(),e.loading=!1},t.error=function(){e.loading=!1}}},data:function(){return{iframe:null,iframeDocument:null,loading:!0}},watch:{value:function(e){this.setHTML(e)}},methods:{hasWindow:function(){var e=this.$refs.iframe;return!(!e||!e.contentWindow)},hasDocument:function(){var e=this.$refs.iframe;return!!(e&&e.contentWindow&&e.contentWindow.document)},changeHeight:function(){var e=this;this.debounceChangeHeight||(this.debounceChangeHeight=l(300,(function(){if(e.iframe&&e.iframeDocument){var t=e.iframe,n=e.iframeDocument;t.style.display="block";var r=n.documentElement.offsetHeight+10;t.style.height=r+"px",e.$refs.preview&&e.$emit("change-height",e.$refs.preview.clientHeight)}}))),this.debounceChangeHeight()},getScript:function(e,t){return" try {\n          var exports = {};\n          ".concat(e,"\n          var component = exports.default;\n          // 如果定义了 template函数, 则无需 template\n          component.template = component.template || ").concat(t,"\n        } catch (error){\n          errorHandler(error)\n        }\n\n        new Vue(component).$mount('#app')\n      ")},setHTML:function(){var e=this,t=this.value,n=t.styles,r=void 0===n?[]:n,s=t.script,i=void 0===s?"":s,o=t.template,a=t.errors;if(this.hasDocument()&&o){var c=this.$refs.iframe,l=c.contentWindow.document;if(l){var u=l.getElementById("error");u&&(a?(u.style.display="block",u.innerText="".concat(a.join("\n"))):u.style.display="none");var d=l.getElementById("box");if(d){var f=l.createDocumentFragment(),p=l.createElement("style");p.type="text/css",p.innerHTML=r.join("\n");var h=l.createElement("div");h.setAttribute("id","app"),i=this.getScript(i,o);var v=l.createElement("script");v.type="text/javascript",v.innerHTML=i,d.innerHTML="",f.appendChild(p),f.appendChild(h),f.appendChild(v),d.appendChild(f),this.iframe=c,this.iframeDocument=l,this.height||this.$nextTick((function(){e.changeHeight(),c.contentWindow.addEventListener("resize",e.changeHeight,!1)}))}}}}},beforeDestory:function(){this.hasWindow()&&this.iframe.contentWindow.removeEventListener("resize",this.changeHeight)}}),d=(n(416),n(20)),f=Object(d.a)(u,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"preview",staticClass:"vue-run-sfc-preview"},[t("vue-element-loading",{attrs:{active:this.loading,spinner:"spinner",color:this.themeColor}}),this._v(" "),t("iframe",{ref:"iframe",staticStyle:{border:"none",height:"150px",width:"100%"},attrs:{sandbox:"allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts",scrolling:"yes",frameborder:"0"}})],1)}),[],!1,null,null,null).exports,p=n(351),h={name:"vue-run-sfc-header",props:{title:String,isExpanded:Boolean,isRow:Boolean,isScreenfull:Boolean},data:function(){return{canScreenfull:p.isEnabled}}},v=(n(417),Object(d.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vue-run-sfc-header",class:{"vue-run-sfc-header-screenfull":e.isScreenfull}},[n("div",{staticClass:"vue-run-sfc-header-title"},[e._v(e._s(e.title))]),e._v(" "),e.isExpanded?n("div",{staticClass:"vue-run-sfc-header-action"},[n("button",{staticClass:"vue-run-sfc-header-button",on:{click:function(t){return e.$emit("reset")}}},[e._v("\n      重置\n    ")]),e._v(" "),n("button",{staticClass:"vue-run-sfc-header-button",on:{click:function(t){return e.$emit("change-row")}}},[e.isRow?n("span",[e._v("上下")]):n("span",[e._v("左右")]),e._v("布局\n    ")]),e._v(" "),e.canScreenfull?n("button",{staticClass:"vue-run-sfc-header-button",on:{click:function(t){return e.$emit("screenfull")}}},[e.isScreenfull?[e._v("退出全屏")]:[e._v("全屏")]],2):e._e()]):e._e()])}),[],!1,null,null,null).exports),m=n(323).throttle,g={name:"vue-run-sfc-control",props:{isScreenfull:{type:Boolean,default:!1},isExpanded:{type:Boolean,default:!1},hovering:{type:Boolean,default:!1},isRow:{type:Boolean,default:!1}},data:function(){return{style:{}}},computed:{controlText:function(){return this.isExpanded?"关闭编辑器":"在线编辑代码"}},methods:{scrollHandler:function(){var e=this.$parent.$refs.wrapper;if(this.isExpanded&&e){var t=e.getBoundingClientRect(),n=t.top,r=t.bottom,s=t.left,i=t.width,o=r>document.documentElement.clientHeight&&n+44<=document.documentElement.clientHeight;this.style=o?{left:"".concat(s,"px"),width:"".concat(i,"px"),bottom:"0px",position:"fixed",border:"1px solid var(--vue-run-sfc-border, #ebeef5)"}:{}}}},mounted:function(){var e=this;this.$nextTick((function(){e.scrollHandler(),e.throttleScrollHandler=m(100,(function(){e.scrollHandler()})),window.addEventListener("scroll",e.throttleScrollHandler)}))},beforeDestroy:function(){window.removeEventListener("scroll",this.throttleScrollHandler)}},w=(n(418),Object(d.a)(g,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:!e.isScreenfull,expression:"!isScreenfull"}],ref:"control",staticClass:"vue-run-sfc-control",style:e.isExpanded?e.style:null,on:{click:function(t){return e.$emit("expanded")}}},[n("transition",{attrs:{name:"arrow-slide"}},[n("i",{staticClass:"vue-run-sfc-control-icon",class:{hovering:e.hovering||e.isExpanded}})]),e._v(" "),n("transition",{attrs:{name:"text-slide"}},[e.hovering?n("span",{staticClass:"control-text"},[e._v(e._s(e.controlText))]):e._e()]),e._v(" "),n("transition",{attrs:{name:"text-slide"}},[n("span",{staticClass:"power-by-text"},[e._v("Power By\n      "),n("a",{attrs:{href:"https://github.com/dream2023/vue-run-sfc",target:"_blank"}},[e._v("Vue-Run-SFC")])])])],1)}),[],!1,null,null,null).exports),y=n(419),b={name:"vue-run-sfc-main",components:{Multipane:y.a,MultipaneResizer:y.b},props:{isRow:Boolean,isExpanded:Boolean,reverse:Boolean,isScreenfull:Boolean}},x=(n(420),Object(d.a)(b,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.isRow&&e.isExpanded?"multipane":"div",{tag:"component",staticClass:"vue-run-sfc-main",class:{"default-theme":e.isRow,"vue-run-sfc-main-reverse":e.isExpanded&&!e.isRow&&e.reverse},style:{"padding-top":e.isScreenfull?"57px":null}},[e.isRow&&e.isExpanded?[n("div",{staticClass:"vue-run-sfc-main-pane",staticStyle:{"overflow-y":"auto",width:"50%"}},[e._t("editor")],2),e._v(" "),n("multipane-resizer"),e._v(" "),n("div",{staticClass:"vue-run-sfc-main-pane",staticStyle:{"overflow-y":"auto",flexGrow:"1"}},[e._t("preview")],2)]:[e.isExpanded?e._t("editor"):e._e(),e._v(" "),e._t("preview")]],2)}),[],!1,null,null,null).exports),S=n(424),C=n(323).debounce,_=n(421),E=n(351),H=n(422),j={name:"vue-run-sfc",components:{VueRunSfcHeader:v,VueRunSfcPreview:f,VueRunSfcControl:w,VueRunSfcMain:x,codemirror:i.codemirror},props:{code:String,jsLabs:[String,Array],cssLabs:[String,Array],js:[Array,String],css:[Array,String],value:String,themeColor:String,themeBorderColor:String,row:{type:Boolean,default:void 0},reverse:{type:Boolean,default:void 0},title:String,height:String,open:{type:Boolean,default:void 0},isHideHeader:{type:Boolean,default:void 0}},data:function(){return{hovering:!1,isExpanded:!1,codemirrorOption:o,isScreenfull:!1,editCode:"",initalCode:"",preview:{},previewHeight:0,isRow:null}},computed:{attrs:function(){var e=this,t=this.$_vue_run_sfc||{},n=function(n){var r=t[n]||[];r&&!Array.isArray(r)&&(r=[r]);var i=e.$props[n]||[];return i&&!Array.isArray(i)&&(i=[i]),[].concat(Object(s.a)(r),Object(s.a)(i))},r=Object.keys(this.$props).reduce((function(t,n){return void 0!==e.$props[n]&&(t[n]=e.$props[n]),t}),{});return Object.assign({},t,r,{jsLabs:n("jsLabs"),cssLabs:n("cssLabs"),js:n("js"),css:n("css")})},editorHeight:function(){if(this.isScreenfull){if(this.isRow){return document.documentElement.clientHeight-58+"px"}return null}if(this.attrs.height)return this.attrs.height;var e=0;if(this.isRow)e=this.previewHeight>150?this.previewHeight:150;else{e=21*this.editCode.split(/\r\n|\r|\n/).length+20,e=e>150?e:150}return e+"px"}},methods:{handleScreenfull:function(){this.isScreenfull=!this.isScreenfull,E.toggle(this.$refs.wrapper)},checkScreenfull:function(){var e=this;E.isEnabled&&E.on("change",(function(){e.isScreenfull=E.isFullscreen}))},handleRun:function(){var e=this;this.runCode||(this.runCode=C(300,Object(r.a)(regeneratorRuntime.mark((function t(){var r,s,i,o,a,c,l,u;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.editCode,e.$emit("input",r),e.$emit("change",r),r){t.next=5;break}return t.abrupt("return");case 5:if(s=_.parseComponent(r),i=s.template,o=s.script,a=s.styles,!(c=s.errors)||!c.length){t.next=10;break}e.preview={errors:c},t.next=26;break;case 10:if(i||o){t.next=12;break}return t.abrupt("return");case 12:if(!window.fetch){t.next=21;break}return l=n(423),t.next=16,l.getStyles(a);case 16:u=t.sent,c=u.filter((function(e){return!e.success})).map((function(e){return e.error})),a=u.filter((function(e){return e.success})).map((function(e){return e.style})),t.next=23;break;case 21:c=a.filter((function(e){return e.lang})).map((function(e){return"暂不支持".concat(e.lang,"预处理器")})),a=a.filter((function(e){return!e.lang})).map((function(e){return e.content}));case 23:i=i?JSON.stringify(i.content):'""',o=o&&o.content.trim()?o.content.trim():"export default {}";try{o=H.transform(o,{presets:["es2015"]}).code,e.preview={styles:a,script:o,template:i,errors:c}}catch(t){e.preview={errors:[t.stack]}}case 26:case"end":return t.stop()}}),t)}))))),this.runCode()},handleReset:function(){this.editCode=this.initalCode,this.handleRun()},setDefaultRow:function(){var e=this;if(void 0!==this.attrs.row)this.isRow=this.attrs.row;else var t=setInterval((function(){if(e.$refs.wrapper){var n=e.$refs.wrapper.clientWidth;e.isRow=n>992,clearInterval(t)}}),500)},handlePreviewHeightChange:function(e){this.previewHeight=e},init:function(){this.setDefaultRow(),this.isExpanded=this.attrs.open,Object(S.a)({variables:{"--vue-run-sfc-main":this.attrs.themeColor||"#409eff","--vue-run-sfc-border":this.attrs.themeBorderColor||"#eaeefb"}});var e=this.code||this.value;e=e?decodeURIComponent(e):"",this.initalCode=e,this.editCode=e}},mounted:function(){this.checkScreenfull(),this.init(),this.handleRun()}},R=(n(425),Object(d.a)(j,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"wrapper",staticClass:"vue-run-sfc",style:{"overflow-y":e.isScreenfull?"auto":null},on:{mouseenter:function(t){e.hovering=!0},mouseleave:function(t){e.hovering=!1}}},[e.attrs.isHideHeader?e._e():n("vue-run-sfc-header",{attrs:{title:e.title,"is-row":e.isRow,"is-screenfull":e.isScreenfull,"is-expanded":e.isExpanded},on:{reset:e.handleReset,"change-row":function(t){e.isRow=!e.isRow},screenfull:e.handleScreenfull}}),e._v(" "),n("vue-run-sfc-main",{attrs:{"is-row":e.isRow,"is-expanded":e.isExpanded,reverse:e.attrs.reverse,"is-screenfull":e.isScreenfull},scopedSlots:e._u([{key:"editor",fn:function(){return[n("codemirror",{staticClass:"vue-run-sfc-editor",style:{height:e.editorHeight},attrs:{options:e.codemirrorOption},on:{input:e.handleRun},model:{value:e.editCode,callback:function(t){e.editCode=t},expression:"editCode"}})]},proxy:!0},{key:"preview",fn:function(){return[n("vue-run-sfc-preview",{ref:"preview",style:{borderTop:e.isRow||e.attrs.reverse||!e.isExpanded?"":"1px solid var(--vue-run-sfc-border, #ebeef5)"},attrs:{"js-labs":e.attrs.jsLabs,"theme-color":e.attrs.themeColor,css:e.attrs.css,js:e.attrs.js,"css-labs":e.attrs.cssLabs,value:e.preview},on:{"change-height":e.handlePreviewHeightChange}})]},proxy:!0}])}),e._v(" "),n("vue-run-sfc-control",{attrs:{"is-screenfull":e.isScreenfull,"is-expanded":e.isExpanded,hovering:e.hovering,"is-row":e.isRow},on:{expanded:function(t){e.isExpanded=!e.isExpanded}}})],1)}),[],!1,null,null,null));t.default=R.exports}}]);