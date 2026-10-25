document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.id !== "cf") return;

  event.preventDefault();
  const data = new FormData(form);
  if (data.get("website")) return;

  const body = `Name: ${data.get("name")}\nOrganization: ${data.get("org")}\nEmail: ${data.get("email")}\n\n${data.get("msg")}`;
  window.location.href =
    "mailto:hello@varnio.co.in?subject=" +
    encodeURIComponent(`Conversation with Varnio — ${data.get("name")}`) +
    "&body=" +
    encodeURIComponent(body);
  document.getElementById("ok").hidden = false;
});
