const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/root/tools-box/data/templates.json'));
const templates = data.templates;

const categoryNames = {
    resume: '简历模板', budget: 'Excel预算表', ppt: 'PPT模板',
    'project-plan': '项目计划书', 'daily-report': '工作日报', okr: 'OKR模板',
    'meeting-minutes': '会议纪要', 'sales-followup': '销售跟进表', 'expense-tracking': '个人记账'
};
const gradients = {
    resume: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    budget: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    ppt: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'project-plan': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'daily-report': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    okr: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'meeting-minutes': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'sales-followup': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'expense-tracking': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
};
const icons = {resume: '📝', budget: '📊', ppt: '📑', 'project-plan': '📋', 'daily-report': '📅', okr: '🎯', 'meeting-minutes': '📝', 'sales-followup': '📈', 'expense-tracking': '💰'};

let created = 0, skipped = 0;

templates.forEach(t => {
    const parts = t.id.split('-');
    const subdir = parts[parts.length - 1];
    const cat = t.category;
    const dir = 'templates/' + cat + '/' + subdir;
    const file = dir + '/index.html';
    
    if (fs.existsSync(file)) {
        skipped++;
        return;
    }
    
    fs.mkdirSync(dir, {recursive: true});
    
    const seoTitle = (t.seo && t.seo.title) || t.name + ' - 免费效率工具箱';
    const seoDesc = (t.seo && t.seo.description) || '免费下载' + t.name + '，' + (t.description || '');
    const gradient = gradients[cat] || '';
    const icon = icons[cat] || '📄';
    const formatType = (t.format || 'DOCX').toUpperCase();
    const stats = t.stats || {views: 0, downloads: 0};
    const catName = categoryNames[cat] || cat;
    const downloadPath = t.downloadPath || '/assets/' + cat + '/' + subdir + '.docx';
    const relatedGuide = t.relatedGuide || '';
    
    const faqItems = t.faq || [
        {question: '如何编辑这个模板？', answer: '下载后用Microsoft Word或WPS打开，直接修改内容即可。'},
        {question: '可以免费商用吗？', answer: '可以免费商用，请勿二次销售模板。'},
        {question: '需要注册账号吗？', answer: '不需要，直接下载使用，完全免费。'}
    ];
    const faqHtml = faqItems.map(f => '<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">' + f.question + '<span>▼</span></button><div class="faq-answer">' + f.answer + '</div></div>').join('');
    
    const tips = t.tips || ['仔细阅读说明', '按照指引填写', '完成后检查格式'];
    const tipsHtml = tips.map(tip => '<li><strong>' + tip + '</strong></li>').join('');
    
    const scenarios = t.scenarios || ['适用于日常工作和生活场景'];
    const scenariosHtml = scenarios.map(s => '<li><strong>' + s + '</strong></li>').join('');
    
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/' + relatedGuide + '" class="related-item">📖 查看教程 →</a></div>' : '';
    
    const html = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>' + seoTitle + '</title>\n    <meta name="description" content="' + seoDesc + '">\n    <link rel="stylesheet" href="/css/main.css">\n    <link rel="canonical" href="https://tools-box-topaz.vercel.app/' + dir + '">\n    <meta property="og:title" content="' + seoTitle + '">\n    <meta property="og:description" content="' + seoDesc + '">\n</head>\n<body>\n    <header class="header">\n        <div class="container header-inner">\n            <a href="/" class="logo">🧰 <span>免费效率工具箱</span></a>\n            <div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div>\n            <nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav>\n        </div>\n    </header>\n    <main class="main">\n        <div class="container template-detail">\n            <div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/' + cat + '">' + catName + '</a> / <span>' + t.name + '</span></div>\n            <div class="template-hero" style="background:' + gradient + '">\n                <h1>' + icon + ' ' + t.name + '</h1>\n                <p>' + (t.description || '') + '</p>\n                <div class="template-actions">\n                    <a href="' + downloadPath + '" class="btn btn-primary" download>📥 免费下载</a>\n                    <button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\'' + t.id + '\',\'' + t.name + '\',\'' + dir + '\',\'' + icon + '\')">🤍 收藏</button>\n                    <button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button>\n                </div>\n                <div class="template-meta"><span>📁 ' + formatType + '</span><span>👁️ ' + stats.views + ' 浏览</span><span>📥 ' + stats.downloads + ' 下载</span></div>\n            </div>\n            <div class="ad-placeholder">广告位 - 顶部</div>\n            <div class="template-section"><h2>💡 使用场景</h2><ul>' + scenariosHtml + '</ul></div>\n            <div class="template-section"><h2>📝 填写示例</h2><div class="example-box"><pre>模板内容示例，实际使用时替换为自己的信息即可。</pre></div></div>\n            <div class="ad-placeholder">广告位 - 中部</div>\n            <div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">' + tipsHtml + '</ul></div>\n            <div class="template-section"><h2>❓ 常见问题</h2>' + faqHtml + '</div>\n            ' + guideSection + '\n            <div class="ad-placeholder">广告位 - 底部</div>\n        </div>\n    </main>\n    <footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer>\n    <script>\nfunction search(){const q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}\ndocument.getElementById("search-input").addEventListener("keypress",e=>{if(e.key==="Enter")search();});\nfunction toggleFAQ(b){b.parentElement.classList.toggle("open");}\nfunction toggleFavorite(id,name,path,icon){const btn=document.getElementById("favorite-btn");const d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");const i=d.favorites.items.findIndex(x=>x.id===id);if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id,name,path,icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}\nfunction copyLink(){navigator.clipboard.writeText(location.href).then(()=>alert("链接已复制！"));}\nconst local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites?.items?.find(x=>x.id==="' + t.id + '")){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}\n    </script>\n</body>\n</html>';
    
    fs.writeFileSync(file, html);
    created++;
    console.log('created:', dir);
});

console.log('\nResult: created ' + created + ', skipped ' + skipped);