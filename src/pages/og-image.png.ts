import type { APIRoute } from 'astro';

// This is a placeholder for dynamic OG image generation
// In a real implementation, you might use libraries like @vercel/og or canvas
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async ({ url }) => {
  const searchParams = url.searchParams;
  const title = searchParams.get('title') || 'Muhamad Ali Ridho - Tech Enthusiast';
  const description = searchParams.get('description') || 'Building the future one project at a time';
  
  // For static build, we must return the file content, not a redirect
  try {
    const filePath = path.resolve('public/og-image-default.png');
    // Check if file exists, if not try looking in dist/client if running in some adaptors, 
    // but for build 'public' is correct.
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return new Response(buffer, {
        headers: { 'Content-Type': 'image/png' }
      });
    }
    return new Response('Default OG image not found', { status: 404 });
  } catch (e) {
    console.error(e);
    return new Response('Error loading OG image', { status: 500 });
  }
};

// You can also create specific OG images for different content types
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { title, description, type = 'website' } = data;
    
    // Generate dynamic OG image based on content
    // This would typically use a service like @vercel/og or similar
    
    // For now, return the default image
    return new Response(JSON.stringify({
      success: true,
      imageUrl: '/og-image-default.png',
      message: 'OG image generated successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to generate OG image'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};