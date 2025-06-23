"use client";

import {
  Truck,
  Shield,
  MapPin,
  CheckCircle,
  Clock,
  Zap,
  Users,
  Eye,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Yüküm Yolda
                </span>
                <div className="text-xs text-green-600 font-semibold">
                  ÜCRETSİZ YÜKÜN HAZIR
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#ozellikler"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Özellikler
              </a>
              <a
                href="#nasil-calisir"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Nasıl Çalışır
              </a>
              <Link
                href="/giris-yap"
                className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Giriş Yap
              </Link>
              <Link
                href="/kayit-ol"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                Kayıt Ol
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
              onClick={toggleMobileMenu}
              aria-label="Menüyü aç/kapat">
              <div className="relative w-6 h-6">
                <span
                  className={`absolute  left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-3 " : "top-1"
                  }`}></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}></span>
                <span
                  className={`absolute  left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"
                  }`}></span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed  inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}>
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 h-[480px] w-full bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl transform transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}>
          <div className="p-6 space-y-6  overflow-y-auto">
            {/* Navigation Links */}

            {/* Action Buttons */}
            <div className="space-y-3 pt-16">
              <Link
                href="/giris-yap"
                className="w-full p-4 bg-white/70 hover:bg-blue-50 rounded-xl transition-all duration-300 text-left flex items-center justify-between group"
                onClick={closeMobileMenu}>
                <div>
                  <div className="font-semibold text-blue-600">Giriş Yap</div>
                  <div className="text-sm text-gray-600">Hesabınıza erişin</div>
                </div>
                <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </Link>

              <Link
                href="/kayit-ol"
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-left flex items-center justify-between group"
                onClick={closeMobileMenu}>
                <div>
                  <div className="font-bold text-white">Ücretsiz Kayıt Ol</div>
                  <div className="text-sm text-white/90">
                    Hemen başla • Gizli ücret yok
                  </div>
                </div>
                <div className="bg-white/20 rounded-full p-2">
                  <User className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Link>

              <button
                className="w-full p-4 bg-white/70 hover:bg-gray-50 rounded-xl transition-all duration-300 text-left flex items-center justify-between group border-2 border-dashed border-gray-300"
                onClick={closeMobileMenu}>
                <div>
                  <div className="font-semibold text-gray-700">
                    Misafir Olarak Gez
                  </div>
                  <div className="text-sm text-gray-600">
                    Kayıt olmadan keşfet
                  </div>
                </div>
                <Eye className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <div className="font-semibold text-green-600 mb-1">
                  ✨ Her Zaman Ücretsiz ✨
                </div>
                <div>Gizli ücret yok • Sınırsız kullanım</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              7/24 Yük İlanları Takibi • Tamamen Ücretsiz
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Nakliyeciler ve Araç Sahipleri
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Burada Buluşur
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Parça yükten tam araç yüküne, kamyonetten tır&apos;a kadar tüm
              nakliye ihtiyaçlarınız için
              <strong className="text-blue-600"> ücretsiz platform</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none mb-8">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                Ücretsiz Başla
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                <Eye className="w-5 h-5 mr-2" />
                Misafir Olarak Gez
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto text-center">
              <div className="bg-white/60 flex  flex-col justify-between items-center backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">7/24</div>
                <div className="text-xs text-gray-600">İlan Takibi</div>
              </div>
              <div className="bg-white/60 flex  flex-col justify-between items-center backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-2xl font-bold text-green-600">%100</div>
                <div className="text-xs text-gray-600">Ücretsiz</div>
              </div>
              <div className="bg-white/60 flex  flex-col justify-between items-center backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-5xl font-bold text-purple-600">∞</div>
                <div className="text-xs text-gray-600">Sınırsız İlan</div>
              </div>
              <div className="bg-white/60 flex  flex-col justify-between items-center backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-3xl font-bold text-orange-600">⚡</div>
                <div className="text-xs text-gray-600">Anında İletişim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="ozellikler" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Neden Yüküm Yolda&apos;yı Seçmelisiniz?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Türkiye&apos;nin en kapsamlı ücretsiz nakliye platformu
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="bg-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Her Araç Tipi
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Kamyonet, kamyon, tır - hangi aracınız olursa olsun, size uygun
                yük bulmanız sadece birkaç tık uzağınızda
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Sınırsız İlan
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="bg-green-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Parça & Tam Yük
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                İster parça yük taşıyın, ister tam araç dolusu. Her ihtiyaca
                uygun yük bulun!
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Esnek Seçenekler
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                7/24 Canlı Platform
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Gece gündüz demeden, sürekli güncellenen canlı yük ilanları ile
                fırsatları kaçırmayın
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Kesintisiz Hizmet
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="nasil-calisir"
        className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              3 Adımda Yük Bulun
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hemen başlayın, hiçbir ücret ödemeden kazanmaya başlayın
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  ÜCRETSİZ
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Hızlı Kayıt
              </h3>
              <p className="text-gray-600 leading-relaxed">
                2 dakikada ücretsiz hesap oluşturun. Hiçbir gizli ücret yok!
              </p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  KOLAY
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                İlan Ver/Bul
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Araç sahipseniz yük bulun, yük sahipseniz araç bulun
              </p>
            </div>

            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  ANINDA
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Anlaşın & Kazanın
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Doğrudan iletişime geçin, anlaşın ve para kazanmaya başlayın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Rakamlarla Yüküm Yolda
            </h2>
            <p className="text-lg text-gray-600">
              Büyüyen topluluğumuzun bir parçası olun
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600 font-medium">Aktif Kullanıcı</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Günlük İlan</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                %95
              </div>
              <div className="text-gray-600 font-medium">Yük Bulma Oranı</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
                7/24
              </div>
              <div className="text-gray-600 font-medium">Canlı İlan Takibi</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Hemen Başlayın, Hiç Ücret Ödemeyin!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Binlerce nakliyeci ve araç sahibi zaten kazanıyor. Siz de bu fırsatı
            kaçırmayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
              Ücretsiz Kayıt Ol
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center">
              <Eye className="w-5 h-5 mr-2" />
              Önce Misafir Gez
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Yüküm Yolda</span>
                  <div className="text-xs text-green-400 font-semibold">
                    100% ÜCRETSİZ
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Nakliyeciler ve araç sahiplerini buluşturan Türkiye&apos;nin en
                büyük ücretsiz platform
              </p>
              <div className="flex space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="bg-green-600 p-2 rounded-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Yük Bul
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Araç Bul
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Canlı İlanlar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Destek</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    7/24 Yardım
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Nasıl Kullanılır
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    İletişim
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Şirket</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gizlilik
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kullanım Şartları
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              &copy; 2025 Yüküm Yolda - Türkiye&apos;nin En Büyük Ücretsiz
              Nakliye Platformu
            </p>
            <p className="text-sm text-green-400 font-semibold">
              ✨ Her Zaman Ücretsiz • Gizli Ücret Yok • Sınırsız Kullanım ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
