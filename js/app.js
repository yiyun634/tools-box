// 免费效率工具箱 - 主应用脚本

// 全局状态
const state = {
    currentPage: 'home',
    favorites: [],
    recentlyUsed: [],
    searchQuery: '',
    activeCategory: 'all'
};

// 初始化应用
document.addEventListener('DOMContentLoaded', async () => {
    // 加载本地数据
    loadLocalData();
    
    // 渲染页面
    await renderPage();
    
    // 绑定事件
    bindEvents();
});

// 加载本地存储的数据
function loadLocalData() {
    try {
        const local = localStorage.getItem('analytics');
        if (local) {
            const data = JSON.parse(local);
            state.favorites = data.favorites?.items || [];
            state.recentlyUsed = data.recentlyUsed?.items || [];
        }
    } catch (e) {
        console.error('Failed to load local data:', e);
    }
}

// 渲染页面
async function renderPage() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        await renderHome();
    } else if (path === '/tools.html') {
        await renderTools();
    } else if (path === '/templates.html') {
        await renderTemplates();
    } else if (path === '/guide.html') {
        await renderGuide();
    } else if (path === '/search.html') {
        await renderSearch();
    } else if (path.startsWith('/templates/')) {
        await renderTemplateDetail(path);
    } else if (path.startsWith('/guide/')) {
        await renderGuideDetail(path);
    } else if (path.startsWith('/image-compress') || 
               path.startsWith('/image-merge') ||
               path.startsWith('/image-crop') ||
               path.startsWith('/image-to-pdf') ||
               path.startsWith('/pdf-to-image') ||
               path.startsWith('/bmi-calculator') ||
               path.startsWith('/roi-calculator') ||
               path.startsWith('/compound-interest-calculator')) {
        await renderToolDetail(path);
    }
}

// 渲染首页
async function renderHome() {
    const [tools, templates, guides] = await Promise.all([
        dataLoader.getTools(),
        dataLoader.getTemplates(),
        dataLoader.getGuides()
    ]);
    
    // 获取分类
    const categories = await dataLoader.getCategories();
    
    // 渲染热门
    const hotTemplates = templates.slice(0, 6);
    const hotTools = tools.slice(0, 6);
    const newGuides = guides.slice(0, 4);
    
    // 渲染最近使用
    renderRecentlyUsed();
}

