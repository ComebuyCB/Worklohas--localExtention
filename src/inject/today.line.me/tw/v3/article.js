/*=== LINE Today 文章頁留言快速載入 ===*/

wlOnce('today.line.me/tw/v3/article', () => {
  wlLog('LINE Today 留言載入器 已載入');

  const PAGE_SIZE = 5;
  const REQUEST_DELAY = 400;
  const API_PATH_BY_SORT = {
    latest: '/webapi/social-feed/post/listing/latest',
    popular: '/webapi/social-feed/post/listing/popular',
  };
  const API_ORIGIN = 'https://today.line.me';
  const SORT_LABELS = { latest: '最新', popular: '熱門' };
  const ICON_POST = '<svg height="24" width="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.9 2.867a1.9 1.9 0 0 0-1.9 1.9V17c0 1.05.85 1.9 1.9 1.9h.8v1.872a.9.9 0 0 0 1.556.615L9.59 18.9h9.51A1.9 1.9 0 0 0 21 17V4.767a1.9 1.9 0 0 0-1.9-1.9H4.9Zm-.1 1.9a.1.1 0 0 1 .1-.1h14.2a.1.1 0 0 1 .1.1V17a.1.1 0 0 1-.1.1H9.2a.9.9 0 0 0-.656.284L7.5 18.497V18a.9.9 0 0 0-.9-.9H4.9a.1.1 0 0 1-.1-.1V4.767Z M8.248 7.9h2.861l.093.091v3.835c0 1.278-1.108 2.374-2.4 2.374H8.34v-1.187h.37c.553 0 .922-.457.922-1.004v-.64H7.786c-.092 0-.184 0-.184-.09v-2.74c0-.365.276-.64.646-.64Zm8.062 0h-2.862a.628.628 0 0 0-.646.639v2.74c0 .09.092.09.184.09h1.846v.64c0 .547-.369 1.004-.923 1.004h-.369V14.2h.462c1.292 0 2.4-1.096 2.4-2.374V7.991l-.093-.091Z" fill="currentColor"></path></svg>';
  const ICON_LIKE = '<svg height="18" width="18" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 9.74998C8 9.11483 8.51486 8.59998 9.15 8.59998C9.78503 8.59998 10.3 9.11482 10.3 9.74998C10.3 10.3851 9.78503 10.9 9.15 10.9C8.51486 10.9 8 10.3851 8 9.74998Z" fill="currentColor"></path><path d="M8.59423 13.0058C8.97151 12.7884 9.45439 12.9166 9.67277 13.2921C10.1502 14.1132 11.0297 14.6287 12.0002 14.6287C12.9707 14.6287 13.8501 14.1132 14.3276 13.2921C14.546 12.9166 15.0289 12.7884 15.4062 13.0058C15.7834 13.2231 15.9123 13.7037 15.6939 14.0793C14.9371 15.3806 13.5399 16.2 12.0002 16.2C10.4604 16.2 9.06333 15.3806 8.30651 14.0793C8.08813 13.7037 8.21695 13.2231 8.59423 13.0058Z" fill="currentColor"></path><path d="M13.7002 9.74998C13.7002 9.11483 14.2151 8.59998 14.8502 8.59998C15.4852 8.59998 16.0002 9.11482 16.0002 9.74998C16.0002 10.3851 15.4852 10.9 14.8502 10.9C14.2151 10.9 13.7002 10.3851 13.7002 9.74998Z" fill="currentColor"></path><path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM12 3.8C7.47126 3.8 3.8 7.47126 3.8 12C3.8 16.5287 7.47126 20.2 12 20.2C16.5287 20.2 20.2 16.5287 20.2 12C20.2 7.47126 16.5287 3.8 12 3.8Z" fill="currentColor" fill-rule="evenodd"></path></svg>';
  const ICON_COMMENT = '<svg height="18" width="18" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1061_6536)"><path d="M17.0773 7.45877C16.4381 4.60204 13.9077 2.47614 9.70763 2.47614C4.8047 2.47614 2 5.6433 2 9.99976C2 12.7347 3.68222 15.0766 4.9341 16.4409C5.44591 16.9986 5.88579 17.3929 6.10939 17.5838L6.2667 17.7143C6.2667 17.7143 6.34246 17.4525 6.51742 17.1059L6.5358 17.0699C6.67446 16.8014 6.87129 16.4871 7.13668 16.2057C7.33725 15.9931 7.57698 15.7992 7.86036 15.6581C8.26645 17.5752 9.44067 19.1959 10.3872 20.2446C10.9 20.8127 11.3459 21.213 11.5667 21.4015L11.7142 21.5239C11.7142 21.5239 11.7852 21.2784 11.9493 20.9535L11.9665 20.9198C12.1092 20.6433 12.3177 20.3151 12.6049 20.0329C12.9764 19.6678 13.4796 19.3795 14.1423 19.3795L16.2857 19.3715C19.42 19.3715 22 16.6557 22 13.3052C22 10.5177 20.2957 8.16986 17.0773 7.45877ZM17.2307 9.27139C17.0705 12.6948 14.3846 15.4185 11.1429 15.4185L9.56481 15.4243C9.7796 16.3355 10.229 17.207 10.7747 17.9877C10.9835 18.2865 11.1988 18.5611 11.4076 18.8076C12.0147 18.2129 12.9112 17.6662 14.139 17.6652H14.1423L16.2857 17.6572C18.3822 17.6572 20.2857 15.8025 20.2857 13.3052C20.2857 12.0631 19.8381 11.019 19.0315 10.2751C18.5891 9.86705 17.9959 9.51098 17.2307 9.27139ZM8.85671 13.7127L8.85307 13.7127C7.52202 13.7138 6.56553 14.3335 5.93324 14.9854C5.68355 14.6962 5.4228 14.3684 5.17089 14.0079C4.34413 12.825 3.7143 11.437 3.7143 9.99976C3.7143 8.19122 4.29075 6.76911 5.23757 5.80622C6.17755 4.85028 7.63632 4.19043 9.70763 4.19043C11.8205 4.19043 13.2579 4.80952 14.1493 5.63161C15.0353 6.44871 15.5239 7.59392 15.5239 8.94773C15.5239 11.6684 13.4484 13.7042 11.1429 13.7042L8.85671 13.7127Z" fill="currentColor" fill-rule="evenodd"></path></g><defs><clipPath id="clip0_1061_6536"><rect height="24" width="24" fill="currentColor"></rect></clipPath></defs></svg>';
  const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ccc"/><circle cx="16" cy="13" r="6" fill="#fff"/><path d="M4 30c1.5-7 8-11 12-11s10.5 4 12 11" fill="#fff"/></svg>`);
  const ICON_PAUSE = '<svg height="16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>';
  const ICON_REFRESH = '<svg height="16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M20 4v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const ICON_LOADING = '<span class="wl_dots"><i></i><i></i><i></i></span>';

  let params = null;
  let currentAnchorId = null;
  let cursor = null;
  let hasNext = true;
  let isPaused = false;
  let panelOpen = false;
  let totalLoaded = 0;
  let totalCount = 0;
  let currentSort = 'latest';
  let loadSession = 0;
  let isCollapsed = false;  // 面板收合狀態，換文章重建面板時沿用
  let panelEl, listEl, countEl, pauseBtn, collapseBtn, tabLatestBtn, tabPopularBtn;

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function renderCountLabel(loaded, total) {
    return `${ICON_POST}貼文 (${loaded}/${total})`;
  }

  // 產生「頭像 + 姓名／時間」共用區塊，留言與回覆共用同一份渲染邏輯
  function renderUserHead(author, timeMs) {
    const avatarUrl = author?.thumbnail?.url || DEFAULT_AVATAR;
    return `
      <img class="wl_avatar" src="${avatarUrl}" alt="">
      <div class="wl_userInfo">
        <span class="_name">${author?.name ?? '匿名'}</span>
        <span class="_time">${wlRelativeTime(timeMs)}</span>
      </div>
    `;
  }

  // 頭像圖片載入失敗時，改用預設 avatar（不用 inline onerror，避免受頁面 CSP 限制）
  function bindAvatarFallback(root) {
    root.querySelectorAll('.wl_avatar').forEach((img) => {
      img.addEventListener('error', () => { img.src = DEFAULT_AVATAR; }, { once: true });
    });
  }

  // 直接從 DOM 找文章錨點，不依賴網址：today.line.me 是 SPA，網址不一定會隨著
  // 「是否正在看文章」同步變化，用這個當作「目前是否在文章頁」的唯一真相來源
  function findArticleAnchor() {
    const container = document.querySelector('.page-content');
    if (!container) return null;
    const el = container.matches('[data-anchor-id]') ? container : container.querySelector('[data-anchor-id]');
    if (!el) return null;
    const attr = el.getAttribute('data-anchor-id') || '';
    const parts = attr.split(':');
    if (parts.length < 2 || !/^\d+$/.test(parts[1])) return null;
    return { type: parts[0].toUpperCase(), id: parts[1] };
  }

  function tryCaptureParamsFromDom() {
    const anchor = findArticleAnchor();
    if (!anchor) return false;
    params = {
      quoteContentId: anchor.id,
      quoteContentType: anchor.type,
      country: location.pathname.split('/').filter(Boolean)[0] || 'tw',
    };
    return true;
  }

  function tryCaptureParamsFromNetwork() {
    const entries = performance.getEntriesByType('resource');
    const hit = [...entries].reverse().find((e) =>
      Object.values(API_PATH_BY_SORT).some((path) => e.name.includes(path))
    );
    if (!hit) return false;
    const u = new URL(hit.name);
    params = {
      quoteContentId: u.searchParams.get('quoteContentId'),
      quoteContentType: u.searchParams.get('quoteContentType'),
      country: u.searchParams.get('country') || 'tw',
    };
    return true;
  }

  function buildUrl(sort, cursor, size) {
    const p = new URLSearchParams({
      country: params.country,
      quoteContentId: params.quoteContentId,
      quoteContentType: params.quoteContentType,
      size: String(size),
    });
    if (cursor) p.set('cursor', cursor);
    return `${API_ORIGIN}${API_PATH_BY_SORT[sort]}?${p.toString()}`;
  }

  function buildLikesUrl(postId) {
    const p = new URLSearchParams({ country: params.country, contentType: 'post', postId });
    return `${API_ORIGIN}/webapi/interaction/likes?${p.toString()}`;
  }

  function buildStatisticsUrl(postId) {
    const p = new URLSearchParams({ country: params.country, contentType: 'post', postId });
    return `${API_ORIGIN}/webapi/social-feed/statistics?${p.toString()}`;
  }

  function buildRepliesUrl(postId) {
    const p = new URLSearchParams({
      postId,
      sort: 'REACTION_COUNT',
      offset: '0',
      limit: '10',
      country: params.country,
    });
    return `${API_ORIGIN}/webapi/social-feed/replies?${p.toString()}`;
  }

  function updateTabsUI() {
    tabLatestBtn.classList.toggle('is_active', currentSort === 'latest');
    tabPopularBtn.classList.toggle('is_active', currentSort === 'popular');
  }

  // 事件委派：面板內容為動態產生，統一在 listEl 上監聽留言展開／收合
  function handleListClick(e) {
    const toggle = e.target.closest('.js-reply-toggle');
    if (!toggle || !toggle.classList.contains('is_clickable')) return;
    const repliesEl = toggle.closest('.wl_comment')?.querySelector('.js-comment-replies');
    repliesEl?.classList.toggle('is_show');
  }

  // 收合時只保留標題列，tabs / 留言列表 / 狀態鈕 由 CSS 隱藏
  function updateCollapseUI() {
    panelEl.classList.toggle('is_collapsed', isCollapsed);
    collapseBtn.textContent = isCollapsed ? '展開' : '收合';
    collapseBtn.setAttribute('aria-expanded', String(!isCollapsed));
  }

  function createPanel() {
    document.getElementById('__lineToday_commentPanel')?.remove();

    const panel = document.createElement('div');
    panel.id = '__lineToday_commentPanel';
    panel.className = 'wl_panel';
    panelEl = panel;

    const header = document.createElement('div');
    header.className = 'wl_panel--head';
    countEl = document.createElement('strong');
    countEl.className = 'wl_commentCount';
    countEl.innerHTML = renderCountLabel(0, 0);
    header.appendChild(countEl);

    collapseBtn = document.createElement('button');
    collapseBtn.className = 'wl_panelToggle';
    collapseBtn.type = 'button';
    collapseBtn.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      updateCollapseUI();
    });
    header.appendChild(collapseBtn);
    panel.appendChild(header);

    const tabsRow = document.createElement('div');
    tabsRow.className = 'wl_panel--tabs';
    tabLatestBtn = document.createElement('button');
    tabLatestBtn.className = 'wl_tabBtn';
    tabLatestBtn.textContent = SORT_LABELS.latest;
    tabLatestBtn.addEventListener('click', () => {
      if (currentSort === 'latest') return;
      startLoad('latest');
    });
    tabPopularBtn = document.createElement('button');
    tabPopularBtn.className = 'wl_tabBtn';
    tabPopularBtn.textContent = SORT_LABELS.popular;
    tabPopularBtn.addEventListener('click', () => {
      if (currentSort === 'popular') return;
      startLoad('popular');
    });
    tabsRow.appendChild(tabLatestBtn);
    tabsRow.appendChild(tabPopularBtn);
    panel.appendChild(tabsRow);
    updateTabsUI();

    listEl = document.createElement('div');
    listEl.className = 'wl_panel--list';
    listEl.addEventListener('click', handleListClick);
    panel.appendChild(listEl);

    pauseBtn = document.createElement('button');
    pauseBtn.addEventListener('click', () => {
      if (!hasNext) {
        startLoad(currentSort);
        return;
      }
      isPaused = !isPaused;
      updateStatusButton();
    });
    panel.appendChild(pauseBtn);

    updateCollapseUI();
    document.body.appendChild(panel);
  }

  // 底部狀態鈕：讀取中/暫停用同一顆按鈕切換，讀完/出錯則變成「重新開始」
  function updateStatusButton(hadError = false) {
    if (!hasNext) {
      pauseBtn.className = 'wl_statusBtn is_restart';
      pauseBtn.innerHTML = `${ICON_REFRESH}${hadError ? '讀取發生錯誤，重新開始' : '已無更多貼文，重新開始'}`;
      return;
    }
    if (isPaused) {
      pauseBtn.className = 'wl_statusBtn is_paused';
      pauseBtn.innerHTML = `${ICON_PAUSE}暫停載入`;
    } else {
      pauseBtn.className = 'wl_statusBtn is_loading';
      pauseBtn.innerHTML = `${ICON_LOADING}載入中`;
    }
  }

  function appendComments(comments, session) {
    comments.forEach((c) => {
      totalLoaded++;
      const item = document.createElement('div');
      item.className = 'wl_comment';
      item.innerHTML = `
        <div class="wl_comment--head">
          ${renderUserHead(c.author, c.publishTimeUnix)}
          <span class="wl_commentIndex">#${totalLoaded}</span>
        </div>
        <div class="wl_comment--body">${c.content?.text ?? ''}</div>
        <div class="wl_comment--meta js-comment-meta">統計載入中...</div>
        <div class="wl_comment--replies js-comment-replies"></div>
      `;
      bindAvatarFallback(item);
      listEl.appendChild(item);
      enrichPost(item, c, session);
    });
    countEl.innerHTML = renderCountLabel(totalLoaded, totalCount);
  }

  async function enrichPost(item, c, session) {
    try {
      const [likes, stats] = await Promise.all([
        fetch(buildLikesUrl(c.id)).then((r) => r.json()),
        fetch(buildStatisticsUrl(c.id)).then((r) => r.json()),
      ]);
      if (session !== loadSession || !item.isConnected) return;

      const metaEl = item.querySelector('.js-comment-meta');
      if (metaEl) {
        const hasReplies = stats.replyCount > 0;
        metaEl.innerHTML = `
          <span class="wl_stat${likes.count ? '' : ' is_zero'}">${ICON_LIKE}${likes.count ?? 0}</span>
          <span class="wl_replyToggle js-reply-toggle${hasReplies ? ' is_clickable' : ' is_zero'}">${ICON_COMMENT}${hasReplies ? stats.replyCount : ''}</span>
        `;
      }

      if (stats.replyCount > 0) {
        const replies = await fetch(buildRepliesUrl(c.id)).then((r) => r.json());
        if (session !== loadSession || !item.isConnected) return;
        renderReplies(item, replies.result || []);
      }
    } catch (e) {
      wlLog('❌ 留言統計載入失敗', e);
      if (session === loadSession && item.isConnected) {
        const metaEl = item.querySelector('.js-comment-meta');
        if (metaEl) metaEl.textContent = '統計載入失敗';
      }
    }
  }

  function renderReplies(item, replies) {
    const repliesEl = item.querySelector('.js-comment-replies');
    if (!repliesEl || !replies.length) return;
    replies.forEach((r) => {
      const replyEl = document.createElement('div');
      replyEl.className = 'wl_reply';
      replyEl.innerHTML = `
        <div class="wl_reply--head">
          ${renderUserHead(r.author, r.createdTime)}
        </div>
        <div class="wl_reply--body">${r.text ?? ''}</div>
        <div class="wl_reply--meta">${ICON_LIKE}${r.reactionStats?.count ?? 0}</div>
      `;
      bindAvatarFallback(replyEl);
      repliesEl.appendChild(replyEl);
    });
  }

  async function runLoop(session, sort) {
    updateStatusButton();
    let hadError = false;
    while (panelOpen && hasNext && session === loadSession) {
      if (isPaused) {
        await sleep(300);
        continue;
      }
      try {
        const res = await fetch(buildUrl(sort, cursor, PAGE_SIZE));
        if (!res.ok) throw new Error('API 回應狀態 ' + res.status);
        const data = await res.json();
        if (session !== loadSession) return;
        if (!data.posts || !data.posts.length) {
          hasNext = false;
          break;
        }
        totalCount = data.count ?? totalCount;
        appendComments(data.posts, session);
        hasNext = data.pageInfo?.hasNextPage;
        cursor = data.pageInfo?.nextCursor;
        await sleep(REQUEST_DELAY);
      } catch (e) {
        wlLog('❌ 留言讀取失敗', e);
        hasNext = false;
        hadError = true;
      }
    }
    if (panelOpen && !hasNext && session === loadSession) updateStatusButton(hadError);
  }

  function startLoad(sort) {
    currentSort = sort;
    loadSession++;
    const mySession = loadSession;

    cursor = null;
    hasNext = true;
    isPaused = false;
    totalLoaded = 0;
    totalCount = 0;

    listEl.innerHTML = '';
    countEl.innerHTML = renderCountLabel(0, 0);
    updateTabsUI();

    runLoop(mySession, sort);
  }

  // 進入文章頁時自動呼叫，偵測失敗只記 log，不跳 prompt 打斷閱讀
  function openPanel() {
    params = null;
    if (!tryCaptureParamsFromDom() && !tryCaptureParamsFromNetwork()) {
      wlLog('❌ 無法偵測文章留言參數');
      return;
    }

    panelOpen = true;
    createPanel();
    startLoad('popular');
  }

  function closePanel() {
    panelOpen = false;
    document.getElementById('__lineToday_commentPanel')?.remove();
  }

  // 唯一的顯示/隱藏判斷入口：不管網址怎麼變，只看 DOM 上有沒有文章錨點。
  // today.line.me 是 SPA，網址不一定會跟著「是否正在看文章」同步變化，
  // 所以每次 DOM 有變動就重新檢查一次，比依賴 content.js 的網址比對可靠。
  //
  // 重要：這個函式是被觀察 document.body 的 MutationObserver 呼叫的，
  // 內部絕對不能在「狀態沒變」的情況下還去動 DOM（例如重建面板）——
  // 那種寫法會被自己觸發的 mutation 再次叫回這裡，形成無限迴圈把分頁卡死。
  // 所以「離開文章 / 切換到別篇文章」的開關動作都只在真的發生轉變的那一刻做一次。
  function updateVisibility() {
    const anchor = findArticleAnchor();

    if (!anchor) {
      if (currentAnchorId !== null) {
        currentAnchorId = null;
        if (panelOpen) closePanel();
        params = null;
      }
      return;
    }

    // 進入文章或切換到別篇文章：重建面板並預設打開
    if (anchor.id !== currentAnchorId) {
      currentAnchorId = anchor.id;
      if (panelOpen) closePanel();
      openPanel();
    }
  }

  function setupUI() {
    // 加個小 debounce：SPA 換頁瞬間常常一次炸出大量 DOM mutation，
    // 沒有 debounce 的話 updateVisibility 會被密集連續呼叫，浪費效能
    let visibilityCheckTimer = null;
    new MutationObserver(() => {
      clearTimeout(visibilityCheckTimer);
      visibilityCheckTimer = setTimeout(updateVisibility, 150);
    }).observe(document.body, { childList: true, subtree: true });

    updateVisibility();
  }

  wlMessage({
    INIT() { setupUI(); },
    // SPA 換頁時 content.js 會送 UPDATE/LEAVE，但真正的判斷都交給 updateVisibility()
    // 自己重新檢查 DOM，這兩個訊息只是「提早觸發一次」，不是唯一觸發時機
    UPDATE() { updateVisibility(); },
    LEAVE() { updateVisibility(); },
  });
});
