/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: 3167
*/
YUI.add("history-base",function(B){var I=B.Lang,E=B.Object,L=YUI.namespace("Env.History"),M=B.Array,N=B.config.doc,F=N.documentMode,J=B.config.win,C={merge:true},H="change",A="add",G="replace";function D(){this._init.apply(this,arguments);}B.augment(D,B.EventTarget,null,null,{emitFacade:true,prefix:"history",preventable:false,queueable:true});if(!L._state){L._state={};}function K(O){return I.type(O)==="object";}D.NAME="historyBase";D.SRC_ADD=A;D.SRC_REPLACE=G;D.html5=!!(J.history&&J.history.pushState&&J.history.replaceState&&("onpopstate" in J||B.UA.gecko>=2));D.nativeHashChange=("onhashchange" in J||"onhashchange" in N)&&(!F||F>7);B.mix(D.prototype,{_init:function(P){var O;P=this._config=P||{};O=this._initialState=this._initialState||P.initialState||null;this.publish(H,{broadcast:2,defaultFn:this._defChangeFn});if(O){this.add(O);}},add:function(){var O=M(arguments,0,true);O.unshift(A);return this._change.apply(this,O);},addValue:function(P,R,O){var Q={};Q[P]=R;return this._change(A,Q,O);},get:function(P){var Q=L._state,O=K(Q);if(P){return O&&E.owns(Q,P)?Q[P]:undefined;}else{return O?B.mix({},Q,true):Q;}},replace:function(){var O=M(arguments,0,true);O.unshift(G);return this._change.apply(this,O);},replaceValue:function(P,R,O){var Q={};Q[P]=R;return this._change(G,Q,O);},_change:function(Q,P,O){O=O?B.merge(C,O):C;if(O.merge&&K(P)&&K(L._state)){P=B.merge(L._state,P);}this._resolveChanges(Q,P,O);return this;},_fireEvents:function(Q,P,O){this.fire(H,{_options:O,changed:P.changed,newVal:P.newState,prevVal:P.prevState,removed:P.removed,src:Q});E.each(P.changed,function(S,R){this._fireChangeEvent(Q,R,S);},this);E.each(P.removed,function(S,R){this._fireRemoveEvent(Q,R,S);},this);},_fireChangeEvent:function(Q,O,P){this.fire(O+"Change",{newVal:P.newVal,prevVal:P.prevVal,src:Q});},_fireRemoveEvent:function(Q,O,P){this.fire(O+"Remove",{prevVal:P,src:Q});},_resolveChanges:function(U,S,P){var T={},O,R=L._state,Q={};if(!S){S={};}if(!P){P={};}if(K(S)&&K(R)){E.each(S,function(V,W){var X=R[W];if(V!==X){T[W]={newVal:V,prevVal:X};O=true;}},this);E.each(R,function(W,V){if(!E.owns(S,V)||S[V]===null){delete S[V];Q[V]=W;O=true;}},this);}else{O=S!==R;}if(O){this._fireEvents(U,{changed:T,newState:S,prevState:R,removed:Q},P);}},_storeState:function(P,O){L._state=O||{};},_defChangeFn:function(O){this._storeState(O.src,O.newVal,O._options);}},true);B.HistoryBase=D;},"3.3.0",{requires:["event-custom-complex"]});YUI.add("history-hash",function(A){var C=A.HistoryBase,F=A.Lang,L=A.Array,J=A.Object,K=YUI.namespace("Env.HistoryHash"),B="hash",E,D,I,H=A.config.win,M=H.location,N=A.config.useHistoryHTML5;function G(){G.superclass.constructor.apply(this,arguments);}A.extend(G,C,{_init:function(O){var P=G.parseHash();O=O||{};this._initialState=O.initialState?A.merge(O.initialState,P):P;A.after("hashchange",A.bind(this._afterHashChange,this),H);G.superclass._init.apply(this,arguments);},_change:function(Q,P,O){J.each(P,function(S,R){if(F.isValue(S)){P[R]=S.toString();}});return G.superclass._change.call(this,Q,P,O);},_storeState:function(R,Q){var P=G.decode,O=G.createHash(Q);G.superclass._storeState.apply(this,arguments);if(R!==B&&P(G.getHash())!==P(O)){G[R===C.SRC_REPLACE?"replaceHash":"setHash"](O);}},_afterHashChange:function(O){this._resolveChanges(B,G.parseHash(O.newHash),{});}},{NAME:"historyHash",SRC_HASH:B,hashPrefix:"",_REGEX_HASH:/([^\?#&]+)=([^&]+)/g,createHash:function(Q){var O=G.encode,P=[];J.each(Q,function(S,R){if(F.isValue(S)){P.push(O(R)+"="+O(S));}});return P.join("&");},decode:function(O){return decodeURIComponent(O.replace(/\+/g," "));},encode:function(O){return encodeURIComponent(O).replace(/%20/g,"+");},getHash:(A.UA.gecko?function(){var P=/#(.*)$/.exec(M.href),Q=P&&P[1]||"",O=G.hashPrefix;return O&&Q.indexOf(O)===0?Q.replace(O,""):Q;}:function(){var P=M.hash.substr(1),O=G.hashPrefix;return O&&P.indexOf(O)===0?P.replace(O,""):P;}),getUrl:function(){return M.href;},parseHash:function(R){var O=G.decode,S,V,T,P,Q={},U=G.hashPrefix,W;R=F.isValue(R)?R:G.getHash();if(U){W=R.indexOf(U);if(W===0||(W===1&&R.charAt(0)==="#")){R=R.replace(U,"");}}T=R.match(G._REGEX_HASH)||[];for(S=0,V=T.length;S<V;++S){P=T[S].split("=");Q[O(P[0])]=O(P[1]);}return Q;},replaceHash:function(O){if(O.charAt(0)==="#"){O=O.substr(1);}M.replace("#"+(G.hashPrefix||"")+O);},setHash:function(O){if(O.charAt(0)==="#"){O=O.substr(1);}M.hash=(G.hashPrefix||"")+O;}});E=K._notifiers;if(!E){E=K._notifiers=[];}A.Event.define("hashchange",{on:function(Q,O,P){if(Q.compareTo(H)||Q.compareTo(A.config.doc.body)){E.push(P);}},detach:function(R,P,Q){var O=L.indexOf(E,Q);if(O!==-1){E.splice(O,1);}}});D=G.getHash();I=G.getUrl();if(C.nativeHashChange){A.Event.attach("hashchange",function(Q){var O=G.getHash(),P=G.getUrl();L.each(E.concat(),function(R){R.fire({_event:Q,oldHash:D,oldUrl:I,newHash:O,newUrl:P});});D=O;I=P;},H);}else{if(!K._hashPoll){if(A.UA.webkit&&!A.UA.chrome&&navigator.vendor.indexOf("Apple")!==-1){A.on("unload",function(){},H);}K._hashPoll=A.later(50,null,function(){var O=G.getHash(),P;if(D!==O){P=G.getUrl();L.each(E.concat(),function(Q){Q.fire({oldHash:D,oldUrl:I,newHash:O,newUrl:P});});D=O;I=P;}},null,true);}}A.HistoryHash=G;if(N===false||(!A.History&&N!==true&&(!C.html5||!A.HistoryHTML5))){A.History=G;}},"3.3.0",{requires:["event-synthetic","history-base","yui-later"]});YUI.add("history-hash-ie",function(H){if(H.UA.ie&&!H.HistoryBase.nativeHashChange){var C=H.Do,D=YUI.namespace("Env.HistoryHash"),B=H.HistoryHash,E=D._iframe,G=H.config.win,A=G.location,F="";B.getIframeHash=function(){if(!E||!E.contentWindow){return"";}var I=B.hashPrefix,J=E.contentWindow.location.hash.substr(1);return I&&J.indexOf(I)===0?J.replace(I,""):J;};B._updateIframe=function(J,I){var K=E&&E.contentWindow&&E.contentWindow.document,L=K&&K.location;if(!K||!L){return;}K.open().close();if(I){L.replace(J.charAt(0)==="#"?J:"#"+J);}else{L.hash=J;}};C.after(B._updateIframe,B,"replaceHash",B,true);if(!E){H.on("domready",function(){E=D._iframe=H.Node.getDOMNode(H.Node.create('<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>'));
H.config.doc.documentElement.appendChild(E);B._updateIframe(B.getHash()||"#");H.on("hashchange",function(I){F=I.newHash;if(B.getIframeHash()!==F){B._updateIframe(F);}},G);H.later(50,null,function(){var I=B.getIframeHash();if(I!==F){B.setHash(I);}},null,true);});}}},"3.3.0",{requires:["history-hash","node-base"]});YUI.add("history-html5",function(A){var C=A.HistoryBase,J=A.config.doc,G=A.config.win,I,L=A.config.useHistoryHTML5,K=A.JSON||G.JSON,E="enableSessionFallback",B="YUI_HistoryHTML5_state",D="popstate",F=C.SRC_REPLACE;function H(){H.superclass.constructor.apply(this,arguments);}A.extend(H,C,{_init:function(M){A.on("popstate",this._onPopState,G,this);H.superclass._init.apply(this,arguments);if(M&&M[E]&&YUI.Env.windowLoaded){try{I=G.sessionStorage;}catch(N){}this._loadSessionState();}},_getSessionKey:function(){return B+"_"+G.location.pathname;},_loadSessionState:function(){var M=K&&I&&I[this._getSessionKey()];if(M){try{this._resolveChanges(D,K.parse(M)||null);}catch(N){}}},_storeSessionState:function(M){if(this._config[E]&&K&&I){I[this._getSessionKey()]=K.stringify(M||null);}},_storeState:function(O,N,M){if(O!==D){G.history[O===F?"replaceState":"pushState"](N,M.title||J.title||"",M.url||null);}this._storeSessionState(N);H.superclass._storeState.apply(this,arguments);},_onPopState:function(N){var M=N._event.state;this._storeSessionState(M);this._resolveChanges(D,M||null);}},{NAME:"historyhtml5",SRC_POPSTATE:D});if(!A.Node.DOM_EVENTS.popstate){A.Node.DOM_EVENTS.popstate=1;}A.HistoryHTML5=H;if(L===true||(L!==false&&C.html5)){A.History=H;}},"3.3.0",{optional:["json"],requires:["event-base","history-base","node-base"]});YUI.add("history",function(A){},"3.3.0",{use:["history-base","history-hash","history-hash-ie","history-html5"]});