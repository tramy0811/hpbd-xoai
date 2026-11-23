(() => {
const $=id=>document.getElementById(id), cfg=window.config||{};
document.querySelectorAll('[data-name]').forEach(e=>e.textContent=cfg.name||'Xoài');
$('letter-content').textContent=cfg.letter||'Chúc em sinh nhật thật vui!';$('signature').textContent=cfg.signature||'Thương mến';$('sender').textContent=cfg.signature||'Mango';
const stage=$('stage'),actor=$('actor'),present=$('moving-present'),table=$('birthday-table'),action=$('action');
let phase='outside',busy=false,count=0,walkInterval,run=0;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,180):ms));
new ResizeObserver(()=>{stage.style.transform=`scale(${stage.parentElement.clientWidth/800})`;}).observe(stage.parentElement);
function say(t){$('actor-speech').textContent=t;}
function copy(t,h,b){$('scene-title').textContent=t;$('scene-hint').textContent=h;action.setAttribute('aria-label',b);}
function state(s){phase=s;stage.dataset.state=s;}
function lock(v){busy=v;action.disabled=v;table.disabled=v||phase!=='candle';syncGuide();}
function step(n){}
function syncGuide(){
let target='mango',label='Chạm Mango',title='Chạm vào Mango để bắt đầu',hint='Mango sẽ đi tới cửa và mở cửa nhé.';
if(phase==='gifts'&&count<3){target='gift';label='Chạm quà';title=count?`Quà ${count}/3 · Chạm hộp quà tiếp theo`:'Chạm vào hộp quà bên phải';hint=count?'Chạm hộp quà để nhận lời chúc tiếp theo.':'Mango sẽ đón lấy và mở món quà cho em.';}
else if(phase==='gifts'&&count===3){target='cake';label='Đến bánh kem';title='Có bánh sinh nhật nữa nè!';hint='Chạm bánh kem để Mango đi tới bên bánh.';table.classList.add('is-visible');}
else if(phase==='candle'){target='cake';label='Thổi nến';title='Ước một điều, rồi chạm bánh kem';hint='Mango sẽ ghé lại thổi nến cùng em.';}
else if(phase==='finished'){target='letter';label='Mở thiệp';title='Một lá thư đang chờ em';hint='Chạm chiếc thư cạnh Mango để đọc lời chúc.';}
if(busy){title={entering:'Mango đang mở cửa…',receiving:'Mango đang nhận và mở quà…','to-cake':'Mango đang đến bên bánh…',blowing:'Phùuu… điều ước bay lên!'}[phase]||'Chờ Mango một chút nhé…';hint='';}
stage.dataset.target=target;stage.classList.toggle('is-busy',busy);action.innerHTML=`<span class="tap-mark">${target==='letter'?'✉':'☝'}</span><span class="tap-label">${label}</span>`;action.setAttribute('aria-label',title);$('scene-title').textContent=title;$('scene-hint').textContent=hint;
}

function pose(p){actor.dataset.pose=p;}
function walkTo(x,y){actor.classList.remove('is-party','is-blowing','is-reaching');actor.classList.add('is-walking');let frame=0;pose('walk-a');clearInterval(walkInterval);walkInterval=setInterval(()=>pose(++frame%2?'walk-b':'walk-a'),190);actor.style.left=x+'px';actor.style.top=y+'px';}
function stop(p){clearInterval(walkInterval);actor.classList.remove('is-walking');pose(p);}
function music(on){if(on){$('song').play().then(()=>{$('music').setAttribute('aria-pressed','true');$('music').setAttribute('aria-label','Tắt nhạc');}).catch(()=>{});}else{$('song').pause();$('music').setAttribute('aria-pressed','false');$('music').setAttribute('aria-label','Bật nhạc');}}
$('music').onclick=()=>music($('song').paused);
const sky=document.createElement('div');sky.className='balloon-sky';sky.setAttribute('aria-hidden','true');for(let i=0;i<8;i++){const b=document.createElement('i');b.className='sky-balloon';b.style.cssText=`--x:${[3,91,15,80,6,93,24,72][i]}%;--size:${38+i%3*12}px;--color:${['#edb2c5','#f4cc91','#c8b8df','#b8d6c6'][i%4]};--duration:${24+i%4*4}s;--delay:-${i*4+5}s;--still:${12+i*8}%`;sky.append(b);}document.body.prepend(sky);
async function enter(){lock(true);state('entering');music(true);say('Mango đến nhà rồi nè!');copy('Mango đến gõ cửa…','Cùng chờ xem bên trong có gì nhé.','Mango đang mở cửa…');walkTo(230,218);await sleep(1750);stop('reach');actor.classList.add('is-reaching');await sleep(650);$('animated-door').classList.add('is-open');say('Cửa mở rồi, vào nhà thôi!');await sleep(1100);actor.classList.remove('is-reaching');walkTo(300,181);actor.style.transform='scale(.78)';await sleep(1300);stage.classList.add('is-crossing');await sleep(450);stage.classList.add('is-interior');actor.style.transition='none';actor.style.left='160px';actor.style.top='260px';actor.style.transform='';void actor.offsetWidth;actor.style.transition='';await sleep(180);stage.classList.remove('is-crossing');walkTo(280,260);await sleep(1800);stop('happy');state('gifts');say('Oa! Quà sinh nhật dành cho Xoài nè!');step(1);copy('Cả một vòng tay đầy quà xinh','Mango sẽ nhận từng món quà rồi mở giúp em nhé.','Nhận món quà đầu tiên');lock(false);}

