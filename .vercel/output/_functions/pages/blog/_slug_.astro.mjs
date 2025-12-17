import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment, u as unescapeHTML } from '../../chunks/astro/server_Cs80HLQR.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CfkRjAR6.mjs';
import { i as isContentfulConfigured, g as getBlogPost, a as getSimpleBlogPost } from '../../chunks/contentful_MPr82VON.mjs';
import { c as calculateReadingTime, $ as $$RichText } from '../../chunks/RichText_BnsZPS0k.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://muhamadaliridho.me");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  let post = null;
  let isUsingContentful = false;
  let isRichText = false;
  try {
    if (isContentfulConfigured()) {
      const richTextPost = await getBlogPost(slug, false, "en-US");
      if (richTextPost) {
        let imageUrl = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop&crop=entropy&auto=format&q=80`;
        if (richTextPost.fields.featuredImage?.fields?.file?.url) {
          imageUrl = richTextPost.fields.featuredImage.fields.file.url.startsWith(
            "//"
          ) ? `https:${richTextPost.fields.featuredImage.fields.file.url}` : richTextPost.fields.featuredImage.fields.file.url;
        }
        post = {
          id: richTextPost.sys.id,
          slug,
          data: {
            title: richTextPost.fields.title,
            excerpt: richTextPost.fields.excerpt,
            content: richTextPost.fields.content,
            tags: Array.isArray(richTextPost.fields.tags) ? richTextPost.fields.tags : [],
            publishDate: richTextPost.fields.publishDate,
            publishedAt: richTextPost.fields.publishDate,
            featuredImage: imageUrl,
            readingTime: richTextPost.fields.readingTime || calculateReadingTime(richTextPost.fields.content)
          }
        };
        isUsingContentful = true;
        isRichText = true;
      } else {
        const simplePost = await getSimpleBlogPost(slug, false, "en-US");
        if (simplePost) {
          let imageUrl = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop&crop=entropy&auto=format&q=80`;
          if (simplePost.fields.featuredImage?.fields?.file?.url) {
            imageUrl = simplePost.fields.featuredImage.fields.file.url.startsWith(
              "//"
            ) ? `https:${simplePost.fields.featuredImage.fields.file.url}` : simplePost.fields.featuredImage.fields.file.url;
          } else if (simplePost.fields.imageUrl) {
            imageUrl = simplePost.fields.imageUrl;
          }
          const contentString = typeof simplePost.fields.content === "string" ? simplePost.fields.content : "";
          post = {
            id: simplePost.sys.id,
            slug,
            data: {
              title: simplePost.fields.title,
              excerpt: simplePost.fields.excerpt,
              content: simplePost.fields.content,
              tags: Array.isArray(simplePost.fields.tags) ? simplePost.fields.tags : [],
              publishDate: simplePost.fields.publishDate,
              publishedAt: simplePost.fields.publishDate,
              featuredImage: imageUrl,
              readingTime: Math.ceil(
                (contentString.split(/\s+/).length || 100) / 200
              )
            }
          };
          isUsingContentful = true;
          isRichText = false;
        }
      }
    }
  } catch (error) {
    console.warn("Error fetching blog post:", error);
  }
  if (!post) {
    if (slug === "getting-started-with-astro") {
      post = {
        id: "fallback-1",
        slug: "getting-started-with-astro",
        data: {
          title: "Getting Started with Astro",
          excerpt: "Learn how to build fast, modern websites with Astro framework",
          content: `Astro is a revolutionary web framework...`,
          // Content truncated for brevity, but logically matches previous fallback
          tags: ["astro", "web-development", "javascript", "performance"],
          publishDate: "2024-12-15",
          publishedAt: "2024-12-15",
          featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop&crop=entropy&auto=format&q=80",
          readingTime: 5
        }
      };
    }
  }
  if (!post) {
    return Astro2.redirect("/404");
  }
  function formatContent(content) {
    let textContent;
    if (typeof content === "string") {
      textContent = content;
    } else if (content && typeof content === "object") {
      if (content["en-US"]) {
        textContent = content["en-US"];
      } else if (content["id-ID"]) {
        textContent = content["id-ID"];
      } else {
        const values = Object.values(content);
        textContent = values.find((val) => typeof val === "string") || "";
      }
    } else {
      textContent = "";
    }
    if (!textContent || typeof textContent !== "string") {
      return "";
    }
    let formatted = textContent;
    formatted = formatted.replace(
      /^# (.+)$/gm,
      '<h1 class="text-4xl md:text-5xl font-bold mb-8 mt-12 text-white first:mt-0">$1</h1>'
    ).replace(
      /^## (.+)$/gm,
      '<h2 class="text-3xl md:text-4xl font-semibold mb-6 mt-10 text-white first:mt-0">$1</h2>'
    ).replace(
      /^### (.+)$/gm,
      '<h3 class="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-white first:mt-0">$1</h3>'
    ).replace(
      /^#### (.+)$/gm,
      '<h4 class="text-xl md:text-2xl font-semibold mb-4 mt-6 text-white first:mt-0">$1</h4>'
    ).replace(
      /^##### (.+)$/gm,
      '<h5 class="text-lg md:text-xl font-semibold mb-3 mt-5 text-white first:mt-0">$1</h5>'
    ).replace(
      /^###### (.+)$/gm,
      '<h6 class="text-base md:text-lg font-semibold mb-2 mt-4 text-white first:mt-0">$1</h6>'
    );
    formatted = formatted.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-white">$1</strong>'
    ).replace(/\*(.+?)\*/g, '<em class="italic text-white/90">$1</em>').replace(
      /`(.+?)`/g,
      '<code class="px-2 py-1 bg-dark-surface border border-dark-border rounded text-sm font-mono text-secondary">$1</code>'
    );
    formatted = formatted.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-dark-surface border border-dark-border rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-white">$2</code></pre>'
    );
    formatted = formatted.replace(/^- (.+)$/gm, '<li class="leading-relaxed text-white/90">$1</li>').replace(
      /(<li[\s\S]*?<\/li>)/g,
      '<ul class="list-disc list-outside mb-6 space-y-3 text-white/90 pl-6">$1</ul>'
    );
    formatted = formatted.split(/\n\n+/).map((block) => {
      if (block.match(/<\/?(h[1-6]|ul|pre)/)) {
        return block;
      }
      if (block.trim().length > 0) {
        return `<p class="mb-6 text-white/90 leading-relaxed text-base">${block.trim()}</p>`;
      }
      return "";
    }).join("\n");
    return formatted;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${post.data.title} - Muhamad Ali Ridho`, "description": post.data.excerpt, "type": "article", "publishedTime": post.data.publishedAt, "tags": post.data.tags, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pt-20" data-astro-cid-4sn4zg3r> <!-- Hero Section --> <section class="relative blog-hero" data-astro-cid-4sn4zg3r> <!-- Featured Image --> <div class="relative h-96 overflow-hidden" data-astro-cid-4sn4zg3r> <img${addAttribute(post.data.featuredImage, "src")}${addAttribute(post.data.title, "alt")} class="w-full h-full object-cover" data-astro-cid-4sn4zg3r> <div class="absolute inset-0 bg-linear-to-t from-dark-bg via-dark-bg/50 to-transparent" data-astro-cid-4sn4zg3r></div> </div> <!-- Content Overlay --> <div class="absolute inset-0 flex items-end" data-astro-cid-4sn4zg3r> <div class="max-w-4xl mx-auto px-6 pb-12 w-full" data-astro-cid-4sn4zg3r> <!-- Breadcrumb --> <nav class="mb-4" data-astro-cid-4sn4zg3r> <a href="/blog" class="text-primary hover:text-primary-light transition-colors text-sm" data-astro-cid-4sn4zg3r>
← Back to Blog
</a> </nav> <!-- Meta Info --> <div class="flex items-center gap-4 mb-4 text-sm text-muted" data-astro-cid-4sn4zg3r> <time class="font-mono" data-astro-cid-4sn4zg3r> ${new Date(post.data.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time> <span data-astro-cid-4sn4zg3r>•</span> <span data-astro-cid-4sn4zg3r>${post.data.readingTime} min read</span> ${isUsingContentful && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result3) => renderTemplate` <span data-astro-cid-4sn4zg3r>•</span> ` })}`} </div> <!-- Title --> <h1 class="text-display text-3xl md:text-4xl lg:text-5xl mb-4 text-white" data-astro-cid-4sn4zg3r> ${post.data.title} </h1> <!-- Excerpt --> <p class="text-lg text-white/80 max-w-2xl" data-astro-cid-4sn4zg3r> ${post.data.excerpt} </p> </div> </div> </section> <!-- Article Content --> <article class="section-padding" data-astro-cid-4sn4zg3r> <div class="max-w-4xl mx-auto px-6" data-astro-cid-4sn4zg3r> <!-- Tags --> ${post.data.tags && Array.isArray(post.data.tags) && post.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-8" data-astro-cid-4sn4zg3r> ${post.data.tags.map((tag) => renderTemplate`<span class="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20" data-astro-cid-4sn4zg3r>
#${tag} </span>`)} </div>`} <!-- Content --> <div class="max-w-none" data-astro-cid-4sn4zg3r> ${isRichText ? renderTemplate`${renderComponent($$result2, "RichText", $$RichText, { "content": post.data.content, "className": "blog-content", "data-astro-cid-4sn4zg3r": true })}` : renderTemplate`<div class="rich-text-content" data-astro-cid-4sn4zg3r>${unescapeHTML(formatContent(post.data.content))}</div>`} </div> <!-- Share Section --> <div class="mt-12 pt-8 border-t border-dark-border" data-astro-cid-4sn4zg3r> <h3 class="text-lg font-semibold mb-4" data-astro-cid-4sn4zg3r>Share this article</h3> <div class="flex gap-4" data-astro-cid-4sn4zg3r> <a${addAttribute(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.data.title)}&url=${encodeURIComponent(`https://muhamadaliridho.me/blog/${post.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-lg transition-colors" data-astro-cid-4sn4zg3r> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-4sn4zg3r> <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-astro-cid-4sn4zg3r></path> </svg>
Twitter
</a> <a${addAttribute(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://muhamadaliridho.me/blog/${post.slug}`)}`, "href")} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006396] text-white rounded-lg transition-colors" data-astro-cid-4sn4zg3r> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-4sn4zg3r> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-4sn4zg3r></path> </svg>
LinkedIn
</a> </div> </div> <!-- Navigation --> <div class="mt-12 pt-8 border-t border-dark-border" data-astro-cid-4sn4zg3r> <a href="/blog" class="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors" data-astro-cid-4sn4zg3r> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-4sn4zg3r> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-4sn4zg3r></path> </svg>
Back to Blog
</a> </div> </div> </article> </main> ` })} `;
}, "/Users/madaldho/Portofolio Baru/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/madaldho/Portofolio Baru/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
