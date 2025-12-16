import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES, type Document, type Node } from '@contentful/rich-text-types';
import type { ContentfulAsset } from './contentful';

// Rich text rendering options
export const richTextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => `<strong class="font-semibold">${text}</strong>`,
    [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
    [MARKS.UNDERLINE]: (text: string) => `<u class="underline">${text}</u>`,
    [MARKS.CODE]: (text: string) => `<code class="px-2 py-1 bg-dark-surface border border-dark-border rounded text-sm font-mono text-secondary">${text}</code>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Node, next: any) => 
      `<p class="mb-6 text-white/90 leading-relaxed text-base">${next(node.content)}</p>`,
    
    [BLOCKS.HEADING_1]: (node: Node, next: any) => 
      `<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-white first:mt-0">${next(node.content)}</h1>`,
    
    [BLOCKS.HEADING_2]: (node: Node, next: any) => 
      `<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-white first:mt-0">${next(node.content)}</h2>`,
    
    [BLOCKS.HEADING_3]: (node: Node, next: any) => 
      `<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-white first:mt-0">${next(node.content)}</h3>`,
    
    [BLOCKS.HEADING_4]: (node: Node, next: any) => 
      `<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-white first:mt-0">${next(node.content)}</h4>`,
    
    [BLOCKS.HEADING_5]: (node: Node, next: any) => 
      `<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-white first:mt-0">${next(node.content)}</h5>`,
    
    [BLOCKS.HEADING_6]: (node: Node, next: any) => 
      `<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-white first:mt-0">${next(node.content)}</h6>`,
    
    [BLOCKS.UL_LIST]: (node: Node, next: any) => 
      `<ul class="list-disc list-outside mb-6 space-y-3 text-white/90 pl-6">${next(node.content)}</ul>`,
    
    [BLOCKS.OL_LIST]: (node: Node, next: any) => 
      `<ol class="list-decimal list-outside mb-6 space-y-3 text-white/90 pl-6">${next(node.content)}</ol>`,
    
    [BLOCKS.LIST_ITEM]: (node: Node, next: any) => 
      `<li class="leading-relaxed">${next(node.content)}</li>`,
    
    [BLOCKS.QUOTE]: (node: Node, next: any) => 
      `<blockquote class="border-l-4 border-primary pl-6 py-6 mb-8 bg-dark-surface/30 rounded-r-lg my-8">
        <div class="text-white/90 italic text-lg leading-relaxed">${next(node.content)}</div>
      </blockquote>`,
    
    [BLOCKS.HR]: () => 
      `<hr class="my-8 border-dark-border">`,
    
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
      const asset = node.data?.target as ContentfulAsset;
      if (!asset?.fields?.file) return '';
      
      const { file, title, description } = asset.fields;
      const isImage = file.contentType.startsWith('image/');
      
      if (isImage) {
        return `
          <figure class="my-6">
            <img 
              src="${file.url}?w=800&q=80&fm=webp" 
              alt="${title || description || 'Embedded image'}"
              class="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
            ${title ? `<figcaption class="text-center text-sm text-white/60 mt-2">${title}</figcaption>` : ''}
          </figure>
        `;
      }
      
      // For non-image assets (PDFs, documents, etc.)
      return `
        <div class="my-4 p-4 border border-dark-border rounded-lg bg-dark-surface">
          <a 
            href="${file.url}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>${title || file.fileName}</span>
            <span class="text-xs text-white/40">(${(file.details.size / 1024 / 1024).toFixed(1)} MB)</span>
          </a>
        </div>
      `;
    },
    
    [INLINES.HYPERLINK]: (node: Node, next: any) => {
      const uri = node.data?.uri || '';
      const isExternal = uri.startsWith('http') && !uri.includes(window?.location?.hostname || '');
      
      return `
        <a 
          href="${uri}" 
          ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
          class="text-primary hover:text-primary-light underline transition-colors"
        >
          ${next(node.content)}
          ${isExternal ? '<svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>' : ''}
        </a>
      `;
    },
    
    [INLINES.EMBEDDED_ENTRY]: (node: Node) => {
      // Handle embedded entries (like related posts, projects, etc.)
      const entry = node.data?.target;
      if (!entry?.fields) return '';
      
      // This is a placeholder - you can customize based on your content types
      return `
        <div class="my-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
          <h4 class="font-semibold text-primary mb-2">${entry.fields.title || 'Related Content'}</h4>
          ${entry.fields.description ? `<p class="text-sm text-white/70">${entry.fields.description}</p>` : ''}
        </div>
      `;
    },
  },
};

