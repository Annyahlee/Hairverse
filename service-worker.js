const CACHE_NAME = "hairverse-cache-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Instala o service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(error => {
        console.error("Falha ao adicionar arquivos ao cache:", error);
      });
    })
  );
});

// Ativa o service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Intercepta as requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se o arquivo estiver no cache, retorna o cache
      if (response) {
        return response;
      }
      
      // Se não estiver no cache, tenta buscar na rede
      return fetch(event.request).catch(error => {
        console.error("Erro ao buscar a requisição", error);
        return new Response("Arquivo não encontrado", { status: 404 });
      });
    })
  );
});
