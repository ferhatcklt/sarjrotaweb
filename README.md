# ŞarjRota Web

Elektrikli araç sahipleri için akıllı şarj istasyonu rota planlama uygulaması.

## 🔋 Özellikler

- **Akıllı Rota Planlama** — Batarya seviyesine göre en uygun şarj duraklarını hesaplar
- **İnteraktif Harita** — Leaflet tabanlı harita üzerinde gerçek zamanlı rota görselleştirme
- **Araç Veritabanı** — Türkiye'deki popüler elektrikli araç modellerinin teknik verileri
- **Şarj İstasyonları** — ZES, Eşarj, Trugo ve Tesla Supercharger lokasyonları

## 🛠 Teknolojiler

- **React 19** + TypeScript
- **Vite** — Build tool
- **TailwindCSS 4** — Styling
- **Leaflet** — Harita
- **Zustand** — State management
- **Vitest** — Testing

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Testleri çalıştır
npm run test
```

## 📁 Proje Yapısı

```
src/
├── components/     # React bileşenleri (Sidebar, Map, vb.)
├── store/          # Zustand state management
├── types/          # TypeScript tip tanımları
├── test/           # Unit testler
└── assets/         # Statik dosyalar
```

## 🔗 İlgili Projeler

- [ŞarjRota API](https://github.com/ferhatcklt/sarjrotaapi) — .NET Backend
- [ŞarjRota Mobil](https://github.com/ferhatcklt/sarjrotamobil) — React Native / Expo

## 📄 Lisans

MIT
