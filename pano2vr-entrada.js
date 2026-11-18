/* Entrada controlada por JavaScript pelas APIs nativas do Pano2VR 7.1.
   Projeção 9 = Stereographic / Little Planet; 4 = Rectilinear.
   Pan inicial -179°, tilt -90°, FOV 330°; 360° em 18 segundos,
   seguido do moveTo nativo até a orientação de fachada. */
window.IviartEntrance=function(player,onEnd){
 let animation=0,startTime=0,phase='idle',target={pan:0,tilt:0,fov:100},flyStart=0;
 const button=document.createElement('button');button.className='skip-entry';button.textContent='Pular apresentação';button.hidden=true;document.body.appendChild(button);
 function finish(){cancelAnimationFrame(animation);phase='done';document.body.dataset.intro='done';player.stopAutorotate();player.moveToEx({pan:target.pan,tilt:target.tilt,fov:target.fov,projection:4,speed:0});button.hidden=true;onEnd?.()}
 button.onclick=finish;
 function run(view){target=view;button.hidden=false;document.body.dataset.intro='spin';phase='spin';player.moveToEx({pan:-179,tilt:-90,fov:330,projection:9,speed:0});startTime=performance.now();/* Entrada cinematográfica explicitamente solicitada; Pular permanece disponível. */animation=requestAnimationFrame(step)}
 function step(now){if(phase==='spin'){const p=Math.min(1,(now-startTime)/18000);player.moveToEx({pan:-179+360*p,tilt:-90,fov:330,projection:9,speed:0});document.body.dataset.introRotation=String(360*p);if(p===1){phase='fly';document.body.dataset.intro='fly';flyStart=now;player.moveToEx({pan:target.pan||360,tilt:target.tilt,fov:target.fov,projection:4,speed:0.5,timingFunction:1})}}else if(phase==='fly'){if((player.getProjection()===4&&Math.abs(player.getTilt()-target.tilt)<0.2&&Math.abs(player.getFov()-target.fov)<0.3)||now-flyStart>18000){finish();return}}else return;animation=requestAnimationFrame(step)}
 return{run,cancel:finish,isActive:()=>phase==='spin'||phase==='fly'};
};