// Light mode specific styles
export const lightModeRichTextRenderOptions = {
  ...richTextRenderOptions,
  renderMark: {
    ...richTextRenderOptions.renderMark,
    [MARKS.CODE]: (text: string) => `<code class="px-2 py-1 bg-light-surface border border-light-border rounded text-sm font-mono text-secondary">${text}</code>`,
  },
  renderNode: {
    ...richTextRenderOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node: Node, next: any) => 
      `<p class="mb-6 text-dark-bg/90 leading-relaxed text-base">${next(node.content)}</p>`,
    
    [BLOCKS.HEADING_1]: (node: Node, next: any) => 
      `<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-dark-bg first:mt-0">${next(node.content)}</h1>`,
    
    [BLOCKS.HEADING_2]: (node: Node, next: any) => 
      `<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-dark-bg first:mt-0">${next(node.content)}</h2>`,
    
    [BLOCKS.HEADING_3]: (node: Node, next: any) => 
      `<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-dark-bg first:mt-0">${next(node.content)}</h3>`,
    
    [BLOCKS.HEADING_4]: (node: Node, next: any) => 
      `<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-dark-bg first:mt-0">${next(node.content)}</h4>`,
    
    [BLOCKS.HEADING_5]: (node: Node, next: any) => 
      `<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-dark-bg first:mt-0">${next(node.content)}</h5>`,
    
    [BLOCKS.HEADING_6]: (node: Node, next: any) => 
      `<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-dark-bg first:mt-0">${next(node.content)}</h6>`,
    
    [BLOCKS.UL_LIST]: (node: Node, next: any) => 
      `<ul class="list-disc list-outside mb-6 space-y-3 text-dark-bg/90 pl-6">${next(node.content)}</ul>`,
    
    [BLOCKS.OL_LIST]: (node: Node, next: any) => 
      `<ol class="list-decimal list-outside mb-6 space-y-3 text-dark-bg/90 pl-6">${next(node.content)}</ol>`,
    
    [BLOCKS.QUOTE]: (node: Node, next: any) => 
      `<blockquote class="border-l-4 border-primary pl-6 py-6 mb-8 bg-light-surface/50 border border-light-border rounded-r-lg my-8">
        <div class="text-dark-bg/90 italic text-lg leading-relaxed">${next(node.content)}</div>
      </blockquote>`,
    
    [BLOCKS.HR]: () => 
      `<hr class="my-8 border-light-border">`,
  },
};

// Main function to render rich text to HTML
export function renderRichText(document: Document, isLightMode = false): string {
  if (!document) return '';
  
  try {
    const options = isLightMode ? lightModeRichTextRenderOptions : richTextRenderOptions;
    return documentToHtmlString(document, options);
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return '<p class="text-red-400">Error rendering content</p>';
  }
}

// Utility function to extract plain text from rich text document
export function extractPlainText(document: Document): string {
  if (!document || !document.content) return '';
  
  function extractFromNode(node: Node): string {
    if (node.nodeType === 'text') {
      return node.value || '';
    }
    
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractFromNode).join('');
    }
    
    return '';
  }
  
  return document.content.map(extractFromNode).join(' ').trim();
}

// Utility function to calculate reading time from rich text
export function calculateReadingTime(document: Document): number {
  const plainText = extractPlainText(document);
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = plainText.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Utility function to get excerpt from rich text
export function getExcerpt(document: Document, maxLength = 160): string {
  const plainText = extractPlainText(document);
  if (plainText.length <= maxLength) return plainText;
  
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
}