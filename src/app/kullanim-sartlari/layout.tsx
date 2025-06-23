import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanıcı Şartları | Yüküm Yolda",
  description:
    "Yüküm Yolda ücretsiz nakliye platformu kullanıcı şartları ve koşulları. Platform kullanımı, haklar ve sorumluluklar hakkında detaylı bilgiler.",
  keywords: [
    "kullanıcı şartları",
    "kullanım koşulları",
    "Yüküm Yolda",
    "nakliye platformu",
    "şartlar ve koşullar",
    "gizlilik",
    "haklar",
    "sorumluluklar",
    "yasal",
    "ücretsiz platform",
  ].join(", "),
  authors: [{ name: "Yüküm Yolda" }],
  creator: "Yüküm Yolda",
  publisher: "Yüküm Yolda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Kullanıcı Şartları | Yüküm Yolda",
    description:
      "Yüküm Yolda ücretsiz nakliye platformu kullanıcı şartları ve koşulları.",
    url: "https://yukumyolda.com/kullanici-sartlari",
    siteName: "Yüküm Yolda",
    images: [
      {
        url: "/og-image-terms.jpg", // Bu dosya public klasöründe olmalı
        width: 1200,
        height: 630,
        alt: "Yüküm Yolda - Kullanıcı Şartları",
      },
    ],
    locale: "tr_TR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kullanıcı Şartları | Yüküm Yolda",
    description:
      "Yüküm Yolda ücretsiz nakliye platformu kullanıcı şartları ve koşulları.",
    images: ["/og-image-terms.jpg"],
    creator: "@yukumyolda",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yukumyolda.com/kullanici-sartlari",
  },
};

// Structured Data for Legal Document
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kullanıcı Şartları",
  description: "Yüküm Yolda platformu kullanıcı şartları ve koşulları",
  url: "https://yukumyolda.com/kullanici-sartlari",
  inLanguage: "tr-TR",
  isPartOf: {
    "@type": "WebSite",
    name: "Yüküm Yolda",
    url: "https://yukumyolda.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Yüküm Yolda",
    url: "https://yukumyolda.com",
  },
  dateModified: new Date().toISOString(),
  mainEntity: {
    "@type": "Article",
    headline: "Kullanıcı Şartları ve Koşulları",
    author: {
      "@type": "Organization",
      name: "Yüküm Yolda",
    },
    publisher: {
      "@type": "Organization",
      name: "Yüküm Yolda",
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function KullaniciSartlariLayout({ children }: LayoutProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
}
