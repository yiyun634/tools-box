const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/tools-box';

// 加载数据
const templatesData = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'data/templates.json')));
const templates = templatesData.templates;

const categoryNames = {
    'resume': '简历模板', 'budget': 'Excel预算表', 'ppt': 'PPT模板',
    'project-plan': '项目计划书', 'daily-report': '工作日报', 'okr': 'OKR模板',
    'meeting-minutes': '会议纪要', 'sales-followup': '销售跟进表', 'expense-tracking': '个人记账'
};

const gradients = {
    'resume': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'budget': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'ppt': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'project-plan': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'daily-report': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'okr': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'meeting-minutes': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    'sales-followup': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'expense-tracking': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
};

const icons = {'resume': '📝', 'budget': '📊', 'ppt': '📑', 'project-plan': '📋', 'daily-report': '📅', 'okr': '🎯', 'meeting-minutes': '📝', 'sales-followup': '📈', 'expense-tracking': '💰'};

let generatedCount = 0;
let skippedCount = 0;

console.log('=== 生成模板详情页 ===');

templates.forEach(template => {
    const templateId = template.id;
    const category = template.category;
    const name = template.name;
    
    // 提取子目录名
    const parts = templateId.lastIndexOf('-') !== -1 ? templateId.split('-') : [templateId];
    const subdirName = parts[parts.length - 1];
    
    const pagePath = path.join(BASE_DIR, 'templates', category, subdirName, 'index.html');
    
    // 如果已存在，跳过
    if (fs.existsSync(pagePath)) {
        console.log(`  ⏭️ 跳过已存在: templates/${category}/${subdirName}/index.html`);
        skippedCount++;
        return;
    }
    
    // 确保目录存在
    fs.mkdirSync(path.dirname(pagePath), { recursive: true });
    
    const keywordsStr = (template.keywords || []).slice(0, 5).join(', ');
    const downloadPath = template.downloadPath || `/assets/${category}/${subdirName}.docx`;
    
    const scenarios = (template.scenarios || ['适用于日常工作和生活场景']).slice(0, 4);
    const scenariosHtml = scenarios.map(s => `<li><strong>${s}</strong></li>`).join('\n                    ');
    
    const tips = (template.tips || ['仔细阅读说明', '按照指引填写']).slice(0, 5);
    const tipsHtml = tips.map(t => `<li><strong>${t}</strong></li>`).join('\n                    ');
    
    const mistakes = template.mistakes || [];
    let mistakesHtml = '';
    mistakes.slice(0, 3).forEach(m => {
        if (typeof m === 'object') {
            mistakesHtml += `
                <div class="mistake-item">
                    <div class="mistake-wrong">❌ ${m.wrong || ''}</div>
                    <div class="mistake-right">✅ ${m.right || ''}</div>
                </div>
            `;
        }
    });
    if (!mistakesHtml) {
        mistakesHtml = `
            <div class="mistake-item">
                <div class="mistake-wrong">❌ 未按要求填写</div>
                <div class="mistake-right">✅ 按照模板说明规范填写</div>
            </div>
        `;
    }
    
    const faqItems = template.faq || [
        { question: '如何编辑这个模板？', answer: '下载后用Microsoft Word或WPS打开，直接修改内容即可。' },
        { question: '可以免费商用吗？', answer: '可以免费商用，请勿二次销售模板。' },
        { question: '需要注册账号吗？', answer: '不需要，直接下载使用，完全免费。' }
    ];
    const faqHtml = faqItems.slice(0, 5).map(f => `
                <div class="faq-item">
                    <button class="faq-question" onclick="toggleFAQ(this)">${f.question}<span>▼</span></button>
                    <div class="faq-answer">${f.answer}</div>
                </div>
    `).join('');
    
    const relatedGuide = template.relatedGuide;
    const relatedGuideSection = relatedGuide ? `
            <div class="template-section">
                <h2>📚 相关教程</h2>
                <a href="/guide/${relatedGuide}" class="related-item">
                    <span class="related-icon">📖</span>
                    <div>
                        <div><strong>如何正确使用此模板</strong></div>
                        <small class="text-muted">查看教程 →</small>
                    </div>
                </a>
            </div>
    ` : '';
    
    const relatedTemplatesIds = template.relatedTemplates || [];
    let relatedTemplatesHtml = '';
    relatedTemplatesIds.slice(0, 4).forEach(rtId => {
        const rtSubdir = rtId.split('-').pop();
        const rtName = rtId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        relatedTemplatesHtml += `
                    <a href="/templates/${category}/${rtSubdir}" class="related-item">
                        <span class="related-icon">📄</span>
                        <span>${rtName}</span>
                    </a>
        `;
    });
    if (!relatedTemplatesHtml) {
        relatedTemplatesHtml = '<p class="text-muted">暂无相关模板</p>';
    }
    
    const categoryName = categoryNames[category] || category;
    const gradient = gradients[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    const icon = icons[category] || '📄';
    const formatType = (template.format || 'DOCX').toUpperCase();
    const stats = template.stats || { views: 0, downloads: 0 };
    const seoTitle = (template.seo && template.seo.title) || `${name} - 免费效率工具箱`;
    const seoDesc = (template.seo && template.seo.description) || `免费下载${name}，${template.description || ''}`;
    
    const pageHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seoTitle}</title>
    <meta name="description" content="${seoDesc}">
    <meta name="keywords" content="${keywordsStr}">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="canonical" href="https://tools-box-topaz.vercel.app/templates/${category}/${subdirName}">
    <meta property="og:title" content="${seoTitle}">
    <meta property="og:description" content="${seoDesc}">
    <meta property="og:type" content="article">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "DigitalDocument",
        "name": "${name}",
        "description": "${seoDesc}",
        "url": "https://tools-box-topaz.vercel.app/templates/${category}/${subdirName}",
        "downloadUrl": "https://tools-box-topaz.vercel.app${downloadPath}",
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}
    }
    </script>
