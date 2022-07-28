!function(){function e(t,n,i){return(e="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var i=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=a(e)););return e}(e,t);if(i){var o=Object.getOwnPropertyDescriptor(i,t);return o.get?o.get.call(n):o.value}})(t,n,i||t)}function t(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,i=a(e);if(t){var r=a(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return o(this,n)}}function o(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function d(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"7EHt":function(n,o,s){"use strict";s.d(o,"a",function(){return ae}),s.d(o,"b",function(){return se}),s.d(o,"c",function(){return te}),s.d(o,"d",function(){return Y}),s.d(o,"e",function(){return ie}),s.d(o,"f",function(){return ne}),s.d(o,"g",function(){return oe});var c,l,p,u=s("fXoL"),h=s("8LU1"),f=s("XNiG"),b=s("quSY"),g=s("0EQZ"),m=0,x=new u.s("CdkAccordion"),_=((p=function(){function e(){r(this,e),this._stateChanges=new f.a,this._openCloseAllActions=new f.a,this.id="cdk-accordion-"+m++,this._multi=!1}return d(e,[{key:"multi",get:function(){return this._multi},set:function(e){this._multi=Object(h.c)(e)}},{key:"openAll",value:function(){this._multi&&this._openCloseAllActions.next(!0)}},{key:"closeAll",value:function(){this._openCloseAllActions.next(!1)}},{key:"ngOnChanges",value:function(e){this._stateChanges.next(e)}},{key:"ngOnDestroy",value:function(){this._stateChanges.complete(),this._openCloseAllActions.complete()}}]),e}()).\u0275fac=function(e){return new(e||p)},p.\u0275dir=u.Mb({type:p,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:"multi"},exportAs:["cdkAccordion"],features:[u.Eb([{provide:x,useExisting:p}]),u.Db]}),p),y=0,v=((l=function(){function e(t,n,i){var o=this;r(this,e),this.accordion=t,this._changeDetectorRef=n,this._expansionDispatcher=i,this._openCloseAllSubscription=b.a.EMPTY,this.closed=new u.o,this.opened=new u.o,this.destroyed=new u.o,this.expandedChange=new u.o,this.id="cdk-accordion-child-"+y++,this._expanded=!1,this._disabled=!1,this._removeUniqueSelectionListener=function(){},this._removeUniqueSelectionListener=i.listen(function(e,t){o.accordion&&!o.accordion.multi&&o.accordion.id===t&&o.id!==e&&(o.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}return d(e,[{key:"expanded",get:function(){return this._expanded},set:function(e){e=Object(h.c)(e),this._expanded!==e&&(this._expanded=e,this.expandedChange.emit(e),e?(this.opened.emit(),this._expansionDispatcher.notify(this.id,this.accordion?this.accordion.id:this.id)):this.closed.emit(),this._changeDetectorRef.markForCheck())}},{key:"disabled",get:function(){return this._disabled},set:function(e){this._disabled=Object(h.c)(e)}},{key:"ngOnDestroy",value:function(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}},{key:"toggle",value:function(){this.disabled||(this.expanded=!this.expanded)}},{key:"close",value:function(){this.disabled||(this.expanded=!1)}},{key:"open",value:function(){this.disabled||(this.expanded=!0)}},{key:"_subscribeToOpenCloseAllActions",value:function(){var e=this;return this.accordion._openCloseAllActions.subscribe(function(t){e.disabled||(e.expanded=t)})}}]),e}()).\u0275fac=function(e){return new(e||l)(u.Rb(x,12),u.Rb(u.h),u.Rb(g.d))},l.\u0275dir=u.Mb({type:l,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:"expanded",disabled:"disabled"},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[u.Eb([{provide:x,useValue:void 0}])]}),l),k=((c=d(function e(){r(this,e)})).\u0275fac=function(e){return new(e||c)},c.\u0275mod=u.Pb({type:c}),c.\u0275inj=u.Ob({}),c),w=s("+rOU"),O=s("ofXK"),C=s("FKr1"),A=s("u47x"),E=s("/uUt"),j=s("JX91"),R=s("pLZG"),D=s("IzEk"),P=s("FtGj"),T=s("R1ws"),S=s("EY2u"),H=s("VRyK"),M=s("R0Ic"),z=["body"];function B(e,t){}var I=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],L=["mat-expansion-panel-header","*","mat-action-row"];function F(e,t){if(1&e&&u.Sb(0,"span",2),2&e){var n=u.jc();u.qc("@indicatorRotate",n._getExpandedState())}}var N,V,q,K,U,X,J,G=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],Z=["mat-panel-title","mat-panel-description","*"],Q=new u.s("MAT_ACCORDION"),W={indicatorRotate:Object(M.m)("indicatorRotate",[Object(M.j)("collapsed, void",Object(M.k)({transform:"rotate(0deg)"})),Object(M.j)("expanded",Object(M.k)({transform:"rotate(180deg)"})),Object(M.l)("expanded <=> collapsed, void => collapsed",Object(M.e)("225ms cubic-bezier(0.4,0.0,0.2,1)"))]),bodyExpansion:Object(M.m)("bodyExpansion",[Object(M.j)("collapsed, void",Object(M.k)({height:"0px",visibility:"hidden"})),Object(M.j)("expanded",Object(M.k)({height:"*",visibility:"visible"})),Object(M.l)("expanded <=> collapsed, void => collapsed",Object(M.e)("225ms cubic-bezier(0.4,0.0,0.2,1)"))])},Y=((N=d(function e(t){r(this,e),this._template=t})).\u0275fac=function(e){return new(e||N)(u.Rb(u.N))},N.\u0275dir=u.Mb({type:N,selectors:[["ng-template","matExpansionPanelContent",""]]}),N),$=0,ee=new u.s("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),te=((X=function(n){t(s,n);var o=i(s);function s(e,t,n,i,a,d,c){var l;return r(this,s),(l=o.call(this,e,t,n))._viewContainerRef=i,l._animationMode=d,l._hideToggle=!1,l.afterExpand=new u.o,l.afterCollapse=new u.o,l._inputChanges=new f.a,l._headerId="mat-expansion-panel-header-"+$++,l._bodyAnimationDone=new f.a,l.accordion=e,l._document=a,l._bodyAnimationDone.pipe(Object(E.a)(function(e,t){return e.fromState===t.fromState&&e.toState===t.toState})).subscribe(function(e){"void"!==e.fromState&&("expanded"===e.toState?l.afterExpand.emit():"collapsed"===e.toState&&l.afterCollapse.emit())}),c&&(l.hideToggle=c.hideToggle),l}return d(s,[{key:"hideToggle",get:function(){return this._hideToggle||this.accordion&&this.accordion.hideToggle},set:function(e){this._hideToggle=Object(h.c)(e)}},{key:"togglePosition",get:function(){return this._togglePosition||this.accordion&&this.accordion.togglePosition},set:function(e){this._togglePosition=e}},{key:"_hasSpacing",value:function(){return!!this.accordion&&this.expanded&&"default"===this.accordion.displayMode}},{key:"_getExpandedState",value:function(){return this.expanded?"expanded":"collapsed"}},{key:"toggle",value:function(){this.expanded=!this.expanded}},{key:"close",value:function(){this.expanded=!1}},{key:"open",value:function(){this.expanded=!0}},{key:"ngAfterContentInit",value:function(){var e=this;this._lazyContent&&this.opened.pipe(Object(j.a)(null),Object(R.a)(function(){return e.expanded&&!e._portal}),Object(D.a)(1)).subscribe(function(){e._portal=new w.g(e._lazyContent._template,e._viewContainerRef)})}},{key:"ngOnChanges",value:function(e){this._inputChanges.next(e)}},{key:"ngOnDestroy",value:function(){e(a(s.prototype),"ngOnDestroy",this).call(this),this._bodyAnimationDone.complete(),this._inputChanges.complete()}},{key:"_containsFocus",value:function(){if(this._body){var e=this._document.activeElement,t=this._body.nativeElement;return e===t||t.contains(e)}return!1}}]),s}(v)).\u0275fac=function(e){return new(e||X)(u.Rb(Q,12),u.Rb(u.h),u.Rb(g.d),u.Rb(u.S),u.Rb(O.d),u.Rb(T.a,8),u.Rb(ee,8))},X.\u0275cmp=u.Lb({type:X,selectors:[["mat-expansion-panel"]],contentQueries:function(e,t,n){var i;1&e&&u.Kb(n,Y,1),2&e&&u.Cc(i=u.gc())&&(t._lazyContent=i.first)},viewQuery:function(e,t){var n;1&e&&u.Uc(z,1),2&e&&u.Cc(n=u.gc())&&(t._body=n.first)},hostAttrs:[1,"mat-expansion-panel"],hostVars:6,hostBindings:function(e,t){2&e&&u.Jb("mat-expanded",t.expanded)("_mat-animation-noopable","NoopAnimations"===t._animationMode)("mat-expansion-panel-spacing",t._hasSpacing())},inputs:{disabled:"disabled",expanded:"expanded",hideToggle:"hideToggle",togglePosition:"togglePosition"},outputs:{opened:"opened",closed:"closed",expandedChange:"expandedChange",afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[u.Eb([{provide:Q,useValue:void 0}]),u.Cb,u.Db],ngContentSelectors:L,decls:7,vars:4,consts:[["role","region",1,"mat-expansion-panel-content",3,"id"],["body",""],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(e,t){1&e&&(u.pc(I),u.oc(0),u.Xb(1,"div",0,1),u.fc("@bodyExpansion.done",function(e){return t._bodyAnimationDone.next(e)}),u.Xb(3,"div",2),u.oc(4,1),u.Nc(5,B,0,0,"ng-template",3),u.Wb(),u.oc(6,2),u.Wb()),2&e&&(u.Fb(1),u.qc("@bodyExpansion",t._getExpandedState())("id",t.id),u.Gb("aria-labelledby",t._headerId),u.Fb(4),u.qc("cdkPortalOutlet",t._portal))},directives:[w.c],styles:[".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button-base,.mat-action-row button.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button-base,[dir=rtl] .mat-action-row button.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],encapsulation:2,data:{animation:[W.bodyExpansion]},changeDetection:0}),X),ne=((U=function(){function e(t,n,i,o,a,s){var d=this;r(this,e),this.panel=t,this._element=n,this._focusMonitor=i,this._changeDetectorRef=o,this._animationMode=s,this._parentChangeSubscription=b.a.EMPTY;var c=t.accordion?t.accordion._stateChanges.pipe(Object(R.a)(function(e){return!(!e.hideToggle&&!e.togglePosition)})):S.a;this._parentChangeSubscription=Object(H.a)(t.opened,t.closed,c,t._inputChanges.pipe(Object(R.a)(function(e){return!!(e.hideToggle||e.disabled||e.togglePosition)}))).subscribe(function(){return d._changeDetectorRef.markForCheck()}),t.closed.pipe(Object(R.a)(function(){return t._containsFocus()})).subscribe(function(){return i.focusVia(n,"program")}),a&&(this.expandedHeight=a.expandedHeight,this.collapsedHeight=a.collapsedHeight)}return d(e,[{key:"disabled",get:function(){return this.panel.disabled}},{key:"_toggle",value:function(){this.disabled||this.panel.toggle()}},{key:"_isExpanded",value:function(){return this.panel.expanded}},{key:"_getExpandedState",value:function(){return this.panel._getExpandedState()}},{key:"_getPanelId",value:function(){return this.panel.id}},{key:"_getTogglePosition",value:function(){return this.panel.togglePosition}},{key:"_showToggle",value:function(){return!this.panel.hideToggle&&!this.panel.disabled}},{key:"_getHeaderHeight",value:function(){var e=this._isExpanded();return e&&this.expandedHeight?this.expandedHeight:!e&&this.collapsedHeight?this.collapsedHeight:null}},{key:"_keydown",value:function(e){switch(e.keyCode){case P.o:case P.g:Object(P.t)(e)||(e.preventDefault(),this._toggle());break;default:return void(this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(e))}}},{key:"focus",value:function(e,t){e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}},{key:"ngAfterViewInit",value:function(){var e=this;this._focusMonitor.monitor(this._element).subscribe(function(t){t&&e.panel.accordion&&e.panel.accordion._handleHeaderFocus(e)})}},{key:"ngOnDestroy",value:function(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}}]),e}()).\u0275fac=function(e){return new(e||U)(u.Rb(te,1),u.Rb(u.l),u.Rb(A.h),u.Rb(u.h),u.Rb(ee,8),u.Rb(T.a,8))},U.\u0275cmp=u.Lb({type:U,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:15,hostBindings:function(e,t){1&e&&u.fc("click",function(){return t._toggle()})("keydown",function(e){return t._keydown(e)}),2&e&&(u.Gb("id",t.panel._headerId)("tabindex",t.disabled?-1:0)("aria-controls",t._getPanelId())("aria-expanded",t._isExpanded())("aria-disabled",t.panel.disabled),u.Kc("height",t._getHeaderHeight()),u.Jb("mat-expanded",t._isExpanded())("mat-expansion-toggle-indicator-after","after"===t._getTogglePosition())("mat-expansion-toggle-indicator-before","before"===t._getTogglePosition())("_mat-animation-noopable","NoopAnimations"===t._animationMode))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight"},ngContentSelectors:Z,decls:5,vars:1,consts:[[1,"mat-content"],["class","mat-expansion-indicator",4,"ngIf"],[1,"mat-expansion-indicator"]],template:function(e,t){1&e&&(u.pc(G),u.Xb(0,"span",0),u.oc(1),u.oc(2,1),u.oc(3,2),u.Wb(),u.Nc(4,F,1,1,"span",1)),2&e&&(u.Fb(4),u.qc("ngIf",t._showToggle()))},directives:[O.n],styles:['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true])::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;border:3px solid;border-radius:4px;content:""}\n'],encapsulation:2,data:{animation:[W.indicatorRotate]},changeDetection:0}),U),ie=((K=d(function e(){r(this,e)})).\u0275fac=function(e){return new(e||K)},K.\u0275dir=u.Mb({type:K,selectors:[["mat-panel-description"]],hostAttrs:[1,"mat-expansion-panel-header-description"]}),K),oe=((q=d(function e(){r(this,e)})).\u0275fac=function(e){return new(e||q)},q.\u0275dir=u.Mb({type:q,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]}),q),ae=((V=function(n){t(s,n);var o=i(s);function s(){var e;return r(this,s),(e=o.apply(this,arguments))._ownHeaders=new u.F,e._hideToggle=!1,e.displayMode="default",e.togglePosition="after",e}return d(s,[{key:"hideToggle",get:function(){return this._hideToggle},set:function(e){this._hideToggle=Object(h.c)(e)}},{key:"ngAfterContentInit",value:function(){var e=this;this._headers.changes.pipe(Object(j.a)(this._headers)).subscribe(function(t){e._ownHeaders.reset(t.filter(function(t){return t.panel.accordion===e})),e._ownHeaders.notifyOnChanges()}),this._keyManager=new A.g(this._ownHeaders).withWrap().withHomeAndEnd()}},{key:"_handleHeaderKeydown",value:function(e){this._keyManager.onKeydown(e)}},{key:"_handleHeaderFocus",value:function(e){this._keyManager.updateActiveItem(e)}},{key:"ngOnDestroy",value:function(){e(a(s.prototype),"ngOnDestroy",this).call(this),this._ownHeaders.destroy()}}]),s}(_)).\u0275fac=function(e){return re(e||V)},V.\u0275dir=u.Mb({type:V,selectors:[["mat-accordion"]],contentQueries:function(e,t,n){var i;1&e&&u.Kb(n,ne,1),2&e&&u.Cc(i=u.gc())&&(t._headers=i)},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(e,t){2&e&&u.Jb("mat-accordion-multi",t.multi)},inputs:{multi:"multi",displayMode:"displayMode",togglePosition:"togglePosition",hideToggle:"hideToggle"},exportAs:["matAccordion"],features:[u.Eb([{provide:Q,useExisting:V}]),u.Cb]}),V),re=u.Zb(ae),se=((J=d(function e(){r(this,e)})).\u0275fac=function(e){return new(e||J)},J.\u0275mod=u.Pb({type:J}),J.\u0275inj=u.Ob({imports:[[O.c,C.j,k,w.f]]}),J)},TU8p:function(e,n,o){"use strict";o.d(n,"a",function(){return b}),o.d(n,"b",function(){return g});var a=o("FKr1"),s=o("u47x"),c=o("8LU1"),l=o("R1ws"),p=o("fXoL"),u=0,h=d(function e(){r(this,e)}),f=Object(a.z)(h),b=function(){var e=function(e){t(o,e);var n=i(o);function o(e,t,i,a,s){var d;return r(this,o),(d=n.call(this))._ngZone=e,d._elementRef=t,d._ariaDescriber=i,d._renderer=a,d._animationMode=s,d._hasContent=!1,d._color="primary",d._overlap=!0,d.position="above after",d.size="medium",d._id=u++,d}return d(o,[{key:"color",get:function(){return this._color},set:function(e){this._setColor(e),this._color=e}},{key:"overlap",get:function(){return this._overlap},set:function(e){this._overlap=Object(c.c)(e)}},{key:"description",get:function(){return this._description},set:function(e){if(e!==this._description){var t=this._badgeElement;this._updateHostAriaDescription(e,this._description),this._description=e,t&&(e?t.setAttribute("aria-label",e):t.removeAttribute("aria-label"))}}},{key:"hidden",get:function(){return this._hidden},set:function(e){this._hidden=Object(c.c)(e)}},{key:"isAbove",value:function(){return-1===this.position.indexOf("below")}},{key:"isAfter",value:function(){return-1===this.position.indexOf("before")}},{key:"ngOnChanges",value:function(e){var t=e.content;if(t){var n=t.currentValue;this._hasContent=null!=n&&(""+n).trim().length>0,this._updateTextContent()}}},{key:"ngOnDestroy",value:function(){var e=this._badgeElement;e&&(this.description&&this._ariaDescriber.removeDescription(e,this.description),this._renderer.destroyNode&&this._renderer.destroyNode(e))}},{key:"getBadgeElement",value:function(){return this._badgeElement}},{key:"_updateTextContent",value:function(){return this._badgeElement?this._badgeElement.textContent=this._stringifyContent():this._badgeElement=this._createBadgeElement(),this._badgeElement}},{key:"_createBadgeElement",value:function(){var e=this._renderer.createElement("span");return this._clearExistingBadges("mat-badge-content"),e.setAttribute("id","mat-badge-content-"+this._id),e.classList.add("mat-badge-content"),e.textContent=this._stringifyContent(),"NoopAnimations"===this._animationMode&&e.classList.add("_mat-animation-noopable"),this.description&&e.setAttribute("aria-label",this.description),this._elementRef.nativeElement.appendChild(e),"function"==typeof requestAnimationFrame&&"NoopAnimations"!==this._animationMode?this._ngZone.runOutsideAngular(function(){requestAnimationFrame(function(){e.classList.add("mat-badge-active")})}):e.classList.add("mat-badge-active"),e}},{key:"_updateHostAriaDescription",value:function(e,t){var n=this._updateTextContent();t&&this._ariaDescriber.removeDescription(n,t),e&&this._ariaDescriber.describe(n,e)}},{key:"_setColor",value:function(e){if(e!==this._color){var t=this._elementRef.nativeElement.classList;this._color&&t.remove("mat-badge-"+this._color),e&&t.add("mat-badge-"+e)}}},{key:"_clearExistingBadges",value:function(e){for(var t=this._elementRef.nativeElement,n=t.children.length;n--;){var i=t.children[n];i.classList.contains(e)&&t.removeChild(i)}}},{key:"_stringifyContent",value:function(){var e=this.content;return null==e?"":""+e}}]),o}(f);return e.\u0275fac=function(t){return new(t||e)(p.Rb(p.B),p.Rb(p.l),p.Rb(s.c),p.Rb(p.G),p.Rb(l.a,8))},e.\u0275dir=p.Mb({type:e,selectors:[["","matBadge",""]],hostAttrs:[1,"mat-badge"],hostVars:20,hostBindings:function(e,t){2&e&&p.Jb("mat-badge-overlap",t.overlap)("mat-badge-above",t.isAbove())("mat-badge-below",!t.isAbove())("mat-badge-before",!t.isAfter())("mat-badge-after",t.isAfter())("mat-badge-small","small"===t.size)("mat-badge-medium","medium"===t.size)("mat-badge-large","large"===t.size)("mat-badge-hidden",t.hidden||!t._hasContent)("mat-badge-disabled",t.disabled)},inputs:{disabled:["matBadgeDisabled","disabled"],position:["matBadgePosition","position"],size:["matBadgeSize","size"],color:["matBadgeColor","color"],overlap:["matBadgeOverlap","overlap"],description:["matBadgeDescription","description"],hidden:["matBadgeHidden","hidden"],content:["matBadge","content"]},features:[p.Cb,p.Db]}),e}(),g=function(){var e=d(function e(){r(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.Pb({type:e}),e.\u0275inj=p.Ob({imports:[[s.a,a.j],a.j]}),e}()}}])}();