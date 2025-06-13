# Yüküm Yolda - Tasarım Rehberi

## 🎨 Renk Paleti

### Ana Renkler

```css
/* Mavi Tonları */
--blue-50: #eff6ff
--blue-100: #dbeafe
--blue-600: #2563eb
--blue-700: #1d4ed8

/* Mor Tonları */
--purple-50: #faf5ff
--purple-100: #f3e8ff
--purple-600: #9333ea
--purple-700: #7c3aed

/* Yeşil Tonları (Ücretsiz vurgusu için) */
--green-100: #dcfce7
--green-400: #4ade80
--green-500: #22c55e
--green-600: #16a34a
--green-800: #166534

/* Gri Tonları */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-400: #9ca3af
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827

/* Turuncu Tonları (Vurgu için) */
--orange-50: #fff7ed
--orange-100: #ffedd5
--orange-500: #f97316
--orange-600: #ea580c
```

### Gradient Kombinasyonları

```css
/* Ana Gradient */
.gradient-primary: from-blue-600 to-purple-600

/* Arka Plan Gradientleri */
.gradient-bg-1: from-blue-50 via-purple-50 to-indigo-50
.gradient-bg-2: from-gray-50 to-blue-50
.gradient-bg-3: from-white via-blue-50 to-purple-50

/* CTA Gradient */
.gradient-cta: from-blue-600 via-purple-600 to-blue-700

/* Kart Gradientleri */
.gradient-card-blue: from-blue-50 to-blue-100
.gradient-card-green: from-green-50 to-green-100
.gradient-card-purple: from-purple-50 to-purple-100
.gradient-card-orange: from-orange-50 to-orange-100
```

## 📝 Tipografi

### Font Boyutları

```css
/* Başlıklar */
.text-6xl: 3.75rem (60px) - Ana Hero Başlık
.text-5xl: 3rem (48px) - Büyük Başlık
.text-4xl: 2.25rem (36px) - Bölüm Başlığı
.text-3xl: 1.875rem (30px) - Alt Başlık
.text-2xl: 1.5rem (24px) - Kart Başlığı
.text-xl: 1.25rem (20px) - Küçük Başlık
.text-lg: 1.125rem (18px) - Büyük Metin

/* Gövde Metinleri */
.text-base: 1rem (16px) - Normal Metin
.text-sm: 0.875rem (14px) - Küçük Metin
.text-xs: 0.75rem (12px) - Çok Küçük Metin
```

### Font Ağırlıkları

```css
.font-bold: 700 - Başlıklar için
.font-semibold: 600 - Alt başlıklar için
.font-medium: 500 - Vurgu metinleri için
.font-normal: 400 - Normal metin için
```

## 🧩 Bileşen Stilleri

### Butonlar

#### Ana Buton (Primary)

```css
.btn-primary {
  @apply px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300;
}
```

#### İkincil Buton (Secondary)

```css
.btn-secondary {
  @apply px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300;
}
```

#### Şeffaf Buton (Ghost)

```css
.btn-ghost {
  @apply px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300;
}
```

### Kartlar

#### Özellik Kartı

```css
.feature-card {
  @apply group bg-gradient-to-br p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300;
}

.feature-icon {
  @apply rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300;
}
```

#### İstatistik Kartı

```css
.stat-card {
  @apply text-center p-6 bg-gradient-to-br rounded-2xl;
}

.stat-number {
  @apply text-3xl sm:text-4xl font-bold mb-2;
}

.stat-label {
  @apply text-gray-600 font-medium;
}
```

### Rozetler (Badges)

#### Ücretsiz Rozeti

```css
.badge-free {
  @apply inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium;
}
```

#### Durum Rozeti

```css
.badge-status {
  @apply inline-block px-3 py-1 rounded-full text-xs font-medium;
}
```

## 🎭 İkonlar ve Semboller

### Ana İkonlar

- **Truck**: Platform logosu ve nakliye vurgusu
- **Shield**: Güvenlik ve güven
- **MapPin**: Konum ve rota
- **Clock**: 7/24 hizmet
- **Zap**: Hız ve anlık işlem
- **Users**: Topluluk
- **Eye**: Misafir gezinti
- **CheckCircle**: Onay ve başarı

