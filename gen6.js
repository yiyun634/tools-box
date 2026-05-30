const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/root/tools-box/data/templates.json'));
const templates = data.templates;

const MAPPINGS = {
    'classic-resume': 'classic', 'modern-resume': 'modern', 'simple-resume': 'simple',
    'creative-resume': 'creative', 'two-column-resume': 'two-column', 'single-column-resume': 'single-column',
    'developer-resume': 'developer', 'designer-resume': 'designer', 'pm-resume': 'pm',
    'fresh-graduate-resume': 'fresh-graduate', 'intern-resume': 'intern', 'english-resume': 'english',
    'nurse-resume': 'nurse', 'teacher-resume': 'teacher', 'accountant-resume': 'accountant', 'sales-resume': 'sales',
    'monthly-budget': 'monthly', 'annual-budget': 'annual', 'household-budget': 'household',
    'project-budget': 'project', 'department-budget': 'department', 'wedding-budget': 'wedding',
    'travel-budget': 'travel', 'renovation-budget': 'renovation', 'student-budget': 'student', 'investment-budget': 'investment',
    'business-ppt': 'business', 'meeting-ppt': 'meeting', 'plan-ppt': 'plan', 'training-ppt': 'training',
    'marketing-ppt': 'marketing', 'product-ppt': 'product', 'proposal-ppt': 'proposal', 'resume-ppt': 'resume',
    'agile-plan': 'agile', 'waterfall-plan': 'waterfall', 'startup-plan': 'startup', 'product-plan': 'product',
    'marketing-plan': 'marketing', 'rnd-plan': 'rnd', 'event-plan': 'event', 'it-plan': 'it',
    'daily-report-template': 'daily', 'weekly-report-template': 'weekly', 'monthly-report-template': 'monthly',
    'project-weekly-report': 'project-weekly', 'sales-daily-report': 'sales', 'operations-daily-report': 'operations',
    'customer-service-report': 'customer-service', 'admin-daily-report': 'admin',
    'company-okr': 'company', 'department-okr': 'department', 'personal-okr': 'personal', 'team-okr': 'team', 'sales-okr': 'sales',
    'standard-minutes': 'standard', 'executive-minutes': 'executive', 'project-meeting-minutes': 'project-meeting',
    'sales-meeting-minutes': 'sales-meeting', 'training-meeting-minutes': 'training-minutes',
    'crm-sales-followup': 'crm', 'sales-followup-template': 'record', 'potential-customer-table': 'potential-customer', 'contract-tracking-table': 'contract-tracking',
    'expense-tracking-simple': 'simple', 'household-expense': 'household', 'reimbursement-table': 'reimbursement',
};

const FAQ_BY_CATEGORY = {
    'resume': [
        {question: '如何修改简历模板的内容？', answer: '下载后用Microsoft Word或WPS打开，直接编辑文字内容即可。支持中英文填写。'},
        {question: '简历模板适合什么行业使用？', answer: '我们提供IT、金融、市场、销售、行政等多种行业专用简历模板。'},
        {question: '可以自定义简历的颜色和字体吗？', answer: '可以，用Word或WPS打开后，选中内容即可修改字体、颜色、大小。'}
    ],
    'budget': [
        {question: 'Excel预算表支持哪些版本？', answer: '支持Microsoft Excel 2016及以上版本，也兼容WPS表格和Google Sheets。'},
        {question: '预算表可以自定义公式吗？', answer: '可以，所有公式都是公开的，您可以根据需要修改或添加新的计算公式。'},
        {question: '如何添加新的预算项目？', answer: '直接复制一行，然后修改项目名称和预算金额，合计会自动更新。'}
    ],
    'ppt': [
        {question: 'PPT模板支持什么软件打开？', answer: '支持Microsoft PowerPoint、WPS演示、Keynote等主流演示软件。'},
        {question: '可以修改PPT模板的颜色吗？', answer: '可以，使用母版编辑功能或选中元素直接修改颜色即可。'},
        {question: '模板中的图片可以替换吗？', answer: '可以，直接选中图片，然后选择更换图像即可替换为您自己的图片。'}
    ],
    'project-plan': [
        {question: '项目计划书模板包含哪些部分？', answer: '包含项目概述、目标、时间表、里程碑、预算、风险评估、团队分工等完整章节。'},
        {question: '如何调整项目时间表？', answer: '在甘特图部分，直接修改任务的开始和结束日期，其他相关日期会自动计算。'},
        {question: '可以添加新的任务板块吗？', answer: '可以，复制现有任务行，修改任务名称和工期即可。'}
    ],
    'daily-report': [
        {question: '工作日报需要每天填写吗？', answer: '建议每个工作日结束前填写，有助于总结当天工作和规划次日任务。'},
        {question: '日报模板可以添加附件吗？', answer: '可以，日报支持附加文件、图片、链接等参考资料。'},
        {question: '如何查看历史日报？', answer: '按日期归档整理，可快速检索任意时间段的工作记录。'}
    ],
    'okr': [
        {question: 'OKR模板如何填写目标？', answer: '目标（O）应描述有挑战性的、鼓舞人心的方向；关键结果（KR）需是具体可衡量的指标。'},
        {question: 'OKR评分标准是什么？', answer: '通常采用0-1分制，0.6-0.7表示完成预期，0.8-1.0表示超出预期。'},
        {question: '多久更新一次OKR比较合适？', answer: '建议每季度设置一次OKR，每周检查进度，每月回顾评分。'}
    ],
    'meeting-minutes': [
        {question: '会议纪要需要记录哪些内容？', answer: '包括会议主题、时间、参与人、讨论要点、决策事项、待办任务及负责人。'},
        {question: '如何快速生成会议纪要？', answer: '使用录音功能先记录会议内容，会后整理要点，填写到模板对应位置即可。'},
        {question: '会议纪要模板支持多人协作吗？', answer: '支持，可以导出为Word或Google Docs格式，多人同时编辑。'}
    ],
    'sales-followup': [
        {question: '销售跟进表如何记录客户信息？', answer: '记录客户名称、联系方式、需求、跟进时间、跟进结果、下一步计划等信息。'},
        {question: '可以设置提醒功能吗？', answer: '可以，在待跟进日期字段设置提醒，确保不会遗漏任何重要客户。'},
        {question: '销售数据如何统计分析？', answer: '表格支持筛选和汇总功能，可按客户来源、销售阶段、成交金额等维度分析。'}
    ],
    'expense-tracking': [
        {question: '记账表需要每天记录吗？', answer: '建议每天结束时花2分钟记录当天收支，保持账目清晰准确。'},
        {question: '可以添加自定义的消费分类吗？', answer: '可以，根据您的消费习惯添加或修改分类项目。'},
        {question: '如何统计月度支出？', answer: '使用数据透视表或SUMIF函数，可以按分类、按月自动汇总收支情况。'}
    ]
};

