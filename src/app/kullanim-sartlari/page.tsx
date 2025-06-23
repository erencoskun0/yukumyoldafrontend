"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  Shield,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Clock,
  Mail,
  Lock,
  Eye,
  Database,
  Globe,
  Scale,
} from "lucide-react";
import { useState } from "react";

export default function KullaniciSartlariPage() {
  const [activeSection, setActiveSection] = useState<string>("");

  // Sayfa scroll ettiğinde aktif bölümü belirle
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Ana Sayfa</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-3">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Kullanıcı Şartları
                </h1>
                <p className="text-gray-600">Yüküm Yolda Kullanım Koşulları</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Güvenli & Şeffaf
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - İçindekiler */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                İçindekiler
              </h3>
              <nav className="space-y-2">
                {[
                  {
                    id: "genel-bilgiler",
                    title: "Genel Bilgiler",
                    icon: AlertCircle,
                  },
                  {
                    id: "taraflar",
                    title: "Taraflar ve Kapsam",
                    icon: Users,
                  },
                  {
                    id: "platform-kullanimi",
                    title: "Hizmet Tanımı",
                    icon: Truck,
                  },
                  {
                    id: "kullanici-yukumlulukler",
                    title: "Kullanıcı Yükümlülükleri",
                    icon: CheckCircle,
                  },
                  {
                    id: "icerik-politikasi",
                    title: "Değerlendirme Sistemi",
                    icon: Shield,
                  },
                  { id: "gizlilik", title: "Gizlilik Politikası", icon: Lock },
                  {
                    id: "sorumluluk",
                    title: "Sorumluluk Reddi",
                    icon: AlertCircle,
                  },
                  { id: "iletisim", title: "İletişim ve Destek", icon: Mail },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 flex items-center ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </button>
                ))}
              </nav>

              {/* Güncellenme Tarihi */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Son Güncelleme:</span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  23 Haziran 2025
                </p>
              </div>
            </div>
          </div>

          {/* Ana İçerik */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header Bölümü */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-8 py-12 text-white">
                <div className="max-w-3xl">
                  <div className="mb-4">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                      📄 Kullanım Şartları
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-blue-100 text-sm">
                      <span>Yürürlük Tarihi: 23.06.2025</span>
                      <span className="hidden sm:block">•</span>
                      <span>Alan adı: www.yukumyolda.com</span>
                      <span className="hidden sm:block">•</span>
                      <span>Mobil Uygulama: Yüküm Yolda (Android / iOS)</span>
                    </div>
                  </div>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Yüküm Yolda platformunu kullanarak aşağıdaki kullanım
                    şartlarını kabul etmiş sayılırsınız. Lütfen bu koşulları
                    dikkatlice okuyunuz.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-blue-100">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">%100 Ücretsiz</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      <span className="text-sm">KVKK Uyumlu</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <span className="text-sm">Kullanıcı Dostu</span>
                    </div>
                    <div className="flex items-center">
                      <Scale className="h-5 w-5 mr-2" />
                      <span className="text-sm">Hukuki Güvence</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* İçerik Bölümü */}
              <div className="px-8 py-8">
                <div className="prose prose-lg max-w-none">
                  {/* Genel Bilgiler */}
                  <section id="genel-bilgiler" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 rounded-xl p-3 mr-4">
                        <AlertCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        1. Genel Bilgiler
                      </h2>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 leading-relaxed">
                        Bu kullanıcı şartları ve koşulları
                        (&ldquo;Şartlar&rdquo;), Yüküm Yolda platformunun
                        kullanımını düzenler. Platform, nakliyeciler ve yük
                        sahipleri arasında iletişim kurmayı sağlayan ücretsiz
                        bir dijital eşleşme sistemidir.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          📅 Yürürlük Tarihi
                        </h4>
                        <p className="text-gray-700 text-sm">23 Haziran 2025</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          🌐 Alan Adı
                        </h4>
                        <p className="text-gray-700 text-sm">
                          www.yukumyolda.com
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          📱 Mobil Uygulama
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Yüküm Yolda (Android / iOS)
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 1. Taraflar ve Kapsam */}
                  <section id="taraflar" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-100 rounded-xl p-3 mr-4">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        2. Taraflar ve Kapsam
                      </h2>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Bu Kullanım Şartları, Yüküm Yolda uygulamasını kullanan
                        tüm kayıtlı ve misafir kullanıcılar (bundan böyle{" "}
                        <strong>&quot;Kullanıcı&quot;</strong> olarak
                        anılacaktır) ile Yüküm Yolda platformunu bundan böyle{" "}
                        <strong>&quot;Yüküm Yolda&quot;</strong>
                        olarak anılacaktır) arasında yapılmıştır.
                      </p>
                      <div className="bg-purple-100 rounded-lg p-4">
                        <p className="text-purple-800 font-medium">
                          ⚠️ Platformu kullanarak bu şartları ve
                          güncellemelerini kabul etmiş sayılırsınız.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 2. Hizmet Tanımı */}
                  <section id="platform-kullanimi" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 rounded-xl p-3 mr-4">
                        <Truck className="h-6 w-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        3. Hizmet Tanımı
                      </h2>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Yüküm Yolda, yük verenler ile araç sahiplerini (bireysel
                        veya filo) dijital ortamda buluşturan bir ilan ve
                        eşleşme sistemidir.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            icon: FileText,
                            title: "Yük İlanı",
                            desc: "Yük ilanı verilebilir",
                          },
                          {
                            icon: Truck,
                            title: "Araç Bilgisi",
                            desc: "Araç bilgisi girilerek uygun yükler görüntülenebilir",
                          },
                          {
                            icon: CheckCircle,
                            title: "Değerlendirme",
                            desc: "Karşılıklı değerlendirme yapılabilir",
                          },
                          {
                            icon: Mail,
                            title: "İletişim",
                            desc: "İki taraf doğrudan iletişime geçebilir",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 border border-green-200">
                            <div className="flex items-center mb-2">
                              <item.icon className="h-5 w-5 text-green-600 mr-2" />
                              <span className="font-semibold text-gray-900">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-yellow-100 rounded-lg p-4">
                        <p className="text-yellow-800 text-sm">
                          <strong>Önemli:</strong> Ödeme işlemleri kullanıcılar
                          arasında gerçekleşir. Yüküm Yolda yalnızca aracı
                          platform rolündedir ve ödeme garantisi sağlamaz.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 3. Üyelik Türleri ve Roller */}
                  <section className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 rounded-xl p-3 mr-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        4. Üyelik Türleri ve Roller
                      </h2>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Platformda aşağıdaki üyelik türleri vardır:
                      </h4>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <span className="font-medium text-blue-600">
                            • Nakliyeci
                          </span>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <span className="font-medium text-blue-600">
                            • Araç Sahibi
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 bg-red-100 rounded-lg p-4">
                        <p className="text-red-800 text-sm">
                          <strong>Uyarı:</strong> Yüküm Yolda, gerekli gördüğünde
                          üyelikleri askıya alma, sınırlama veya iptal etme
                          hakkını saklı tutar.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 4. Kullanıcının Yükümlülükleri */}
                  <section id="kullanici-yukumlulukler" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-red-100 rounded-xl p-3 mr-4">
                        <CheckCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        5. Kullanıcının Yükümlülükleri
                      </h2>
                    </div>
                    <div className="bg-red-50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Kullanıcı, aşağıdaki yükümlülükleri kabul eder:
                      </p>
                      <div className="space-y-3">
                        {[
                          "Doğru ve eksiksiz bilgi verir",
                          "Gerçek ve kendine ait plakalar/yükler/araçlar ekler",
                          "Sistem üzerinden sadece ticari ve dürüst amaçlarla işlem yapar",
                          "Spam, yanıltıcı ilan veya sahte değerlendirme yapmaz",
                          "Başka birinin hesabını izinsiz kullanmaz",
                          "Hizmet sırasında edindiği iletişim bilgilerini kötüye kullanmaz",
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white rounded-lg p-3 border border-red-200">
                            <CheckCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-red-100 rounded-lg p-4">
                        <p className="text-red-800 text-sm">
                          <strong>Sonuç:</strong> Aksi takdirde Yüküm Yolda,
                          kullanıcı hesabını askıya alma veya silme hakkını
                          saklı tutar.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 5. Değerlendirme Sistemi */}
                  <section id="icerik-politikasi" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-yellow-100 rounded-xl p-3 mr-4">
                        <Shield className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        6. Değerlendirme Sistemi
                      </h2>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-6 mb-6">
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-yellow-200">
                          <p className="text-gray-700">
                            <strong>Değerlendirme Hakkı:</strong> Yük veren ve
                            araç sahipleri, birlikte çalıştıktan sonra
                            birbirlerine puan ve yorum verebilir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-yellow-200">
                          <p className="text-gray-700">
                            <strong>Sınırlama:</strong> Her kullanıcı yalnızca
                            eşleştiği ve tamamladığı bir ilan üzerinden
                            değerlendirme yapabilir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-yellow-200">
                          <p className="text-gray-700">
                            <strong>Moderasyon:</strong> Değerlendirmeler
                            moderasyon sürecine tabidir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-yellow-200">
                          <p className="text-gray-700">
                            <strong>Yasaklar:</strong> Hakaret, reklam, iftira
                            içeren yorumlar silinebilir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Gizlilik ve Güvenlik Bölümü - GÜNCEL İÇERİK */}
                  <section id="gizlilik" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-indigo-100 rounded-xl p-3 mr-4">
                        <Lock className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        6. Gizlilik Politikası
                      </h2>
                    </div>

                    {/* Giriş */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
                      <div className="flex items-center mb-4">
                        <Shield className="h-8 w-8 text-indigo-600 mr-3" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            🔐 Gizlilik Politikası
                          </h3>
                          <p className="text-sm text-gray-600">
                            Yürürlük Tarihi: 23.06.2025
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Yüküm Yolda olarak, kullanıcılarımızın gizliliğini
                        önemsiyoruz. Bu Gizlilik Politikası, yük sahipleri, araç
                        sahipleri, şoförler ve filo yöneticileri dahil olmak
                        üzere tüm kullanıcıların kişisel verilerinin nasıl
                        toplandığını, işlendiğini ve korunduğunu açıklar.
                      </p>
                    </div>

                    {/* 1. Hangi Verileri Topluyoruz */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-lg p-2 mr-3">
                          <Database className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          1. Hangi Verileri Topluyoruz?
                        </h4>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Uygulamayı veya web platformunu kullandığınızda
                        aşağıdaki kişisel verileri toplayabiliriz:
                      </p>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Kimlik Bilgileri",
                            content: "Ad, soyad, kullanıcı adı",
                            icon: Users,
                          },
                          {
                            title: "İletişim Bilgileri",
                            content: "E-posta adresi, telefon numarası",
                            icon: Mail,
                          },
                          {
                            title: "Konum Bilgisi",
                            content:
                              "İl ve ilçe tercihleriniz, seyahat ettiğiniz şehirler",
                            icon: Globe,
                          },
                          {
                            title: "Araç Bilgileri",
                            content: "Plaka, kasa tipi, araç özellikleri",
                            icon: Truck,
                          },
                          {
                            title: "Hizmet Kullanımı Verileri",
                            content: "Yük ilanları, başvurular, eşleşmeler",
                            icon: FileText,
                          },
                          {
                            title: "Değerlendirme Verileri",
                            content:
                              "Diğer kullanıcılar tarafından size verilen puanlar, yorumlar",
                            icon: CheckCircle,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center">
                              <item.icon className="h-4 w-4 text-blue-600 mr-2" />
                              <span className="font-semibold text-gray-900">
                                {item.title}:
                              </span>
                              <span className="text-gray-700 ml-2">
                                {item.content}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Verileri Nasıl Kullanıyoruz */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 rounded-lg p-2 mr-3">
                          <Shield className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          2. Verileri Nasıl Kullanıyoruz?
                        </h4>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Toplanan veriler, aşağıdaki amaçlarla kullanılmaktadır:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Yük ve araç sahiplerini eşleştirmek",
                          "Size özel yük/araç önerileri sunmak",
                          "Platform güvenliğini sağlamak ve kötüye kullanımları önlemek",
                          "Müşteri desteği sağlamak",
                          "Yasal yükümlülükleri yerine getirmek",
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 3. Verileriniz Kimlerle Paylaşılır */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 rounded-lg p-2 mr-3">
                          <Users className="h-5 w-5 text-orange-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          3. Verileriniz Kimlerle Paylaşılır?
                        </h4>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Kişisel verileriniz yalnızca aşağıdaki durumlarda üçüncü
                        taraflarla paylaşılır:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h5 className="font-semibold text-red-800 mb-2">
                            ✓ Paylaşılan Durumlar
                          </h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>
                              • Yasal yükümlülükler: Mahkeme kararı veya resmi
                              talep üzerine adli kurumlarla
                            </li>
                            <li>
                              • Barındırma hizmetleri: Sunucu sağlayıcılar ve
                              teknik altyapı hizmeti alınan iş ortakları
                            </li>
                          </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h5 className="font-semibold text-green-800 mb-2">
                            ✗ Kesinlikle Paylaşılmaz
                          </h5>
                          <p className="text-sm text-green-700">
                            Kişisel verileriniz hiçbir şekilde reklam veya satış
                            amacıyla üçüncü kişilere verilmez
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 4. Verilerin Saklanma Süresi */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 rounded-lg p-2 mr-3">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          4. Verilerin Saklanma Süresi
                        </h4>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-gray-700 mb-2">Verileriniz;</p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                            Aktif kullanıcı olduğunuz sürece,
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                            Yasal süre boyunca (örneğin fatura bilgileri için 10
                            yıl),
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                            Hesabınızı sildiğinizde 6 ay içinde sistemimizden
                            tamamen kaldırılır.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* 5. Haklarınız */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-lg p-2 mr-3">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          5. Haklarınız Nelerdir? (KVKK & GDPR)
                        </h4>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Aşağıdaki haklara sahipsiniz:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "Kişisel verilerinize erişim talep etme",
                          "Düzeltme veya silinmesini isteme",
                          "İşlemeyi kısıtlama ya da tamamen durdurma",
                          "Verilerinizin taşınmasını talep etme",
                          "Açık rızanızı geri çekme",
                        ].map((right, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 rounded-lg p-3 flex items-center">
                            <Eye className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-gray-700 text-sm">
                              {right}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          Bu haklarınızı kullanmak için bizimle{" "}
                          <strong>kesityazilim@gmail.com</strong> üzerinden
                          iletişime geçebilirsiniz.
                        </p>
                      </div>
                    </div>

                    {/* 6. Güvenlik Önlemleri */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 rounded-lg p-2 mr-3">
                          <Lock className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          6. Güvenlik Önlemleri
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            title: "SSL Şifreleme",
                            desc: "Veriler SSL şifreleme ile korunur",
                            icon: Lock,
                          },
                          {
                            title: "Güvenlik Duvarı",
                            desc: "Veritabanı güvenlik duvarı ve erişim yetkilendirmeleri",
                            icon: Shield,
                          },
                          {
                            title: "Güvenlik Testleri",
                            desc: "Düzenli olarak sistemsel güvenlik testleri yapılır",
                            icon: CheckCircle,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <item.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <h5 className="font-semibold text-green-800 mb-1">
                              {item.title}
                            </h5>
                            <p className="text-sm text-green-700">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 7. Çerezler */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 rounded-lg p-2 mr-3">
                          <Globe className="h-5 w-5 text-orange-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          7. Çerezler (Cookies)
                        </h4>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-gray-700 mb-3">
                          Web sitemiz çerezler kullanmaktadır. Çerezler:
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Oturumunuzu açık tutmak",
                            "Size uygun içerik sunmak",
                            "Trafik ve istatistik analizi yapmak",
                          ].map((purpose, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700">
                              <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                              {purpose}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600 mt-3">
                          amaçlarıyla kullanılmaktadır. Tarayıcı ayarlarınızdan
                          çerezleri devre dışı bırakabilirsiniz.
                        </p>
                      </div>
                    </div>

                    {/* 8. Değişiklik Hakkı */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 rounded-lg p-2 mr-3">
                          <AlertCircle className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          8. Değişiklik Hakkı
                        </h4>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-gray-700">
                          Yüküm Yolda, bu politikayı zaman zaman
                          güncelleyebilir. Önemli değişiklikler web sitemiz veya
                          uygulamamız üzerinden duyurulacaktır.
                        </p>
                      </div>
                    </div>

                    {/* 9. İletişim */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-lg p-2 mr-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          9. İletişim
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Şirket
                          </h5>
                          <p className="text-blue-600">Kesit Yazılım</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Adres
                          </h5>
                          <p className="text-gray-700">İstanbul, Türkiye</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            E-posta
                          </h5>
                          <p className="text-blue-600">
                            kesityazilim@gmail.com
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Telefon
                          </h5>
                          <p className="text-blue-600">0552-159-9558</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 7. Sorumluluk Reddi */}
                  <section id="sorumluluk" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-orange-100 rounded-xl p-3 mr-4">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        7. Sorumluluk Reddi
                      </h2>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-6 mb-6">
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                          <p className="text-gray-700 mb-2">
                            <strong>Aracı Platform:</strong> Yüküm Yolda,
                            kullanıcılar arası taşımacılık sürecinin doğrudan
                            tarafı değildir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                          <p className="text-gray-700 mb-2">
                            <strong>Zarar Sorumluluğu:</strong> Taşıma sırasında
                            doğabilecek gecikme, kayıp, maddi zarar veya
                            anlaşmazlıklardan sorumlu değildir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                          <p className="text-gray-700 mb-2">
                            <strong>İçerik Garantisi:</strong> Platform, ilan
                            içeriklerinin doğruluğunu garanti etmez.
                            Kullanıcıların kendi denetimini yapması gerekir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                          <p className="text-gray-700 mb-2">
                            <strong>Bireysel Sorumluluk:</strong> Her kullanıcı
                            kendi işleminden hukuki ve mali olarak sorumludur.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 8. Fikri Mülkiyet Hakları */}
                  <section className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-indigo-100 rounded-xl p-3 mr-4">
                        <Shield className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        8. Fikri Mülkiyet Hakları
                      </h2>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                      <div className="bg-white rounded-lg p-4 border border-indigo-200">
                        <p className="text-gray-700">
                          Yüküm Yolda logosu, yazılımı, tasarımı ve tüm
                          içerikleri platforma aittir. İzinsiz kopyalanamaz,
                          çoğaltılamaz veya dağıtılamaz.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 9. Platform Üzerinden İletişim */}
                  <section className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-cyan-100 rounded-xl p-3 mr-4">
                        <Mail className="h-6 w-6 text-cyan-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        9. Platform Üzerinden İletişim
                      </h2>
                    </div>
                    <div className="bg-cyan-50 rounded-xl p-6 mb-6">
                      <div className="bg-white rounded-lg p-4 border border-cyan-200">
                        <p className="text-gray-700">
                          Yüküm Yolda, kullanıcılarla iletişim kurmak amacıyla
                          e-posta, SMS veya uygulama içi bildirim gönderme
                          hakkına sahiptir.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 10. Ücretlendirme ve Komisyon */}
                  <section className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 rounded-xl p-3 mr-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        10. Ücretlendirme ve Komisyon
                      </h2>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 mb-6">
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <p className="text-gray-700">
                            <strong>MVP Aşaması:</strong> Platform şu an
                            ücretsizdir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <p className="text-gray-700">
                            <strong>Gelecek Özellikler:</strong> İleride bazı
                            gelişmiş özellikler için abonelik veya komisyon
                            sistemi getirilebilir. Bu durumda kullanıcılar
                            açıkça bilgilendirilir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 11. Sözleşmenin Sona Ermesi */}
                  <section className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-red-100 rounded-xl p-3 mr-4">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        11. Sözleşmenin Sona Ermesi
                      </h2>
                    </div>
                    <div className="bg-red-50 rounded-xl p-6 mb-6">
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-red-200">
                          <p className="text-gray-700">
                            <strong>Kullanıcı Hakkı:</strong> Kullanıcı,
                            istediği zaman hesabını silebilir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-red-200">
                          <p className="text-gray-700">
                            <strong>Platform Hakkı:</strong> Yüküm Yolda,
                            Kullanım Şartları ihlal edildiğinde hesabı askıya
                            alma veya kapatma hakkına sahiptir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 12. Uyuşmazlık ve Yetki */}
                  <section className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-100 rounded-xl p-3 mr-4">
                        <Scale className="h-6 w-6 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        12. Uyuşmazlık ve Yetki
                      </h2>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 mb-6">
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <p className="text-gray-700">
                            <strong>Yetkili Mahkemeler:</strong> Taraflar
                            arasında doğacak uyuşmazlıklarda İstanbul Anadolu
                            Mahkemeleri ve İcra Daireleri yetkilidir.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <p className="text-gray-700">
                            <strong>Uygulanacak Hukuk:</strong> Bu şartlar
                            Türkiye Cumhuriyeti yasalarına tabidir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* İletişim Bölümü */}
                  <section id="iletisim" className="mb-12">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 rounded-xl p-3 mr-4">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        8. İletişim ve Destek
                      </h2>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Kullanıcı şartları ile ilgili sorularınız için bizimle
                        iletişime geçebilirsiniz:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            E-posta
                          </h4>
                          <p className="text-blue-600">
                            kesityazilim@gmail.com
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Telefon
                          </h4>
                          <p className="text-blue-600">0552-159-9558</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Platform
                          </h4>
                          <p className="text-blue-600">www.yukumyolda.com</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                    © 2025 Yüküm Yolda. Tüm hakları saklıdır.
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300">
                      Ana Sayfa
                    </Link>

                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300">
                      Başa Dön
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
