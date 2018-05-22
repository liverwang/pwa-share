// 缓存名称
const SW_PRECACHE_KEY = 'SW_PRECACHE_KEY'
const SW_RUNTIME_CACHE_KEY = 'SW_RUNTIME_CACHE_KEY'
// 缓存静态资源内容
const SW_CACHE_LIST = ['index.html', 'main.css', 'icon.png', 'manifest.json']

// 安装：新建缓存SW_PRECACHE_KEY，提取SW_CACHE_LIST资源写入缓存
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches
      .open(SW_PRECACHE_KEY)
      .then(function (cache) {
        return cache.addAll(SW_CACHE_LIST)
      })
      .then(function () {
        return self.skipWaiting()
      })
  )
})

//  请求拦截：如果缓存有匹配则从service worker返回，否则进行网络请求
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      // 如果service worker中有缓存的请求，则直接返回请求内容
      if (response != null) {
        console.log('return cache response', e.request.url)
        return response
      }

      console.log('return real request:', e.request.url)
      // 运行时缓存写入
      return caches.open(SW_RUNTIME_CACHE_KEY).then(cache => {
        return fetch(e.request).then(response => {
          // Put a copy of the response in the runtime cache.
          return cache.put(e.request, response.clone()).then(() => {
            return response;
          });
        });
      });
    })
  )
})

//  更新：有新版本要删除旧的缓存数据
self.addEventListener('activate', function (e) {
  const currentCaches =[SW_PRECACHE_KEY, SW_RUNTIME_CACHE_KEY]
  e.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim(),
      // 清理旧版本
      caches.keys().then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
    ])
  )
})

