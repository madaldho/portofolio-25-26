import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D0n8rIWj.mjs';
import { manifest } from './manifest_DKWRw9sR.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin-aldho/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin-aldho.astro.mjs');
const _page4 = () => import('./pages/api/cms/blog.astro.mjs');
const _page5 = () => import('./pages/api/cms/projects.astro.mjs');
const _page6 = () => import('./pages/api/webhook/contentful.astro.mjs');
const _page7 = () => import('./pages/blog/_slug_.astro.mjs');
const _page8 = () => import('./pages/blog.astro.mjs');
const _page9 = () => import('./pages/certificates.astro.mjs');
const _page10 = () => import('./pages/id/blog/_slug_.astro.mjs');
const _page11 = () => import('./pages/id/blog.astro.mjs');
const _page12 = () => import('./pages/id/certificates.astro.mjs');
const _page13 = () => import('./pages/id/projects/_slug_.astro.mjs');
const _page14 = () => import('./pages/id.astro.mjs');
const _page15 = () => import('./pages/og-image.png.astro.mjs');
const _page16 = () => import('./pages/projects/_slug_.astro.mjs');
const _page17 = () => import('./pages/robots.txt.astro.mjs');
const _page18 = () => import('./pages/rss.xml.astro.mjs');
const _page19 = () => import('./pages/sitemap.xml.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin-aldho/dashboard.astro", _page2],
    ["src/pages/admin-aldho/index.astro", _page3],
    ["src/pages/api/cms/blog.ts", _page4],
    ["src/pages/api/cms/projects.ts", _page5],
    ["src/pages/api/webhook/contentful.ts", _page6],
    ["src/pages/blog/[slug].astro", _page7],
    ["src/pages/blog/index.astro", _page8],
    ["src/pages/certificates/index.astro", _page9],
    ["src/pages/id/blog/[slug].astro", _page10],
    ["src/pages/id/blog/index.astro", _page11],
    ["src/pages/id/certificates/index.astro", _page12],
    ["src/pages/id/projects/[slug].astro", _page13],
    ["src/pages/id/index.astro", _page14],
    ["src/pages/og-image.png.ts", _page15],
    ["src/pages/projects/[slug].astro", _page16],
    ["src/pages/robots.txt.ts", _page17],
    ["src/pages/rss.xml.ts", _page18],
    ["src/pages/sitemap.xml.ts", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a2ee8052-0e5b-4336-9431-1eabe7a4f9fa",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
