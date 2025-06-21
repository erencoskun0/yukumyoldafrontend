import { Metadata } from "next";

interface YukDetayLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

// Mock function - Normalde API'den gelecek
async function getYukDetay(id: string) {
  // Bu fonksiyon gerçek uygulamada API'den veri çekecek
  return {
    Id: parseInt(id),
    Name: "Ahmet",
    Surname: "Yılmaz",
    Email: "ahmet.yilmaz@email.com",
    PhoneNumber: "+90 532 123 45 67",
    Description:
      "İstanbul'dan Ankara'ya mobilya taşıma işi. Dikkatli taşınması gereken eşyalar var.",
    VehicleType: "Kamyon",
    LoadStatus: "Aktif",
    CreatedDate: "2024-01-15T00:00:00Z",
    LoadTime: "2024-01-20T09:00:00Z",
    Departurev: "İstanbul",
    DestinationProvince: "Ankara",
    Weight: "2.5 Ton",
    Length: "4.2 m",
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const yuk = await getYukDetay(params.id);

  const title = `${yuk.Departurev} - ${yuk.DestinationProvince} Yük Detayları | Yüküm Yolda`;
  const description = `${yuk.Name} ${yuk.Surname} tarafından ${yuk.Departurev}'dan ${yuk.DestinationProvince}'a ${yuk.VehicleType} ile taşınacak yük. ${yuk.Weight} ağırlığında, ${yuk.Length} uzunluğunda. Ücretsiz nakliye platformu Yüküm Yolda'da.`;

  return {
    title,
    description,
    keywords: [
      "yük taşıma",
      "nakliye",
      yuk.Departurev,
      yuk.DestinationProvince,
      yuk.VehicleType,
      "ücretsiz platform",
      "Yüküm Yolda",
      "kargo",
      "lojistik",
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
      url: `https://yukumyolda.com/yukler/${params.id}`,
      siteName: "Yüküm Yolda",
      images: [
        {
          url: "/og-image-yuk.jpg", // Bu dosya public klasöründe olmalı
          width: 1200,
          height: 630,
          alt: `${yuk.Departurev} - ${yuk.DestinationProvince} Yük Detayları`,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image-yuk.jpg"],
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
interface LoadStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  origin: {
    "@type": string;
    name: string;
  };
  destination: {
    "@type": string;
    name: string;
  };
  weight: string;
  dimensions: string;
  loadingTime: string;
  status: string;
  contactPoint: {
    "@type": string;
    telephone: string;
    email: string;
    contactType: string;
  };
}

export default async function YukDetayLayout({
  children,
  params,
}: YukDetayLayoutProps) {
  const yuk = await getYukDetay(params.id);

  // Structured Data (JSON-LD)
  const structuredData: LoadStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service", // Yük taşıma hizmeti
    name: `${yuk.Departurev} - ${yuk.DestinationProvince} Yük Taşıma`,
    description: yuk.Description,
    provider: {
      "@type": "Organization",
      name: "Yüküm Yolda",
      url: "https://yukumyolda.com",
    },
    origin: {
      "@type": "Place",
      name: yuk.Departurev,
    },
    destination: {
      "@type": "Place",
      name: yuk.DestinationProvince,
    },
    weight: yuk.Weight,
    dimensions: yuk.Length,
    loadingTime: yuk.LoadTime,
    status: yuk.LoadStatus,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: yuk.PhoneNumber,
      email: yuk.Email,
      contactType: "Yük Sahibi",
    },
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
