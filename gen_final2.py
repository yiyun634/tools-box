#!/usr/bin/env python3
import json
import os

with open('/root/tools-box/data/templates.json', 'r') as f:
    data = json.load(f)
templates = data['templates']

MAPPINGS = {
    'classic-resume': 'classic', 'modern-resume': 'modern', 'simple-resume': 'simple',
    'developer-resume': 'developer', 'designer-resume': 'designer', 'pm-resume': 'pm',
    'teacher-resume': 'teacher', 'nurse-resume': 'nurse', 'accountant-resume': 'accountant', 'sales-resume': 'sales',
    'fresh-graduate-resume': 'fresh-graduate', 'intern-resume': 'intern', 'english-resume': 'english',
    'two-column-resume': 'two-column', 'single-column-resume': 'single-column', 'creative-resume': 'creative',
    'monthly-budget': 'monthly', 'annual-budget': 'annual', 'household-budget': 'household',
    'project-budget': 'project', 'department-budget': 'department', 'wedding-budget': 'wedding',
    'travel-budget': 'travel', 'renovation-budget': 'renovation', 'student-budget': 'student', 'investment-budget': 'investment',
    'business-ppt': 'business', 'meeting-ppt': 'meeting', 'plan-ppt': 'plan', 'training-ppt': 'training',
    'marketing-ppt': 'marketing', 'product-ppt': 'product', 'proposal-ppt': 'proposal', 'resume-ppt': 'resume',
    'agile-plan': 'agile', 'waterfall-plan': 'waterfall', 'startup-plan': 'startup',
    'marketing-plan': 'marketing', 'rnd-plan': 'rnd', 'event-plan': 'event', 'it-plan': 'it',
    'daily-report-template': 'daily', 'weekly-report-template': 'weekly', 'monthly-report-template': 'monthly',
    'project-weekly-report': 'project-weekly', 'sales-daily-report': 'sales', 'operations-daily-report': 'operations',
    'customer-service-report': 'customer-service', 'admin-daily-report': 'admin',
    'company-okr': 'company', 'department-okr': 'department', 'personal-okr': 'personal', 'team-okr': 'team', 'sales-okr': 'sales',
    'standard-minutes': 'standard', 'executive-minutes': 'executive', 'project-meeting-minutes': 'project-meeting',
    'sales-meeting-minutes': 'sales-meeting', 'training-meeting-minutes': 'training-minutes',
    'crm-sales-followup': 'crm', 'sales-followup-template': 'record', 'potential-customer-table': 'potential-customer', 'contract-tracking-table': 'contract-tracking',
    'expense-tracking-simple': 'simple', 'household-expense': 'household', 'reimbursement-table': 'reimbursement',
}

catNames = {'resume':'简历模板','budget':'Excel预算表','ppt':'PPT模板','project-plan':'项目计划书','daily-report':'工作日报','okr':'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'}
gradients = {'resume':'linear-gradient(135deg, #667eea 0%, #764ba2 100%)','budget':'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)','ppt':'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','project-plan':'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','daily-report':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)','okr':'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)','meeting-minutes':'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','sales-followup':'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)','expense-tracking':'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'}
icons = {'resume':'📝','budget':'📊','ppt':'📑','project-plan':'📋','daily-report':'📅','okr':'🎯','meeting-minutes':'📝','sales-followup':'📈','expense-tracking':'💰'}

