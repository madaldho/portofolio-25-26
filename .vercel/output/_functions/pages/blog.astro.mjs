import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_Cs80HLQR.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BrByd7ND.mjs';
import { i as isContentfulConfigured, b as getBlogPosts, c as getSimpleBlogPosts } from '../chunks/contentful_MPr82VON.mjs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://muhamadaliridho.me");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let blogPosts = [];
  let isUsingContentful = false;
  try {
    if (isContentfulConfigured()) {
      const richTextPosts = await getBlogPosts(false, "en-US");
      if (richTextPosts.length > 0) {
        blogPosts = richTextPosts.map((post) => {
          let imageUrl = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80`;
          if (post.fields.featuredImage?.fields?.file?.url) {
            imageUrl = post.fields.featuredImage.fields.file.url.startsWith("//") ? `https:${post.fields.featuredImage.fields.file.url}` : post.fields.featuredImage.fields.file.url;
          }
          let contentHtml = "";
          let wordCount = 100;
          try {
            if (post.fields.content && typeof post.fields.content === "object") {
              contentHtml = documentToHtmlString(post.fields.content);
              wordCount = contentHtml.replace(/<[^>]*>/g, "").split(" ").length || 100;
            }
          } catch (e) {
            console.warn("Error converting rich text:", e);
          }
          return {
            id: post.sys.id,
            slug: post.fields.slug,
            data: {
              title: post.fields.title || "Untitled",
              excerpt: post.fields.excerpt || "",
              content: contentHtml,
              tags: post.fields.tags || [],
              publishDate: post.fields.publishDate || (/* @__PURE__ */ new Date()).toISOString(),
              publishedAt: post.fields.publishDate || (/* @__PURE__ */ new Date()).toISOString(),
              featuredImage: imageUrl,
              readingTime: post.fields.readingTime || Math.ceil(wordCount / 200)
            }
          };
        });
        isUsingContentful = true;
      } else {
        const contentfulPosts = await getSimpleBlogPosts(false, "en-US");
        if (contentfulPosts.length > 0) {
          blogPosts = contentfulPosts.map((post) => {
            let imageUrl = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80`;
            if (post.fields.featuredImage?.fields?.file?.url) {
              imageUrl = post.fields.featuredImage.fields.file.url.startsWith("//") ? `https:${post.fields.featuredImage.fields.file.url}` : post.fields.featuredImage.fields.file.url;
            } else if (post.fields.imageUrl) {
              imageUrl = post.fields.imageUrl;
            }
            return {
              id: post.sys.id,
              slug: post.fields.slug,
              data: {
                title: post.fields.title,
                excerpt: post.fields.excerpt,
                content: post.fields.content,
                tags: post.fields.tags || [],
                publishDate: post.fields.publishDate,
                publishedAt: post.fields.publishDate,
                featuredImage: imageUrl,
                readingTime: Math.ceil((typeof post.fields.content === "string" ? post.fields.content.split(" ").length : 100) / 200)
              }
            };
          });
          isUsingContentful = true;
        }
      }
    }
  } catch (error) {
    console.warn("Error fetching from Contentful:", error);
  }
  if (blogPosts.length === 0) {
    blogPosts = [
      {
        id: "fallback-1",
        slug: "getting-started-with-astro",
        data: {
          title: "Getting Started with Astro",
          excerpt: "Learn how to build fast, modern websites with Astro framework",
          content: "Astro is a modern web framework...",
          tags: ["astro", "web-development"],
          publishDate: "2024-12-15",
          publishedAt: "2024-12-15",
          featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
          readingTime: 5
        }
      }
    ];
  }
  const sortedPosts = blogPosts.sort(
    (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime()
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog - Muhamad Ali Ridho", "description": "Tech insights, tutorials, and learning journey from Muhamad Ali Ridho. Explore articles about web development, IoT, AI/ML, and more.", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen pt-20" data-astro-cid-5tznm7mj> <!-- Hero Section --> <section class="section-padding bg-linear-to-br from-dark-bg via-dark-surface to-dark-bg" data-astro-cid-5tznm7mj> <div class="max-w-4xl mx-auto px-6 text-center" data-astro-cid-5tznm7mj> <p class="text-primary font-mono text-sm mb-4" data-astro-cid-5tznm7mj>// Tech Blog</p> <h1 class="text-display text-4xl md:text-5xl lg:text-6xl mb-6" data-astro-cid-5tznm7mj>
Learning <span class="gradient-text" data-astro-cid-5tznm7mj>Journey</span> </h1> <p class="text-muted text-lg max-w-2xl mx-auto mb-8" data-astro-cid-5tznm7mj>
Sharing insights, tutorials, and discoveries from my exploration of technology.
          From web development to IoT and AI/ML projects.
</p> </div> </section> <!-- Blog Posts --> <section class="section-padding" data-astro-cid-5tznm7mj> <div class="max-w-6xl mx-auto px-6" data-astro-cid-5tznm7mj> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-5tznm7mj> ${sortedPosts.map((post) => renderTemplate`<article class="card-elevated group" data-cursor-hover data-astro-cid-5tznm7mj> <!-- Featured Image --> <div class="relative aspect-video overflow-hidden" data-astro-cid-5tznm7mj> <img${addAttribute(post.data.featuredImage, "src")}${addAttribute(post.data.title, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" data-astro-cid-5tznm7mj> <div class="absolute inset-0 bg-linear-to-t from-dark-bg/60 to-transparent" data-astro-cid-5tznm7mj></div> <!-- Reading Time --> <div class="absolute top-4 right-4 px-3 py-1 bg-dark-bg/90 backdrop-blur-sm rounded-full text-xs reading-time-badge" data-astro-cid-5tznm7mj> ${post.data.readingTime} min read
</div> </div> <!-- Content --> <div class="p-6" data-astro-cid-5tznm7mj> <!-- Date --> <time class="text-primary text-sm font-mono" data-astro-cid-5tznm7mj> ${new Date(post.data.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time> <!-- Title --> <h2 class="text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}`, "href")} class="hover:underline" data-astro-cid-5tznm7mj> ${post.data.title} </a> </h2> <!-- Excerpt --> <p class="text-muted text-sm mb-4 line-clamp-3" data-astro-cid-5tznm7mj> ${post.data.excerpt} </p> <!-- Tags --> <div class="flex flex-wrap gap-2 mb-4" data-astro-cid-5tznm7mj> ${Array.isArray(post.data.tags) && post.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="px-2 py-1 text-xs rounded-md bg-white/5 text-subtle" data-astro-cid-5tznm7mj>
#${tag} </span>`)} </div> <!-- Read More --> <a${addAttribute(`/blog/${post.slug}`, "href")}${addAttribute(`Read full article: ${post.data.title}`, "aria-label")} class="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm font-medium" data-astro-cid-5tznm7mj>
Read More
<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5tznm7mj> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-5tznm7mj></path> </svg> </a> </div> </article>`)} </div> <!-- Empty State --> ${sortedPosts.length === 0 && renderTemplate`<div class="text-center py-16" data-astro-cid-5tznm7mj> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center" data-astro-cid-5tznm7mj> <svg class="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5tznm7mj> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-astro-cid-5tznm7mj></path> </svg> </div> <h3 class="text-xl font-semibold mb-2" data-astro-cid-5tznm7mj>No Blog Posts Yet</h3> <p class="text-muted" data-astro-cid-5tznm7mj>Check back soon for new content!</p> </div>`} </div> </section> </main> ` })} `;
}, "/Users/madaldho/Portofolio Baru/src/pages/blog/index.astro", void 0);

const $$file = "/Users/madaldho/Portofolio Baru/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
