const caps = [
  "Digital Transformation",
  "Project & Organizational Planning",
  "Business Process Strategy",
  "Automation Strategy",
  "Solution Architecture",
  "Digital Solutions",
  "Intelligent Automation",
];
const row = caps.map((t) => `<span>${t}</span><b>✦</b>`).join("");
const mqe = document.getElementById("mq");
if (mqe) mqe.innerHTML = row + row;
const io = new IntersectionObserver(
  (e) =>
    e.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.15 },
);
function observeRevealElements() {
  document.querySelectorAll(".rv:not(.in)").forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 0.1 + "s";
    io.observe(el);
  });
}
observeRevealElements();
window.addEventListener("components:loaded", observeRevealElements);

const methodSection = document.getElementById("method");
if (methodSection) {
  const triggers = [...methodSection.querySelectorAll(".method-trigger")];
  const progress = methodSection.querySelector(".progress-track");
  const progressFill = methodSection.querySelector(".progress-fill");
  const progressCount = methodSection.querySelector(".progress-count");
  const progressLabel = methodSection.querySelector(".method-progress");

  function setActiveMethod(trigger) {
    const activeStep = trigger ? Number(trigger.dataset.step) : 0;
    triggers.forEach((item) => {
      const isActive = item === trigger;
      const card = item.closest(".method-card");
      const details = methodSection.querySelector(
        `#${item.getAttribute("aria-controls")}`,
      );
      item.setAttribute("aria-expanded", String(isActive));
      card.classList.toggle("is-active", isActive);
      details.setAttribute("aria-hidden", String(!isActive));
    });
    if (progress) progress.setAttribute("aria-valuenow", String(activeStep));
    if (progressFill) {
      progressFill.style.width = `${(activeStep / triggers.length) * 100}%`;
    }
    if (progressCount) {
      progressCount.textContent = `${String(activeStep).padStart(2, "0")} / ${String(triggers.length).padStart(2, "0")}`;
    }
    if (progressLabel) {
      progressLabel.setAttribute(
        "aria-label",
        `Process step ${activeStep} of ${triggers.length}`,
      );
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      setActiveMethod(
        trigger.getAttribute("aria-expanded") === "true" ? null : trigger,
      );
    });
  });
}

const bar = document.getElementById("bar");
addEventListener(
  "scroll",
  () => {
    bar.style.width =
      (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100 +
      "%";
  },
  { passive: true },
);

(() => {
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches,
    rail = document.getElementById("rail"),
    mqp = document.querySelector(".mq"),
    sp = [...document.querySelectorAll(".vis svg,.orb svg")];
  let ly = scrollY,
    v = 0;
  document.querySelectorAll(".tilt").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
  const co = new IntersectionObserver(
    (es) =>
      es.forEach((x) => {
        if (x.isIntersecting) {
          const el = x.target,
            n = +el.dataset.n,
            t0 = performance.now();
          (function s(t) {
            const k = Math.min(1, (t - t0) / 1400);
            el.firstChild.nodeValue = Math.round(n * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(s);
          })(t0);
          co.unobserve(el);
        }
      }),
    { threshold: 0.6 },
  );
  document.querySelectorAll("[data-n]").forEach((e) => co.observe(e));
  if (rm) return;
  (function fr() {
    const y = scrollY,
      p = y / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    v += (y - ly - v) * 0.12;
    ly = y;
    if (rail) rail.style.transform = `translateY(${p * (innerHeight - 8)}px)`;
    if (mqp)
      mqp.style.transform = `skewX(${Math.max(-8, Math.min(8, -v * 0.25))}deg)`;
    sp.forEach((e) => {
      const r = e.parentElement.getBoundingClientRect();
      e.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -0.06}px)`;
    });
    requestAnimationFrame(fr);
  })();
})();