### İkon Boyutları

```css
.icon-xs: w-4 h-4 (16px)
.icon-sm: w-5 h-5 (20px)
.icon-md: w-6 h-6 (24px)
.icon-lg: w-8 h-8 (32px)
```

## 🎬 Animasyonlar

### Geçiş Süreleri

```css
.duration-300: 300ms - Standart hover efektleri
.duration-500: 500ms - Modal ve menü animasyonları
.duration-700: 700ms - Sayfa geçişleri
```

### Hover Efektleri

```css
/* Kart Hover */
.card-hover {
  @apply hover:shadow-2xl hover:scale-105 transition-all duration-300;
}

/* Buton Hover */
.btn-hover {
  @apply hover:shadow-xl hover:scale-105 transition-all duration-300;
}

/* İkon Hover */
.icon-hover {
  @apply group-hover:scale-110 transition-transform duration-300;
}

/* Rotasyon Hover */
.rotate-hover {
  @apply group-hover:rotate-6 transition-transform duration-300;
}
```

### Mobil Menü Animasyonları

```css
/* Hamburger Animasyonu */
.hamburger-line {
  @apply absolute w-6 h-0.5 bg-white transition-all duration-300;
}

/* Menü Slide Animasyonu */
.menu-slide {
  @apply transform transition-transform duration-500 ease-out;
}
```

## 📱 Responsive Tasarım

### Breakpoint'ler

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobil Öncelikli Yaklaşım

- Tüm bileşenler önce mobil için tasarlanır
- Desktop özellikleri `md:` ve üzeri prefix'lerle eklenir
- Mobil menü 768px altında aktif olur

## 🎯 Özel Vurgular

### "Ücretsiz" Vurgusu

```css
.free-highlight {
  @apply text-green-600 font-semibold;
}

.free-badge {
  @apply bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium;
}
```

### "7/24" Vurgusu

```css
.always-on {
  @apply text-orange-600 font-bold;
}
```

### Gradient Metin

```css
.gradient-text {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}
```

## 🔧 Yardımcı Sınıflar

### Spacing (Boşluklar)

```css
.section-padding: py-16 sm:py-20
.container-padding: px-4 sm:px-6
.card-padding: p-6 sm:p-8
```

### Shadows (Gölgeler)

```css
.shadow-soft: shadow-lg
.shadow-strong: shadow-2xl
.shadow-colored: shadow-blue-200/50
```

### Backdrop Effects

```css
.backdrop-blur-soft: backdrop-blur-sm
.backdrop-overlay: bg-black/60 backdrop-blur-sm
```

## 📋 Kullanım Örnekleri

### Sayfa Yapısı

```jsx
<div className="min-h-screen bg-white">
  <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
    {/* Header içeriği */}
  </header>

  <main>
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Hero section */}
    </section>

    <section className="py-16 sm:py-20 bg-white">
      {/* İçerik bölümleri */}
    </section>
  </main>

  <footer className="bg-gray-900 text-white py-12 sm:py-16">
    {/* Footer içeriği */}
  </footer>
</div>
```

### Kart Bileşeni

```jsx
<div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
  <div className="bg-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
    <Icon className="h-8 w-8 text-white" />
  </div>
  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Başlık</h3>
  <p className="text-gray-600 text-center leading-relaxed">Açıklama metni</p>
</div>
```

## 🎨 Marka Kimliği

### Logo Kullanımı

- Ana logo: Truck ikonu + "Yüküm Yolda" metni
- Renk: Gradient (blue-600 to purple-600)
- Alt metin: "ÜCRETSİZ" (yeşil renkte)

### Ton of Voice

- Samimi ve güvenilir
- "Ücretsiz" vurgusu her yerde
- Teknik jargon yerine sade Türkçe
- Kullanıcıyı motive eden ifadeler

Bu tasarım rehberi, tüm sayfalarda tutarlı ve profesyonel bir görünüm sağlamak için kullanılmalıdır.
