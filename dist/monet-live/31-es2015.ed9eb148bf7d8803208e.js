(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"9Lv8":function(t,n,e){"use strict";e.d(n,"a",function(){return c});var i=e("3Pt+"),o=e("0IaG"),s=e("fXoL"),a=e("kYN2");let c=(()=>{class t{constructor(t,n,e){this.data=t,this.socketService=n,this.dialogRef=e,this.question_options=[],this.answer=[]}ngOnInit(){this.form=new i.j({opt_ans:new i.h})}submitAnswer(){this.answer.push({question_id:this.question_id,answer:this.form.value.opt_ans}),this.socketService.generateSocket(),this.socketService.socket.emit("submit-answer",{uuid:localStorage.getItem("student_uuid"),id:this.assignmentId,assignment:this.answer}),this.dialogRef.close(this.form)}}return t.\u0275fac=function(n){return new(n||t)(s.Rb(o.a),s.Rb(a.a),s.Rb(o.f))},t.\u0275cmp=s.Lb({type:t,selectors:[["app-assignment"]],decls:1,vars:0,template:function(t,n){1&t&&s.Sb(0,"app-questioncontainer")},styles:[".right-container[_ngcontent-%COMP%]{border-left:.5px solid #dcdcdc}.top-container[_ngcontent-%COMP%]{padding:16px;height:55px;color:#fff;background:linear-gradient(135deg,#79236b,#1c5ba2);box-shadow:1px 1px 20px rgba(9,29,86,.62)}.second-container[_ngcontent-%COMP%]{padding:16px;height:55px;color:#000;background:#fff}.middle-container[_ngcontent-%COMP%]{padding:16px}.bottom-container[_ngcontent-%COMP%]{padding:16px;height:65px}.questions-grid-container[_ngcontent-%COMP%]{padding:0 16px 16px}.student-details[_ngcontent-%COMP%]{height:110px;color:#fff}.submit-container[_ngcontent-%COMP%]{height:65px;padding:16px;border-top:.5px solid #dcdcdc}.mat-mini-fab[_ngcontent-%COMP%]{color:#949494;background-color:#fff;border-style:solid;border-width:2px;box-shadow:none}.completed[_ngcontent-%COMP%]{color:#fff;background-color:#0fbf5f}.incomplete[_ngcontent-%COMP%]{color:#fff;background-color:#949494;border-color:#949494;border-style:solid}.recheck[_ngcontent-%COMP%]{color:#fff;background-color:#f05c26}.mat-card[_ngcontent-%COMP%]{border-radius:0}h3[_ngcontent-%COMP%]{margin-bottom:0;color:#000}.mat-raised-button[_ngcontent-%COMP%]{background:linear-gradient(135deg,#79236b,#1c5ba2);color:#fff}.question-grid-background[_ngcontent-%COMP%]{background:#dcdcdc;color:#000}.stop-test[_ngcontent-%COMP%], .submit-test[_ngcontent-%COMP%]{background-color:#dcdcdc;color:grey}.example-radio-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:15px 0;align-items:flex-start}.example-radio-button[_ngcontent-%COMP%]{margin:5px}  .mat-radio-outer-circle{border-color:rgba(0,0,0,.54)!important}"]}),t})()},"e/zx":function(t,n,e){"use strict";e.r(n),e.d(n,"StudentModule",function(){return E});var i=e("tyNb"),o=e("fXoL");let s=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Lb({type:t,selectors:[["app-student"]],decls:1,vars:0,template:function(t,n){1&t&&o.Sb(0,"router-outlet")},directives:[i.e],styles:[".monet-logo[_ngcontent-%COMP%]{position:fixed}"]}),t})();var a=e("Xa2L");let c=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Lb({type:t,selectors:[["app-waiting-room"]],decls:8,vars:0,consts:[[1,"main-container"],[1,"waiting-room-container"],[2,"width","100%","display","flex","justify-content","center","padding-bottom","32px"],["mode","indeterminate"],[2,"color","black","text-align","center"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"div",2),o.Sb(3,"mat-progress-spinner",3),o.Wb(),o.Xb(4,"h2",4),o.Pc(5,"Please wait in waiting room"),o.Wb(),o.Xb(6,"p"),o.Pc(7,"Your request to join the meeting is sent successfully. Please wait for a while, you will enter the meeting room once moderator accept your request."),o.Wb(),o.Wb(),o.Wb())},directives:[a.a],styles:[".main-container[_ngcontent-%COMP%]{font-family:CircularStd-book!important;background-color:#000;width:100%;min-width:100%;max-width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}.waiting-room-container[_ngcontent-%COMP%]{border-radius:8px;width:45%;min-width:45%;max-width:45%;height:auto;padding:24px;background-color:#fff;display:flex;flex-direction:column}"]}),t})();var r=e("ofXK");let l=(()=>{class t{constructor(t){this.location=t}ngOnInit(){history.pushState(null,null,window.location.href),this.location.onPopState(()=>{history.pushState(null,null,window.location.href)})}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(r.k))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-meeting-end"]],decls:6,vars:0,consts:[[1,"main-container"],[1,"meeting-over-container"],[2,"color","black","text-align","center"],[2,"text-align","center"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"h2",2),o.Pc(3,"Meeting Over"),o.Wb(),o.Xb(4,"p",3),o.Pc(5,"The meeting is over. Thank you for your participation"),o.Wb(),o.Wb(),o.Wb())},styles:[".main-container[_ngcontent-%COMP%]{font-family:CircularStd-book!important;background-color:#000;width:100%;min-width:100%;max-width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}.meeting-over-container[_ngcontent-%COMP%]{border-radius:8px;width:45%;min-width:45%;max-width:45%;height:auto;padding:24px;background-color:#fff;display:flex;flex-direction:column}"]}),t})();var d=e("kYN2"),u=e("0Lug");let g=(()=>{class t{constructor(t,n,e){this.location=t,this.socketService=n,this.sl=e}ngOnInit(){history.pushState(null,null,window.location.href),this.location.onPopState(()=>{history.pushState(null,null,window.location.href)}),socket.close(),this.socketService.disconnectSocket()}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(r.k),o.Rb(d.a),o.Rb(u.a))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-request-rejected"]],decls:6,vars:0,consts:[[1,"main-container"],[1,"meeting-over-container"],[2,"color","black","text-align","center"],[2,"text-align","center"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"h2",2),o.Pc(3,"Meeting End"),o.Wb(),o.Xb(4,"p",3),o.Pc(5,"Sorry you are not allowed to join the meeting as your request is rejected by the moderator."),o.Wb(),o.Wb(),o.Wb())},styles:[".main-container[_ngcontent-%COMP%]{font-family:CircularStd-book!important;background-color:#000;width:100%;min-width:100%;max-width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}.meeting-over-container[_ngcontent-%COMP%]{border-radius:8px;width:45%;min-width:45%;max-width:45%;height:auto;padding:24px;background-color:#fff;display:flex;flex-direction:column}"]}),t})();var p=e("v0EB"),b=e("bTqV");const m=[{path:"",component:s,children:[{path:"login",loadChildren:()=>Promise.all([e.e(1),e.e(40)]).then(e.bind(null,"oj0J")).then(t=>t.StudentLoginModule)},{path:"dashboard",loadChildren:()=>Promise.all([e.e(1),e.e(2),e.e(5),e.e(4),e.e(7),e.e(10),e.e(11),e.e(14),e.e(0),e.e(39)]).then(e.bind(null,"Zcnr")).then(t=>t.StudentDashboardModule)},{path:"waiting-room",component:c},{path:"meeting-end",component:l},{path:"rejected",component:g},{path:"call-not-started",component:(()=>{class t{constructor(t,n,e,i){this.route=t,this.apiService=n,this.socketService=e,this.router=i}ngOnInit(){this.queryParamsSubscription=this.route.queryParams.subscribe(t=>{this.urlParams=t})}getRoomIp(){this.apiService.getApiStatic("getRoomIp?roomid="+this.urlParams.roomid).subscribe(t=>{t.room.grp&&(fetchAvailableInstance(t.room.grp,t.room.instance),this.socketService.generateSocket(),this.router.navigate(["student/login"],{queryParamsHandling:"merge"}))})}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(i.a),o.Rb(p.a),o.Rb(d.a),o.Rb(i.b))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-call-not-started"]],decls:8,vars:0,consts:[[1,"main-container"],[1,"meeting-over-container"],[2,"color","black","text-align","center"],[2,"text-align","center"],["mat-button","","color","primary",3,"click"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"h2",2),o.Pc(3,"Meeting is not started"),o.Wb(),o.Xb(4,"p",3),o.Pc(5,"The moderator has not started the call yet, please try again in sometime"),o.Wb(),o.Xb(6,"button",4),o.fc("click",function(){return n.getRoomIp()}),o.Pc(7,"Retry"),o.Wb(),o.Wb(),o.Wb())},directives:[b.a],styles:[".main-container[_ngcontent-%COMP%]{font-family:CircularStd-book!important;background-color:#000;width:100%;min-width:100%;max-width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}.meeting-over-container[_ngcontent-%COMP%]{border-radius:8px;width:45%;min-width:45%;max-width:45%;height:auto;padding:24px;background-color:#fff;display:flex;flex-direction:column}"]}),t})()},{path:"",redirectTo:"login",pathMatch:"full"}]}];let f=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.Pb({type:t}),t.\u0275inj=o.Ob({imports:[[i.d.forChild(m)],i.d]}),t})();var h=e("FpXt"),_=e("9Lv8"),x=e("0IaG"),w=e("znSr"),q=e("3Pt+"),v=e("kmnG"),y=e("qFsG");let P=(()=>{class t{constructor(t){this.socketService=t,this.newEvent1=new o.o,this.timer=30,this.answer_text=""}ngOnInit(){const t=setInterval(()=>{this.timer<=30&&(this.timer=this.timer-1),0===this.timer&&(this.submitAnswer(),clearInterval(t))},1e3)}ngOnChanges(t){this.question=t.input_question.currentValue}submitAnswer(){this.socketService.generateSocket(),this.socketService.socket.emit("submit-answer",{uuid:localStorage.getItem("student_uuid"),id:localStorage.getItem("assignment_id"),assignment:[{question_id:this.question._id,answer:this.answer_text}]}),this.newEvent1.emit({numb:this.question.question_label})}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(d.a))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-free-text-question"]],inputs:{input_question:"input_question"},outputs:{newEvent1:"newEvent1"},features:[o.Db],decls:30,vars:6,consts:[[1,"freetext_question_container"],[1,"assignment_question_timer"],[1,"question_type"],[2,"font-weight","bold","color","black","margin","0"],[2,"background-color","dodgerblue","color","white","padding","4px 8px 6px 8px","border-radius","4px","font-weight","bold"],[1,"timer"],[2,"font-weight","bold","margin","0"],[2,"padding","6px 12px 8px 12px","border-radius","4px","margin-left","8px","margin-right","8px",3,"ngClass"],[2,"font-weight","bold","padding","0","margin","0","font-size","medium"],[2,"margin","0"],[1,"assignment_question_text"],[1,"question_code"],[1,"question_text"],[2,"line-height","1.5"],[1,"question_options"],[1,"example-form",2,"width","100%"],["freeTextForm","ngForm"],["appearance","outline",1,"example-full-width",2,"width","100%"],["rows","5","matInput","","placeholder","Write your answer here...","name","answer","required","","type","text",2,"padding","12px","width","calc(100% - 24px)","line-height","1.2",3,"ngModel","ngModelChange"],[1,"assignment_navigation_button"],["mat-raised-button","","color","primary",3,"click"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"div",2),o.Xb(3,"p",3),o.Pc(4,"Question type: "),o.Xb(5,"span",4),o.Pc(6),o.Wb(),o.Wb(),o.Wb(),o.Xb(7,"div",5),o.Xb(8,"p",6),o.Pc(9,"Timer:"),o.Wb(),o.Xb(10,"div",7),o.Xb(11,"p",8),o.Pc(12),o.Wb(),o.Wb(),o.Xb(13,"p",9),o.Pc(14,"Seconds"),o.Wb(),o.Wb(),o.Wb(),o.Xb(15,"div",10),o.Xb(16,"div",11),o.Xb(17,"p"),o.Pc(18),o.Wb(),o.Wb(),o.Xb(19,"div",12),o.Xb(20,"p",13),o.Pc(21),o.Wb(),o.Xb(22,"div",14),o.Xb(23,"form",15,16),o.Xb(25,"mat-form-field",17),o.Xb(26,"textarea",18),o.fc("ngModelChange",function(t){return n.answer_text=t}),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Xb(27,"div",19),o.Xb(28,"button",20),o.fc("click",function(){return n.submitAnswer()}),o.Pc(29,"Submit"),o.Wb(),o.Wb(),o.Wb()),2&t&&(o.Fb(6),o.Qc(null==n.question?null:n.question.question_type),o.Fb(4),o.qc("ngClass",n.timer<=5?"red-zone":"green-zone"),o.Fb(2),o.Qc(n.timer),o.Fb(6),o.Qc(null==n.question?null:n.question.question_label),o.Fb(3),o.Qc(null==n.question?null:n.question.question),o.Fb(5),o.qc("ngModel",n.answer_text))},directives:[r.l,w.a,q.A,q.t,q.u,v.c,y.b,q.d,q.y,q.s,q.v,b.a],styles:[".freetext_question_container[_ngcontent-%COMP%]{width:100%;height:auto}.assignment_question_container[_ngcontent-%COMP%]{font-family:Tahoma;background-color:#fff;height:auto;width:700px;padding:24px}.assignment_question_heading[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center}.assignment_question_timer[_ngcontent-%COMP%]{width:100%;height:70px;display:flex;justify-content:space-between;align-items:center}.assignment_question_text[_ngcontent-%COMP%]{display:flex;width:100%}.question_code[_ngcontent-%COMP%]{padding:0 24px}.question_text[_ngcontent-%COMP%]{width:100%;padding:0 24px 0 0;display:flex;flex-direction:column}.assignment_navigation_button[_ngcontent-%COMP%]{justify-content:center}.assignment_navigation_button[_ngcontent-%COMP%], .assignment_submit_button[_ngcontent-%COMP%]{width:calc(100% - 48px);padding:40px 24px 24px;display:flex;gap:24px}.assignment_submit_button[_ngcontent-%COMP%]{justify-content:flex-end}.question_options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}  .mat-checkbox-label{line-height:24px;padding-left:12px}  .mat-form-field-appearance-outline .mat-form-field-flex{padding:0!important;height:auto}  .mat-form-field-appearance-outline .mat-form-field-infix{padding:0!important}.question_type[_ngcontent-%COMP%]{padding-right:16px}.timer[_ngcontent-%COMP%]{padding-left:16px;display:flex;justify-content:center;align-items:center}.green-zone[_ngcontent-%COMP%]{background-color:#08b82a;color:#fff}.red-zone[_ngcontent-%COMP%]{background-color:#d11010;color:#fff}"]}),t})();var O=e("QibW");function C(t,n){if(1&t&&(o.Xb(0,"mat-radio-button",20),o.Pc(1),o.Wb()),2&t){const t=n.$implicit;o.qc("value",t.label),o.Fb(1),o.Rc(" ",t.option," ")}}let M=(()=>{class t{constructor(t){this.socketService=t,this.newEvent2=new o.o,this.timer=30,this.answer_text=""}ngOnInit(){const t=setInterval(()=>{this.timer<=30&&(this.timer=this.timer-1),0===this.timer&&(this.submitAnswer(),clearInterval(t))},1e3)}ngOnChanges(t){this.question=t.input_question.currentValue}submitAnswer(){this.socketService.generateSocket(),this.socketService.socket.emit("submit-answer",{uuid:localStorage.getItem("student_uuid"),id:localStorage.getItem("assignment_id"),assignment:[{question_id:this.question._id,answer:this.answer_text}]}),this.newEvent2.emit({numb:this.question.question_label})}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(d.a))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-single-select-question"]],inputs:{input_question:"input_question"},outputs:{newEvent2:"newEvent2"},features:[o.Db],decls:30,vars:7,consts:[[1,"singleselect_question_container"],[1,"assignment_question_timer"],[1,"question_type"],[2,"font-weight","bold","color","black","margin","0"],[2,"background-color","dodgerblue","color","white","padding","4px 8px 6px 8px","border-radius","4px","font-weight","bold"],[1,"timer"],[2,"font-weight","bold","margin","0"],[2,"padding","6px 12px 8px 12px","border-radius","4px","margin-left","8px","margin-right","8px",3,"ngClass"],[2,"font-weight","bold","padding","0","margin","0","font-size","medium"],[2,"margin","0"],[1,"assignment_question_text"],[1,"question_code"],[1,"question_text"],[2,"line-height","1.5"],[1,"question_options"],["singleSelectForm","ngForm"],["aria-labelledby","example-radio-group-label","name","single_select",1,"example-radio-group",2,"display","flex","flex-direction","column","gap","12px",3,"ngModel","ngModelChange"],["class","example-radio-button",3,"value",4,"ngFor","ngForOf"],[1,"assignment_navigation_button"],["mat-raised-button","","color","primary",3,"click"],[1,"example-radio-button",3,"value"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"div",2),o.Xb(3,"p",3),o.Pc(4,"Question type: "),o.Xb(5,"span",4),o.Pc(6),o.Wb(),o.Wb(),o.Wb(),o.Xb(7,"div",5),o.Xb(8,"p",6),o.Pc(9,"Timer:"),o.Wb(),o.Xb(10,"div",7),o.Xb(11,"p",8),o.Pc(12),o.Wb(),o.Wb(),o.Xb(13,"p",9),o.Pc(14,"Seconds"),o.Wb(),o.Wb(),o.Wb(),o.Xb(15,"div",10),o.Xb(16,"div",11),o.Xb(17,"p"),o.Pc(18),o.Wb(),o.Wb(),o.Xb(19,"div",12),o.Xb(20,"p",13),o.Pc(21),o.Wb(),o.Xb(22,"div",14),o.Xb(23,"form",null,15),o.Xb(25,"mat-radio-group",16),o.fc("ngModelChange",function(t){return n.answer_text=t}),o.Nc(26,C,2,2,"mat-radio-button",17),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Wb(),o.Xb(27,"div",18),o.Xb(28,"button",19),o.fc("click",function(){return n.submitAnswer()}),o.Pc(29,"Submit"),o.Wb(),o.Wb(),o.Wb()),2&t&&(o.Fb(6),o.Qc(null==n.question?null:n.question.question_type),o.Fb(4),o.qc("ngClass",n.timer<=5?"red-zone":"green-zone"),o.Fb(2),o.Qc(n.timer),o.Fb(6),o.Qc(null==n.question?null:n.question.question_label),o.Fb(3),o.Qc(null==n.question?null:n.question.question),o.Fb(4),o.qc("ngModel",n.answer_text),o.Fb(1),o.qc("ngForOf",null==n.question?null:n.question.options))},directives:[r.l,w.a,q.A,q.t,q.u,O.b,q.s,q.v,r.m,b.a,O.a],styles:[".singleselect_question_container[_ngcontent-%COMP%]{width:100%;height:auto;padding-bottom:21px}.assignment_question_container[_ngcontent-%COMP%]{font-family:Tahoma;background-color:#fff;height:auto;width:700px;padding:24px}.assignment_question_heading[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center}.assignment_question_timer[_ngcontent-%COMP%]{width:100%;height:70px;display:flex;justify-content:space-between;align-items:center}.assignment_question_text[_ngcontent-%COMP%]{display:flex;width:100%}.question_code[_ngcontent-%COMP%]{padding:0 24px}.question_text[_ngcontent-%COMP%]{width:100%;padding:0 24px 0 0;display:flex;flex-direction:column}.assignment_navigation_button[_ngcontent-%COMP%]{justify-content:center}.assignment_navigation_button[_ngcontent-%COMP%], .assignment_submit_button[_ngcontent-%COMP%]{width:calc(100% - 48px);padding:40px 24px 24px;display:flex;gap:24px}.assignment_submit_button[_ngcontent-%COMP%]{justify-content:flex-end}.question_options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;padding:0 0 0 24px}  .mat-checkbox-label{line-height:24px;padding-left:12px}  .mat-form-field-appearance-outline .mat-form-field-flex{padding:0!important;height:auto}  .mat-form-field-appearance-outline .mat-form-field-infix{padding:0!important}.question_type[_ngcontent-%COMP%]{padding-right:16px}.timer[_ngcontent-%COMP%]{padding-left:16px;display:flex;justify-content:center;align-items:center}  .mat-radio-label-content{padding-left:20px!important}.green-zone[_ngcontent-%COMP%]{background-color:#08b82a;color:#fff}.red-zone[_ngcontent-%COMP%]{background-color:#d11010;color:#fff}"]}),t})();var X=e("bSwM");function k(t,n){if(1&t&&(o.Xb(0,"mat-checkbox",18),o.Pc(1),o.Wb()),2&t){const t=n.$implicit;o.Fb(1),o.Qc(t.option)}}let W=(()=>{class t{constructor(t,n){this.socketService=t,this.dialogRef=n,this.newEvent3=new o.o,this.timer=30,this.answer_text=""}ngOnInit(){const t=setInterval(()=>{this.timer<=30&&(this.timer=this.timer-1),0===this.timer&&(this.submitAnswer(),clearInterval(t))},1e3)}ngOnChanges(t){this.question=t.input_question.currentValue}submitAnswer(){this.socketService.generateSocket(),this.socketService.socket.emit("submit-answer",{uuid:localStorage.getItem("student_uuid"),id:localStorage.getItem("assignment_id"),assignment:[{question_id:this.question._id,answer:"1"}]}),this.newEvent3.emit({numb:this.question.question_label}),this.dialogRef.close()}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(d.a),o.Rb(x.f))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-multi-select-question"]],inputs:{input_question:"input_question"},outputs:{newEvent3:"newEvent3"},features:[o.Db],decls:27,vars:6,consts:[[1,"multiselect_question_container"],[1,"assignment_question_timer"],[1,"question_type"],[2,"font-weight","bold","color","black","margin","0"],[2,"background-color","dodgerblue","color","white","padding","4px 8px 6px 8px","border-radius","4px","font-weight","bold"],[1,"timer"],[2,"font-weight","bold","margin","0"],[2,"padding","6px 12px 8px 12px","border-radius","4px","margin-left","8px","margin-right","8px",3,"ngClass"],[2,"font-weight","bold","padding","0","margin","0","font-size","medium"],[2,"margin","0"],[1,"assignment_question_text"],[1,"question_code"],[1,"question_text"],[2,"line-height","1.5"],[1,"question_options"],["class","example-margin",4,"ngFor","ngForOf"],[1,"assignment_navigation_button"],["mat-raised-button","","color","primary",3,"click"],[1,"example-margin"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"div",2),o.Xb(3,"p",3),o.Pc(4,"Question type: "),o.Xb(5,"span",4),o.Pc(6),o.Wb(),o.Wb(),o.Wb(),o.Xb(7,"div",5),o.Xb(8,"p",6),o.Pc(9,"Timer:"),o.Wb(),o.Xb(10,"div",7),o.Xb(11,"p",8),o.Pc(12),o.Wb(),o.Wb(),o.Xb(13,"p",9),o.Pc(14,"Seconds"),o.Wb(),o.Wb(),o.Wb(),o.Xb(15,"div",10),o.Xb(16,"div",11),o.Xb(17,"p"),o.Pc(18),o.Wb(),o.Wb(),o.Xb(19,"div",12),o.Xb(20,"p",13),o.Pc(21),o.Wb(),o.Xb(22,"div",14),o.Nc(23,k,2,1,"mat-checkbox",15),o.Wb(),o.Wb(),o.Wb(),o.Xb(24,"div",16),o.Xb(25,"button",17),o.fc("click",function(){return n.submitAnswer()}),o.Pc(26,"Next"),o.Wb(),o.Wb(),o.Wb()),2&t&&(o.Fb(6),o.Qc(null==n.question?null:n.question.question_type),o.Fb(4),o.qc("ngClass",n.timer<=5?"red-zone":"green-zone"),o.Fb(2),o.Qc(n.timer),o.Fb(6),o.Qc(null==n.question?null:n.question.question_label),o.Fb(3),o.Qc(null==n.question?null:n.question.question),o.Fb(2),o.qc("ngForOf",null==n.question?null:n.question.options))},directives:[r.l,w.a,r.m,b.a,X.a],styles:[".singleselect_question_container[_ngcontent-%COMP%]{width:100%;height:auto;padding-bottom:21px}.assignment_question_container[_ngcontent-%COMP%]{font-family:Tahoma;background-color:#fff;height:auto;width:700px;padding:24px}.assignment_question_heading[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center}.assignment_question_timer[_ngcontent-%COMP%]{width:100%;height:70px;display:flex;justify-content:space-between;align-items:center}.assignment_question_text[_ngcontent-%COMP%]{display:flex;width:100%}.question_code[_ngcontent-%COMP%]{padding:0 24px}.question_text[_ngcontent-%COMP%]{width:100%;padding:0 24px 0 0;display:flex;flex-direction:column}.assignment_navigation_button[_ngcontent-%COMP%]{justify-content:center}.assignment_navigation_button[_ngcontent-%COMP%], .assignment_submit_button[_ngcontent-%COMP%]{width:calc(100% - 48px);padding:40px 24px 24px;display:flex;gap:24px}.assignment_submit_button[_ngcontent-%COMP%]{justify-content:flex-end}.question_options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;padding:0 0 0 24px}  .mat-checkbox-label{line-height:24px;padding-left:12px}  .mat-form-field-appearance-outline .mat-form-field-flex{padding:0!important;height:auto}  .mat-form-field-appearance-outline .mat-form-field-infix{padding:0!important}.question_type[_ngcontent-%COMP%]{padding-right:16px}.timer[_ngcontent-%COMP%]{padding-left:16px;display:flex;justify-content:center;align-items:center}  .mat-radio-label-content{padding-left:20px!important}.green-zone[_ngcontent-%COMP%]{background-color:#08b82a;color:#fff}.red-zone[_ngcontent-%COMP%]{background-color:#d11010;color:#fff}"]}),t})();function S(t,n){if(1&t){const t=o.Yb();o.Xb(0,"div"),o.Xb(1,"app-free-text-question",6),o.fc("newEvent1",function(n){return o.Fc(t),o.jc(2).logNavigation(n)}),o.Wb(),o.Wb()}if(2&t){const t=o.jc().$implicit;o.Fb(1),o.qc("input_question",t)}}function F(t,n){if(1&t){const t=o.Yb();o.Xb(0,"div"),o.Xb(1,"app-single-select-question",7),o.fc("newEvent2",function(n){return o.Fc(t),o.jc(2).logNavigation(n)}),o.Wb(),o.Wb()}if(2&t){const t=o.jc().$implicit;o.Fb(1),o.qc("input_question",t)}}function j(t,n){if(1&t){const t=o.Yb();o.Xb(0,"div"),o.Xb(1,"app-multi-select-question",8),o.fc("newEvent3",function(n){return o.Fc(t),o.jc(2).logNavigation(n)}),o.Wb(),o.Wb()}if(2&t){const t=o.jc().$implicit;o.Fb(1),o.qc("input_question",t)}}function I(t,n){if(1&t&&(o.Vb(0),o.Nc(1,S,2,1,"div",5),o.Nc(2,F,2,1,"div",5),o.Nc(3,j,2,1,"div",5),o.Ub()),2&t){const t=n.$implicit;o.Fb(1),o.qc("ngIf","freetext"===(null==t?null:t.question_type)),o.Fb(1),o.qc("ngIf","single"===(null==t?null:t.question_type)),o.Fb(1),o.qc("ngIf","multiple"===(null==t?null:t.question_type))}}let R=(()=>{class t{constructor(t,n){this.data=t,this.dialogRef=n,this.assignment=[],this.assignment1=this.data,localStorage.setItem("assignment_id",this.assignment1.assignment._id),this.assignment.push(this.assignment1.assignment.questions[0])}logNavigation(t){this.assignment1.assignment.questions.length!==t.numb&&(this.assignment.pop(),this.assignment.push(this.assignment1.assignment.questions[t.numb]))}}return t.\u0275fac=function(n){return new(n||t)(o.Rb(x.a),o.Rb(x.f))},t.\u0275cmp=o.Lb({type:t,selectors:[["app-questioncontainer"]],decls:6,vars:2,consts:[[2,"width","100%","height","80%","display","flex","justify-content","center","align-items","center"],[1,"assignment_question_container"],[1,"assignment_question_heading"],[2,"font-weight","bold","font-size","large"],[4,"ngFor","ngForOf"],[4,"ngIf"],[3,"input_question","newEvent1"],[3,"input_question","newEvent2"],[3,"input_question","newEvent3"]],template:function(t,n){1&t&&(o.Xb(0,"div",0),o.Xb(1,"div",1),o.Xb(2,"div",2),o.Xb(3,"p",3),o.Pc(4),o.Wb(),o.Wb(),o.Nc(5,I,4,3,"ng-container",4),o.Wb(),o.Wb()),2&t&&(o.Fb(4),o.Qc(n.assignment1.assignment.title),o.Fb(1),o.qc("ngForOf",n.assignment))},directives:[r.m,r.n,P,M,W],styles:[".assignment_question_container[_ngcontent-%COMP%]{font-family:Tahoma;background-color:#fff;height:auto;width:700px;padding:24px}.assignment_question_heading[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center}.assignment_question_timer[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;align-items:center}.assignment_question_text[_ngcontent-%COMP%]{display:flex;width:100%}.question_code[_ngcontent-%COMP%]{padding:0 24px}.question_text[_ngcontent-%COMP%]{width:100%;padding:0 24px 0 0;display:flex;flex-direction:column}.assignment_navigation_button[_ngcontent-%COMP%]{justify-content:center}.assignment_navigation_button[_ngcontent-%COMP%], .assignment_submit_button[_ngcontent-%COMP%]{width:calc(100% - 48px);padding:40px 24px 24px;display:flex;gap:24px}.assignment_submit_button[_ngcontent-%COMP%]{justify-content:flex-end}.question_options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}  .mat-checkbox-label{line-height:24px;padding-left:12px}  .mat-form-field-appearance-outline .mat-form-field-flex{padding:0!important;height:auto}  .mat-form-field-appearance-outline .mat-form-field-infix{padding:0!important}.question_type[_ngcontent-%COMP%]{padding-right:16px}.timer[_ngcontent-%COMP%]{padding-left:16px;display:flex;justify-content:center;align-items:center}"]}),t})(),E=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.Pb({type:t}),t.\u0275inj=o.Ob({imports:[[h.a,f]]}),t})();o.Ic(_.a,[R],[])}}]);