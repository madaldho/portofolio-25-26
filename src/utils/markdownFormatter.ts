
import { marked } from 'marked';

// Configure custom renderer
const renderer = new marked.Renderer();

// 1. Headings - Default rendering, handled by CSS
// 2. Paragraphs - Default rendering, handled by CSS
// 3. Links - Default rendering, handled by CSS
// 4. Lists - Default rendering, handled by CSS

// 7. Code Blocks (Mac Window Style) - KEEPING THIS
renderer.code = ({ text, lang }: any) => {
  const language = (lang || 'text').split(':')[0];
  const fileName = lang?.includes(':') ? lang.split(':')[1] : '';

  return `
    <div class="my-8 rounded-lg overflow-hidden border border-dark-border bg-dark-surface">
      <div class="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-dark-border/50">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
          ${fileName ? `<span class="ml-2 text-xs text-white/50 font-mono">${fileName}</span>` : ''}
        </div>
        <span class="text-xs text-white/40 uppercase font-semibold tracking-wider">${language}</span>
      </div>
      <div class="p-4 overflow-x-auto">
        <pre class="font-mono text-sm leading-relaxed text-white/90"><code>${text}</code></pre>
      </div>
    </div>
  `;
};

// 8. Inline Code
renderer.codespan = ({ text }: any) => {
  return `<code class="px-1.5 py-0.5 bg-dark-surface border border-dark-border rounded text-sm font-mono text-secondary">${text}</code>`;
};

// 9. Images
renderer.image = ({ href, text, title }: any) => {
  return `
    <figure class="my-8">
      <img src="${href}" alt="${text}" class="w-full rounded-lg shadow-lg border border-dark-border/50" loading="lazy" />
      ${title ? `<figcaption class="mt-2 text-center text-sm text-white/60 italic">${title}</figcaption>` : ''}
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
        // Try to get localized content or fallback
        if (content['en-US']) textContent = content['en-US'];
        else if (content['id-ID']) textContent = content['id-ID'];
        else if (Object.keys(content).length > 0) textContent = Object.values(content)[0] as string || '';
    }

    if (!textContent || typeof textContent !== 'string') return '';

    try {
        return marked.parse(textContent, { renderer }) as string;
    } catch (e) {
        console.error('Error parsing markdown:', e);
        return textContent; // Fallback to raw text if parsing fails
    }
}
