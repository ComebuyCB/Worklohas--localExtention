/*=== LINE Today 批次讀取文章、留言與匯出 ===*/

wlOnce('today.line.me/tw/v3/index', () => {
  wlLog('LINE Today 批次讀取 已載入');

  // 圖示沿用 article.js
  const ICON_LIKE = '<svg height="18" width="18" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 9.74998C8 9.11483 8.51486 8.59998 9.15 8.59998C9.78503 8.59998 10.3 9.11482 10.3 9.74998C10.3 10.3851 9.78503 10.9 9.15 10.9C8.51486 10.9 8 10.3851 8 9.74998Z" fill="currentColor"></path><path d="M8.59423 13.0058C8.97151 12.7884 9.45439 12.9166 9.67277 13.2921C10.1502 14.1132 11.0297 14.6287 12.0002 14.6287C12.9707 14.6287 13.8501 14.1132 14.3276 13.2921C14.546 12.9166 15.0289 12.7884 15.4062 13.0058C15.7834 13.2231 15.9123 13.7037 15.6939 14.0793C14.9371 15.3806 13.5399 16.2 12.0002 16.2C10.4604 16.2 9.06333 15.3806 8.30651 14.0793C8.08813 13.7037 8.21695 13.2231 8.59423 13.0058Z" fill="currentColor"></path><path d="M13.7002 9.74998C13.7002 9.11483 14.2151 8.59998 14.8502 8.59998C15.4852 8.59998 16.0002 9.11482 16.0002 9.74998C16.0002 10.3851 15.4852 10.9 14.8502 10.9C14.2151 10.9 13.7002 10.3851 13.7002 9.74998Z" fill="currentColor"></path><path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM12 3.8C7.47126 3.8 3.8 7.47126 3.8 12C3.8 16.5287 7.47126 20.2 12 20.2C16.5287 20.2 20.2 16.5287 20.2 12C20.2 7.47126 16.5287 3.8 12 3.8Z" fill="currentColor" fill-rule="evenodd"></path></svg>';
  const ICON_COMMENT = '<svg height="18" width="18" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1061_6536)"><path d="M17.0773 7.45877C16.4381 4.60204 13.9077 2.47614 9.70763 2.47614C4.8047 2.47614 2 5.6433 2 9.99976C2 12.7347 3.68222 15.0766 4.9341 16.4409C5.44591 16.9986 5.88579 17.3929 6.10939 17.5838L6.2667 17.7143C6.2667 17.7143 6.34246 17.4525 6.51742 17.1059L6.5358 17.0699C6.67446 16.8014 6.87129 16.4871 7.13668 16.2057C7.33725 15.9931 7.57698 15.7992 7.86036 15.6581C8.26645 17.5752 9.44067 19.1959 10.3872 20.2446C10.9 20.8127 11.3459 21.213 11.5667 21.4015L11.7142 21.5239C11.7142 21.5239 11.7852 21.2784 11.9493 20.9535L11.9665 20.9198C12.1092 20.6433 12.3177 20.3151 12.6049 20.0329C12.9764 19.6678 13.4796 19.3795 14.1423 19.3795L16.2857 19.3715C19.42 19.3715 22 16.6557 22 13.3052C22 10.5177 20.2957 8.16986 17.0773 7.45877ZM17.2307 9.27139C17.0705 12.6948 14.3846 15.4185 11.1429 15.4185L9.56481 15.4243C9.7796 16.3355 10.229 17.207 10.7747 17.9877C10.9835 18.2865 11.1988 18.5611 11.4076 18.8076C12.0147 18.2129 12.9112 17.6662 14.139 17.6652H14.1423L16.2857 17.6572C18.3822 17.6572 20.2857 15.8025 20.2857 13.3052C20.2857 12.0631 19.8381 11.019 19.0315 10.2751C18.5891 9.86705 17.9959 9.51098 17.2307 9.27139ZM8.85671 13.7127L8.85307 13.7127C7.52202 13.7138 6.56553 14.3335 5.93324 14.9854C5.68355 14.6962 5.4228 14.3684 5.17089 14.0079C4.34413 12.825 3.7143 11.437 3.7143 9.99976C3.7143 8.19122 4.29075 6.76911 5.23757 5.80622C6.17755 4.85028 7.63632 4.19043 9.70763 4.19043C11.8205 4.19043 13.2579 4.80952 14.1493 5.63161C15.0353 6.44871 15.5239 7.59392 15.5239 8.94773C15.5239 11.6684 13.4484 13.7042 11.1429 13.7042L8.85671 13.7127Z" fill="currentColor" fill-rule="evenodd"></path></g><defs><clipPath id="clip0_1061_6536"><rect height="24" width="24" fill="currentColor"></rect></clipPath></defs></svg>';
  const ICON_PAUSE = '<svg height="16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>';
  const ICON_REFRESH = '<svg height="16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M20 4v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const ICON_LOADING = '<span class="wl_dots"><i></i><i></i><i></i></span>';
  // 批次讀取面板標題：前後兩張疊放的文件，尺寸與線條比例對齊 article.js 的 ICON_POST
  const ICON_BATCH = '<svg height="24" width="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3.9h9.1a1.9 1.9 0 0 1 1.9 1.9V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><rect x="4.9" y="6.9" width="11.2" height="14.2" rx="1.9" stroke="currentColor" stroke-width="1.8"></rect><path d="M7.9 11h5.2M7.9 14h5.2M7.9 17h3.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>';
  const ICON_SEARCH = '<svg height="16" width="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2.2"></circle><path d="m16 16 4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>';
  const ICON_ARROW_DOWN = '<svg height="14" width="14" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  // 匯出按鈕：JSON 為大括號、MD 為 Markdown 標誌（M + 向下箭頭）
  const ICON_JSON = '<svg height="16" width="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 4H7a2 2 0 0 0-2 2v3.5A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 5 14.5V18a2 2 0 0 0 2 2h1M16 4h1a2 2 0 0 1 2 2v3.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V18a2 2 0 0 1-2 2h-1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const ICON_MD = '<svg height="16" width="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="1.5" y="5" width="21" height="14" rx="2.5" stroke="currentColor" stroke-width="1.8"></rect><path d="M5.5 15.5v-7l3 3.5 3-3.5v7M16.5 8.5v6.5M14 12.5l2.5 2.5 2.5-2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  class ArticleBatch {
    constructor(options) {
      const def = {
        el: document.body,
        country: 'tw',
        exportPosts: true,    // 匯出時是否包含留言（checkbox 預設值）
        exportReplies: false, // 匯出時是否包含留言回覆（checkbox 預設值）
        exportPostLimit: 20,  // 匯出時每篇最多取幾則熱門留言（range 預設值）
        exportReplyLimit: 10, // 匯出時每則留言最多取幾則回覆（range 預設值）
        modalReplyLimit: 10,  // modal 每則留言最多顯示幾則回覆（同 article.js）
        replyPageSize: 10,    // 回覆每次請求筆數（同 article.js）
        likesBatchSize: 5,    // 留言統計每批同時請求數
        requestDelay: 400,   // 批次、分頁、文章之間的間隔（ms）
        retryLimit: 3,       // 遇到 429 的重試次數
        retryDelay: 1000,    // 429 重試基準等待（ms），每次加倍
      };

      Object.keys(def).forEach((k) => {
        def[k]?.constructor === Object
          ? Object.assign(def[k], options?.[k])
          : options?.[k] !== undefined && (def[k] = options[k]);
      });

      Object.assign(this, def);

      this.panel = this._createPanel();
      this.modal = this._createModal();
      this.input = this.panel.querySelector('.js-batch-input');
      this.result = this.panel.querySelector('.js-batch-result');
      this.table = this.panel.querySelector('.js-batch-table');
      this.exportButtons = this.panel.querySelectorAll('.js-batch-export');
      this.exportStatus = this.panel.querySelector('.js-batch-export-status');
      this.postLimitInput = this.panel.querySelector('.js-batch-post-limit');
      this.replyLimitInput = this.panel.querySelector('.js-batch-reply-limit');
      this.postEnableInput = this.panel.querySelector('.js-batch-post-enable');
      this.replyEnableInput = this.panel.querySelector('.js-batch-reply-enable');
      this.toggleBtn = this.panel.querySelector('.js-batch-toggle');
      this.addPageBtn = this.panel.querySelector('.js-batch-add-page');
      this.modalTitle = this.modal.querySelector('.js-batch-modal-title');
      this.modalArticle = this.modal.querySelector('.js-batch-modal-article');
      this.modalPosts = this.modal.querySelector('.js-batch-modal-posts');
      this.statusBtn = this.modal.querySelector('.js-batch-status');

      this.articles = [];
      this.posts = [];
      this.searchController = null;
      this.postController = null;
      this.modalArticleId = null;  // modal 目前顯示的文章，供狀態鈕「重新開始」使用
      this.isPostsPaused = false;
      this.isExporting = false;

      this.init();
    }

    init() {
      this._bindEvents();
      this._updateLimitInputs();
      this.updateAddPageButton();
    }

    _bindEvents() {
      this.addPageBtn.addEventListener('click', () => this.addPageArticle());

      this.panel.querySelector('.js-batch-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.search(this.input.value);
      });

      this.toggleBtn.addEventListener('click', () => {
        const isCollapsed = this.panel.classList.toggle('is_collapsed');
        this.toggleBtn.textContent = isCollapsed ? '展開' : '收合';
        this.toggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
      });

      // 事件委派：table 與匯出按鈕
      this.panel.addEventListener('click', (e) => {
        const openBtn = e.target.closest('.js-batch-open');
        if (openBtn) this.openArticle(openBtn.dataset.articleId);

        const exportBtn = e.target.closest('.js-batch-export');
        if (exportBtn) this.exportFile(exportBtn.dataset.format);
      });

      // 匯出 checkbox：切換時同步 range 的啟用狀態
      this.panel.addEventListener('change', (e) => {
        if (e.target.closest('.js-batch-post-enable, .js-batch-reply-enable')) this._updateLimitInputs();
      });

      // range 拖曳時同步顯示數值
      this.panel.addEventListener('input', (e) => {
        const range = e.target.closest('.js-batch-range');
        if (range) range.nextElementSibling.textContent = range.value;
      });

      // 事件委派：modal 留言的回覆展開／收合
      this.modalPosts.addEventListener('click', (e) => {
        const toggle = e.target.closest('.js-batch-reply-toggle');
        if (!toggle || !toggle.classList.contains('is_clickable')) return;

        const repliesEl = toggle.closest('.js-batch-post')?.querySelector('.js-batch-replies');
        const isShow = repliesEl?.classList.toggle('is_show');
        toggle.setAttribute('aria-expanded', String(!!isShow));
      });

      // 留言狀態鈕（同 article.js）：讀取中／暫停互相切換，讀完或出錯後改為重新開始
      this.statusBtn.addEventListener('click', () => {
        if (this.statusBtn.classList.contains('is_restart')) {
          this.openArticle(this.modalArticleId);
          return;
        }
        this.isPostsPaused = !this.isPostsPaused;
        this._updateStatusButton(this.isPostsPaused ? 'paused' : 'loading');
      });

      this.modal.querySelector('.js-batch-modal-close').addEventListener('click', () => this.modal.close());

      // 點擊遮罩（dialog 本身）關閉
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.modal.close();
      });

      this.modal.addEventListener('close', () => this._cancelPosts());
    }

    // public
    search(text) {
      this.searchController?.abort();
      this.searchController = new AbortController();

      this.articles = this._parseArticleIds(text).map((articleId) => this._createArticle(articleId));
      this._renderTable();
      this._loadArticles(this.articles, this.searchController.signal);
    }

    // 把目前所在文章頁的網址接到 textarea 最後面，已存在則略過
    addPageArticle() {
      if (!this._isArticlePage()) return;

      const [articleId] = this._parseArticleIds(location.href);
      if (this._parseArticleIds(this.input.value).includes(articleId)) return;

      this.input.value = [this.input.value.trim(), this._articleUrl(articleId)].filter(Boolean).join('\n');
    }

    // 「加入此頁文章」只在文章頁顯示；SPA 換頁時由 content.js 的 UPDATE / LEAVE 觸發
    updateAddPageButton() {
      this.addPageBtn.hidden = !this._isArticlePage();
    }

    openArticle(articleId) {
      const article = this.articles.find((item) => item.articleId === articleId);
      if (!article || article.status !== 'done') return;

      this._cancelPosts();
      this.postController = new AbortController();
      this.modalArticleId = articleId;
      this.isPostsPaused = false;

      this.modalTitle.innerHTML = `<a href="${this._escapeHTML(article.url)}">${this._escapeHTML(article.title)}</a>`;
      this.modalArticle.innerHTML = article.articleHTML;
      this.modalPosts.innerHTML = '<p class="wl_batchHint">留言讀取中...</p>';
      if (!this.modal.open) this.modal.showModal();

      if (article.anchorId) {
        this._updateStatusButton('loading');
        this._loadPosts(article, this.postController.signal);
      } else {
        this.statusBtn.hidden = true;
        this.modalPosts.innerHTML = '<p class="wl_batchHint">此文章沒有留言</p>';
      }
    }

    // 重新爬 textarea 內所有文章與熱門留言，輸出 json 或 Markdown
    async exportFile(format) {
      if (this.isExporting) return;

      const articleIds = this._parseArticleIds(this.input.value);
      if (!articleIds.length) {
        this.exportStatus.textContent = '請先輸入網址';
        return;
      }

      this.isExporting = true;
      this.exportButtons.forEach((btn) => { btn.disabled = true; });

      const limits = {
        postLimit: this.postEnableInput.checked ? Number(this.postLimitInput.value) : 0,
        replyLimit: this.postEnableInput.checked && this.replyEnableInput.checked ? Number(this.replyLimitInput.value) : 0,
      };

      try {
        const articles = await this._crawlArticles(articleIds, limits, (current, total) => {
          this.exportStatus.textContent = `爬取中 ${current} / ${total}...`;
        });
        const filename = `linetoday_${this._timestamp()}`;
        const outputs = {
          json: () => [`${filename}.json`, JSON.stringify({ exportedAt: new Date().toISOString(), articles }, null, 2), 'application/json'],
          md: () => [`${filename}.md`, this._mdMarkup(articles), 'text/markdown'],
        };

        this._download(...outputs[format]());

        const failCount = articles.filter((article) => article.error).length;
        this.exportStatus.textContent = `完成，共 ${articles.length} 篇${failCount ? `（${failCount} 篇失敗）` : ''}`;
      } finally {
        this.isExporting = false;
        this.exportButtons.forEach((btn) => { btn.disabled = false; });
      }
    }

    // internal
    _createPanel() {
      document.getElementById('__lineToday_batchPanel')?.remove();

      const panel = document.createElement('section');
      panel.id = '__lineToday_batchPanel';
      panel.className = 'wl_batch';
      panel.innerHTML = `
        <div class="wl_batch--head">
          <button class="wl_panelToggle js-batch-toggle" type="button" aria-expanded="true">收合</button>
          <strong class="wl_batchTitle">${ICON_BATCH}批次讀取文章</strong>
        </div>
        <div class="wl_batch--body">
          <form class="wl_batchForm js-batch-form">
            <div class="wl_batchFormBar">
              <label class="wl_batchLabel" for="__lineToday_batchInput">網址或文章 ID（一行一個）</label>
              <button class="wl_batchBtn wl_batchAddPage js-batch-add-page" type="button">加入此頁文章${ICON_ARROW_DOWN}</button>
            </div>
            <textarea id="__lineToday_batchInput" class="wl_batchInput js-batch-input" rows="8" placeholder="https://today.line.me/tw/v3/article/xxxxxxx"></textarea>
            <button class="wl_batchBtn is_primary wl_batchSubmit" type="submit">${ICON_SEARCH}查詢</button>
          </form>
          <div class="wl_batchResult js-batch-result" hidden>
            <table class="wl_batchTable">
              <thead>
                <tr>
                  <th scope="col">url</th>
                  <th scope="col">文章標題</th>
                </tr>
              </thead>
              <tbody class="js-batch-table"></tbody>
            </table>
            <div class="wl_batchSettings">
              <div class="wl_batchRange">
                <label class="_label"><input class="js-batch-post-enable" type="checkbox"${this.exportPosts ? ' checked' : ''}>留言數</label>
                <input class="js-batch-range js-batch-post-limit" type="range" min="5" max="50" step="5" value="${this.exportPostLimit}" aria-label="留言數">
                <output class="_value">${this.exportPostLimit}</output>
              </div>
              <div class="wl_batchRange">
                <label class="_label"><input class="js-batch-reply-enable" type="checkbox"${this.exportReplies ? ' checked' : ''}>留言回覆數</label>
                <input class="js-batch-range js-batch-reply-limit" type="range" min="5" max="50" step="5" value="${this.exportReplyLimit}" aria-label="留言回覆數">
                <output class="_value">${this.exportReplyLimit}</output>
              </div>
            </div>
            <div class="wl_batchActions">
              <button class="wl_batchBtn js-batch-export" type="button" data-format="json">${ICON_JSON}輸出 JSON</button>
              <button class="wl_batchBtn js-batch-export" type="button" data-format="md">${ICON_MD}輸出 MD</button>
              <span class="wl_batchHint js-batch-export-status"></span>
            </div>
          </div>
        </div>
      `;

      this.el.appendChild(panel);
      return panel;
    }

    // 未勾選的項目停用對應 range；留言未勾選時，回覆 checkbox 與 range 一併停用
    _updateLimitInputs() {
      const hasPosts = this.postEnableInput.checked;

      this.postLimitInput.disabled = !hasPosts;
      this.replyEnableInput.disabled = !hasPosts;
      this.replyLimitInput.disabled = !hasPosts || !this.replyEnableInput.checked;
    }

    _createModal() {
      document.getElementById('__lineToday_batchModal')?.remove();

      const modal = document.createElement('dialog');
      modal.id = '__lineToday_batchModal';
      modal.className = 'wl_batchModal';
      modal.setAttribute('aria-labelledby', '__lineToday_batchModalTitle');
      modal.innerHTML = `
        <div class="wl_batchModal--head">
          <h2 id="__lineToday_batchModalTitle" class="wl_batchModalTitle js-batch-modal-title"></h2>
          <button class="wl_batchBtn js-batch-modal-close" type="button" aria-label="關閉">✕</button>
        </div>
        <div class="wl_batchModal--body">
          <div class="wl_batchArticle js-batch-modal-article"></div>
          <div class="wl_batchPostPanel">
            <div class="wl_batchPosts js-batch-modal-posts"></div>
            <button class="wl_statusBtn js-batch-status" type="button" hidden></button>
          </div>
        </div>
      `;

      this.el.appendChild(modal);
      return modal;
    }

    _createArticle(articleId) {
      return { articleId, url: this._articleUrl(articleId), title: '', articleHTML: '', anchorId: null, status: 'loading', row: null };
    }

    _cancelPosts() {
      this.postController?.abort();
      this.postController = null;
    }

    // 查詢：逐篇讀取文章，取得標題後更新 table
    async _loadArticles(articles, signal) {
      for (const [index, article] of articles.entries()) {
        if (index) await this._wait(this.requestDelay);
        if (signal.aborted) return;

        try {
          const html = await this._request(article.url, { signal, type: 'text' });
          const { title, articleHTML, anchorId } = this._parseArticle(html);
          Object.assign(article, { title, articleHTML, anchorId, status: 'done' });
        } catch (err) {
          if (signal.aborted) return;
          wlLog('❌ 文章讀取失敗', article.url, err);
          article.status = 'error';
        }

        this._updateRow(article);
      }
    }

    // 逐頁載入留言：每頁（最多 5 則）的按讚數全部取得後，才繼續下一頁
    async _loadPosts(article, signal) {
      let cursor = null;

      do {
        if (cursor) await this._wait(this.requestDelay);
        await this._waitWhilePaused(signal);
        if (signal.aborted) return;

        let resData;
        try {
          resData = await this._request(this._postsUrl(article.anchorId, cursor), { signal });
        } catch (err) {
          if (signal.aborted) return;
          wlLog('❌ 留言讀取失敗', err);
          if (!cursor) this.modalPosts.innerHTML = '<p class="wl_batchHint is_error">留言讀取失敗</p>';
          this._updateStatusButton('error');
          return;
        }

        const posts = (resData.posts || []).map((post) => this._formatPost(post, article));

        // 第一頁：清掉該文章舊的留言再寫入，之後的分頁接續累加
        if (!cursor) {
          this._setArticlePosts(article.articleId, posts);
          this.modalPosts.innerHTML = posts.length ? '' : '<p class="wl_batchHint">此文章沒有留言</p>';
        } else {
          this.posts.push(...posts);
        }
        this._renderPosts(posts);

        await this._fetchPostDetailsInBatches(posts, {
          replyLimit: this.modalReplyLimit,
          signal,
          onUpdate: (post) => this._updatePost(post),
        });

        cursor = resData.pageInfo?.hasNextPage ? resData.pageInfo.nextCursor : null;
      } while (cursor);

      if (!signal.aborted) this._updateStatusButton('done');
    }

    // 暫停時停在分頁之間等待，直到繼續或被取消
    async _waitWhilePaused(signal) {
      while (this.isPostsPaused && !signal.aborted) await this._wait(300);
    }

    // 底部狀態鈕（同 article.js）：loading / paused 可互相切換，done / error 改為重新開始
    _updateStatusButton(state) {
      const states = {
        loading: ['is_loading', `${ICON_LOADING}載入中`],
        paused: ['is_paused', `${ICON_PAUSE}暫停載入`],
        done: ['is_restart', `${ICON_REFRESH}已無更多貼文，重新開始`],
        error: ['is_restart', `${ICON_REFRESH}讀取發生錯誤，重新開始`],
      };
      const [stateClass, html] = states[state];

      this.statusBtn.hidden = false;
      this.statusBtn.className = `wl_statusBtn js-batch-status ${stateClass}`;
      this.statusBtn.innerHTML = html;
    }

    // 逐篇爬取文章與熱門留言，單篇失敗不中斷
    async _crawlArticles(articleIds, { postLimit, replyLimit }, onProgress) {
      const articles = [];

      for (const [index, articleId] of articleIds.entries()) {
        if (index) await this._wait(this.requestDelay);
        onProgress(index + 1, articleIds.length);
        const url = this._articleUrl(articleId);

        try {
          const { articleHTML, anchorId, ...detail } = this._parseArticle(await this._request(url, { type: 'text' }));
          const posts = anchorId && postLimit ? await this._fetchTopPosts({ articleId, anchorId }, postLimit, replyLimit) : [];
          this._setArticlePosts(articleId, posts);
          articles.push({ articleId, anchorId, url, ...detail, posts });
        } catch (err) {
          wlLog('❌ 文章讀取失敗', url, err);
          articles.push({ articleId, anchorId: null, url, error: '讀取失敗', posts: [] });
        }
      }

      return articles;
    }

    // 熱門留言每次請求 5 則逐頁往下，取到 limit 則為止
    async _fetchTopPosts(article, limit, replyLimit) {
      const topPosts = [];
      let cursor = null;

      // 每頁留言的讚數與回覆全部取得後，才繼續下一頁
      do {
        if (cursor) await this._wait(this.requestDelay);
        const resData = await this._request(this._postsUrl(article.anchorId, cursor));
        const posts = (resData.posts || []).slice(0, limit - topPosts.length).map((post) => this._formatPost(post, article));

        await this._fetchPostDetailsInBatches(posts, { replyLimit });
        topPosts.push(...posts);
        cursor = resData.pageInfo?.hasNextPage ? resData.pageInfo.nextCursor : null;
      } while (cursor && topPosts.length < limit);

      return topPosts;
    }

    // 分批抓取留言的讚數與回覆：每批 likesBatchSize 則，批次間隔 requestDelay
    async _fetchPostDetailsInBatches(posts, { replyLimit = 0, signal, onUpdate } = {}) {
      for (let i = 0; i < posts.length; i += this.likesBatchSize) {
        if (i) await this._wait(this.requestDelay);
        if (signal?.aborted) return;

        const batch = posts.slice(i, i + this.likesBatchSize);
        const details = await Promise.all(batch.map((post) => Promise.all([
          this._fetchLikeCount(post.postId, signal),
          replyLimit ? this._fetchReplies(post.postId, replyLimit, signal) : null,
        ])));
        if (signal?.aborted) return;

        batch.forEach((post, index) => {
          const [likes, replyData] = details[index];
          post.likes = likes;
          if (replyData) Object.assign(post, replyData);
          onUpdate?.(post);
        });
      }
    }

    // 回覆每次請求 replyPageSize 則，以 offset 往下翻頁，取到 limit 則或沒有更多為止
    // 回傳 { replyCount, replies }，失敗時 replyCount 為 null
    async _fetchReplies(postId, limit, signal) {
      const replies = [];
      let replyCount = 0;

      try {
        do {
          if (replies.length) await this._wait(this.requestDelay);
          const size = Math.min(this.replyPageSize, limit - replies.length);
          const resData = await this._request(this._repliesUrl(postId, replies.length, size), { signal });
          const result = resData.result || [];

          replyCount = resData.totalCount ?? replyCount;
          replies.push(...result.map((reply) => this._formatReply(reply)));
          if (result.length < size) break;
        } while (replies.length < Math.min(limit, replyCount));

        return { replyCount, replies };
      } catch (err) {
        if (!signal?.aborted) wlLog('❌ 回覆讀取失敗', postId, err);
        return { replyCount: null, replies };
      }
    }

    // 取得單則留言按讚數，失敗回傳 null
    async _fetchLikeCount(postId, signal) {
      try {
        const resData = await this._request(this._likesUrl(postId), { signal });
        return resData?.count ?? 0;
      } catch (err) {
        return null;
      }
    }

    // 同站請求；429 被限流時等待後重試，等待時間逐次加倍
    async _request(url, { signal, type = 'json' } = {}, retry = 0) {
      const res = await fetch(url, { signal });

      if (res.status === 429 && retry < this.retryLimit) {
        await this._wait(this.retryDelay * 2 ** retry);
        return this._request(url, { signal, type }, retry + 1);
      }
      if (!res.ok) throw new Error(`API 回應狀態 ${res.status}`);

      return type === 'text' ? res.text() : res.json();
    }

    _parseArticle(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const root = doc.querySelector('.page-content') || doc.body;
      const matches = [...root.querySelectorAll('h1, article, h4.publisher, .publish-info-text')];
      const top = this._outermost(matches);

      // 內文轉成段落文字，排除圖片區塊並避免巢狀元素重複
      const body = top.find((el) => el.matches('article'))?.cloneNode(true);
      body?.querySelectorAll('figure, script, style').forEach((el) => el.remove());
      const blocks = body ? [...body.querySelectorAll('p, h2, h3, h4, li')] : [];
      const content = this._outermost(blocks).map((el) => el.textContent.trim()).filter(Boolean);
      const textOf = (selector) => top.filter((el) => el.matches(selector)).map((el) => el.textContent.trim()).filter(Boolean);

      return {
        title: textOf('h1')[0] || '（無標題）',
        publisher: textOf('h4.publisher')[0] || '',
        publishInfo: textOf('.publish-info-text').join(' '),
        content: content.length ? content : [body?.textContent.trim()].filter(Boolean),
        articleHTML: top.map((el) => el.outerHTML).join(''),
        anchorId: this._findAnchorId(html),
      };
    }

    // 只保留最外層元素（排除被其他符合元素包住的）
    _outermost(elements) {
      return elements.filter((el) => !elements.some((other) => other !== el && other.contains(el)));
    }

    _findAnchorId(html) {
      const match = html.match(/data-anchor-id="article:(\d+):/);
      return match?.[1] ?? null;
    }

    // 留言統一格式，帶 articleId / anchorId 以便對應文章
    // likes / replyCount：undefined 讀取中（或未抓取）、null 失敗
    // publishedAt：ISO 時間字串，無資料時為 null
    _formatPost(post, article) {
      return { articleId: article.articleId, anchorId: article.anchorId, postId: post.id, author: post.author?.name ?? '', publishedAt: this._toISOString(post.publishTimeUnix), text: post.content?.text ?? '', likes: undefined, replyCount: undefined, replies: [] };
    }

    _formatReply(reply) {
      return { replyId: reply.id, author: reply.author?.name ?? '', publishedAt: this._toISOString(reply.createdTime), text: reply.text ?? '', likes: reply.reactionStats?.count ?? 0 };
    }

    _toISOString(unixMs) {
      return unixMs ? new Date(unixMs).toISOString() : null;
    }

    // 以最新抓到的留言取代該文章在 this.posts 內的舊資料
    _setArticlePosts(articleId, posts) {
      this.posts = this.posts.filter((post) => post.articleId !== articleId).concat(posts);
    }

    // 每行一個網址或 ID，去除空行與重複
    _parseArticleIds(text) {
      const ids = text.split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const match = line.match(/article\/([^/?#]+)/);
          return match ? match[1] : line;
        });
      return [...new Set(ids)];
    }

    _isArticlePage() {
      return /\/v3\/article\/[^/?#]+/.test(location.pathname);
    }

    _articleUrl(articleId) {
      return `https://today.line.me/${this.country}/v3/article/${articleId}`;
    }

    _postsUrl(anchorId, cursor) {
      const params = new URLSearchParams({ country: this.country, quoteContentId: anchorId, quoteContentType: 'ARTICLE', size: '5' });
      if (cursor) params.set('cursor', cursor);
      return `/webapi/social-feed/post/listing/popular?${params}`;
    }

    _likesUrl(postId) {
      const params = new URLSearchParams({ country: this.country, contentType: 'post', postId });
      return `/webapi/interaction/likes?${params}`;
    }

    _repliesUrl(postId, offset, limit) {
      const params = new URLSearchParams({ postId, sort: 'REACTION_COUNT', offset: String(offset), limit: String(limit), country: this.country });
      return `/webapi/social-feed/replies?${params}`;
    }

    _renderTable() {
      this.result.hidden = !this.articles.length;
      this.table.innerHTML = '';

      this.articles.forEach((article) => {
        article.row = document.createElement('tr');
        article.row.innerHTML = `
          <td><a href="${this._escapeHTML(article.url)}">${this._escapeHTML(article.url)}</a></td>
          <td class="js-batch-title">${this._titleMarkup(article)}</td>
        `;
        this.table.appendChild(article.row);
      });
    }

    _updateRow(article) {
      const cell = article.row?.querySelector('.js-batch-title');
      if (cell) cell.innerHTML = this._titleMarkup(article);
    }

    _titleMarkup(article) {
      if (article.status === 'loading') return '<span class="wl_batchHint">讀取中...</span>';
      if (article.status === 'error') return '<span class="wl_batchHint is_error">讀取失敗</span>';

      return `<button class="wl_batchLink js-batch-open" type="button" data-article-id="${this._escapeHTML(article.articleId)}">${this._escapeHTML(article.title)}</button>`;
    }

    // 留言樣式共用 article.js 的 wl_comment / wl_reply（不含頭像）
    _renderPosts(posts) {
      const offset = this.modalPosts.querySelectorAll('.js-batch-post').length;

      this.modalPosts.insertAdjacentHTML('beforeend', posts.map((post, index) => `
        <div class="wl_comment js-batch-post" data-post-id="${this._escapeHTML(post.postId)}">
          <div class="wl_comment--head">
            ${this._userInfoMarkup(post)}
            <span class="wl_commentIndex">#${offset + index + 1}</span>
          </div>
          <div class="wl_comment--body">${this._escapeHTML(post.text)}</div>
          <div class="wl_comment--meta js-batch-meta">${this._metaMarkup(post)}</div>
          <div class="wl_comment--replies js-batch-replies"></div>
        </div>
      `).join(''));
    }

    // 姓名＋相對時間，留言與回覆共用
    _userInfoMarkup({ author, publishedAt }) {
      return `
        <div class="wl_userInfo">
          <span class="_name">${this._escapeHTML(author) || '匿名'}</span>
          ${publishedAt ? `<span class="_time">${wlRelativeTime(Date.parse(publishedAt))}</span>` : ''}
        </div>
      `;
    }

    // 讚數與回覆取得後，更新該則留言的統計列與回覆區塊
    _updatePost(post) {
      const postEl = this.modalPosts.querySelector(`.js-batch-post[data-post-id="${CSS.escape(post.postId)}"]`);
      if (!postEl) return;

      postEl.querySelector('.js-batch-meta').innerHTML = this._metaMarkup(post);
      postEl.querySelector('.js-batch-replies').innerHTML = this._repliesMarkup(post);
    }

    // 圖示與行為同 article.js：讚數為 0 時淡化，有回覆時可點擊展開
    _metaMarkup(post) {
      if (post.likes === undefined) return '統計載入中...';

      const hasReplies = post.replyCount > 0;
      return `
        <span class="wl_stat${post.likes ? '' : ' is_zero'}">${ICON_LIKE}${post.likes ?? '-'}</span>
        <button class="wl_replyToggle js-batch-reply-toggle${hasReplies ? ' is_clickable' : ' is_zero'}" type="button" aria-expanded="false"${hasReplies ? '' : ' disabled'}>${ICON_COMMENT}${hasReplies ? post.replyCount : ''}</button>
      `;
    }

    _repliesMarkup(post) {
      const more = post.replyCount > post.replies.length ? `<p class="wl_batchHint">僅顯示前 ${post.replies.length} 則，共 ${post.replyCount} 則</p>` : '';

      return post.replies.map((reply) => `
        <div class="wl_reply">
          <div class="wl_reply--head">${this._userInfoMarkup(reply)}</div>
          <div class="wl_reply--body">${this._escapeHTML(reply.text)}</div>
          <div class="wl_reply--meta">${ICON_LIKE}${reply.likes}</div>
        </div>
      `).join('') + more;
    }

    // Markdown：標題、來源、內文、熱門留言與回覆，文章之間以分隔線區隔
    _mdMarkup(articles) {
      return articles.map((article) => {
        if (article.error) return `# 讀取失敗\n\n${article.url}\n`;

        const meta = [article.publisher, article.publishInfo].filter(Boolean).join('｜');
        const posts = article.posts.length
          ? article.posts.map((post, index) => `${index + 1}. **${post.author}**（讚 ${post.likes ?? '-'}）：${this._mdText(post.text, '   ')}${this._mdRepliesMarkup(post)}`).join('\n')
          : '沒有留言';

        return [
          `# ${article.title}`,
          `> ${meta ? `${meta}  \n> ` : ''}${article.url}`,
          ...article.content,
          `## 熱門留言（${article.posts.length}）`,
          posts,
        ].join('\n\n') + '\n';
      }).join('\n---\n\n');
    }

    // Markdown：留言底下以巢狀清單列出回覆
    _mdRepliesMarkup(post) {
      if (!post.replies.length) return '';

      const title = `回覆（${post.replies.length}${post.replyCount > post.replies.length ? ` / 共 ${post.replyCount}` : ''}）`;
      const items = post.replies.map((reply) => `\n     - **${reply.author}**（讚 ${reply.likes}）：${this._mdText(reply.text, '       ')}`).join('');
      return `\n   - ${title}${items}`;
    }

    // 多行文字轉為 Markdown 強制換行，並補上縮排讓內容留在同一個清單項目內
    _mdText(text, indent) {
      return String(text ?? '').trim().replace(/\n/g, `  \n${indent}`);
    }

    _download(filename, content, type) {
      const url = URL.createObjectURL(new Blob([content], { type }));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    _escapeHTML(text) {
      return String(text ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    _wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // 格式：YYYYMMDDhhmm
    _timestamp() {
      return new Date().toLocaleString('sv-SE').replace(/\D/g, '').slice(0, 12);
    }
  }

  wlMessage({
    INIT() {
      // 掛到 window 方便在 console 檢視，例如 wlLineTodayBatch.posts
      window.wlLineTodayBatch = new ArticleBatch();
    },
    // SPA 換頁：重新判斷「加入此頁文章」是否顯示
    UPDATE() { window.wlLineTodayBatch?.updateAddPageButton(); },
    LEAVE() { window.wlLineTodayBatch?.updateAddPageButton(); },
  });
});
