# MCP (Model Context Protocol) Setup

Project ini menggunakan MCP servers untuk meningkatkan kemampuan AI development dengan akses real-time ke dokumentasi dan tools.

## Configured MCP Servers

### 1. Contentful MCP Server
- **Purpose**: Mengelola content di Contentful CMS
- **Features**: 
  - Create, update, delete entries
  - Manage content types
  - Upload and manage assets
  - AI Actions untuk content generation
- **Auto-approved tools**: Content management operations

### 2. Astro Docs MCP Server
- **Purpose**: Akses real-time ke dokumentasi Astro terbaru
- **URL**: https://mcp.docs.astro.build/mcp
- **Features**:
  - Search Astro documentation
  - Get latest API information
  - Access current best practices
  - Avoid outdated recommendations
- **Auto-approved tools**: `search_astro_docs`

## Benefits

### Untuk Development Astro
- ✅ Selalu menggunakan API Astro terbaru
- ✅ Akses ke best practices terkini
- ✅ Menghindari pattern yang sudah deprecated
- ✅ Dokumentasi real-time tanpa perlu manual lookup

### Untuk Content Management
- ✅ Direct integration dengan Contentful
- ✅ AI-powered content creation
- ✅ Automated content workflows
- ✅ Seamless CMS operations

## Usage Examples

### Astro Development
```
"Bagaimana cara terbaru untuk setup content collections di Astro?"
"Apa best practice untuk image optimization di Astro 5?"
"Bagaimana menggunakan Astro actions yang baru?"
"Cara membuat server endpoints di Astro 5"
"Best practice untuk static site generation di Astro"
"Bagaimana menggunakan getStaticPaths dengan TypeScript"
```

### Content Management
```
"Buat blog post baru tentang Astro development"
"Update project entry dengan gallery images"
"Create certificate content type"
"Publish multiple entries sekaligus"
"Setup AI Actions untuk content generation"
```

### Real-time Documentation Access
Dengan MCP server ini, setiap kali Anda bertanya tentang Astro, AI akan:
- ✅ Mengakses dokumentasi terbaru secara real-time
- ✅ Memberikan informasi yang akurat dan up-to-date
- ✅ Menghindari pattern atau API yang sudah deprecated
- ✅ Menyediakan contoh code yang sesuai dengan versi terbaru

## Configuration Location

- **Workspace**: `.kiro/settings/mcp.json`
- **User Global**: `~/.kiro/settings/mcp.json`

## Troubleshooting

Jika MCP server tidak berfungsi:

1. **Check internet connection** - Astro Docs MCP memerlukan akses internet
2. **Verify configuration** - Pastikan URL dan format JSON benar
3. **Restart Kiro** - Kadang perlu restart untuk load konfigurasi baru
4. **Check logs** - Lihat error messages di Kiro console

## Auto-Approval

Tools yang sudah di-approve otomatis:
- `search_astro_docs` - Search dokumentasi Astro
- Semua Contentful operations - Content management

Tools lain akan meminta approval saat pertama kali digunakan.