// 渲染最近使用
function renderRecentlyUsed() {
    const container = document.getElementById('recently-used');
    if (!container) return;
    
    if (state.recentlyUsed.length === 0) {
        container.innerHTML = '<p class="text-muted">暂无最近使用记录</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="recent-list">
            ${state.recentlyUsed.slice(0, 10).map(item => {
                const data = item.type === 'template' 
                    ? { name: item.name, icon: item.icon, path: item.path }
                    : item;
                return `
                    <a href="${data.path}" class="recent-item">
                        <div class="recent-icon">${data.icon || '📄'}</div>
                        <div class="recent-name">${data.name}</div>
                    </a>
                `;
            }).join('')}
        </div>
    `;
}

// 渲染工具页
async function renderTools() {
    const tools = await dataLoader.getTools();
    
    const container = document.getElementById('tools-grid');
    if (container) {
        container.innerHTML = tools.map(tool => `
            <a href="${tool.path}" class="card tool-card">
                <div class="tool-icon">${tool.icon}</div>
                <div class="tool-info">
                    <div class="tool-name">${tool.name}</div>
                    <div class="tool-desc">${tool.description}</div>
                </div>
            </a>
        `).join('');
    }
}

// 渲染模板页
async function renderTemplates() {
    const [templates, categories] = await Promise.all([
        dataLoader.getTemplates(),
        dataLoader.getCategories()
    ]);
    
    const container = document.getElementById('templates-grid');
    const categoriesContainer = document.getElementById('categories');
    
    if (categoriesContainer) {
        categoriesContainer.innerHTML = `
            <a href="/templates.html" class="category-tag active" data-category="all">全部</a>
            ${categories.map(cat => `
                <a href="/templates.html?category=${cat.id}" class="category-tag" data-category="${cat.id}">${cat.icon} ${cat.name}</a>
            `).join('')}
        `;
    }
    
    if (container) {
        const urlParams = new URLSearchParams(window.location.search);
        const activeCategory = urlParams.get('category') || 'all';
        
        const filtered = activeCategory === 'all' 
            ? templates 
            : templates.filter(t => t.category === activeCategory);
        
        container.innerHTML = filtered.map(template => `
            <a href="${template.path}" class="card">
                <div class="card-preview" style="background: ${getCategoryColor(template.category)}">
                    ${getCategoryIcon(template.category)}
                </div>
                <div class="card-body">
                    <div class="card-title">${template.name}</div>
                    <div class="card-desc">${template.description}</div>
                    <div class="card-tags">
                        ${template.keywords.slice(0, 3).map(k => `<span class="card-tag">${k}</span>`).join('')}
                    </div>
                </div>
            </a>
        `).join('');
    }
}

// 渲染教程页
async function renderGuide() {
    const [guides, categories] = await Promise.all([
        dataLoader.getGuides(),
        dataLoader.loadJSON('guides.json')
    ]);
    
    const container = document.getElementById('guides-grid');
    const categoriesList = categories?.categories || [];
    
    // 渲染分类
    const categoriesContainer = document.getElementById('guide-categories');
    if (categoriesContainer) {
        categoriesContainer.innerHTML = `
            <a href="/guide.html" class="category-tag active" data-category="all">全部</a>
            ${categoriesList.map(cat => `
                <a href="/guide.html?category=${cat.id}" class="category-tag" data-category="${cat.id}">${cat.icon} ${cat.name}</a>
            `).join('')}
        `;
    }
    
    if (container) {
        const urlParams = new URLSearchParams(window.location.search);
        const activeCategory = urlParams.get('category') || 'all';
        
        const filtered = activeCategory === 'all' 
            ? guides 
            : guides.filter(g => g.category === activeCategory);
        
        container.innerHTML = filtered.map(guide => `
            <a href="${guide.path}" class="card">
                <div class="card-preview" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                    ${guide.icon || '📚'}
                </div>
                <div class="card-body">
                    <div class="card-title">${guide.name}</div>
                    <div class="card-desc">${guide.seo?.description || ''}</div>
                    <div class="card-tags">
                        <span class="card-tag">${guide.contentWords || 0}字</span>
                        <span class="card-tag">${guide.category}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }
}

