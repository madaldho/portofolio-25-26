# Contentful CMS Setup Guide

## Overview

This guide explains how to set up Contentful CMS for the portfolio website to manage projects, blog posts, and other dynamic content.

## Content Types Structure

### 1. Project Content Type

**Content Type ID:** `project`

**Fields:**

- **Title** (Short text, required)
  - Field ID: `title`
  - Help text: "Project name/title"
- **Slug** (Short text, required, unique)
  - Field ID: `slug`
  - Help text: "URL-friendly version of title"
- **Short Description** (Short text, required)
  - Field ID: `shortDescription`
  - Help text: "Brief description for project cards"
  - Character limit: 160
- **Description** (Rich text, required)
  - Field ID: `description`
  - Help text: "Detailed project description with formatting"
- **Thumbnail** (Media, required)
  - Field ID: `thumbnail`
  - Help text: "Main project image (800x600px recommended)"
- **Gallery** (Media, multiple)
  - Field ID: `gallery`
  - Help text: "Additional project images"
- **Category** (Short text, required)
  - Field ID: `category`
  - Validation: Must be one of: web, mobile, iot, ai-ml, other
- **Technologies** (Short text, multiple, required)
  - Field ID: `technologies`
  - Help text: "Technologies used in the project"
- **Live URL** (Short text, optional)
  - Field ID: `liveUrl`
  - Validation: Must be a valid URL
- **Source URL** (Short text, optional)
  - Field ID: `sourceUrl`
  - Validation: Must be a valid URL
- **Featured** (Boolean)
  - Field ID: `featured`
  - Default: false
- **Completed Date** (Date, required)
  - Field ID: `completedDate`
  - Help text: "When the project was completed"

### 2. Blog Post Content Type

**Content Type ID:** `blogPost`

**Fields:**

- **Title** (Short text, required)
- **Slug** (Short text, required, unique)
- **Excerpt** (Long text, required)
- **Content** (Rich text, required)
- **Featured Image** (Media, required)
- **Tags** (Short text, multiple)
- **Publish Date** (Date, required)
- **Reading Time** (Number, optional)

### 3. Tech Stack Content Type

**Content Type ID:** `techStack`

**Fields:**

- **Name** (Short text, required)
- **Category** (Short text, required)
  - Validation: language, framework, tool, platform
- **Icon** (Media, optional)
- **Proficiency** (Short text, required)
  - Validation: beginner, intermediate, advanced
- **Color** (Short text, optional)
  - Help text: "Hex color code for the technology"

## Environment Variables

Create a `.env.local` file in the portfolio directory:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token_here
CONTENTFUL_ENVIRONMENT=master
```

## Sample Content for Testing

### Sample Projects

1. **AI Chat Assistant**
   - Category: ai-ml
   - Technologies: Python, LangChain, OpenAI, FastAPI
   - Thumbnail: AI/chatbot related image
2. **E-Commerce Platform**
   - Category: web
   - Technologies: Next.js, TypeScript, Stripe, PostgreSQL
   - Thumbnail: E-commerce/shopping related image
3. **Weather IoT System**
   - Category: iot
   - Technologies: ESP32, Arduino, Firebase, Chart.js
   - Thumbnail: Weather/IoT sensors related image
4. **Mobile Task App**
   - Category: mobile
   - Technologies: React Native, Firebase, Redux
   - Thumbnail: Mobile app/productivity related image

### Sample Blog Posts

1. **"Building Modern Web Applications with Astro"**
   - Tags: web-development, astro, performance
   - Content: Technical article about Astro benefits
2. **"IoT Development: From Sensors to Dashboard"**
   - Tags: iot, esp32, sensors, dashboard
   - Content: Tutorial on building IoT systems
3. **"Machine Learning in Web Applications"**
   - Tags: ai-ml, tensorflow, web-development
   - Content: Guide on integrating ML models

## Image Guidelines

### Project Thumbnails

- **Size:** 800x600px (4:3 aspect ratio)
- **Format:** JPG or WebP
- **Quality:** High quality, optimized for web
- **Content:** Should clearly represent the project

### Profile Images

- **Size:** 400x400px (1:1 aspect ratio)
- **Format:** JPG or WebP
- **Content:** Professional headshot

### Blog Featured Images

- **Size:** 1200x630px (1.91:1 aspect ratio)
- **Format:** JPG or WebP
- **Content:** Relevant to blog post topic

## Recommended Image Sources

For placeholder/temporary images:

- **Unsplash** (https://unsplash.com/) - High quality, free photos
- **Pexels** (https://pexels.com/) - Free stock photos
- **Pixabay** (https://pixabay.com/) - Free images and vectors

### Specific Image Recommendations

**Tech/Development:**

- https://unsplash.com/s/photos/coding
- https://unsplash.com/s/photos/technology
- https://unsplash.com/s/photos/programming

**AI/Machine Learning:**

- https://unsplash.com/s/photos/artificial-intelligence
- https://unsplash.com/s/photos/robot
- https://unsplash.com/s/photos/neural-network

**IoT/Hardware:**

- https://unsplash.com/s/photos/electronics
- https://unsplash.com/s/photos/circuit-board
- https://unsplash.com/s/photos/sensors

**Mobile/Apps:**

- https://unsplash.com/s/photos/smartphone
- https://unsplash.com/s/photos/mobile-app
- https://unsplash.com/s/photos/user-interface

## Next Steps

1. **Create Contentful Account**

   - Sign up at https://contentful.com
   - Create a new space for the portfolio

2. **Set Up Content Types**

   - Create the content types as defined above
   - Configure field validations and help text

3. **Add Sample Content**

   - Create sample projects using the provided structure
   - Upload placeholder images from recommended sources
   - Create a few blog posts for testing

4. **Configure Environment**

   - Get API keys from Contentful dashboard
   - Add environment variables to `.env.local`
   - Test the connection

5. **Implement Contentful Integration**
   - Install Contentful SDK
   - Create API utility functions
   - Update components to fetch from Contentful
   - Add rich text rendering

## Migration from Static to Contentful

The current portfolio uses static markdown files. To migrate:

1. **Keep Static as Fallback**

   - Maintain current static files as backup
   - Implement Contentful with fallback to static

2. **Gradual Migration**

   - Start with projects content type
   - Add blog posts content type
   - Migrate other content types as needed

3. **Content Validation**
   - Ensure all required fields are populated
   - Validate image URLs and formats
   - Test content rendering

## Troubleshooting

**Common Issues:**

- **API Rate Limits:** Use caching and limit API calls
- **Image Loading:** Implement proper error handling and fallbacks
- **Content Validation:** Ensure all required fields are present
- **Rich Text Rendering:** Handle embedded assets and entries properly

**Performance Tips:**

- Use Contentful's CDN for images
- Implement proper caching strategies
- Optimize image sizes and formats
- Use incremental static regeneration (ISR) when possible
