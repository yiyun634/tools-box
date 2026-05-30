#!/usr/bin/env python3
"""批量生成缺失的模板详情页"""

import json
import os
from pathlib import Path

BASE_DIR = Path('/root/tools-box')

# 加载数据
with open(BASE_DIR / 'data/templates.json') as f:
    templates_data = json.load(f)
    templates = templates_data['templates']

# 分类名称映射
category_names = {
    'resume': '简历模板', 'budget': 'Excel预算表', 'ppt': 'PPT模板',
    'project-plan': '项目计划书', 'daily-report': '工作日报', 'okr': 'OKR模板',
    'meeting-minutes': '会议纪要', 'sales-followup': '销售跟进表', 'expense-tracking': '个人记账'
}

# 渐变色映射
gradients = {
    'resume': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'budget': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'ppt': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'project-plan': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'daily-report': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'okr': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'meeting-minutes': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    'sales-followup': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'expense-tracking': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
}

# 图标映射
icons = {'resume': '📝', 'budget': '📊', 'ppt': '📑', 'project-plan': '📋', 'daily-report': '📅', 'okr': '🎯', 'meeting-minutes': '📝', 'sales-followup': '📈', 'expense-tracking': '💰'}

print("=== 生成模板详情页 ===")

generated_count = 0
skipped_count = 0

