(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"1+8d":function(t,e,o){"use strict";o.r(e),o.d(e,"AuthenticationModule",function(){return ht});var r=o("ofXK"),n=o("tyNb"),s=o("FpXt"),i=o("0Lug"),a=o("yB+K"),l=o("kYN2"),c=o("fXoL"),u=o("LUsR"),d=o("XiUz"),b=o("3Pt+"),f=o("v0EB"),m=o("AytR"),p=o("tk/3"),g=o("iiAa"),h=o("znSr"),x=o("NFeN"),v=o("kmnG"),y=o("bTqV");function w(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Email is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function P(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Email is "),c.Xb(2,"strong"),c.Pc(3,"Invalid"),c.Wb(),c.Wb())}function F(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function C(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password should be of "),c.Xb(2,"b"),c.Pc(3,"8"),c.Wb(),c.Pc(4," characters "),c.Xb(5,"b"),c.Pc(6,"(at least one digit, one lower case, one upper case, one special character)"),c.Wb(),c.Wb())}function W(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Email and Password is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function I(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1,"Terms Condition required"),c.Wb())}function X(t,e){1&t&&c.Sb(0,"img",17)}function k(t,e){if(1&t){const t=c.Yb();c.Xb(0,"form",3),c.fc("ngSubmit",function(){c.Fc(t);const e=c.jc();return e.signUp(e.form.value)}),c.Xb(1,"div",4),c.Xb(2,"span",5),c.Pc(3,"Email Id"),c.Wb(),c.Xb(4,"span",6),c.Sb(5,"input",7),c.Wb(),c.Wb(),c.Xb(6,"div",8),c.Nc(7,w,4,0,"mat-error",9),c.Nc(8,P,4,0,"mat-error",9),c.Wb(),c.Xb(9,"div",4),c.Xb(10,"span",5),c.Pc(11,"Password"),c.Wb(),c.Xb(12,"span",10),c.Sb(13,"input",11),c.Xb(14,"mat-icon",12),c.fc("click",function(){c.Fc(t);const e=c.jc();return e.passView=!e.passView}),c.Pc(15),c.Wb(),c.Wb(),c.Wb(),c.Xb(16,"div",8),c.Nc(17,F,4,0,"mat-error",9),c.Nc(18,C,7,0,"mat-error",9),c.Nc(19,W,4,0,"mat-error",9),c.Nc(20,I,2,0,"mat-error",9),c.Wb(),c.Xb(21,"div",13),c.Xb(22,"a",14),c.fc("click",function(){return c.Fc(t),c.jc().forgotPass=!0}),c.Pc(23,"Forgot Password?"),c.Wb(),c.Xb(24,"button",15),c.Pc(25,"Log In "),c.Nc(26,X,1,0,"img",16),c.Wb(),c.Wb(),c.Wb()}if(2&t){const t=c.jc();c.qc("formGroup",t.form),c.Fb(7),c.qc("ngIf",(null==t.form.controls||null==t.form.controls.email.errors?null:t.form.controls.email.errors.required)&&!(null!=t.form.controls.password.errors&&t.form.controls.password.errors.required)),c.Fb(1),c.qc("ngIf",(null==t.form.controls.email?null:t.form.controls.email.touched)&&(null==t.form.controls.email.errors?null:t.form.controls.email.errors.pattern)),c.Fb(5),c.qc("type",t.passView?"password":"text"),c.Fb(2),c.Qc(t.passView?"visibility_off":"visibility"),c.Fb(2),c.qc("ngIf",(null==t.form.controls.password.errors?null:t.form.controls.password.errors.required)&&!(null!=t.form.controls&&null!=t.form.controls.email.errors&&t.form.controls.email.errors.required)),c.Fb(1),c.qc("ngIf",(null==t.form.controls.password?null:t.form.controls.password.touched)&&(null==t.form.controls.password.errors?null:t.form.controls.password.errors.pattern)),c.Fb(1),c.qc("ngIf",t.isSourceMonet&&(null==t.form.controls||null==t.form.controls.email.errors?null:t.form.controls.email.errors.required)&&(null==t.form.controls.password.errors?null:t.form.controls.password.errors.required)&&(null==t.form.controls.email?null:t.form.controls.email.touched)),c.Fb(1),c.qc("ngIf",!t.termCondition),c.Fb(4),c.qc("ngClass",t.form.valid&&t.isInstanceAlotted&&t.termCondition?"logedInBtn":"logInBtn")("disabled",!(t.form.valid&&t.isInstanceAlotted&&t.termCondition)),c.Fb(2),c.qc("ngIf",t.loader)}}function S(t,e){if(1&t){const t=c.Yb();c.Xb(0,"div",25),c.Xb(1,"span",5),c.Pc(2," New Password"),c.Wb(),c.Xb(3,"span",10),c.Sb(4,"input",11),c.Xb(5,"mat-icon",12),c.fc("click",function(){c.Fc(t);const e=c.jc(2);return e.hide=!e.hide}),c.Pc(6),c.Wb(),c.Wb(),c.Wb()}if(2&t){const t=c.jc(2);c.Fb(4),c.qc("type",t.hide?"password":"text"),c.Fb(2),c.Qc(t.hide?"visibility_off":"visibility")}}function L(t,e){if(1&t){const t=c.Yb();c.Xb(0,"div",25),c.Xb(1,"span",5),c.Pc(2,"Confirm Password"),c.Wb(),c.Xb(3,"span",10),c.Sb(4,"input",26),c.Xb(5,"mat-icon",12),c.fc("click",function(){c.Fc(t);const e=c.jc(2);return e.cPassView=!e.cPassView}),c.Pc(6),c.Wb(),c.Wb(),c.Wb()}if(2&t){const t=c.jc(2);c.Fb(4),c.qc("type",t.cPassView?"password":"text"),c.Fb(2),c.Qc(t.cPassView?"visibility_off":"visibility")}}function q(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Email is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function A(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function _(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Confirm Password is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function N(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password should be of "),c.Xb(2,"b"),c.Pc(3,"8"),c.Wb(),c.Pc(4," characters "),c.Xb(5,"b"),c.Pc(6,"(at least one digit, one lower case, one upper case, one special character)"),c.Wb(),c.Wb())}function O(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password and Confirm Password should be "),c.Xb(2,"strong"),c.Pc(3,"Same"),c.Wb(),c.Wb())}function M(t,e){if(1&t){const t=c.Yb();c.Xb(0,"form",18),c.fc("ngSubmit",function(){c.Fc(t);const e=c.jc();return e.resetPass(e.resetForm.value)}),c.Xb(1,"div",19),c.Xb(2,"span",5),c.Pc(3,"Email Id"),c.Wb(),c.Xb(4,"span",6),c.Sb(5,"input",20),c.Wb(),c.Wb(),c.Nc(6,S,7,2,"div",21),c.Nc(7,L,7,2,"div",21),c.Xb(8,"div",22),c.Nc(9,q,4,0,"mat-error",9),c.Nc(10,A,4,0,"mat-error",9),c.Nc(11,_,4,0,"mat-error",9),c.Nc(12,N,7,0,"mat-error",9),c.Nc(13,O,4,0,"mat-error",9),c.Wb(),c.Xb(14,"div",23),c.Xb(15,"button",24),c.fc("click",function(){return c.Fc(t),c.jc().forgotPass=!1}),c.Xb(16,"mat-icon"),c.Pc(17,"keyboard_arrow_left"),c.Wb(),c.Wb(),c.Xb(18,"button",15),c.Pc(19),c.Wb(),c.Wb(),c.Wb()}if(2&t){const t=c.jc();c.qc("formGroup",t.resetForm),c.Fb(6),c.qc("ngIf",t.passReset),c.Fb(1),c.qc("ngIf",t.passReset),c.Fb(2),c.qc("ngIf",(null==t.resetForm.controls.email?null:t.resetForm.controls.email.touched)&&(null==t.resetForm.controls||null==t.resetForm.controls.email||null==t.resetForm.controls.email.errors?null:t.resetForm.controls.email.errors.required)),c.Fb(1),c.qc("ngIf",(null==t.resetForm.controls.password?null:t.resetForm.controls.password.touched)&&(null==t.resetForm.controls||null==t.resetForm.controls.password||null==t.resetForm.controls.password.errors?null:t.resetForm.controls.password.errors.required)),c.Fb(1),c.qc("ngIf",(null==t.resetForm.controls.matchPassword?null:t.resetForm.controls.matchPassword.touched)&&(null==t.resetForm.controls||null==t.resetForm.controls.matchPassword||null==t.resetForm.controls.matchPassword.errors?null:t.resetForm.controls.matchPassword.errors.required)),c.Fb(1),c.qc("ngIf",null==t.resetForm.get("password").errors?null:t.resetForm.get("password").errors.pattern),c.Fb(1),c.qc("ngIf",null==t.resetForm.errors?null:t.resetForm.errors.noMatch),c.Fb(5),c.qc("ngClass",null!=t.resetForm.controls.email.errors&&t.resetForm.controls.email.errors.required?"logInBtn":"logedInBtn")("disabled",null==t.resetForm.controls.email.errors?null:t.resetForm.controls.email.errors.required),c.Fb(1),c.Qc(t.passReset?"RESET":"SEND LINK")}}const z=/^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}$/,R=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&'])[^ ]{8,}$/;function G(t){var e,o,r;if(""!==(null===(e=null==t?void 0:t.get("matchPassword"))||void 0===e?void 0:e.value))return(null===(o=null==t?void 0:t.get("password"))||void 0===o?void 0:o.value)===(null===(r=null==t?void 0:t.get("matchPassword"))||void 0===r?void 0:r.value)?null:{noMatch:"password not matching"}}let T=(()=>{class t{constructor(t,e,o,r,n,s,i,a,l){this.fb=t,this.as=e,this.router=o,this.sl=r,this.http=n,this.route=s,this.bhvSub=i,this.tps=a,this.utility=l,this.isInstanceAlotted=!1,this.forgotPass=!1,this.hide=!0,this.viewPass=!0,this.passReset=!1,this.passView=!0,this.isSourceMonet=!1,this.cPassView=!0,this.loader=!1,this.termCondition=!0,this.form=this.fb.group({email:["",b.z.compose([b.z.required,b.z.pattern(z)])],password:["",[b.z.required,b.z.pattern(R)]]}),this.resetForm=this.fb.group({email:["",b.z.compose([b.z.required,b.z.pattern(z)])],password:["",[b.z.required,b.z.pattern(R)]],matchPassword:["",b.z.required]},{validator:G})}ngOnInit(){this.route.queryParams.subscribe(t=>{t&&t.token&&(this.newToken=t.token,this.passReset=this.forgotPass=!0)}),this.tps.loaderStat.subscribe(t=>this.loader=t)}ngOnChanges(t){(null==t?void 0:t.instanceStatus)&&(this.isInstanceAlotted=t.instanceStatus.currentValue),(null==t?void 0:t.term)&&(this.termCondition=null==t?void 0:t.term.currentValue)}signUp(t){this.loader=!0,dynamoLink?(this.form.value.source="monet",this.isSourceMonet=!0,this.bhvSub.obDynamicLink(""+dynamoLink),this.tps.loginFunc(this.form.value,"login")):console.error("Dynamic Link not available")}resetPass(t){this.forgotPass=!1,this.passReset?this.http.put(m.a.base+"reset-password/"+this.newToken,{newPassword:t.password,confirmNewPassword:t.matchPassword}).subscribe(t=>{this.utility.notify(t.message,""),this.router.navigate(["/"])},t=>{console.error(t.error.message),this.utility.notify(t.error.message,""),this.router.navigate(["/"])}):this.http.put(m.a.base+"forget-password",t).subscribe(t=>{this.utility.notify(t.message,"")},t=>{console.error(t),this.utility.notify(t.message,"")})}}return t.\u0275fac=function(e){return new(e||t)(c.Rb(b.g),c.Rb(f.a),c.Rb(n.b),c.Rb(i.a),c.Rb(p.b),c.Rb(n.a),c.Rb(u.a),c.Rb(a.a),c.Rb(g.a))},t.\u0275cmp=c.Lb({type:t,selectors:[["app-login"]],inputs:{instanceStatus:"instanceStatus",term:"term"},features:[c.Eb([f.a,i.a]),c.Db],decls:3,vars:2,consts:[["fxLayout","column","fxLayoutAlign","center center","fxFill","","fxLayoutGap","22px",2,"border-radius","10px 0 0 10px"],["fxLayout","column","fxLayoutAlign","center start","ngClass","formClass","padding","","class","card",3,"formGroup","ngSubmit",4,"ngIf"],["fxLayout","column","fxFill","","fxLayoutGap","20px","fxLayoutAlign","center center","padding","","class","card","style","padding: 60px 0;",3,"formGroup","ngSubmit",4,"ngIf"],["fxLayout","column","fxLayoutAlign","center start","ngClass","formClass","padding","",1,"card",3,"formGroup","ngSubmit"],["fxLayout","column","fxFlex","28",2,"width","100%"],["fxFlex","25"],["fxFlex","75"],["type","email","autofocus","","formControlName","email","placeholder","Ex. abc@xyz.com","inputStyle",""],["fxLayout","row","fxFlex","8","fxLayoutGap","7px","fxLayoutAlign","start start",2,"width","100%","color","#c8663c !important"],[4,"ngIf"],["fxFlex","75",2,"position","relative"],["type","password","formControlName","password","inputStyle","",3,"type"],["matSuffix","","passwordIcon","","pointer","",3,"click"],["fxLayout","row","fxFlex","15","fxLayoutAlign","space-between center",2,"width","90%"],[2,"cursor","pointer","text-decoration","underline",3,"click"],["mat-raised-button","","type","submit",3,"ngClass","disabled"],["src","/assets/images/loader.svg","height","20px","width","20px","style","margin-left: 5px; border-radius: 50%",4,"ngIf"],["src","/assets/images/loader.svg","height","20px","width","20px",2,"margin-left","5px","border-radius","50%"],["fxLayout","column","fxFill","","fxLayoutGap","20px","fxLayoutAlign","center center","padding","",1,"card",2,"padding","60px 0",3,"formGroup","ngSubmit"],["fxLayout","column","fxFlex","25","fxLayoutGap","20px",2,"width","70%","color","white"],["type","email","formControlName","email","inputStyle",""],["fxLayout","column","fxFlex","25","fxLayoutGap","10px","style"," width: 70%; color: white;",4,"ngIf"],["fxLayout","column","fxFlex","8","fxLayoutGap","5px","fxLayoutAlign","start center",2,"width","70%","color","#c8663c !important"],["fxLayout","row","fxFlex","17","fxLayoutAlign","space-around center","fxLayoutGap","16px","full-width",""],["mat-mini-fab","","color","primary","type","button",3,"click"],["fxLayout","column","fxFlex","25","fxLayoutGap","10px",2,"width","70%","color","white"],["type","password","formControlName","matchPassword","inputStyle","",3,"type"]],template:function(t,e){1&t&&(c.Xb(0,"div",0),c.Nc(1,k,27,12,"form",1),c.Nc(2,M,20,11,"form",2),c.Wb()),2&t&&(c.Fb(1),c.qc("ngIf",!e.forgotPass),c.Fb(1),c.qc("ngIf",e.forgotPass))},directives:[d.f,d.e,d.h,d.g,r.n,b.A,b.t,r.l,h.a,b.k,d.b,b.d,b.s,b.i,x.a,v.h,y.a,v.b],styles:["[inputStyle][_ngcontent-%COMP%]{background:transparent;border-radius:10px;width:85%;height:40%;padding:10px;border:1px solid #dcdcdc;outline:none;color:#fff}.formClass[_ngcontent-%COMP%]{width:85%;height:80%;font-style:normal;font-weight:400;font-size:16px;line-height:16px;color:#fff!important}.formClass[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill{-webkit-transition:background-color 5000s ease-in-out 0s!important;transition:background-color 5000s ease-in-out 0s!important;-webkit-text-fill-color:#fff!important}.logInBtn[_ngcontent-%COMP%]{width:100px;border-radius:20px;border:1px solid #fff}.logInBtn[_ngcontent-%COMP%]     .mat-button-wrapper{color:#fff}.logedInBtn[_ngcontent-%COMP%]{width:100px;border-radius:20px;border:1px solid #fff}.logedInBtn[_ngcontent-%COMP%]     .mat-button-wrapper{color:#000}[passwordIcon][_ngcontent-%COMP%]{position:absolute;right:13%;top:20%;color:#777}.mat-error[_ngcontent-%COMP%]{color:rgba(210,70,11,.99)!important}"]}),t})();var j=o("QibW");function E(t,e){1&t&&c.Sb(0,"img",8)}let D=(()=>{class t{constructor(t,e,o){this.router=t,this.api=e,this.tps=o,this.adminId=JSON.parse(localStorage.getItem("userDetails")||"").email,this.role="moderator",this.loader=!1,this.onSubmit=()=>{this.loader=!0,this.tps.updateRole({userType:this.role,email:this.adminId},"updateRole")}}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)(c.Rb(n.b),c.Rb(f.a),c.Rb(a.a))},t.\u0275cmp=c.Lb({type:t,selectors:[["app-role"]],decls:14,vars:3,consts:[["fxLayout","column","fxFlex","100","fxLayoutAlign","center center","fxLayoutGap","10%","ngClass","formClass",2,"border-radius","10px 0 0 10px"],[2,"color","#3EFF10","font-size","24px"],["aria-label","Select an option","fxLayoutGap","30px",3,"ngModel","ngModelChange"],["value","moderator"],["value","observer"],["fxLayout","row","fxFlex","10","fxLayoutAlign","end center",2,"width","70%"],["mat-raised-button","","type","submit",3,"ngClass","click"],["src","/assets/images/loader.svg","height","20px","width","20px","style","margin-left: 5px; border-radius: 50%",4,"ngIf"],["src","/assets/images/loader.svg","height","20px","width","20px",2,"margin-left","5px","border-radius","50%"]],template:function(t,e){1&t&&(c.Xb(0,"div",0),c.Xb(1,"span",1),c.Pc(2,"Awesome!!!"),c.Wb(),c.Xb(3,"span"),c.Pc(4,"Just need to select your role before you move to Dashboard"),c.Wb(),c.Xb(5,"mat-radio-group",2),c.fc("ngModelChange",function(t){return e.role=t}),c.Xb(6,"mat-radio-button",3),c.Pc(7,"Moderator"),c.Wb(),c.Xb(8,"mat-radio-button",4),c.Pc(9,"Observer"),c.Wb(),c.Wb(),c.Xb(10,"div",5),c.Xb(11,"button",6),c.fc("click",function(){return e.onSubmit()}),c.Pc(12,"Submit "),c.Nc(13,E,1,0,"img",7),c.Wb(),c.Wb(),c.Wb()),2&t&&(c.Fb(5),c.qc("ngModel",e.role),c.Fb(6),c.qc("ngClass","logedInBtn"),c.Fb(2),c.qc("ngIf",e.loader))},directives:[d.f,d.b,d.e,d.g,r.l,h.a,j.b,b.s,b.v,j.a,y.a,r.n],styles:[".formClass[_ngcontent-%COMP%]{font-style:normal;font-weight:400;font-size:18px;line-height:16px;color:#fff!important}.formClass[_ngcontent-%COMP%]     .mat-radio-checked .mat-radio-inner-circle{background:#32dd16!important}.formClass[_ngcontent-%COMP%]     .mat-radio-button, .formClass[_ngcontent-%COMP%]     .mat-radio-button .mat-radio-label-content, .formClass[_ngcontent-%COMP%]     .mat-radio-group{color:#fff!important}.logInBtn[_ngcontent-%COMP%]{width:100px;border-radius:20px;border:1px solid #fff}.logInBtn[_ngcontent-%COMP%]     .mat-button-wrapper{color:#fff}.logedInBtn[_ngcontent-%COMP%]{width:100px;border-radius:20px;background:#493077;border:1px solid #fff}.logedInBtn[_ngcontent-%COMP%]     .mat-button-wrapper{color:#fff}"]}),t})();function V(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Name is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function B(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Name should be of minimum "),c.Xb(2,"b"),c.Pc(3,"3"),c.Wb(),c.Pc(4," alpha characters "),c.Wb())}function U(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Email is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function Z(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Email is "),c.Xb(2,"strong"),c.Pc(3,"Invalid"),c.Wb(),c.Wb())}function $(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function Y(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password should be of "),c.Xb(2,"b"),c.Pc(3,"8"),c.Wb(),c.Pc(4," characters "),c.Xb(5,"b"),c.Pc(6,"(at least one digit, one lower case, one upper case, one special character)"),c.Wb(),c.Wb())}function J(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Confirm Password is "),c.Xb(2,"strong"),c.Pc(3,"required"),c.Wb(),c.Wb())}function Q(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1," Password and Confirm Password should be "),c.Xb(2,"strong"),c.Pc(3,"Same"),c.Wb(),c.Wb())}function H(t,e){1&t&&(c.Xb(0,"mat-error"),c.Pc(1,"Terms Condition required"),c.Wb())}const K=/[a-zA-Z_ ]*$/,tt=/^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}$/,et=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&'])[^ ]{8,}$/;function ot(t){var e,o,r;if(""!==(null===(e=null==t?void 0:t.get("confirm_password"))||void 0===e?void 0:e.value))return(null===(o=null==t?void 0:t.get("password"))||void 0===o?void 0:o.value)===(null===(r=null==t?void 0:t.get("confirm_password"))||void 0===r?void 0:r.value)?null:{noMatch:"password not matching"}}let rt=(()=>{class t{constructor(t,e,o,r){this.fb=t,this.as=e,this.http=o,this.utility=r,this.formSubmission=!0,this.passView=!0,this.cPassView=!0,this.tabChange=new c.o,this.form=this.fb.group({name:["",[b.z.required,b.z.pattern(K),b.z.min(3)]],email:["",b.z.compose([b.z.required,b.z.pattern(tt)])],password:["",[b.z.required,b.z.pattern(et)]],confirm_password:["",b.z.required]},{validator:ot})}ngOnInit(){}ngOnChanges(t){(null==t?void 0:t.term)&&(this.termCondition=null==t?void 0:t.term.currentValue)}signUp(t){var e,o;this.formSubmission?(this.form.value.ID=Math.floor(1e6*Math.random()).toString(),"license"===(null===(e=this.licenseToken)||void 0===e?void 0:e.type)&&(this.form.value.licenseToken=this.licenseToken.value,this.form.value.context="monet"),this.http.post("https://www.monetlive.com/many/api/"+("license"===(null===(o=this.licenseToken)||void 0===o?void 0:o.type)?"register-invited-user":"register-user"),this.form.value).subscribe(t=>{!1===t.error?(this.utility.notify(t.message,"success"),this.tabChange.emit(!1)):this.utility.notify(t.message,"error")})):this.tabChange.emit(this.formSubmission)}setFormSubmissionFlag(t){this.formSubmission=t}}return t.\u0275fac=function(e){return new(e||t)(c.Rb(b.g),c.Rb(f.a),c.Rb(p.b),c.Rb(g.a))},t.\u0275cmp=c.Lb({type:t,selectors:[["app-register"]],inputs:{term:"term",licenseToken:"licenseToken"},outputs:{tabChange:"tabChange"},features:[c.Eb([f.a]),c.Db],decls:45,vars:16,consts:[["fxLayout","column","fxLayoutAlign","center center","fxFill","","fxLayoutGap","22px",2,"border-radius","10px 0 0 10px"],["fxLayout","column","fxLayoutGap","10px","fxLayoutAlign","center start","ngClass","formClass","padding","",1,"card",3,"formGroup","ngSubmit"],["fxLayout","column","fxFlex","20","fxLayoutGap","10px",2,"width","100%"],["fxFlex","25"],["fxFlex","75"],["type","text","autofocus","","formControlName","name","placeholder","Enter Your Name","inputStyle",""],["fxLayout","row","fxFlex","8","fxLayoutGap","10px","fxLayoutAlign","start center",2,"width","100%","color","#c8663c !important"],[4,"ngIf"],["type","email","formControlName","email","placeholder","Ex. abc@xyz.com","inputStyle",""],["fxFlex","75",2,"position","relative"],["type","password","formControlName","password","inputStyle","",3,"type"],["matSuffix","","passwordIcon","","pointer","",3,"click"],["type","password","formControlName","confirm_password","inputStyle","",3,"type"],["fxLayout","row","fxFlex","8","fxLayoutGap","10px","fxLayoutAlign","center center",2,"width","100%","color","#c8663c !important"],["fxLayout","row","fxLayoutAlign","space-between center","fxLayoutGap","16px",2,"width","88%"],["mat-button","",3,"click"],["mat-raised-button","",3,"ngClass","disabled","click"]],template:function(t,e){1&t&&(c.Xb(0,"div",0),c.Xb(1,"form",1),c.fc("ngSubmit",function(){return e.signUp(e.form.value)}),c.Xb(2,"div",2),c.Xb(3,"span",3),c.Pc(4,"Name"),c.Wb(),c.Xb(5,"span",4),c.Sb(6,"input",5),c.Wb(),c.Xb(7,"div",6),c.Nc(8,V,4,0,"mat-error",7),c.Nc(9,B,5,0,"mat-error",7),c.Wb(),c.Wb(),c.Xb(10,"div",2),c.Xb(11,"span",3),c.Pc(12,"Email Id"),c.Wb(),c.Xb(13,"span",4),c.Sb(14,"input",8),c.Wb(),c.Xb(15,"div",6),c.Nc(16,U,4,0,"mat-error",7),c.Nc(17,Z,4,0,"mat-error",7),c.Wb(),c.Wb(),c.Xb(18,"div",2),c.Xb(19,"span",3),c.Pc(20,"Password"),c.Wb(),c.Xb(21,"span",9),c.Sb(22,"input",10),c.Xb(23,"mat-icon",11),c.fc("click",function(){return e.passView=!e.passView}),c.Pc(24),c.Wb(),c.Wb(),c.Xb(25,"div",6),c.Nc(26,$,4,0,"mat-error",7),c.Nc(27,Y,7,0,"mat-error",7),c.Wb(),c.Wb(),c.Xb(28,"div",2),c.Xb(29,"span",3),c.Pc(30,"Confirm Password"),c.Wb(),c.Xb(31,"span",9),c.Sb(32,"input",12),c.Xb(33,"mat-icon",11),c.fc("click",function(){return e.cPassView=!e.cPassView}),c.Pc(34),c.Wb(),c.Wb(),c.Xb(35,"div",6),c.Nc(36,J,4,0,"mat-error",7),c.Nc(37,Q,4,0,"mat-error",7),c.Wb(),c.Wb(),c.Xb(38,"div",13),c.Nc(39,H,2,0,"mat-error",7),c.Wb(),c.Xb(40,"div",14),c.Xb(41,"button",15),c.fc("click",function(){return e.setFormSubmissionFlag(!1)}),c.Pc(42,"Cancel"),c.Wb(),c.Xb(43,"button",16),c.fc("click",function(){return e.setFormSubmissionFlag(!0)}),c.Pc(44,"Sign Up"),c.Wb(),c.Wb(),c.Wb(),c.Wb()),2&t&&(c.Fb(1),c.qc("formGroup",e.form),c.Fb(7),c.qc("ngIf",(null==e.form.controls.name?null:e.form.controls.name.touched)&&(null==e.form.controls||null==e.form.controls.name.errors?null:e.form.controls.name.errors.required)),c.Fb(1),c.qc("ngIf",null==e.form.get("name").errors?null:e.form.get("name").errors.pattern),c.Fb(7),c.qc("ngIf",(null==e.form.controls.email?null:e.form.controls.email.touched)&&(null==e.form.controls||null==e.form.controls.email.errors?null:e.form.controls.email.errors.required)),c.Fb(1),c.qc("ngIf",(null==e.form.controls.email?null:e.form.controls.email.touched)&&(null==e.form.controls.email.errors?null:e.form.controls.email.errors.pattern)),c.Fb(5),c.qc("type",e.passView?"password":"text"),c.Fb(2),c.Qc(e.passView?"visibility_off":"visibility"),c.Fb(2),c.qc("ngIf",(null==e.form.controls.password?null:e.form.controls.password.touched)&&(null==e.form.controls||null==e.form.controls.password.errors?null:e.form.controls.password.errors.required)),c.Fb(1),c.qc("ngIf",null==e.form.get("password").errors?null:e.form.get("password").errors.pattern),c.Fb(5),c.qc("type",e.cPassView?"password":"text"),c.Fb(2),c.Qc(e.cPassView?"visibility_off":"visibility"),c.Fb(2),c.qc("ngIf",(null==e.form.controls.confirm_password?null:e.form.controls.confirm_password.touched)&&(null==e.form.controls||null==e.form.controls.confirm_password.errors?null:e.form.controls.confirm_password.errors.required)),c.Fb(1),c.qc("ngIf",null==e.form.errors?null:e.form.errors.noMatch),c.Fb(2),c.qc("ngIf",!e.termCondition),c.Fb(4),c.qc("ngClass",e.form.invalid||!e.termCondition?"logInBtn":"logedInBtn")("disabled",e.form.invalid||!e.termCondition))},directives:[d.f,d.e,d.h,d.g,b.A,b.t,r.l,b.k,d.b,b.d,b.s,b.i,r.n,x.a,v.h,y.a,v.b],styles:[".formClass[_ngcontent-%COMP%]{width:85%;height:85%;font-style:normal;font-weight:400;font-size:16px;line-height:16px;color:#fff!important}.formClass[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill{-webkit-transition:background-color 5000s ease-in-out 0s!important;transition:background-color 5000s ease-in-out 0s!important;-webkit-text-fill-color:#fff!important}[inputStyle][_ngcontent-%COMP%]{background:transparent;border-radius:10px;width:85%;height:40%;padding:10px;border:1px solid #dcdcdc;outline:none;color:#fff}.logInBtn[_ngcontent-%COMP%]{width:100px;border-radius:20px;border:1px solid #fff}.logInBtn[_ngcontent-%COMP%]     .mat-button-wrapper{color:#fff}.logedInBtn[_ngcontent-%COMP%]{width:100px;border-radius:20px;border:1px solid #fff;color:#000}[passwordIcon][_ngcontent-%COMP%]{position:absolute;right:13%;top:20%;color:#777}.mat-error[_ngcontent-%COMP%]{color:rgba(210,70,11,.99)!important;font-size:14px!important}"]}),t})();function nt(t,e){if(1&t&&c.Sb(0,"app-login",16),2&t){const t=c.jc();c.qc("instanceStatus",t.instanceStatus)("term",t.termsCondition)}}function st(t,e){1&t&&c.Sb(0,"app-role",17)}function it(t,e){if(1&t){const t=c.Yb();c.Xb(0,"app-register",18),c.fc("tabChange",function(e){return c.Fc(t),c.jc().tabChange(e)}),c.Wb()}if(2&t){const t=c.jc();c.qc("licenseToken",t.token)("term",t.termsCondition)}}function at(t,e){if(1&t){const t=c.Yb();c.Xb(0,"div",19),c.Xb(1,"span"),c.Pc(2,"Don't have an account ?"),c.Wb(),c.Xb(3,"span",20),c.fc("click",function(){c.Fc(t);const e=c.jc();return e.tabIndex=!e.tabIndex}),c.Pc(4),c.Wb(),c.Wb()}if(2&t){const t=c.jc();c.Fb(4),c.Qc(t.tabIndex?"Sign Up":"Login")}}const lt=function(t){return{cursor:t}};function ct(t,e){if(1&t){const t=c.Yb();c.Xb(0,"div",21),c.Xb(1,"button",22),c.fc("click",function(){return c.Fc(t),c.jc().login("google")}),c.Sb(2,"img",23),c.Wb(),c.Xb(3,"button",22),c.fc("click",function(){return c.Fc(t),c.jc().login("outlook")}),c.Sb(4,"img",24),c.Wb(),c.Wb()}if(2&t){const t=c.jc();c.Fb(1),c.qc("ngStyle",c.uc(4,lt,t.instanceStatus&&t.termsCondition?"pointer":""))("disabled",!(t.instanceStatus&&t.termsCondition)),c.Fb(2),c.qc("ngStyle",c.uc(6,lt,t.instanceStatus&&t.termsCondition?"pointer":""))("disabled",!(t.instanceStatus&&t.termsCondition))}}let ut=(()=>{class t{constructor(t,e,o,r,n,s){this.router=t,this.route=e,this.sl=o,this.tps=r,this.ss=n,this.bhvSub=s,this.tabIndex=!0,this.instanceStatus=!1,this.termsCondition=!0,this.rolePopup=!1,this.token={type:"normal",value:""}}ngOnInit(){this.route.queryParams.subscribe(t=>{const e=window.location.href.split("#")[1];let o;e&&""!==e&&(o=e.split("&").reduce((t,e)=>{const o=e.split("=");return t[o[0]]=o[1],t},{}),localStorage.setItem("gapiAccessToken",o.access_token)),t&&t.licenseToken?(this.tabIndex=!1,this.token.type="license",this.token.value=t.licenseToken,Object.assign({},this.token),sessionStorage.setItem("licenseToken",JSON.stringify(this.token))):(null==o?void 0:o.id_token)&&this.tps.loginFunc({token:o.id_token},"auth/google")}),this.tps.rolePopup.subscribe(t=>this.rolePopup=t),this.sl.load("janus").then(t=>{this.sl.load("user").then(e=>{t[0].loaded&&e[0].loaded&&(fetchAvailableInstance?fetchAvailableInstance(null,null,t=>{(null==t?void 0:t.allotted)&&(this.instanceStatus=t.allotted,this.ss.generateSocket())}):console.error("FetchAvailable Instance not found"))})})}tabChange(t){t||(this.tabIndex=!t)}login(t){dynamoLink&&"function"!=typeof dynamoLink?(this.bhvSub.obDynamicLink(""+dynamoLink),"google"===t?this.tps.googleLogIn(t=>{}):"outlook"===t&&this.tps.outlookLogin()):console.error("Dynamic Link not available")}}return t.\u0275fac=function(e){return new(e||t)(c.Rb(n.b),c.Rb(n.a),c.Rb(i.a),c.Rb(a.a),c.Rb(l.a),c.Rb(u.a))},t.\u0275cmp=c.Lb({type:t,selectors:[["app-authentication"]],features:[c.Eb([i.a,a.a,l.a])],decls:22,vars:7,consts:[["fxLayout","row","fxFill","","fxLayoutAlign","center center","fullDivs",""],["FxLayout","column","fxFlex","65","FxLayoutAlign","center center","loginArea",""],["fxLayout","row","fxFlex","100","fxLayoutAlign","center stretch",2,"height","100% !important","overflow","hidden","padding","3px"],["fxFlex","60",3,"instanceStatus","term",4,"ngIf"],["fxFlex","60",4,"ngIf"],["fxFlex","60",3,"licenseToken","term","tabChange",4,"ngIf"],["fxFlex","1",2,"display","flex","align-items","center","margin","0"],["hrTag",""],["fxLayout","column","fxFlex","39","fxLayoutGap","40px","fxLayoutAlign","center center",2,"border-radius","0 10px 10px 0","background-size","contain"],["src","/assets/MonetLiveWhite.png","width","50%","padding","","alt","monet","pointer",""],["f-white","","fxLayoutGap","5px",4,"ngIf"],["f-white","","fxLayout","column","fxLayoutGap","20px",4,"ngIf"],["fxLayout","row","fxLayoutGap","10px"],["type","checkbox",3,"value","ngModel","ngModelChange"],["pointer","","routerLink","/privacy-policy",2,"color","#FFFFFF"],["bold",""],["fxFlex","60",3,"instanceStatus","term"],["fxFlex","60"],["fxFlex","60",3,"licenseToken","term","tabChange"],["f-white","","fxLayoutGap","5px"],[2,"font-size","16px","cursor","pointer","text-decoration","underline","font-style","italic",3,"click"],["f-white","","fxLayout","column","fxLayoutGap","20px"],["thirdPartyLogin","",3,"ngStyle","disabled","click"],["src","/assets/images/google_login.svg","alt","not Found",2,"width","210px"],["src","/assets/images/ms-signin_dark.svg","alt","not Found",2,"height","40px"]],template:function(t,e){1&t&&(c.Xb(0,"div",0),c.Xb(1,"div",1),c.Xb(2,"div",2),c.Nc(3,nt,1,2,"app-login",3),c.Nc(4,st,1,0,"app-role",4),c.Nc(5,it,1,2,"app-register",5),c.Xb(6,"div",6),c.Sb(7,"hr",7),c.Wb(),c.Xb(8,"div",8),c.Sb(9,"img",9),c.Nc(10,at,5,1,"div",10),c.Nc(11,ct,5,8,"div",11),c.Xb(12,"div",12),c.Xb(13,"span"),c.Xb(14,"input",13),c.fc("ngModelChange",function(t){return e.termsCondition=t}),c.Wb(),c.Wb(),c.Xb(15,"span",14),c.Pc(16,"I agree with "),c.Xb(17,"span",15),c.Pc(18,"Terms"),c.Wb(),c.Pc(19," and "),c.Xb(20,"span",15),c.Pc(21,"Conditions"),c.Wb(),c.Wb(),c.Wb(),c.Wb(),c.Wb(),c.Wb(),c.Wb()),2&t&&(c.Fb(3),c.qc("ngIf",e.tabIndex&&!e.rolePopup),c.Fb(1),c.qc("ngIf",e.rolePopup),c.Fb(1),c.qc("ngIf",!e.tabIndex),c.Fb(5),c.qc("ngIf",!e.rolePopup),c.Fb(1),c.qc("ngIf",!e.rolePopup),c.Fb(3),c.qc("value",e.termsCondition)("ngModel",e.termsCondition))},directives:[d.f,d.h,d.e,d.b,r.n,d.g,b.a,b.s,b.v,n.c,T,D,rt,r.o,h.c],styles:["[hrTag][_ngcontent-%COMP%]{height:70%;width:0;border:1px solid #fff;opacity:.4}[fullDivs][_ngcontent-%COMP%]{background:url(/assets/images/loginBg.png) no-repeat fixed 50%;background-size:cover}[loginArea][_ngcontent-%COMP%]{height:60%;background:linear-gradient(180deg,rgba(129,77,214,.67),rgba(46,30,72,0) 75.27%);border-radius:12px}[bold][_ngcontent-%COMP%]{font-weight:500;text-decoration:underline}[thirdPartyLogin][_ngcontent-%COMP%]{border:none;background:transparent}"]}),t})();var dt=o("qFsG"),bt=o("f0Cb");let ft=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Pb({type:t}),t.\u0275inj=c.Ob({imports:[[r.c,d.i,y.b,v.e,dt.c,bt.b,b.x,x.b]]}),t})();var mt=o("d3UM");let pt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Pb({type:t}),t.\u0275inj=c.Ob({imports:[[r.c,bt.b,v.e,b.x,dt.c,y.b,d.i,mt.b,s.a]]}),t})();const gt=[{path:"",component:ut}];let ht=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Pb({type:t}),t.\u0275inj=c.Ob({providers:[],imports:[[r.c,n.d.forChild(gt),s.a,ft,pt,y.b]]}),t})()},"yB+K":function(t,e,o){"use strict";o.d(e,"a",function(){return g});var r=o("mrSG"),n=o("tk/3"),s=o("2Vo4"),i=o("fXoL"),a=o("tyNb"),l=o("0Lug"),c=o("v0EB"),u=o("E8bv"),d=o("iiAa");const b="591973291813-2l1evk1ru95g6372u0r98i3oqmnrlng5.apps.googleusercontent.com",f="AIzaSyCWg8dY5ZZMaDZ4LDiDNQooF4Nc3CEqPuA",m=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],p="https://www.googleapis.com/auth/calendar";let g=(()=>{class t{constructor(t,e,o,r,n,i,a){this.router=t,this.sl=e,this.http=o,this.as=r,this.msalService=n,this.zone=i,this.utility=a,this.init=!1,this.loaderStat=new s.a(!1),this.rolePopup=new s.a(!1),gapi.load("client:auth2",this.googleInitClient())}isLoggedIn(){let t={status:!1,service:""};return t="true"===localStorage.getItem("GoogleLoginState")?{status:!0,service:"google"}:null!==this.msalService.instance.getActiveAccount()?{status:!0,service:"outlook"}:{status:!1,service:"monet"},t}tokenVerify(t){var e,o,r;this.utility.notify(t.message,"success"),t&&(null===(e=null==t?void 0:t.user)||void 0===e?void 0:e.plan)&&this.as.getApi("getPlan?planId="+(null===(o=t.user)||void 0===o?void 0:o.plan.id)).subscribe(t=>{localStorage.setItem("userPlanDetails",JSON.stringify(null==t?void 0:t.plan))}),this.sl.load("janus").then(t=>this.sl.load("user").then(e=>t[0].loaded&&e[0].loaded)),(null===(r=null==t?void 0:t.user)||void 0===r?void 0:r.token)&&this.as.storeLocalStorage("userDetails",t.user),this.roleCheck(t)}roleCheck(t){this.zone.run(()=>{var e;"NaN"!==t.user.userType?this.router.navigate(["moderator"===(null===(e=t.user)||void 0===e?void 0:e.userType)?"profile/dashboard/":"/manager"],{queryParams:{name:t.user.name,licenseToken:null},queryParamsHandling:"merge"}):this.rolePopup.next(!0)})}loginFunc(t,e){this.http.post("https://www.monetlive.com/many/api/"+e,t).subscribe(t=>{this.loaderStat.next(!1),t.error?this.utility.notify(t.message,"error"):this.tokenVerify(t)})}updateRole(t,e){this.as.putApi("updateRole",t).subscribe(t=>{t.error?this.utility.notify(t.message,"error"):this.tokenVerify(t)})}googleInitClient(){gapi.load("client:auth2",()=>{gapi.client.init({apiKey:f,clientId:b,discoveryDocs:m,scope:p})})}googleLogIn(t){gapi.load("client:auth2",()=>{gapi.client.init({apiKey:f,clientId:b,discoveryDocs:m,scope:p}).then(()=>{gapi.auth2.getAuthInstance().signIn().then(e=>{const o=JSON.parse(sessionStorage.getItem("licenseToken")||"{}").value;this.gData=e.Lu,o?this.http.post("https://www.monetlive.com/many/api/register-invited-user",{token:e.xc.id_token,licenseToken:o,context:"google"}).subscribe(t=>{t.error||this.zone.run(()=>{this.as.storeLocalStorage("userDetails",t.user),this.router.navigate(["profile/dashboard/"],{queryParams:{name:t.user.name},queryParamsHandling:"merge"})})}):this.loginFunc({token:e.Cc.id_token},"auth/google"),this.init=!0,localStorage.setItem("GoogleLoginState","true"),t(this.init)}).catch(t=>{})}).catch(t=>{window.location.replace(this.getAuthUri())})})}createGoogleCalenderEvent(t){return Object(r.b)(this,void 0,void 0,function*(){return yield gapi.client.calendar.events.insert({calendarId:"primary",sendNotifications:!0,sendUpdates:"all",conferenceDataVersion:1,resource:t}).then(t=>t.result.id,t=>{console.error(t)})})}getGoogleCalenderEvents(){var t,e,o;return Object(r.b)(this,void 0,void 0,function*(){const r=new Date;return yield null===(o=null===(e=null===(t=null===gapi||void 0===gapi?void 0:gapi.client)||void 0===t?void 0:t.calendar)||void 0===e?void 0:e.events)||void 0===o?void 0:o.list({calendarId:"primary",timeMin:new Date(r.getFullYear(),r.getMonth(),1).toISOString(),showDeleted:!1,singleEvents:!0,maxResults:1e3,orderBy:"startTime"}).then(t=>t.result.items,t=>{console.error(t)})})}deleteGoogleCalenderEvent(t,e){gapi.client.load("calendar","v3",()=>{gapi.client.calendar.events.delete({calendarId:"primary",eventId:t,sendNotifications:!0,sendUpdates:"all"}).execute(t=>{var o,r;t.error||!1===t?("deleted"===(null===(r=null===(o=null==t?void 0:t.error)||void 0===o?void 0:o.errors)||void 0===r?void 0:r.reason)&&console.warn("Event has already been deleted"),e(!1)):e(!0)})})}getAuthUri(){localStorage.setItem("GoogleLoginState","true");let t=window.location.href;const e=t.indexOf("authentication");return e>-1&&(t.substring(e),t=t.substring(0,e)),"https://accounts.google.com/o/oauth2/v2/auth?client_id="+encodeURIComponent(b)+"&redirect_uri="+encodeURIComponent(t)+"&response_type="+encodeURIComponent("token id_token")+"&scope="+encodeURIComponent("profile email openid https://www.googleapis.com/auth/calendar")+"&openid.realm&include_granted_scopes="+encodeURIComponent("true")+"&nonce="+this.utility.create_UUID()}getHeaders(){return this.headers=new n.d({Authorization:"Bearer "+localStorage.getItem("MSAL_TOKEN")}),this.headers}outlookLogin(){return this.msalService.loginPopup({scopes:["Calendars.Read Calendars.ReadWrite Directory.Read.All Directory.ReadWrite.All User.Read User.Read.All User.ReadWrite User.ReadWrite.All profile openid email"],prompt:"select_account"}).subscribe(t=>{console.log("Outlook Login Successful :",t);const e=JSON.parse(sessionStorage.getItem("licenseToken")||"{}").value;e?this.http.post("https://www.monetlive.com/many/api/register-invited-user",{token:t.wc.id_token,licenseToken:e,context:"microsoft"}).subscribe(t=>{t.error||this.zone.run(()=>{this.as.storeLocalStorage("userDetails",t.user),this.router.navigate(["profile/dashboard/"],{queryParams:{name:t.user.name},queryParamsHandling:"merge"})})}):this.loginFunc({token:t.accessToken},"auth/microsoft"),localStorage.setItem("MSAL_TOKEN",t.accessToken),this.msalService.instance.setActiveAccount(t.account)},t=>{console.error("Login Error :",t)}),!0}outlookGetEvents(){return this.http.get("https://graph.microsoft.com/v1.0/me/events?$select=subject,attendees,start,end",{headers:this.getHeaders()})}outlookCreateEvent(t,e,o,r,n,s){const i={subject:t,body:{contentType:"HTML",content:`<div fxLayout="row" fxLayoutAlign="start center">\n                    <div style="background: #d9f2db">\n                        <span style="font-weight: bold"><strong>You have been invited to the following event.</strong></span>\n                    </div>\n                    <h3>\n                        <span style="color: #222; font-weight: bold; font-size: 16px;">${t}</span>\n                    </h3>\n                    <div fxLayout="column" fxLayoutAlign="center start">\n                        <i style="font-style:normal; color: #888; margin-right: 30px;">When</i>\n                        <span style="font-size: 13px; color: #222">${o}</span>\n                    </div>\n                    <div fxLayout="column" fxLayoutAlign="center start">\n                        <i style="font-style:normal; color: #888; margin-right: 11px;">Calender</i>\n                        <span style="font-size: 13px; color: #222">${JSON.parse(localStorage.getItem("userDetails")||"").email}</span>\n                    </div>\n                    <div style="display: flex; flex-direction: row">\n                        <i style="font-style:normal; font-size: 13px; color: #888; padding-top: 13px;">Who</i>\n                        <div >\n                            <ul>\n                                ${n.map(t=>`<li>${Object.values(Object.values(t)[0])[0]} <span style="color: #888">${Object.values(Object.values(t)[0])[0]===JSON.parse(localStorage.getItem("userDetails")||"").email.toString()?" - Organizer":""}</span></li>`).join("")}\n                            </ul>\n                        </div>\n                    </div>\n                    <div fxLayout="row">\n                        ${s}\n                    </div>\n                  </div>`},start:{dateTime:o,timeZone:"Asia/Calcutta"},end:{dateTime:r,timeZone:"Asia/Calcutta"},attendees:n};return this.http.post("https://graph.microsoft.com/v1.0/me/calendar/events",i,{headers:this.getHeaders()})}outlookDeleteEvent(t){return this.http.delete("https://graph.microsoft.com/v1.0/me/calendar/events/"+t,{headers:this.getHeaders()})}}return t.\u0275fac=function(e){return new(e||t)(i.bc(a.b),i.bc(l.a),i.bc(n.b),i.bc(c.a),i.bc(u.c),i.bc(i.B),i.bc(d.a))},t.\u0275prov=i.Nb({token:t,factory:t.\u0275fac}),t})()}}]);