import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES, type Document, type Node, type Block, type Inline } from '@contentful/rich-text-types';
import type { ContentfulAsset } from './contentful';

// Rich text rendering options
export const richTextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => `<strong class="font-semibold">${text}</strong>`,
    [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
    [MARKS.UNDERLINE]: (text: string) => `<u class="underline">${text}</u>`,
    [MARKS.CODE]: (text: string) => `<code class="px-1.5 py-0.5 bg-dark-surface border border-dark-border rounded text-sm font-mono text-secondary">${text}</code>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Node, next: any) => {
       const block = node as Block;
       // Check if this paragraph is acting as a code block (entirely code mark)
       if (block.content.length === 1 && block.content[0].nodeType === 'text' && block.content[0].marks && block.content[0].marks.some((m: any) => m.type === 'code')) {
           const text = block.content[0].value;
           return `
            <div class="my-8 rounded-lg overflow-hidden border border-dark-border bg-dark-surface">
              <div class="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-dark-border/50">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span class="text-xs text-white/40 uppercase font-semibold tracking-wider">CODE</span>
              </div>
              <div class="p-4 overflow-x-auto">
                <pre class="font-mono text-sm leading-relaxed text-white/90"><code>${text}</code></pre>
              </div>
            </div>`;
       }
       return `<p class="mb-6 text-white/90 leading-relaxed text-base">${next(block.content)}</p>`;
    },
    
    [BLOCKS.HEADING_1]: (node: Node, next: any) => 
      `<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-white first:mt-0">${next((node as Block).content)}</h1>`,
    
    [BLOCKS.HEADING_2]: (node: Node, next: any) => 
      `<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-white first:mt-0">${next((node as Block).content)}</h2>`,
    
    [BLOCKS.HEADING_3]: (node: Node, next: any) => 
      `<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-white first:mt-0">${next((node as Block).content)}</h3>`,
    
    [BLOCKS.HEADING_4]: (node: Node, next: any) => 
      `<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-white first:mt-0">${next((node as Block).content)}</h4>`,
    
    [BLOCKS.HEADING_5]: (node: Node, next: any) => 
      `<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-white first:mt-0">${next((node as Block).content)}</h5>`,
    
    [BLOCKS.HEADING_6]: (node: Node, next: any) => 
      `<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-white first:mt-0">${next((node as Block).content)}</h6>`,
    
    [BLOCKS.UL_LIST]: (node: Node, next: any) => 
      `<ul class="list-disc list-outside mb-6 space-y-3 text-white/90 pl-6">${next((node as Block).content)}</ul>`,
    
    [BLOCKS.OL_LIST]: (node: Node, next: any) => 
      `<ol class="list-decimal list-outside mb-6 space-y-3 text-white/90 pl-6">${next((node as Block).content)}</ol>`,
    
    [BLOCKS.LIST_ITEM]: (node: Node, next: any) => 
      `<li class="leading-relaxed">${next((node as Block).content)}</li>`,
    
    [BLOCKS.QUOTE]: (node: Node, next: any) => 
      `<blockquote class="relative pl-6 py-2 my-8 border-l-4 border-primary bg-dark-surface/50 rounded-r-lg italic text-white/80">
        <div class="not-italic">${next((node as Block).content)}</div>
      </blockquote>`,

    [BLOCKS.TABLE]: (node: Node, next: any) => 
      `<div class="overflow-x-auto my-8 rounded-lg border border-dark-border">
        <table class="w-full text-left border-collapse">
          <tbody>${next((node as Block).content)}</tbody>
        </table>
      </div>`,
    
    [BLOCKS.TABLE_ROW]: (node: Node, next: any) => 
      `<tr>${next((node as Block).content)}</tr>`,
    
    [BLOCKS.TABLE_HEADER_CELL]: (node: Node, next: any) => 
      `<th class="bg-dark-surface p-4 text-left border-b border-dark-border font-semibold text-white whitespace-nowrap">${next((node as Block).content)}</th>`,
    
    [BLOCKS.TABLE_CELL]: (node: Node, next: any) => 
      `<td class="p-4 border-b border-dark-border/50 text-white/80 align-top">${next((node as Block).content)}</td>`,
    
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
      const inline = node as Inline;
      const uri = inline.data?.uri || '';
      const isExternal = uri.startsWith('http') && !uri.includes(window?.location?.hostname || '');
      
      return `
        <a 
          href="${uri}" 
          ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
          class="text-primary hover:text-primary-light underline transition-colors"
        >
          ${next(inline.content)}
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
    [MARKS.CODE]: (text: string) => `<code class="px-1.5 py-0.5 bg-light-surface border border-light-border rounded text-sm font-mono text-secondary">${text}</code>`,
  },
  renderNode: {
    ...richTextRenderOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node: Node, next: any) => {
       const block = node as Block;
       // Check if this paragraph is acting as a code block (entirely code mark)
       if (block.content.length === 1 && block.content[0].nodeType === 'text' && block.content[0].marks && block.content[0].marks.some((m: any) => m.type === 'code')) {
           const text = block.content[0].value;
           return `
            <div class="my-8 rounded-lg overflow-hidden border border-light-border bg-light-surface">
              <div class="flex items-center justify-between px-4 py-2 bg-black/5 border-b border-light-border/50">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span class="text-xs text-dark-bg/40 uppercase font-semibold tracking-wider">CODE</span>
              </div>
              <div class="p-4 overflow-x-auto">
                <pre class="font-mono text-sm leading-relaxed text-dark-bg/90"><code>${text}</code></pre>
              </div>
            </div>`;
       }
      return `<p class="mb-6 text-dark-bg/90 leading-relaxed text-base">${next(block.content)}</p>`;
    },
    
    [BLOCKS.HEADING_1]: (node: Node, next: any) => 
      `<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-dark-bg first:mt-0">${next((node as Block).content)}</h1>`,
    
    [BLOCKS.HEADING_2]: (node: Node, next: any) => 
      `<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-dark-bg first:mt-0">${next((node as Block).content)}</h2>`,
    
    [BLOCKS.HEADING_3]: (node: Node, next: any) => 
      `<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-dark-bg first:mt-0">${next((node as Block).content)}</h3>`,
    
    [BLOCKS.HEADING_4]: (node: Node, next: any) => 
      `<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-dark-bg first:mt-0">${next((node as Block).content)}</h4>`,
    
    [BLOCKS.HEADING_5]: (node: Node, next: any) => 
      `<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-dark-bg first:mt-0">${next((node as Block).content)}</h5>`,
    
    [BLOCKS.HEADING_6]: (node: Node, next: any) => 
      `<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-dark-bg first:mt-0">${next((node as Block).content)}</h6>`,
    
    [BLOCKS.UL_LIST]: (node: Node, next: any) => 
      `<ul class="list-disc list-outside mb-6 space-y-3 text-dark-bg/90 pl-6">${next((node as Block).content)}</ul>`,
    
    [BLOCKS.OL_LIST]: (node: Node, next: any) => 
      `<ol class="list-decimal list-outside mb-6 space-y-3 text-dark-bg/90 pl-6">${next((node as Block).content)}</ol>`,
    
    [BLOCKS.QUOTE]: (node: Node, next: any) => 
      `<blockquote class="relative pl-6 py-2 my-8 border-l-4 border-primary bg-light-surface/50 rounded-r-lg italic text-dark-bg/90">
        <div class="not-italic">${next((node as Block).content)}</div>
      </blockquote>`,

    [BLOCKS.TABLE]: (node: Node, next: any) => 
      `<div class="overflow-x-auto my-8 rounded-lg border border-light-border">
        <table class="w-full text-left border-collapse">
          <tbody>${next((node as Block).content)}</tbody>
        </table>
      </div>`,
    
    [BLOCKS.TABLE_ROW]: (node: Node, next: any) => 
      `<tr>${next((node as Block).content)}</tr>`,
    
    [BLOCKS.TABLE_HEADER_CELL]: (node: Node, next: any) => 
      `<th class="bg-light-surface p-4 text-left border-b border-light-border font-semibold text-dark-bg whitespace-nowrap">${next((node as Block).content)}</th>`,
    
    [BLOCKS.TABLE_CELL]: (node: Node, next: any) => 
      `<td class="p-4 border-b border-light-border/50 text-dark-bg/80 align-top">${next((node as Block).content)}</td>`,
    
    [BLOCKS.HR]: () => 
      `<hr class="my-8 border-light-border">`,
  },
};

// Main function to render rich text to HTML
export function renderRichText(document: Document, isLightMode = false): string {
  if (!document) return '';

  // Helper to detect if a specific node is a "code block" (legacy/custom)
  // This is a safety measure if standard Contentful code blocks are used
  // Note: Contentful removed the native Code Block node in favor of marks, but let's be safe
  // const options... 
  
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