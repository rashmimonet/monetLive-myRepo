(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{oj0J:function(t,e,n){"use strict";n.r(e),n.d(e,"StudentLoginModule",function(){return W});var i=n("ofXK"),o=n("mrSG"),s=n("v0EB"),a=n("0Lug"),r=n("kYN2"),c=n("3Pt+"),d=n("9Lv8"),m=n("fXoL"),u=n("LUsR"),l=n("tyNb"),h=n("iiAa"),g=n("0IaG"),p=n("znSr"),b=n("bTqV"),f=n("NFeN");const v=["studentStream"],x=["myCanvas"];function w(t,e){1&t&&(m.Xb(0,"div",6),m.Xb(1,"div",7),m.Sb(2,"img",8),m.Wb(),m.Xb(3,"h2",9),m.Pc(4,"Allow Monet Live to use your camera and microphone"),m.Wb(),m.Xb(5,"p",10),m.Pc(6,"Monet Live needs access to your camera and microphone so that other participants can see and hear you. Monet Live require your camera and microphone access to capture your realtime Engagement during this call."),m.Wb(),m.Wb())}function y(t,e){if(1&t&&(m.Xb(0,"div",11),m.Xb(1,"h2",12),m.Pc(2,"Your camera and microphone are blocked"),m.Wb(),m.Xb(3,"p"),m.Pc(4,"Monet Live require access to your camera and microphone. Please make sure your browser setting allow camera and microphone permission to this website."),m.Wb(),m.Xb(5,"p",13),m.Pc(6,"Hint: Click the camera blocked icon in your browser address bar to change your settings and then refresh this page"),m.Wb(),m.Wb()),2&t){const t=m.jc();m.qc("ngSwitch",t.case)}}function C(t,e){if(1&t){const t=m.Yb();m.Vb(0),m.Xb(1,"button",29),m.fc("click",function(){m.Fc(t);const n=e.$implicit,i=m.jc(2);return n.status=!n.status,i.mainActions(n)}),m.Xb(2,"mat-icon",30),m.Pc(3),m.Wb(),m.Wb(),m.Ub()}if(2&t){const t=e.$implicit;m.Fb(2),m.qc("id",t.icon)("inline",!0),m.Fb(1),m.Qc(t.status?t.icon:t.iconop)}}function k(t,e){if(1&t){const t=m.Yb();m.Xb(0,"div",14),m.Xb(1,"div",15),m.Xb(2,"div",16),m.Xb(3,"video",17,18),m.fc("loadedmetadata",function(e){return m.Fc(t),m.jc().loadedMetaData(e)})("loadstart",function(e){return m.Fc(t),m.jc().onLoadStart(e)}),m.Wb(),m.Wb(),m.Xb(5,"div",19),m.Sb(6,"canvas",20,21),m.Nc(8,C,4,3,"ng-container",22),m.Wb(),m.Xb(9,"form",23),m.Xb(10,"div",24),m.Xb(11,"label",25),m.Pc(12,"Enter your name"),m.Wb(),m.Sb(13,"input",26),m.Wb(),m.Xb(14,"div",27),m.Xb(15,"button",28),m.fc("click",function(){return m.Fc(t),m.jc().askToJoin()}),m.Pc(16," Ask to Join "),m.Wb(),m.Wb(),m.Wb(),m.Wb(),m.Wb()}if(2&t){const t=m.jc();m.Fb(3),m.qc("muted","muted"),m.Fb(5),m.qc("ngForOf",t.actions),m.Fb(1),m.qc("formGroup",t.studentLoginForm),m.Fb(6),m.qc("ngClass","INVALID"===t.studentLoginForm.status?"ask-to-join-inactive":"ask-to-join-active")}}function P(t,e){1&t&&(m.Xb(0,"div",6),m.Xb(1,"h2",31),m.Pc(2,"Meeting has not started"),m.Wb(),m.Xb(3,"p",32),m.Pc(4,"The moderator has not started the meeting yet. You will be redirected to login page once meeting is started"),m.Wb(),m.Wb())}let S=(()=>{class t{constructor(t,e,n,i,o,s,a,r,c,d,m,u){this.sl=t,this.changeDetectorRef=e,this.bhvSub=n,this.route=i,this.apiService=o,this.socketService=s,this.utility=a,this.formBuilder=r,this.zone=c,this.dialog=d,this.datePipe=m,this.router=u,this.scheduled=void 0,this.case=0,this.spinnerMode="determinate",this.permission=!1,this.rejected=!1,this.action=!0,this.id=this.utility.create_UUID().replaceAll("-",""),this.permissions={audio:!0,video:!0,screen:!1},this.video={loadstart:!0,buffering:!1,canplay:!1},this.startMeet=!0,this.actions=[{name:"Mute",nameop:"Unmute",value:"audio",icon:"mic",status:!0,iconop:"mic_off"},{name:"Stop Camera",value:"video",icon:"videocam",nameop:"Share Camera",status:!0,iconop:"videocam_off"}],localStorage.setItem("student_uuid",this.id)}ngAfterViewInit(){}ngOnInit(){this.studentLoginForm=this.formBuilder.group({name:["",c.z.required],roomid:["",c.z.required],room:["",c.z.required],id:["",c.z.required]}),this.queryParamsSubscription=this.route.queryParams.subscribe(t=>{this.urlParams=t,this.studentLoginForm.setValue({name:"",roomid:this.urlParams.room,room:this.urlParams.room,id:this.id})},t=>{console.error(t)},()=>{console.log("completed")}),this.sl.load("janus").then(()=>{this.sl.load("user").then(()=>{this.getRoomIp(this.urlParams.roomid)})}),this.interval=setInterval(()=>{this.getRoomIp(this.urlParams.roomid)},3e3)}ngOnDestroy(){this.queryParamsSubscription.unsubscribe(),mediaDev.stop()}getRoomIp(t){this.apiService.getApiStatic("getRoomIp?roomid="+t).subscribe(t=>{if(!t.error){if(this.scheduled=t.room.scheduled,""===t.room.grp&&""===t.room.instance)return void(this.case=3);void 0!==t.room.grp&&void 0!==t.room.instance&&(clearInterval(this.interval),this.serverGrp=t.room.grp,this.serverIp=t.room.instance,this.bhvSub.obDynamicLink(t.room.grp),fetchAvailableInstance(this.serverGrp,this.serverIp),this.socketService.generateSocket(),this.socketService.socket.on("join-response",t=>{!1===t.confirmed&&this.zone.run(()=>{this.router.navigate(["student/rejected"],{queryParams:this.studentLoginForm.value}).then().catch()}),t.confirmed&&this.zone.run(()=>{this.router.navigate(["student/dashboard"],{queryParams:this.studentLoginForm.value}).then().catch()})}),this.socketService.socket.on("call-not-started",t=>{this.case=3}),this.socketService.socket.on("meeting-initiated",t=>{this.case=2,this.socketService.socket.emit("join-request",{roomid:this.studentLoginForm.value.roomid,uuid:this.studentLoginForm.value.id,name:this.studentLoginForm.value.name}),this.router.navigate(["student/waiting-room"],{queryParamsHandling:"merge"}).then().catch()}),this.socketService.socket.on("assignment-broadcast",t=>{this.assignmentData=t,localStorage.setItem("assignment",JSON.stringify(t)),this.openDialogBox()}),mediaDev.on("media",t=>Object(o.b)(this,void 0,void 0,function*(){studentStream=t,this.case=2,this.changeDetectorRef.detectChanges();const e=document.getElementById("studentStream");console.log("Native Canvas Element",this.myCanvas.nativeElement),this.context=this.myCanvas.nativeElement.getContext("2d"),e&&(e.srcObject=t)})),mediaDev.on("media-error",t=>{console.error("media-error",t),this.case=1}),mediaDev.start())}})}loadedMetaData(t){this.startMeet=!1}onLoadStart(t){t&&(this.video.loadstart=!1)}openDialogBox(){this.dialog.open(d.a,{disableClose:!0,width:"auto",height:"auto",data:this.assignmentData}).afterClosed().subscribe(t=>{})}askToJoin(){"VALID"===this.studentLoginForm.status&&(this.getUser(this.studentLoginForm.value.roomid),this.socketService.socket.emit("join-request",{roomid:this.studentLoginForm.value.roomid,uuid:this.studentLoginForm.value.id,name:this.studentLoginForm.value.name}),this.router.navigate(["student/waiting-room"],{queryParamsHandling:"merge"}).then().catch())}getUser(t){this.apiService.getApi("user_list?id="+t).subscribe(t=>Object(o.b)(this,void 0,void 0,function*(){t&&t.response&&t.response.length>0&&(this.userList=t.response)}))}checkRoom(){this.getRoomIp(this.urlParams.roomid)}mainActions(t){switch(t.value){case"video":this.permissions.video=t.status,mediaDev.toggleVideo(t.status),this.socketService.socket.emit("preview-toggle-video",{status:t.status});break;case"audio":this.permissions.audio=t.status,mediaDev.toggleAudio(t.status),this.socketService.socket.emit("preview-toggle-audio",{status:t.status})}}}return t.\u0275fac=function(e){return new(e||t)(m.Rb(a.a),m.Rb(m.h),m.Rb(u.a),m.Rb(l.a),m.Rb(s.a),m.Rb(r.a),m.Rb(h.a),m.Rb(c.g),m.Rb(m.B),m.Rb(g.b),m.Rb(i.e),m.Rb(l.b))},t.\u0275cmp=m.Lb({type:t,selectors:[["app-student-login"]],viewQuery:function(t,e){if(1&t&&(m.Uc(v,1),m.Uc(x,1)),2&t){let t;m.Cc(t=m.gc())&&(e.studentStream=t.first),m.Cc(t=m.gc())&&(e.myCanvas=t.first)}},features:[m.Eb([s.a,a.a,r.a])],decls:7,vars:5,consts:[["src","/assets/MonetLiveWhite.png","monetLogo",""],[1,"main-container"],[3,"ngSwitch"],["class","permission-request-container",4,"ngSwitchCase"],["class","permission-rejected-container",3,"ngSwitch",4,"ngSwitchCase"],["class","user-preview-screen",4,"ngSwitchCase"],[1,"permission-request-container"],[2,"width","100%","display","flex","justify-content","center"],["src","https://www.monetlive.com/assets/MonetLiveBlack.png","alt","monet live logo",2,"height","64px","width","220px","margin-bottom","48px"],[2,"color","black","margin-bottom","32px"],[2,"text-align","start","font-size","medium"],[1,"permission-rejected-container",3,"ngSwitch"],[2,"color","#f12020"],[2,"color","orange","font-weight","bold"],[1,"user-preview-screen"],[1,"previewContainer"],[1,"webcam-stream-container"],["autoplay","","id","studentStream","height","330px","width","450px",2,"position","absolute","top","0",3,"muted","loadedmetadata","loadstart"],["studentStream",""],[1,"button-controls"],["width","30px","height","100px"],["myCanvas",""],[4,"ngFor","ngForOf"],[1,"student-form",3,"formGroup"],[1,"name-input-container"],[1,"name-label"],["type","text","id","name","formControlName","name",1,"student-name"],[1,"ask-to-join-button-container"],["type","submit",1,"ask-to-join-active",3,"ngClass","click"],["mat-fab","","color","primary",2,"margin-bottom","8%",3,"click"],[3,"id","inline"],[2,"color","black","text-align","center"],[2,"text-align","center"]],template:function(t,e){1&t&&(m.Sb(0,"img",0),m.Xb(1,"div",1),m.Vb(2,2),m.Nc(3,w,7,0,"div",3),m.Nc(4,y,7,1,"div",4),m.Nc(5,k,17,4,"div",5),m.Nc(6,P,5,0,"div",3),m.Ub(),m.Wb()),2&t&&(m.Fb(2),m.qc("ngSwitch",e.case),m.Fb(1),m.qc("ngSwitchCase",0),m.Fb(1),m.qc("ngSwitchCase",1),m.Fb(1),m.qc("ngSwitchCase",2),m.Fb(1),m.qc("ngSwitchCase",3))},directives:[i.p,i.q,i.m,c.A,c.t,c.k,c.d,c.s,c.i,i.l,p.a,b.a,f.a],styles:["[monetLogo][_ngcontent-%COMP%]{height:50px;position:fixed;top:20px;left:20px}.main-container[_ngcontent-%COMP%]{font-family:CircularStd-book!important;background-color:#000;width:100%;min-width:100%;max-width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}.permission-request-container[_ngcontent-%COMP%]{width:35%;min-width:35%;max-width:35%;padding:48px;justify-content:center}.permission-rejected-container[_ngcontent-%COMP%], .permission-request-container[_ngcontent-%COMP%]{font-family:CircularStd-book!important;border-radius:8px;height:auto;background-color:#fff;display:flex;flex-direction:column}.permission-rejected-container[_ngcontent-%COMP%]{width:45%;min-width:45%;max-width:45%;padding:24px}.user-preview-screen[_ngcontent-%COMP%]{border-radius:8px;background-color:#fff;width:400px;height:500px;display:flex;flex-direction:column}h2[_ngcontent-%COMP%]{font-weight:700;color:#000}h2[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-family:CircularStd-book!important;text-align:center}p[_ngcontent-%COMP%]{color:#4e4c4c}.previewContainer[_ngcontent-%COMP%]{position:relative;background-color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:auto;height:auto}.webcam-stream-container[_ngcontent-%COMP%]{top:0;position:absolute;display:flex;align-items:center;justify-content:center;background-color:#000;width:450px;height:330px;-webkit-clip-path:polygon(10% 10%,90% 10%,90% 90%,10% 90%);clip-path:polygon(10% 10%,90% 10%,90% 90%,10% 90%)}section[_ngcontent-%COMP%]{display:table}.example-button-row[_ngcontent-%COMP%]{display:table-cell;width:490px}.example-button-row[_ngcontent-%COMP%]   .mat-button-base[_ngcontent-%COMP%]{margin:15px}.example-flex-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap}.mat-icon-button[_ngcontent-%COMP%]{background:#5829a6;border-radius:50%;color:#fff;font-size:60px;padding:5%;display:flex;justify-content:center;align-items:center;bottom:40px}.mat-icon.mat-icon-inline[_ngcontent-%COMP%]{font-size:25px}#btn[_ngcontent-%COMP%]{color:#fff;background:linear-gradient(90deg,#77246c,#1e5aa1);border-radius:18px;margin-left:30%;padding:10px;width:45%;border:none}#studentStream[_ngcontent-%COMP%]{transform:rotateY(180deg)!important;-webkit-transform:rotateY(180deg)!important;-moz-transform:rotateY(180deg)!important}.student-form[_ngcontent-%COMP%]{position:absolute;padding-top:450px;flex-direction:column;height:30%}.name-input-container[_ngcontent-%COMP%], .student-form[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%}.name-label[_ngcontent-%COMP%]{padding-right:32px;width:150px;display:flex;justify-content:flex-end}.ask-to-join-button-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;padding:32px 0 46px}.ask-to-join-active[_ngcontent-%COMP%]{color:#fff}.ask-to-join-active[_ngcontent-%COMP%], .ask-to-join-inactive[_ngcontent-%COMP%]{cursor:pointer;border-radius:40px;min-width:180px;font-weight:400;font-size:medium;background:linear-gradient(135deg,#77246c,#1e5aa1);padding:12px 16px;border-style:none;outline:none}.ask-to-join-inactive[_ngcontent-%COMP%]{opacity:.7;color:#dcdcdc}.student-name[_ngcontent-%COMP%]{padding:8px 12px;outline:none;border:1px solid #000;width:150px}.button-controls[_ngcontent-%COMP%]{z-index:100;position:absolute;padding-top:265px;display:flex;justify-content:flex-end;align-items:center;width:100%;gap:24px;padding-right:75px}"]}),t})();var M=n("FpXt"),O=n("kmnG"),j=n("qFsG"),_=n("f0Cb"),F=n("wZkO"),L=n("d3UM");let q=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.Pb({type:t}),t.\u0275inj=m.Ob({imports:[[i.c,M.a,F.d,O.e,L.b,g.e,L.b,_.b,b.b]]}),t})();const X=[{path:"",component:S}];let W=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.Pb({type:t}),t.\u0275inj=m.Ob({imports:[[l.d.forChild(X),i.c,M.a,O.e,j.c,b.b,_.b,c.x,q,g.e]]}),t})()}}]);