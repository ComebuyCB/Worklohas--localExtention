/**
 * 網站配置
 *
 * paths[].url 匹配規則:
 * - "example.com/page"      精確匹配 hostname + path
 * - "example.com/blog*"     前綴匹配，結尾 * 匹配 /blog、/blog/post-1 等
 * - "example.com/"          精確匹配 hostname 且僅限根路徑 "/"，不匹配其他子路徑
 * - "example.com"           僅匹配 hostname，不限制路徑（比對所有路徑）
 * - "*.example.com/*"       萬用字元主機，匹配所有子網域的所有路徑
 * - "*.example.com/admin*"  萬用字元主機 + 前綴路徑匹配
 *
 * 最外層 key 為識別名稱，僅作為 toggleKey 預設值，不參與 URL 比對。
 * toggleKey: 多個 entry 共用同一開關時設定相同值（預設使用 key）
 *
 * info.title:       toggleInject 顯示的功能名稱
 * info.description: toggleInject 顯示的說明文字
 * info.group:       toggleInject 分組標籤，無值時不分組
 * info.quickLink:   toggleInject 顯示的連結，無值時不顯示連結
 * info.favicon:     toggleInject 顯示的圖示，無值時 fallback 抓 primaryHost 的 favicon.ico
 *
 * paths[].features: 識別到以下字串就啟用對應行為，為陣列，沒有可以不寫
 * - "spa":    content.js 會針對該路徑掛 SPA URL 變化監聽
 * - "jquery": 該路徑額外注入 jQuery（提供 window.$ / window.jQuery），
 *             僅限確認過該網站沒有自己的 $ 衝突時才開啟
 *
 * paths[].init(send):      注入腳本載入後，content.js 呼叫此 function 取得初始資料再送 INIT
 * paths[].onMessage[type]: inject 腳本送來特定 type 時，由此處理（取代 content.js 的寫死邏輯）
 */
const inject_sites = {
  "line-today": {
    "info": {
      "title": "LINE Today 留言快速載入",
      "description": "文章頁留言快速載入，繞過原生每次 5 則的捲動限制，並可切換 最新/熱門；左側面板可批次讀取文章、留言並匯出 JSON / Word",
      "group": "",
      "quickLink": "https://today.line.me/tw/v3/tab"
    },
    "paths": [
      {
        // 全站注入：article.js 自行依 DOM 判斷是否為文章頁；index.js 批次面板於所有頁面顯示
        "url": "today.line.me",
        "features": ["spa"],
        "inject": {
          "css": ["src/inject/today.line.me/tw/v3/article.css", "src/inject/today.line.me/tw/v3/index.css"],
          "js": ["src/inject/today.line.me/tw/v3/article.js", "src/inject/today.line.me/tw/v3/index.js"]
        }
      }
    ]
  },
  "591": {
    "info": {
      "title": "591 房屋網",
      "description": "591 租屋網 / 買屋網表格化",
      "group": "",
      "quickLink": "https://rent.591.com.tw/list"
    },
    "paths": [
      {
        "url": "rent.591.com.tw/list",
        "features": ["spa", "jquery"],
        "inject": {
          "css": ["src/inject/591.com.tw/rent.css"],
          "js": ["src/inject/591.com.tw/rent.js"]
        }
      },
      {
        "url": "sale.591.com.tw/",
        "features": ["spa", "jquery"],
        "inject": {
          "css": ["src/inject/591.com.tw/sale.css"],
          "js": ["src/inject/591.com.tw/sale.js"]
        }
      }
    ]
  }
}

var SITE_CONFIGS = inject_sites;
