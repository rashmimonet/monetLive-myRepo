(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"4GZO":function(t,e,n){"use strict";n.d(e,"a",function(){return h});var i=n("FpXt"),c=n("7EHt"),a=n("MutI"),o=n("TU8p"),r=n("Dhln"),s=n("wZkO"),l=n("jaxi"),d=n("Qu3c"),u=n("QibW"),b=n("3Pt+"),f=n("/1cH"),m=n("kmnG"),p=n("qFsG"),g=n("fXoL");let h=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.Pb({type:t}),t.\u0275inj=g.Ob({providers:[r.a],imports:[[i.a,c.b,a.a,o.b,s.d,l.c,d.b,u.c,b.m,b.x,f.b,m.e,p.c]]}),t})()},Dhln:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var i=n("fXoL");let c=(()=>{class t{transform(t,...e){if(e[0].config)return t.filter(t=>t[""+e[0].config]===e[0].value);if(e[0].category&&"webcam"!==e[0].category){if("metric"in e[0]&&0===e[0].metric)return t.filter(t=>t.category_engagement===e[0].category);if("metric"in e[0]&&1===e[0].metric)return t.filter(t=>t.category_mood===e[0].category)}else{if(e[0].webcam){const n=e[0].key?e[0].key:"webcam";return t.forEach(t=>{const e=t.session_data.some(t=>0===t.webcam);t.webcam=!e}),t.filter(t=>!1===t[n])}if(e[0].deviceType){const n=e[0].key?e[0].key:"type";return t.filter(t=>t[n]===e[0].deviceType).length?t.filter(t=>t[n]===e[0].deviceType):[{label:"No Device Detected",type:e[0].key}]}}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=i.Qb({name:"categoryFilter",type:t,pure:!0}),t})()},c8Cp:function(t,e,n){"use strict";n.d(e,"a",function(){return D});var i=n("fXoL"),c=n("7EHt"),a=n("JX91"),o=n("lJxs"),r=n("3Pt+"),s=n("tyNb"),l=n("v0EB"),d=n("LUsR"),u=n("iiAa"),b=n("ofXK"),f=n("XiUz"),m=n("f0Cb"),p=n("QibW"),g=n("znSr"),h=n("Qu3c"),x=n("NFeN"),v=n("Dhln");const y=function(){return["custom-radio"]};function w(t,e){if(1&t&&(i.Xb(0,"mat-radio-button",21),i.Pc(1),i.Wb()),2&t){const t=e.$implicit,n=e.index;i.qc("ngClass",i.tc(3,y))("value",n),i.Fb(1),i.Qc(t.name)}}function F(t,e){if(1&t){const t=i.Yb();i.Xb(0,"div",22),i.Xb(1,"div",23),i.fc("click",function(){i.Fc(t);const n=e.$implicit,c=i.jc(2);return c.selectStudent(n),c.selected=n,c.selectUser.emit(c.selected)}),i.Xb(2,"mat-icon",24),i.Pc(3,"account_circle"),i.Wb(),i.Xb(4,"span",25),i.Pc(5),i.kc(6,"titlecase"),i.Wb(),i.Wb(),i.Wb()}if(2&t){const t=e.$implicit;i.Fb(5),i.Qc(i.lc(6,1,t.name))}}function L(t,e){if(1&t&&(i.Xb(0,"div",28),i.Xb(1,"span",29),i.Pc(2),i.Wb(),i.Wb()),2&t){const t=i.jc(3);i.Fb(2),i.Qc(t.camOffTab[0].name)}}const W=function(){return["name-list"]};function X(t,e){if(1&t){const t=i.Yb();i.Xb(0,"div",30),i.fc("click",function(){i.Fc(t);const n=e.$implicit,c=i.jc(3);return c.selected=n,c.selectUser.emit(c.selected)}),i.Xb(1,"div",31),i.Xb(2,"mat-icon"),i.Pc(3,"account_circle"),i.Wb(),i.Xb(4,"span",13),i.Pc(5),i.Wb(),i.Wb(),i.Xb(6,"div",32),i.Xb(7,"mat-icon"),i.Pc(8,"videocam_off"),i.Wb(),i.Xb(9,"span",33),i.Pc(10),i.Wb(),i.Wb(),i.Wb()}if(2&t){const t=e.$implicit,n=i.jc(3);i.qc("ngClass",i.tc(4,W)),i.Fb(5),i.Rc("",t.name," "),i.Fb(4),i.qc("hidden",t.video),i.Fb(1),i.Rc("",!1===t.video?n.screenOffStat(t):""," ")}}const S=function(){return{config:"video",value:!1}},C=function(){return{webcam:"webcam"}};function O(t,e){if(1&t&&(i.Nc(0,L,3,1,"div",26),i.kc(1,"categoryFilter"),i.Nc(2,X,11,5,"div",27),i.kc(3,"categoryFilter")),2&t){const t=i.jc(2);i.qc("ngIf",""!==t.camOffTab[0].name&&i.mc(1,2,t.studentList,i.tc(8,S)).length>0),i.Fb(2),i.qc("ngForOf",i.mc(3,5,t.studentList,"report"===t.moduleName?i.tc(9,C):i.tc(10,S)))}}function P(t,e){if(1&t&&(i.Xb(0,"span",46),i.Pc(1),i.Wb()),2&t){const t=i.jc().$implicit,e=i.jc(4);i.Fb(1),i.Rc(" ",t[e.metricTab[e.metric].name.toLowerCase()]," ")}}function _(t,e){if(1&t&&(i.Xb(0,"span",46),i.Pc(1),i.Wb()),2&t){const t=i.jc().$implicit;i.Fb(1),i.Rc(" ",t.engTenSec," ")}}const k=function(t){return["name-list",t]};function A(t,e){if(1&t){const t=i.Yb();i.Vb(0),i.Xb(1,"div",39),i.fc("click",function(){i.Fc(t);const n=e.$implicit;return i.jc(4).selectStudent(n)}),i.Xb(2,"div",31),i.Xb(3,"mat-icon"),i.Pc(4,"account_circle"),i.Wb(),i.Xb(5,"div",40),i.Xb(6,"span",41),i.Pc(7),i.kc(8,"titlecase"),i.Wb(),i.Xb(9,"span",42),i.Pc(10),i.Wb(),i.Wb(),i.Wb(),i.Xb(11,"span",43),i.Xb(12,"mat-icon",44),i.Pc(13,"fiber_manual_record"),i.Wb(),i.Nc(14,P,2,1,"span",45),i.Nc(15,_,2,1,"span",45),i.Wb(),i.Wb(),i.Ub()}if(2&t){const t=e.$implicit,n=i.jc(2).$implicit,c=i.jc(2);i.Fb(1),i.qc("ngClass",i.uc(9,k,c.selected&&c.selected.std_id===t.std_id?"select-list":"")),i.Fb(6),i.Sc("",i.lc(8,7,t.name)," ",c.yourId===t.std_id?" (You)":"",""),i.Fb(3),i.Qc(t.stdDuration),i.Fb(1),i.qc("ngClass",n.clas),i.Fb(3),i.qc("ngIf",!c.tenSec),i.Fb(1),i.qc("ngIf",c.tenSec)}}const M=function(t,e){return{category:t,metric:e}};function q(t,e){if(1&t&&(i.Xb(0,"div",28),i.Xb(1,"span",29),i.Pc(2),i.Wb(),i.Wb(),i.Nc(3,A,16,11,"ng-container",38),i.kc(4,"categoryFilter")),2&t){const t=i.jc().$implicit,e=i.jc(2);i.Fb(2),i.Qc(e.metricTab[e.metric].name),i.Fb(1),i.qc("ngForOf",i.mc(4,3,e.studentList,i.vc(6,M,t.name,e.metric)))("ngForTrackBy",e.trackByUsers)}}const N=function(t){return{border:t}};function j(t,e){if(1&t){const t=i.Yb();i.Xb(0,"mat-expansion-panel",34),i.Xb(1,"mat-expansion-panel-header",35),i.fc("click",function(){i.Fc(t);const n=e.$implicit;return i.jc(2).reportRoute(n)}),i.Xb(2,"mat-panel-description",16),i.Xb(3,"span",4),i.Xb(4,"mat-icon",36),i.Pc(5,"fiber_manual_record"),i.Wb(),i.Pc(6),i.Wb(),i.Sb(7,"span",11),i.Wb(),i.Wb(),i.Nc(8,q,5,9,"ng-template",37),i.Wb()}if(2&t){const t=e.$implicit,n=i.jc(2);i.qc("expanded",!0)("disabled",!0),i.Fb(1),i.qc("ngStyle",i.uc(6,N,t.color)),i.Fb(3),i.qc("ngClass",t.clas),i.Fb(2),i.Sc(" ",t.text," ",n.metricTab[n.metric].name," ")}}const T=function(){return{padding:"8px 8px 0 8px"}};function U(t,e){if(1&t){const t=i.Yb();i.Xb(0,"div",1),i.Xb(1,"div",2),i.Xb(2,"div",3),i.Xb(3,"div",4),i.Xb(4,"img",5),i.fc("click",function(){return i.Fc(t),i.jc().homeRoute()}),i.Wb(),i.Wb(),i.Sb(5,"mat-divider",6),i.Xb(6,"mat-radio-group",7),i.fc("ngModelChange",function(e){return i.Fc(t),i.jc().metric=e})("change",function(e){return i.Fc(t),i.jc().onChange(e)}),i.Nc(7,w,2,4,"mat-radio-button",8),i.Wb(),i.Nc(8,F,7,3,"div",9),i.Wb(),i.Wb(),i.Xb(9,"div",10),i.fc("click",function(){i.Fc(t);const e=i.jc();return null==e.accordion?null:e.accordion.openAll()}),i.Xb(10,"span",4),i.Pc(11," Total Participants "),i.Wb(),i.Xb(12,"span",11),i.Xb(13,"span",12),i.Pc(14,"#"),i.Wb(),i.Pc(15," \xa0 "),i.Xb(16,"span",13),i.Pc(17),i.Wb(),i.Wb(),i.Wb(),i.Xb(18,"mat-accordion"),i.Xb(19,"mat-expansion-panel",14),i.Xb(20,"mat-expansion-panel-header",15),i.Xb(21,"mat-panel-description",16),i.Xb(22,"span",4),i.Xb(23,"mat-icon",17),i.Pc(24,"fiber_manual_record"),i.Wb(),i.Pc(25),i.Wb(),i.Xb(26,"span",11),i.Xb(27,"span",12),i.Pc(28,"#"),i.Wb(),i.Pc(29," \xa0 "),i.Xb(30,"span",13),i.Pc(31),i.kc(32,"categoryFilter"),i.kc(33,"categoryFilter"),i.Wb(),i.Wb(),i.Wb(),i.Wb(),i.Nc(34,O,4,11,"ng-template",18),i.Wb(),i.Wb(),i.Xb(35,"mat-accordion",19),i.Nc(36,j,9,8,"mat-expansion-panel",20),i.Wb(),i.Wb()}if(2&t){const t=i.jc();i.Fb(6),i.qc("ngModel",t.metric)("color","primary"),i.Fb(1),i.qc("ngForOf",t.metricTab),i.Fb(1),i.qc("ngForOf",t.searchStudentArr),i.Fb(1),i.qc("ngStyle",i.tc(18,T))("matTooltip","Show All"),i.Fb(8),i.Qc(t.studentList.length),i.Fb(2),i.qc("expanded",!0),i.Fb(6),i.Rc(" ","Camera OFF"," "),i.Fb(6),i.Qc("report"===t.moduleName?i.mc(32,12,t.studentList,i.tc(19,C)).length:i.mc(33,15,t.studentList,i.tc(20,S)).length),i.Fb(4),i.qc("multi",!0),i.Fb(1),i.qc("ngForOf",t.callCat)}}let D=(()=>{class t{constructor(t,e,n,c,a){this.router=t,this.as=e,this.ar=n,this.bhvSub=c,this.utility=a,this.selectUser=new i.o,this.tenSecondsAvg=[],this.tenSec=!1,this.test=[],this.searchStudentArr=[],this.search=new r.h,this.selected={fromSidenav:!0},this.index=0,this.isStudent=!1,this.metric=0,this.camOffTab=[{name:"Since Last On"}],this.metricTab=[{name:"Engagement",value:"avgEngagement"},{name:"Mood",value:"avgMood"}],this.callCat=[{name:"Low",icon:"",text:"Low",clas:"title-danger12-400",color:"1px solid #DC3545"},{name:"Medium",icon:"",text:"Mid",clas:"title-warning12-400",color:"1px solid #D69718"},{name:"High",icon:"",text:"High",clas:"title-success12-400",color:"1px solid #00A23E"}],this.ar.queryParams.subscribe(t=>{t&&(this.yourId=t.id)}),this.isStudent=-1!==window.location.href.search("student")&&-1===window.location.href.search("report")}set students(t){if(this.index++,this.tenSecondsAvg=[],void 0!==t){for(const e of t)e.engAvg+=e.engagement,this.updateCamOffList(e);this.studentList=t.filter(t=>{var e,n;return-1===(null===(e=null==t?void 0:t.uuid)||void 0===e?void 0:e.search("___"))||-1===(null===(n=null==t?void 0:t.std_id)||void 0===n?void 0:n.search("___"))}),this.studentList.filter((t,e,n)=>n.findIndex(e=>e.std_id===t.std_id)===e)}}ngOnInit(){var t;"report"===this.moduleName&&(this.camOffTab[0].name=""),this.bhvSub.obEngorMood(this.metric),this.filteredStudents=null===(t=this.search)||void 0===t?void 0:t.valueChanges.pipe(Object(a.a)(""),Object(o.a)(t=>this._filter(t))),this.OS=this.getOS()}ngOnChanges(t){var e,n,i;(null==t?void 0:t.score)&&(10===(null===(e=null==t?void 0:t.score)||void 0===e?void 0:e.currentValue)?this.tenSec=!0:0!==(null===(n=null==t?void 0:t.score)||void 0===n?void 0:n.currentValue)&&1!==(null===(i=null==t?void 0:t.score)||void 0===i?void 0:i.currentValue)||(this.tenSec=!1))}_filter(t){const e=t.toLowerCase();return this.studentList.filter(t=>0===t.name.toLowerCase().indexOf(e)).map(t=>t.name)}filterstudent(t,e){return!t.screen}updateCamOffList(t){this.as.CamOffUsersArr.some(e=>e.id===t.std_id)?!0===t.video&&(this.as.CamOffUsersArr=this.as.CamOffUsersArr.filter(e=>e.id!==t.std_id)):!1===t.video&&this.as.CamOffUsersArr.push({id:t.std_id,time:new Date,screenStat:t.video})}homeRoute(){this.isStudent||this.router.navigate(["report/dashboard"],{queryParams:{student_id:null},queryParamsHandling:"merge"})}selectStudent(t){this.selected===t?this.selected={std_id:0,fromSidenav:!0}:(this.selected=t,this.selected.fromSidenav=!0),this.selectUser.emit(this.selected)}trackByUsers(t,e){return e.std_id}getOS(){const t=window.navigator.platform;let e=null;return-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(t)?e="Mac":-1!==["Win32","Win64","Windows","WinCE"].indexOf(t)&&(e="Windows"),e}reportRoute(t){}onChange(t){this.bhvSub.obEngorMood(t.value),this.metric=t.value}screenOffStat(t){const e=this.as.CamOffUsersArr.filter(e=>{if(e.id===t.std_id)return e.time}),n=this.utility.getTimeDiff(new Date(e[0].time).getTime());return Math.floor(n/60)+":"+("0"+Math.floor(n%60)).slice(-2)}}return t.\u0275fac=function(e){return new(e||t)(i.Rb(s.b),i.Rb(l.a),i.Rb(s.a),i.Rb(d.a),i.Rb(u.a))},t.\u0275cmp=i.Lb({type:t,selectors:[["app-call-sidenav"]],viewQuery:function(t,e){if(1&t&&i.Uc(c.a,1),2&t){let t;i.Cc(t=i.gc())&&(e.accordion=t.first)}},inputs:{score:"score",toggleSideNav:"toggleSideNav",toggleSideNavfromStd:"toggleSideNavfromStd",check:"check",moduleName:"moduleName",students:"students"},outputs:{selectUser:"selectUser"},features:[i.Db],decls:1,vars:1,consts:[["id","navSidebar","fxLayout","column","class","expansionHeader","fxFlex","100","fxLayoutGap","10px",4,"ngIf"],["id","navSidebar","fxLayout","column","fxFlex","100","fxLayoutGap","10px",1,"expansionHeader"],["fxLayout","row","p-l8","","p-r8",""],["fxLayout","column","fxFlex","100","fxLayoutGap","10px"],["fxLayout","row","fxLayoutAlign","center center"],["src","/assets/MonetLiveWhite.png","width","60%","padding","","alt","monet","pointer","",3,"click"],["full-width",""],["fxLayout","row","fxLayoutAlign","space-between center",3,"ngModel","color","ngModelChange","change"],["title-white14-400","",3,"ngClass","value",4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutGap","8px","style","background-color: aquamarine",4,"ngFor","ngForOf"],["fxLayoutAlign","space-between center","title-white14-400","","pointer","",3,"ngStyle","matTooltip","click"],["fxLayout","row"],["title-tertiary14-400",""],["title-white14-400",""],["hideToggle","",3,"expanded"],[2,"border","1px solid white"],["fxLayoutAlign","space-between center","title-white14-400",""],["title-secondary12-400","","fxLayoutAlign","center center"],["matExpansionPanelContent",""],[3,"multi"],["hideToggle","",3,"expanded","disabled",4,"ngFor","ngForOf"],["title-white14-400","",3,"ngClass","value"],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutGap","8px",2,"background-color","aquamarine"],["fxLayoutAlign","center center","fxLayoutGap","10px","pointer","",3,"click"],[1,"name-list"],["title-white12-400",""],["fxLayout","row","fxLayoutAlign","end end",4,"ngIf"],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutAlign","space-between center",3,"ngClass","click",4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","end end"],["title-tertiary10-400","","p-r8",""],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutAlign","space-between center",3,"ngClass","click"],["fxLayoutAlign","center center","fxLayoutGap","10px"],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutGap","5px"],["title-white14-400","",3,"hidden"],["hideToggle","",3,"expanded","disabled"],["pointer","",3,"ngStyle","click"],["title-white12-400","","fxLayoutAlign","center center",3,"ngClass"],["matExpansionPanelContent","","style","background-color: #697386 !important;"],[4,"ngFor","ngForOf","ngForTrackBy"],["fxLayout","row","fxLayoutAlign","space-between center",3,"ngClass","click"],["fxLayout","column","fxLayoutGap","0px"],["title-white12-400","","id","sideNavFont"],["title-secondary10-300","","id","sideNavDuartion"],["fxLayout","row","fxLayoutAlign","center center",3,"ngClass"],["xsmall","","fxLayoutAlign","center center"],["title-tertiary14-300","",4,"ngIf"],["title-tertiary14-300",""]],template:function(t,e){1&t&&i.Nc(0,U,37,21,"div",0),2&t&&i.qc("ngIf",void 0!==e.studentList)},directives:[b.n,f.f,f.b,f.g,f.e,m.a,p.b,r.s,r.v,b.m,b.o,g.c,h.a,c.a,c.c,c.f,c.e,x.a,c.d,p.a,b.l,g.a],pipes:[v.a,b.w],styles:["mat-list-option[_ngcontent-%COMP%]   .mat-list-text[_ngcontent-%COMP%]{flex-direction:row;box-sizing:border-box;display:flex;place-content:stretch space-between;align-items:stretch}.name-list[_ngcontent-%COMP%]{padding:5px;cursor:pointer;color:#fff}.expansionHeader[_ngcontent-%COMP%]{padding:0 5%;overflow-y:auto}#sideNavDuartion[_ngcontent-%COMP%]{line-height:1}#navSidebar   [_nghost-%COMP%]     .mat-radio-container, #navSidebar   [_nghost-%COMP%]     .mat-radio-inner-circle, #navSidebar   [_nghost-%COMP%]     .mat-radio-outer-circle{height:15px;width:15px}#navSidebar   [_nghost-%COMP%]     .mat-radio-button .mat-radio-ripple{height:15px;width:15px;left:calc(50% - 15px);top:calc(50% - 15px)}#navSidebar[_ngcontent-%COMP%]     .mat-radio-label-content{color:#fff}.rowWrap[_ngcontent-%COMP%]{white-space:nowrap;text-overflow:ellipsis}.removePadding[_ngcontent-%COMP%]{padding:0!important}"],changeDetection:0}),t})()}}]);