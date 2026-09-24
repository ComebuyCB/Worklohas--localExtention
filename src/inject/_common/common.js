/*=== Worklohas 擴充功能 共用工具 ===*/

const wlLog = console.log.bind(console, '%c[WL]%c', 'color:#00bcd4;font-weight:bold', '')

function wlOnce(key, fn) {
  if (!window.__wl_injected) window.__wl_injected = {}
  if (window.__wl_injected[key]) return
  window.__wl_injected[key] = true
  fn()
}

// 統一的 content.js 訊息監聽器，自動 log 收到的訊息類型
// 用法: wlMessage({ INIT(event) { ... }, UPDATE(event) { ... } })
// event 為原始 MessageEvent，event.data 為訊息物件，event.data.data 為 payload
function wlMessage(handlers) {
  window.addEventListener('message', (event) => {
    if (event.source !== window) return
    const { from, type } = event.data ?? {}
    if (from !== 'content.js' || !type) return
    if (handlers[type]) {
      wlLog(`[message] ${type}`)
      handlers[type](event)
    }
  })
}

// 將時間戳（ms）轉為相對時間，例如「3 分鐘前」「昨天」
const wlRelativeTimeFormatter = new Intl.RelativeTimeFormat('zh-TW', { numeric: 'auto' })
const WL_RELATIVE_TIME_DIVISIONS = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 30, unit: 'day' },
  { amount: 12, unit: 'month' },
  { amount: Infinity, unit: 'year' },
]

function wlRelativeTime(unixMs) {
  let duration = (unixMs - Date.now()) / 1000
  for (const division of WL_RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return wlRelativeTimeFormatter.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }
}
