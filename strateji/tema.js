// ═══ TEMA SEÇİCİ — gece / gündüz / sade ═══
// Tercih localStorage'da tutulur; sayfa yüklenmeden uygulanır (flaş yok).
(function () {
  var ANAHTAR = 'sg_tema';
  var TEMALAR = [
    { id: 'gece', ikon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>', ad: 'Gece modu' },
    { id: 'acik', ikon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none"/><path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/></svg>', ad: 'Gündüz modu' },
    { id: 'sade', ikon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H10a2 2 0 0 1 2 2v14a1.5 1.5 0 0 0-1.5-1.5h-5A2.5 2.5 0 0 1 3 15z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H14a2 2 0 0 0-2 2v14a1.5 1.5 0 0 1 1.5-1.5h5A2.5 2.5 0 0 0 21 15z"/></svg>', ad: 'Sade okuma modu' }
  ];

  function uygula(id) {
    if (id === 'gece') document.documentElement.removeAttribute('data-tema');
    else document.documentElement.setAttribute('data-tema', id);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', id === 'acik' ? '#f6f8fc' : id === 'sade' ? '#f7f5f0' : '#05070d');
  }

  function kayitli() {
    try { return localStorage.getItem(ANAHTAR); } catch (e) { return null; }
  }

  // 1) Erken uygulama — CSS yüklenirken bile doğru tema aktif
  var secili = kayitli();
  if (!secili) {
    // sistem tercihi: açık ekran kullanıcısına gündüz modu
    secili = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'acik' : 'gece';
  }
  uygula(secili);

  // 2) Seçiciyi header'a ekle
  function kur() {
    var nav = document.querySelector('.topnav');
    if (!nav || nav.querySelector('.tema-sec')) return;

    var kutu = document.createElement('span');
    kutu.className = 'tema-sec';
    kutu.setAttribute('role', 'group');
    kutu.setAttribute('aria-label', 'Görünüm modu');

    TEMALAR.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = t.ikon;
      b.title = t.ad;
      b.setAttribute('aria-label', t.ad);
      if (t.id === secili) b.classList.add('on');
      b.addEventListener('click', function () {
        secili = t.id;
        uygula(secili);
        try { localStorage.setItem(ANAHTAR, secili); } catch (e) { }
        [].forEach.call(kutu.children, function (x) { x.classList.toggle('on', x === b); });
      });
      kutu.appendChild(b);
    });

    nav.appendChild(kutu);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kur);
  else kur();
})();
