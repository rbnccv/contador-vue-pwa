if ("serviceWorker" in navigator)
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Service Worker registrado correctamente!!!"))
    .catch((err) => console.log(err));
