const c=document.getElementById('c'),x=c.getContext('2d');let W,H,D,vis=true;
function rs(){D=Math.min(devicePixelRatio||1,2);W=c.width=c.clientWidth*D;H=c.height=c.clientHeight*D}
rs();addEventListener('resize',rs);new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)t()}).observe(c);
const N=innerWidth<700?16:34,mx={x:-9e3,y:-9e3},rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx.x=(e.clientX-r.left)*D;mx.y=(e.clientY-r.top)*D});
function t(){if(!vis)return;const k=performance.now()/1000,p=rm?.6:(k%12)/12;
let o=p<.2?0:p<.5?(p-.2)/.3:p<.85?1:1-(p-.85)/.15;o=o*o*(3-2*o);x.clearRect(0,0,W,H);
for(let i=0;i<N;i++){const f=i/(N-1),ph=i*1.7,m=i===N>>1;x.beginPath();
for(let s=0;s<=120;s++){const u=s/120,px=u*W;
let y=H*.4+(Math.sin(u*9+k*.9+ph)*.5+Math.sin(u*17-k*.6+ph*2)*.3+Math.sin(u*4+k*.4+i)*.4)*H*.2*(1-o)+Math.sin(u*6.28+k*1.2)*H*.005*o+(f-.5)*H*.02*(1-o);
const dx=px-mx.x,dy=y-mx.y,d=Math.hypot(dx,dy),r=170*D;if(d<r)y+=(dy/(d||1))*(r-d)*.35*o;s?x.lineTo(px,y):x.moveTo(px,y)}
x.strokeStyle=m&&o>.5?`rgba(201,242,107,${.4+.6*o})`:`rgba(236,234,226,${.06+.45*o*(m?1:.15)+.08*(1-o)})`;x.lineWidth=(m&&o>.5?2.4:1)*D;x.stroke()}
if(!rm)requestAnimationFrame(t)}t();