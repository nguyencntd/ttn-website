/* TTN Fire Safety Solution — main.js */
(function () {
  'use strict';

  var cfg = window.TTN_CONFIG || {};
  var posts = window.TTN_TIN_TUC || [];
  var docs = window.TTN_TAI_LIEU || [];
  var HS = window.TTN_HO_SO || null;
  var params = new URLSearchParams(location.search);
  var page = document.body.getAttribute('data-page');
  var hotline = cfg.hotline || '098.6637.678';
  /* Chạy thật (cheDoNhap: false): mục chưa có nội dung tự ẩn, không hiện khung chờ hay ghi chú */
  var LIVE = cfg.cheDoNhap !== true;
  function hideSection(el) {
    var s = el && (el.closest('section') || el);
    if (s) s.hidden = true;
  }

  var NHOM = { pccc: 'PCCC', atvsld: 'An toàn lao động', 'huan-luyen': 'Huấn luyện', 'bieu-mau': 'Biểu mẫu' };
  var CAMERA = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function safeUrl(u) { u = String(u || '').trim(); return /^javascript:/i.test(u) ? '' : u; }
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }

  /* Khung ảnh: có ảnh thì hiện ảnh, chưa có thì hiện khung chờ kèm ghi chú */
  function placeholder(ar, title, spec) {
    return '<figure class="ph ph-' + ar + '"><figcaption class="ph-label">' + CAMERA +
      '<strong>' + esc(title) + '</strong>' + (spec ? '<span>' + esc(spec) + '</span>' : '') + '</figcaption></figure>';
  }
  function media(src, ar, alt, title, spec) {
    src = safeUrl(src);
    if (!src && LIVE) return '';
    return src
      ? '<figure class="ph ph-' + ar + ' has-img"><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"></figure>'
      : placeholder(ar, title, spec);
  }

  /* Khối có data-hide-empty tự ẩn khi chưa có nội dung */
  function hideIfEmpty(el, count) {
    var box = el.closest('[data-hide-empty]');
    if (box) box.hidden = !count;
  }

  /* ---------- YouTube gọn nhẹ: chỉ tải trình phát khi khách bấm ---------- */
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  function ytId(s) {
    s = String(s || '').trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    var m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : '';
  }
  function ytThumb(id) { return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; }
  function ytBox(id, title, poster) {
    return '<div class="yt" data-yt="' + id + '" data-yt-title="' + esc(title || 'Video') + '">' +
      '<img src="' + esc(safeUrl(poster) || ytThumb(id)) + '" alt="" loading="lazy">' +
      '<button class="video-play" type="button" aria-label="Phát video ' + esc(title || '') + '">' + PLAY + '</button></div>';
  }
  function ytFrame(id, title) {
    return '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + esc(title || 'Video') +
      '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.yt .video-play') : null;
    if (!btn) return;
    var box = btn.closest('.yt');
    box.innerHTML = ytFrame(box.getAttribute('data-yt'), box.getAttribute('data-yt-title'));
    box.classList.add('is-playing');
  });

  /* ---------- Zalo (chỉ chạy khi có zaloOA trong config.js) ---------- */
  var zaloOA = String(cfg.zaloOA || '').replace(/[^0-9]/g, '');
  var zaloSdk = false;
  function loadZaloSdk() {
    if (zaloSdk) {
      if (window.ZaloSocialSDK && typeof window.ZaloSocialSDK.reload === 'function') window.ZaloSocialSDK.reload();
      return;
    }
    zaloSdk = true;
    var s = document.createElement('script');
    s.src = 'https://sp.zalo.me/plugins/sdk.js';
    s.async = true;
    document.body.appendChild(s);
  }

  /* ---------- Thanh chia sẻ ---------- */
  var SHARE_ICON = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';
  function renderShare(el, url, text, label) {
    var html = '<span class="share-label">' + esc(label || 'Chia sẻ') + '</span><div class="share-btns">';
    if (navigator.share) html += '<button class="share-btn" type="button" data-share-native>' + SHARE_ICON + 'Gửi cho đồng nghiệp</button>';
    if (zaloOA) html += '<div class="share-btn zalo zalo-share-button" role="button" tabindex="0" data-href="' + esc(url) + '" data-oaid="' + zaloOA + '" data-customize="true">Zalo</div>';
    html += '<a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '" target="_blank" rel="noopener">Facebook</a>';
    html += '<button class="share-btn" type="button" data-share-copy>Sao chép link</button></div>';
    el.innerHTML = html;
    var nb = $('[data-share-native]', el);
    if (nb) nb.addEventListener('click', function () {
      navigator.share({ title: document.title, text: text || document.title, url: url }).catch(function () {});
    });
    var cb = $('[data-share-copy]', el);
    cb.addEventListener('click', function () {
      var done = function () {
        cb.textContent = 'Đã sao chép';
        setTimeout(function () { cb.textContent = 'Sao chép link'; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Sao chép link:', url); });
      else window.prompt('Sao chép link:', url);
    });
    if (zaloOA) loadZaloSdk();
  }
  function pageUrl() { return location.href.split('#')[0]; }

  /* Ảnh đặt sẵn trong HTML (data-src): tự hiện khi file ảnh đã được chép vào đúng chỗ */
  /* Chấp nhận cả .jpg, .jpeg, .png, .webp cùng tên file */
  $$('.ph[data-src]').forEach(function (ph) {
    var src = ph.getAttribute('data-src');
    var m = src.match(/^(.*)\.(jpe?g|png|webp)$/i);
    var tries = [src];
    if (m) ['jpg', 'jpeg', 'png', 'webp'].forEach(function (x) { if (x !== m[2].toLowerCase()) tries.push(m[1] + '.' + x); });
    var i = 0;
    var img = new Image();
    img.onload = function () {
      img.alt = ph.getAttribute('data-alt') || '';
      ph.innerHTML = '';
      ph.appendChild(img);
      ph.classList.add('has-img');
    };
    img.onerror = function () {
      i++;
      if (i < tries.length) { img.src = tries[i]; return; }
      /* Không có ảnh: khi chạy thật thì ẩn khung (CSS .is-live .ph-missing) */
      ph.classList.add('ph-missing');
      var card = ph.closest('.team-card');
      if (card && LIVE) card.classList.add('no-photo');
    };
    img.src = tries[0];
  });

  /* ---------- Menu mobile ---------- */
  var toggle = $('.nav-toggle');
  var nav = $('#site-nav');
  function closeNav() {
    document.body.classList.remove('nav-open');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Mở menu'); }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('nav-open') && !nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
  }

  /* ---------- Mục menu đang xem ---------- */
  $$('[data-nav]').forEach(function (a) {
    if (a.getAttribute('data-nav') === page) a.setAttribute('aria-current', 'page');
  });
  $$('[data-group]').forEach(function (a) {
    if (a.getAttribute('data-group').split(' ').indexOf(page) > -1) a.classList.add('is-active');
  });

  /* ---------- Trang chủ: cuộn mượt, không để lại #hash ---------- */
  if (page === 'home') {
    $$('[data-home]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', location.pathname + location.search);
      });
    });
    $$('a[href^="index.html#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.getElementById(a.getAttribute('href').split('#')[1]);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', '#' + target.id);
      });
    });
  }

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Form (Formspree) ---------- */
  var formId = String(cfg.formspreeId || '').trim();
  var endpoint = formId && !/YOUR_/i.test(formId) ? 'https://formspree.io/f/' + encodeURIComponent(formId) : '';

  function setStatus(el, type, msg) {
    if (!el) return;
    el.className = 'form-status ' + (type === 'ok' ? 'is-ok' : 'is-error');
    el.textContent = msg;
  }
  function pickService(key) {
    $$('select[name="dich_vu"]').forEach(function (sel) {
      var opt = sel.querySelector('option[data-key="' + String(key).replace(/[^a-z-]/g, '') + '"]');
      if (!opt) return;
      sel.value = opt.value;
      var more = sel.closest('details');
      if (more) more.open = true;
    });
  }

  if (params.get('dv')) pickService(params.get('dv'));
  else if (document.body.getAttribute('data-service')) pickService(document.body.getAttribute('data-service'));
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () { pickService(a.getAttribute('data-pick')); });
  });

  function postForm(form) {
    return fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) { if (!res.ok) throw new Error('send failed'); return res; });
  }

  $$('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!endpoint) {
        setStatus(status, 'error', 'Biểu mẫu đang được kết nối. Vui lòng gọi hotline ' + hotline + '.');
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      var label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Đang gửi...';
      postForm(form)
        .then(function () {
          form.reset();
          setStatus(status, 'ok', form.getAttribute('data-success') || 'Đã gửi thành công. TTN sẽ liên hệ lại với bạn.');
        })
        .catch(function () {
          setStatus(status, 'error', 'Chưa gửi được. Vui lòng thử lại hoặc gọi ' + hotline + '.');
        })
        .then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  });

  /* ---------- Tin tức ---------- */
  function newsCard(p) {
    var nhom = NHOM[p.nhom] ? p.nhom : 'pccc';
    var vid = ytId(p.video);
    var img = p.anh || (vid ? ytThumb(vid) : '');
    return '<article class="news-card' + (vid ? ' has-video' : '') + '"><a href="bai-viet.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="news-media">' + media(img, '169', '', 'Ảnh 16 · Ảnh bài viết', '16:9 · 1200 × 675') +
      (vid ? '<span class="play-badge">' + PLAY + '</span>' : '') + '</div>' +
      '<div><span class="news-cat c-' + nhom + '">' + esc(NHOM[nhom]) + (vid ? ' · Video' : '') + '</span>' +
      '<h3>' + esc(p.tieuDe) + '</h3><p>' + esc(p.tomTat) + '</p>' +
      (p.ngay ? '<time>' + esc(p.ngay) + '</time>' : '') + '</div></a></article>';
  }

  function setupChips(group, initial, onChange) {
    var chips = $$('.chip', group);
    function set(v) {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-nhom') === v)); });
      onChange(v);
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { set(c.getAttribute('data-nhom')); }); });
    var ok = chips.some(function (c) { return c.getAttribute('data-nhom') === initial; });
    set(ok ? initial : 'all');
  }

  $$('[data-news-list]').forEach(function (el) {
    var limit = parseInt(el.getAttribute('data-limit'), 10) || 0;
    var fixed = el.getAttribute('data-nhom') || '';
    if (fixed === 'auto') fixed = document.body.getAttribute('data-service') || '';
    function render(nhom) {
      var list = posts.filter(function (p) {
        if (!nhom || nhom === 'all') return true;
        if (nhom === 'video') return !!ytId(p.video);
        return p.nhom === nhom;
      });
      if (limit) list = list.slice(0, limit);
      el.innerHTML = list.length ? list.map(newsCard).join('') : '<p class="empty">Chưa có bài viết trong mục này.</p>';
      hideIfEmpty(el, list.length);
    }
    var groupId = el.getAttribute('data-filter');
    var group = groupId && document.getElementById(groupId);
    if (group) setupChips(group, params.get('nhom') || 'all', render);
    else render(fixed || 'all');
  });

  var article = $('[data-article]');
  if (article && posts.length) {
    var id = params.get('id');
    var post = posts.filter(function (p) { return p.id === id; })[0] || posts[0];
    document.title = post.tieuDe + ' — TTN Fire Safety Solution';
    var t = $('[data-article-title]'); if (t) t.textContent = post.tieuDe;
    var l = $('[data-article-lead]'); if (l) l.textContent = post.tomTat;
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', post.tomTat);
    var am = $('[data-article-media]');
    var postVid = ytId(post.video);
    if (am) am.innerHTML = postVid ? ytBox(postVid, post.tieuDe, post.anh) : media(post.anh, '169', post.tieuDe, 'Ảnh 16 · Ảnh đại diện bài viết', '16:9 · 1200 × 675');
    article.innerHTML = post.noiDung;
    var related = $('[data-related]');
    if (related) related.innerHTML = posts.filter(function (p) { return p !== post; }).slice(0, 3).map(newsCard).join('');
  }

  /* ---------- Thư viện tài liệu ---------- */
  var docList = $('[data-doc-list]');
  if (docList) {
    var search = $('#tim-kiem');
    var countEl = $('[data-doc-count]');
    var current = 'all';
    var gate = $('[data-gate]');
    var unlocked = false;
    try { unlocked = localStorage.getItem('ttn_tai_lieu') === '1'; } catch (e) { unlocked = false; }
    var docRow = function (d) {
      var loai = String(d.loai || 'PDF').toUpperCase();
      var link = safeUrl(d.link);
      var action;
      if (d.dangKy && gate && !(unlocked && link)) {
        action = '<button class="btn btn-red btn-sm" type="button" data-gate-open="' + docs.indexOf(d) + '">Nhận tài liệu</button>';
      } else if (link) {
        action = '<a class="btn btn-outline btn-sm" href="' + esc(link) + '" target="_blank" rel="noopener">Xem tài liệu</a>';
      } else {
        action = '<span class="doc-soon">Đang cập nhật</span>';
      }
      return '<li class="doc-row"><span class="doc-icon' + (loai === 'PDF' ? '' : ' is-blue') + '">' + esc(loai) + '</span>' +
        '<div class="doc-info"><h3>' + esc(d.tieuDe) + '</h3><p>' + esc(d.moTa) + '</p></div>' +
        '<span class="doc-cat">' + esc(NHOM[d.nhom] || '') + '</span>' + action + '</li>';
    };
    var renderDocs = function () {
      var term = norm(search ? search.value.trim() : '');
      var list = docs.filter(function (d) {
        if (LIVE && !safeUrl(d.link) && !d.dangKy) return false; /* chạy thật: ẩn tài liệu chưa có link */
        return (current === 'all' || d.nhom === current) && (!term || norm(d.tieuDe + ' ' + d.moTa).indexOf(term) > -1);
      });
      if (countEl) countEl.textContent = list.length + ' tài liệu';
      docList.innerHTML = list.length ? list.map(docRow).join('') : '<li class="empty">Không tìm thấy tài liệu phù hợp.</li>';
    };
    var docFilter = $('#doc-filter');
    if (docFilter) setupChips(docFilter, params.get('nhom') || 'all', function (v) { current = v; renderDocs(); });
    else renderDocs();
    if (search) search.addEventListener('input', renderDocs);

    /* Hộp nhận tài liệu: khách để lại thông tin, gửi về Formspree rồi mới mở link */
    if (gate) {
      var gateForm = $('[data-gate-form]', gate);
      var gateDoc = null;
      var closeGate = function () { if (gate.close) gate.close(); else gate.removeAttribute('open'); };
      docList.addEventListener('click', function (e) {
        var b = e.target.closest('[data-gate-open]');
        if (!b) return;
        gateDoc = docs[parseInt(b.getAttribute('data-gate-open'), 10)];
        if (!gateDoc) return;
        $('[data-gate-doc]', gate).textContent = gateDoc.tieuDe;
        $('[data-gate-name]', gate).value = gateDoc.tieuDe;
        $('[data-gate-body]', gate).hidden = false;
        $('[data-gate-done]', gate).hidden = true;
        var st = $('.form-status', gate);
        st.textContent = ''; st.className = 'form-status';
        if (gate.showModal) gate.showModal(); else gate.setAttribute('open', '');
        var first = $('input[name="ho_ten"]', gate);
        if (first) first.focus();
      });
      $('[data-gate-close]', gate).addEventListener('click', closeGate);
      gate.addEventListener('click', function (e) { if (e.target === gate) closeGate(); });
      gateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var st = $('.form-status', gateForm);
        if (!gateForm.checkValidity()) { gateForm.reportValidity(); return; }
        if (!endpoint) { setStatus(st, 'error', 'Biểu mẫu đang được kết nối. Vui lòng gọi hotline ' + hotline + '.'); return; }
        var btn = $('[type="submit"]', gateForm);
        var label = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = 'Đang gửi...';
        postForm(gateForm)
          .then(function () {
            try { localStorage.setItem('ttn_tai_lieu', '1'); } catch (e2) { /* trình duyệt chặn lưu trữ: bỏ qua */ }
            unlocked = true;
            var link = safeUrl(gateDoc && gateDoc.link);
            var a = $('[data-gate-link]', gateForm);
            $('[data-gate-msg]', gateForm).textContent = link
              ? 'Tài liệu đã sẵn sàng. Bấm nút dưới để mở.'
              : 'Tài liệu đang được hoàn thiện. TTN sẽ gửi cho bạn qua email hoặc Zalo.';
            a.hidden = !link;
            if (link) a.href = link;
            $('[data-gate-body]', gateForm).hidden = true;
            $('[data-gate-done]', gateForm).hidden = false;
            $$('input[name="ho_ten"], input[name="so_dien_thoai"], input[name="email"]', gateForm).forEach(function (i) { i.value = ''; });
            renderDocs();
          })
          .catch(function () { setStatus(st, 'error', 'Chưa gửi được. Vui lòng thử lại hoặc gọi ' + hotline + '.'); })
          .then(function () { btn.disabled = false; btn.innerHTML = label; });
      });
    }

    $$('a[href="#tim-kiem"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        search.scrollIntoView({ behavior: 'smooth', block: 'center' });
        search.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- Thẻ dự án (dùng ở Hồ sơ năng lực, trang dịch vụ, trang dự án) ---------- */
  var DUAN = (HS && HS.duAn) || [];
  function miniRow(k, v) { return v ? '<div><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>' : ''; }
  var MORE = ' <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function projectCard(p) {
    var href = p.id ? 'du-an.html?id=' + encodeURIComponent(p.id) : '';
    var inner = media(p.anh, '43', p.ten, 'Ảnh 14 · ' + p.ten, '4:3 · ≥ 1200px') +
      '<h3>' + esc(p.ten) + '</h3>' +
      '<p class="meta">' + [p.khachHang, p.diaDiem, p.nam].filter(Boolean).map(esc).join(' · ') + '</p>' +
      '<dl class="mini">' + miniRow('Hạng mục', p.hangMuc) + miniRow('Tiêu chuẩn', p.tieuChuan) + miniRow('Kết quả', p.ketQua) + '</dl>';
    return '<article class="project">' + (href
      ? '<a class="project-link" href="' + href + '">' + inner + '<span class="link-arrow">Xem câu chuyện dự án' + MORE + '</span></a>'
      : inner) + '</article>';
  }
  function projectPlaceholder(n) {
    return '<article class="project"><a class="project-link" href="du-an.html">' + placeholder('43', 'Ảnh 14 · Dự án tiêu biểu ' + n, '4:3 · ≥ 1200px') +
      '<h3 class="pending">Dự án tiêu biểu ' + n + '</h3>' +
      '<p class="meta">Khách hàng · Địa điểm · Năm</p>' +
      '<dl class="mini"><div><dt>Hạng mục</dt><dd class="pending">Đang cập nhật</dd></div>' +
      '<div><dt>Tiêu chuẩn</dt><dd class="pending">Đang cập nhật</dd></div>' +
      '<div><dt>Kết quả</dt><dd class="pending">Đang cập nhật</dd></div></dl>' +
      '<span class="link-arrow">Xem câu chuyện dự án' + MORE + '</span></a></article>';
  }
  $$('[data-projects]').forEach(function (el) {
    var svc = document.body.getAttribute('data-service');
    var cur = el.hasAttribute('data-exclude-current') ? params.get('id') : null;
    var list = DUAN.filter(function (p) { return (!svc || p.dichVu === svc) && (!cur || p.id !== cur); });
    var lim = parseInt(el.getAttribute('data-limit'), 10) || 0;
    if (lim) list = list.slice(0, lim);
    el.innerHTML = list.map(projectCard).join('');
    hideIfEmpty(el, list.length);
  });

  /* ---------- Hồ sơ năng lực ---------- */
  if (HS && page === 'profile') {
    var pdfBtn = $('[data-hs-pdf]');
    var pdf = safeUrl(HS.pdf);
    if (pdfBtn && pdf) {
      pdfBtn.href = pdf;
      pdfBtn.target = '_blank';
      pdfBtn.rel = 'noopener';
      pdfBtn.firstChild.textContent = 'Tải hồ sơ năng lực (PDF) ';
    }

    var tt = $('[data-hs="thongTin"]');
    if (tt) tt.innerHTML = (HS.thongTin || []).filter(function (r) { return !LIVE || r[1]; }).map(function (r) {
      return '<div><dt>' + esc(r[0]) + '</dt><dd' + (r[1] ? '' : ' class="pending"') + '>' + esc(r[1] || 'Đang cập nhật') + '</dd></div>';
    }).join('');

    var sl = $('[data-hs="soLieu"]');
    if (sl) {
      var soLieu = (HS.soLieu || []).filter(function (s) { return !LIVE || s.so; });
      sl.innerHTML = soLieu.map(function (s) {
        return '<div class="stat"><strong' + (s.so ? '' : ' class="pending"') + '>' + esc(s.so || '—') + '</strong><span>' + esc(s.nhan) + '</span></div>';
      }).join('');
      if (!soLieu.length) {
        sl.parentNode.hidden = true;
        var pg = sl.closest('.profile-grid');
        if (pg) pg.classList.add('single');
      }
    }

    var nums = [1, 2, 3];

    var da = $('[data-hs="duAn"]');
    if (da) {
      if (!DUAN.length && LIVE) hideSection(da);
      else da.innerHTML = DUAN.length ? DUAN.map(projectCard).join('') : nums.map(projectPlaceholder).join('');
    }

    var gp = $('[data-hs="giayPhep"]');
    if (gp && LIVE && !(HS.giayPhep || []).length) hideSection(gp);
    else if (gp) {
      var giayPhep = HS.giayPhep || [];
      gp.innerHTML = giayPhep.length
        ? giayPhep.map(function (g) {
            var link = safeUrl(g.link);
            return '<article class="license">' + media(g.anh, '34', g.ten, 'Ảnh 15 · ' + g.ten, 'Bản scan · cạnh dài ≥ 1500px') +
              '<h3>' + esc(g.ten) + '</h3>' + (g.coQuan ? '<p>' + esc(g.coQuan) + '</p>' : '') + (g.so ? '<p>' + esc(g.so) + '</p>' : '') +
              (link ? '<a class="link-arrow" href="' + esc(link) + '" target="_blank" rel="noopener">Xem bản scan</a>' : '') + '</article>';
          }).join('')
        : [1, 2, 3, 4].map(function (n) {
            return '<article class="license">' + placeholder('34', 'Ảnh 15 · Giấy phép / chứng chỉ ' + n, 'Bản scan · cạnh dài ≥ 1500px') +
              '<h3 class="pending">Giấy phép / chứng chỉ ' + n + '</h3><p>Cơ quan cấp · Số hiệu</p></article>';
          }).join('');
    }

    var nx = $('[data-hs="nhanXet"]');
    if (nx && LIVE && !(HS.nhanXet || []).length) hideSection(nx);
    else if (nx) {
      var nhanXet = HS.nhanXet || [];
      nx.innerHTML = nhanXet.length
        ? nhanXet.map(function (q) {
            return '<blockquote class="quote"><p>“' + esc(q.noiDung) + '”</p><footer><strong>' + esc(q.nguoi) + '</strong>' +
              [q.chucVu, q.congTy].filter(Boolean).map(function (x) { return ' · ' + esc(x); }).join('') + '</footer></blockquote>';
          }).join('')
        : [1, 2].map(function () {
            return '<blockquote class="quote is-empty"><p>Nhận xét của khách hàng sẽ hiển thị tại đây.</p><footer>Tên người nhận xét · Chức vụ · Công ty</footer></blockquote>';
          }).join('');
    }
  }

  /* ---------- Hỏi – đáp (dữ liệu: assets/data/hoi-dap.js) ---------- */
  /* Chạy thật: bỏ các câu đánh dấu mau: true (câu mẫu) */
  var faqs = (window.TTN_HOI_DAP || []).filter(function (q) { return !(LIVE && q.mau); });
  var SVC_PAGE = { pccc: 'dich-vu-pccc.html', atvsld: 'dich-vu-atvsld.html', 'huan-luyen': 'dich-vu-huan-luyen.html' };
  var PLUS = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  function faqItem(q) {
    var vid = ytId(q.video);
    var svc = SVC_PAGE[q.nhom];
    var fid = String(q.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    return '<details class="faq"' + (fid ? ' id="' + fid + '"' : '') + '><summary><span>' + esc(q.cauHoi) + '</span>' + PLUS + '</summary>' +
      '<div class="faq-body">' + (q.traLoi || '') + (vid ? ytBox(vid, q.cauHoi) : '') +
      '<p class="faq-links"><a href="hoi-dap.html#gui-cau-hoi">Hỏi thêm kỹ sư TTN</a>' +
      (svc ? '<a href="' + svc + '">Dịch vụ liên quan</a>' : '') + '</p></div></details>';
  }
  $$('[data-faq]').forEach(function (el) {
    var lim = parseInt(el.getAttribute('data-limit'), 10) || 0;
    var fixed = el.getAttribute('data-nhom') || document.body.getAttribute('data-service') || '';
    var sid = el.getAttribute('data-search');
    var box = sid ? document.getElementById(sid) : null;
    var countEl = $('[data-faq-count]');
    var current = 'all';
    var render = function () {
      var term = norm(box ? box.value.trim() : '');
      var list = faqs.filter(function (q) {
        var inGroup = fixed ? q.nhom === fixed : (current === 'all' || q.nhom === current);
        return inGroup && (!term || norm(q.cauHoi + ' ' + String(q.traLoi || '').replace(/<[^>]+>/g, ' ')).indexOf(term) > -1);
      });
      if (lim) list = list.slice(0, lim);
      el.innerHTML = list.length ? list.map(faqItem).join('') : '<p class="empty">Chưa có câu hỏi phù hợp. Hãy gửi câu hỏi cho kỹ sư TTN.</p>';
      if (countEl && !fixed) countEl.textContent = list.length + ' câu hỏi';
      hideIfEmpty(el, list.length);
    };
    var gid = el.getAttribute('data-filter');
    var grp = gid ? document.getElementById(gid) : null;
    /* Trang Hỏi – đáp chưa có câu nào (chạy thật): ẩn cả khối danh sách, chỉ giữ form gửi câu hỏi */
    if (grp && LIVE && !faqs.length) {
      hideSection(el);
      var askTitle = $('#gui-cau-hoi h2');
      if (askTitle) askTitle.textContent = 'Gửi câu hỏi cho kỹ sư TTN';
      return;
    }
    if (grp) setupChips(grp, params.get('nhom') || 'all', function (v) { current = v; render(); });
    else render();
    if (box) box.addEventListener('input', render);
  });
  if (page === 'faq' && location.hash) {
    var openQ = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (openQ && openQ.tagName === 'DETAILS') {
      openQ.open = true;
      setTimeout(function () { openQ.scrollIntoView({ block: 'start' }); }, 60);
    }
  }

  /* ---------- Trang câu chuyện dự án (du-an.html?id=...) ---------- */
  if (page === 'project') {
    var pid = params.get('id');
    var P = DUAN.filter(function (p) { return p.id === pid; })[0] || (pid ? null : DUAN[0]) || null;
    /* Chạy thật mà không có dự án này: chuyển về Hồ sơ năng lực */
    if (!P && LIVE) location.replace('ho-so-nang-luc.html');
    var demo = !P;
    P = P || {};
    var pend = function (v) { return v ? esc(v) : '<span class="pending">Đang cập nhật</span>'; };
    var keep = function (pair) { return demo || pair[1]; };

    if (P.ten) {
      document.title = P.ten + ' — Dự án TTN Fire Safety Solution';
      $('[data-cs-title]').textContent = P.ten;
    }
    if (P.tomTat) {
      $('[data-cs-lead]').textContent = P.tomTat;
      var mdesc = $('meta[name="description"]'); if (mdesc) mdesc.setAttribute('content', P.tomTat);
    }
    var heroImg = $('[data-cs-hero]');
    if (heroImg && safeUrl(P.anh)) { heroImg.setAttribute('data-fb', ''); heroImg.hidden = false; heroImg.src = safeUrl(P.anh); }

    var facts = [['Khách hàng', P.khachHang], ['Địa điểm', P.diaDiem], ['Năm', P.nam], ['Hạng mục', P.hangMuc], ['Tiêu chuẩn', P.tieuChuan], ['Kết quả', P.ketQua]].filter(keep);
    $('[data-cs-facts]').innerHTML = facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + pend(f[1]) + '</dd></div>'; }).join('');

    var story = [['Bối cảnh', P.boiCanh], ['Khảo sát', P.vanDe], ['Giải pháp', P.giaiPhap], ['Kết quả', P.ketQuaChiTiet || P.ketQua]].filter(keep);
    $('[data-cs-story]').innerHTML = story.map(function (s, i) {
      return '<li><span class="step-num">0' + (i + 1) + '</span><div><h3>' + s[0] + '</h3><p>' + pend(s[1]) + '</p></div></li>';
    }).join('');

    var ba = $('[data-cs-ba]');
    if (demo || P.anhTruoc || P.anhSau) {
      ba.innerHTML = '<h2>Trước &amp; sau</h2><div class="ba-grid">' +
        '<div class="ba-item"><span class="ba-tag">Trước</span>' + media(P.anhTruoc, '43', 'Trước khi thực hiện', 'Ảnh 14 · Hiện trạng trước khi thực hiện', '4:3 · ≥ 1200px') + '</div>' +
        '<div class="ba-item"><span class="ba-tag is-after">Sau</span>' + media(P.anhSau, '43', 'Sau khi thực hiện', 'Ảnh 14 · Sau khi hoàn thành', '4:3 · ≥ 1200px') + '</div></div>';
    }
    var csVid = ytId(P.video);
    var vbox = $('[data-cs-video]');
    if (csVid) vbox.innerHTML = '<h2>Video dự án</h2>' + ytBox(csVid, P.ten);
    else if (demo) vbox.innerHTML = '<h2>Video dự án</h2>' + placeholder('169', 'Video dự án (không bắt buộc)', 'Dán link YouTube vào video: "..." trong ho-so.js');
    var gal = (P.thuVien || []).filter(Boolean);
    var gbox = $('[data-cs-gallery]');
    if (gal.length) gbox.innerHTML = '<h2>Hình ảnh dự án</h2><div class="gallery">' + gal.map(function (g) { return media(g, '43', P.ten || '', '', ''); }).join('') + '</div>';
    else if (demo) gbox.innerHTML = '<h2>Hình ảnh dự án</h2><div class="gallery">' + [1, 2, 3].map(function (n) { return placeholder('43', 'Ảnh 14 · Ảnh công trình ' + n, 'thuVien: [...] trong ho-so.js'); }).join('') + '</div>';
    var nx2 = P.nhanXet;
    var qbox = $('[data-cs-quote]');
    if (nx2 && nx2.noiDung) {
      qbox.innerHTML = '<blockquote class="quote"><p>“' + esc(nx2.noiDung) + '”</p><footer><strong>' + esc(nx2.nguoi) + '</strong>' +
        [nx2.chucVu, nx2.congTy || P.khachHang].filter(Boolean).map(function (x) { return ' · ' + esc(x); }).join('') + '</footer></blockquote>';
    } else if (demo) {
      qbox.innerHTML = '<blockquote class="quote is-empty"><p>Nhận xét của khách hàng về dự án sẽ hiển thị tại đây.</p><footer>Tên người nhận xét · Chức vụ · Công ty</footer></blockquote>';
    }
    if (P.dichVu) pickService(P.dichVu);
  }

  /* ---------- Video giới thiệu trang chủ (config.js: videoGioiThieu) ---------- */
  var intro = $('[data-intro-video]');
  if (intro) {
    var introId = ytId(cfg.videoGioiThieu);
    var introBtn = $('[data-intro-play]', intro);
    if (introId) {
      intro.classList.add('has-video');
      var poster = $('.video-poster', intro);
      var useThumb = function () { poster.setAttribute('data-fb', '3'); poster.hidden = false; poster.src = 'https://i.ytimg.com/vi/' + introId + '/maxresdefault.jpg'; };
      if (poster && (poster.hidden || (poster.complete && !poster.naturalWidth))) useThumb();
      else if (poster) poster.addEventListener('error', useThumb, { once: true });
      introBtn.addEventListener('click', function () {
        var frame = document.createElement('div');
        frame.className = 'video-frame';
        frame.innerHTML = ytFrame(introId, 'Video giới thiệu TTN');
        intro.appendChild(frame);
        intro.classList.add('is-playing');
      });
    } else if (LIVE) {
      hideSection(intro);
    } else {
      intro.classList.add('is-empty');
      introBtn.disabled = true;
    }
  }

  /* ---------- Trang chủ: khối Hồ sơ năng lực chỉ liệt kê mục đã có nội dung ---------- */
  var needs = $$('[data-need]');
  if (needs.length && LIVE && HS) {
    needs.forEach(function (li) {
      var k = li.getAttribute('data-need');
      if (k !== 'always' && !(HS[k] || []).length) li.hidden = true;
    });
    var shown = needs.filter(function (li) { return !li.hidden; });
    if (shown.length <= 1 && !DUAN.length) hideSection(needs[0]);
    else shown.forEach(function (li, n) { var num = $('.num', li); if (num) num.textContent = '0' + (n + 1); });
  }

  /* ---------- Khung chat Zalo OA (config.js: zaloOA) ---------- */
  if (zaloOA) {
    var zw = document.createElement('div');
    zw.className = 'zalo-chat-widget';
    zw.setAttribute('data-oaid', zaloOA);
    zw.setAttribute('data-welcome-message', 'Xin chào! TTN có thể giúp gì cho bạn?');
    zw.setAttribute('data-autopopup', '0');
    zw.setAttribute('data-width', '350');
    zw.setAttribute('data-height', '420');
    document.body.appendChild(zw);
    document.body.classList.add('has-zalo-chat');
    loadZaloSdk();
  }

  /* ---------- Thanh chia sẻ ở bài viết, dự án ---------- */
  $$('[data-share]').forEach(function (el) {
    if (el.hasAttribute('data-share-quiz')) return;
    renderShare(el, pageUrl(), document.title, page === 'project' ? 'Chia sẻ dự án' : 'Chia sẻ bài viết');
  });

  /* ---------- Tự kiểm tra PCCC (dữ liệu: assets/data/tu-kiem-tra.js) ---------- */
  var KT = window.TTN_KIEM_TRA;
  var quiz = $('[data-quiz]');
  if (quiz && KT && KT.cauHoi && KT.cauHoi.length) {
    var Q = KT.cauHoi;
    var NH = KT.nhom || {};
    var NG = KT.nguong || { tot: 80, cao: 50 };
    var DIEM = { co: 2, 'khong-ro': 1, chua: 0 };
    var TRA_LOI = { co: 'Có', chua: 'Chưa', 'khong-ro': 'Không chắc' };
    var DV_TEN = { pccc: 'Tư vấn thiết kế PCCC', atvsld: 'An Toàn Vệ Sinh Lao Động', 'huan-luyen': 'Huấn luyện & Đào tạo' };
    var answers = [];
    var idx = 0;
    var step = $('[data-quiz-step]', quiz);
    var result = $('[data-quiz-result]', quiz);
    var qText = $('[data-quiz-q]', quiz);
    var backBtn = $('[data-quiz-back]', quiz);

    var groupsEl = $('[data-quiz-groups]');
    if (groupsEl) {
      var counts = {};
      Q.forEach(function (q) { counts[q.nhom] = (counts[q.nhom] || 0) + 1; });
      groupsEl.innerHTML = Object.keys(counts).map(function (k) {
        return '<li><span>' + esc((NH[k] || {}).ten || k) + '</span><strong>' + counts[k] + ' câu</strong></li>';
      }).join('');
    }

    var renderQuestion = function (focus) {
      var q = Q[idx];
      $('[data-quiz-group]', quiz).textContent = (NH[q.nhom] || {}).ten || '';
      $('[data-quiz-count]', quiz).textContent = 'Câu ' + (idx + 1) + '/' + Q.length;
      $('[data-quiz-bar]', quiz).style.width = (idx / Q.length * 100) + '%';
      qText.textContent = q.cauHoi;
      $('[data-quiz-hint]', quiz).textContent = q.goiY || '';
      $$('[data-answer]', quiz).forEach(function (b) {
        b.setAttribute('aria-pressed', String(answers[idx] === b.getAttribute('data-answer')));
      });
      backBtn.hidden = idx === 0;
      if (focus) qText.focus({ preventScroll: true });
    };

    var setField = function (name, value) {
      var el = $('[data-quiz-field="' + name + '"]', quiz);
      if (el) el.value = value;
    };

    var showResult = function () {
      var total = 0, max = 0, critNo = 0, groups = {}, todo = [];
      Q.forEach(function (q, i) {
        var w = q.quanTrong ? 2 : 1;
        var a = answers[i];
        var g = groups[q.nhom] || (groups[q.nhom] = { d: 0, m: 0 });
        total += DIEM[a] * w; max += 2 * w;
        g.d += DIEM[a] * w; g.m += 2 * w;
        if (a !== 'co') todo.push({ q: q, a: a });
        if (q.quanTrong && a === 'chua') critNo++;
      });
      var score = Math.round(total / max * 100);
      var key = score >= NG.tot && critNo === 0 ? 'tot' : (score < NG.cao || critNo >= 2 ? 'cao' : 'chu-y');
      var lv = (KT.mucDo || {})[key] || { ten: key, moTa: '' };
      todo.sort(function (x, y) { return (x.a === 'chua' ? 0 : 1) - (y.a === 'chua' ? 0 : 1); });

      var html = '<div class="result lv-' + key + '">' +
        '<div class="result-head">' +
          '<div class="score-ring" style="--p:' + score + '"><span><strong>' + score + '</strong>/100</span></div>' +
          '<div><h2 tabindex="-1" data-result-title>' + esc(lv.ten) + '</h2><p>' + esc(lv.moTa) + '</p></div>' +
        '</div>' +
        '<div class="result-groups">' + Object.keys(groups).map(function (k) {
          var p = Math.round(groups[k].d / groups[k].m * 100);
          return '<div class="rg"><span>' + esc((NH[k] || {}).ten || k) + '</span><div class="meter"><i style="width:' + p + '%"></i></div><b>' + p + '%</b></div>';
        }).join('') + '</div>';
      if (todo.length) {
        html += '<h3 class="todo-title">Hạng mục cần xem lại (' + todo.length + ')</h3><ul class="todo-list">' +
          todo.map(function (t) {
            var dv = (NH[t.q.nhom] || {}).dichVu || 'pccc';
            return '<li class="is-' + t.a + '"><span class="todo-tag">' + TRA_LOI[t.a] + '</span><div><strong>' + esc(t.q.ten) + '</strong>' +
              '<a href="tu-van.html?dv=' + encodeURIComponent(dv) + '#dang-ky">Tư vấn: ' + esc(DV_TEN[dv] || dv) + '</a></div></li>';
          }).join('') + '</ul>';
      } else {
        html += '<p class="todo-none">Bạn trả lời "Có" cho tất cả câu hỏi. Kỹ sư TTN có thể rà soát độc lập để chắc chắn.</p>';
      }
      html += '</div>';
      $('[data-quiz-summary]', quiz).innerHTML = html;

      setField('ket_qua', lv.ten + ' (' + score + '/100)');
      setField('can_xem_lai', todo.length ? todo.map(function (t) { return t.q.ten + ': ' + TRA_LOI[t.a]; }).join('; ') : 'Không có');
      setField('tra_loi', Q.map(function (q, i) { return (i + 1) + '. ' + q.ten + ': ' + TRA_LOI[answers[i]]; }).join('\n'));

      var quizShare = $('[data-share-quiz]', quiz);
      if (quizShare) renderShare(quizShare, pageUrl().split('?')[0], 'Bài tự kiểm tra PCCC nhà máy trong 3 phút của TTN Fire Safety Solution.', 'Gửi bài kiểm tra cho đồng nghiệp');

      step.hidden = true;
      result.hidden = false;
      quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var title = $('[data-result-title]', quiz);
      if (title) title.focus({ preventScroll: true });
    };

    $$('[data-answer]', quiz).forEach(function (b) {
      b.addEventListener('click', function () {
        answers[idx] = b.getAttribute('data-answer');
        if (idx < Q.length - 1) { idx++; renderQuestion(true); }
        else showResult();
      });
    });
    backBtn.addEventListener('click', function () {
      if (idx > 0) { idx--; renderQuestion(true); }
    });
    $('[data-quiz-restart]', quiz).addEventListener('click', function () {
      answers = []; idx = 0;
      var st = $('.form-status', result);
      if (st) { st.textContent = ''; st.className = 'form-status'; }
      result.hidden = true; step.hidden = false;
      renderQuestion(true);
      quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    renderQuestion(false);
  }

  /* ---------- Khối nằm vắt giữa hai mục (section-flush): nền nửa trên theo mục trước, nửa dưới theo mục sau ---------- */
  var bgOf = function (el) {
    var c = el ? getComputedStyle(el).backgroundColor : '';
    return !c || c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c) ? '#fff' : c;
  };
  $$('.section-flush').forEach(function (s) {
    var prev = s.previousElementSibling;
    while (prev && prev.hidden) prev = prev.previousElementSibling;
    var next = s.nextElementSibling;
    while (next && next.hidden) next = next.nextElementSibling;
    s.style.background = 'linear-gradient(180deg, ' + bgOf(prev) + ' 50%, ' + bgOf(next) + ' 50%)';
  });
})();
