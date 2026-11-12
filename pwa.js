(() => {
  const installButton = document.getElementById("pwaInstallBtn");
  let installPrompt = null;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const ios = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}), { once: true });
  }
  if (!installButton || standalone) return;
  if (ios) installButton.hidden = false;
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
  });
  installButton.addEventListener("click", async () => {
    if (!installPrompt) {
      if (ios) window.alert("Para instalarla en iPhone o iPad: pulsa Compartir y elige «Añadir a pantalla de inicio».");
      return;
    }
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installButton.hidden = true;
  });
  window.addEventListener("appinstalled", () => { installButton.hidden = true; });
})();

