const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/root/tools-box/data/templates.json'));
const templates = data.templates;

// 正确的subdir提取逻辑
function getSubdir(templateId, category) {
    // 已知分类的suffix
    const suffixes = {
        'resume': ['resume'],
        'budget': ['budget'],
        'ppt': ['ppt'],
        'project-plan': ['project-plan', 'plan'],
        'daily-report': ['daily-report', 'report', 'template'],
        'okr': ['okr'],
        'meeting-minutes': ['meeting-minutes', 'minutes'],
        'sales-followup': ['sales-followup', 'followup', 'table', 'template'],
        'expense-tracking': ['expense-tracking', 'expense', 'simple', 'table']
    };
    
    // 尝试移除category相关的suffix
    const catsuffixes = suffixes[category] || [category];
    let name = templateId;
    
    // 尝试从后往前匹配suffix
    for (const suffix of catsuffixes) {
        if (name.endsWith('-' + suffix) || name === suffix) {
            const subdir = name.slice(0, name.length - suffix.length - 1);
            if (subdir) return subdir;
        }
    }
    
    // 回退：使用第一个-分割的部分
    return templateId.split('-')[0];
}

// 生成每个模板
templates.forEach(t => {
    const subdir = getSubdir(t.id, t.category);
    const dir = 'templates/' + t.category + '/' + subdir;
    const file = dir + '/index.html';
    
    if (fs.existsSync(file)) {
        console.log('skip:', dir);
        return;
    }
    
    fs.mkdirSync(dir, {recursive: true});
    
    const catNames = {resume:'简历模板',budget:'Excel预算表',ppt:'PPT模板','project-plan':'项目计划书','daily-report':'工作日报',okr:'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'};
    const gradients = {resume:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',budget:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',ppt:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','project-plan':'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','daily-report':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',okr:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)','meeting-minutes':'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','sales-followup':'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)','expense-tracking':'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'};
    const icons = {resume:'📝',budget:'📊',ppt:'📑','project-plan':'📋','daily-report':'📅',okr:'🎯','meeting-minutes':'📝','sales-followup':'📈','expense-tracking':'💰'};
    
    const seoTitle = (t.seo && t.seo.title) || t.name + ' - 免费效率工具箱';
    const seoDesc = (t.seo && t.seo.description) || '免费下载' + t.name;
    const gradient = gradients[t.category] || '';
    const icon = icons[t.category] || '📄';
    const catName = catNames[t.category] || t.category;
    const downloadPath = t.downloadPath || '/assets/' + t.category + '/' + subdir + '.docx';
    const formatType = (t.format || 'DOCX').toUpperCase();
    const stats = t.stats || {views:0, downloads:0};
    const relatedGuide = t.relatedGuide || '';
    
    const faqItems = t.faq || [{question:'如何编辑这个模板？',answer:'下载后用Microsoft Word或WPS打开，直接修改内容即可。'},{question:'可以免费商用吗？',answer:'可以免费商用，请勿二次销售模板。'},{question:'需要注册账号吗？',answer:'不需要，直接下载使用，完全免费。'}];
    const faqHtml = faqItems.map(f=>'<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">'+f.question+'<span>▼</span></button><div class="faq-answer">'+f.answer+'</div></div>').join('');
    const tips = t.tips || ['仔细阅读说明','按照指引填写','完成后检查格式'];
    const tipsHtml = tips.map(tip=>'<li><strong>'+tip+'</strong></li>').join('');
    const scenarios = t.scenarios || ['适用于日常工作和生活场景'];
    const scenariosHtml = scenarios.map(s=>'<li><strong>'+s+'</strong></li>').join('');
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/'+relatedGuide+'" class="related-item">📖 查看教程 →</a></div>' : '';
    
    const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+seoTitle+'</title><meta name="description" content="'+seoDesc+'"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/'+dir+'"><meta property="og:title" content="'+seoTitle+'"><meta property="og:description" content="'+seoDesc+'"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/'+t.category+'">'+catName+'</a> / <span>'+t.name+'</span></div><div class="template-hero" style="background:'+gradient+'"><h1>'+icon+' '+t.name+'</h1><p>'+(t.description||'')+'</p><div class="template-actions"><a href="'+downloadPath+'" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\''+t.id+'\',\''+t.name.replace(/'/g,"\\'")+'\',\''+dir+'\',\''+icon+'\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 '+formatType+'</span><span>👁️ '+stats.views+' 浏览</span><span>📥 '+stats.downloads+' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>'+scenariosHtml+'</ul></div><div class="template-section"><h2>📝 填写示例</h2><div class="example-box"><pre>模板内容示例，实际使用时替换为自己的信息即可。</pre></div></div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">'+tipsHtml+'</ul></div><div class="template-section"><h2>❓ 常见问题</h2>'+faqHtml+'</div>'+guideSection+'<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="'+t.id+'";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>';
    
    fs.writeFileSync(file, html);
    console.log('created:', dir);
});

console.log('\nDone!');
