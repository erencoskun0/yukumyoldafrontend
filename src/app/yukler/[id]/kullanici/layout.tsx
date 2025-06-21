import { Metadata } from "next";

interface KullaniciYukleriLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

// Mock function - Normalde API'den gelecek
async function getKullanici(id: string) {
  // Bu fonksiyon gerçek uygulamada API'den veri çekecek
  return {
    Id: parseInt(id),
    Name: "Ahmet",
    Surname: "Yılmaz",
    Email: "ahmet.yilmaz@email.com",
    PhoneNumber: "+90 532 123 45 67",
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const kullanici = await getKullanici(params.id);

  const title = `${kullanici.Name} ${kullanici.Surname} - Kullanıcı Yükleri | Yüküm Yolda`;
  const description = `${kullanici.Name} ${kullanici.Surname} kullanıcısının tüm yük ilanları. Ücretsiz nakliye platformu Yüküm Yolda'da kullanıcıya ait aktif ve geçmiş yük listesi.`;

  return {
    title,
    description,
    keywords: [
      "kullanıcı yükleri",
      "yük ilanları",
      "nakliye",
      kullanici.Name,
      kullanici.Surname,
      "ücretsiz platform",
      "Yüküm Yolda",
      "kargo",
      "lojistik",
      "yük taşıma",
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
      title,
      description,
      url: `https://yukumyolda.com/yukler/${params.id}/kullanici`,
      siteName: "Yüküm Yolda",
      images: [
        {
          url: "/og-image-kullanici-yukler.jpg", // Bu dosya public klasöründe olmalı
          width: 1200,
          height: 630,
          alt: `${kullanici.Name} ${kullanici.Surname} - Kullanıcı Yükleri`,
        },
      ],
      locale: "tr_TR",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image-kullanici-yukler.jpg"],
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
    verification: {
      google: "your-google-verification-code", // Google Search Console'dan alınacak
    },
  };
}

// Structured Data (JSON-LD) için interface
interface UserLoadsStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  author: {
    "@type": string;
    name: string;
    email: string;
    telephone: string;
  };
  numberOfItems: number;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    description: string;
    url: string;
  }>;
}

export default async function KullaniciYukleriLayout({
  children,
  params,
}: KullaniciYukleriLayoutProps) {
  const kullanici = await getKullanici(params.id);

  // Mock yük sayısı - gerçek uygulamada API'den gelecek
  const yukSayisi = 5;

  // Structured Data (JSON-LD)
  const structuredData: UserLoadsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${kullanici.Name} ${kullanici.Surname} - Yük İlanları`,
    description: `${kullanici.Name} ${kullanici.Surname} kullanıcısının yük ilanları listesi`,
    provider: {
      "@type": "Organization",
      name: "Yüküm Yolda",
      url: "https://yukumyolda.com",
    },
    author: {
      "@type": "Person",
      name: `${kullanici.Name} ${kullanici.Surname}`,
      email: kullanici.Email,
      telephone: kullanici.PhoneNumber,
    },
    numberOfItems: yukSayisi,
    itemListElement: [
      // Bu liste gerçek uygulamada dinamik olarak doldurulacak
      {
        "@type": "Service",
        position: 1,
        name: "İstanbul - Ankara Yük Taşıma",
        description: "Mobilya taşıma işi",
        url: `https://yukumyolda.com/yukler/1`,
      },
      // Diğer yükler...
    ],
  };

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
