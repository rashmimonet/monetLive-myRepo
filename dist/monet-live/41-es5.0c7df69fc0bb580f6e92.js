!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{zNAp:function(t,o,a){"use strict";a.r(o),a.d(o,"DashboardModule",function(){return w});var r=a("v0EB"),i=a("pdnW"),c=a("AytR"),s=a("yB+K"),l=a("fXoL"),d=a("tyNb"),u=a("0IaG"),g=a("tk/3"),m=a("iiAa"),p=a("XiUz"),b=a("ofXK"),h=a("Wp6s"),f=a("NFeN");function v(e,t){1&e&&(l.Xb(0,"mat-icon",9),l.Pc(1,"locked"),l.Wb())}function O(e,t){if(1&e){var n=l.Yb();l.Xb(0,"div",4),l.fc("click",function(){l.Fc(n);var e=t.$implicit,o=l.jc();return e.disabled||o.callActions(e)}),l.Xb(1,"mat-card",5),l.Nc(2,v,2,0,"mat-icon",6),l.Xb(3,"mat-icon",7),l.Pc(4),l.Wb(),l.Xb(5,"span",8),l.Pc(6),l.Wb(),l.Wb(),l.Wb()}if(2&e){var o=t.$implicit;l.Fb(2),l.qc("ngIf",o.disabled),l.Fb(2),l.Qc(o.icon),l.Fb(2),l.Qc(o.name)}}var x,y,C=((x=function(){function t(n,o,a,r,i,s,l){e(this,t),this.as=n,this.router=o,this.dialog=a,this.route=r,this.http=i,this.tps=s,this.utility=l,this.loggedInService="",this.cards=[{name:"Schedule Class",route:"teacher/scheduler",icon:"schedule",value:"schedule",disabled:!1},{name:"Start Class",route:"teacher/call",icon:"layers",value:"start",disabled:!1},{name:"Reports",route:"report",icon:"donut_small",value:"report",disabled:!1}],this.env=c.a}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.route.queryParams.subscribe(function(t){e.params=t}),this.loggedInService=this.tps.isLoggedIn().service}},{key:"callActions",value:function(e){switch(e.value){case"start":this.createCall(e);break;default:this.router.navigate([e.route],{queryParamsHandling:"merge"})}}},{key:"createCall",value:function(e){var t=this,n=JSON.parse(localStorage.getItem("userDetails")||""),o=n.name,a=n.email,r=n.settings;this.as.postApi("createCall",{source:this.loggedInService,creator:o,creator_ID:a,settings:r}).subscribe(function(n){n&&200===n.code?(n.response.id=t.utility.create_UUID().replaceAll("-",""),t.dialogOpener||t.addEvent(n.response,e)):console.error("Call not created")})}},{key:"addEvent",value:function(e,t){var n=this;this.dialogOpener=this.dialog.open(i.a,{hasBackdrop:!1,width:"500px",height:"auto",backdropClass:"backdropBackground"}).afterClosed().subscribe(function(o){var a,r,i;if(n.dialogOpener=null,o){var s=[];o.emails.map(function(e,t){s[t]={email:e.toString().trim()}}),o.form.attendees=s,"Monet Education"===o.form.link&&(o.form.description="<b>Please join the link below</b><br/>https://dev.monetrewards.com/".concat(c.a.serverName,"/student/login?roomid=")+e.roomid+"&room="+e.room+"<br/>"+o.form.description,delete o.form.conferenceData.createRequest),null===(i=null===(r=null===(a=gapi.client)||void 0===a?void 0:a.calendar)||void 0===r?void 0:r.events)||void 0===i||i.insert({calendarId:"primary",sendNotifications:!0,sendUpdates:"all",conferenceDataVersion:1,resource:o.form}).execute(function(a){n.inviteRoom(e,Object.assign(Object.assign({},o.form),e),t,null==a?void 0:a.id)})}})}},{key:"inviteRoom",value:function(e,t,n,o){var a=this;t.creator=this.params.name,t.creator_ID=JSON.parse(localStorage.getItem("userDetails")||"").email,t.sourceId=o,t.source=this.loggedInService,e.name=this.params.name,this.as.postApi1("inviteRoom",t).subscribe(function(t){t.error?(console.error("error creating room"),a.dialogOpener=null):(a.router.navigate([n.route],{queryParams:e,queryParamsHandling:"merge"}),a.dialogOpener=null)})}}]),t}()).\u0275fac=function(e){return new(e||x)(l.Rb(r.a),l.Rb(d.b),l.Rb(u.b),l.Rb(d.a),l.Rb(g.b),l.Rb(s.a),l.Rb(m.a))},x.\u0275cmp=l.Lb({type:x,selectors:[["app-dashboard"]],features:[l.Eb([r.a,s.a])],decls:4,vars:1,consts:[["fxLayout","column","fxLayoutAlign","center center","fxLayoutGap","30px","fxFill",""],["src","assets/NewMonetLive.svg","height","70px",1,"logo"],["fxLayout","row wrap","fxLayoutAlign","start start",1,"home"],["fxFlex","50","padding","",3,"click",4,"ngFor","ngForOf"],["fxFlex","50","padding","",3,"click"],["fxLayout","column","fxLayoutGap","16px","fxLayoutAlign","center center",1,"card-grid"],["class","locked-module",4,"ngIf"],["xxlarge",""],[1,"name-grid"],[1,"locked-module"]],template:function(e,t){1&e&&(l.Xb(0,"div",0),l.Sb(1,"img",1),l.Xb(2,"div",2),l.Nc(3,O,7,3,"div",3),l.Wb(),l.Wb()),2&e&&(l.Fb(3),l.qc("ngForOf",t.cards))},directives:[p.f,p.e,p.g,p.h,b.m,p.b,h.a,b.n,f.a],styles:[".custom-card[_ngcontent-%COMP%]{height:100px;width:130px;font-size:16px;cursor:pointer;margin-bottom:20px}.home[_ngcontent-%COMP%]{max-width:450px;height:auto}.home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]{height:130px;position:relative;transition:all .2s linear;box-sizing:content-box}.home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]:hover{cursor:pointer;transform:translateY(-10px)}.home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]:hover   .name-grid[_ngcontent-%COMP%], .home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:#1c5ba2}.home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]:focus{outline:0}.home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]   .name-grid[_ngcontent-%COMP%], .home[_ngcontent-%COMP%]   .card-grid[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#777}.locked-module[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}"]}),x),P=a("FpXt"),_=a("dNgK"),k=a("k78V"),M=[{path:"",component:C}],w=((y=n(function t(){e(this,t)})).\u0275fac=function(e){return new(e||y)},y.\u0275mod=l.Pb({type:y}),y.\u0275inj=l.Ob({imports:[[P.a,k.a,d.d.forChild(M),h.b,f.b,g.c,_.c,u.e]]}),y)}}])}();