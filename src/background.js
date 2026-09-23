/*=== 背景腳本：僅提供 popup 開關清單抓取 favicon ===*/

async function blobToDataUrl(blob) {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return `data:${blob.type || 'image/x-icon'};base64,${base64}`;
}

async function fetchFaviconAsDataUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  return blobToDataUrl(blob);
}

// ── 訊息監聽 ──────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message.from || message.to !== 'background.js' || !message.type) { return true; }

  (async () => {
    if (message.type === 'getFavicon') {
      try {
        const dataUrl = await fetchFaviconAsDataUrl(message.data.url);
        sendResponse({ from: 'background.js', to: message.from, type: 'RESPONSE', data: { dataUrl } });
      } catch (_) {
        sendResponse({ from: 'background.js', to: message.from, type: 'RESPONSE', data: { dataUrl: null } });
      }
      return;
    }

    sendResponse({ from: 'background.js', to: message.from, type: 'RESPONSE', data: { status: 'error', error: `未知的訊息類型：${message.type}` } });
  })();

  return true;
});
