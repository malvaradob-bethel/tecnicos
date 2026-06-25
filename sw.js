/* ════════════════════════════════════════════════════════════════
 *  BETHEL · Registro de Operaciones — Service Worker
 *  Permite que la app funcione sin conexión y se instale como PWA.
 *
 *  IMPORTANTE: el número de versión (CACHE_VER) debe subirse cada vez
 *  que se actualiza la app, para forzar que todos los dispositivos
 *  descarguen la versión nueva.
 * ════════════════════════════════════════════════════════════════ */

const CACHE_VER = 'bethel-v10';
const CACHE_NAME = 'registro-ops-' + CACHE_VER;

// Archivos que se guardan para uso sin conexión
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-128.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/yape-qr.png',
  './icons/logo-radio-white.png',
  './icons/logo-canal-white.png'
];

// ── Instalación: precachea los archivos base ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activación: borra cachés viejas de versiones anteriores ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k.startsWith('registro-ops-') && k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: estrategia según el destino ──
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // NUNCA cachear llamadas a Google Apps Script (datos en vivo):
  // siempre van directo a la red para traer/enviar datos frescos.
  if (url.includes('script.google.com') || url.includes('script.googleusercontent.com')) {
    return; // deja que el navegador la maneje normalmente
  }

  // Solo manejamos peticiones GET de nuestro propio origen
  if (event.request.method !== 'GET') return;

  // Estrategia "network-first" para el HTML (así ven la versión nueva si hay internet),
  // con respaldo a caché si no hay conexión.
  if (event.request.mode === 'navigate' || url.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
          return resp;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Para iconos y demás recursos: "cache-first" (rápido y funciona offline)
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
        return resp;
      }).catch(() => cached)
    )
  );
});
