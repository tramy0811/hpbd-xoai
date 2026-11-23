(() => {
const stage=document.getElementById('stage');
const magic=document.createElement('div');magic.className='stage-magic';magic.setAttribute('aria-hidden','true');stage.append(magic);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function sparkle(x,y,n=12){if(reduced)return;for(let i=0;i<n;i++){const s=document.createElement('i');s.className='wish-spark';s.textContent=['✦','✧','♥','·'][i%4];s.style.cssText=`left:${x}px;top:${y}px;--dx:${(Math.random()-.5)*210}px;--dy:${-35-Math.random()*125}px;--spark-color:${['#ffdb8f','#f7b2c8','#fff2d5'][i%3]};animation-delay:${Math.random()*.2}s`;magic.append(s);setTimeout(()=>s.remove(),1750);}}
let last=stage.dataset.state;
new MutationObserver(()=>{const next=stage.dataset.state;if(next===last)return;last=next;if(next==='receiving')setTimeout(()=>sparkle(445,385,18),2500);if(next==='finished'){sparkle(610,280,24);setTimeout(()=>sparkle(430,250,20),450);}}).observe(stage,{attributes:true,attributeFilter:['data-state']});
stage.addEventListener('pointerdown',e=>{if(!e.target.closest('button,[role=button]'))return;const r=stage.getBoundingClientRect();sparkle((e.clientX-r.left)*800/r.width,(e.clientY-r.top)*520/r.height,5);});
})();