</head>
<body>
    <header class="header">
        <div class="container header-inner">
            <a href="/" class="logo">🧰 <span>免费效率工具箱</span></a>
            <div class="search-box">
                <input type="text" id="search-input" placeholder="搜索工具、模板、教程...">
                <button onclick="search()">🔍</button>
            </div>
            <nav class="nav">
                <a href="/tools.html">🛠️ 工具</a>
                <a href="/templates.html">📄 模板</a>
                <a href="/guide.html">📚 教程</a>
            </nav>
        </div>
    </header>
    
    <main class="main">
        <div class="container template-detail">
            <div class="breadcrumb">
                <a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/${category}">${categoryName}</a> / <span>${name}</span>
            </div>
            
            <div class="template-hero" style="background: ${gradient}">
                <h1>${icon} ${name}</h1>
                <p>${template.description || ''}</p>
                <div class="template-actions">
                    <a href="${downloadPath}" class="btn btn-primary" download>📥 免费下载</a>
                    <button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite('template', '${templateId}')">🤍 收藏</button>
                    <button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button>
                </div>
                <div class="template-meta">
                    <span>📁 ${formatType}格式</span>
                    <span>👁️ ${stats.views} 浏览</span>
                    <span>📥 ${stats.downloads} 下载</span>
                </div>
            </div>
            
            <div class="ad-placeholder">广告位 - 顶部</div>
            
            <div class="template-section">
                <h2>💡 使用场景</h2>
                <ul>
                    ${scenariosHtml}
                </ul>
            </div>
            
            <div class="template-section">
                <h2>📝 填写示例</h2>
                <div class="example-box">
                    <div class="example-label">填写示例</div>
                    <pre>模板内容示例，实际使用时替换为自己的信息即可。不同模板有不同的填写规范，请参考模板内的说明。</pre>
                </div>
            </div>
            
            <div class="ad-placeholder">广告位 - 中部</div>
            
            <div class="template-section">
                <h2>🔥 使用技巧</h2>
                <ul class="tips-list">
                    ${tipsHtml}
                </ul>
            </div>
            
            <div class="template-section">
                <h2>⚠️ 常见错误</h2>
                ${mistakesHtml}
            </div>
            
            <div class="template-section">
                <h2>❓ 常见问题</h2>
                ${faqHtml}
            </div>
            
            ${relatedGuideSection}
            
            <div class="template-section">
                <h2>🔗 相关模板</h2>
                <div class="related-section">
                    ${relatedTemplatesHtml}
                </div>
            </div>
            
            <div class="ad-placeholder">广告位 - 底部</div>
        </div>
    </main>
    
    <footer class="footer">
        <div class="container footer-bottom">
            <p>© 2026 免费效率工具箱 - 所有模板完全免费</p>
        </div>
    </footer>
    
    <script>
        function search() {
            const query = document.getElementById('search-input').value.trim();
            if (query) window.location.href = '/search.html?q=' + encodeURIComponent(query);
        }
        document.getElementById('search-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') search(); });
        
        function toggleFAQ(btn) { btn.parentElement.classList.toggle('open'); }
        
        function toggleFavorite(type, id) {
            const btn = document.getElementById('favorite-btn');
            const local = localStorage.getItem('analytics') || '{"favorites":{"items":[]},"recentlyUsed":{"items":[]}}';
            const data = JSON.parse(local);
            const index = data.favorites.items.findIndex(i => i.id === id);
            if (index >= 0) {
                data.favorites.items.splice(index, 1);
                btn.textContent = '🤍 收藏';
            } else {
                data.favorites.items.push({ type, id, name: '${name}', path: '/templates/${category}/${subdirName}', icon: '${icon}', timestamp: Date.now() });
                btn.textContent = '❤️ 已收藏';
            }
            localStorage.setItem('analytics', JSON.stringify(data));
        }
        
        function copyLink() { navigator.clipboard.writeText(window.location.href).then(() => alert('链接已复制！')); }
        
        const local = localStorage.getItem('analytics');
        if (local) {
            const data = JSON.parse(local);
            if (data.favorites?.items?.find(i => i.id === '${templateId}')) {
                document.getElementById('favorite-btn').textContent = '❤️ 已收藏';
            }
        }
    </script>
</body>
</html>`;
    
    fs.writeFileSync(pagePath, pageHtml);
    generatedCount++;
    console.log(`  ✅ 生成: templates/${category}/${subdirName}/index.html`);
});

console.log(`\n生成了 ${generatedCount} 个模板详情页，跳过 ${skippedCount} 个已存在页面`);