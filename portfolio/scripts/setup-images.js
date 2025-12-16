#!/usr/bin/env node

/**
 * Image Setup Script
 * Downloads placeholder images for the portfolio
 * Run with: node scripts/setup-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Image URLs for different categories
const imageUrls = {
  profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
  projects: {
    'ai-chat': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&auto=format&q=80',
    'expense-app': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format&q=80',
    'portfolio': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&auto=format&q=80',
    'smart-home': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
    'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format&q=80',
    'weather-iot': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop&auto=format&q=80',
    'task-app': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&auto=format&q=80',
    'ml-classifier': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&auto=format&q=80'
  }
};

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    'public/images',
    'public/images/projects',
    'public/images/blog'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
};

// Download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Main setup function
const setupImages = async () => {
  console.log('🖼️  Setting up placeholder images...\n');
  
  try {
    // Create directories
    createDirectories();
    
    // Download profile image
    console.log('📸 Downloading profile image...');
    await downloadImage(imageUrls.profile, 'public/images/profile.jpg');
    
    // Download project images
    console.log('\n🚀 Downloading project images...');
    for (const [name, url] of Object.entries(imageUrls.projects)) {
      await downloadImage(url, `public/images/projects/${name}.jpg`);
    }
    
    console.log('\n✨ All images downloaded successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Replace placeholder images with actual project screenshots');
    console.log('2. Add your own profile photo');
    console.log('3. Set up Contentful CMS (see CONTENTFUL_SETUP.md)');
    console.log('4. Upload images to Contentful for better management');
    
  } catch (error) {
    console.error('❌ Error setting up images:', error.message);
    process.exit(1);
  }
};

// Run the setup
if (require.main === module) {
  setupImages();
}

module.exports = { setupImages, downloadImage };