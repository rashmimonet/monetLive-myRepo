!function(){function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{UXJo:function(n,i,o){"use strict";o.d(i,"a",function(){return l}),o.d(i,"b",function(){return d});var r=o("ofXK"),a=o("fXoL"),c=function(){function n(e,i){t(this,n),this._document=i;var o=this._textarea=this._document.createElement("textarea"),r=o.style;r.position="fixed",r.top=r.opacity="0",r.left="-999em",o.setAttribute("aria-hidden","true"),o.value=e,this._document.body.appendChild(o)}return e(n,[{key:"copy",value:function(){var t=this._textarea,n=!1;try{if(t){var e=this._document.activeElement;t.select(),t.setSelectionRange(0,t.value.length),n=this._document.execCommand("copy"),e&&e.focus()}}catch(i){}return n}},{key:"destroy",value:function(){var t=this._textarea;t&&(t.parentNode&&t.parentNode.removeChild(t),this._textarea=void 0)}}]),n}(),s=function(){var n=function(){function n(e){t(this,n),this._document=e}return e(n,[{key:"copy",value:function(t){var n=this.beginCopy(t),e=n.copy();return n.destroy(),e}},{key:"beginCopy",value:function(t){return new c(t,this._document)}}]),n}();return n.\u0275fac=function(t){return new(t||n)(a.bc(r.d))},n.\u0275prov=Object(a.Nb)({factory:function(){return new n(Object(a.bc)(r.d))},token:n,providedIn:"root"}),n}(),u=new a.s("CDK_COPY_TO_CLIPBOARD_CONFIG"),l=function(){var n=function(){function n(e,i,o){t(this,n),this._clipboard=e,this._ngZone=i,this.text="",this.attempts=1,this.copied=new a.o,this._pending=new Set,o&&null!=o.attempts&&(this.attempts=o.attempts)}return e(n,[{key:"copy",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.attempts;if(n>1){var e=n,i=this._clipboard.beginCopy(this.text);this._pending.add(i);var o=function n(){var o=i.copy();o||!--e||t._destroyed?(t._currentTimeout=null,t._pending.delete(i),i.destroy(),t.copied.emit(o)):t._currentTimeout=t._ngZone.runOutsideAngular(function(){return setTimeout(n,1)})};o()}else this.copied.emit(this._clipboard.copy(this.text))}},{key:"ngOnDestroy",value:function(){this._currentTimeout&&clearTimeout(this._currentTimeout),this._pending.forEach(function(t){return t.destroy()}),this._pending.clear(),this._destroyed=!0}}]),n}();return n.\u0275fac=function(t){return new(t||n)(a.Rb(s),a.Rb(a.B),a.Rb(u,8))},n.\u0275dir=a.Mb({type:n,selectors:[["","cdkCopyToClipboard",""]],hostBindings:function(t,n){1&t&&a.fc("click",function(){return n.copy()})},inputs:{text:["cdkCopyToClipboard","text"],attempts:["cdkCopyToClipboardAttempts","attempts"]},outputs:{copied:"cdkCopyToClipboardCopied"}}),n}(),d=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=a.Pb({type:n}),n.\u0275inj=a.Ob({}),n}()},folJ:function(n,i,o){"use strict";o.d(i,"a",function(){return h});var r=o("FpXt"),a=o("qFsG"),c=o("kmnG"),s=o("bTqV"),u=o("Wp6s"),l=o("3Pt+"),d=o("wZkO"),b=o("STbY"),f=o("d3UM"),g=o("fXoL"),h=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=g.Pb({type:n}),n.\u0275inj=g.Ob({imports:[[r.a,a.c,c.e,s.b,u.b,l.m,d.d,b.c,f.b]]}),n}()},pMjG:function(n,i,o){"use strict";o.d(i,"a",function(){return b});var r=o("ofXK"),a=o("FpXt"),c=o("Xa2L"),s=o("Qu3c"),u=o("NFeN"),l=o("bTqV"),d=o("fXoL"),b=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=d.Pb({type:n}),n.\u0275inj=d.Ob({imports:[[r.c,a.a,c.b,s.b,u.b,l.b]]}),n}()},q1A0:function(n,i,o){"use strict";o.d(i,"a",function(){return q});var r,a=o("fXoL"),c=o("v0EB"),s=((r=function(){function n(){t(this,n)}return e(n,[{key:"transform",value:function(t,n){var e=JSON.parse(t).filter(function(t){return t.action}).length;return"approve"===n?e<1:"selectAllButton"===n?e<JSON.parse(t).length:void 0}}]),n}()).\u0275fac=function(t){return new(t||r)},r.\u0275pipe=a.Qb({name:"selectionStatus",type:r,pure:!0}),r),u=o("0IaG"),l=o("3Pt+"),d=o("kYN2"),b=o("LUsR"),f=o("XiUz"),g=o("bTqV"),h=o("NFeN"),p=o("ofXK"),m=o("znSr"),v=o("bSwM"),y=o("Qu3c");function k(t,n){if(1&t){var e=a.Yb();a.Xb(0,"mat-checkbox",18),a.fc("click",function(){a.Fc(e);var t=a.jc(),n=t.$implicit,i=t.index,o=a.jc();return n.value.action=!n.value.action,o.action(i)}),a.Wb()}if(2&t){var i=a.jc().$implicit;a.qc("checked",i.value.action)}}function w(t,n){if(1&t){var e=a.Yb();a.Xb(0,"div",12),a.Xb(1,"div",13),a.Nc(2,k,1,1,"mat-checkbox",14),a.Sb(3,"input",15),a.Xb(4,"button",16),a.fc("click",function(){a.Fc(e);var t=n.index,i=n.$implicit;return a.jc().approveUser(t,i.value)}),a.Pc(5,"Approve"),a.Wb(),a.Xb(6,"button",17),a.fc("click",function(){a.Fc(e);var t=n.index,i=n.$implicit;return a.jc().removeUser(t,i.value)}),a.Pc(7,"Reject"),a.Wb(),a.Wb(),a.Wb()}if(2&t){var i=n.index,o=a.jc();a.Fb(1),a.qc("formGroupName",i),a.Fb(1),a.qc("ngIf",o.users.controls.length>1)}}function x(t,n){if(1&t){var e=a.Yb();a.Xb(0,"button",19),a.fc("click",function(){return a.Fc(e),a.jc().onSubmit()}),a.kc(1,"selectionStatus"),a.Pc(2,"Approve"),a.Wb()}if(2&t){var i=a.jc();a.qc("disabled",a.mc(1,1,i.myjson.stringify(i.usersListForm.value.users),"approve"))}}var C=function(t,n){return{color:t,border:n}};function O(t,n){if(1&t){var e=a.Yb();a.Xb(0,"button",20),a.fc("click",function(){return a.Fc(e),a.jc().selectAll()}),a.kc(1,"selectionStatus"),a.kc(2,"selectionStatus"),a.kc(3,"selectionStatus"),a.Xb(4,"mat-icon"),a.Pc(5,"grading"),a.Wb(),a.Wb()}if(2&t){var i=a.jc();a.qc("ngStyle",a.vc(11,C,a.mc(1,2,i.myjson.stringify(i.usersListForm.value.users),"selectAllButton")?"#00000042":"#3f51b5",a.mc(2,5,i.myjson.stringify(i.usersListForm.value.users),"selectAllButton")?"1px solid #00000042":"1px solid #3f51b5"))("matTooltip",a.mc(3,8,i.myjson.stringify(i.usersListForm.value.users),"selectAllButton")?"Select All":"Unselect All")}}var _,P=function(t){return{overflowY:t}},L=((_=function(){function n(e,i,o,r){t(this,n),this.dialogRef=e,this.fb=i,this.ss=o,this.bhvSub=r,this.responseArr=[],this.selectAllCheck=!1,this.myjson=JSON,this.usersListForm=i.group({users:i.array([])})}return e(n,[{key:"users",get:function(){return this.usersListForm.get("users")}},{key:"newUser",value:function(t,n,e,i){return this.fb.group({name:t,id:n,action:e,socketId:i})}},{key:"addUser",value:function(t,n,e,i){this.users.push(this.newUser(t,n,e,i))}},{key:"approveUser",value:function(t,n){this.users.removeAt(t),null!==n&&(this.ss.socket.emit("join-response",{join:[{uuid:n.id,sid:n.socketId,confirmed:!0}]}),this.bhvSub.obRemoveFromWaitingList({userName:n.name,userId:n.id,socketId:null})),this.users.length<1&&this.dialogRef.close()}},{key:"removeUser",value:function(t,n){this.users.removeAt(t),null!==n&&(this.ss.socket.emit("join-response",{join:[{uuid:n.id,sid:n.socketId,confirmed:n.action}]}),this.bhvSub.obRemoveFromWaitingList({userName:n.name,userId:n.id,socketId:null})),this.users.length<1&&this.dialogRef.close()}},{key:"action",value:function(t){var n=this.usersListForm.get("users");n.at(t).value.action=!n.at(t).value.action}},{key:"onSubmit",value:function(){var t=this;this.usersListForm.value.users.forEach(function(n,e){!0===n.action&&(t.responseArr=[],t.removeUser(e,n),t.responseArr.push({uuid:n.id,sid:n.socketId,confirmed:n.action}))}),this.ss.socket.emit("join-response",{join:this.responseArr}),this.dialogRef.close()}},{key:"ngOnInit",value:function(){var t=this;this.bhvSub.waitingList$.subscribe(function(n){n.forEach(function(n){t.usersListForm.value.users.some(function(t){return t.id===n.userId})||t.addUser(null==n?void 0:n.userName,null==n?void 0:n.userId,!1,null==n?void 0:n.socketId)})})}},{key:"checkSelectAllEqual",value:function(){return this.usersListForm.value.users.filter(function(t){return t.action}).length!==this.usersListForm.value.users.length}},{key:"getFlexVal",value:function(){return"calc(".concat(4*this.usersListForm.value.users.length,"vh)")}},{key:"selectAll",value:function(){var t=this;this.selectAllCheck=!!this.checkSelectAllEqual()&&!this.selectAllCheck,this.usersListForm.value.users.forEach(function(n){return n.action=t.selectAllCheck})}}]),n}()).\u0275fac=function(t){return new(t||_)(a.Rb(u.f),a.Rb(l.g),a.Rb(d.a),a.Rb(b.a))},_.\u0275cmp=a.Lb({type:_,selectors:[["app-waiting-list"]],features:[a.Eb([s])],decls:14,vars:8,consts:[["fxFlex","100","fxLayout","column","fxLayoutAlign","center center","fxLayoutGap","20px",2,"position","relative","height","100%","max-height","45vh"],["mat-mini-fab","",1,"close-button",2,"background","black",3,"click"],["color","warn",1,"close-icon"],["fxLayout","row","fxLayoutAlign","center center","fxFlex","20",2,"background","#A9A9A9","width","100%","padding","2% 0","width","100%"],[2,"color","white","font-size","24px","font-weight","400"],[2,"width","80%","position","relative",3,"formGroup"],["fxLayout","column","fxLayoutAlign","center center","fxLayoutGap","10px",2,"width","100%"],["fxLayout","column","fxLayoutGap","10px","formArrayName","users",2,"width","100%","max-height","30vh !important",3,"fxFlex","ngStyle"],["style","width: 100%",4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","center center","fxLayoutGap","10px"],["mat-raised-button","","type","submit","approveBtn","",3,"disabled","click",4,"ngIf"],["mat-mini-fab","","approveBtn","","style","background-color: transparent; box-shadow: none;",3,"ngStyle","matTooltip","click",4,"ngIf"],[2,"width","100%"],["fxLayout","row","fxLayoutAlign","center center","fxLayoutGap","10px","arrayInput","",3,"formGroupName"],["formControlName","action",3,"checked","click",4,"ngIf"],["type","text","formControlName","name","readonly","",2,"border","0","outline","none"],["mat-raised-button","","pointer","",2,"background","#52A136","color","white","border-radius","20px",3,"click"],["mat-raised-button","","pointer","",2,"background","#D61A3C","color","white","border-radius","20px",3,"click"],["formControlName","action",3,"checked","click"],["mat-raised-button","","type","submit","approveBtn","",3,"disabled","click"],["mat-mini-fab","","approveBtn","",2,"background-color","transparent","box-shadow","none",3,"ngStyle","matTooltip","click"]],template:function(t,n){1&t&&(a.Xb(0,"div",0),a.Xb(1,"button",1),a.fc("click",function(){return n.dialogRef.close({result:n.responseArr})}),a.Xb(2,"mat-icon",2),a.Pc(3,"close"),a.Wb(),a.Wb(),a.Xb(4,"div",3),a.Xb(5,"span",4),a.Pc(6,"Waiting Room"),a.Wb(),a.Wb(),a.Xb(7,"form",5),a.Xb(8,"div",6),a.Xb(9,"div",7),a.Nc(10,w,8,2,"div",8),a.Wb(),a.Xb(11,"div",9),a.Nc(12,x,3,4,"button",10),a.Nc(13,O,6,14,"button",11),a.Wb(),a.Wb(),a.Wb(),a.Wb()),2&t&&(a.Fb(7),a.qc("formGroup",n.usersListForm),a.Fb(2),a.qc("fxFlex",n.getFlexVal())("ngStyle",a.uc(6,P,n.users.controls.length>4?"scroll":"")),a.Fb(1),a.qc("ngForOf",n.users.controls),a.Fb(2),a.qc("ngIf",n.users.controls.length>1),a.Fb(1),a.qc("ngIf",n.users.controls.length>1))},directives:[f.b,f.f,f.e,f.g,g.a,h.a,l.A,l.t,l.k,l.f,p.o,m.c,p.m,p.n,l.l,l.d,l.s,l.i,v.a,y.a],pipes:[s],styles:[".example-section[_ngcontent-%COMP%]{margin:12px 0}.close-button[_ngcontent-%COMP%]{background:#000;position:absolute;z-index:99}.close-icon[_ngcontent-%COMP%]{transition:1s ease-in-out;color:#fff;display:flex}  .icon-outside .close-button{float:right;top:-24px;right:-19px;border:1px solid #fff}  .icon-outside .mat-dialog-container{overflow:unset}[approveBtn][_ngcontent-%COMP%]{color:#fff;margin:15% 0;background:rgba(113,9,139,.87)}[arrayInput][_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:16px;text-transform:capitalize}#checkList[_ngcontent-%COMP%]{position:absolute;color:#1e90ff;top:10px;right:10px}"]}),_),F=o("tyNb"),M=o("0Lug"),X=o("iiAa"),A=o("UXJo"),S=o("TU8p"),j=["waitingRoomAudio"];function W(t,n){if(1&t&&(a.Xb(0,"button",12),a.Xb(1,"mat-icon",13),a.Pc(2,"person_add"),a.Wb(),a.Wb()),2&t){var e=a.jc();a.qc("cdkCopyToClipboard",e.link)("matTooltip","Copy meeting link")}}function I(t,n){if(1&t){var e=a.Yb();a.Vb(0),a.Xb(1,"button",14),a.fc("click",function(){return a.Fc(e),a.jc().viewWaitingUsers()}),a.Xb(2,"mat-icon",13),a.Pc(3,"people"),a.Wb(),a.Wb(),a.Ub()}if(2&t){var i=a.jc();a.Fb(1),a.rc("matBadge",i.waitingUsersList.length),a.qc("matTooltip","Click to view users in Waiting Room")}}var N,q=((N=function(){function n(e,i,o,r,c,s){var u=this;t(this,n),this.route=e,this.api=i,this.bhvSub=o,this.dialog=r,this.sl=c,this.utility=s,this.toggleMenu=new a.o,this.refreshSession=new a.o,this.waitingUsersList=[],e.queryParams.subscribe(function(t){var n,e,i;u.name=(null===(e=null===(n=null==t?void 0:t.name)||void 0===n?void 0:n.slice(0,1))||void 0===e?void 0:e.toUpperCase())||"T",u.link=(null===(i=null===window||void 0===window?void 0:window.location)||void 0===i?void 0:i.origin)+"/student/login?roomid="+(null==t?void 0:t.roomid)+"&room="+(null==t?void 0:t.room)+"&matrixScore="+JSON.parse(localStorage.getItem("userPlanDetails")||"{}").realTimeScores})}return e(n,[{key:"ngOnInit",value:function(){var t=this;this.sl.load("janus").then(function(){return t.sl.load("user").then(function(){})}),this.bhvSub.fullScreen$.subscribe(function(n){t.changeBackground(n)}),this.bhvSub.waitingList$.subscribe(function(n){t.waitingUsersList=n,n.length&&(t.waitingRoomAudio.nativeElement.play(),t.utility.notify("New user entered in waiting room",""))})}},{key:"ngAfterViewInit",value:function(){this.waitingRoomAudio.nativeElement.src="../../../assets/waitingRoom.ogg"}},{key:"changeBackground",value:function(t){document.getElementById("topbar").style.background=t?"black":"rgba(0,0,0,0.4)"}},{key:"Menu",value:function(t){this.toggleMenu.emit(t)}},{key:"viewWaitingUsers",value:function(){var t=this;this.dialogOpener=this.dialog.open(L,{panelClass:["test-media-container","icon-outside"],hasBackdrop:!0,width:"40%",height:"auto",backdropClass:"backdropBackground"}).afterClosed().subscribe(function(n){t.dialogOpener=null})}},{key:"refresh",value:function(){confirm("Are you sure you want to refresh ? \nRefreshing this call will restart the session again.")&&this.refreshSession.emit(!0)}}]),n}()).\u0275fac=function(t){return new(t||N)(a.Rb(F.a),a.Rb(c.a),a.Rb(b.a),a.Rb(u.b),a.Rb(M.a),a.Rb(X.a))},N.\u0275cmp=a.Lb({type:N,selectors:[["app-top-bar"]],viewQuery:function(t,n){var e;1&t&&a.Uc(j,1),2&t&&a.Cc(e=a.gc())&&(n.waitingRoomAudio=e.first)},inputs:{waitingList:"waitingList",room:"room",action:"action",duration:"duration",role:"role"},outputs:{toggleMenu:"toggleMenu",refreshSession:"refreshSession"},features:[a.Eb([c.a])],decls:16,vars:9,consts:[["fxLayout","row","id","topbar","fxLayoutAlign","space-between start","fxLayoutGap","28px",2,"padding","8px 12px 0px 8px","border-bottom","0.5px solid #333","height","7vh","width","99%"],[3,"hidden"],["waitingRoomAudio",""],["fxLayout","column"],["title-white18-300",""],["title-white12-300",""],["fxLayoutAlign","end center","fxLayoutGap","10px",1,"row",2,"place-self","center"],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutGap","10px"],["mat-icon-button","","style","background-image: linear-gradient(to right, #77246C , #1E5AA1); color: white",3,"cdkCopyToClipboard","matTooltip",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center center",1,"user-avatar",2,"background-image","linear-gradient(to right, #77246C , #1E5AA1)","color","white"],["title-white16-300",""],[4,"ngIf"],["mat-icon-button","",2,"background-image","linear-gradient(to right, #77246C , #1E5AA1)","color","white",3,"cdkCopyToClipboard","matTooltip"],["f-white",""],["id","waitingUsers","mat-icon-button","","matBadgeColor","warn",2,"background-image","linear-gradient(to right, #77246C , #1E5AA1)","color","white",3,"matBadge","matTooltip","click"]],template:function(t,n){1&t&&(a.Xb(0,"div",0),a.Sb(1,"audio",1,2),a.Xb(3,"div",3),a.Xb(4,"span",4),a.Pc(5),a.Wb(),a.Xb(6,"span",5),a.Pc(7),a.kc(8,"date"),a.Wb(),a.Wb(),a.Xb(9,"div",6),a.Xb(10,"div",7),a.Nc(11,W,3,2,"button",8),a.Xb(12,"div",9),a.Xb(13,"span",10),a.Pc(14),a.Wb(),a.Wb(),a.Wb(),a.Nc(15,I,4,2,"ng-container",11),a.Wb(),a.Wb()),2&t&&(a.Fb(1),a.qc("hidden",!0),a.Fb(4),a.Qc(null==n.room?null:n.room.summary),a.Fb(2),a.Qc(a.mc(8,6,null==n.room||null==n.room.start?null:n.room.start.dateTime,"medium")),a.Fb(4),a.qc("ngIf",null==n.action?null:n.action.includes("link")),a.Fb(3),a.Qc(n.name),a.Fb(1),a.qc("ngIf","moderator"===n.role&&n.waitingUsersList.length))},directives:[f.f,f.e,f.g,p.n,g.a,A.a,y.a,h.a,S.a],pipes:[p.e],styles:[".user-avatar[_ngcontent-%COMP%]{height:40px;width:40px;border-radius:50%;background-color:hsla(0,0%,100%,.1)}#id[_ngcontent-%COMP%]{position:relative}"]}),N)},rjSt:function(n,i,o){"use strict";o.d(i,"a",function(){return y});var r,a,c=o("ofXK"),s=o("FpXt"),u=o("Qu3c"),l=o("NFeN"),d=o("bTqV"),b=o("UXJo"),f=o("zkoq"),g=o("STbY"),h=o("MutI"),p=o("fXoL"),m=((r=e(function n(){t(this,n)})).\u0275fac=function(t){return new(t||r)},r.\u0275mod=p.Pb({type:r}),r.\u0275inj=p.Ob({imports:[[c.c,s.a,h.a,u.b]]}),r),v=o("TU8p"),y=((a=e(function n(){t(this,n)})).\u0275fac=function(t){return new(t||a)},a.\u0275mod=p.Pb({type:a}),a.\u0275inj=p.Ob({imports:[[c.c,s.a,u.b,l.b,d.b,b.b,f.b,g.c,m,v.b]]}),a)},sOF7:function(n,i,o){"use strict";o.d(i,"a",function(){return d});var r=o("ofXK"),a=o("MutI"),c=o("NFeN"),s=o("FpXt"),u=o("Qu3c"),l=o("fXoL"),d=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=l.Pb({type:n}),n.\u0275inj=l.Ob({imports:[[s.a,r.c,a.a,c.b,u.b]]}),n}()},sjQA:function(n,i,o){"use strict";o.d(i,"a",function(){return X});var r=o("fXoL"),a=o("XNiG"),c=o("Kj3r"),s=o("v0EB"),u=o("tyNb"),l=o("kYN2"),d=o("LUsR"),b=o("ofXK"),f=o("XiUz"),g=o("znSr"),h=o("Xa2L"),p=o("NFeN"),m=o("bTqV"),v=o("Qu3c"),y=["videoview"];function k(t,n){1&t&&(r.Xb(0,"div",9),r.Sb(1,"mat-spinner",10),r.Wb()),2&t&&(r.Fb(1),r.qc("diameter",30))}var w=function(t){return{backgroundColor:t}};function x(t,n){if(1&t&&(r.Xb(0,"div",11),r.Xb(1,"div",12),r.Xb(2,"mat-icon",13),r.Pc(3,"person"),r.Wb(),r.Wb(),r.Xb(4,"span",14),r.Pc(5),r.Wb(),r.Wb()),2&t){var e=r.jc();r.Fb(1),r.qc("ngStyle",r.uc(2,w,"rgba("+e.randomColor.join(", ")+")")),r.Fb(4),r.Qc(null==e.student?null:e.student.name)}}function C(t,n){1&t&&(r.Xb(0,"mat-icon",19),r.Pc(1,"pan_tool "),r.Wb())}var O=function(){return["video-title"]};function _(t,n){if(1&t&&(r.Xb(0,"div",15),r.Xb(1,"div",16),r.Pc(2),r.Xb(3,"mat-icon",17),r.Pc(4),r.Wb(),r.Nc(5,C,2,0,"mat-icon",18),r.Wb(),r.Wb()),2&t){var e=r.jc();r.Fb(1),r.qc("ngClass",r.tc(5,O)),r.Fb(1),r.Rc("",null==e.student?null:e.student.name," \xa0 \xa0"),r.Fb(1),r.qc("id",(null==e.student?null:e.student.std_id)+"mic"),r.Fb(1),r.Qc(null!=e.student&&e.student.audio?"mic":"mic_off"),r.Fb(1),r.qc("ngIf","proctor"===e.module&&!0===(null==e.student?null:e.student.raiseHand))}}function P(t,n){if(1&t&&(r.Xb(0,"mat-icon",26),r.Pc(1),r.Wb()),2&t){var e=r.jc().$implicit,i=r.jc(2);r.Fb(1),r.Qc("mic"===e.value?null!=i.student&&i.student.audio?"mic":"mic_off":e.icon)}}function L(t,n){1&t&&r.Sb(0,"img",27)}function F(t,n){if(1&t){var e=r.Yb();r.Xb(0,"div"),r.Xb(1,"button",23),r.fc("click",function(){r.Fc(e);var t=n.$implicit,i=r.jc(2);return t.action(null==i.student?null:i.student.std_id),i.actionEmitter.emit(t)}),r.Nc(2,P,2,1,"mat-icon",24),r.Nc(3,L,1,0,"img",25),r.Wb(),r.Wb()}if(2&t){var i=n.$implicit;r.Fb(1),r.qc("matTooltip",i.name),r.Fb(1),r.qc("ngIf","throwChalk"!==i.icon),r.Fb(1),r.qc("ngIf","throwChalk"===i.icon)}}function M(t,n){if(1&t&&(r.Xb(0,"div",20),r.Xb(1,"div",21),r.Nc(2,F,4,3,"div",22),r.Wb(),r.Wb()),2&t){var e=r.jc();r.Fb(2),r.qc("ngForOf",e.actions)}}var X=function(){var n=function(){function n(e,i,o,c){t(this,n),this.route=e,this.api=i,this.ss=o,this.bhvSub=c,this.randomColor=[0,0,0],this.video={loadstart:!0,buffering:!1,canplay:!1},this.buffer=new a.a,this.time=new a.a,this.actionEmitter=new r.o,this.actions=[{name:"Throw chalk",icon:"throwChalk",enable:!0,value:"throwChalk",action:function(){}},{name:"Mute",icon:"mic",value:"mic",enable:!0,action:function(t){this.enable=!this.enable,this.icon=this.enable?"mic":"mic_off",this.name=this.enable?"Mute":"Unmute",console.log("togle Mute :",this.enable)}},{name:"Remove",icon:"exit_to_app",value:"exit",enable:!0,action:function(){console.log(this.name)}}],this.randomColor=this.generateRandomColor()}return e(n,[{key:"std",set:function(t){this.student=JSON.parse(t)}},{key:"getCssClass",value:function(){var t=this;return this.bhvSub.engOrMood$.subscribe(function(n){t.engOrMood=n}),0===this.engOrMood?this.student.category_engagement:this.student.category_mood}},{key:"generateRandomColor",value:function(){return[0,0,0].map(function(t){return Math.floor(128*Math.random())})}},{key:"ngAfterViewInit",value:function(){this.videoview.nativeElement.srcObject=this.mediaStreamObj,this.videoview.nativeElement.play()}},{key:"ngOnChanges",value:function(t){t.mediaStreamObj&&this.videoview&&(t.mediaStreamObj&&this.studentID===this.student.std_id&&(this.videoview.nativeElement.muted=!0),this.videoview.nativeElement.srcObject=this.mediaStreamObj,this.videoview.nativeElement.play())}},{key:"ngOnInit",value:function(){var t=this;this.route.queryParams.subscribe(function(n){n&&(t.params=n,t.studentID=n.id)}),this.buffer.pipe(Object(c.a)(3e3)).subscribe(function(n){n&&(t.video.buffering=!0)})}},{key:"videoProgress",value:function(t){this.buffer.next(t)}},{key:"onLoadStart",value:function(t){t&&(this.video.loadstart=!0)}},{key:"canPlay",value:function(t){this.video.canplay=!0,this.video.loadstart=!1}},{key:"playVideo",value:function(t){}},{key:"playingVideo",value:function(t){t&&(this.video.buffering=!1)}},{key:"paused",value:function(t){}},{key:"waiting",value:function(t){}},{key:"error",value:function(t){}},{key:"canplaythrough",value:function(t){this.video.loadstart=!1}},{key:"timeupdate",value:function(t){}},{key:"loadedMetaData",value:function(t){}},{key:"abort",value:function(t){}}]),n}();return n.\u0275fac=function(t){return new(t||n)(r.Rb(u.a),r.Rb(s.a),r.Rb(l.a),r.Rb(d.a))},n.\u0275cmp=r.Lb({type:n,selectors:[["app-video-stream"]],viewQuery:function(t,n){var e;(1&t&&r.Uc(y,1),2&t)&&(r.Cc(e=r.gc())&&(n.videoview=e.first))},inputs:{std:"std",module:"module",selectUser:"selectUser",action:"action",mediaStreamObj:"mediaStreamObj"},outputs:{actionEmitter:"actionEmitter"},features:[r.Eb([s.a]),r.Db],decls:9,vars:8,consts:[["relative","",1,"preview-video"],["fxLayout","row","fxLayoutAlign","center center","style","min-height: 100%; height: 100%; position: absolute; width: 100%",4,"ngIf"],["fxFill","","class","no-camera","fxLayout","column","fxLayoutAlign","center center","fxLayoutGap","5px",4,"ngIf"],["fxLayout","column","fxFlex","100",3,"ngClass","hidden"],["height","100%","width","100%","autoplay","","muted","",1,"videocol",3,"id","progress","loadstart","canplay","play","playing","pause","waiting","canplaythrough","timeupdate","loadedmetadata","abort","cancel"],["videoview",""],["fxLayout","row",4,"ngIf"],[1,"engagement",3,"ngClass"],["class","overlay",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center center",2,"min-height","100%","height","100%","position","absolute","width","100%"],[3,"diameter"],["fxFill","","fxLayout","column","fxLayoutAlign","center center","fxLayoutGap","5px",1,"no-camera"],[1,"avatar",3,"ngStyle"],["f-white",""],["title-white14-400",""],["fxLayout","row"],[3,"ngClass"],["f-white","","large","",2,"vertical-align","middle",3,"id"],["style","font-size: 17px",4,"ngIf"],[2,"font-size","17px"],[1,"overlay"],["fxLayout","row","fxLayoutGap","10px",1,"overlay-actions"],[4,"ngFor","ngForOf"],["mat-icon-button","",3,"matTooltip","click"],["f-grey","","large","",4,"ngIf"],["src","../../../../../assets/throwChalk.svg","height","30px","width","30px","pointer","",4,"ngIf"],["f-grey","","large",""],["src","../../../../../assets/throwChalk.svg","height","30px","width","30px","pointer",""]],template:function(t,n){1&t&&(r.Xb(0,"div",0),r.Nc(1,k,2,1,"div",1),r.Nc(2,x,6,4,"div",2),r.Xb(3,"div",3),r.Xb(4,"video",4,5),r.fc("progress",function(t){return n.videoProgress(t)})("loadstart",function(t){return n.onLoadStart(t)})("canplay",function(t){return n.canPlay(t)})("play",function(t){return n.playVideo(t)})("playing",function(t){return n.playingVideo(t)})("pause",function(t){return n.paused(t)})("waiting",function(t){return n.waiting(t)})("canplaythrough",function(t){return n.canplaythrough(t)})("timeupdate",function(t){return n.timeupdate(t)})("loadedmetadata",function(t){return n.loadedMetaData(t)})("abort",function(t){return n.abort(t)})("cancel",function(t){return n.abort(t)}),r.Wb(),r.Nc(6,_,6,6,"div",6),r.Wb(),r.Sb(7,"span",7),r.Nc(8,M,3,1,"div",8),r.Wb()),2&t&&(r.Fb(1),r.qc("ngIf",(null==n.video?null:n.video.loadstart)||(null==n.video?null:n.video.buffering)&&(null==n.student?null:n.student.video)),r.Fb(1),r.qc("ngIf",!(null!=n.student&&n.student.video)),r.Fb(1),r.qc("ngClass","screenShare")("hidden",!(null!=n.student&&n.student.webcam)),r.Fb(1),r.qc("id",null==n.student?null:n.student.std_id),r.Fb(2),r.qc("ngIf",null==n.student?null:n.student.video),r.Fb(1),r.qc("ngClass",n.getCssClass()),r.Fb(1),r.qc("ngIf","proctor"===n.module))},directives:[b.n,f.f,f.b,b.l,g.a,f.e,h.c,f.h,f.g,b.o,g.c,p.a,b.m,m.a,v.a],styles:[".preview-video[_ngcontent-%COMP%]{box-sizing:border-box;position:relative;height:100%;width:100%;background:rgba(23,22,22,.74)}.overlay[_ngcontent-%COMP%]{transition:all .3s linear;position:absolute;height:100%;width:100%;background:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.8) 95%);display:none}.overlay[_ngcontent-%COMP%]   .overlay-actions[_ngcontent-%COMP%]{position:absolute;bottom:20px;transform:translateX(-50%);left:50%}.avatar[_ngcontent-%COMP%]{height:60px;width:60px;border-radius:50%;display:flex;text-align:center;align-items:center;justify-content:center}.preview-video[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]{display:block}.preview-video[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{color:#fff!important}.Low[_ngcontent-%COMP%]{background-color:#ff275a}.Medium[_ngcontent-%COMP%]{background-color:#ff8b4c}.High[_ngcontent-%COMP%]{background-color:#3ab147}.engagement[_ngcontent-%COMP%]{border-radius:50%;height:14px;width:14px;position:absolute;z-index:10;top:5px;right:5px}.video-title[_ngcontent-%COMP%]{position:absolute;top:0;padding:5px;background-color:rgba(66,63,63,.58);color:#fff}.equilizer[_ngcontent-%COMP%]{width:100%;position:absolute;background:linear-gradient(180deg,#000,transparent);height:40px;z-index:999;bottom:0;right:0;transform:rotate(180deg);visibility:hidden}.videocol[_ngcontent-%COMP%]{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg)}.check[_ngcontent-%COMP%]{width:100%;position:absolute;height:20px;z-index:999;bottom:0;right:0}.pid[_ngcontent-%COMP%]{width:calc(10% - 10px);height:10px;display:inline-block;margin:5px}*[_ngcontent-%COMP%]{box-sizing:border-box}.sizing-box[_ngcontent-%COMP%]{height:30px;width:50px}.signal-bars[_ngcontent-%COMP%], .signal-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{display:inline-block}.signal-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{width:14%;margin-left:1%;min-height:20%}.signal-bars[_ngcontent-%COMP%]   .bar.first-bar[_ngcontent-%COMP%]{height:20%}.signal-bars[_ngcontent-%COMP%]   .bar.second-bar[_ngcontent-%COMP%]{height:40%}.signal-bars[_ngcontent-%COMP%]   .bar.third-bar[_ngcontent-%COMP%]{height:60%}.signal-bars[_ngcontent-%COMP%]   .bar.fourth-bar[_ngcontent-%COMP%]{height:80%}.signal-bars[_ngcontent-%COMP%]   .bar.fifth-bar[_ngcontent-%COMP%]{height:99%}.good[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{background-color:#16a085;border:thin solid #12816b}.four-bars[_ngcontent-%COMP%]   .bar.fifth-bar[_ngcontent-%COMP%], .one-bar[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:not(.first-bar), .three-bars[_ngcontent-%COMP%]   .bar.fifth-bar[_ngcontent-%COMP%], .three-bars[_ngcontent-%COMP%]   .bar.fourth-bar[_ngcontent-%COMP%], .two-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:not(.first-bar):not(.second-bar){background-color:#fafafa;border:thin solid #f3f3f3}"]}),n}()}}])}();