!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function n(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{FPA4:function(e,a,o){"use strict";o.d(a,"a",function(){return r});var i=o("fXoL"),r=function(){var e=function(){function e(){t(this,e)}return n(e,[{key:"SecArrToMinuteArr",value:function(t){var e=[],n=0,a=0,o=0,i=t.length,r=this.diff_minutes(new Date(t[0].timestamp),new Date(t[t.length-1].timestamp)).minutes,c=this.diff_minutes(new Date(t[0].timestamp),new Date(t[t.length-1].timestamp)).seconds,s=Math.round(i/((60*r+c)/60));return t=t.map(function(t,i){a+=t.average_engagement,o+=t.average_mood,i%s==0&&(e.push({segment:n++,average_engagement:Math.round(a/s),average_mood:Math.round(o/s)}),a=0,o=0)}),e}},{key:"diff_minutes",value:function(t,e){var n=(e.getTime()-t.getTime())/1e3,a=(e.getTime()-t.getTime())/1e3;return a%=60,n/=60,{minutes:Math.abs(Math.floor(n)),seconds:Math.round(a)}}},{key:"updateArr",value:function(t,e,n){if(0===t||3===t){var a=[n.pieChartData[e].hi_percentage[t].toFixed(2),n.pieChartData[e].med_percentage[t].toFixed(2),n.pieChartData[e].low_percentage[t].toFixed(2)];if(0===t)return n.percentArr=a,a;if(3===t)return n.moodpercentArr=a,a}else if(1===t||2===t){var o=[n.pieChartData[e].hi_percentage[t].uuid.length?n.pieChartData[e].hi_percentage[t].uuid.length:0,n.pieChartData[e].med_percentage[t].uuid.length?n.pieChartData[e].med_percentage[t].uuid.length:0,n.pieChartData[e].low_percentage[t].uuid.length?n.pieChartData[e].low_percentage[t].uuid.length:0];if(1===t)return n.segUsersArr=o,o;if(2===t)return n.moodsegUsersArr=o,o}}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=i.Nb({token:e,factory:e.\u0275fac}),e}()},fm87:function(e,a,o){"use strict";o.r(a),o.d(a,"ReportsModule",function(){return ut});var i=o("FpXt"),r=o("tyNb"),c=o("fXoL"),s=o("v0EB"),l=o("kYN2"),u=o("LUsR"),d=o("0Lug"),f=o("iiAa"),b=o("XiUz"),g=o("c8Cp"),m=o("ofXK"),p=o("znSr"),h=o("0IaG"),v=o("bTqV"),y=o("NFeN"),D=o("+0xr");function x(t,e){if(1&t&&(c.Xb(0,"span",7),c.Pc(1),c.Wb()),2&t){var n=c.jc();c.Fb(1),c.Qc(n.msg)}}function w(t,e){if(1&t&&(c.Xb(0,"p",10),c.Pc(1),c.Wb()),2&t){var n=c.jc().$implicit;c.Fb(1),c.Rc("Assignment Name: ",n.title,"")}}function A(t,e){1&t&&(c.Xb(0,"th",22),c.Pc(1," Sr No "),c.Wb())}function P(t,e){if(1&t&&(c.Xb(0,"td",23),c.Pc(1),c.Wb()),2&t){var n=e.index;c.Fb(1),c.Rc(" ",n+1," ")}}function X(t,e){1&t&&(c.Xb(0,"th",22),c.Pc(1," Name "),c.Wb())}function C(t,e){if(1&t&&(c.Xb(0,"td",23),c.Pc(1),c.Wb()),2&t){var n=e.$implicit;c.Fb(1),c.Rc(" ",n.name," ")}}function F(t,e){1&t&&(c.Xb(0,"th",22),c.Pc(1," Total Questions "),c.Wb())}function k(t,e){if(1&t&&(c.Xb(0,"td",23),c.Pc(1),c.Wb()),2&t){var n=e.$implicit;c.Fb(1),c.Rc(" ",n.totalQuestion," ")}}function W(t,e){1&t&&(c.Xb(0,"th",22),c.Pc(1,"Average Engagement "),c.Wb())}function R(t,e){if(1&t&&(c.Xb(0,"td",23),c.Pc(1),c.kc(2,"number"),c.Wb()),2&t){var n=e.$implicit;c.Fb(1),c.Rc(" ",c.mc(2,1,n.overallEngagement,"1.0-0"),"% ")}}function L(t,e){1&t&&(c.Xb(0,"th",22),c.Pc(1,"Average Mood "),c.Wb())}function S(t,e){if(1&t&&(c.Xb(0,"td",23),c.Pc(1),c.kc(2,"number"),c.Wb()),2&t){var n=e.$implicit;c.Fb(1),c.Rc(" ",c.mc(2,1,n.overallMood,"1.0-0"),"% ")}}function M(t,e){1&t&&(c.Xb(0,"th",22),c.Pc(1," Scores "),c.Wb())}function _(t,e){if(1&t&&(c.Xb(0,"td",23),c.Pc(1),c.kc(2,"number"),c.Wb()),2&t){var n=e.$implicit;c.Fb(1),c.Sc(" ",n.totalQuestion>0?c.mc(2,2,n.score,"1.0-0"):n.score,"",n.totalQuestion>0?"%":""," ")}}function N(t,e){1&t&&c.Sb(0,"tr",24)}function I(t,e){1&t&&c.Sb(0,"tr",25)}function O(t,e){if(1&t&&(c.Xb(0,"table",11),c.Vb(1,12),c.Nc(2,A,2,0,"th",13),c.Nc(3,P,2,1,"td",14),c.Ub(),c.Vb(4,15),c.Nc(5,X,2,0,"th",13),c.Nc(6,C,2,1,"td",14),c.Ub(),c.Vb(7,16),c.Nc(8,F,2,0,"th",13),c.Nc(9,k,2,1,"td",14),c.Ub(),c.Vb(10,17),c.Nc(11,W,2,0,"th",13),c.Nc(12,R,3,4,"td",14),c.Ub(),c.Vb(13,18),c.Nc(14,L,2,0,"th",13),c.Nc(15,S,3,4,"td",14),c.Ub(),c.Vb(16,19),c.Nc(17,M,2,0,"th",13),c.Nc(18,_,3,5,"td",14),c.Ub(),c.Nc(19,N,1,0,"tr",20),c.Nc(20,I,1,0,"tr",21),c.Wb()),2&t){var n=c.jc().index,a=c.jc();c.qc("dataSource",a.score[n].participants),c.Fb(19),c.qc("matHeaderRowDef",a.displayedColumns),c.Fb(1),c.qc("matRowDefColumns",a.displayedColumns)}}function q(t,e){if(1&t&&(c.Xb(0,"div"),c.Sb(1,"br"),c.Nc(2,w,2,1,"p",8),c.Nc(3,O,21,3,"table",9),c.Wb()),2&t){var n=c.jc();c.Fb(2),c.qc("ngIf",0!==n.score.length),c.Fb(1),c.qc("ngIf",0!==n.score.length)}}var T,j=((T=function(){function e(n,a,o){var i=this;t(this,e),this.dialogRef=n,this.as=a,this.route=o,this.displayedColumns=["index","name","totalQuestion","overallEngagement","overallMood","score"],this.score=[],this.msg="",this.stopLoading=!1,this.route.queryParams.subscribe(function(t){t&&(i.roomId=t.roomid)})}return n(e,[{key:"ngOnInit",value:function(){this.getAssignment()}},{key:"getAssignment",value:function(){var t=this;this.as.getApiStatic("assignmentscore?roomid="+this.roomId).subscribe(function(e){e&&(document.getElementById("loading").style.display="none"),t.score=e.score,t.msg=0===t.score.length?"No Assignment":""})}}]),e}()).\u0275fac=function(t){return new(t||T)(c.Rb(h.f),c.Rb(s.a),c.Rb(r.a))},T.\u0275cmp=c.Lb({type:T,selectors:[["app-assignment"]],decls:10,vars:2,consts:[[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border",2,"overflow","hidden"],["id","loading",1,"sr-only"],[1,"container",2,"position","relative"],["mat-icon-button","",2,"color","#000","font-size","20px","top","0","right","0","position","absolute","transform","translate(50%, -50%)",3,"click"],["fxFlex","100","fxLayoutAlign","center center","style","font-weight: bold; margin-top:4%",4,"ngIf"],[4,"ngFor","ngForOf"],["fxFlex","100","fxLayoutAlign","center center",2,"font-weight","bold","margin-top","4%"],["style","font-weight: bold;",4,"ngIf"],["mat-table","","class","mat-elevation-z8",3,"dataSource",4,"ngIf"],[2,"font-weight","bold"],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","index"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","totalQuestion"],["matColumnDef","overallEngagement"],["matColumnDef","overallMood"],["matColumnDef","score"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(c.Xb(0,"div",0),c.Xb(1,"div",1),c.Sb(2,"span",2),c.Wb(),c.Wb(),c.Xb(3,"div",3),c.Xb(4,"button",4),c.fc("click",function(){return e.dialogRef.close(!0)}),c.Xb(5,"mat-icon"),c.Pc(6,"close"),c.Wb(),c.Wb(),c.Xb(7,"div"),c.Nc(8,x,2,1,"span",5),c.Wb(),c.Nc(9,q,4,2,"div",6),c.Wb()),2&t&&(c.Fb(8),c.qc("ngIf",0===e.score.length),c.Fb(1),c.qc("ngForOf",e.score))},directives:[v.a,y.a,m.n,m.m,b.b,b.e,D.k,D.c,D.e,D.b,D.g,D.j,D.d,D.a,D.f,D.i],pipes:[m.f],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-header-row[_ngcontent-%COMP%]{background:linear-gradient(90deg,#77246c,#1e5aa1);text-align:center;top:0;z-index:99}.mat-header-cell[_ngcontent-%COMP%]{color:#fff;font-size:15px;font-weight:700}  .mat-header-cell{text-align:center!important}.mat-cell[_ngcontent-%COMP%]{color:#fff;background-color:#000}  .mat-cell{text-align:center!important}#loading[_ngcontent-%COMP%]{position:absolute;left:50%;top:49%;z-index:1;margin-left:-5%;border-radius:50%;border:5px solid #f3f3f3;border-top-color:#8a2be2;width:35px;height:35px;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]}),T),E=o("tk/3"),G=o("STbY");function U(t,e){if(1&t&&c.Sb(0,"img",22),2&t){var n=c.jc();c.qc("src",null==n.userDetails?null:n.userDetails.avatar,c.Hc)}}function V(t,e){1&t&&(c.Xb(0,"mat-icon"),c.Pc(1," person "),c.Wb())}var z,Q=((z=function(){function e(n,a,o,i,r,c){var s=this;t(this,e),this.api=n,this.route=a,this.bhvSub=o,this.router=i,this.dialog=r,this.http=c,this.attendees=0,this.duration=0,this.dashBoardFunc=function(){s.router.navigate(["/profile/dashboard"])},this.route.queryParams.subscribe(function(t){t&&s.getRoom(t.roomid)}),this.userDetails=JSON.parse(String(localStorage.getItem("userDetails")))}return n(e,[{key:"getRoom",value:function(t){var e=this;this.api.getApiStatic("getInviteRoom?roomid="+t).subscribe(function(t){t&&(e.room=t.response)})}},{key:"ngOnInit",value:function(){var t,e,n,a,o=this;this.route.queryParams.subscribe(function(t){t&&(o.roomId=t.roomid)}),this.students=null===(t=this.students)||void 0===t?void 0:t.filter(function(t){if(!t.std_id.includes("___"))return t}),this.attendees=null===(e=this.students)||void 0===e?void 0:e.length,(null===(n=this.callDetails)||void 0===n?void 0:n.duration)>0&&(this.duration=new Date(1e3*(null===(a=this.callDetails)||void 0===a?void 0:a.duration)).toISOString().substr(14,6)),this.bhvSub.engOrMood$.subscribe(function(t){o.metric=t,o.engType=0===t?"Engagement":"Mood"})}},{key:"logout",value:function(){localStorage.clear(),sessionStorage.clear(),this.router.navigate(["/"])}},{key:"openDialog",value:function(t){this.router.navigateByUrl("report/view-pdf?roomid="+this.roomId).then(function(t){}).catch(function(t){console.error(t)})}},{key:"openDialogBox",value:function(){this.dialog.open(j,{autoFocus:!1,maxHeight:"100vh",minHeight:"100px",width:"50%",disableClose:!0}).afterClosed().subscribe(function(t){console.log("Dialog result: "+t)})}}]),e}()).\u0275fac=function(t){return new(t||z)(c.Rb(s.a),c.Rb(r.a),c.Rb(u.a),c.Rb(r.b),c.Rb(h.b),c.Rb(E.b))},z.\u0275cmp=c.Lb({type:z,selectors:[["app-top-bar"]],inputs:{students:"students",callDetails:"callDetails"},decls:49,vars:18,consts:[["fxLayout","row","fxLayoutAlign","start","title-white18-400","","fxLayoutGap","9%",2,"position","relative"],["fxLayout","column",2,"margin-right","10%"],["title-white16-600",""],["title-tertiary12-300",""],["title-white14-400",""],["fxLayout","row","fxLayoutGap","22px"],["fxLayoutAlign","start center","fxLayoutGap","5px","fxLayout","column"],["id","badge","badge","","title-white14-600",""],["title-white12-400",""],["fxLayout","row","fxLayoutGap","12px"],["fxLayout","column"],["fxLayoutAlign","center center","title-white16-600",""],["title-tertiary12-400","","fxLayoutAlign","center center"],["fxLayout","row","fxLayoutAlign","space-evenly start","fxLayoutGap","10px","fxFlex","auto"],["mat-button","",2,"background","linear-gradient(to right, #77246C, #1E5AA1)",3,"click"],["fxLayout","row","fxLayoutAlign","center start"],[2,"color","white","padding-right","5%","font-weight","500","white-space","nowrap","width","50%","overflow","hidden","text-overflow","ellipsis"],["id","icon","pointer","",3,"matMenuTriggerFor"],["width","40px","height","40px","style","border-radius: 50%",3,"src",4,"ngIf"],[4,"ngIf"],["menu","matMenu"],["fxFlex","row","fxLayout","row","mat-menu-item","","fxLayoutAlign","center center","pointer","","fxLayoutGap","10px",3,"click"],["width","40px","height","40px",2,"border-radius","50%",3,"src"]],template:function(t,e){if(1&t&&(c.Xb(0,"div",0),c.Xb(1,"div",1),c.Xb(2,"span",2),c.Pc(3),c.kc(4,"titlecase"),c.Wb(),c.Xb(5,"span",3),c.Pc(6),c.kc(7,"date"),c.Wb(),c.Xb(8,"span",4),c.Pc(9),c.Wb(),c.Wb(),c.Xb(10,"div",5),c.Xb(11,"span",4),c.Pc(12),c.Wb(),c.Xb(13,"div",6),c.Xb(14,"span",7),c.Pc(15),c.Wb(),c.Xb(16,"span",8),c.Pc(17,"Average"),c.Wb(),c.Wb(),c.Wb(),c.Xb(18,"div",9),c.Xb(19,"div",10),c.Xb(20,"span",11),c.Pc(21),c.Wb(),c.Xb(22,"span",12),c.Pc(23),c.Wb(),c.Wb(),c.Wb(),c.Xb(24,"div",13),c.Xb(25,"button",14),c.fc("click",function(t){return e.openDialog(t)}),c.Pc(26,"View PDF"),c.Wb(),c.Pc(27," \xa0 \xa0 "),c.Xb(28,"button",14),c.fc("click",function(){return e.openDialogBox()}),c.Pc(29,"Assignment"),c.Wb(),c.Wb(),c.Xb(30,"div",15),c.Xb(31,"span",16),c.Pc(32),c.kc(33,"titlecase"),c.Wb(),c.Xb(34,"div",17),c.Nc(35,U,1,1,"img",18),c.Nc(36,V,2,0,"mat-icon",19),c.Wb(),c.Xb(37,"mat-menu",null,20),c.Xb(39,"div",21),c.fc("click",function(){return e.dashBoardFunc()}),c.Xb(40,"mat-icon"),c.Pc(41,"dashboard"),c.Wb(),c.Xb(42,"span"),c.Pc(43,"Dashboard"),c.Wb(),c.Wb(),c.Xb(44,"div",21),c.fc("click",function(){return e.logout()}),c.Xb(45,"mat-icon"),c.Pc(46,"logout"),c.Wb(),c.Xb(47,"span"),c.Pc(48,"Logout"),c.Wb(),c.Wb(),c.Wb(),c.Wb(),c.Wb()),2&t){var n=c.Dc(38);c.Fb(3),c.Rc("",c.lc(4,11,null==e.room?null:e.room.summary)," "),c.Fb(3),c.Qc(c.mc(7,13,null==e.room||null==e.room.start?null:e.room.start.dateTime,"medium")),c.Fb(3),c.Rc("",e.attendees," Attendees"),c.Fb(3),c.Rc("Session ",e.engType,""),c.Fb(3),c.Qc(0===e.metric?e.callDetails.engagementAvg:e.callDetails.moodAvg),c.Fb(6),c.Rc("Participant ",e.engType,""),c.Fb(2),c.Rc("Every ",e.callDetails.finalDuration," minutes"),c.Fb(9),c.Qc(c.lc(33,16,null==e.userDetails?null:e.userDetails.name)),c.Fb(2),c.qc("matMenuTriggerFor",n),c.Fb(1),c.qc("ngIf",null==e.userDetails?null:e.userDetails.avatar),c.Fb(1),c.qc("ngIf",!(null!=e.userDetails&&e.userDetails.avatar))}},directives:[b.f,b.e,b.g,b.b,v.a,G.d,m.n,G.a,G.b,y.a],pipes:[m.w,m.e],styles:[".segment-chip[_ngcontent-%COMP%]{padding:16px 24px!important}.segment-chip.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary[_ngcontent-%COMP%]{background-color:#775fee!important}.segment-chip.mat-chip.mat-standard-chip[_ngcontent-%COMP%]{background-color:transparent!important;border:1px solid #775fee;color:#fff}#badge[_ngcontent-%COMP%]{border:2px solid #d69718;background-color:transparent} .mat-dialog-container{padding:20px!important}"]}),z),B=o("Xa2L");function H(t,e){if(1&t&&(c.Xb(0,"div",5),c.Sb(1,"app-top-bar",6),c.Xb(2,"div",7),c.Sb(3,"router-outlet"),c.Wb(),c.Wb()),2&t){var n=c.jc();c.Fb(1),c.qc("students",n.api.studentData)("callDetails",n.callDetails)}}var $=function(){return["customLoader"]};function J(t,e){1&t&&c.Sb(0,"mat-spinner",8),2&t&&c.qc("ngClass",c.tc(2,$))("diameter",50)}var Y,K,Z,tt,et=function(){return["side-nav"]},nt=[{path:"",component:(Y=function(){function e(n,a,o,i,r,c,s,l){var u=this;t(this,e),this.api=n,this.route=a,this.ss=o,this.router=i,this.bhvSub=r,this.sl=c,this.zone=s,this.utility=l,this.callDetails={engagementAvg:0,moodAvg:0,finalDuration:0},this.dataAvailable=!1,this.canLoadChild=!1,this.engMoodPostApi=function(t){u.api.postApi("addFinalReport",{roomid:t,report:{averageEngagement:u.callDetails.engagementAvg,averageMood:u.callDetails.moodAvg}}).subscribe(function(t){t.error&&u.utility.notify(t.message,"")})}}return n(e,[{key:"ngOnInit",value:function(){var t=this;this.sl.load("janus").then(function(){t.sl.load("user").then(function(){t.route.queryParams.subscribe(function(e){t.api.getApiStatic("getRoomIp?roomid="+e.roomid).subscribe(function(n){n.room.grp&&(fetchAvailableInstance(n.room.grp,n.room.instance),t.bhvSub.obDynamicLink(n.room.grp),e&&setTimeout(function(){return t.checkReportRes(e.roomid)},500))})})})})}},{key:"checkReportRes",value:function(t){var e,n=this;this.api.getApiStatic("getReportData?roomid="+t).subscribe(function(a){if(a)if(202===(null==a?void 0:a.code))e=setInterval(function(){n.checkReportRes(t)},500);else if(404===(null==a?void 0:a.code)){clearInterval(e);var o=JSON.parse(localStorage.getItem("userDetails")||"").email;n.api.postApi("generateReport",{roomid:t,creator_ID:o}).subscribe(function(e){n.setCallDetails(t,null==e?void 0:e.report)},function(t){return console.error("Generate Report API error",t)})}else localStorage.setItem("reportData",JSON.stringify(null==a?void 0:a.report)),n.setCallDetails(t,null==a?void 0:a.report)},function(t){return console.error("Get Report Data API error",t)})}},{key:"setCallDetails",value:function(t,e){var n=this;e&&this.api.getApiStatic("avg-engagement-req?roomid="+t).subscribe(function(a){if(a){var o=0,i=[];n.callDetails.duration=Math.ceil(n.utility.calculateDuration(a).duration/4),n.callDetails.finalDuration=n.utility.convertDate(Math.ceil(n.utility.calculateDuration(a).duration/4),60),n.api.studentData=a.map(function(t){var e=t.session_data.reduce(function(t,e){return o++,t.engAvg+=e.engagement,t.moodAvg+=e.mood,t},{engAvg:0,moodAvg:0});return i.push({eng:e.engAvg,mood:e.moodAvg}),t.engagement=0!==t.session_data.length?Math.floor(e.engAvg/t.session_data.length):0,t.category=n.utility.setCategory(t.engagement),t.category_engagement=t.engagement>80?"High":t.engagement>40?"Medium":"Low",t.stdDuration=n.utility.convertDate(n.utility.calculateDuration([t]).duration,60),t.mood=Math.floor(e.moodAvg/t.session_data.length),t.category_mood=t.mood>80?"High":t.mood>40?"Medium":"Low",t}),n.callDetails.engagementAvg=Math.floor(Math.round(i.reduce(function(t,e){return t+e.eng},0))/o),n.callDetails.moodAvg=Math.floor(Math.round(i.reduce(function(t,e){return t+e.mood},0))/o),n.finalStudentData=n.api.studentData,e.report||n.engMoodPostApi(t),n.canLoadChild=!0}})}},{key:"checkDataAvailability",value:function(t){return!(!t.pieData.length||!t.overallEngagement.length)}}]),e}(),Y.\u0275fac=function(t){return new(t||Y)(c.Rb(s.a),c.Rb(r.a),c.Rb(l.a),c.Rb(r.b),c.Rb(u.a),c.Rb(d.a),c.Rb(c.B),c.Rb(f.a))},Y.\u0275cmp=c.Lb({type:Y,selectors:[["app-reports"]],features:[c.Eb([])],decls:5,vars:6,consts:[["fxLayout","row","fxFlex",""],["fxLayout","column","fxFlex","18vw",2,"height","99%"],["full-width","",3,"ngClass","moduleName","students"],["fxLayout","column","fxFlex","","overflowAuto","",4,"ngIf"],[3,"ngClass","diameter",4,"ngIf"],["fxLayout","column","fxFlex","","overflowAuto",""],["padding","",3,"students","callDetails"],["fxFlex",""],[3,"ngClass","diameter"]],template:function(t,e){1&t&&(c.Xb(0,"div",0),c.Xb(1,"div",1),c.Sb(2,"app-call-sidenav",2),c.Wb(),c.Nc(3,H,4,2,"div",3),c.Wb(),c.Nc(4,J,1,3,"mat-spinner",4)),2&t&&(c.Fb(2),c.qc("ngClass",c.tc(5,et))("moduleName","report")("students",e.finalStudentData),c.Fb(1),c.qc("ngIf",e.canLoadChild),c.Fb(1),c.qc("ngIf",!e.canLoadChild))},directives:[b.f,b.b,g.a,m.l,p.a,m.n,Q,r.e,B.c],styles:[".side-nav[_ngcontent-%COMP%]{height:100vh;overflow-y:auto}.customLoader[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"]}),Y),children:[{path:"dashboard",loadChildren:function(){return Promise.all([o.e(3),o.e(8),o.e(15),o.e(38)]).then(o.bind(null,"ErGM")).then(function(t){return t.DashboardModule})}},{path:"view-pdf",loadChildren:function(){return Promise.all([o.e(3),o.e(8),o.e(15),o.e(0),o.e(30)]).then(o.bind(null,"LpwJ")).then(function(t){return t.SplineModule})}},{path:"student-detail",loadChildren:function(){return Promise.all([o.e(3),o.e(8),o.e(26)]).then(o.bind(null,"xOm6")).then(function(t){return t.StudentDetailModule})}},{path:"",pathMatch:"full",redirectTo:"dashboard"}]}],at=((K=n(function e(){t(this,e)})).\u0275fac=function(t){return new(t||K)},K.\u0275mod=c.Pb({type:K}),K.\u0275inj=c.Ob({imports:[[r.d.forChild(nt)],r.d]}),K),ot=o("4GZO"),it=o("Dhln"),rt=o("A5z7"),ct=o("FPA4"),st=((Z=n(function e(){t(this,e)})).\u0275fac=function(t){return new(t||Z)},Z.\u0275mod=c.Pb({type:Z}),Z.\u0275inj=c.Ob({providers:[ct.a],imports:[[i.a,rt.e,h.e]]}),Z),lt=o("rkV7"),ut=((tt=n(function e(){t(this,e)})).\u0275fac=function(t){return new(t||tt)},tt.\u0275mod=c.Pb({type:tt}),tt.\u0275inj=c.Ob({providers:[m.e,l.a,s.a,d.a,it.a,lt.a],imports:[[i.a,ot.a,at,st,B.b,h.e,v.b,D.m]]}),tt)},rkV7:function(e,a,o){"use strict";o.d(a,"a",function(){return c});var i=o("2Vo4"),r=o("fXoL"),c=function(){var e=function(){function e(){t(this,e),this._dataSource=new i.a(!0),this.currentStatus$=this._dataSource.asObservable()}return n(e,[{key:"changeStatus",value:function(t){this._dataSource.next(t)}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=r.Nb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()}}])}();