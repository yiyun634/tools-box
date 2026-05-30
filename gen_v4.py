#!/usr/bin/env python3
import json
import os
import re

with open('/root/tools-box/data/templates.json', 'r') as f:
    data = json.load(f)
templates = data['templates']

# Template mappings
MAPPINGS = {
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
}

catNames = {'resume':'简历模板','budget':'Excel预算表','ppt':'PPT模板','project-plan':'项目计划书','daily-report':'工作日报',okr':'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'}
gradients = {'resume':'linear-gradient(135deg, #667eea 0%, #764ba2 100%)','budget':'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)','ppt':'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','project-plan':'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','daily-report':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',okr:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)','meeting-minutes':'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','sales-followup':'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)','expense-tracking':'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'}
icons = {'resume':'📝','budget':'📊','ppt':'📑','project-plan':'📋','daily-report':'📅',okr:'🎯','meeting-minutes':'📝','sales-followup':'📈','expense-tracking':'💰'}

# 每个模板的详细内容（目标900字+）
TEMPLATE_CONTENT = {
    'classic-resume': {
        'tagline': '传统经典排版，适合大多数职位申请。正规稳重，永不出错。',
        'scenarios': ['国企/事业单位申请', '校招/社招通用', '管理培训生申请', '传统行业岗位', '公务员/选调生申请'],
        'example': '''个人信息
姓名：王小明 | 手机：138-xxxx-xxxx | 邮箱：wangxiaoming@email.com
现居地：上海 | 政治面貌：中共党员

教育背景
2020-2024 清华大学 经济管理学院 本科
主修：工商管理 | GPA：3.8/4.0（专业前10%）
荣誉：校级三好学生（3次）、学业优秀奖学金（2次）

实习经历
2023.06-2023.09 字节跳动 产品运营实习生
• 负责抖音创作者社群运营，制定运营策略，成员从5万增长至12万（+140%）
• 策划并执行「创作者激励计划」，带动优质内容产出提升60%
• 策划运营活动2场，参与用户累计超过5万人次

2022.07-2022.09 京东集团 市场部实习生
• 协助策划618营销活动方案，活动曝光量提升40%
• 负责竞品数据收集与分析，输出竞品周报5份

校园经历
2021-2023 学生会外联部部长
• 统筹组织校级活动10场，累计参与人数超过1万人
• 拉取赞助累计5万元，物资赞助价值3万元
• 带领团队从5人扩展至15人

技能证书
• 语言：英语六级 580分、日语N3
• 技能：Python数据分析、Axure原型设计、SQL查询
• 证书：初级会计师证、普通话二级甲等

自我评价
性格开朗，责任心强，有良好的沟通协调能力和团队合作精神。在校期间积极参加社会实践，积累了丰富的组织和策划经验。''',
        'tips': ['联系方式放在顶部显眼位置，格式保持统一', '教育背景按时间倒序，先写最高学历', '工作经历用STAR法则描述：情境、任务、行动、结果', '量化成果用具体数字展示，如提升140%、增长60%', '控制在1-2页内，内容精简重点突出', '不同岗位申请建议准备多个版本，针对性调整', '定期更新简历内容，保持信息时效性'],
        'mistakes': ['使用超过2种字体颜色或过于花哨的模板', '联系方式遗漏或格式错误', '工作经历过于笼统，缺乏具体工作内容和数据', '出现错别字、标点符号不统一、日期格式混乱'],
        'faq': [
            {'q': '经典简历适合哪些岗位申请？', 'a': '经典简历适用于国企、事业单位、传统行业、管理培训生等正式岗位。排版简洁大方，注重内容呈现，不会因为风格问题被淘汰。如果你申请的是公务员、国企、央企、大型传统企业，经典简历是最佳选择。'},
            {'q': '简历需要放照片吗？', 'a': '国内求职建议附上照片，使用证件照或职业照，避免浓妆艳抹或过度修图的照片。欧美企业通常不需要照片，甚至有些外企明确要求不要放照片。'},
            {'q': '没有工作经验的应届生怎么写？', 'a': '应届生应该突出实习经历、校园经历、项目经验、课程项目等。重点展示学习能力、沟通能力、团队协作等软技能。用数据说明你的贡献。'},
            {'q': '简历应该控制在几页？', 'a': '一般建议1-2页。应届生1页即可，有丰富经验的可适当延长至2页。工作10年以上的职场人可以做3页。关键原则是：内容精简，重点突出。'}
        ],
        'module1': '''💼 岗位适配建议
✅ 适合国企、事业单位、传统行业，管理培训生
✅ 建议配合正式正装照片使用
✅ 可以根据目标岗位调整简历侧重点
✅ 突出教育背景和学历层次
✅ 展示稳定性和职业规划
✅ 使用传统排版，避免过于创意
✅ 针对不同行业准备不同版本
✅ 注意格式规范和专业度''',
        'module2': '''🎯 面试官关注重点
🎯 学历背景和毕业院校层次
🎯 实习经历的具体工作内容
🎯 校园活动和领导力经历
🎯 沟通表达能力和举止仪表
🎯 简历的整体呈现和专业度
🎯 对企业和岗位的了解程度
🎯 职业规划和发展潜力'''
    },
    'developer-resume': {
        'tagline': '技术导向设计，突出编程能力和项目经验，让面试官快速判断技术匹配度。',
        'scenarios': ['互联网公司开发岗', 'IT/软件企业', '技术管培生', '外资科技公司', '创业公司技术合伙人'],
        'example': '''个人信息
张伟 | Java后端工程师 | 4年开发经验
GitHub：github.com/zhangwei | 技术博客：zhangwei.tech
求职意向：高级开发工程师/技术专家

技术栈
后端：Java/SpringBoot/Go | 数据库：MySQL/Redis/PostgreSQL
架构：Docker/K8s微服务 | 消息队列：Kafka/RocketMQ
工具：Git/Maven/Jenkins | 监控：Prometheus/Grafana

工作经历
2020-至今 阿里巴巴 高级Java开发工程师
• 负责电商平台订单系统设计，日订单处理量超过100万单
• 重构库存系统，接口响应时间从200ms降至50ms，性能提升75%
• 秒杀系统支撑双十一峰值10万QPS，成功率99.9%
• 搭建自动化测试框架，代码覆盖率达85%

2018-2020 美团点评 Java开发工程师
• 负责餐厅推荐系统，推荐准确率提升30%
• 优化数据库查询，数据库负载降低40%

项目经验
2023 秒杀系统设计与实现（负责人）
• Redis集群+消息队列，峰值处理能力提升10倍
• QPS支持10万+，下单成功率99.9%

开源贡献
• GitHub Stars 3000+，维护工具库累计下载10万+
• 贡献Spring生态开源项目，提交PR被合并3次

技能认证
• Oracle Certified Professional Java SE 8 Programmer
• Alibaba Cloud Certified Developer''',
        'tips': ['技术栈放在显眼位置，分层展示（语言、框架、数据库、工具等）', '项目描述要突出技术难点和解决方案', '用数字量化成果：QPS、延迟、覆盖率、增长百分比等', '附上GitHub和技术博客链接，展示技术热情和持续学习能力', '写明参与的架构设计和技术决策', '面试前准备好项目细节，能详细解释技术选型原因'],
        'mistakes': ['堆砌技术名词但没有实际应用场景和成果', '项目描述过于笼统，只说做了什么但不说怎么做的', '忽略系统设计能力的展示，只关注CRUD', '技术栈与目标岗位要求不匹配'],
        'faq': [
            {'q': '程序员简历需要写期望薪资吗？', 'a': '建议写面议或写一个范围（如25-35K），让HR主动联系时有谈判空间。写太高可能直接被筛选掉，写太低会让自己很被动。'},
            {'q': '没有开源项目怎么办？', 'a': '可以自己实现小工具并开源、参与开源社区贡献、写技术博客、做个人项目。不要一片空白，要有至少一个能展示你代码风格和思考能力的项目。'},
            {'q': '项目太技术化面试官听不懂怎么办？', 'a': '先用一个非技术人员能理解的语言描述你解决了什么问题、带来了什么价值，然后再展开技术细节。关键是让面试官知道你解决了什么业务问题。'},
            {'q': '学历一般怎么弥补？', 'a': '突出项目经验的质量和数量，开源贡献、技术博客、大厂实习经历等。技术行业更看重实际能力。'}
        ],
        'module1': '''💼 岗位适配建议
✅ 适合IT/软件/互联网公司技术岗位
✅ 技术栈要针对目标公司做定制化调整
✅ 建议附上GitHub和技术博客链接
✅ 突出项目经验和技术深度
✅ 展示解决复杂问题的能力
✅ 量化技术成果（性能提升X%、支撑X用户）
✅ 针对不同技术方向准备不同版本''',
        'module2': '''🎯 面试官关注重点
🎯 技术栈与岗位匹配度
🎯 项目经验的技术深度
🎯 问题解决能力和思路
🎯 编码习惯和代码质量
🎯 系统设计能力
🎯 学习能力和技术热情
🎯 团队协作和沟通能力'''
    }
}

# 通用模块模板
def get_cat_modules(category):
    modules = {
        'resume': {
            'module1': '''💼 简历优化技巧
📌 用Action Verb开头：负责、主导，完成，推动
📌 量化成果：提升了X%、增长了X元
📌 使用行业关键词：通过ATS关键词筛选
📌 定期更新：根据岗位定制简历内容
📌 避免低级错误：错别字、格式不统一
📌 简历命名：姓名-岗位-年份.pdf''',
            'module2': '''🎯 面试官关注重点
🎯 与岗位相关的能力证明
🎯 项目经验和成果数据
🎯 学习能力和成长潜力
🎯 沟通表达和团队协作'''
        },
        'budget': {
            'module1': '''📊 常用Excel公式
📈 SUM求和：=SUM(B2:B30) 计算总额
📈 IF条件：=IF(B2>预算,"超支","正常")
📈 AVERAGE平均：=AVERAGE(B2:B30)
📈 VLOOKUP查找：自动匹配数据
📈 数据透视表：快速汇总分析''',
            'module2': '''💰 预算控制方法
🔒 50-30-20法则：50%必要，30%可选，20%储蓄
🔒 优先级排序：先保证必需支出
🔒 准备应急基金：预留10%意外支出
🔒 每周检查预算执行情况'''
        },
        'ppt': {
            'module1': '''📋 PPT结构设计
📐 结论先行：先说结论再展开
📐 逻辑清晰：背景-分析-结论
📐 每页一个核心观点
📐 用数据支撑观点
📐 故事线：起承转合''',
            'module2': '''🎨 视觉设计原则
🎨 配色统一：不超过3种主色
🎨 字体一致：标题黑体正文雅黑
🎨 图片高质量：与内容相关
🎨 层次分明：大小标题区分'''
        },
        'project-plan': {
            'module1': '''📅 项目拆解方法
📌 从大到小：项目→阶段→任务
📌 任务粒度：每个任务1-3天完成
📌 依赖识别：明确先后关系
📌 资源匹配：确保人员和时间
📌 设置里程碑和评审点''',
            'module2': '''⚠️ 风险控制方法
🔍 风险识别：列出主要风险
🔍 风险评估：概率高影响大优先
🔍 应对计划：为每个风险准备方案
🔍 定期回顾：每月检视状态'''
        },
        'okr': {
            'module1': '''🎯 OKR制定方法
🎯 目标O：有挑战性、鼓舞人心
🎯 关键结果KR：可量化、有时限
🎯 聚焦重点：每个周期3-5个目标
🎯 公开透明：全公司可见''',
            'module2': '''📈 OKR评分与复盘
📈 评分标准：0.6-0.7完成预期
📈 季度评分：末月进行回顾
📈 复盘内容：完成情况、经验教训
📈 与绩效脱钩：OKR不是考核'''
        },
        'daily-report': {
            'module1': '''📝 日报撰写方法
📝 关键任务法：只记录最重要3件事
📝 数据说话：用数字量化成果
📝 问题导向：记录问题和方案
📝 简洁明了：控制在5行以内
📝 提前规划次日工作''',
            'module2': '''⏰ 时间管理技巧
⏰ 四象限法：按重要紧急分配
⏰ 番茄工作法：25分钟专注
⏰ 批量处理：同类任务集中
⏰ 预留缓冲：20%时间处理意外'''
        },
        'sales-followup': {
            'module1': '''📋 客户管理流程
📋 漏斗阶段：线索→意向→谈判→成交
📋 转化率追踪：每个阶段的转化
📋 时间节点：每个阶段的周期
📋 异常预警：阶段停滞提醒''',
            'module2': '''💡 成交率提升技巧
💡 需求挖掘：了解真实需求
💡 方案定制：提供定制方案
💡 价值展示：看投入产出比
💡 紧迫感：适度制造购买紧迫'''
        },
        'meeting-minutes': {
            'module1': '''📝 会议纪要要点
📝 会议主题：明确核心问题
📝 关键决策：记录共识和决定
📝 待办任务：责任人和截止时间
📝 后续跟进：下次确认的内容''',
            'module2': '''✅ 行动项跟踪
✅ 明确责任：落实到人
✅ 设定截止：清楚完成时间
✅ 定期跟进：检查执行情况
✅ 结果反馈：完成后的闭环'''
        },
        'expense-tracking': {
            'module1': '''📊 记账方法
📊 随手记录不遗漏
📊 分类统计找超支
📊 区分必要和欲望支出
📊 月末复盘调整计划''',
            'module2': '''💰 省钱技巧
💰 记录每一笔支出
💰 设置预算上限
💰 定期检查进度
💰 分析超支原因'''
        }
    }
    return modules.get(category, modules['resume'])

def generate_html(t):
    subdir = MAPPINGS.get(t['id'])
    if not subdir:
        return None
    
    dir_path = f'/root/tools-box/templates/{t.category}/{subdir}'
    file_path = f'{dir_path}/index.html'
    
    if not os.path.exists(file_path):
        return None
    
    content_data = TEMPLATE_CONTENT.get(t['id'], {})
    
    cat_name = catNames.get(t.category, t.category)
    gradient = gradients.get(t.category, gradients['resume'])
    icon = icons.get(t.category, '📄')
    
    seo_title = (t.get('seo') or {}).get('title') or f"{t['name']} - 免费效率工具箱"
    seo_desc = (t.get('seo') or {}).get('description') or f"免费下载{t['name']}"
    download_path = t.get('downloadPath', f"/assets/{t.category}/{subdir}.docx")
    format_type = (t.get('format') or 'DOCX').upper()
    stats = t.get('stats', {'views': 0, 'downloads': 0})
    related_guide = t.get('relatedGuide', '')
    
    tagline = content_data.get('tagline', f"专业{t['name']}")
    scenarios = content_data.get('scenarios', ['适用于日常工作'])
    example = content_data.get('example', '请根据实际情况填写...')
    tips = content_data.get('tips', ['保持简洁清晰'])
    mistakes = content_data.get('mistakes', ['信息不完整'])
    faq_list = content_data.get('faq', [{'q': '常见问题', 'a': '请参考使用说明。'}])
    module1 = content_data.get('module1', '')
    module2 = content_data.get('module2', '')
    
    if not module1 or not module2:
        cat_mods = get_cat_modules(t.category)
        module1 = module1 or cat_mods['module1']
        module2 = module2 or cat_mods['module2']
    
    scenarios_html = ''.join(f'<li><strong>{s}</strong></li>' for s in scenarios)
    tips_html = ''.join(f'<li><strong>{tip}</strong></li>' for tip in tips)
    mistakes_html = ''.join(f'<li>{m}</li>' for m in mistakes)
    faq_html = ''.join(f'''<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">{f['q']}<span>▼</span></button><div class="faq-answer">{f['a']}</div></div>''' for f in faq_list)
    example_html = f'<div class="example-box"><pre>{example}</pre></div>'
    guide_section = f'<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/{related_guide}" class="related-item">📖 查看教程 →</a></div>' if related_guide else ''
    
    module1_html = f'<div class="template-section"><h2>{module1.split(chr(10))[0]}</h2><div class="module-content"><pre>{module1}</pre></div></div>'
    module2_html = f'<div class="template-section"><h2>{module2.split(chr(10))[0]}</h2><div class="module-content"><pre>{module2}</pre></div></div>'
    
    html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{seo_title}</title>
<meta name="description" content="{seo_desc}">
<link rel="stylesheet" href="/css/main.css">
<link rel="canonical" href="https://tools-box-topaz.vercel.app/{dir_path}">
<meta property="og:title" content="{seo_title}">
<meta property="og:description" content="{seo_desc}">
</head>
<body>
<header class="header">
<div class="container header-inner">
<a href="/" class="logo">🧰 <span>免费效率工具箱</span></a>
<div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div>
<nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav>
</div>
</header>
<main class="main">
<div class="container template-detail">
<div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/{t.category}">{cat_name}</a> / <span>{t['name']}</span></div>
<div class="template-hero" style="background:{gradient}">
<h1>{icon} {t['name']}</h1>
<p>{tagline}</p>
<div class="template-actions">
<a href="{download_path}" class="btn btn-primary" download>📥 免费下载</a>
<button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite('{t['id']}','{t['name'].replace("'", "\\\\'")}','{dir_path}','{icon}')">🤍 收藏</button>
<button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button>
</div>
<div class="template-meta"><span>📁 {format_type}</span><span>👁️ {stats['views']} 浏览</span><span>📥 {stats['downloads']} 下载</span></div>
</div>
<div class="ad-placeholder">广告位 - 顶部</div>
<div class="template-section"><h2>💡 使用场景</h2><ul>{scenarios_html}</ul></div>
<div class="template-section"><h2>📝 填写示例</h2>{example_html}</div>
<div class="ad-placeholder">广告位 - 中部</div>
<div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">{tips_html}</ul></div>
{module1_html}
{module2_html}
<div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">{mistakes_html}</ul></div>
<div class="template-section"><h2>❓ 常见问题</h2>{faq_html}</div>
{guide_section}
<div class="ad-placeholder">广告位 - 底部</div>
</div>
</main>
<footer class="footer">
<div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div>
</footer>
<script>
function search(){{var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}}
document.getElementById("search-input").addEventListener("keypress",function(e){{if(e.key==="Enter")search();}});
function toggleFAQ(b){{b.parentElement.classList.toggle("open");}}
function toggleFavorite(id,name,path,icon){{var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||'{{"favorites":{{"items":[]}}}}');var i=d.favorites.items.findIndex(function(x){{return x.id===id;}});if(i>=0){{d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}}else{{d.favorites.items.push({{type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()}});btn.textContent="❤️ 已收藏";}}localStorage.setItem("analytics",JSON.stringify(d));}}
function copyLink(){{navigator.clipboard.writeText(location.href).then(function(){{alert("链接已复制！");}});}}
var local=JSON.parse(localStorage.getItem("analytics")||'{{}}');
if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){{return x.id=="{t['id']}";}})){{document.getElementById("favorite-btn").textContent="❤️ 已收藏";}}
</script>
</body>
</html>'''
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    return file_path

count = 0
for t in templates:
    if generate_html(t):
        count += 1

print(f'Generated {count} template pages')
