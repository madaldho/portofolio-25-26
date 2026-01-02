# Contentful SSR + ISR Setup Guide

Panduan lengkap untuk mengaktifkan Server-Side Rendering (SSR) dengan Incremental Static Regeneration (ISR) yang terintegrasi dengan Contentful.

## 🚀 Fitur yang Diaktifkan

- **SSR (Server-Side Rendering)**: Konten dinamis dari Contentful
- **ISR (Incremental Static Regeneration)**: Cache otomatis dengan invalidation
- **Auto-Update**: Website otomatis update saat konten Contentful berubah
- **Webhook Integration**: Real-time content synchronization
- **Multi-language Support**: English dan Indonesian

## 📋 Prerequisites

1. Website sudah di-deploy ke Vercel
2. Akses ke Contentful Space sebagai admin
3. Environment variables sudah dikonfigurasi

## 🔧 Setup Steps

### 1. Konfigurasi Environment Variables

Tambahkan ke Vercel environment variables:

```bash
# Contentful Configuration
CONTENTFUL_SPACE_ID=hbrrn0bf99r5
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
CONTENTFUL_ENVIRONMENT=master

# ISR Configuration
ISR_BYPASS_TOKEN=muhamad-ali-ridho-isr-token-2024

# Webhook Security
CONTENTFUL_WEBHOOK_SECRET=your_secure_webhook_secret

# Site Configuration
SITE_URL=https://muhamadaliridho.me
SITE_TITLE=Muhamad Ali Ridho - Tech Enthusiast
SITE_DESCRIPTION=Portfolio of Muhamad Ali Ridho, a Tech Enthusiast exploring AI, IoT, Web Development, and more.
```

### 2. Setup Contentful Webhook

