# Smile Group — Menü Karşılaştırma

Diş kliniği hizmet menüsünün **mevcut** ve **önerilen** sürümlerini yan yana gösteren statik kıyas materyali.
Müşteri sunumu içindir.

## Sayfalar
- `index.html` — karşılaştırma girişi (özet + yan yana önizleme)
- `mevcut.html` — **Mevcut menü** (76 satır, birebir mevcut sürüm)
- `onerilen.html` — **Önerilen menü** (45 gerçek hizmet, 8 branş)

## Yayında (GitHub Pages)
Repo `Settings → Pages → Deploy from branch → main / root` yapıldığında:
- Karşılaştırma: `https://<kullanıcı>.github.io/smilegroup/`
- Mevcut: `https://<kullanıcı>.github.io/smilegroup/mevcut.html`
- Önerilen: `https://<kullanıcı>.github.io/smilegroup/onerilen.html`

## Yerel önizleme
```
node server.js   # http://localhost:5599
```

## Özet fark
| | Mevcut | Önerilen |
|---|---|---|
| Satır/hizmet | 76 satır | 45 gerçek hizmet |
| Semptom/SEO sayfası | menüde (28) | ayrı "Şikayetiniz Ne?" alanı |
| Teknoloji vaatleri | menüde | "Neden Biz" bölümü |
| Materyal çeşitleri | ayrı satır | tek "Kron" başlığı |
| Tekrarlar | 2 | 0 |
