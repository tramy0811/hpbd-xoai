(() => {
const $ = id => document.getElementById(id);
const cfg = window.config || {};
document.querySelectorAll('[data-name]').forEach(el => el.textContent = cfg.name || 'Xoài');
$('letter-content').textContent = cfg.letter || 'Chúc bạn một sinh nhật thật nhiều niềm vui!';
$('signature').textContent = cfg.signature || 'Thương mến';
$('sender').textContent = cfg.signature || 'Mango';
document.title = `Mango · Chúc mừng sinh nhật ${cfg.name || 'Xoài'}`;
let phase = 'outside', opened = new Set(), timer, reactionTimer, celebrationTimer;
const sky = document.createElement('div');
sky.className = 'balloon-sky'; sky.setAttribute('aria-hidden','true');
const colors=['#edb2c5','#f4cc91','#c8b8df','#b8d6c6','#f3bdac','#d3c6e5'];
for(let i=0;i<10;i++) { const b=document.createElement('i');b.className='sky-balloon';b.style.cssText=`--x:${[3,91,15,80,6,93,24,72,1,88][i]}%;--size:${38+i%3*12}px;--color:${colors[i%colors.length]};--duration:${24+i%4*4}s;--delay:-${i*4+5}s;--still:${12+i*8}%`;sky.append(b); }
['✧','✿','♡','✦'].forEach(t=>{const d=document.createElement('span');d.className='party-doodle';d.textContent=t;sky.append(d);});document.body.prepend(sky);
['01-vay-chao','02-cuoi-lon','03-vui-mung','04-yeu-thich','08-hon-doi','09-ngac-nhien','12-buon-ngu'].forEach(n=>{const img=new Image();img.src='assets/mango/'+n+'.png';});
function express(file,mood='happy'){const p=$('puppy');$('mascot').src='assets/mango/'+file+'.png';p.dataset.mood=mood;p.classList.remove('reacting');void p.offsetWidth;p.classList.add('reacting');clearTimeout(reactionTimer);reactionTimer=setTimeout(()=>p.classList.remove('reacting'),800);}
$('mascot').tabIndex=0;$('mascot').setAttribute('role','button');$('mascot').setAttribute('aria-label','Chạm để Mango chào bạn');
let greeting=0;
function greet(){if(phase==='entering'||phase==='candle')return;const f=['01-vay-chao','02-cuoi-lon','04-yeu-thich'];express(f[greeting++%3],'love');$('bubble').textContent=['Mango chào bạn nè!','Hihi, sinh nhật vui thật đó!','Gửi bạn một chiếc ôm ♥'][(greeting-1)%3];}
$('mascot').onclick=greet;$('mascot').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();greet();}};

