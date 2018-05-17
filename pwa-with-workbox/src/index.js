import styles from './main.css'

// 数据源请求
const API = 'https://liverwang.github.io/pwa-share/data.json'
let weatherStatus = document.getElementById('weather-status')

fetch(API).then(response => {
  return response.json()
}).then(data => {
  let topicWrapper = document.getElementById('topic-list')
  data.map((news, index) => {
    let topicItem = document.createElement('div')
    topicItem.innerText = `${index+1}. ${news.title}` 
    topicWrapper.appendChild(topicItem)
  })
})

var statusEl = document.getElementById('network-status')
var notification = document.getElementById('notification')
window.addEventListener('offline', () => {
  statusEl.innerText = 'Offline'
  notification.innerText = '网络连接异常'
  notification.classList.add('offline')
  setTimeout(() => {
    notification.classList.remove('offline')
  }, 1000)
})

window.addEventListener('online', () => {
  statusEl.innerText = 'Online'
  notification.innerText = '网络连接正常'
  notification.classList.add('online')
  setTimeout(() => {
    notification.classList.remove('online')
  }, 1000)
})

if (!navigator.onLine) {
  statusEl.innerText = 'Offline'
}

// 注册service-worker
// if (navigator.serviceWorker != null) {
//   navigator.serviceWorker.register('./service-worker.js')
//     .then(function (registration) {
//       console.log('service-worker regist success at scope: ', registration.scope);
//     });
// }