const catNames = {resume:'简历模板',budget:'Excel预算表',ppt:'PPT模板','project-plan':'项目计划书','daily-report':'工作日报',okr:'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'};
const gradients = {resume:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',budget:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',ppt:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','project-plan':'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','daily-report':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',okr:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)','meeting-minutes':'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','sales-followup':'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)','expense-tracking':'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'};
const icons = {resume:'📝',budget:'📊',ppt:'📑','project-plan':'📋','daily-report':'📅',okr:'🎯','meeting-minutes':'📝','sales-followup':'📈','expense-tracking':'💰'};

let updated = 0;

templates.forEach(t => {
    const subdir = MAPPINGS[t.id];
    if (!subdir) return;
    
    const dir = '/root/tools-box/templates/' + t.category + '/' + subdir;
    const file = dir + '/index.html';
    if (!fs.existsSync(file)) return;
    
    const seoTitle = (t.seo && t.seo.title) || t.name + ' - 免费效率工具箱';
    const seoDesc = (t.seo && t.seo.description) || '免费下载' + t.name;
    const gradient = gradients[t.category] || '';
    const icon = icons[t.category] || '📄';
    const catName = catNames[t.category] || t.category;
    const downloadPath = t.downloadPath || '/assets/' + t.category + '/' + subdir + '.docx';
    const formatType = (t.format || 'DOCX').toUpperCase();
    const stats = t.stats || {views:0, downloads:0};
    const relatedGuide = t.relatedGuide || '';
    
    const faqItems = FAQ_BY_CATEGORY[t.category] || FAQ_BY_CATEGORY['resume'];
    const faqHtml = faqItems.map(f=>'<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">'+f.question+'<span>▼</span></button><div class="faq-answer">'+f.answer+'</div></div>').join('');
    const tips = t.tips || ['仔细阅读说明','按照指引填写','完成后检查格式'];
    const tipsHtml = tips.map(tip=>'<li><strong>'+tip+'</strong></li>').join('');
    const scenarios = t.scenarios || ['适用于日常工作和生活场景'];
    const scenariosHtml = scenarios.map(s=>'<li><strong>'+s+'</strong></li>').join('');
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/'+relatedGuide+'" class="related-item">📖 查看教程 →</a></div>' : '';
    
    const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+seoTitle+'</title><meta name="description" content="'+seoDesc+'"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/'+dir+'"><meta property="og:title" content="'+seoTitle+'"><meta property="og:description" content="'+seoDesc+'"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/'+t.category+'">'+catName+'</a> / <span>'+t.name+'</span></div><div class="template-hero" style="background:'+gradient+'"><h1>'+icon+' '+t.name+'</h1><p>'+(t.description||'')+'</p><div class="template-actions"><a href="'+downloadPath+'" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\''+t.id+'\',\''+t.name.replace(/'/g,"\\'")+'\',\''+dir+'\',\''+icon+'\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 '+formatType+'</span><span>👁️ '+stats.views+' 浏览</span><span>📥 '+stats.downloads+' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>'+scenariosHtml+'</ul></div><div class="template-section"><h2>📝 填写示例</h2><div class="example-box"><pre>模板内容示例，实际使用时替换为自己的信息即可。</pre></div></div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">'+tipsHtml+'</ul></div><div class="template-section"><h2>❓ 常见问题</h2>'+faqHtml+'</div>'+guideSection+'<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="'+t.id+'";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>';
    
    fs.writeFileSync(file, html);
    updated++;
});

console.log('Updated:', updated, 'template pages with unique FAQ per category');
