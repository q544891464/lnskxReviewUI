/*!
 *  build: vue-admin-beautiful 
 *  copyright: chuzhixin 1204505056@qq.com 
 *  time: 2020-10-12 00:25:38
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b33e4ea0"],{"243c":function(e,t,a){"use strict";var r=a("f1c3"),s=a.n(r);s.a},"53ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a("a4d3"),a("e01a"),a("d28b"),a("d3b7"),a("3ca3"),a("ddb0");function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}},"5aab":function(e,t,a){},"5af7":function(e,t,a){"use strict";var r=a("5aab"),s=a.n(r);s.a},"74b3":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"800px"},on:{"update:visible":function(t){e.dialogVisible=t},close:e.close}},[a("dl",{staticClass:"upload-avatar"},[a("dt",[a("label",{staticClass:"el-button el-button--primary el-button--small",attrs:{for:"uploads"}},[e._v("上传头像")]),a("input",{ref:"uploadImg",staticClass:"hiddenInput",attrs:{id:"uploads",multiple:"",type:"file",accept:"image/png,image/jpeg,image/gif,image/jpg"},on:{change:function(t){return e.uploadImg(t)}}})]),a("dd",[e._v("支持JPG、PNG等格式图片大小不超过1M，超出自动压缩")])]),a("el-row",[a("el-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[a("vue-cropper",{ref:"cropper",attrs:{img:e.options.img,info:!0,autoCrop:e.options.autoCrop,autoCropWidth:e.options.autoCropWidth,autoCropHeight:e.options.autoCropHeight,fixedBox:e.options.fixedBox,maxImgSize:e.options.maxImgSize},on:{realTime:e.realTime}})],1),a("el-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[a("div",{staticClass:"avatar-upload-preview"},[a("img",{style:e.previews.img,attrs:{src:e.previews.url}})])])],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.close}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确 定")])],1)],1)},s=[],o=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("53ca")),i=(a("96cf"),a("1da1")),n=a("7e79"),l=a("953d"),c=a("bc3a"),u=a.n(c),d=a("778c"),f=a("4360"),m={name:"AvatarEdit",components:{VueCropper:n["VueCropper"]},data:function(){return{title:"上传头像",instance:null,dialogVisible:!1,downImg:"#",id:null,confirmLoading:!1,options:{img:"",info:!0,size:1,outputType:"jpeg",canScale:!1,autoCrop:!0,autoCropWidth:180,autoCropHeight:180,maxImgSize:1048,fixedBox:!0,fixed:!0,fixedNumber:[1,1]},previews:{}}},created:function(){this.instance=u.a.create({baseURL:d["baseURL"],timeout:d["requestTimeout"],headers:{"Content-Type":"multipart/form-data"}})},methods:{showAvatarEdit:function(e){this.dialogVisible=!0,this.id=e.id,this.options.img=e.avatar},close:function(){this.id=null,this.dialogVisible=!1},save:function(){var e=this;this.$refs.cropper.getCropBlob((function(t){var a=new Blob([t]),r=new window.FormData;r.append("file",a),e.doUpdateAvatarAsync(r)}))},doUpdateAvatarAsync:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.confirmLoading=!0,a.next=3,Object(l["doUpdateAvatar"])(e);case 3:if(r=a.sent,s=r.success,o=r.msg,!s){a.next=14;break}return a.next=9,f["default"].dispatch("user/getUserInfo");case 9:return a.next=11,t.$emit("fetchData");case 11:t.confirmLoading=!1,t.close(),t.$baseMessage(o,"success");case 14:case"end":return a.stop()}}),a)})))()},uploadImg:function(e){var t=this,a=e.target.files[0];if(!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))return this.$baseMessage("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种","error"),!1;var r=new FileReader;r.onload=function(e){var a;a="object"===Object(o["a"])(e.target.result)?window.URL.createObjectURL(new Blob([e.target.result])):e.target.result,t.options.img=a,t.$refs.uploadImg.value=""},r.readAsArrayBuffer(a)},realTime:function(e){this.previews=e}}},p=m,b=(a("bfe0"),a("2877")),w=Object(b["a"])(p,r,s,!1,null,"5c91cd81",null);t["default"]=w.exports},"7a8c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"personalCenter-container"},[a("el-tabs",{attrs:{"tab-position":e.tabPosition}},[a("el-tab-pane",{attrs:{label:"基本设置"}},[a("el-row",[a("h2",[e._v("基本设置")]),a("el-divider")],1),a("el-row",[a("el-form",{ref:"baseForm",attrs:{model:e.baseForm,rules:e.baseRules,"label-width":"100px"}},[a("el-col",{staticClass:"line",attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"用户名：",prop:"username"}},[a("el-input",{attrs:{autocomplete:"off",disabled:"",title:"用户名不可更改"},model:{value:e.baseForm.username,callback:function(t){e.$set(e.baseForm,"username","string"===typeof t?t.trim():t)},expression:"baseForm.username"}})],1)],1),a("el-col",{staticClass:"line",attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"昵称：",prop:"realName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.baseForm.realName,callback:function(t){e.$set(e.baseForm,"realName","string"===typeof t?t.trim():t)},expression:"baseForm.realName"}})],1)],1),a("el-col",{staticClass:"line",attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"我的签名：",prop:"sign"}},[a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.baseForm.sign,callback:function(t){e.$set(e.baseForm,"sign",t)},expression:"baseForm.sign"}})],1)],1),a("el-col",{staticClass:"line",attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"手机：",prop:"mobile"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.baseForm.mobile,callback:function(t){e.$set(e.baseForm,"mobile","string"===typeof t?t.trim():t)},expression:"baseForm.mobile"}})],1)],1),a("el-col",{staticClass:"line",attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"邮箱：",prop:"email"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.baseForm.email,callback:function(t){e.$set(e.baseForm,"email","string"===typeof t?t.trim():t)},expression:"baseForm.email"}})],1)],1),a("el-col",{staticClass:"line",staticStyle:{"padding-left":"20px"},attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveUser}},[e._v(" 保存 ")])],1)],1),a("el-col",{style:{minHeight:"180px"},attrs:{md:24,lg:8}},[a("div",{staticClass:"element-upload-preview",on:{click:function(t){return e.showAvatarEdit()}}},[a("vab-icon",{staticClass:"upload-icon",attrs:{icon:["fas","cloud-upload-alt"]}}),a("div",{staticClass:"mask"},[a("vab-icon",{staticClass:"upload-mask-icon",attrs:{icon:["fas","ellipsis-h"]}})],1),a("div"),null===e.options.img||""===e.options.img?a("el-avatar",{staticStyle:{"font-size":"80px"},attrs:{icon:"el-icon-user-solid",size:180}}):a("div",{style:{minHeight:"180px"}},[a("img",{attrs:{src:e.options.img,alt:"图片去火星了"}})])],1)])],1)],1),a("el-tab-pane",{attrs:{label:"安全设置"}},[a("el-row",[a("h2",[e._v("安全设置")]),a("el-divider")],1),a("el-row",[a("el-col",{staticClass:"line",staticStyle:{"padding-left":"20px"},attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[a("el-button",{attrs:{type:"primary"},on:{click:e.updatePassword}},[e._v(" 修改密码 ")])],1)],1)],1)],1),a("update-password",{ref:"update-password"}),a("avatar-edit",{ref:"avatar-edit",on:{fetchData:e.fetchData}})],1)},s=[],o=(a("96cf"),a("1da1")),i=a("e9df"),n=a("c24f"),l=a("61f7"),c=a("953d"),u=a("7b27"),d=a("74b3"),f=a("778c"),m=f.baseURL,p={name:"PersonalCenter",components:{UpdatePassword:u["default"],AvatarEdit:d["default"]},data:function(){var e=function(e,t,a){Object(l["isNull"])(t)?a(new Error("请输入昵称")):Object(l["isName"])(t)?a():a(new Error("请输入正确的昵称格式"))},t=function(e,t,a){Object(l["isNull"])(t)||Object(l["isPhone"])(t)?a():a(new Error("请输入正确的手机号格式"))},a=function(e,t,a){Object(l["isNull"])(t)||Object(l["isEmail"])(t)?a():a(new Error("请输入正确的邮箱格式"))};return{proFileLoading:!0,baseFormInfo:{},baseForm:{locked:"0"},baseRules:{realName:[{required:!0,trigger:"blur",validator:e}],mobile:[{required:!1,trigger:"blur",validator:t}],email:[{required:!1,trigger:"blur",validator:a}]},preview:{},options:{img:""},tabPosition:"left"}},created:function(){this.fetchData()},methods:{showAvatarEdit:function(){this.$refs["avatar-edit"].showAvatarEdit({id:this.baseFormInfo.id,avatar:this.options.img})},saveUser:function(){var e=this;this.$refs["baseForm"].validate(function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(a){var r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=12;break}if(Object(l["isNull"])(e.baseForm.id)){t.next=8;break}return t.next=4,Object(c["doUpdate"])(e.baseForm);case 4:r=t.sent,s=r.success,o=r.msg,s&&e.$baseMessage(o,"success");case 8:return t.next=10,e.$emit("fetchData");case 10:t.next=13;break;case 12:return t.abrupt("return",!1);case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},updatePassword:function(){this.$refs["update-password"].showUpdatePassword()},fetchData:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(i["getAccessToken"])(),e.proFileLoading=!0,t.next=4,Object(n["getUserInfo"])(a);case 4:r=t.sent,s=r.data,Object(l["isNull"])(s)||(e.baseFormInfo=Object.assign({},s),Object(l["isNull"])(e.baseFormInfo.avatar)||(e.options.img=m+e.baseFormInfo.avatar),e.baseForm=Object.assign({},s),e.baseForm.locked="0",e.baseForm.avatar="",setTimeout((function(){e.proFileLoading=!1}),300));case 7:case"end":return t.stop()}}),t)})))()}}},b=p,w=(a("243c"),a("2877")),g=Object(w["a"])(b,r,s,!1,null,"15373dfc",null);t["default"]=g.exports},"7b27":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible,width:"500px"},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.close}},[a("el-form",{ref:"form",staticClass:"update-password-container",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"旧密码",prop:"oldPassword"}},[a("el-input",{attrs:{type:e.formPasswordShow.old?"text":"password",autocomplete:"off"},model:{value:e.form.oldPassword,callback:function(t){e.$set(e.form,"oldPassword","string"===typeof t?t.trim():t)},expression:"form.oldPassword"}}),a("span",{staticClass:"show-password",on:{click:function(t){e.formPasswordShow.old=!e.formPasswordShow.old}}},[e.formPasswordShow.old?a("vab-icon",{attrs:{icon:["fas","eye-slash"]}}):a("vab-icon",{attrs:{icon:["fas","eye"]}})],1)],1),a("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[a("el-input",{attrs:{type:e.formPasswordShow.new?"text":"password",autocomplete:"off"},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword","string"===typeof t?t.trim():t)},expression:"form.newPassword"}}),a("span",{staticClass:"show-password",on:{click:function(t){e.formPasswordShow.new=!e.formPasswordShow.new}}},[e.formPasswordShow.new?a("vab-icon",{attrs:{icon:["fas","eye-slash"]}}):a("vab-icon",{attrs:{icon:["fas","eye"]}})],1)],1),a("el-form-item",{attrs:{label:"确认密码",prop:"verifyPassword"}},[a("el-input",{attrs:{type:e.formPasswordShow.verify?"text":"password",autocomplete:"off"},model:{value:e.form.verifyPassword,callback:function(t){e.$set(e.form,"verifyPassword","string"===typeof t?t.trim():t)},expression:"form.verifyPassword"}}),a("span",{staticClass:"show-password",on:{click:function(t){e.formPasswordShow.verify=!e.formPasswordShow.verify}}},[e.formPasswordShow.verify?a("vab-icon",{attrs:{icon:["fas","eye-slash"]}}):a("vab-icon",{attrs:{icon:["fas","eye"]}})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.close}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确 定")])],1)],1)},s=[],o=(a("96cf"),a("1da1")),i=a("953d"),n=a("61f7"),l={name:"UserManagementPassword",data:function(){var e=this,t=function(e,t,a){Object(n["isNull"])(t)?a(new Error("请输入密码")):Object(n["isPassword"])(t)?a():a(new Error("密码至少包含大写字母，小写字母，数字，且不少于6位"))},a=function(t,a,r){Object(n["isNull"])(a)?r(new Error("请再次输入密码")):a!==e.form.newPassword?r(new Error("两次输入密码不一致!")):r()};return{formPasswordShow:{old:!1,new:!1,verify:!1},form:{oldPassword:"",newPassword:"",verifyPassword:""},rules:{oldPassword:[{required:!0,trigger:"blur",message:"请输入旧密码"}],newPassword:[{required:!0,trigger:"blur",validator:t}],verifyPassword:[{required:!0,trigger:"blur",validator:a}]},title:"",dialogFormVisible:!1}},created:function(){},methods:{showUpdatePassword:function(){this.title="修改密码",this.dialogFormVisible=!0},close:function(){this.form.oldPassword="",this.form.newPassword="",this.form.verifyPassword="",this.formPasswordShow.old=!1,this.formPasswordShow.new=!1,this.formPasswordShow.verify=!1,this.dialogFormVisible=!1},save:function(){var e=this;this.$refs["form"].validate(function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(a){var r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=10;break}return t.next=3,Object(i["doUpdatePassword"])(e.form);case 3:r=t.sent,s=r.success,o=r.msg,s&&e.$baseMessage(o,"success"),e.close(),t.next=11;break;case 10:return t.abrupt("return",!1);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},c=l,u=(a("5af7"),a("2877")),d=Object(u["a"])(c,r,s,!1,null,"37ffef22",null);t["default"]=d.exports},"953d":function(e,t,a){"use strict";a.r(t),a.d(t,"getUserInfo",(function(){return s})),a.d(t,"getList",(function(){return o})),a.d(t,"doInsert",(function(){return i})),a.d(t,"doUpdate",(function(){return n})),a.d(t,"doDelete",(function(){return l})),a.d(t,"doDeleteAll",(function(){return c})),a.d(t,"getRoleIdsByUserId",(function(){return u})),a.d(t,"doSetRoles",(function(){return d})),a.d(t,"doUpdatePasswordById",(function(){return f})),a.d(t,"doUpdatePassword",(function(){return m})),a.d(t,"doUpdateAvatar",(function(){return p}));var r=a("b775");a("778c");function s(e){return Object(r["default"])({url:"/api/v1/sys/user/getInfoById",method:"get",params:e})}function o(e){return Object(r["default"])({url:"/api/v1/sys/user/findPage",method:"get",params:e})}function i(e){return Object(r["default"])({url:"/api/v1/sys/user/insert",method:"post",data:e})}function n(e){return Object(r["default"])({url:"/api/v1/sys/user/update",method:"post",data:e})}function l(e){return Object(r["default"])({url:"/api/v1/sys/user/del",method:"post",params:e})}function c(e){return Object(r["default"])({url:"/api/v1/sys/user/delAll",method:"post",params:e})}function u(e){return Object(r["default"])({url:"/api/v1/sys/user/getRoleIdsByUserId",method:"get",params:e})}function d(e){return Object(r["default"])({url:"/api/v1/sys/user/roles/setRoles",method:"post",data:e})}function f(e){return Object(r["default"])({url:"/api/v1/sys/user/updatePasswordById",method:"post",data:e})}function m(e){return Object(r["default"])({url:"/api/v1/sys/user/updatePassword",method:"post",data:e})}function p(e){return Object(r["default"])({url:"/api/v1/sys/user/updateAvatar",method:"post",headers:{"Content-Type":"multipart/form-data"},data:e})}},abdd:function(e,t,a){},bfe0:function(e,t,a){"use strict";var r=a("abdd"),s=a.n(r);s.a},f1c3:function(e,t,a){}}]);