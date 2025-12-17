
import { marked } from 'marked';

// Configure custom renderer
const renderer = new marked.Renderer();

// 1. Headings
renderer.heading = ({ tokens, depth }: any) => {
  const text = renderer.parser.parseInline(tokens);
  const sizes = {
    1: 'text-4xl md:text-5xl font-bold mb-8 mt-12 text-white',
    2: 'text-3xl md:text-4xl font-semibold mb-6 mt-10 text-white',
    3: 'text-2xl md:text-3xl font-semibold mb-5 mt-8 text-white',
    4: 'text-xl md:text-2xl font-semibold mb-4 mt-6 text-white',
    5: 'text-lg md:text-xl font-semibold mb-3 mt-5 text-white',
    6: 'text-base md:text-lg font-semibold mb-2 mt-4 text-white',
  };
  const className = sizes[depth as keyof typeof sizes] || sizes[6];
  return `<h${depth} class="${className}">${text}</h${depth}>`;
};

// 2. Paragraphs
renderer.paragraph = ({ tokens }: any) => {
  const text = renderer.parser.parseInline(tokens);
  return `<p class="mb-6 text-white/90 leading-relaxed text-base">${text}</p>`;
};

// 3. Links
renderer.link = ({ href, title, tokens }: any) => {
  const text = renderer.parser.parseInline(tokens);
  return `<a href="${href}" title="${title || ''}" class="text-primary hover:text-primary-light transition-colors underline underline-offset-4 decoration-1 hover:decoration-2">${text}</a>`;
};

// 4. Lists
renderer.list = ({ body, ordered }: any) => {
  const tag = ordered ? 'ol' : 'ul';
  const listTypeClass = ordered ? 'list-decimal' : 'list-disc';
  return `<${tag} class="${listTypeClass} list-outside mb-6 space-y-3 text-white/90 pl-6">${body}</${tag}>`;
};

renderer.listitem = ({ tokens }: any) => {
  const text = renderer.parser.parseInline(tokens); 
  return `<li class="leading-relaxed pl-2">${text}</li>`;
};

// 5. Blockquote
renderer.blockquote = ({ tokens }: any) => {
  const body = renderer.parser.parse(tokens);
  return `<blockquote class="relative pl-6 py-2 my-8 border-l-4 border-primary bg-dark-surface/50 rounded-r-lg italic text-white/80">
    <div class="not-italic">${body}</div>
  </blockquote>`;
};

// 6. Tables
renderer.table = ({ header, rows }: any) => {
  let headerHtml = '';
  if (header) {
      headerHtml = header.map((cell: any) => {
        const content = renderer.parser.parseInline(cell.tokens);
        return `<th class="bg-dark-surface p-4 text-left border-b border-dark-border font-semibold text-white whitespace-nowrap">${content}</th>`;
      }).join('');
  }
  
  let bodyHtml = '';
  if (rows) {
      bodyHtml = rows.map((row: any) => {
          const cells = row.map((cell: any) => {
            const content = renderer.parser.parseInline(cell.tokens);
            return `<td class="p-4 border-b border-dark-border/50 text-white/80 align-top">${content}</td>`;
          }).join('');
          return `<tr>${cells}</tr>`;
      }).join('');
  }

  return `
    <div class="overflow-x-auto my-8 rounded-lg border border-dark-border">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>${headerHtml}</tr>
        </thead>
        <tbody>
          ${bodyHtml}
        </tbody>
      </table>
    </div>
  `;
};

// 7. Code Blocks
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
    
    if (typeof content === 'string') {
        textContent = content;
    } else if (content && typeof content === 'object') {
        if (content['en-US']) textContent = content['en-US'];
        else if (content['id-ID']) textContent = content['id-ID'];
        else textContent = Object.values(content)[0] as string || '';
    }

    if (!textContent) return '';

    return marked.parse(textContent, { renderer }) as string;
}
