const caps=["Strategy & Advisory","Project & Organizational Planning","CRM & Business Process Strategy","Automation Strategy","Solution Architecture","Digital Solutions","Intelligent Automation","Optimization & Advisory"];
const row=caps.map(t=>`<span>${t}</span><b>✦</b>`).join("");const mqe=document.getElementById('mq');if(mqe)mqe.innerHTML=row+row;
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*.1+'s';io.observe(el)});
const bar=document.getElementById('bar');addEventListener('scroll',()=>{bar.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});

const f=document.getElementById('cf');if(f)f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);if(d.get('website'))return;
const b=`Name: ${d.get('name')}\nOrganization: ${d.get('org')}\nEmail: ${d.get('email')}\n\n${d.get('msg')}`;
location.href='mailto:hello@varnio.co.in?subject='+encodeURIComponent('Conversation with Varnio — '+d.get('name'))+'&body='+encodeURIComponent(b);
document.getElementById('ok').hidden=false});
(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,rail=document.getElementById('rail'),mqp=document.querySelector('.mq'),sp=[...document.querySelectorAll('.vis svg,.orb svg')];let ly=scrollY,v=0;
document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*14}deg) rotateX(${-y*14}deg)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const co=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const el=x.target,n=+el.dataset.n,t0=performance.now();(function s(t){const k=Math.min(1,(t-t0)/1400);el.firstChild.nodeValue=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(s)})(t0);co.unobserve(el)}}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(e=>co.observe(e));if(rm)return;
(function fr(){const y=scrollY,p=y/Math.max(1,document.documentElement.scrollHeight-innerHeight);v+=((y-ly)-v)*.12;ly=y;
if(rail)rail.style.transform=`translateY(${p*(innerHeight-8)}px)`;if(mqp)mqp.style.transform=`skewX(${Math.max(-8,Math.min(8,-v*.25))}deg)`;
sp.forEach(e=>{const r=e.parentElement.getBoundingClientRect();e.style.transform=`translateY(${(r.top+r.height/2-innerHeight/2)*-.06}px)`});requestAnimationFrame(fr)})()})();
