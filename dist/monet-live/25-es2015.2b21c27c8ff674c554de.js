(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{FPA4:function(t,e,a){"use strict";a.d(e,"a",function(){return o});var n=a("fXoL");let o=(()=>{class t{constructor(){}SecArrToMinuteArr(t){const e=[];let a=0,n=0,o=0;const i=t.length,r=this.diff_minutes(new Date(t[0].timestamp),new Date(t[t.length-1].timestamp)).minutes,s=this.diff_minutes(new Date(t[0].timestamp),new Date(t[t.length-1].timestamp)).seconds,c=Math.round(i/((60*r+s)/60));return t=t.map((t,i)=>{n+=t.average_engagement,o+=t.average_mood,i%c==0&&(e.push({segment:a++,average_engagement:Math.round(n/c),average_mood:Math.round(o/c)}),n=0,o=0)}),e}diff_minutes(t,e){let a=(e.getTime()-t.getTime())/1e3,n=(e.getTime()-t.getTime())/1e3;return n%=60,a/=60,{minutes:Math.abs(Math.floor(a)),seconds:Math.round(n)}}updateArr(t,e,a){if(0===t||3===t){const n=[a.pieChartData[e].hi_percentage[t].toFixed(2),a.pieChartData[e].med_percentage[t].toFixed(2),a.pieChartData[e].low_percentage[t].toFixed(2)];if(0===t)return a.percentArr=n,n;if(3===t)return a.moodpercentArr=n,n}else if(1===t||2===t){const n=[a.pieChartData[e].hi_percentage[t].uuid.length?a.pieChartData[e].hi_percentage[t].uuid.length:0,a.pieChartData[e].med_percentage[t].uuid.length?a.pieChartData[e].med_percentage[t].uuid.length:0,a.pieChartData[e].low_percentage[t].uuid.length?a.pieChartData[e].low_percentage[t].uuid.length:0];if(1===t)return a.segUsersArr=n,n;if(2===t)return a.moodsegUsersArr=n,n}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=n.Nb({token:t,factory:t.\u0275fac}),t})()},fm87:function(t,e,a){"use strict";a.r(e),a.d(e,"ReportsModule",function(){return at});var n=a("FpXt"),o=a("tyNb"),i=a("fXoL"),r=a("v0EB"),s=a("kYN2"),c=a("LUsR"),l=a("0Lug"),u=a("iiAa"),d=a("XiUz"),b=a("c8Cp"),g=a("ofXK"),m=a("znSr"),h=a("0IaG"),p=a("bTqV"),f=a("NFeN"),v=a("+0xr");function D(t,e){if(1&t&&(i.Xb(0,"span",7),i.Pc(1),i.Wb()),2&t){const t=i.jc();i.Fb(1),i.Qc(t.msg)}}function x(t,e){if(1&t&&(i.Xb(0,"p",10),i.Pc(1),i.Wb()),2&t){const t=i.jc().$implicit;i.Fb(1),i.Rc("Assignment Name: ",t.title,"")}}function y(t,e){1&t&&(i.Xb(0,"th",22),i.Pc(1," Sr No "),i.Wb())}function w(t,e){if(1&t&&(i.Xb(0,"td",23),i.Pc(1),i.Wb()),2&t){const t=e.index;i.Fb(1),i.Rc(" ",t+1," ")}}function A(t,e){1&t&&(i.Xb(0,"th",22),i.Pc(1," Name "),i.Wb())}function P(t,e){if(1&t&&(i.Xb(0,"td",23),i.Pc(1),i.Wb()),2&t){const t=e.$implicit;i.Fb(1),i.Rc(" ",t.name," ")}}function X(t,e){1&t&&(i.Xb(0,"th",22),i.Pc(1," Total Questions "),i.Wb())}function F(t,e){if(1&t&&(i.Xb(0,"td",23),i.Pc(1),i.Wb()),2&t){const t=e.$implicit;i.Fb(1),i.Rc(" ",t.totalQuestion," ")}}function C(t,e){1&t&&(i.Xb(0,"th",22),i.Pc(1,"Average Engagement "),i.Wb())}function W(t,e){if(1&t&&(i.Xb(0,"td",23),i.Pc(1),i.kc(2,"number"),i.Wb()),2&t){const t=e.$implicit;i.Fb(1),i.Rc(" ",i.mc(2,1,t.overallEngagement,"1.0-0"),"% ")}}function R(t,e){1&t&&(i.Xb(0,"th",22),i.Pc(1,"Average Mood "),i.Wb())}function L(t,e){if(1&t&&(i.Xb(0,"td",23),i.Pc(1),i.kc(2,"number"),i.Wb()),2&t){const t=e.$implicit;i.Fb(1),i.Rc(" ",i.mc(2,1,t.overallMood,"1.0-0"),"% ")}}function S(t,e){1&t&&(i.Xb(0,"th",22),i.Pc(1," Scores "),i.Wb())}function M(t,e){if(1&t&&(i.Xb(0,"td",23),i.Pc(1),i.kc(2,"number"),i.Wb()),2&t){const t=e.$implicit;i.Fb(1),i.Sc(" ",t.totalQuestion>0?i.mc(2,2,t.score,"1.0-0"):t.score,"",t.totalQuestion>0?"%":""," ")}}function _(t,e){1&t&&i.Sb(0,"tr",24)}function k(t,e){1&t&&i.Sb(0,"tr",25)}function N(t,e){if(1&t&&(i.Xb(0,"table",11),i.Vb(1,12),i.Nc(2,y,2,0,"th",13),i.Nc(3,w,2,1,"td",14),i.Ub(),i.Vb(4,15),i.Nc(5,A,2,0,"th",13),i.Nc(6,P,2,1,"td",14),i.Ub(),i.Vb(7,16),i.Nc(8,X,2,0,"th",13),i.Nc(9,F,2,1,"td",14),i.Ub(),i.Vb(10,17),i.Nc(11,C,2,0,"th",13),i.Nc(12,W,3,4,"td",14),i.Ub(),i.Vb(13,18),i.Nc(14,R,2,0,"th",13),i.Nc(15,L,3,4,"td",14),i.Ub(),i.Vb(16,19),i.Nc(17,S,2,0,"th",13),i.Nc(18,M,3,5,"td",14),i.Ub(),i.Nc(19,_,1,0,"tr",20),i.Nc(20,k,1,0,"tr",21),i.Wb()),2&t){const t=i.jc().index,e=i.jc();i.qc("dataSource",e.score[t].participants),i.Fb(19),i.qc("matHeaderRowDef",e.displayedColumns),i.Fb(1),i.qc("matRowDefColumns",e.displayedColumns)}}function I(t,e){if(1&t&&(i.Xb(0,"div"),i.Sb(1,"br"),i.Nc(2,x,2,1,"p",8),i.Nc(3,N,21,3,"table",9),i.Wb()),2&t){const t=i.jc();i.Fb(2),i.qc("ngIf",0!==t.score.length),i.Fb(1),i.qc("ngIf",0!==t.score.length)}}let O=(()=>{class t{constructor(t,e,a){this.dialogRef=t,this.as=e,this.route=a,this.displayedColumns=["index","name","totalQuestion","overallEngagement","overallMood","score"],this.score=[],this.msg="",this.stopLoading=!1,this.route.queryParams.subscribe(t=>{t&&(this.roomId=t.roomid)})}ngOnInit(){this.getAssignment()}getAssignment(){this.as.getApiStatic("assignmentscore?roomid="+this.roomId).subscribe(t=>{t&&(document.getElementById("loading").style.display="none"),this.score=t.score,this.msg=0===this.score.length?"No Assignment":""})}}return t.\u0275fac=function(e){return new(e||t)(i.Rb(h.f),i.Rb(r.a),i.Rb(o.a))},t.\u0275cmp=i.Lb({type:t,selectors:[["app-assignment"]],decls:10,vars:2,consts:[[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border",2,"overflow","hidden"],["id","loading",1,"sr-only"],[1,"container",2,"position","relative"],["mat-icon-button","",2,"color","#000","font-size","20px","top","0","right","0","position","absolute","transform","translate(50%, -50%)",3,"click"],["fxFlex","100","fxLayoutAlign","center center","style","font-weight: bold; margin-top:4%",4,"ngIf"],[4,"ngFor","ngForOf"],["fxFlex","100","fxLayoutAlign","center center",2,"font-weight","bold","margin-top","4%"],["style","font-weight: bold;",4,"ngIf"],["mat-table","","class","mat-elevation-z8",3,"dataSource",4,"ngIf"],[2,"font-weight","bold"],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","index"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","totalQuestion"],["matColumnDef","overallEngagement"],["matColumnDef","overallMood"],["matColumnDef","score"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(i.Xb(0,"div",0),i.Xb(1,"div",1),i.Sb(2,"span",2),i.Wb(),i.Wb(),i.Xb(3,"div",3),i.Xb(4,"button",4),i.fc("click",function(){return e.dialogRef.close(!0)}),i.Xb(5,"mat-icon"),i.Pc(6,"close"),i.Wb(),i.Wb(),i.Xb(7,"div"),i.Nc(8,D,2,1,"span",5),i.Wb(),i.Nc(9,I,4,2,"div",6),i.Wb()),2&t&&(i.Fb(8),i.qc("ngIf",0===e.score.length),i.Fb(1),i.qc("ngForOf",e.score))},directives:[p.a,f.a,g.n,g.m,d.b,d.e,v.k,v.c,v.e,v.b,v.g,v.j,v.d,v.a,v.f,v.i],pipes:[g.f],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-header-row[_ngcontent-%COMP%]{background:linear-gradient(90deg,#77246c,#1e5aa1);text-align:center;top:0;z-index:99}.mat-header-cell[_ngcontent-%COMP%]{color:#fff;font-size:15px;font-weight:700}  .mat-header-cell{text-align:center!important}.mat-cell[_ngcontent-%COMP%]{color:#fff;background-color:#000}  .mat-cell{text-align:center!important}#loading[_ngcontent-%COMP%]{position:absolute;left:50%;top:49%;z-index:1;margin-left:-5%;border-radius:50%;border:5px solid #f3f3f3;border-top-color:#8a2be2;width:35px;height:35px;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]}),t})();var q=a("tk/3"),T=a("STbY");function j(t,e){if(1&t&&i.Sb(0,"img",22),2&t){const t=i.jc();i.qc("src",null==t.userDetails?null:t.userDetails.avatar,i.Hc)}}function E(t,e){1&t&&(i.Xb(0,"mat-icon"),i.Pc(1," person "),i.Wb())}let G=(()=>{class t{constructor(t,e,a,n,o,i){this.api=t,this.route=e,this.bhvSub=a,this.router=n,this.dialog=o,this.http=i,this.attendees=0,this.duration=0,this.dashBoardFunc=()=>{this.router.navigate(["/profile/dashboard"])},this.route.queryParams.subscribe(t=>{t&&this.getRoom(t.roomid)}),this.userDetails=JSON.parse(String(localStorage.getItem("userDetails")))}getRoom(t){this.api.getApiStatic("getInviteRoom?roomid="+t).subscribe(t=>{t&&(this.room=t.response)})}ngOnInit(){var t,e,a,n;this.route.queryParams.subscribe(t=>{t&&(this.roomId=t.roomid)}),this.students=null===(t=this.students)||void 0===t?void 0:t.filter(t=>{if(!t.std_id.includes("___"))return t}),this.attendees=null===(e=this.students)||void 0===e?void 0:e.length,(null===(a=this.callDetails)||void 0===a?void 0:a.duration)>0&&(this.duration=new Date(1e3*(null===(n=this.callDetails)||void 0===n?void 0:n.duration)).toISOString().substr(14,6)),this.bhvSub.engOrMood$.subscribe(t=>{this.metric=t,this.engType=0===t?"Engagement":"Mood"})}logout(){localStorage.clear(),sessionStorage.clear(),this.router.navigate(["/"])}openDialog(t){this.router.navigateByUrl("report/view-pdf?roomid="+this.roomId).then(t=>{}).catch(t=>{console.error(t)})}openDialogBox(){this.dialog.open(O,{autoFocus:!1,maxHeight:"100vh",minHeight:"100px",width:"50%",disableClose:!0}).afterClosed().subscribe(t=>{console.log("Dialog result: "+t)})}}return t.\u0275fac=function(e){return new(e||t)(i.Rb(r.a),i.Rb(o.a),i.Rb(c.a),i.Rb(o.b),i.Rb(h.b),i.Rb(q.b))},t.\u0275cmp=i.Lb({type:t,selectors:[["app-top-bar"]],inputs:{students:"students",callDetails:"callDetails"},decls:49,vars:18,consts:[["fxLayout","row","fxLayoutAlign","start","title-white18-400","","fxLayoutGap","9%",2,"position","relative"],["fxLayout","column",2,"margin-right","10%"],["title-white16-600",""],["title-tertiary12-300",""],["title-white14-400",""],["fxLayout","row","fxLayoutGap","22px"],["fxLayoutAlign","start center","fxLayoutGap","5px","fxLayout","column"],["id","badge","badge","","title-white14-600",""],["title-white12-400",""],["fxLayout","row","fxLayoutGap","12px"],["fxLayout","column"],["fxLayoutAlign","center center","title-white16-600",""],["title-tertiary12-400","","fxLayoutAlign","center center"],["fxLayout","row","fxLayoutAlign","space-evenly start","fxLayoutGap","10px","fxFlex","auto"],["mat-button","",2,"background","linear-gradient(to right, #77246C, #1E5AA1)",3,"click"],["fxLayout","row","fxLayoutAlign","center start"],[2,"color","white","padding-right","5%","font-weight","500","white-space","nowrap","width","50%","overflow","hidden","text-overflow","ellipsis"],["id","icon","pointer","",3,"matMenuTriggerFor"],["width","40px","height","40px","style","border-radius: 50%",3,"src",4,"ngIf"],[4,"ngIf"],["menu","matMenu"],["fxFlex","row","fxLayout","row","mat-menu-item","","fxLayoutAlign","center center","pointer","","fxLayoutGap","10px",3,"click"],["width","40px","height","40px",2,"border-radius","50%",3,"src"]],template:function(t,e){if(1&t&&(i.Xb(0,"div",0),i.Xb(1,"div",1),i.Xb(2,"span",2),i.Pc(3),i.kc(4,"titlecase"),i.Wb(),i.Xb(5,"span",3),i.Pc(6),i.kc(7,"date"),i.Wb(),i.Xb(8,"span",4),i.Pc(9),i.Wb(),i.Wb(),i.Xb(10,"div",5),i.Xb(11,"span",4),i.Pc(12),i.Wb(),i.Xb(13,"div",6),i.Xb(14,"span",7),i.Pc(15),i.Wb(),i.Xb(16,"span",8),i.Pc(17,"Average"),i.Wb(),i.Wb(),i.Wb(),i.Xb(18,"div",9),i.Xb(19,"div",10),i.Xb(20,"span",11),i.Pc(21),i.Wb(),i.Xb(22,"span",12),i.Pc(23),i.Wb(),i.Wb(),i.Wb(),i.Xb(24,"div",13),i.Xb(25,"button",14),i.fc("click",function(t){return e.openDialog(t)}),i.Pc(26,"View PDF"),i.Wb(),i.Pc(27," \xa0 \xa0 "),i.Xb(28,"button",14),i.fc("click",function(){return e.openDialogBox()}),i.Pc(29,"Assignment"),i.Wb(),i.Wb(),i.Xb(30,"div",15),i.Xb(31,"span",16),i.Pc(32),i.kc(33,"titlecase"),i.Wb(),i.Xb(34,"div",17),i.Nc(35,j,1,1,"img",18),i.Nc(36,E,2,0,"mat-icon",19),i.Wb(),i.Xb(37,"mat-menu",null,20),i.Xb(39,"div",21),i.fc("click",function(){return e.dashBoardFunc()}),i.Xb(40,"mat-icon"),i.Pc(41,"dashboard"),i.Wb(),i.Xb(42,"span"),i.Pc(43,"Dashboard"),i.Wb(),i.Wb(),i.Xb(44,"div",21),i.fc("click",function(){return e.logout()}),i.Xb(45,"mat-icon"),i.Pc(46,"logout"),i.Wb(),i.Xb(47,"span"),i.Pc(48,"Logout"),i.Wb(),i.Wb(),i.Wb(),i.Wb(),i.Wb()),2&t){const t=i.Dc(38);i.Fb(3),i.Rc("",i.lc(4,11,null==e.room?null:e.room.summary)," "),i.Fb(3),i.Qc(i.mc(7,13,null==e.room||null==e.room.start?null:e.room.start.dateTime,"medium")),i.Fb(3),i.Rc("",e.attendees," Attendees"),i.Fb(3),i.Rc("Session ",e.engType,""),i.Fb(3),i.Qc(0===e.metric?e.callDetails.engagementAvg:e.callDetails.moodAvg),i.Fb(6),i.Rc("Participant ",e.engType,""),i.Fb(2),i.Rc("Every ",e.callDetails.finalDuration," minutes"),i.Fb(9),i.Qc(i.lc(33,16,null==e.userDetails?null:e.userDetails.name)),i.Fb(2),i.qc("matMenuTriggerFor",t),i.Fb(1),i.qc("ngIf",null==e.userDetails?null:e.userDetails.avatar),i.Fb(1),i.qc("ngIf",!(null!=e.userDetails&&e.userDetails.avatar))}},directives:[d.f,d.e,d.g,d.b,p.a,T.d,g.n,T.a,T.b,f.a],pipes:[g.w,g.e],styles:[".segment-chip[_ngcontent-%COMP%]{padding:16px 24px!important}.segment-chip.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary[_ngcontent-%COMP%]{background-color:#775fee!important}.segment-chip.mat-chip.mat-standard-chip[_ngcontent-%COMP%]{background-color:transparent!important;border:1px solid #775fee;color:#fff}#badge[_ngcontent-%COMP%]{border:2px solid #d69718;background-color:transparent} .mat-dialog-container{padding:20px!important}"]}),t})();var U=a("Xa2L");function V(t,e){if(1&t&&(i.Xb(0,"div",5),i.Sb(1,"app-top-bar",6),i.Xb(2,"div",7),i.Sb(3,"router-outlet"),i.Wb(),i.Wb()),2&t){const t=i.jc();i.Fb(1),i.qc("students",t.api.studentData)("callDetails",t.callDetails)}}const z=function(){return["customLoader"]};function Q(t,e){1&t&&i.Sb(0,"mat-spinner",8),2&t&&i.qc("ngClass",i.tc(2,z))("diameter",50)}const B=function(){return["side-nav"]},H=[{path:"",component:(()=>{class t{constructor(t,e,a,n,o,i,r,s){this.api=t,this.route=e,this.ss=a,this.router=n,this.bhvSub=o,this.sl=i,this.zone=r,this.utility=s,this.callDetails={engagementAvg:0,moodAvg:0,finalDuration:0},this.dataAvailable=!1,this.canLoadChild=!1,this.engMoodPostApi=t=>{this.api.postApi("addFinalReport",{roomid:t,report:{averageEngagement:this.callDetails.engagementAvg,averageMood:this.callDetails.moodAvg}}).subscribe(t=>{t.error&&this.utility.notify(t.message,"")})}}ngOnInit(){this.sl.load("janus").then(()=>{this.sl.load("user").then(()=>{this.route.queryParams.subscribe(t=>{this.api.getApiStatic("getRoomIp?roomid="+t.roomid).subscribe(e=>{e.room.grp&&(fetchAvailableInstance(e.room.grp,e.room.instance),this.bhvSub.obDynamicLink(e.room.grp),t&&setTimeout(()=>this.checkReportRes(t.roomid),500))})})})})}checkReportRes(t){let e;this.api.getApiStatic("getReportData?roomid="+t).subscribe(a=>{if(a)if(202===(null==a?void 0:a.code))e=setInterval(()=>{this.checkReportRes(t)},500);else if(404===(null==a?void 0:a.code)){clearInterval(e);const{email:a}=JSON.parse(localStorage.getItem("userDetails")||"");this.api.postApi("generateReport",{roomid:t,creator_ID:a}).subscribe(e=>{this.setCallDetails(t,null==e?void 0:e.report)},t=>console.error("Generate Report API error",t))}else localStorage.setItem("reportData",JSON.stringify(null==a?void 0:a.report)),this.setCallDetails(t,null==a?void 0:a.report)},t=>console.error("Get Report Data API error",t))}setCallDetails(t,e){e&&this.api.getApiStatic("avg-engagement-req?roomid="+t).subscribe(a=>{if(a){let n=0;const o=[];this.callDetails.duration=Math.ceil(this.utility.calculateDuration(a).duration/4),this.callDetails.finalDuration=this.utility.convertDate(Math.ceil(this.utility.calculateDuration(a).duration/4),60),this.api.studentData=a.map(t=>{const e=t.session_data.reduce((t,e)=>(n++,t.engAvg+=e.engagement,t.moodAvg+=e.mood,t),{engAvg:0,moodAvg:0});return o.push({eng:e.engAvg,mood:e.moodAvg}),t.engagement=0!==t.session_data.length?Math.floor(e.engAvg/t.session_data.length):0,t.category=this.utility.setCategory(t.engagement),t.category_engagement=t.engagement>80?"High":t.engagement>40?"Medium":"Low",t.stdDuration=this.utility.convertDate(this.utility.calculateDuration([t]).duration,60),t.mood=Math.floor(e.moodAvg/t.session_data.length),t.category_mood=t.mood>80?"High":t.mood>40?"Medium":"Low",t}),this.callDetails.engagementAvg=Math.floor(Math.round(o.reduce((t,e)=>t+e.eng,0))/n),this.callDetails.moodAvg=Math.floor(Math.round(o.reduce((t,e)=>t+e.mood,0))/n),this.finalStudentData=this.api.studentData,e.report||this.engMoodPostApi(t),this.canLoadChild=!0}})}checkDataAvailability(t){return!(!t.pieData.length||!t.overallEngagement.length)}}return t.\u0275fac=function(e){return new(e||t)(i.Rb(r.a),i.Rb(o.a),i.Rb(s.a),i.Rb(o.b),i.Rb(c.a),i.Rb(l.a),i.Rb(i.B),i.Rb(u.a))},t.\u0275cmp=i.Lb({type:t,selectors:[["app-reports"]],features:[i.Eb([])],decls:5,vars:6,consts:[["fxLayout","row","fxFlex",""],["fxLayout","column","fxFlex","18vw",2,"height","99%"],["full-width","",3,"ngClass","moduleName","students"],["fxLayout","column","fxFlex","","overflowAuto","",4,"ngIf"],[3,"ngClass","diameter",4,"ngIf"],["fxLayout","column","fxFlex","","overflowAuto",""],["padding","",3,"students","callDetails"],["fxFlex",""],[3,"ngClass","diameter"]],template:function(t,e){1&t&&(i.Xb(0,"div",0),i.Xb(1,"div",1),i.Sb(2,"app-call-sidenav",2),i.Wb(),i.Nc(3,V,4,2,"div",3),i.Wb(),i.Nc(4,Q,1,3,"mat-spinner",4)),2&t&&(i.Fb(2),i.qc("ngClass",i.tc(5,B))("moduleName","report")("students",e.finalStudentData),i.Fb(1),i.qc("ngIf",e.canLoadChild),i.Fb(1),i.qc("ngIf",!e.canLoadChild))},directives:[d.f,d.b,b.a,g.l,m.a,g.n,G,o.e,U.c],styles:[".side-nav[_ngcontent-%COMP%]{height:100vh;overflow-y:auto}.customLoader[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"]}),t})(),children:[{path:"dashboard",loadChildren:()=>Promise.all([a.e(3),a.e(8),a.e(15),a.e(38)]).then(a.bind(null,"ErGM")).then(t=>t.DashboardModule)},{path:"view-pdf",loadChildren:()=>Promise.all([a.e(3),a.e(8),a.e(15),a.e(0),a.e(30)]).then(a.bind(null,"LpwJ")).then(t=>t.SplineModule)},{path:"student-detail",loadChildren:()=>Promise.all([a.e(3),a.e(8),a.e(26)]).then(a.bind(null,"xOm6")).then(t=>t.StudentDetailModule)},{path:"",pathMatch:"full",redirectTo:"dashboard"}]}];let $=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Pb({type:t}),t.\u0275inj=i.Ob({imports:[[o.d.forChild(H)],o.d]}),t})();var J=a("4GZO"),Y=a("Dhln"),K=a("A5z7"),Z=a("FPA4");let tt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Pb({type:t}),t.\u0275inj=i.Ob({providers:[Z.a],imports:[[n.a,K.e,h.e]]}),t})();var et=a("rkV7");let at=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Pb({type:t}),t.\u0275inj=i.Ob({providers:[g.e,s.a,r.a,l.a,Y.a,et.a],imports:[[n.a,J.a,$,tt,U.b,h.e,p.b,v.m]]}),t})()},rkV7:function(t,e,a){"use strict";a.d(e,"a",function(){return i});var n=a("2Vo4"),o=a("fXoL");let i=(()=>{class t{constructor(){this._dataSource=new n.a(!0),this.currentStatus$=this._dataSource.asObservable()}changeStatus(t){this._dataSource.next(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Nb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);