for template in templates:
    template_id = template['id']
    category = template['category']
    name = template['name']
    
    # 提取子目录名（从id最后一段）
    parts = template_id.rsplit('-', 1)
    subdir_name = parts[-1] if len(parts) > 1 else template_id
    
    # 构建页面路径
    page_path = BASE_DIR / 'templates' / category / subdir_name / 'index.html'
    
    # 如果已存在，跳过
    if page_path.exists():
        print(f"  ⏭️ 跳过已存在: {page_path.relative_to(BASE_DIR)}")
        skipped_count += 1
        continue
    
    # 确保目录存在
    page_path.parent.mkdir(parents=True, exist_ok=True)
    
    # 关键词字符串
    keywords_str = ', '.join(template.get('keywords', [])[:5])
    
    # 下载路径
    download_path = template.get('downloadPath', f"/assets/{category}/{subdir_name}.docx")
    
    # 场景列表
    scenarios = template.get('scenarios', ['适用于日常工作和生活场景'])
    scenarios_html = '\n'.join([f'<li><strong>{s}</strong></li>' for s in scenarios[:4]])
    
    # 示例
    examples_html = '''
                <div class="example-box">
                    <div class="example-label">填写示例</div>
                    <pre>模板内容示例，实际使用时替换为自己的信息即可。不同模板有不同的填写规范，请参考模板内的说明。</pre>
                </div>
    '''
    
    # 技巧
    tips = template.get('tips', ['仔细阅读说明', '按照指引填写', '完成后检查格式'])
    tips_html = '\n'.join([f'<li><strong>{t}</strong></li>' for t in tips[:5]])
    
    # 错误示例
    mistakes_list = template.get('mistakes', [])
    mistakes_html = ''
    for m in mistakes_list[:3]:
        if isinstance(m, dict):
            mistakes_html += f'''
                <div class="mistake-item">
                    <div class="mistake-wrong">❌ {m.get('wrong', '错误示例')}</div>
                    <div class="mistake-right">✅ {m.get('right', '正确写法')}</div>
                </div>
            '''
    
    if not mistakes_html:
        mistakes_html = '''
                <div class="mistake-item">
                    <div class="mistake-wrong">❌ 未按要求填写</div>
                    <div class="mistake-right">✅ 按照模板说明规范填写</div>
                </div>
        '''
    
    # FAQ
    faq_items = template.get('faq', [
        {'question': '如何编辑这个模板？', 'answer': '下载后用Microsoft Word或WPS打开，直接修改内容即可。'},
        {'question': '可以免费商用吗？', 'answer': '可以免费商用，请勿二次销售模板。'},
        {'question': '需要注册账号吗？', 'answer': '不需要，直接下载使用，完全免费。'},
        {'question': '下载后打不开怎么办？', 'answer': '确保安装了Microsoft Word 2010及以上版本，或使用WPS打开。'}
    ])
    faq_html = '\n'.join([f'''
                <div class="faq-item">
                    <button class="faq-question" onclick="toggleFAQ(this)">{f['question']}<span>▼</span></button>
                    <div class="faq-answer">{f['answer']}</div>
                </div>
    ''' for f in faq_items[:5]])
    
    # 相关教程
    related_guide = template.get('relatedGuide')
    if related_guide:
        related_guide_section = f'''
            <div class="template-section">
                <h2>📚 相关教程</h2>
                <a href="/guide/{related_guide}" class="related-item">
                    <span class="related-icon">📖</span>
                    <div>
                        <div><strong>如何正确使用此模板</strong></div>
                        <small class="text-muted">查看教程 →</small>
                    </div>
                </a>
            </div>
        '''
    else:
        related_guide_section = ''
    
    # 相关模板
    related_templates_ids = template.get('relatedTemplates', [])
    related_templates_html = ''
    for rt_id in related_templates_ids[:4]:
        rt_subdir = rt_id.rsplit('-', 1)[-1]
        rt_name = rt_id.replace('-', ' ').title().replace(' ', '')
        related_templates_html += f'''
                    <a href="/templates/{category}/{rt_subdir}" class="related-item">
                        <span class="related-icon">📄</span>
                        <span>{rt_name}</span>
                    </a>
        '''
    if not related_templates_html:
        related_templates_html = '<p class="text-muted">暂无相关模板</p>'
    
    category_name = category_names.get(category, category)
    gradient = gradients.get(category, 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
    icon = icons.get(category, '📄')
    format_type = template.get('format', 'DOCX').upper()
    stats = template.get('stats', {'views': 0, 'downloads': 0})
    seo_title = template.get('seo', {}).get('title', f'{name} - 免费效率工具箱')
    seo_desc = template.get('seo', {}).get('description', f'免费下载{name}，{template.get("description", "")}')
    
    # 页面HTML
    page_html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{seo_title}</title>
    <meta name="description" content="{seo_desc}">
    <meta name="keywords" content="{keywords_str}">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="canonical" href="https://tools-box-topaz.vercel.app/templates/{category}/{subdir_name}">
    <meta property="og:title" content="{seo_title}">
    <meta property="og:description" content="{seo_desc}">
    <meta property="og:type" content="article">
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "DigitalDocument",
        "name": "{name}",
        "description": "{seo_desc}",
        "url": "https://tools-box-topaz.vercel.app/templates/{category}/{subdir_name}",
        "downloadUrl": "https://tools-box-topaz.vercel.app{download_path}",
        "offers": {{"@type": "Offer", "price": "0", "priceCurrency": "USD"}}
    }}
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
                <a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/{category}">{category_name}</a> / <span>{name}</span>
            </div>
            
            <div class="template-hero" style="background: {gradient}">
                <h1>{icon} {name}</h1>
                <p>{template.get('description', '')}</p>
                <div class="template-actions">
                    <a href="{download_path}" class="btn btn-primary" download>📥 免费下载</a>
                    <button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite('template', '{template_id}')">🤍 收藏</button>
                    <button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button>
                </div>
                <div class="template-meta">
                    <span>📁 {format_type}格式</span>
                    <span>👁️ {stats.get('views', 0)} 浏览</span>
                    <span>📥 {stats.get('downloads', 0)} 下载</span>
                </div>
            </div>
            
            <div class="ad-placeholder">广告位 - 顶部</div>
            
            <div class="template-section">
                <h2>💡 使用场景</h2>
                <ul>
                    {scenarios_html}
                </ul>
            </div>
            
            <div class="template-section">
                <h2>📝 填写示例</h2>
                {examples_html}
            </div>
            
            <div class="ad-placeholder">广告位 - 中部</div>
            
            <div class="template-section">
                <h2>🔥 使用技巧</h2>
                <ul class="tips-list">
                    {tips_html}
                </ul>
            </div>
            
            <div class="template-section">
                <h2>⚠️ 常见错误</h2>
                {mistakes_html}
            </div>
            
            <div class="template-section">
                <h2>❓ 常见问题</h2>
                {faq_html}
            </div>
            
            {related_guide_section}
            
            <div class="template-section">
                <h2>🔗 相关模板</h2>
                <div class="related-section">
                    {related_templates_html}
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
        function search() {{
            const query = document.getElementById('search-input').value.trim();
            if (query) window.location.href = '/search.html?q=' + encodeURIComponent(query);
        }}
        document.getElementById('search-input').addEventListener('keypress', (e) => {{ if (e.key === 'Enter') search(); }});
        
        function toggleFAQ(btn) {{ btn.parentElement.classList.toggle('open'); }}
        
        function toggleFavorite(type, id) {{
            const btn = document.getElementById('favorite-btn');
            const local = localStorage.getItem('analytics') || '{"favorites":{"items":[]},"recentlyUsed":{"items":[]}}';
            const data = JSON.parse(local);
            const index = data.favorites.items.findIndex(i => i.id === id);
            if (index >= 0) {{
                data.favorites.items.splice(index, 1);
                btn.textContent = '🤍 收藏';
            }} else {{
                data.favorites.items.push({{ type, id, name: '{name}', path: '/templates/{category}/{subdir_name}', icon: '{icon}', timestamp: Date.now() }});
                btn.textContent = '❤️ 已收藏';
            }}
            localStorage.setItem('analytics', JSON.stringify(data));
        }}
        
        function copyLink() {{ navigator.clipboard.writeText(window.location.href).then(() => alert('链接已复制！')); }}
        
        const local = localStorage.getItem('analytics');
        if (local) {{
            const data = JSON.parse(local);
            if (data.favorites?.items?.find(i => i.id === '{template_id}')) {{
                document.getElementById('favorite-btn').textContent = '❤️ 已收藏';
            }}
        }}
    </script>
</body>
</html>'''
    
    # 写入文件
    page_path.write_text(page_html)
    generated_count += 1
    print(f"  ✅ 生成: templates/{category}/{subdir_name}/index.html")

print(f"\n生成了 {generated_count} 个模板详情页，跳过 {skipped_count} 个已存在页面")