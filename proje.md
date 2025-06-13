# YukumYolda

YukumYolda, araç sahipleri, yük sahipleri ve yük taşıyıcılarının dijital ortamda buluşmasını sağlayan kapsamlı bir lojistik ve araç yönetim platformudur. Projenin amacı, araç ve yük takibini kolaylaştırmak, kullanıcılar arası iletişimi güvenli ve verimli hale getirmek ve lojistik operasyonlarının dijital dönüşümüne katkıda bulunmaktır.

---

## Proje Kapsamı

- **Araç Yönetimi:** Araçlar, araç tipleri ve araç gövdeleri gibi detaylar kayıt altına alınır. Araç plakaları benzersizdir ve kullanıcılar kendilerine ait araç bilgilerini güncelleyebilir.
- **Yük Yönetimi:** Yük sahipleri platforma yük ilanları oluşturabilir, bu ilanlar araç sahiplerine gösterilir.
- **Kullanıcı Rolleri:** Farklı kullanıcı rolleri (Pre-Loader, Loader, VehicleOwner vb.) ile kullanıcı yetkilendirmesi sağlanır.
- **Kullanıcı-İlan İlişkisi:** Her kullanıcı, kendisine ait ilanları görebilir ve yönetebilir. Ayrıca, kullanıcılar arasında güvenli veri erişimi sağlanır.
- **Doğrulamalar:** Araç plakası ve kullanıcı bilgilerinin doğrulanması kritik önemdedir.
- **Performans ve Güvenlik:** Veritabanı ilişkileri ve API çağrıları optimize edilmiştir. Güvenlik için kullanıcıya özel sorgular kullanılır.

---

## Teknik Özellikler

- **Platform:** .NET 6/7, C#
- **ORM:** Entity Framework Core
- **Mimari:** MediatR ile CQRS deseni kullanılarak sorgu ve komut işlemleri ayrılmıştır.
- **Veritabanı:** MSSQL
- **API:** RESTful API mimarisi
- **İlişkiler:**
  - Vehicle ve UserVehicle arasında birebir ilişki.
  - UserLoads ve Loads tablolarında çoklu kullanıcı-yük ilişkisi.
  - Rollerin ve kullanıcıların güvenliği için Identity sistemi ile yetkilendirme.
- **Validasyonlar:** Plaka doğrulaması, kullanıcı kimlik doğrulaması ve veri bütünlüğü sağlanır.
- **Performans Optimizasyonu:** AsNoTracking, Select projeksiyonları ve gerekli include kullanımları ile sorgular optimize edilmiştir.

---

## Proje Mantığı

1. **Araç ve Kullanıcı İlişkisi:** Araçlar `Vehicle` tablosunda tutulur, her araç bir `UserVehicle` ile birebir eşleştirilir.
2. **Yüklerin Yönetimi:** Yükler `Load` tablosunda saklanır ve kullanıcılar `UserLoads` aracılığıyla ilanlarını oluşturur ve yönetir.
3. **Yetkilendirme:** Kullanıcıların hangi ilanlara erişebileceği rollere ve kullanıcı-id eşleşmelerine göre kontrol edilir.
4. **Güvenlik:** API, kullanıcıların yalnızca kendi verilerine erişebilmesi için sorgularda kullanıcı id kontrolleri içerir.
5. **Kullanıcı Dostu Veri Alma:** İlişkili tablolar Include ile çekilerek API'ye zengin veri sunulur, DTO'lar ile istemciye kolay erişilebilir şekilde veriler aktarılır.

---

## Kullanım

- Kullanıcılar sisteme kayıt olup kendi araçlarını ve yük ilanlarını ekleyebilir.
- Araç sahipleri kendi araçlarına ait yük ilanlarını görüntüleyebilir ve yönetebilir.
- Yük sahipleri ilanları güncelleyebilir veya silebilir.
- Yetkili kullanıcılar tüm sistem verilerini raporlayabilir.

---

## Proje Dizini (Örnek)
