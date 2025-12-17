import { createClient } from 'contentful';

const createContentfulClient = (preview = false) => {
  const config = {
    spaceId: "hbrrn0bf99r5",
    accessToken: preview ? "P1MbEa9EjwdeEzQMLZze_cN1VkBSQXaynehvAJzqzFI" : "EbDxRUiUgumNFLj_fyLC40Fn5z0wQwtaDzEeBBfX8So",
    environment: "master",
    host: preview ? "preview.contentful.com" : "cdn.contentful.com"
  };
  return createClient({
    space: config.spaceId,
    accessToken: config.accessToken,
    host: config.host,
    environment: config.environment
  });
};
const contentfulClient = (() => {
  try {
    return createContentfulClient(false);
  } catch (error) {
    console.warn("Failed to create Contentful client:", error);
    return null;
  }
})();
const previewClient = (() => {
  try {
    return createContentfulClient(true);
  } catch (error) {
    console.warn("Failed to create Contentful preview client:", error);
    return null;
  }
})();
async function getSimpleProjects(preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error("Contentful client not available");
    }
    const query = {
      content_type: "simpleProject",
      order: ["-sys.createdAt"]
    };
    if (locale) {
      query.locale = locale;
    }
    const entries = await client.getEntries(query);
    return entries.items;
  } catch (error) {
    console.error("Error fetching simple projects from Contentful:", error);
    return [];
  }
}
async function getBlogPosts(preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn("Contentful client not available");
      return [];
    }
    const entries = locale ? await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      include: 2,
      locale
    }) : await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      include: 2
    });
    return entries.items;
  } catch (error) {
    console.warn("Error fetching blog posts from Contentful:", error);
    return [];
  }
}
async function getBlogPost(slug, preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error("Contentful client not available");
    }
    const entries = locale ? await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
      include: 2,
      locale
    }) : await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
      include: 2
    });
    return entries.items[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post "${slug}" from Contentful:`, error);
    return null;
  }
}
async function getSimpleBlogPosts(preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn("Contentful client not available");
      return [];
    }
    const entries = locale ? await client.getEntries({
      content_type: "simpleBlog",
      order: ["-fields.publishDate"],
      locale
    }) : await client.getEntries({
      content_type: "simpleBlog",
      order: ["-fields.publishDate"]
    });
    return entries.items;
  } catch (error) {
    console.warn("Error fetching simple blog posts from Contentful:", error);
    return [];
  }
}
async function getSimpleBlogPost(slug, preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error("Contentful client not available");
    }
    const entries = locale ? await client.getEntries({
      content_type: "simpleBlog",
      "fields.slug": slug,
      limit: 1,
      locale
    }) : await client.getEntries({
      content_type: "simpleBlog",
      "fields.slug": slug,
      limit: 1
    });
    return entries.items[0] || null;
  } catch (error) {
    console.error(`Error fetching simple blog post "${slug}" from Contentful:`, error);
    return null;
  }
}
async function getCertificates(preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn("Contentful client not available");
      return [];
    }
    const query = {
      content_type: "certificate",
      order: ["-fields.issueDate"]
    };
    if (locale) {
      query.locale = locale;
    }
    const entries = await client.getEntries(query);
    return entries.items;
  } catch (error) {
    console.warn("Error fetching certificates from Contentful:", error);
    return [];
  }
}
async function getProfile(preview = false, locale) {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error("Contentful client not available");
    }
    const entries = await client.getEntries({
      content_type: "profile",
      limit: 1,
      include: 2,
      ...locale && { locale }
    });
    return entries.items[0] || null;
  } catch (error) {
    console.error("Error fetching profile from Contentful:", error);
    return null;
  }
}
function isContentfulConfigured() {
  return true;
}
const fallbackBlogPosts = [
  {
    sys: {
      id: "fallback-blog-1",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    fields: {
      title: "Getting Started with Astro",
      slug: "getting-started-with-astro",
      excerpt: "Learn how to build fast, modern websites with Astro framework",
      content: "Astro is a modern web framework that allows you to build fast, content-focused websites...",
      tags: ["astro", "web-development", "javascript"],
      publishDate: "2024-01-01"
    }
  }
];

export { getSimpleBlogPost as a, getBlogPosts as b, getSimpleBlogPosts as c, getCertificates as d, getSimpleProjects as e, contentfulClient as f, getBlogPost as g, getProfile as h, isContentfulConfigured as i, fallbackBlogPosts as j };
