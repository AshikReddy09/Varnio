(() => {
  const loader = document.getElementById("site-loader");

  if (!loader) {
    document.body.classList.remove("loading");
    return;
  }

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startedAt = performance.now();
  const minimumIntro = reducedMotion ? 0 : 650;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;

    window.setTimeout(() => {
      document.body.classList.remove("loading");
      loader.classList.add("is-exiting");

      if (reducedMotion) {
        loader.remove();
        return;
      }

      const removeLoader = (event) => {
        if (event && event.propertyName !== "--reveal-radius") return;
        loader.remove();
      };

      loader.addEventListener("transitionend", removeLoader);
      window.setTimeout(removeLoader, 950);
    }, Math.max(0, minimumIntro - (performance.now() - startedAt)));
  };

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }

  window.setTimeout(finish, 12000);
})();