count = 0
for t in templates:
    subdir = MAPPINGS.get(t['id'])
    if not subdir:
        continue
    
    file_path = '/root/tools-box/templates/' + t['category'] + '/' + subdir + '/index.html'
    if not os.path.exists(file_path):
        continue
    
    cat_name = catNames.get(t['category'], t['category'])
    gradient = gradients.get(t['category'], gradients['resume'])
    icon = icons.get(t['category'], '📄')
    
    seo_title = (t.get('seo') or {}).get('title') or t['name'] + ' - 免费效率工具箱'
    seo_desc = (t.get('seo') or {}).get('description') or '免费下载' + t['name']
    download_path = t.get('downloadPath', '/assets/' + t['category'] + '/' + subdir + '.docx')
    format_type = (t.get('format') or 'DOCX').upper()
    stats = t.get('stats', {'views': 0, 'downloads': 0})
    related_guide = t.get('relatedGuide', '')
    
    taglines = {
        'resume': '专业简历模板，适合求职申请使用。正规稳重，永不出错。',
        'budget': '精细化预算管理，掌控每一分钱。规划清晰，执行有据。',
        'ppt': '专业演示模板，让演讲更出色。逻辑清晰，视觉出众。',
        'project-plan': '系统化项目管理，让执行更高效。里程碑明确，风险可控。',
        'daily-report': '记录工作轨迹，让付出看得见。任务追踪，进度清晰。',
        'okr': '目标导向管理，让成长有方向。评分透明，持续改进。',
        'meeting-minutes': '规范会议记录，让决策有依据。责任明确，跟踪到位。',
        'sales-followup': '客户关系管理，让成交更简单。漏斗清晰，转化有道。',
        'expense-tracking': '清晰收支记录，让理财更轻松。账目分明，决策有据。'
    }
    tagline = taglines.get(t['category'], '专业模板，适合相关场景使用')
    
    scenarios_map = {
        'resume': ['求职申请', '职场晋升', '简历优化', '面试准备'],
        'budget': ['财务管理', '预算规划', '收支记录', '理财目标'],
        'ppt': ['商务演示', '会议汇报', '培训教学', '演讲展示'],
        'project-plan': ['项目管理', '团队协作', '进度追踪', '规划执行'],
        'daily-report': ['工作汇报', '任务追踪', '自我管理', '周月复盘'],
        'okr': ['目标管理', '绩效评估', '团队对齐', '自我提升'],
        'meeting-minutes': ['会议记录', '决策追踪', '任务派发', '沟通协作'],
        'sales-followup': ['客户管理', '销售跟进', '商机追踪', '业绩提升'],
        'expense-tracking': ['个人记账', '家庭理财', '报销管理', '预算控制']
    }
    scenario_list = scenarios_map.get(t['category'], ['日常工作'])
    
    examples_map = {
        'resume': '''个人信息
姓名：张三 | 手机：138-xxxx-xxxx | 邮箱：zhangsan@email.com

教育背景
2020-2024 清华大学 经济管理学院 本科
GPA：3.8/4.0 | 荣誉：校级三好学生

实习经历
2023.06-2023.09 字节跳动 产品运营实习生
• 负责核心工作内容，量化成果展示
• 带领团队完成X项目，效率提升40%

项目经验
2023 项目名称（负责人）
• 项目目标：XXX
• 我的职责：XXX
• 项目成果：XXX

技能证书
• 语言：英语六级
• 技能：Python/SQL/数据分析
• 证书：XXX证书

自我评价
性格开朗，责任心强，有良好的沟通协调能力和团队合作精神。''',
        'budget': '''2024年度预算规划

收入预算
工资收入：18,000元/月
奖金/提成：3,000元/季度
其他收入：2,000元/月
年度总收入：276,000元

支出预算
固定支出：房租5,000 + 贷款3,000 + 保险1,000 = 9,000元/月
变动支出：餐饮2,500 + 交通600 + 购物1,500 = 4,600元/月
储蓄投资：4,400元/月

总结
月收入：23,000元
月支出：13,600元
月结余：9,400元
储蓄率：41%
目标：12个月存够10万元应急基金'''
    }
    
    default_example = '''基本信息
''' + t.get('name', '模板名称') + '''
日期：2024年X月X日

主要内容
请根据实际情况填写具体内容...

备注说明
补充信息和注意事项'''
    
    example = examples_map.get(t['category'], default_example)
    
    tips_map = {
        'resume': ['量化成果用数字展示', '保持格式统一专业', '针对岗位定制简历', '定期更新简历内容', '避免低级错误'],
        'budget': ['养成记录收支的习惯', '区分必要和欲望支出', '定期复盘调整预算', '建立储蓄目标'],
        'ppt': ['每页不超过6行内容', '用图表代替文字', '提前排练把控时间', '统一配色和字体'],
        'project-plan': ['分解任务到可执行', '设置明确里程碑', '预留缓冲应对变化', '定期同步进度'],
        'daily-report': ['记录关键任务成果', '提前规划次日工作', '如实反馈问题阻塞', '简洁不需要流水账'],
        'okr': ['目标有挑战性可实现', 'KR要可量化可评估', '公开透明全公司可见', '定期回顾调整'],
        'meeting-minutes': ['会前确认议程参会人', '记录决策和待办任务', '48小时内发出纪要', '明确责任人和截止'],
        'sales-followup': ['每次跟进后记录要点', '设置下次跟进提醒', '分析未成单原因', '关注决策链关键人'],
        'expense-tracking': ['随手记录不遗漏', '分类统计找超支', '区分必要和欲望支出', '月末复盘调整']
    }
    tips_data = tips_map.get(t['category'], ['保持简洁清晰', '突出重点信息', '定期检查更新'])
    
    mistakes_data = ['信息不完整', '格式不统一', '缺乏关键细节']
    
    faq_data = [
        {'q': '模板适合什么场景使用？', 'a': '适用于' + cat_name + '相关场景。模板设计符合行业最佳实践，可以直接下载使用。'},
        {'q': '模板需要收费吗？', 'a': '完全免费，可以直接下载使用。请勿二次销售模板。'},
        {'q': '可以自定义修改吗？', 'a': '可以，下载后用相应软件打开即可修改内容和格式。'}
    ]
    
    cat_modules = {
        'resume': {
            'module1': '💼 简历优化技巧\n📌 用Action Verb开头：负责、主导，完成，推动\n📌 量化成果：提升了X%、增长了X元、缩短了X天\n📌 使用行业关键词：通过ATS关键词筛选\n📌 定期更新：根据岗位定制简历内容\n📌 避免低级错误：错别字、格式不统一',
            'module2': '🎯 面试官关注重点\n🎯 与岗位相关的能力证明\n🎯 项目经验和成果数据\n🎯 学习能力和成长潜力\n🎯 沟通表达和团队协作'
        },
        'budget': {
            'module1': '📊 常用Excel公式\n📈 SUM求和：=SUM(B2:B30) 计算总额\n📈 IF条件：=IF(B2>预算,"超支","正常")\n📈 AVERAGE平均：=AVERAGE(B2:B30)\n📈 VLOOKUP查找：自动匹配数据',
            'module2': '💰 预算控制方法\n🔒 50-30-20法则：50%必要，30%可选，20%储蓄\n🔒 优先级排序：先保证必需支出\n🔒 准备应急基金：预留10%意外支出'
        },
        'ppt': {
            'module1': '📋 PPT结构设计\n📐 结论先行：先说结论再展开\n📐 逻辑清晰：背景-分析-结论\n📐 每页一个核心观点，用数据支撑\n📐 故事线：起承转合，引人入胜',
            'module2': '🎨 视觉设计原则\n🎨 配色统一：不超过3种主色\n🎨 字体一致：标题黑体正文雅黑\n🎨 图片高质量：与内容相关'
        },
        'project-plan': {
            'module1': '📅 项目拆解方法\n📌 从大到小：项目→阶段→任务\n📌 任务粒度：每个任务1-3天完成\n📌 依赖识别：明确先后关系\n📌 资源匹配：确保人员和时间',
            'module2': '⚠️ 风险控制方法\n🔍 风险识别：列出主要风险\n🔍 风险评估：概率高影响大优先\n🔍 应对计划：为每个风险准备方案'
        },
        'daily-report': {
            'module1': '📝 日报撰写方法\n📝 关键任务法：只记录最重要3件事\n📝 数据说话：用数字量化成果\n📝 问题导向：记录问题和解决方案\n📝 简洁明了：控制在5行以内',
            'module2': '⏰ 时间管理技巧\n⏰ 四象限法：按重要紧急分配时间\n⏰ 番茄工作法：25分钟专注，5分钟休息\n⏰ 批量处理：同类任务集中处理'
        },
        'okr': {
            'module1': '🎯 OKR制定方法\n🎯 目标O：有挑战性、鼓舞人心、方向明确\n🎯 关键结果KR：可量化、可实现、有时限\n🎯 聚焦重点：每个周期3-5个核心目标',
            'module2': '📈 OKR评分与复盘\n📈 评分标准：0.6-0.7完成预期，0.8-1.0超预期\n📈 季度评分：末月进行评分和回顾\n📈 复盘内容：完成情况、经验教训、下期改进'
        },
        'meeting-minutes': {
            'module1': '📝 会议纪要要点\n📝 会议主题：明确讨论的核心问题\n📝 关键决策：记录达成的共识和决定\n📝 待办任务：明确责任人和截止时间',
            'module2': '✅ 行动项跟踪\n✅ 明确责任：每个行动项落实到人\n✅ 设定截止：清楚的任务完成时间\n✅ 定期跟进：检查行动项执行情况'
        },
        'sales-followup': {
            'module1': '📋 客户管理流程\n📋 漏斗阶段：线索→意向→谈判→成交→服务\n📋 转化率追踪：每个阶段的转化率\n📋 时间节点：每个阶段的平均周期',
            'module2': '💡 成交率提升技巧\n💡 需求挖掘：深入了解客户的真实需求\n💡 方案定制：根据客户需求提供定制方案\n💡 价值展示：让客户看到投入产出比'
        },
        'expense-tracking': {
            'module1': '📊 记账方法\n📊 随手记录不遗漏\n📊 分类统计找超支项\n📊 区分必要和欲望支出\n📊 月末复盘调整下月计划',
            'module2': '💰 省钱技巧\n💰 记录每一笔支出，不要遗漏\n💰 设置预算上限，超支预警\n💰 定期检查进度，分析原因'
        }
    }
    
    cat_mod = cat_modules.get(t['category'], cat_modules['resume'])
    
    scenarios_html = ''.join('<li><strong>' + s + '</strong></li>' for s in scenario_list)
    tips_html = ''.join('<li><strong>' + tip + '</strong></li>' for tip in tips_data)
    mistakes_html = ''.join('<li>' + m + '</li>' for m in mistakes_data)
    faq_html = ''.join('<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">' + f['q'] + '<span>▼</span></button><div class="faq-answer">' + f['a'] + '</div></div>' for f in faq_data)
    example_html = '<div class="example-box"><pre>' + example + '</pre></div>'
    guide_section = '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/' + related_guide + '" class="related-item">📖 查看教程 →</a></div>' if related_guide else ''
    
    module1_lines = cat_mod['module1'].split('\n', 1)
    module2_lines = cat_mod['module2'].split('\n', 1)
    module1_html = '<div class="template-section"><h2>' + module1_lines[0] + '</h2><div class="module-content"><pre>' + cat_mod['module1'] + '</pre></div></div>'
    module2_html = '<div class="template-section"><h2>' + module2_lines[0] + '</h2><div class="module-content"><pre>' + cat_mod['module2'] + '</pre></div></div>'
    
    name_escaped = t['name'].replace("'", "\\'")
    
    html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + seo_title + '</title><meta name="description" content="' + seo_desc + '"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/templates/' + t['category'] + '/' + subdir + '"><meta property="og:title" content="' + seo_title + '"><meta property="og:description" content="' + seo_desc + '"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/' + t['category'] + '">' + cat_name + '</a> / <span>' + t['name'] + '</span></div><div class="template-hero" style="background:' + gradient + '"><h1>' + icon + ' ' + t['name'] + '</h1><p>' + tagline + '</p><div class="template-actions"><a href="' + download_path + '" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\'' + t['id'] + '\',\'' + name_escaped + '\',\'templates/' + t['category'] + '/' + subdir + '\',\'' + icon + '\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 ' + format_type + '</span><span>👁️ ' + str(stats['views']) + ' 浏览</span><span>📥 ' + str(stats['downloads']) + ' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>' + scenarios_html + '</ul></div><div class="template-section"><h2>📝 填写示例</h2>' + example_html + '</div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">' + tips_html + '</ul></div>' + module1_html + module2_html + '<div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">' + mistakes_html + '</ul></div><div class="template-section"><h2>❓ 常见问题</h2>' + faq_html + '</div>' + guide_section + '<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="' + t['id'] + '";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>'
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    count += 1

print('Generated', count, 'template pages')