const wishes = ['Một chiếc ôm thật ấm. Chúc em luôn được yêu thương!','Một túi niềm vui. Chúc em luôn rạng rỡ mỗi ngày!','Một điều may mắn. Mong mọi ước mơ của em thành hiện thực!'];
function copy(title,hint,label) { syncStory();$('scene-title').textContent=title;$('scene-hint').textContent=hint;$('action').textContent=label;}
function syncStory(){const n=phase==='outside'||phase==='entering'?0:phase==='gifts'?1:2;document.querySelectorAll('[data-scene]').forEach((el,i)=>{el.classList.toggle('is-current',i===n);el.classList.toggle('is-complete',i<n);el.disabled=i!==n||phase==='entering';el.setAttribute('aria-current',i===n?'step':'false');});const current=document.querySelector('.story-panel.is-current');if(current)current.dataset.mood=$('puppy').dataset.mood||'happy';}
document.querySelectorAll('[data-scene]').forEach(el=>el.onclick=()=>$('action').click());
function music(on) { const song=$('song'); if(on){song.play().then(()=>{$('music').setAttribute('aria-pressed','true');$('music').setAttribute('aria-label','Tắt nhạc');}).catch(()=>{$('music').setAttribute('aria-pressed','false');$('music').setAttribute('aria-label','Bật nhạc');});}else{song.pause();$('music').setAttribute('aria-pressed','false');$('music').setAttribute('aria-label','Bật nhạc');}}
$('music').onclick=()=>music($('song').paused);
function step(n){document.querySelectorAll('.steps span').forEach((el,i)=>el.className=i<n?'done':i===n?'active':'');}
function enter(){if(phase!=='outside')return;phase='entering';express('09-ngac-nhien','surprise');$('action').disabled=true;$('world').dataset.phase='entering';$('puppy').classList.add('walking');$('bubble').textContent='Oa… tất cả là dành cho Xoài!';music(true);copy('Cửa mở rồi, vào nhà thôi!','Mango đang khám phá bất ngờ…','Mango đang vào nhà…');timer=setTimeout(()=>{phase='gifts';$('world').dataset.phase='gifts';$('puppy').classList.remove('walking');express('03-vui-mung','party');$('bubble').textContent='Ba món quà xinh đang đợi nè!';$('action').disabled=false;step(1);copy('Những món quà nhỏ, đầy thương mến','Chạm từng hộp quà hoặc bấm nút để Mango mở giúp.','Mở món quà đầu tiên');},1900);}
function openGift(i){if(phase!=='gifts'||opened.has(i))return;opened.add(i);document.querySelector(`[data-gift="${i}"]`).classList.add('open');document.querySelector(`[data-gift="${i}"]`).setAttribute('aria-label',`Đã mở món quà thứ ${i+1}`);express(['04-yeu-thich','02-cuoi-lon','09-ngac-nhien'][i],['love','happy','surprise'][i]);$('bubble').textContent=['Một chiếc ôm dành cho em ♥','Thêm thật nhiều niềm vui!','Và cả một trời may mắn ✦'][i];copy('Món quà '+opened.size+' / 3',wishes[i],opened.size===3?'Đến giờ ước nguyện':'Mở món quà tiếp theo');}
function candle(){phase='candle';$('world').dataset.phase='candle';step(2);express('12-buon-ngu','wish');$('bubble').textContent='Nhắm mắt lại, ước một điều nhé…';copy('Một ngọn nến, một điều ước','Ước xong thì chạm bánh kem hoặc nút bên dưới để thổi nến.','Phù… thổi nến nào!');}
function celebrate(){if(phase!=='candle')return;phase='finished';$('world').dataset.phase='finished';express('08-hon-doi','blow');clearTimeout(celebrationTimer);celebrationTimer=setTimeout(()=>express('03-vui-mung','party'),700);$('bubble').textContent='Happy birthday, '+(cfg.name||'Xoài')+'!';copy('Chúc mừng sinh nhật, '+(cfg.name||'Xoài')+'!','Mong tuổi mới của em luôn ngọt ngào như hôm nay.','Mở thiệp từ '+(cfg.signature||'Mango'));step(3);for(let i=0;i<70;i++){const piece=document.createElement('i');piece.className='confetto';piece.style.left=Math.random()*100+'%';piece.style.background=['#f5cb8c','#e999b0','#b3cfb0','#ddd1ef'][i%4];piece.style.animationDelay=Math.random()*.9+'s';$('confetti').append(piece);}timer=setTimeout(()=>$('confetti').replaceChildren(),4500);}
$('door').onclick=enter;
$('action').onclick=()=>{if(phase==='outside')enter();else if(phase==='gifts'){if(opened.size===3)candle();else openGift([0,1,2].find(i=>!opened.has(i)));}else if(phase==='candle')celebrate();else if(phase==='finished')$('letter').showModal();};
document.querySelectorAll('[data-gift]').forEach(el=>el.onclick=()=>openGift(Number(el.dataset.gift)));
$('cake').onclick=celebrate;
$('close-letter').onclick=()=>$('letter').close();
$('letter').addEventListener('click',e=>{if(e.target===$('letter')){const r=$('letter').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('letter').close();}});
$('replay').onclick=()=>{clearTimeout(timer);clearTimeout(celebrationTimer);$('letter').close();phase='outside';opened.clear();$('world').dataset.phase='outside';$('action').disabled=false;$('puppy').classList.remove('walking');express('01-vay-chao','happy');$('bubble').textContent='Cốc cốc… có ai ở nhà không?';document.querySelectorAll('[data-gift]').forEach((el,i)=>{el.classList.remove('open');el.setAttribute('aria-label',`Mở món quà thứ ${i+1}`);});$('confetti').replaceChildren();step(0);copy('Một bất ngờ đang chờ sau cánh cửa','Chạm mở cửa, cùng Mango bước vào nhé.','Mở cửa cùng Mango ✦');};
})();