1. **Login ke Contentful**
   - Buka [Contentful Web App](https://app.contentful.com)
   - Pilih space "Muhamad Ali Ridho Portfolio"

2. **Buat Webhook Baru**
   - Pergi ke Settings → Webhooks
   - Klik "Add webhook"

3. **Konfigurasi Webhook**
   ```
   Name: Muhamad Ali Ridho Portfolio ISR
   URL: https://muhamadaliridho.me/api/revalidate
   Method: POST
   ```

4. **Pilih Triggers**
   Centang semua events berikut:
   - ✅ Entry publish
   - ✅ Entry unpublish  
   - ✅ Entry archive
   - ✅ Entry unarchive
   - ✅ Entry delete
   - ✅ Asset publish
   - ✅ Asset unpublish
   - ✅ Asset archive
   - ✅ Asset unarchive
   - ✅ Asset delete

5. **Headers (Optional)**
   ```
   Content-Type: application/json
   X-Webhook-Source: contentful-isr
   ```

6. **Filters**
   Tambahkan filter untuk environment:
   ```json
   {
     "equals": [
       {
         "doc": "sys.environment.sys.id"
       }
     ]
   }
   ```

7. **Save Webhook**

### 3. Test Webhook

1. **Manual Test**
   ```bash
   curl -X GET "https://muhamadaliridho.me/api/revalidate?route=/"
   ```

2. **Test dari Contentful**
   - Edit salah satu blog post di Contentful
   - Publish perubahan
   - Check webhook logs di Contentful
   - Verify website ter-update

## 🔄 Cara Kerja ISR

### Automatic Cache Invalidation

Ketika konten di Contentful berubah:

1. **Contentful** mengirim webhook ke `/api/revalidate`
2. **API endpoint** memproses webhook payload
3. **System** menentukan halaman mana yang perlu di-invalidate
4. **Vercel ISR** me-revalidate cache untuk halaman tersebut
5. **User** mendapat konten terbaru pada request berikutnya

### Cache Strategy

- **Homepage**: Cache 24 jam, invalidate saat ada perubahan konten
- **Blog Posts**: Cache 24 jam, invalidate saat blog post berubah
- **Projects**: Cache 24 jam, invalidate saat project berubah
- **API Routes**: Tidak di-cache

### Route Mapping

| Content Type | Routes yang Di-invalidate |
|--------------|---------------------------|
| `blogPost` / `simpleBlog` | `/`, `/blog`, `/id/blog`, `/blog/[slug]`, `/id/blog/[slug]` |
| `project` / `simpleProject` | `/`, `/projects` |
| `certificate` | `/`, `/certificates` |
| Any content | `/sitemap.xml` |

## 🐛 Debugging

### 1. Check Webhook Logs

Di Contentful:
- Settings → Webhooks
- Klik webhook name
- Lihat "Recent deliveries"

### 2. Check Vercel Function Logs

Di Vercel Dashboard:
- Functions tab
- Klik `/api/revalidate`
- Lihat logs

### 3. Manual Revalidation

```bash
# Revalidate homepage
curl -X GET "https://muhamadaliridho.me/api/revalidate?route=/"

# Revalidate blog page
curl -X GET "https://muhamadaliridho.me/api/revalidate?route=/blog"

# Revalidate specific blog post
curl -X GET "https://muhamadaliridho.me/api/revalidate?route=/blog/your-slug"
```

### 4. Check Cache Headers

```bash
curl -I "https://muhamadaliridho.me/"
```

Look for headers:
- `X-Vercel-Cache: HIT` (dari cache)
- `X-Vercel-Cache: MISS` (fresh request)
- `X-Vercel-Cache: REVALIDATED` (baru di-revalidate)

## 📊 Monitoring

### Performance Metrics

- **Cache Hit Rate**: Target >90%
- **Revalidation Time**: Target <5 seconds
- **Content Freshness**: Real-time updates

### SEO Benefits

- **Faster Loading**: Cached content loads instantly
- **Fresh Content**: Search engines always get latest content
- **Better Crawling**: Consistent response times

## 🔒 Security

### Webhook Security

1. **Secret Token**: Gunakan `CONTENTFUL_WEBHOOK_SECRET`
2. **Signature Validation**: Verify HMAC signature
3. **Rate Limiting**: Implement pada production
4. **IP Whitelist**: Restrict ke Contentful IPs

### ISR Security

1. **Bypass Token**: Keep `ISR_BYPASS_TOKEN` secret
2. **Environment Isolation**: Separate tokens per environment
3. **Access Control**: Protect revalidation endpoints

## 🚀 Deployment

### Vercel Deployment

```bash
# Deploy dengan ISR enabled
npm run deploy:vercel
```

### Environment Setup

1. **Production**: Full ISR dengan webhook
2. **Preview**: ISR tanpa webhook
3. **Development**: No caching

## 📈 SEO Optimization

### Structured Data

- **Person Schema**: Untuk profile Muhamad Ali Ridho
- **Article Schema**: Untuk blog posts
- **Website Schema**: Untuk homepage
- **Breadcrumb Schema**: Untuk navigation

### Meta Tags

- **Dynamic Titles**: Berdasarkan konten Contentful
- **Descriptions**: Auto-generated dengan keyword optimization
- **Open Graph**: Dynamic images dan descriptions
- **Hreflang**: Multi-language support

### Performance

- **Core Web Vitals**: Optimized dengan ISR
- **Lighthouse Score**: Target 95+ untuk semua metrics
- **Page Speed**: <2 seconds loading time

## 🎯 Next Steps

1. **Monitor Performance**: Setup analytics dan monitoring
2. **SEO Tracking**: Track ranking untuk "Muhamad Ali Ridho"
3. **Content Strategy**: Optimize content untuk SEO
4. **User Experience**: A/B test different layouts

## 📞 Support

Jika ada masalah dengan setup:

1. Check logs di Vercel dan Contentful
2. Verify environment variables
3. Test webhook manually
4. Check network connectivity

---

**Status**: ✅ SSR + ISR Ready for Production
**Last Updated**: January 2025
**Version**: 1.0.0