import { d as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, u as unescapeHTML, b as renderScript, a as renderTemplate } from './astro/server_Cs80HLQR.mjs';
import 'piccolore';
import 'clsx';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
/* empty css                          */

const richTextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => `<strong class="font-semibold">${text}</strong>`,
    [MARKS.ITALIC]: (text) => `<em class="italic">${text}</em>`,
    [MARKS.UNDERLINE]: (text) => `<u class="underline">${text}</u>`,
    [MARKS.CODE]: (text) => `<code class="px-2 py-1 bg-dark-surface border border-dark-border rounded text-sm font-mono text-secondary">${text}</code>`
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => `<p class="mb-6 text-white/90 leading-relaxed text-base">${next(node.content)}</p>`,
    [BLOCKS.HEADING_1]: (node, next) => `<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-white first:mt-0">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) => `<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-white first:mt-0">${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node, next) => `<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-white first:mt-0">${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node, next) => `<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-white first:mt-0">${next(node.content)}</h4>`,
    [BLOCKS.HEADING_5]: (node, next) => `<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-white first:mt-0">${next(node.content)}</h5>`,
    [BLOCKS.HEADING_6]: (node, next) => `<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-white first:mt-0">${next(node.content)}</h6>`,
    [BLOCKS.UL_LIST]: (node, next) => `<ul class="list-disc list-outside mb-6 space-y-3 text-white/90 pl-6">${next(node.content)}</ul>`,
    [BLOCKS.OL_LIST]: (node, next) => `<ol class="list-decimal list-outside mb-6 space-y-3 text-white/90 pl-6">${next(node.content)}</ol>`,
    [BLOCKS.LIST_ITEM]: (node, next) => `<li class="leading-relaxed">${next(node.content)}</li>`,
    [BLOCKS.QUOTE]: (node, next) => `<blockquote class="border-l-4 border-primary pl-6 py-6 mb-8 bg-dark-surface/30 rounded-r-lg my-8">
        <div class="text-white/90 italic text-lg leading-relaxed">${next(node.content)}</div>
      </blockquote>`,
    [BLOCKS.HR]: () => `<hr class="my-8 border-dark-border">`,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data?.target;
      if (!asset?.fields?.file) return "";
      const { file, title, description } = asset.fields;
      const isImage = file.contentType.startsWith("image/");
      if (isImage) {
        return `
          <figure class="my-6">
            <img 
              src="${file.url}?w=800&q=80&fm=webp" 
              alt="${title || description || "Embedded image"}"
              class="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
            ${title ? `<figcaption class="text-center text-sm text-white/60 mt-2">${title}</figcaption>` : ""}
          </figure>
        `;
      }
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
    [INLINES.HYPERLINK]: (node, next) => {
      const uri = node.data?.uri || "";
      const isExternal = uri.startsWith("http") && !uri.includes(window?.location?.hostname || "");
      return `
        <a 
          href="${uri}" 
          ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}
          class="text-primary hover:text-primary-light underline transition-colors"
        >
          ${next(node.content)}
          ${isExternal ? '<svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>' : ""}
        </a>
      `;
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data?.target;
      if (!entry?.fields) return "";
      return `
        <div class="my-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
          <h4 class="font-semibold text-primary mb-2">${entry.fields.title || "Related Content"}</h4>
          ${entry.fields.description ? `<p class="text-sm text-white/70">${entry.fields.description}</p>` : ""}
        </div>
      `;
    }
  }
};
const lightModeRichTextRenderOptions = {
  ...richTextRenderOptions,
  renderMark: {
    ...richTextRenderOptions.renderMark,
    [MARKS.CODE]: (text) => `<code class="px-2 py-1 bg-light-surface border border-light-border rounded text-sm font-mono text-secondary">${text}</code>`
  },
  renderNode: {
    ...richTextRenderOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node, next) => `<p class="mb-6 text-dark-bg/90 leading-relaxed text-base">${next(node.content)}</p>`,
    [BLOCKS.HEADING_1]: (node, next) => `<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-dark-bg first:mt-0">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) => `<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-dark-bg first:mt-0">${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node, next) => `<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-dark-bg first:mt-0">${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node, next) => `<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-dark-bg first:mt-0">${next(node.content)}</h4>`,
    [BLOCKS.HEADING_5]: (node, next) => `<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-dark-bg first:mt-0">${next(node.content)}</h5>`,
    [BLOCKS.HEADING_6]: (node, next) => `<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-dark-bg first:mt-0">${next(node.content)}</h6>`,
    [BLOCKS.UL_LIST]: (node, next) => `<ul class="list-disc list-outside mb-6 space-y-3 text-dark-bg/90 pl-6">${next(node.content)}</ul>`,
    [BLOCKS.OL_LIST]: (node, next) => `<ol class="list-decimal list-outside mb-6 space-y-3 text-dark-bg/90 pl-6">${next(node.content)}</ol>`,
    [BLOCKS.QUOTE]: (node, next) => `<blockquote class="border-l-4 border-primary pl-6 py-6 mb-8 bg-light-surface/50 border border-light-border rounded-r-lg my-8">
        <div class="text-dark-bg/90 italic text-lg leading-relaxed">${next(node.content)}</div>
      </blockquote>`,
    [BLOCKS.HR]: () => `<hr class="my-8 border-light-border">`
  }
};
function renderRichText(document, isLightMode = false) {
  if (!document) return "";
  try {
    const options = isLightMode ? lightModeRichTextRenderOptions : richTextRenderOptions;
    return documentToHtmlString(document, options);
  } catch (error) {
    console.error("Error rendering rich text:", error);
    return '<p class="text-red-400">Error rendering content</p>';
  }
}
function extractPlainText(document) {
  if (!document || !document.content) return "";
  function extractFromNode(node) {
    if (node.nodeType === "text") {
      return node.value || "";
    }
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractFromNode).join("");
    }
    return "";
  }
  return document.content.map(extractFromNode).join(" ").trim();
}
function calculateReadingTime(document) {
  const plainText = extractPlainText(document);
  const wordsPerMinute = 200;
  const wordCount = plainText.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

const $$Astro = createAstro("https://muhamadaliridho.me");
const $$RichText = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RichText;
  const { content, className = "" } = Astro2.props;
  const htmlContent = renderRichText(content, false);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`rich-text-content ${className}`, "class")}${addAttribute(JSON.stringify(content), "data-rich-text-content")} data-astro-cid-ldsxpadv>${unescapeHTML(htmlContent)}</div> ${renderScript($$result, "/Users/madaldho/Portofolio Baru/src/components/RichText.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/madaldho/Portofolio Baru/src/components/RichText.astro", void 0);

export { $$RichText as $, calculateReadingTime as c };