// 渲染搜索页
async function renderSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    
    if (!query) {
        document.getElementById('search-results').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-title">请输入搜索关键词</div>
            </div>
        `;
        return;
    }
    
    state.searchQuery = query;
    const results = await dataLoader.search(query);
    
    const container = document.getElementById('search-results');
    
    let html = `<p class="search-tip">找到 ${results.tools.length + results.templates.length + results.guides.length} 个结果</p>`;
    
    if (results.tools.length > 0) {
        html += `
            <div class="result-group">
                <div class="result-group-title">🛠️ 工具 (${results.tools.length})</div>
                ${results.tools.map(tool => `
                    <a href="${tool.path}" class="result-item">
                        <div class="result-icon">${getCategoryIcon(tool.category)}</div>
                        <div class="result-info">
                            <div class="result-title">${tool.name}</div>
                            <div class="result-type">工具 - ${tool.category}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    if (results.templates.length > 0) {
        html += `
            <div class="result-group">
                <div class="result-group-title">📄 模板 (${results.templates.length})</div>
                ${results.templates.map(template => `
                    <a href="${template.path}" class="result-item">
                        <div class="result-icon">${getCategoryIcon(template.category)}</div>
                        <div class="result-info">
                            <div class="result-title">${template.name}</div>
                            <div class="result-type">模板 - ${template.category}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    if (results.guides.length > 0) {
        html += `
            <div class="result-group">
                <div class="result-group-title">📚 教程 (${results.guides.length})</div>
                ${results.guides.map(guide => `
                    <a href="${guide.path}" class="result-item">
                        <div class="result-icon">${guide.icon || '📚'}</div>
                        <div class="result-info">
                            <div class="result-title">${guide.name}</div>
                            <div class="result-type">教程 - ${guide.category}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    if (results.tools.length === 0 && results.templates.length === 0 && results.guides.length === 0) {
        html = `
            <div class="empty-state">
                <div class="empty-state-icon">😕</div>
                <div class="empty-state-title">未找到"${query}"相关结果</div>
                <p>尝试其他关键词，或浏览我们的<a href="/tools.html">工具</a>和<a href="/templates.html">模板</a></p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// 渲染模板详情页
async function renderTemplateDetail(path) {
    const templateId = extractTemplateId(path);
    const template = await dataLoader.getTemplate(templateId);
    
    if (!template) {
        document.getElementById('app').innerHTML = `
            <div class="container">
                <div class="empty-state">
                    <div class="empty-state-icon">😕</div>
                    <div class="empty-state-title">模板未找到</div>
                </div>
            </div>
        `;
        return;
    }
    
    // 添加到最近使用
    await dataLoader.addToRecentlyUsed('template', templateId);
    
    // 渲染详情
    const container = document.getElementById('template-detail');
    if (container) {
        container.innerHTML = renderTemplateDetailHTML(template);
        
        // 绑定FAQ交互
        setTimeout(bindFAQEvents, 100);
    }
    
    // 更新页面标题
    document.title = template.seo?.title || template.name;
}

// 渲染模板详情HTML
function renderTemplateDetailHTML(template) {
    return `
        <div class="breadcrumb">
            <a href="/">首页</a> / 
            <a href="/templates">模板中心</a> / 
            <a href="/templates/${template.category}">${getCategoryName(template.category)}</a> / 
            <span>${template.name}</span>
        </div>
        
        <div class="template-hero">
            <h1>${template.name}</h1>
            <p>${template.description}</p>
            <div class="template-actions">
                <a href="${template.downloadPath || '#'}" class="btn btn-primary" download>
                    📥 免费下载
                </a>
                <button class="btn btn-secondary" onclick="toggleFavorite('template', '${template.id}')">
                    ${isFavorited(template.id) ? '❤️ 已收藏' : '🤍 收藏'}
                </button>
            </div>
            <div class="template-meta">
                <span>📁 ${template.format?.toUpperCase() || 'DOCX'}</span>
                <span>👁️ ${template.stats?.views || 0} 浏览</span>
                <span>📥 ${template.stats?.downloads || 0} 下载</span>
            </div>
        </div>
        
        <div class="ad-placeholder">广告位 - 顶部</div>
        
        <div class="template-section">
            <h2>💡 使用场景</h2>
            <ul>
                ${(template.scenarios || []).map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
        
        <div class="template-section">
            <h2>📝 填写示例</h2>
            ${(template.examples || []).map(ex => `
                <div class="example-box">
                    <div class="example-label">${ex.field}</div>
                    <pre>${ex.content}</pre>
                </div>
            `).join('')}
        </div>
        
        <div class="ad-placeholder">广告位 - 中部</div>
        
        <div class="template-section">
            <h2>🔥 使用技巧</h2>
            <ul class="tips-list">
                ${(template.tips || []).map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
        
        <div class="template-section">
            <h2>⚠️ 常见错误</h2>
            ${(template.mistakes || []).map(m => `
                <div class="mistake-item">
                    <div class="mistake-wrong">❌ ${m.wrong}</div>
                    <div class="mistake-right">✅ ${m.right}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="template-section">
            <h2>❓ 常见问题</h2>
            ${(template.faq || []).map((f, i) => `
                <div class="faq-item">
                    <button class="faq-question" onclick="toggleFAQ(this)">
                        ${f.question}
                        <span>▼</span>
                    </button>
                    <div class="faq-answer">${f.answer}</div>
                </div>
            `).join('')}
        </div>
        
        ${template.relatedGuide ? `
            <div class="template-section">
                <h2>📚 相关教程</h2>
                <a href="/guide/${template.relatedGuide}" class="related-item">
                    <span class="related-icon">📖</span>
                    <div>
                        <div>如何正确使用此模板</div>
                        <small class="text-muted">查看教程 →</small>
                    </div>
                </a>
            </div>
        ` : ''}
        
        ${template.relatedTemplates?.length ? `
            <div class="template-section">
                <h2>🔗 相关模板</h2>
                <div class="related-section">
                    ${template.relatedTemplates.map(id => {
                        const related = getTemplateById(id);
                        return related ? `
                            <a href="${related.path}" class="related-item">
                                <span class="related-icon">${getCategoryIcon(related.category)}</span>
                                <span>${related.name}</span>
                            </a>
                        ` : '';
                    }).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="ad-placeholder">广告位 - 底部</div>
    `;
}

// 辅助函数
function getCategoryIcon(category) {
    const icons = {
        resume: '📝',
        budget: '📊',
        ppt: '📑',
        'project-plan': '📋',
        'daily-report': '📅',
        okr: '🎯',
        'meeting-minutes': '📝',
        'sales-followup': '📈',
        'expense-tracking': '💰',
        image: '🖼️',
        pdf: '📄',
        calc: '🔢'
    };
    return icons[category] || '📄';
}

function getCategoryName(category) {
    const names = {
        resume: '简历模板',
        budget: 'Excel预算表',
        ppt: 'PPT模板',
        'project-plan': '项目计划书',
        'daily-report': '工作日报',
        okr: 'OKR模板',
        'meeting-minutes': '会议纪要',
        'sales-followup': '销售跟进表',
        'expense-tracking': '个人记账',
        image: '图片工具',
        pdf: 'PDF工具',
        calc: '计算器'
    };
    return names[category] || category;
}

function getCategoryColor(category) {
    const colors = {
        resume: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        budget: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        ppt: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'project-plan': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'daily-report': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        okr: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'meeting-minutes': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        'sales-followup': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'expense-tracking': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    };
    return colors[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

function extractTemplateId(path) {
    const match = path.match(/\/templates\/[^\/]+\/([^\/]+)/);
    return match ? match[1] : '';
}

function extractGuideId(path) {
    const match = path.match(/\/guide\/([^\/]+)/);
    return match ? match[1] : '';
}

let templatesCache = null;
let guidesCache = null;

function getTemplateById(id) {
    if (!templatesCache) {
        try {
            templatesCache = JSON.parse(localStorage.getItem('templates_cache') || '[]');
        } catch {
            templatesCache = [];
        }
    }
    return templatesCache.find(t => t.id === id);
}

function isFavorited(id) {
    return state.favorites.some(f => f.id === id);
}

function toggleFavorite(type, id) {
    const index = state.favorites.findIndex(f => f.id === id);
    if (index >= 0) {
        state.favorites.splice(index, 1);
    } else {
        state.favorites.push({ type, id, timestamp: Date.now() });
    }
    
    // 保存到本地
    const data = { favorites: { items: state.favorites }, recentlyUsed: { items: state.recentlyUsed } };
    localStorage.setItem('analytics', JSON.stringify(data));
    
    // 更新按钮
    const btn = event.target;
    btn.textContent = index >= 0 ? '🤍 收藏' : '❤️ 已收藏';
}

function toggleFAQ(button) {
    const item = button.parentElement;
    item.classList.toggle('open');
}

// 绑定事件
function bindEvents() {
    // 搜索框
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    // 分类筛选
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tag.dataset.category;
            const url = tag.href;
            window.location.href = url;
        });
    });
    
    // 收藏面板
    const favBtn = document.getElementById('favorites-btn');
    const favPanel = document.getElementById('favorites-panel');
    if (favBtn && favPanel) {
        favBtn.addEventListener('click', () => {
            favPanel.classList.toggle('open');
        });
    }
    
    // 点击空白关闭面板
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#favorites-panel') && !e.target.closest('#favorites-btn')) {
            favPanel?.classList.remove('open');
        }
    });
}

// 页面导航
function navigate(path) {
    window.location.href = path;
}

// 渲染工具详情（未来扩展）
async function renderToolDetail(path) {
    // 工具详情页使用现有工具的HTML
}

// 渲染教程详情
async function renderGuideDetail(path) {
    const guideId = extractGuideId(path);
    const guide = await dataLoader.getGuide(guideId);
    
    if (!guide) {
        document.getElementById('app').innerHTML = `
            <div class="container">
                <div class="empty-state">
                    <div class="empty-state-icon">😕</div>
                    <div class="empty-state-title">教程未找到</div>
                </div>
            </div>
        `;
        return;
    }
    
    // 添加到最近使用
    await dataLoader.addToRecentlyUsed('guide', guideId);
    
    const container = document.getElementById('guide-content');
    if (container) {
        container.innerHTML = renderGuideDetailHTML(guide);
    }
    
    document.title = guide.seo?.title || guide.name;
}

// 渲染教程详情HTML
function renderGuideDetailHTML(guide) {
    const template = guide.relatedTemplates?.[0];
    
    return `
        <div class="breadcrumb">
            <a href="/">首页</a> / 
            <a href="/guide">教程中心</a> / 
            <span>${guide.name}</span>
        </div>
        
        <div class="template-hero" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            <h1>${guide.icon || '📚'} ${guide.name}</h1>
            <p>${guide.seo?.description || ''}</p>
            <div class="template-meta">
                <span>📖 ${guide.contentWords || 0}字</span>
                <span>👁️ ${guide.stats?.views || 0} 阅读</span>
            </div>
        </div>
        
        <div class="guide-content">
            <div class="guide-toc">
                <h2>📑 目录</h2>
                <ol>
                    ${(guide.content?.chapters || []).map((ch, i) => `
                        <li><a href="#chapter-${i}">${ch.title}</a></li>
                    `).join('')}
                </ol>
            </div>
            
            ${(guide.content?.chapters || []).map((ch, i) => `
                <div class="chapter" id="chapter-${i}">
                    <h2>${ch.title}</h2>
                    <div class="chapter-content">
                        ${ch.content || ''}
                    </div>
                </div>
            `).join('')}
            
            ${guide.content?.tips?.length ? `
                <div class="template-section">
                    <h2>💡 实用技巧</h2>
                    <ul class="tips-list">
                        ${guide.content.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${guide.content?.mistakes?.length ? `
                <div class="template-section">
                    <h2>⚠️ 常见错误</h2>
                    ${guide.content.mistakes.map(m => `
                        <div class="mistake-item">
                            <div class="mistake-wrong">❌ ${m}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${guide.relatedTemplates?.length ? `
                <div class="template-section">
                    <h2>📄 免费模板下载</h2>
                    <p style="margin-bottom: 16px;">学习完教程后，下载配套模板开始实践：</p>
                    <div class="related-section">
                        ${guide.relatedTemplates.map(id => {
                            const t = getTemplateById(id);
                            return t ? `
                                <a href="${t.path}" class="related-item">
                                    <span class="related-icon">${getCategoryIcon(t.category)}</span>
                                    <span>${t.name}</span>
                                </a>
                            ` : '';
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="ad-placeholder">广告位 - 底部</div>
    `;
}