!function(){function e(t,i){return(e=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(t,i)}function t(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,r=n(e);if(t){var o=n(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return i(this,a)}}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"1jcm":function(i,n,a){"use strict";a.d(n,"a",function(){return C}),a.d(n,"b",function(){return R});var l=a("GU7r"),s=a("fXoL"),c=a("FKr1"),d=a("8LU1"),u=a("3Pt+"),b=a("R1ws"),g=a("u47x"),h=["thumbContainer"],p=["toggleBar"],f=["input"],m=function(){return{enterDuration:150}},v=["*"],y=new s.s("mat-slide-toggle-default-options",{providedIn:"root",factory:function(){return{disableToggleValue:!1}}}),k=0,x={provide:u.q,useExisting:Object(s.X)(function(){return C}),multi:!0},O=r(function e(t,i){o(this,e),this.source=t,this.checked=i}),_=r(function e(t){o(this,e),this._elementRef=t}),w=Object(c.C)(Object(c.x)(Object(c.y)(Object(c.z)(_)),"accent")),C=function(){var i=function(i){!function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),i&&e(t,i)}(a,i);var n=t(a);function a(e,t,i,r,l,c){var d;return o(this,a),(d=n.call(this,e))._focusMonitor=t,d._changeDetectorRef=i,d.defaults=l,d._animationMode=c,d._onChange=function(e){},d._onTouched=function(){},d._uniqueId="mat-slide-toggle-"+ ++k,d._required=!1,d._checked=!1,d.name=null,d.id=d._uniqueId,d.labelPosition="after",d.ariaLabel=null,d.ariaLabelledby=null,d.change=new s.o,d.toggleChange=new s.o,d.tabIndex=parseInt(r)||0,d}return r(a,[{key:"required",get:function(){return this._required},set:function(e){this._required=Object(d.c)(e)}},{key:"checked",get:function(){return this._checked},set:function(e){this._checked=Object(d.c)(e),this._changeDetectorRef.markForCheck()}},{key:"inputId",get:function(){return(this.id||this._uniqueId)+"-input"}},{key:"ngAfterContentInit",value:function(){var e=this;this._focusMonitor.monitor(this._elementRef,!0).subscribe(function(t){"keyboard"===t||"program"===t?e._inputElement.nativeElement.focus():t||Promise.resolve().then(function(){return e._onTouched()})})}},{key:"ngOnDestroy",value:function(){this._focusMonitor.stopMonitoring(this._elementRef)}},{key:"_onChangeEvent",value:function(e){e.stopPropagation(),this.toggleChange.emit(),this.defaults.disableToggleValue?this._inputElement.nativeElement.checked=this.checked:(this.checked=this._inputElement.nativeElement.checked,this._emitChangeEvent())}},{key:"_onInputClick",value:function(e){e.stopPropagation()}},{key:"writeValue",value:function(e){this.checked=!!e}},{key:"registerOnChange",value:function(e){this._onChange=e}},{key:"registerOnTouched",value:function(e){this._onTouched=e}},{key:"setDisabledState",value:function(e){this.disabled=e,this._changeDetectorRef.markForCheck()}},{key:"focus",value:function(e,t){t?this._focusMonitor.focusVia(this._inputElement,t,e):this._inputElement.nativeElement.focus(e)}},{key:"toggle",value:function(){this.checked=!this.checked,this._onChange(this.checked)}},{key:"_emitChangeEvent",value:function(){this._onChange(this.checked),this.change.emit(new O(this,this.checked))}},{key:"_onLabelTextChange",value:function(){this._changeDetectorRef.detectChanges()}}]),a}(w);return i.\u0275fac=function(e){return new(e||i)(s.Rb(s.l),s.Rb(g.h),s.Rb(s.h),s.cc("tabindex"),s.Rb(y),s.Rb(b.a,8))},i.\u0275cmp=s.Lb({type:i,selectors:[["mat-slide-toggle"]],viewQuery:function(e,t){var i;(1&e&&(s.Uc(h,1),s.Uc(p,1),s.Uc(f,1)),2&e)&&(s.Cc(i=s.gc())&&(t._thumbEl=i.first),s.Cc(i=s.gc())&&(t._thumbBarEl=i.first),s.Cc(i=s.gc())&&(t._inputElement=i.first))},hostAttrs:[1,"mat-slide-toggle"],hostVars:12,hostBindings:function(e,t){2&e&&(s.ac("id",t.id),s.Gb("tabindex",t.disabled?null:-1)("aria-label",null)("aria-labelledby",null),s.Jb("mat-checked",t.checked)("mat-disabled",t.disabled)("mat-slide-toggle-label-before","before"==t.labelPosition)("_mat-animation-noopable","NoopAnimations"===t._animationMode))},inputs:{disabled:"disabled",disableRipple:"disableRipple",color:"color",tabIndex:"tabIndex",name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],required:"required",checked:"checked"},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[s.Eb([x]),s.Cb],ngContentSelectors:v,decls:16,vars:18,consts:[[1,"mat-slide-toggle-label"],["label",""],[1,"mat-slide-toggle-bar"],["toggleBar",""],["type","checkbox","role","switch",1,"mat-slide-toggle-input","cdk-visually-hidden",3,"id","required","tabIndex","checked","disabled","change","click"],["input",""],[1,"mat-slide-toggle-thumb-container"],["thumbContainer",""],[1,"mat-slide-toggle-thumb"],["mat-ripple","",1,"mat-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered","matRippleRadius","matRippleAnimation"],[1,"mat-ripple-element","mat-slide-toggle-persistent-ripple"],[1,"mat-slide-toggle-content",3,"cdkObserveContent"],["labelContent",""],[2,"display","none"]],template:function(e,t){if(1&e&&(s.pc(),s.Xb(0,"label",0,1),s.Xb(2,"div",2,3),s.Xb(4,"input",4,5),s.fc("change",function(e){return t._onChangeEvent(e)})("click",function(e){return t._onInputClick(e)}),s.Wb(),s.Xb(6,"div",6,7),s.Sb(8,"div",8),s.Xb(9,"div",9),s.Sb(10,"div",10),s.Wb(),s.Wb(),s.Wb(),s.Xb(11,"span",11,12),s.fc("cdkObserveContent",function(){return t._onLabelTextChange()}),s.Xb(13,"span",13),s.Pc(14,"\xa0"),s.Wb(),s.oc(15),s.Wb(),s.Wb()),2&e){var i=s.Dc(1),n=s.Dc(12);s.Gb("for",t.inputId),s.Fb(2),s.Jb("mat-slide-toggle-bar-no-side-margin",!n.textContent||!n.textContent.trim()),s.Fb(2),s.qc("id",t.inputId)("required",t.required)("tabIndex",t.tabIndex)("checked",t.checked)("disabled",t.disabled),s.Gb("name",t.name)("aria-checked",t.checked.toString())("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledby),s.Fb(5),s.qc("matRippleTrigger",i)("matRippleDisabled",t.disableRipple||t.disabled)("matRippleCentered",!0)("matRippleRadius",20)("matRippleAnimation",s.tc(17,m))}},directives:[c.s,l.a],styles:[".mat-slide-toggle{display:inline-block;height:24px;max-width:100%;line-height:24px;white-space:nowrap;outline:none;-webkit-tap-highlight-color:transparent}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(16px, 0, 0)}[dir=rtl] .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(-16px, 0, 0)}.mat-slide-toggle.mat-disabled{opacity:.38}.mat-slide-toggle.mat-disabled .mat-slide-toggle-label,.mat-slide-toggle.mat-disabled .mat-slide-toggle-thumb-container{cursor:default}.mat-slide-toggle-label{display:flex;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.mat-slide-toggle-content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-bar{order:2}[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-bar,.mat-slide-toggle-bar{margin-right:8px;margin-left:0}[dir=rtl] .mat-slide-toggle-bar,.mat-slide-toggle-label-before .mat-slide-toggle-bar{margin-left:8px;margin-right:0}.mat-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0, 0, 0);transition:all 80ms linear;transition-property:transform}._mat-animation-noopable .mat-slide-toggle-thumb-container{transition:none}[dir=rtl] .mat-slide-toggle-thumb-container{left:auto;right:0}.mat-slide-toggle-thumb{height:20px;width:20px;border-radius:50%}.mat-slide-toggle-bar{position:relative;width:36px;height:14px;flex-shrink:0;border-radius:8px}.mat-slide-toggle-input{bottom:0;left:10px}[dir=rtl] .mat-slide-toggle-input{left:auto;right:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}._mat-animation-noopable .mat-slide-toggle-bar,._mat-animation-noopable .mat-slide-toggle-thumb{transition:none}.mat-slide-toggle .mat-slide-toggle-ripple{position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-slide-toggle .mat-slide-toggle-ripple .mat-ripple-element:not(.mat-slide-toggle-persistent-ripple){opacity:.12}.mat-slide-toggle-persistent-ripple{width:100%;height:100%;transform:none}.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:.04}.mat-slide-toggle:not(.mat-disabled).cdk-keyboard-focused .mat-slide-toggle-persistent-ripple{opacity:.12}.mat-slide-toggle-persistent-ripple,.mat-slide-toggle.mat-disabled .mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:0}@media(hover: none){.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{display:none}}.cdk-high-contrast-active .mat-slide-toggle-thumb,.cdk-high-contrast-active .mat-slide-toggle-bar{border:1px solid}.cdk-high-contrast-active .mat-slide-toggle.cdk-keyboard-focused .mat-slide-toggle-bar{outline:2px dotted;outline-offset:5px}\n"],encapsulation:2,changeDetection:0}),i}(),j=function(){var e=r(function e(){o(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.Pb({type:e}),e.\u0275inj=s.Ob({}),e}(),R=function(){var e=r(function e(){o(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.Pb({type:e}),e.\u0275inj=s.Ob({imports:[[j,c.t,c.j,l.c],j,c.j]}),e}()},BcMA:function(e,t,i){"use strict";i.d(t,"a",function(){return s});var n=i("ofXK"),a=i("FpXt"),l=i("fXoL"),s=function(){var e=r(function e(){o(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Pb({type:e}),e.\u0275inj=l.Ob({imports:[[n.c,a.a]]}),e}()},Vs90:function(e,t,i){"use strict";i.d(t,"a",function(){return g});var n=i("cclQ"),a=i("WlQZ"),l=i("c03H"),s=i("xJfa"),c=i("fXoL"),d=i("v0EB"),u=i("LUsR"),b=i("XiUz"),g=function(){var e=function(){function e(t,i,n){o(this,e),this.zone=t,this.as=i,this.bhvSub=n,this.engOrMood=0,this.yAxisLabels=[{value:40,text:"Low"},{value:80,text:"Medium"},{value:100,text:"High"}]}return r(e,[{key:"createChart",value:function(){n.k(a.a),n.k(l.a),this.chart=n.e("overalllineChart",s.i),this.chart.data=this.overallData;var e=this.chart.xAxes.push(new s.a);e.dataFields.category="segment",e.renderer.grid.template.disabled=!0,e.cursorTooltipEnabled=!1;var t=this.chart.yAxes.push(new s.h);t.renderer.labels.template.disabled=!0,t.cursorTooltipEnabled=!1,t.renderer.line.strokeOpacity=0,t.min=0,t.max=110,t.renderer.grid.template.disabled=!0;var i=this.chart.yAxes.push(new s.a);i.dataFields.category=this.engOrMood?"moodCategory":"category",i.cursorTooltipEnabled=!1,i.renderer.labels.template.disabled=!0,i.renderer.grid.template.disabled=!0;var r=this.chart.series.push(new s.e);r.tooltipText=this.engOrMood?'Mood : {average_mood.formatNumber(".##")}':'Engagement : {average_engagement.formatNumber(".##")}',r.fillOpacity=1;var o=new n.c;o.opacities=[.7,0],o.offsets=[0,1],o.gradient.rotation=90,r.segments.template.fillModifier=o;var c,d,u,b=r.dataFields,g=r.tooltip;b.valueY=this.engOrMood?"average_mood":"average_engagement",r.hidden=!1,b.categoryX="segment",r.strokeWidth=2,r.minBulletDistance=15;for(var h=0;h<3;h++)this.yAxisLabels&&(c=this.yAxisLabels[h].value,d=this.yAxisLabels[h].text,u=void 0,(u=t.axisRanges.create()).value=c,u.label.text=d);g.background.cornerRadius=20,g.background.strokeOpacity=0,g.pointerOrientation="vertical",g.label.minWidth=20,g.label.minHeight=20,g.label.textAlign="middle",g.label.textValign="middle";var p=r.bullets.push(new s.b);p.circle.strokeWidth=2,p.circle.radius=4,p.circle.fill=n.d("#fff"),p.states.create("hover").properties.scale=1.3,this.chart.cursor=new s.j}},{key:"ngOnInit",value:function(){var e=this;this.bhvSub.engOrMood$.subscribe(function(t){e.engOrMood=t,e.chart?(e.chart.dispose(),setTimeout(function(){e.createChart()},1e3)):e.createChart()})}},{key:"ngAfterViewInit",value:function(){var e=this;this.chart?(this.chart.dispose(),setTimeout(function(){e.createChart()},1e3)):this.createChart()}},{key:"ngOnChanges",value:function(e){var t=this;(null==e?void 0:e.overallData)&&(this.chart?(this.chart.dispose(),setTimeout(function(){t.createChart()},1e3)):this.createChart())}},{key:"ngOnDestroy",value:function(){var e=this;try{this.zone.runOutsideAngular(function(){e.chart&&(e.chart.dispose(),delete e.chart)})}catch(t){console.log(t)}}}]),e}();return e.\u0275fac=function(t){return new(t||e)(c.Rb(c.B),c.Rb(d.a),c.Rb(u.a))},e.\u0275cmp=c.Lb({type:e,selectors:[["app-overall-line-chart"]],inputs:{stdId:"stdId",overallData:"overallData"},features:[c.Db],decls:1,vars:0,consts:[["fxFill","","id","overalllineChart"]],template:function(e,t){1&e&&c.Sb(0,"div",0)},directives:[b.h],styles:["#overalllineChart[_ngcontent-%COMP%]{min-height:35vh!important}"]}),e}()},c03H:function(e,t,i){"use strict";i.d(t,"a",function(){return r});var n=i("hM+/"),a=i("A9VE"),r=function(e){Object(n.a)(e,"InterfaceColorSet")&&(e.setFor("stroke",Object(a.b)("#000000")),e.setFor("fill",Object(a.b)("#2b2b2b")),e.setFor("primaryButton",Object(a.b)("#6794dc").lighten(-.2)),e.setFor("primaryButtonHover",Object(a.b)("#6771dc").lighten(-.2)),e.setFor("primaryButtonDown",Object(a.b)("#68dc75").lighten(-.2)),e.setFor("primaryButtonActive",Object(a.b)("#68dc75").lighten(-.2)),e.setFor("primaryButtonText",Object(a.b)("#FFFFFF")),e.setFor("primaryButtonStroke",Object(a.b)("#6794dc")),e.setFor("secondaryButton",Object(a.b)("#3b3b3b")),e.setFor("secondaryButtonHover",Object(a.b)("#3b3b3b").lighten(.1)),e.setFor("secondaryButtonDown",Object(a.b)("#3b3b3b").lighten(.15)),e.setFor("secondaryButtonActive",Object(a.b)("#3b3b3b").lighten(.15)),e.setFor("secondaryButtonText",Object(a.b)("#bbbbbb")),e.setFor("secondaryButtonStroke",Object(a.b)("#3b3b3b").lighten(-.2)),e.setFor("grid",Object(a.b)("#bbbbbb")),e.setFor("background",Object(a.b)("#000000")),e.setFor("alternativeBackground",Object(a.b)("#ffffff")),e.setFor("text",Object(a.b)("#ffffff")),e.setFor("alternativeText",Object(a.b)("#000000")),e.setFor("disabledBackground",Object(a.b)("#bbbbbb"))),Object(n.a)(e,"Scrollbar")&&(e.background.fillOpacity=.4,e.thumb.background.fillOpacity=.5)}},"zq/I":function(e,t,i){"use strict";i.d(t,"a",function(){return u});var n=i("f0Cb"),a=i("Wp6s"),l=i("bTqV"),s=i("ofXK"),c=i("FpXt"),d=i("fXoL"),u=function(){var e=r(function e(){o(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.Pb({type:e}),e.\u0275inj=d.Ob({imports:[[c.a,n.b,a.b,l.b,s.c]]}),e}()}}])}();