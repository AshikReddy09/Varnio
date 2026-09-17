const loader = document.querySelector('#loader');
const canvas = document.querySelector('#network');
const context = canvas?.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => window.setTimeout(() => loader?.classList.add('is-done'), reducedMotion ? 0 : 650));

const pointer = { x: 0, y: 0, active: false };
const nodes = [];
let animationFrame;

function resizeCanvas() {
  if (!canvas || !context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1 : 1.5);
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createNodes() {
  nodes.length = 0;
  const count = window.innerWidth < 700 ? 24 : 52;
  for (let index = 0; index < count; index += 1) nodes.push({ x: Math.random() * canvas.clientWidth, y: Math.random() * canvas.clientHeight, vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .14, radius: Math.random() * 1.6 + .7 });
}

function renderNetwork() {
  if (!canvas || !context || reducedMotion) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);
  nodes.forEach((node) => {
    node.x += node.vx; node.y += node.vy;
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
    if (pointer.active) {
      const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
      if (distance < 180) { node.x -= (pointer.x - node.x) * .0008; node.y -= (pointer.y - node.y) * .0008; }
    }
  });
  nodes.forEach((node, index) => {
    nodes.slice(index + 1).forEach((other) => {
      const distance = Math.hypot(node.x - other.x, node.y - other.y);
      if (distance < 145) { context.strokeStyle = `rgba(216, 244, 90, ${.16 * (1 - distance / 145)})`; context.lineWidth = .6; context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(other.x, other.y); context.stroke(); }
    });
    context.fillStyle = 'rgba(233, 232, 225, .7)'; context.beginPath(); context.arc(node.x, node.y, node.radius, 0, Math.PI * 2); context.fill();
  });
  animationFrame = requestAnimationFrame(renderNetwork);
}

if (canvas && context) {
  resizeCanvas(); createNodes(); renderNetwork();
  window.addEventListener('resize', () => { resizeCanvas(); createNodes(); });
  canvas.addEventListener('pointermove', (event) => { const bounds = canvas.getBoundingClientRect(); pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top; pointer.active = true; });
  canvas.addEventListener('pointerleave', () => { pointer.active = false; });
}

const capabilityDetails = {
  strategy: { title: 'Strategy & Advisory', solve: 'Unclear technology direction, competing priorities and uncertain investment decisions.', approach: 'Assessment → strategic options → recommendation → roadmap', deliverables: 'Technology strategy, assessment, roadmap and build-vs-buy recommendation.' },
  planning: { title: 'Project & Organizational Planning', solve: 'Initiatives without clear scope, ownership, resources, governance or sequence.', approach: 'Project strategy → delivery plan → team structure → governance', deliverables: 'Project plan, resource model, risk register, dependency map and delivery roadmap.' },
  crm: { title: 'CRM & Business Process Strategy', solve: 'Customer and operational processes that are disconnected, manual or poorly supported by platforms.', approach: 'Assessment → journey mapping → process design → platform direction', deliverables: 'CRM assessment, process design, platform evaluation and integration roadmap.' },
  automation: { title: 'Automation Strategy', solve: 'Repetitive, high-friction work where automation may help but the opportunity is not yet clear.', approach: 'Process assessment → opportunity analysis → workflow design → roadmap', deliverables: 'Automation opportunities, target workflows, platform evaluation and implementation path.' },
  architecture: { title: 'Solution Architecture', solve: 'Technology choices that need to be coherent, scalable and connected to a real operating model.', approach: 'Business intent → system boundaries → architecture → technical assessment', deliverables: 'Application, system, integration, data and platform architecture.' },
  digital: { title: 'Digital Solutions', solve: 'A defined requirement that needs to become a useful, maintainable digital product or internal system.', approach: 'Requirements → solution design → implementation → quality assurance', deliverables: 'Websites, applications, internal tools, dashboards, platforms and integrations.' },
  intelligent: { title: 'Automation & Intelligent Solutions', solve: 'Teams that need leverage across workflows, documents, reporting, CRM or decision support.', approach: 'Workflow assessment → responsible AI opportunity → design → integration', deliverables: 'Workflow automation, AI-enabled workflows, assistants, document flows and reporting.' },
  optimization: { title: 'Optimization & Continuous Advisory', solve: 'Existing technology or processes that have drifted, slowed down or no longer fit the business.', approach: 'Review → prioritization → improvement → continuous advisory', deliverables: 'Architecture reviews, technology optimization, process improvement and ongoing advice.' }
};