const wishes=['Một chiếc ôm thật ấm. Chúc em luôn được yêu thương!','Một túi niềm vui. Chúc em luôn rạng rỡ mỗi ngày!','Gấp màn hình máy tính xuống nhé :))'];
async function gift(){lock(true);state('receiving');actor.classList.remove('is-party','is-opening');say('Để Mango đón lấy nha…');pose('reach');present.className='moving-present';present.style.transition='none';present.style.left='655px';present.style.top='350px';present.style.transform='rotate(10deg)';void present.offsetWidth;present.style.transition='';present.classList.add('is-visible');await sleep(80);present.style.left='361px';present.style.top='368px';present.style.transform='rotate(0deg)';await sleep(1250);present.classList.remove('is-visible');pose('hold');actor.classList.add('is-opening');stage.classList.add('camera-close');say('Ôm một cái… rồi mở quà nào!');await sleep(900);actor.classList.remove('is-opening');pose('happy');present.style.left='423px';present.style.top='397px';present.classList.add('is-visible');await sleep(250);present.classList.add('is-open');present.querySelector('.present-surprise').textContent=['♥','✦','✿'][count];say(['Một chiếc ôm thật to ♥','Vui ơi là vui!','Có một bất ngờ cuối dành cho em!'][count]);actor.classList.add('is-party');await sleep(1100);count++;state('gifts');copy(`Món quà ${count} / 3`,wishes[count-1],count===3?'Cùng Mango đến bánh kem':'Nhận món quà tiếp theo');await showGiftWish(count-1);stage.classList.remove('camera-close');lock(false);}
function showGiftWish(i){return new Promise(resolve=>{const dialog=$('gift-wish');dialog.classList.toggle('is-final-gift',i===2);document.getElementById('gift-wish-number').hidden=true;$('gift-wish-accept').textContent=i===2?'Hihi, nhận lời nhắn :))':'Nhận lời chúc ♥';$('gift-wish-number').textContent='';$('gift-wish-title').textContent=['Một chiếc ôm thật ấm','Một túi đầy niềm vui','Món quà cuối cùng'][i];$('gift-wish-message').textContent=wishes[i];$('gift-wish-symbol').textContent=['♥','✦','✿'][i];dialog.showModal();const finish=()=>{dialog.removeEventListener('close',finish);resolve();};dialog.addEventListener('close',finish);$('gift-wish-accept').onclick=()=>dialog.close();});}

async function candle(){lock(true);state('to-cake');present.classList.remove('is-visible');actor.classList.remove('is-party');say('Còn bánh kem nữa nè!');table.classList.add('is-visible');walkTo(412,245);await sleep(1800);stop('blow');state('candle');say('Nhắm mắt lại, ước một điều nhé…');step(2);copy('Một điều ước dành riêng cho em','Ước xong, chạm bánh để Mango ghé lại thổi nến.','Phù… thổi nến cùng Mango!');lock(false);}
async function blow(){lock(true);state('blowing');say('Phùuu…');pose('blow');actor.classList.add('is-blowing');await sleep(1000);table.querySelector('.candles').classList.add('is-out');table.classList.add('is-extinguished');await sleep(650);actor.classList.remove('is-blowing');pose('happy');actor.classList.add('is-party');state('finished');say('Chúc mừng sinh nhật '+(cfg.name||'Xoài')+'!');step(3);copy('Happy birthday, '+(cfg.name||'Xoài')+'!','Nến tắt rồi! Mong điều ước của em sẽ thành hiện thực.','Mở thiệp từ '+(cfg.signature||'Mango'));for(let i=0;i<70;i++){const c=document.createElement('i');c.className='confetto';c.style.left=Math.random()*100+'%';c.style.background=['#f5cb8c','#e999b0','#b3cfb0','#ddd1ef'][i%4];c.style.animationDelay=Math.random()*.8+'s';$('confetti').append(c);}setTimeout(()=>$('confetti').replaceChildren(),4500);lock(false);}
action.onclick=()=>{if(busy)return;if(phase==='outside')enter();else if(phase==='gifts')count<3?gift():candle();else if(phase==='candle')blow();else if(phase==='finished')$('letter').showModal();};table.onclick=()=>{if(!busy){if(phase==='candle')blow();else if(phase==='gifts'&&count===3)candle();}};$('animated-door').onclick=()=>{if(!busy&&phase==='outside')enter();};$('animated-door').tabIndex=0;$('animated-door').setAttribute('role','button');$('animated-door').setAttribute('aria-label','Cùng Mango mở cửa');$('animated-door').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!busy&&phase==='outside')enter();}};
$('close-letter').onclick=()=>$('letter').close();$('replay').onclick=()=>{$('letter').close();clearInterval(walkInterval);count=0;stage.classList.remove('is-interior','is-crossing','camera-close');state('outside');actor.className='actor';actor.style.transition='none';actor.style.left='90px';actor.style.top='280px';actor.style.transform='';void actor.offsetWidth;actor.style.transition='';pose('walk-a');$('animated-door').classList.remove('is-open');table.className='birthday-table';table.querySelector('.candles').classList.remove('is-out');present.className='moving-present';$('confetti').replaceChildren();say('Cốc cốc… Mango đến rồi!');step(0);copy('Một bất ngờ đang chờ sau cánh cửa','Cùng Mango đi tới cửa và khám phá nhé.','Đi cùng Mango nào!');lock(false);};
copy('Một bất ngờ đang chờ sau cánh cửa','Cùng Mango đi tới cửa và khám phá nhé.','Đi cùng Mango nào!');lock(false);
})();








