# KuyumVitrin Projesi

Kuyumcular için B2B ve B2C olmak üzere iki ana başlıkta çalışacak modern bir e-ticaret web uygulaması.

## Proje Yapısı

Proje, iki ana bölümden oluşmaktadır:

- `/backend`: Node.js ve Express ile geliştirilen API sunucusu. Anlık veri çekme, kullanıcı yönetimi ve diğer iş mantığını içerir.
- `/frontend`: Next.js (React) ile geliştirilen kullanıcı arayüzü.

## Kurulum ve Çalıştırma

**Önemli:** Aşağıdaki tüm komutları projenin ana dizinindeyken (`kuyum-vitrin/` klasörünün içindeyken) çalıştırmalısınız.

### 1. Backend Sunucusu (1. Terminal)

```bash
# Backend klasörüne gidin
cd backend

# Gerekli bağımlılıkları yükleyin
npm install

# Sunucuyu başlatın
npm start
```
Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışmaya başlayacaktır.

### 2. Frontend Uygulaması (2. Yeni Terminal)

```bash
# Frontend klasörüne gidin
cd frontend/client

# Gerekli bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```
Uygulama varsayılan olarak `http://localhost:3000` adresinde açılacaktır.

## Faz 1 Özellikleri

- Anlık fiyat verilerinin `haremaltin.com` üzerinden WebSocket ile çekilmesi.
- `/api/prices` endpoint'i ile anlık fiyatların sunulması.
- B2C kullanıcıları için `/api/auth/register` ve `/api/auth/login` işlemleri.
- Anlık fiyatları gösteren modern bir ana sayfa arayüzü.
