/* Adaptador do player Pano2VR 7.1.11 exportado localmente. */
(()=>{'use strict';
 const unit=new URLSearchParams(location.search).get('unit')==='curitiba'?'curitiba':'maringa';
 const scenes=window.IVIART_PANORAMAS[unit],ids=scenes.map(s=>unit+'_'+s.id),loading=document.querySelector('#loading');
 let player,hotspots=[],ready=false,entrance=null,entered=false,targetView={pan:0,tilt:0,fov:100};
 const notify=(type,extra={})=>parent.postMessage({type,unit,...extra},location.origin);
 function openNode(id){if(!ids.includes(id))return;if(entrance?.isActive())entrance.cancel();player.openNext('{'+id+'}');}
 function drawHotspots(){if(window.IVIART_NATIVE_SKIN)return;for(const id of hotspots)player.removeHotspot(id);hotspots=[];for(const id of player.getPointHotspotIds()){const hs=player.getHotspot(id);if(!hs||!hs.url||!hs.url.startsWith('{'+unit+'_'))continue;const b=document.createElement('button');b.className='hs';b.textContent='⌃';b.setAttribute('aria-label','Ir ao próximo ponto do tour');b.onclick=()=>player.openNext(hs.url,hs.target||'');const customId='iviart_'+id;player.addHotspot(customId,hs.pan,hs.tilt,b);hotspots.push(customId)}}
 async function start(){try{
 if(typeof pano2vrPlayer!=='function')throw Error('Player não encontrado');
 player=new pano2vrPlayer('pano');window.IVIART_PANO2VR=player;const fit=()=>player.setViewerSize(document.documentElement.clientWidth,window.innerHeight);new ResizeObserver(fit).observe(document.querySelector('#pano'));window.addEventListener('resize',fit);window.addEventListener('orientationchange',()=>setTimeout(fit,100));fit();
 const response=await fetch('pano.xml');if(!response.ok)throw Error('Configuração não encontrada');
 const xml=new DOMParser().parseFromString(await response.text(),'text/xml');
 /* Filtra unidades antes de entregar a configuração ao player, para impedir
    navegação acidental para a outra loja por lista interna ou teclado. */
 for(const auto of xml.querySelectorAll('autorotate,flyintransition')){auto.setAttribute('enabled','0');auto.setAttribute('useanimation','0')}for(const a of xml.querySelectorAll('animation'))a.setAttribute('useinautorotation','0');const all=[...xml.querySelectorAll('panorama')];for(const n of all)if(n.id&&!ids.includes(n.id))n.remove();
 const tour=xml.documentElement;if(tour.tagName==='tour'){tour.setAttribute('start',ids[0]);tour.setAttribute('startnode',ids[0])}
 player.setBasePath('');if(typeof pano2vrSkin==='function'){window.IVIART_NATIVE_SKIN=new pano2vrSkin(player,'')}const firstNode=xml.querySelector('panorama[id="'+ids[0]+'"]');const v=firstNode?.querySelector('view > start');targetView={pan:Number(v?.getAttribute('pan')||0),tilt:Number(v?.getAttribute('tilt')||0),fov:100};for(const view of xml.querySelectorAll('view')){const start=view.querySelector('start');if(start)start.setAttribute('projection','4');const min=view.querySelector('min');const max=view.querySelector('max');if(min)min.setAttribute('tilt','-90');if(max){max.setAttribute('tilt','90');max.setAttribute('scaletofit','0')}}entrance=new IviartEntrance(player,()=>notify('iviart:entry-end'));for(const n of xml.querySelectorAll('userdata'))n.setAttribute('title','Iviart');for(const n of xml.querySelectorAll('hotspot'))n.setAttribute('title','Iviart');
 player.addListener('imagesready',()=>{ready=true;loading.hidden=true;notify('iviart:ready',{id:player.getCurrentNode()});drawHotspots();if(!entered){entered=true;requestAnimationFrame(()=>entrance.run(targetView))}});
 player.addListener('changenode',()=>{if(entered&&entrance?.isActive()&&player.getCurrentNode()!==ids[0])entrance.cancel();document.body.dataset.node=player.getCurrentNode();document.body.dataset.unit=unit;if(entered&&!entrance?.isActive())player.setProjection(4);notify('iviart:node-state',{id:player.getCurrentNode()});setTimeout(drawHotspots,0)});
 player.addListener('positionchanged',()=>{document.body.dataset.pan=String(player.getPan());document.body.dataset.tilt=String(player.getTilt());document.body.dataset.projection=String(player.getProjection());document.body.dataset.fov=String(player.getFov())});document.body.dataset.nodeCount=String(ids.length);player.readConfigXml(xml);
 if(player.getCurrentNode()!==ids[0])openNode(ids[0]);
 notify('iviart:runtime',{engine:'Pano2VR',count:ids.length});
 }catch(error){loading.textContent='Não foi possível carregar o tour. Atualize a página ou volte à apresentação.';notify('iviart:runtime-error',{message:error.message})}}
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent)return;const d=e.data;if(d?.type==='iviart:node'&&ready)openNode(d.id);if(d?.type==='iviart:zoom'&&ready)player.changeFov(d.delta)});
 start();
})();
