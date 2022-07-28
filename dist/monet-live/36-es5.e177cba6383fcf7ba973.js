!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{"jJ+q":function(e,i,a){"use strict";a.r(i),a.d(i,"ManagerVideoModule",function(){return at});var o,r=a("ofXK"),s=a("0Lug"),d=a("v0EB"),l=a("fXoL"),c=a("tyNb"),u=a("kYN2"),h=a("LUsR"),g=a("iiAa"),m=a("XiUz"),f=a("c8Cp"),p=a("znSr"),b=a("q1A0"),v=a("0IaG"),x=a("zkoq"),y=a("cclQ"),w=a("xJfa"),O=a("WlQZ"),_=((o=function(){function e(){t(this,e),this.series=[{name:"Engagement",color:"#ff8b51"},{name:"Mood",color:"#1393ff"}]}return n(e,[{key:"ngAfterViewInit",value:function(){this.createLineGraph()}},{key:"ngOnChanges",value:function(t){var e;if(t.data&&this.chart){var n=this.chart.data.length>50?1:0;if(this.average){var i=Object.values(null===(e=null==t?void 0:t.data)||void 0===e?void 0:e.currentValue).reduce(function(t,e){return e.NumberOfFaces>0&&(t.engagement+=e.engagement,t.mood+=e.mood_score),t},{engagement:0,mood:0});Object.keys(i).forEach(function(e){var n;if(i[e])return i[e]=i[e]/Object.values(null===(n=null==t?void 0:t.data)||void 0===n?void 0:n.currentValue).length,i}),this.chart.addData(Object.assign(Object.assign({},i),{date:new Date}))}else{var a=t.data.currentValue[this.stdId];a&&this.chart.addData({date:(new Date).getTime(),engagement:a.engagement||0,mood:a.mood_score||0},n)}}}},{key:"createLineGraph",value:function(){var t,e=this,n=this;y.k(O.a),y.h.commercialLicense=!0,this.chart=y.e("line-"+this.stdId,w.i),this.chart.hiddenState.properties.opacity=0,this.chart.padding(0,0,0,0),this.chart.zoomOutButton.disabled=!0,this.chart.data=[];var i=this.chart.xAxes.push(new w.c),a=i.renderer,o=i.periodChangeDateFormats;i.dateFormats.setKey("second","ss"),o.setKey("second","[bold]h:mm a"),o.setKey("minute","[bold]h:mm a"),o.setKey("hour","[bold]h:mm a"),a.grid.template.location=0,a.minGridDistance=30,a.inside=!0,a.axisFills.template.disabled=!0,a.ticks.template.disabled=!0,a.labels.template.fill=y.d("#777"),a.labels.template.fontSize="12px";var r=this.chart.yAxes.push(new w.h);r.tooltip.disabled=!0,r.interpolationDuration=500,r.rangeChangeDuration=500,r.renderer.inside=!0;var s=r.renderer,d=s.axisFills,l=s.ticks,c=s.labels;d.template.disabled=!0,l.template.disabled=!0,c.template.fill=y.d("#777"),c.template.fontSize="12px",this.series.map(function(t){var n,i,a=e.chart.series.push(new w.e);a.dataFields.dateX="date",a.dataFields.valueY=t.name.toLowerCase(),a.interpolationDuration=500,a.defaultState.transitionDuration=0,a.tooltipText="{"+t.name.toLowerCase()+"}",a.tooltip.getFillFromObject=!1,a.tooltip.background.fill=y.d(t.color),a.stroke=y.d(t.color),a.name=t.name,a.tooltipText="{name}: [bold]{valueY}[/]";var o=a.createChild(w.b);o.circle.radius=5,o.fillOpacity=1,o.fill=null===(i=null===(n=e.chart)||void 0===n?void 0:n.colors)||void 0===i?void 0:i.getIndex(0),o.isMeasured=!1,a.events.on("validated",function(){var t,e;o.moveTo(null===(e=null===(t=null==a?void 0:a.dataItems)||void 0===t?void 0:t.last)||void 0===e?void 0:e.point),o.validatePosition()})}),this.chart.events.on("datavalidated",function(){i.zoom({start:1/15,end:1.2},!1,!0)}),this.chart.events.on("beforedatavalidated",function(e){0===e.target.data.length?function(){if(t)t.show();else{(t=n.chart.tooltipContainer.createChild(y.a)).background.fill=y.d("#fff"),t.background.fillOpacity=.2,t.width=y.i(100),t.height=y.i(100);var e=t.createChild(y.b);e.text="No data...",e.align="center",e.valign="middle",e.fontSize=20,e.fill="white"}}():t&&t.hide()}),i.interpolationDuration=500,i.rangeChangeDuration=500,i.events.on("validated",function(){y.f.each(i.renderer.labels.iterator(),function(t){t.fillOpacity=t.fillOpacity})}),i.renderer.labels.template.adapter.add("rotation",function(t,e){var n=e.dataItem;return n.date&&n.date.getTime()===y.j.round(new Date(n.date.getTime()),"minute",1).getTime()?(e.verticalCenter="middle",e.horizontalCenter="left",-90):(e.verticalCenter="bottom",e.horizontalCenter="middle",0)}),this.chart.legend=new w.d,this.chart.legend.contentAlign="left",this.chart.legend.data.map(function(t,n){t.fill=y.d(e.series[n].color)}),this.chart.legend.fontSize="12px",this.chart.legend.maxWidth=100,this.chart.legend.labels.template.fill=y.d("#eee"),this.chart.legend.markers.template.width=12,this.chart.legend.markers.template.height=12,this.chart.legend.labels.template.textDecoration="none",this.chart.legend.valueLabels.template.textDecoration="none";var u=this.chart.legend.labels.template.states.getKey("active");u.properties.textDecoration="line-through",u.properties.fill=y.d("#777"),this.chart.legend.markers.template.children.getIndex(0).horizontalCenter="middle",this.chart.legend.useDefaultMarker=!0,this.chart.cursor=new w.j,this.chart.cursor.xAxis=r}}]),e}()).\u0275fac=function(t){return new(t||o)},o.\u0275cmp=l.Lb({type:o,selectors:[["app-line-graph"]],inputs:{stdId:"stdId",data:"data",average:"average"},features:[l.Db],decls:2,vars:1,consts:[["fxFlex","",2,"height","100%","width","100%"],[3,"id"]],template:function(t,e){1&t&&(l.Xb(0,"div",0),l.Sb(1,"div",1),l.Wb()),2&t&&(l.Fb(1),l.qc("id","line-"+e.stdId))},styles:[""]}),o),C=a("sjQA"),k=a("bTqV"),L=["studentContainer"];function P(t,e){if(1&t&&(l.Xb(0,"div",7),l.Sb(1,"video",8),l.Sb(2,"app-line-graph",9),l.Wb()),2&t){var n=l.jc();l.Fb(2),l.qc("stdId","screen-share")("data",n.graphData)("average",!0)}}var M=function(){return["student-preview"]};function j(t,e){if(1&t&&(l.Vb(0),l.Xb(1,"mat-grid-tile"),l.Xb(2,"div",10),l.Sb(3,"app-video-stream",11),l.Sb(4,"app-line-graph",12),l.Wb(),l.Wb(),l.Ub()),2&t){var n=e.$implicit,i=l.jc();l.Fb(2),l.qc("ngClass",l.tc(8,M)),l.Fb(1),l.qc("std",i.json.stringify(n))("mediaStreamObj",null==n?null:n.msobj)("selectUser",i.selectUser)("module","manager"),l.Fb(1),l.qc("stdId",n.std_id)("data",i.graphData)("average",!1)}}function F(t,e){1&t&&(l.Xb(0,"div",13),l.Xb(1,"span",14),l.Pc(2,"No participants"),l.Wb(),l.Wb())}var S,I=((S=function(){function e(n,i,a,o,r,s,d){t(this,e),this.as=n,this.route=i,this.router=a,this.dialog=o,this.ss=r,this.bhvSub=s,this.utility=d,this.shouldLoad=!1,this.index=0,this.json=JSON,this.size={col:5,row:3},this.graphData={},this.studentEmit=new l.o}return n(e,[{key:"intracted",value:function(){this.shouldLoad=!0}},{key:"ngOnChanges",value:function(t){var e,n,i;if((null===(e=null==t?void 0:t.selectUser)||void 0===e?void 0:e.currentValue)!==(null===(n=null==t?void 0:t.selectUser)||void 0===n?void 0:n.previousValue)&&!(null===(i=null==t?void 0:t.selectUser)||void 0===i?void 0:i.firstChange)){var a=t.selectUser.currentValue;this.router.navigate(["report/student-detail"],{queryParams:{roomid:a.roomid,student_id:a.std_id,module:"manager"}})}(null==t?void 0:t.Link)&&(this.dynamicLink=t.Link.currentValue)}},{key:"getSubscribedUsers",value:function(t,e,n,i,a,o){var r=this,s=this.studentsList.find(function(t){return t.std_id===n.uuid});s?s.msobj=e:this.studentsList.push({audio:o.janus.audio,engAvg:NaN,msobj:e,screen:o.janus.screen,video:o.janus.video,webcam:o.janus.webcam,name:o.name,proctor:o.proctor,roomid:o.janus.room,serverIP:null,time:null,std_id:n.uuid}),this.studentsList.forEach(function(t,e){var n;t.std_id.includes("___")&&(r.studentsList=r.studentsList.filter(function(t){var e;return-1===(null===(e=null==t?void 0:t.std_id)||void 0===e?void 0:e.indexOf("___"))}),n=[!0,1],r.screenshare=n[0],r.screen=n[1],setTimeout(function(){document.getElementById("screenShareStreem").srcObject=t.msobj},1e3))}),console.error("Students List(Updated) :",this.studentsList)}},{key:"ngAfterViewInit",value:function(){var t=this;this.route.queryParams.subscribe(function(e){t.param=e,0==t.index++&&t.getUsers(t.param.roomid)}),this.subSession=new StateSubscription("wss://www.monetlive.com/".concat(this.dynamicLink,"/rtc/"),this.param.id,parseInt(this.room,10),this.ss.socket),this.subSession.start(),this.subSession.on("remote",function(e){var n=e.type,i=e.stream,a=e.slot,o=e.mid,r=e.sub,s=e.user;setTimeout(function(){t.getSubscribedUsers(n,i,r,a,o,s)},3e3)}),this.ss.socket.emit("add-manager",{roomid:this.param.roomid}),this.subSession.start(),this.ss.socket.on("face-data",function(e){t.graphData=e,e&&(t.studentsList=t.studentsList.map(function(t){var n,i;return t.engagement=Math.floor((null===(n=e[t.std_id])||void 0===n?void 0:n.engagement)||0),t.mood=Math.floor((null===(i=e[t.std_id])||void 0===i?void 0:i.mood_score)||0),t.category_engagement=t.engagement>80?"High":t.engagement>40?"Medium":"Low",t.category_mood=t.mood>80?"High":t.mood>40?"Medium":"Low",t}),t.studentEmit.emit(t.studentsList))}),this.ss.socket.on("leave",function(e){var n,i;Object.keys(null==e?void 0:e.userObj).length&&(t.studentsList=t.studentsList.filter(function(t){var n;return(null==t?void 0:t.std_id)!==(null===(n=null==e?void 0:e.userObj)||void 0===n?void 0:n.uuid)}),!1===e.userObj.janus.screen&&e.userObj.uuid.includes("___")&&(n=[void 0,void 0,void 0],t.screen=n[0],t.screenshare=n[1],t.screenShareId=n[2]),t.studentEmit.emit(t.studentsList),t.utility.notify(e.userObj.name+((null===(i=null==e?void 0:e.userObj)||void 0===i?void 0:i.uuid.includes("___"))?" stopped sharing screen":" left the call"),""))})}},{key:"trackByUsers",value:function(t,e){return e.std_id}},{key:"ngOnInit",value:function(){document.body.click()}},{key:"getUsers",value:function(t){var e=this;this.as.getApi("user_list?id="+t).subscribe(function(t){if(t){if(t.response=t.response.filter(function(t){if(t.screen&&t.active&&(e.screenshare=!0),t.std_id!==e.param.id&&!t.screen&&t.active)return t}),t.response.length>1){var n=t.response.findIndex(function(t){return"proctor"===t.proctor});t.response.unshift(t.response.splice(n,1)[0])}if(e.selectUser){var i=e.selectUser.std_id;if(t.response.length>1){var a=t.response.findIndex(function(t){return t.std_id===i});t.response.unshift(t.response.splice(a,1)[0])}}e.studentsList=t.response,e.studentEmit.emit(e.studentsList)}})}},{key:"ngOnDestroy",value:function(){}}]),e}()).\u0275fac=function(t){return new(t||S)(l.Rb(d.a),l.Rb(c.a),l.Rb(c.b),l.Rb(v.b),l.Rb(u.a),l.Rb(h.a),l.Rb(g.a))},S.\u0275cmp=l.Lb({type:S,selectors:[["app-manager-video-panel"]],viewQuery:function(t,e){var n;1&t&&l.Uc(L,1),2&t&&l.Cc(n=l.gc())&&(e.studentContainer=n.first)},inputs:{module:"module",room:"room",actions:"actions",selectUser:"selectUser",Link:"Link"},outputs:{studentEmit:"studentEmit"},features:[l.Eb([d.a]),l.Db],decls:7,vars:6,consts:[["fxLayout","row","fxLayoutGap","10px"],["fxFlex","","class","screenshare-box","fxLayout","column","fxLayoutGap","20px",4,"ngIf"],["fxLayout","row wrap","fxLayoutGap","20px",1,"student-list",3,"fxFlex"],["studentContainer",""],["rowHeight","4:5","full-width","","gutterSize","5px",3,"cols"],[4,"ngFor","ngForOf","ngForTrackBy"],["fxFill","","fxLayout","row","fxLayoutAlign","center center",4,"ngIf"],["fxFlex","","fxLayout","column","fxLayoutGap","20px",1,"screenshare-box"],["id","screenShareStreem","height","100%","width","auto","autoplay","","muted","",1,"videocol"],[2,"max-height","200px","height","100%",3,"stdId","data","average"],["fxFill","","fxLayout","column","fxLayoutGap","10",3,"ngClass"],[2,"height","100%","border-bottom","1px solid #222",3,"std","mediaStreamObj","selectUser","module"],[3,"stdId","data","average"],["fxFill","","fxLayout","row","fxLayoutAlign","center center"],[2,"color","#ffffff","font-size","18px"]],template:function(t,e){1&t&&(l.Xb(0,"div",0),l.Nc(1,P,3,3,"div",1),l.Xb(2,"div",2,3),l.Xb(4,"mat-grid-list",4),l.Nc(5,j,5,9,"ng-container",5),l.Nc(6,F,3,0,"div",6),l.Wb(),l.Wb(),l.Wb()),2&t&&(l.Fb(1),l.qc("ngIf",e.screenshare),l.Fb(1),l.qc("fxFlex",e.screenshare?"350px":""),l.Fb(2),l.qc("cols",e.screenshare?1:4),l.Fb(1),l.qc("ngForOf",e.studentsList)("ngForTrackBy",e.trackByUsers),l.Fb(1),l.qc("ngIf",!(null!=e.studentsList&&e.studentsList.length)))},directives:[m.f,m.g,r.n,m.b,x.a,r.m,_,x.c,m.h,r.l,p.a,C.a,m.e],styles:[".student-list[_ngcontent-%COMP%]{height:calc(100vh - 80px);overflow-y:auto;padding:10px}.student-list[_ngcontent-%COMP%]   .student-preview[_ngcontent-%COMP%]{background:hsla(0,0%,100%,.1);box-sizing:border-box}.bubble[_ngcontent-%COMP%]{color:#fff;border-radius:50%;height:30px;width:30px}.avatar[_ngcontent-%COMP%], .bubble[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.avatar[_ngcontent-%COMP%]{border:1px solid #eee;height:50px;width:50px;border-radius:50%;text-align:center}.screenshare-box[_ngcontent-%COMP%]{background-color:#000;height:calc(100vh - 300px);margin:20px}.panel[_ngcontent-%COMP%]{margin:16px;height:auto}.panel[_ngcontent-%COMP%], .panel[_ngcontent-%COMP%]   .panel-head[_ngcontent-%COMP%]{border-radius:10px 10px 0 0}.panel[_ngcontent-%COMP%]   .panel-head[_ngcontent-%COMP%]{background-color:hsla(0,0%,100%,.1);padding:10px}.panel[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{height:100%!important;width:100%!important}.redDot[_ngcontent-%COMP%]{color:red}.greenDot[_ngcontent-%COMP%]{color:green}mat-grid-list[_ngcontent-%COMP%]{width:100%}.screen-div[_ngcontent-%COMP%]{max-width:70%;height:calc(100vh - 134px);position:relative;margin-right:10px}.screen-div[_ngcontent-%COMP%]   .title-name[_ngcontent-%COMP%]{padding:8px;border-top-right-radius:5px;border-top-left-radius:5px;font-size:16px;text-align:center;position:absolute;bottom:0;background:rgba(0,0,0,.43137254901960786);color:#fff}.single-grid[_ngcontent-%COMP%]{display:block;width:70%;margin:auto}.grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto;grid-gap:10px;padding:10px}.grid-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{text-align:center;padding:5px;font-size:30px;grid-row-start:1;grid-row-end:1;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.item1[_ngcontent-%COMP%]{grid-row-start:1!important;grid-row-end:3!important;grid-column-start:1;grid-column-end:3}.full-screen-div[_ngcontent-%COMP%]{width:70%;margin:0 auto}.single-view[_ngcontent-%COMP%]   .videodiv[_ngcontent-%COMP%]{height:90%;width:60%}mat-card[_ngcontent-%COMP%]{background-color:#fff!important}.line-chart[_ngcontent-%COMP%]{height:120px!important;position:absolute;bottom:0;width:100%}"]}),S);function D(t,e){if(1&t){var n=l.Yb();l.Xb(0,"app-manager-video-panel",7),l.fc("studentEmit",function(t){return l.Fc(n),l.jc().getStudents(t)}),l.Wb()}if(2&t){var i=l.jc();l.qc("room",i.room.room)("Link",i.dynamicLink)("module","manager")}}var U,q,z,R,X=function(){return["side-nav"]},A=((U=function(){function e(n,i,a,o,r,s,d,l,c){t(this,e),this.sl=n,this.router=i,this.route=a,this.datePipe=o,this.ss=r,this.api=s,this.zone=d,this.bhvSub=l,this.utility=c,this.loaded=!1,this.selectUser=!1,this.duration={time:"00:00:00",duration:0},this.date=new Date,this.students=[],this.messagePanel=!1}return n(e,[{key:"ngOnInit",value:function(){var t=this;this.sl.load("janus").then(function(e){t.sl.load("user").then(function(n){e[0].loaded&&n[0].loaded&&t.route.queryParams.subscribe(function(e){e&&(t.param=e,t.dynamicLink=e.grp,t.ss.managerSocket(e.grp),t.bhvSub.obDynamicLink(e.grp),t.api.getApi("verifyObserver?roomid="+e.roomid).subscribe(function(n){n.error?(console.error("Error encountered in Verify observer API"),t.utility.notify(""+n.message,""),t.router.navigate(["/auth"])):t.getRoom(e.roomid)},function(t){console.error("Verify Observer API error")}))})})});var e=[{value:30,cat:"low"},{value:50,cat:"average"},{value:70,cat:"high"}];this.students.map(function(t){return e.map(function(e){t.value>=e.value&&(t.cat=e.cat)}),t})}},{key:"getRoom",value:function(t){var e=this;this.api.getApi("getInviteRoom?roomid="+t).subscribe(function(t){t&&(e.room=t.response,e.loaded=!0)})}},{key:"getStudents",value:function(t){var e=this;this.students=t,0===this.duration.duration&&setInterval(function(){e.duration.duration++,e.duration.time=e.datePipe.transform(1e3*e.duration.duration,"H:mm:ss","UTC")||""},1e3)}}]),e}()).\u0275fac=function(t){return new(t||U)(l.Rb(s.a),l.Rb(c.b),l.Rb(c.a),l.Rb(r.e),l.Rb(u.a),l.Rb(d.a),l.Rb(l.B),l.Rb(h.a),l.Rb(g.a))},U.\u0275cmp=l.Lb({type:U,selectors:[["app-manager-video"]],features:[l.Eb([s.a,r.e,d.a])],decls:7,vars:8,consts:[["fxLayout","row","full-height",""],["fxLayout","column","fxLayoutAlign","start center","border","",2,"width","18vw","height","calc(100vh)"],["full-width","",3,"ngClass","moduleName","students"],["fxFlex","","fxLayout","row","full-height","","relative",""],["fxFlex",""],[3,"duration","room","role"],[3,"room","Link","module","studentEmit",4,"ngIf"],[3,"room","Link","module","studentEmit"]],template:function(t,e){1&t&&(l.Xb(0,"div",0),l.Xb(1,"div",1),l.Sb(2,"app-call-sidenav",2),l.Wb(),l.Xb(3,"div",3),l.Xb(4,"div",4),l.Sb(5,"app-top-bar",5),l.Nc(6,D,1,3,"app-manager-video-panel",6),l.Wb(),l.Wb(),l.Wb()),2&t&&(l.Fb(2),l.qc("ngClass",l.tc(7,X))("moduleName","manager")("students",e.students),l.Fb(3),l.qc("duration",e.duration)("room",e.room)("role","observer"),l.Fb(1),l.qc("ngIf",e.loaded))},directives:[m.f,m.e,f.a,r.l,p.a,m.b,b.a,r.n,I],styles:[".side-nav[_ngcontent-%COMP%]{overflow-y:auto}.message-btn[_ngcontent-%COMP%]{position:absolute;right:20px;bottom:20px}.message-panel[_ngcontent-%COMP%]{position:fixed;right:20px;bottom:80px;height:500px;width:300px;background:#fff;z-index:20}"]}),U),E=a("FpXt"),N=a("kmnG"),W=a("qFsG"),T=a("f0Cb"),V=a("3Pt+"),G=a("sOF7"),B=a("Qu3c"),K=a("NFeN"),J=a("4GZO"),Q=a("folJ"),H=a("tk/3"),Y=a("dNgK"),Z=a("2ChS"),$=((q=n(function e(){t(this,e)})).\u0275fac=function(t){return new(t||q)},q.\u0275mod=l.Pb({type:q}),q.\u0275inj=l.Ob({imports:[[r.c]]}),q),tt=a("pMjG"),et=((z=n(function e(){t(this,e)})).\u0275fac=function(t){return new(t||z)},z.\u0275mod=l.Pb({type:z}),z.\u0275inj=l.Ob({imports:[[E.a,K.b,k.b,B.b,H.c,Y.c,Z.a,x.b,v.e,$,tt.a]]}),z),nt=a("rjSt"),it=[{path:"",component:A}],at=((R=n(function e(){t(this,e)})).\u0275fac=function(t){return new(t||R)},R.\u0275mod=l.Pb({type:R}),R.\u0275inj=l.Ob({imports:[[c.d.forChild(it),r.c,E.a,N.e,W.c,k.b,T.b,V.x,G.a,B.b,K.b,J.a,et,Q.a,nt.a]]}),R)}}])}();