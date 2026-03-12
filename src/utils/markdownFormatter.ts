
import { marked } from 'marked';

// HTML attribute escaper to prevent XSS
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Configure custom renderer
const renderer = new marked.Renderer();

// 1. Headings - Default rendering, handled by CSS
// 2. Paragraphs - Default rendering, handled by CSS
// 3. Links - Default rendering, handled by CSS
// 4. Lists - Default rendering, handled by CSS

// 7. Code Blocks (Mac Window Style) - KEEPING THIS
renderer.code = ({ text, lang }: any) => {
  const rawLang = lang || 'text';
  const language = escapeHtml(rawLang.split(':')[0]);
  const fileName = rawLang.includes(':') ? escapeHtml(rawLang.split(':')[1]) : '';

  return `
    <div class="markdown-code-block my-8 rounded-lg overflow-hidden border">
      <div class="markdown-code-header flex items-center justify-between px-4 py-2 border-b">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
          ${fileName ? `<span class="ml-2 text-xs font-mono markdown-code-filename">${fileName}</span>` : ''}
        </div>
        <span class="text-xs uppercase font-semibold tracking-wider markdown-code-lang">${language}</span>
      </div>
      <div class="p-4 overflow-x-auto">
        <pre class="font-mono text-sm leading-relaxed"><code>${escapeHtml(text)}</code></pre>
      </div>
    </div>
  `;
};

// 8. Inline Code
renderer.codespan = ({ text }: any) => {
  return `<code class="markdown-inline-code px-1.5 py-0.5 rounded text-sm font-mono">${escapeHtml(text)}</code>`;
};

// 9. Images
renderer.image = ({ href, text, title }: any) => {
  const safeHref = escapeHtml(href || '');
  const safeText = escapeHtml(text || '');
  const safeTitle = title ? escapeHtml(title) : '';

  return `
    <figure class="my-8">
      <img src="${safeHref}" alt="${safeText}" class="w-full rounded-lg shadow-lg border border-dark-border/50" loading="lazy" />
      ${safeTitle ? `<figcaption class="mt-2 text-center text-sm text-white/60 italic">${safeTitle}</figcaption>` : ''}
    </figure>
  `;
};

export function formatMarkdown(content: string | any): string {
    let textContent = '';
    
    // Safely handle different content structures
    if (!content) {
        return '';
    }
    
    if (typeof content === 'string') {
        textContent = content;
    } else if (typeof content === 'object') {
        // Try to get localized content or fallback (prioritize id-ID)
        if (content['id-ID']) textContent = content['id-ID'];
        else if (content['en-US']) textContent = content['en-US'];
        else if (Object.keys(content).length > 0) textContent = Object.values(content)[0] as string || '';
    }

    if (!textContent || typeof textContent !== 'string') return '';

    try {
        // marked.parse may return string or Promise<string> depending on version
        const result = marked.parse(textContent, { renderer });
        if (typeof result === 'string') {
            return result;
        }
        // If it's a Promise (newer marked versions with async extensions),
        // return empty and log warning — callers should use formatMarkdownAsync instead
        console.warn('marked.parse returned a Promise. Use formatMarkdownAsync for async parsing.');
        return textContent;
    } catch (e) {
        console.error('Error parsing markdown:', e);
        return textContent; // Fallback to raw text if parsing fails
    }
}

// Async version for newer marked versions that may return Promise
export async function formatMarkdownAsync(content: string | any): Promise<string> {
    let textContent = '';
    
    if (!content) return '';
    
    if (typeof content === 'string') {
        textContent = content;
    } else if (typeof content === 'object') {
        if (content['id-ID']) textContent = content['id-ID'];
        else if (content['en-US']) textContent = content['en-US'];
        else if (Object.keys(content).length > 0) textContent = Object.values(content)[0] as string || '';
    }

    if (!textContent || typeof textContent !== 'string') return '';

    try {
        const result = marked.parse(textContent, { renderer });
        return await Promise.resolve(result);
    } catch (e) {
        console.error('Error parsing markdown:', e);
        return textContent;
    }
}
