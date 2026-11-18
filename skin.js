// Garden Gnome Software - Skin
// Pano2VR 7.1.11/21010
// Filename: IVIART-HOTSPOTS.ggsk
// Generated 2026-11-18T18:26:28

function pano2vrSkin(player,base) {
	player.addVariable('iviart_pulso', 2, false, { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressedKey = 0;
	var skinKeyPressedText = '';
	this.player=player;
	player.setApiVersion(7);
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	var cssPrefix="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	for(var i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; });
	
	var parameterToTransform=function(p) {
		return p.def + 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	
	this.languageChanged=function() {
		var stack=[];
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdateText) {
				e.ggUpdateText();
			}
			if (e.ggUpdateAria) {
				e.ggUpdateAria();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('sizechanged', function () { me.updateSize(me.divSkin);});
	player.addListener('languagechanged', this.languageChanged);
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._iviart_timer=document.createElement('div');
		el.ggTimestamp=skin.ggCurrentTime;
		el.ggLastIsActive=false;
		el.ggTimeout=3600000;
		el.ggId="iviart_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 13px;';
		hs+='left : 20px;';
		hs+='position : absolute;';
		hs+='top : 20px;';
		hs+='visibility : inherit;';
		hs+='width : 35px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._iviart_timer.ggIsActive=function() {
			return (me._iviart_timer.ggTimestamp==0 ? false : (Math.floor((skin.ggCurrentTime - me._iviart_timer.ggTimestamp) / me._iviart_timer.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._iviart_timer.ggActivate=function () {
			player.setVariableValue('iviart_pulso', !player.getVariableValue('iviart_pulso'));
		}
		me._iviart_timer.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._iviart_timer);
		player.addListener('changenode', function(event) {
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_changenode();
				}
			}
		});
		player.addListener('configloaded', function(event) {
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_configloaded();
				}
			}
			me._iviart_timer.ggTimestamp=skin.ggCurrentTime;
			me._iviart_timer.ggTimeout=400;
		});
		player.addListener('varchanged_iviart_pulso', function(event) {
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_varchanged_iviart_pulso();
				}
			}
		});
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='z-index: -1;';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 200px;';
		hs+='position : absolute;';
		hs+='top : 150px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.setAttribute('tabindex', '0');
		el.style.transformOrigin='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.onmouseleave=function (e) {
			me.elementMouseOver['ht_node']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._iviart_anel=document.createElement('div');
		el.ggId="iviart_anel";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle iviart-ring";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 2px solid #ffffff;';
		hs+='border-radius : 999px;';
		hs+='cursor : pointer;';
		hs+='height : 54px;';
		hs+='left : calc(50% - ((54px + 4px) / 2) + 0px);';
		hs+='opacity : 0.15;';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((54px + 4px) / 2) + 0px);';
		hs+='visibility : inherit;';
		hs+='width : 54px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._iviart_anel.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._iviart_anel.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('iviart_pulso') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._iviart_anel.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._iviart_anel.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._iviart_anel.style.transition='transform 650ms ease 0ms, opacity 650ms ease 0ms';
				if (me._iviart_anel.ggCurrentLogicStateScaling == 0) {
					me._iviart_anel.ggParameter.sx = 1.6;
					me._iviart_anel.ggParameter.sy = 1.6;
					me._iviart_anel.style.transform=parameterToTransform(me._iviart_anel.ggParameter);
					setTimeout(function() {skin.updateSize(me._iviart_anel);}, 700);
				}
				else {
					me._iviart_anel.ggParameter.sx = 1;
					me._iviart_anel.ggParameter.sy = 1;
					me._iviart_anel.style.transform=parameterToTransform(me._iviart_anel.ggParameter);
					setTimeout(function() {skin.updateSize(me._iviart_anel);}, 700);
				}
			}
		}
		me._iviart_anel.logicBlock_scaling();
		me._iviart_anel.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('iviart_pulso') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._iviart_anel.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._iviart_anel.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._iviart_anel.style.transition='transform 650ms ease 0ms, opacity 650ms ease 0ms';
				if (me._iviart_anel.ggCurrentLogicStateAlpha == 0) {
					me._iviart_anel.style.visibility=me._iviart_anel.ggVisible?'inherit':'hidden';
					me._iviart_anel.style.opacity=0.75;
				}
				else {
					me._iviart_anel.style.visibility=me._iviart_anel.ggVisible?'inherit':'hidden';
					me._iviart_anel.style.opacity=0.15;
				}
			}
		}
		me._iviart_anel.logicBlock_alpha();
		me._iviart_anel.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._iviart_anel);
		el=me._iviart_favicon=document.createElement('div');
		els=me._iviart_favicon__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._iviart_favicon__img.setAttribute('src',basePath + 'images/iviart_favicon.svg');
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="iviart_favicon";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg iviart-favicon";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 52px;';
		hs+='left : calc(50% - ((52px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((52px + 0px) / 2) + 0px);';
		hs+='visibility : inherit;';
		hs+='width : 52px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._iviart_favicon.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._iviart_favicon.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._iviart_favicon);
		me.elementMouseOver['ht_node']=false;
		me._iviart_anel.logicBlock_scaling();
		me._iviart_anel.logicBlock_alpha();
			me.ggEvent_changenode=function() {
				me._iviart_anel.logicBlock_scaling();
				me._iviart_anel.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._iviart_anel.logicBlock_scaling();
				me._iviart_anel.logicBlock_alpha();
			};
			me.ggEvent_varchanged_iviart_pulso=function() {
				me._iviart_anel.logicBlock_scaling();
				me._iviart_anel.logicBlock_alpha();
			};
			me.__div = me._ht_node;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
				hotspot.skinid = 'ht_node';
				hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = {};
	}
	player.addListener('hotspotsremoved',function() {
			me.removeSkinHotspots();
	});
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		if (player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
		if (me._iviart_timer.ggLastIsActive!=me._iviart_timer.ggIsActive()) {
			me._iviart_timer.ggLastIsActive=me._iviart_timer.ggIsActive();
			if (me._iviart_timer.ggLastIsActive) {
				player.setVariableValue('iviart_pulso', !player.getVariableValue('iviart_pulso'));
			} else {
			}
		}
		for (const id in hotspotTemplates) {
			const tmpl=hotspotTemplates[id];
			tmpl.forEach(function(hotspot) {
				if (hotspot.hotspotTimerEvent) {
					hotspot.hotspotTimerEvent();
				}
			});
		};
	};
	player.addListener('timer', me.skinTimerEvent);
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.iviart-favicon{filter:drop-shadow(0 3px 8px #0005)} @media(prefers-reduced-motion:reduce){.iviart-ring{transition:none!important}}'));
	document.head.appendChild(style);
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onclick) activeElement.onclick();
		}
	});
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmousedown) activeElement.onmousedown();
		}
	});
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmouseup) activeElement.onmouseup();
		}
	});
	me.skinTimerEvent();
};