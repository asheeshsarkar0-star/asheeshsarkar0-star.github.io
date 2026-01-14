const CACHE_NAME = "asheesh-cache-v3";

const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",

  // Images
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/file_00000000650c7209b41d602902782a9a.png",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/file_000000005034720792453fffe09544aa%20(1).png",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/file_0000000067c87207a6d265ab32f0a34c.png",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/file_00000000862c71fa8ef54358a8a6c2ea.png",

  // Songs
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Prem%20Ki%20Vyatha%202.mp3",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Dhakano%20Ki%20Guzaarish.mp3",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Tere%20Ishq%20Me.mp3",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Teri%20Baahon%20Me%20Khoya%20Hu%20.mp3",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Palko%20Me%20Chupa%20Lu%20.mp3",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Tere%20Naam%20Ki%20Dhadkan%20.mp3",
  "https://raw.githubusercontent.com/asheeshsarkar0-star/asheeshsarkar0-star.github.io/main/Tujhse%20Juraa%20Har%20Pal%20.mp3"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate (delete old caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("/offline.html"))
      );
    })
  );
});
