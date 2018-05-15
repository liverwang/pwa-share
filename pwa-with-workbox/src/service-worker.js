workbox.skipWaiting()
workbox.clientsClaim()

// 设置缓存策略
workbox.routing.registerRoute(
  '/',
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('https://liverwang.github.io/pwa-share/data.json'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.precaching.precacheAndRoute(self.__precacheManifest)