const capabilityDetail = document.querySelector('#capabilityDetail');
const mapCore = document.querySelector('#mapCore');

function renderCapability(key) {
  const detail = capabilityDetails[key];
  if (!detail || !capabilityDetail) return;
  capabilityDetail.innerHTML = `<h3>${detail.title}</h3><span class="detail-label">What we solve</span><p>${detail.solve}</p><span class="detail-label">What Varnio does</span><p>${detail.approach}</p><span class="detail-label">What you receive</span><p>${detail.deliverables}</p>`;
}

document.querySelectorAll('.capability').forEach((button) => {
  const activate = () => {
    document.querySelectorAll('.capability').forEach((item) => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
    renderCapability(button.dataset.capability);
    mapCore?.classList.add('is-focused');
    window.setTimeout(() => mapCore?.classList.remove('is-focused'), reducedMotion ? 0 : 420);
  };
  button.addEventListener('click', activate);
  button.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover)').matches) renderCapability(button.dataset.capability); });
});
renderCapability('strategy');

const architectureDetails = {
  objective: { title: 'Business objective', question: 'What needs to change?', text: 'Varnio begins with the business outcome rather than technology. We define the change, its value, its constraints and the decisions that must be made.', next: 'This objective sets the direction for the operating model.' },
  experience: { title: 'Experience & operating model', question: 'How should work feel?', text: 'We make the people, processes and responsibilities visible. The system should support how the organization actually works, not force a convenient diagram onto it.', next: 'The operating model informs what applications need to do.' },
  application: { title: 'Application layer', question: 'Where does work get done?', text: 'We shape the products, business applications and internal tools that enable the work, keeping their roles and boundaries clear.', next: 'Applications depend on reliable connections to adjacent systems.' },
  integration: { title: 'Integration layer', question: 'How do systems connect?', text: 'We define APIs, events and system relationships so information can move with purpose instead of being copied, trapped or reconciled by hand.', next: 'Good integration creates the conditions for trusted data.' },
  data: { title: 'Data & intelligence', question: 'What does the system know?', text: 'We consider data ownership, quality, access and interpretation. AI and automation are useful only when the underlying information and decisions are understood.', next: 'Data requirements shape the infrastructure beneath them.' },
  infrastructure: { title: 'Infrastructure', question: 'What keeps it moving?', text: 'We assess the platform, security, resilience, scalability and operational needs that keep the solution dependable as usage and complexity grow.', next: 'Infrastructure closes the loop, but the business objective remains the test.' }
};

const architectureDetail = document.querySelector('#architectureDetail');
function renderArchitecture(key) {
  const detail = architectureDetails[key];
  if (!detail || !architectureDetail) return;
  architectureDetail.innerHTML = `<h3>${detail.title}</h3><p class="detail-next">${detail.question}</p><p>${detail.text}</p><h4>Relationship to the next layer</h4><p>${detail.next}</p>`;
}

document.querySelectorAll('.layer').forEach((layer) => layer.addEventListener('click', () => {
  document.querySelectorAll('.layer').forEach((item) => { const active = item === layer; item.classList.toggle('layer--active', active); item.setAttribute('aria-selected', active ? 'true' : 'false'); });
  renderArchitecture(layer.dataset.layer);
}));
renderArchitecture('objective');

window.addEventListener('beforeunload', () => cancelAnimationFrame(animationFrame));

const footer = document.querySelector('.site-footer');
const footerMark = document.querySelector('.footer__mark');
const footerCta = document.querySelector('.footer__cta');

if (footer && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
  footer.addEventListener('pointermove', (event) => {
    const bounds = footer.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    footer.style.setProperty('--footer-mark-x', `${x * 12}px`);
    footer.style.setProperty('--footer-mark-y', `${y * 8}px`);
  });
  footer.addEventListener('pointerleave', () => {
    footer.style.setProperty('--footer-mark-x', '0px');
    footer.style.setProperty('--footer-mark-y', '0px');
  });
}

if (footerCta && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
  footerCta.addEventListener('pointermove', (event) => {
    const bounds = footerCta.getBoundingClientRect();
    footerCta.style.setProperty('--cta-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 5}px`);
    footerCta.style.setProperty('--cta-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 3}px`);
  });
  footerCta.addEventListener('pointerleave', () => { footerCta.style.setProperty('--cta-x', '0px'); footerCta.style.setProperty('--cta-y', '0px'); });
}