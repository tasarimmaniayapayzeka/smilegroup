// ═══ TEMA SEÇİCİ — gece / gündüz / sade ═══
// Tercih localStorage'da tutulur; sayfa yüklenmeden uygulanır (flaş yok).
(function () {
  var ANAHTAR = 'sg_tema';
  var TEMALAR = [
    { id: 'gece', ikon: '🌙', ad: 'Gece modu' },
    { id: 'acik', ikon: '☀️', ad: 'Gündüz modu' },
    { id: 'sade', ikon: '📖', ad: 'Sade okuma modu' }
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
      b.textContent = t.ikon;
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
