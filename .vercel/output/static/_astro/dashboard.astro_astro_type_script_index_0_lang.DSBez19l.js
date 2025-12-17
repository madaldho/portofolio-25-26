import{c as h,l as b}from"./auth.DkFYoU4K.js";import{c as l}from"./cmsManager.DKD_sWb_.js";import"./preload-helper.BlTxHScW.js";const v=document.getElementById("loading"),g=document.getElementById("dashboard"),w=document.getElementById("logout-btn");setTimeout(()=>{h()?(v?.classList.add("hidden"),g?.classList.remove("hidden"),d()):window.location.href="/admin-aldho"},1e3);w?.addEventListener("click",()=>{b(),window.location.href="/admin-aldho"});async function d(){try{const t=document.getElementById("blog-count"),e=document.getElementById("project-count"),n=document.getElementById("published-count");t&&(t.innerHTML='<div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>'),e&&(e.innerHTML='<div class="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>'),n&&(n.innerHTML='<div class="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>');const r=await l.getContentStats(),i=await l.getRecentActivity();t&&(t.textContent=r.blogPosts.toString(),t.classList.add("animate-pulse"),setTimeout(()=>t.classList.remove("animate-pulse"),500)),e&&(e.textContent=r.projects.toString(),e.classList.add("animate-pulse"),setTimeout(()=>e.classList.remove("animate-pulse"),500)),n&&(n.textContent=r.published.toString(),n.classList.add("animate-pulse"),setTimeout(()=>n.classList.remove("animate-pulse"),500));const o=document.getElementById("recent-activity");o&&(i.length===0?o.innerHTML=`
            <div class="text-white/60 text-center py-8">
              <p>No recent activity</p>
              <p class="text-sm mt-2">Create your first blog post or project to get started</p>
            </div>
          `:o.innerHTML=`
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-sm font-medium text-white/80">Latest from Contentful</h4>
              <div class="flex items-center gap-2 text-xs text-primary">
                <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
            ${i.map(s=>{const c=s.fields.title?.["en-US"]||"Untitled",a=s.contentType==="blogPost"?"Blog Post":"Project",m=new Date(s.updatedAt).toLocaleDateString(),p=s.status==="published"?"Published":"Draft",f=s.status==="published"?"text-green-400":"text-yellow-400";return`
                <div class="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-primary/30 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span class="text-primary text-sm">${a==="Blog Post"?"📝":"🚀"}</span>
                    </div>
                    <div>
                      <p class="text-white font-medium">${c}</p>
                      <p class="text-white/60 text-sm">${a} • ${m}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 rounded-full bg-white/5 ${f}">
                      ${p}
                    </span>
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              `}).join("")}
          `)}catch(t){console.error("Error loading dashboard data:",t)}}document.getElementById("manage-blog-btn")?.addEventListener("click",()=>{u("blog")});document.getElementById("manage-project-btn")?.addEventListener("click",()=>{u("project")});document.getElementById("refresh-btn")?.addEventListener("click",async()=>{const t=document.getElementById("refresh-btn");t&&(t.innerHTML=`
        <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Syncing...
      `,t.disabled=!0),await d(),t&&(t.innerHTML=`
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Sync with Contentful
      `,t.disabled=!1)});async function u(t){try{const e=t==="blog"?await l.getAllBlogPosts():await l.getAllProjects();if(e.length===0){alert(`No ${t}s found. Create your first ${t} to get started!`);return}const n=t==="blog"?"blogPost":"simpleProject",r=e.map(o=>{const s=o.fields.title?.["en-US"]||"Untitled",c=o.status==="published"?"✅ Published":"📝 Draft",a=`https://app.contentful.com/spaces/hbrrn0bf99r5/entries/${o.id}`;return`<li class="py-3 border-b border-dark-border last:border-b-0">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-white font-medium">${s}</span>
              <span class="text-xs text-white/60 ml-2">${c}</span>
            </div>
            <div class="flex items-center gap-2">
              <a href="${a}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded text-sm flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Edit in Contentful
              </a>
            </div>
          </div>
        </li>`}).join(""),i=`
        <div id="content-list-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-modal overlay-active">
          <div class="bg-dark-surface rounded-2xl border border-dark-border max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-dark-border">
              <h2 class="text-xl font-display font-bold text-white">${t==="blog"?"Blog Posts":"Projects"} (${e.length})</h2>
              <button onclick="closeContentList()" class="w-8 h-8 rounded-lg hover:bg-dark-border transition-colors flex items-center justify-center">
                <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="p-6 overflow-y-auto max-h-[60vh]">
              ${e.length>0?`<ul class="space-y-0">${r}</ul>`:'<p class="text-white/60 text-center py-8">No content found. Create your first entry in Contentful!</p>'}
            </div>
            <div class="p-4 border-t border-dark-border bg-dark-bg/50">
              <a href="https://app.contentful.com/spaces/hbrrn0bf99r5/entries?contentTypeId=${n}" target="_blank" rel="noopener noreferrer" class="w-full bg-primary hover:bg-primary-light text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Manage All in Contentful
              </a>
            </div>
          </div>
        </div>
      `;document.body.insertAdjacentHTML("beforeend",i),document.body.style.overflow="hidden"}catch(e){console.error("Error showing content list:",e),alert("Error loading content. Please try again.")}}window.closeContentList=function(){const t=document.getElementById("content-list-modal");t&&(t.remove(),document.body.style.overflow="")};window.deleteContent=async function(t){window.open(`https://app.contentful.com/spaces/hbrrn0bf99r5/entries/${t}`,"_blank")};window.editContent=async function(t,e){window.open(`https://app.contentful.com/spaces/hbrrn0bf99r5/entries/${t}`,"_blank")};window.addEventListener("refreshDashboard",d);function y(t){const e=document.createElement("div");e.className="fixed top-24 right-6 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300",e.innerHTML=`
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${t}</span>
      </div>
    `,document.body.appendChild(e),setTimeout(()=>{e.classList.remove("translate-x-full")},100),setTimeout(()=>{e.classList.add("translate-x-full"),setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}window.addEventListener("contentCreated",t=>{const{type:e,title:n}=t.detail;y(`${e} "${n}" created and synced with Contentful!`),d()});
