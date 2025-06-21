import React from "react";
import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

// Metadata'yı dinamik olarak oluştur
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Normalde burada API'den araç bilgilerini çekersiniz
  // Şimdilik mock data kullanıyoruz
  const aracId = params.id;

  return {
    title: `Araç Detayı #${aracId} | Yüküm Yolda`,
    description: `${aracId} numaralı aracın detaylı bilgileri. Nakliye hizmetleri için güvenilir araç bilgileri.`,
    keywords: ["nakliye", "araç", "kamyon", "taşımacılık", "yüküm yolda"],
    openGraph: {
      title: `Araç Detayı #${aracId} | Yüküm Yolda`,
      description: `${aracId} numaralı aracın detaylı bilgileri. Nakliye hizmetleri için güvenilir araç bilgileri.`,
      type: "website",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: `Araç Detayı #${aracId} | Yüküm Yolda`,
      description: `${aracId} numaralı aracın detaylı bilgileri. Nakliye hizmetleri için güvenilir araç bilgileri.`,
    },
  };
}

export default function AracDetayLayout({ children, params }: LayoutProps) {
  // Parametre kontrolü
  const aracId = params.id;

  // Layout wrapper
  return (
    <div className="arac-detay-layout">
      {/* Layout specific styles veya context provider'lar buraya eklenebilir */}

      {/* SEO için structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            identifier: aracId,
            name: `Araç #${aracId}`,
            provider: {
              "@type": "Organization",
              name: "Yüküm Yolda",
              url: "https://yukumyolda.com",
            },
            description: `${aracId} numaralı aracın detaylı bilgileri ve nakliye hizmetleri.`,
          }),
        }}
      />

      {/* Children content */}
      {children}
    </div>
  );
}
