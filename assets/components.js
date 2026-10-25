async function loadComponent(selector, path) {
  const placeholder = document.querySelector(selector);
  if (!placeholder) return;

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}: ${response.status}`);
  }

  placeholder.outerHTML = await response.text();
}

const components = [
  loadComponent("[data-component='footer']", "components/footer.html"),
  loadComponent("[data-component='contact']", "components/contact.html"),
];

Promise.allSettled(components).then((results) => {
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Unable to load a page component.", result.reason);
    }
  });

  if (window.location.hash === "#contact") {
    document.getElementById("contact")?.scrollIntoView();
  }

  window.dispatchEvent(new Event("components:loaded"));
});
