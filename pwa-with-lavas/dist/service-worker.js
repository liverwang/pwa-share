importScripts('/static/js/workbox-sw.prod.v2.1.3.js');/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author 王玉龙(live_wang@live.cn)
 */

/* globals WorkboxSW */

const workboxSW = new WorkboxSW({
    cacheId: 'lavas-cache',
    ignoreUrlParametersMatching: [/^utm_/],
    skipWaiting: true,
    clientsClaim: true
})

// Define precache injection point.
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "5ffaaa7f71c9602228f9901f018b435a"
  },
  {
    "url": "/static/css/index.e0d49d3e.css"
  },
  {
    "url": "/static/js/index.80ed3b99.js"
  },
  {
    "url": "/static/js/manifest.7253881e.js"
  },
  {
    "url": "/static/js/vendor.13b80a24.js"
  },
  {
    "url": "/static/js/vue.353db202.js"
  },
  {
    "url": "/static/js/workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  }
])

// networkFirst 缓存策略，在网络正常时会请求网络并更新缓存；否则会使用缓存内容
workboxSW.router.registerRoute(
    new RegExp('https://query.yahooapis.com/v1/public/yql'),
    workboxSW.strategies.networkFirst()
)

/**
 * example runningCache with api
 */
// workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workboxSW.strategies.networkFirst());

/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
// workboxSW.router.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
//     workboxSW.strategies.cacheFirst({
//         cacheName: 'lavas-cache-images',
//         cacheExpiration: {
//             maxEntries: 100,
//             maxAgeSeconds: 7 * 24 * 60 * 60
//         },
//         cacheableResponse: {
//             statuses: [0, 200]
//         }
//     })
// );
workboxSW.router.registerNavigationRoute('/index.html');