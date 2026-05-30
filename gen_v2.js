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

// 每个模板的独特内容 - 按ID精准匹配
const CONTENT = {
    // 简历模板 - 每个都有独特内容
    'classic-resume': {
        name: '经典简历模板',
        tagline: '传统经典排版，适合大多数职位申请',
        scenarios: ['国企/事业单位申请', '校招/社招通用', '管理培训生申请', '传统行业岗位'],
        example: `个人信息\n姓名：王小明 | 手机：138-xxxx-xxxx | 邮箱：wangxiaoming@email.com\n\n教育背景\n2020-2024 清华大学 经济管理学院 本科\n主修：工商管理 | GPA：3.8/4.0 | 荣誉：校级三好学生\n\n实习经历\n2023.06-2023.09 字节跳动 产品运营实习生\n• 负责抖音创作者社群运营，成员增长120%\n• 策划运营活动2场，参与用户5万+\n\n校园经历\n2021-2023 学生会外联部部长\n• 拉取赞助5万元，举办活动10场\n\n技能证书\n• 语言：英语六级 580分\n• 技能：Python数据分析、Axure原型设计`,
        tips: ['联系方式放在顶部显眼位置', '工作经历按时间倒序排列', '量化成果用数字展示', '控制在1-2页内'],
        mistakes: ['使用超过2种字体颜色', '联系方式遗漏或错误', '工作经历过于笼统缺乏数据', '错别字和格式不统一'],
        faq: [
            {q: '经典简历适合哪些岗位？', a: '经典简历适用于国企、事业单位、传统行业、管理培训生等正式岗位。排版简洁大方，不会因为风格问题被淘汰。'},
            {q: '简历需要放照片吗？', a: '国内求职建议附上照片，使用证件照或职业照，避免浓妆艳抹或过度修图。欧美企业通常不需要。'},
            {q: '没有工作经验怎么写？', a: '突出实习经历、校园经历、项目经验。重点展示学习能力、沟通能力、团队协作等软技能。用数据说明你的贡献。'}
        ]
    },
    'developer-resume': {
        name: '程序员简历模板',
        tagline: '技术导向设计，突出编程能力和项目经验',
        scenarios: ['互联网公司开发岗', 'IT/软件企业', '技术管培生', '外资科技公司'],
        example: `个人信息\n张伟 | Java后端工程师 | 4年经验\nGitHub：github.com/zhangwei | 博客：zhangwei.tech\n\n技术栈\n后端：Java/SpringBoot/Go | 数据库：MySQL/Redis/PostgreSQL\n架构：Docker/K8s/Microservices | 工具：Git/Maven/Jenkins\n\n工作经历\n2020-至今 阿里巴巴 高级Java开发工程师\n• 负责电商平台订单系统设计，日订单处理100万+\n• 重构库存系统，接口响应时间从200ms降至50ms\n\n项目经验\n2023 秒杀系统设计与实现\n• 使用Redis集群+消息队列支撑双十一峰值流量\n• QPS支持10万+，下单成功率99.9%`,
        tips: ['技术栈放在显眼位置，分层展示', '项目描述突出技术难点和解决方案', '用数字量化成果：QPS、延迟、覆盖率', '附上GitHub和技术博客链接'],
        mistakes: ['堆砌技术名词没有实际应用场景', '项目描述过于笼统缺乏技术深度', '忽略系统设计能力展示', '技术栈与目标岗位不匹配'],
        faq: [
            {q: '程序员简历需要写期望薪资吗？', a: '建议写面议或写一个范围，让HR主动联系时有谈判空间。写太高可能直接被过滤。'},
            {q: '没有开源项目怎么办？', a: '可以自己实现小工具、参与开源社区贡献、写技术博客、做个人项目。不要一整片空白。'},
            {q: '项目太技术化面试官看不懂怎么办？', a: '用简单语言描述解决什么问题、带来什么价值。技术细节面试时再展开。'}
        ]
    },
    'teacher-resume': {
        name: '教师简历模板',
        tagline: '专业稳重的设计，突出教学能力和教育背景',
        scenarios: ['公办学校招聘', '私立学校申请', '培训机构', '教育管理岗位'],
        example: `个人信息\n王芳 | 高中数学教师 | 8年教龄\n教师资格证：高中数学 编号2020XXXX\n\n教育背景\n2010-2014 北京师范大学 数学与应用数学 本科\n2014-2016 北京师范大学 数学教育 硕士\n\n教学成果\n• 所带班级高考数学平均分提升15分，超年级平均\n• 指导学生获省级数学竞赛一等奖2人、二等奖5人\n• 连续3年获得校级优秀教师称号\n\n班主任经验\n2018-2024 连续6年担任班主任\n班级本科上线率保持在95%以上`,
        tips: ['教师资格证编号是必须的', '量化教学成果和学生成绩提升', '突出班主任经历和管理能力', '展示教研能力和学术成果'],
        mistakes: ['未注明教师资格证编号和学科', '教学经历描述过于理论化没有数据', '忽略班主任经历和家校沟通能力', '课外活动描述空洞不具体'],
        faq: [
            {q: '非师范专业能当老师吗？', a: '可以，但必须先考取教师资格证。简历中可以强调教育相关培训、支教经历、对教育行业的热情。'},
            {q: '培训机构经历怎么写？', a: '突出培训人次、学员满意度、课程研发能力、续报率等指标。展示你的教学能力而非销售能力。'},
            {q: '没有教学经验怎么办？', a: '可以写支教经历、家教经验、实习经历。重点展示你对教学的理解和潜力，而非只看经验。'}
        ]
    },
    'pm-resume': {
        name: '产品经理简历模板',
        tagline: '逻辑清晰的设计，突出产品思维和数据能力',
        scenarios: ['互联网产品经理', '创业公司产品负责人', '产品管培生', '解决方案经理'],
        example: `个人信息\n刘强 | 产品经理 | 6年经验\n微信公众号：产品大玩家 | 邮箱：liuqang@email.com\n\n工作经历\n2021-至今 腾讯 PCG高级产品经理\n• 负责QQ小程序平台产品规划，DAU增长25%\n• 推动商家入驻项目，商家数增长150%\n\n项目经验\nQQ小程序开放平台 0-1建设\n• 完成平台产品架构设计，支持50+垂直类目\n• 接入开发者3000+，月活小程序过万\n\n技能：Axure / SQL / 产品数据分析 / 用户研究`,
        tips: ['突出产品成果，用数据和用户规模证明能力', '展示0-1产品经验和项目推进能力', '体现产品方法论和用户思维', '可以写公众号或博客展示产品思考'],
        mistakes: ['只描述功能没有体现产品价值', '项目经验过于流水账没有重点', '缺少数据支撑和产品思维', '产品经理技能与岗位要求不匹配'],
        faq: [
            {q: '转行做产品经理简历怎么写？', a: '突出你原有行业的业务理解能力，展示你对产品经理技能的自学经历，做过什么项目或作品。'},
            {q: '没有大厂经验怎么办？', a: '可以展示独立负责的项目、创业经历、产品案例。重点说明你做什么、怎么做、结果如何。'},
            {q: '产品经理需要掌握什么技能？', a: '需求分析、产品设计、项目管理、数据分析、用户研究、沟通协调。简历中展示你最擅长的即可。'}
        ]
    },
    // 其他简历模板
    'modern-resume': {
        name: '现代简历模板',
        tagline: '时尚简约设计，适合互联网和创意行业',
        scenarios: ['互联网大厂', '科技公司', '创意设计岗位', '海归求职者'],
        example: `个人信息\n李思思 | 产品设计师 | 3年经验\nPortfolio：dribbble.com/lisisisi\n\n教育背景\n2018-2022 伦敦艺术大学 视觉传达设计 硕士\n\n工作经历\n2022-至今 字节跳动 UI设计师\n• 负责抖音APP核心页面设计，日活用户提升15%\n• 建立设计组件库，覆盖80%的产品界面\n\n技能：Figma / Sketch / Principle / After Effects`,
        tips: ['可添加作品集链接增强展示', '设计风格要与申请岗位匹配', '突出创意能力和审美水平', '保持版面的呼吸感和层次感'],
        mistakes: ['设计过于浮夸不专业', '动画效果影响阅读', '字体选择过于个性', '配色混乱缺乏统一'],
        faq: [
            {q: '现代简历适合什么行业？', a: '互联网、科技、创意设计、媒体广告、游戏等新兴行业更适合。传统行业、国有企业慎用，会显得不够稳重。'},
            {q: '可以添加作品集链接吗？', a: '必须添加！设计类岗位一定要附上Dribbble、Behance或个人网站链接。'},
            {q: '现代简历能打印吗？', a: '可以，但建议使用较高质量的纸张打印。也可以直接发送PDF电子版。'}
        ]
    },
    'simple-resume': {
        name: '简洁简历模板',
        tagline: '极简风格设计，让内容说话',
        scenarios: ['应届生申请', '实习申请', '跨行业转型', '要求简洁的岗位'],
        example: `个人信息\n赵阳 | 应届毕业生\n手机：138-xxxx-xxxx | 邮箱：zhaoyang@email.com\n\n教育背景\n2020-2024 浙江大学 计算机科学与技术 本科\n\n实习经历\n2023.07-2023.09 蚂蚁集团 软件开发实习生\n• 参与支付系统开发，完成3个功能模块\n\n项目经验\n2023 校园二手交易平台\n• 使用SpringBoot开发后端API，实现用户认证、商品管理、订单处理功能\n\n技能：Java / Python / MySQL / Git`,
        tips: ['只保留最关键的信息，不添加无关内容', '突出教育背景和实习/项目经验', '用简洁的语言描述，突出重点', '保持一致的格式和对齐'],
        mistakes: ['添加过多无关的校园活动', '格式不统一显得不专业', '联系方式不完整或格式错误', '内容过于空洞缺乏具体'],
        faq: [
            {q: '简洁简历适合什么人？', a: '适合应届生、初级岗位、跨行业转型者。不适合有丰富经验需要展示的人。'},
            {q: '内容太少会不会显得单薄？', a: '不会，内容精简但有实质更重要。与其堆砌无关经历，不如突出核心亮点。'},
            {q: '没有实习经历怎么办？', a: '突出项目经验、课程作业、校园经历、志愿服务等。展示你的学习能力和潜力。'}
        ]
    },
    // 其余简历模板用默认内容...
};

const catNames = {resume:'简历模板',budget:'Excel预算表',ppt:'PPT模板','project-plan':'项目计划书','daily-report':'工作日报',okr:'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'};
const gradients = {resume:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',budget:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',ppt:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','project-plan':'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','daily-report':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',okr:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)','meeting-minutes':'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','sales-followup':'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)','expense-tracking':'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'};
const icons = {resume:'📝',budget:'📊',ppt:'📑','project-plan':'📋','daily-report':'📅',okr:'🎯','meeting-minutes':'📝','sales-followup':'📈','expense-tracking':'💰'};

// 默认内容模板
const defaultContent = {
    'resume': {
        tips: ['保持简洁专业的排版', '突出与岗位相关的经历', '量化工作成果用数据说话', '定期更新简历内容'],
        mistakes: ['使用过于花哨的模板', '联系方式遗漏或错误', '工作经历过于笼统', '忽略简历与岗位的匹配度'],
        faq: [
            {q: '简历应该控制在几页？', a: '建议1-2页，应届生1页即可，有丰富经验的可适当延长至2页。'},
            {q: '可以同时申请多个岗位用同一份简历吗？', a: '建议根据不同岗位JD调整简历重点，提高匹配度。'},
            {q: '简历需要附上照片吗？', a: '国内求职建议附上证件照，外企通常不需要。'}
        ]
    },
    'budget': {
        tips: ['养成记录收支的习惯', '区分必要支出和非必要支出', '定期复盘调整预算', '建立储蓄意识'],
        mistakes: ['只记不分析', '预算脱离实际', '忽视小钱累积', '应急情况无准备'],
        faq: [
            {q: '如何开始记账？', a: '从最简单的记录开始，每天花1分钟记录收支，不需要太复杂。'},
            {q: '预算表多久更新一次？', a: '建议每天记录，每周检查，每月总结，每季度调整。'},
            {q: '预算和实际不符怎么办？', a: '分析差距原因，调整预算使其更贴合实际，或改进执行纪律。'}
        ]
    },
    'ppt': {
        tips: ['每页不超过6行，每行不超过6字', '使用高质量图片素材', '统一配色和字体风格', '提前排练把握时间'],
        mistakes: ['文字过多堆砌', '配色过于花哨', '字体大小不统一', '动画效果喧宾夺主'],
        faq: [
            {q: 'PPT应该多少页？', a: '根据时间和内容密度，一般10-20页较为合适，20分钟演讲约15页。'},
            {q: '什么样的PPT最专业？', a: '配色统一、字体一致、图文结合、重点突出、逻辑清晰。'},
            {q: '可以免费下载PPT素材吗？', a: '可以，推荐使用Unsplash配图、阿里巴巴图标库等免费资源。'}
        ]
    },
    'project-plan': {
        tips: ['分解任务到可执行的粒度', '设置明确的里程碑节点', '预留缓冲时间应对风险', '定期同步进度和调整计划'],
        mistakes: ['任务分解不够细致', '忽略依赖关系和资源冲突', '时间估计过于乐观', '计划与实际脱节不调整'],
        faq: [
            {q: '项目计划书应该多详细？', a: '详细到知道谁做什么、什么时候完成、交付什么成果即可。不用过度复杂。'},
            {q: '计划总是赶不上变化怎么办？', a: '计划需要动态调整，建议每周检查一次进度并更新计划。'},
            {q: '如何让团队遵守项目计划？', a: '可视化跟踪、明确的考核节点、定期的同步会议，让计划成为团队的工作指引而非束缚。'}
        ]
    },
    'daily-report': {
        tips: ['记录今天完成的关键任务', '提前规划明日工作重点', '如实记录问题和阻塞', '保持简洁不需要流水账'],
        mistakes: ['写成流水账没有重点', '只记录工作不思考改进', '隐瞒问题和风险', '格式不统一难以汇总'],
        faq: [
            {q: '工作日报应该写多详细？', a: '简洁明了为主，重要任务记录详细，常规工作一句话带过即可。'},
            {q: '日报对绩效考核有帮助吗？', a: '有帮助，日报是工作痕迹的记录，在绩效回顾时有据可查。'},
            {q: '临时任务太多打乱计划怎么办？', a: '在日报中记录临时任务的优先级调整，让领导知道你的工作负荷变化。'}
        ]
    },
    'okr': {
        tips: ['目标要有挑战性但可实现', '关键结果要可量化衡量', '每个KR有明确的完成标准', 'OKR公开透明全公司可见'],
        mistakes: ['目标过于保守缺乏挑战', 'KR无法量化无法评估', 'OKR与实际工作脱节', '只设不跟踪不回顾'],
        faq: [
            {q: 'OKR和KPI有什么区别？', a: 'OKR关注目标达成和挑战性，不直接关联薪酬；KPI关注指标达成，通常关联考核。'},
            {q: 'OKR设置多少个合适？', a: '建议目标1-3个，每个目标2-4个关键结果。聚焦比面面俱到更重要。'},
            {q: '季度中途可以调整OKR吗？', a: '可以，但需要充分理由和说明。调整后需要在团队内同步。'}
        ]
    },
    'meeting-minutes': {
        tips: ['会前确认议程和参会人', '会中记录关键决策和理由', '会后48小时内发出纪要', '明确每项待办的责任人和截止时间'],
        mistakes: ['只记录讨论不记录结论', '待办任务没有明确负责人', '纪要发出不及时', '后续跟进不了了之'],
        faq: [
            {q: '会议纪要应该发给谁？', a: '发给所有参会人，并抄送相关协同部门。让大家知道讨论结论和各自任务。'},
            {q: '纪要应该多详细？', a: '记录决策和待办即可，不需要逐字记录讨论过程。详细程度根据会议重要性调整。'},
            {q: '参会人有不同意见怎么办？', a: '记录各种意见和决策理由，体现决策过程的透明性。'}
        ]
    },
    'sales-followup': {
        tips: ['每次跟进后立即记录要点', '设置下次跟进提醒', '关注客户决策链和关键人', '分析未成单原因积累经验'],
        mistakes: ['跟进记录不完整', '长时间未联系客户冷淡', '不了解客户真实需求', '只顾推进忽略售后预期管理'],
        faq: [
            {q: '如何提高销售跟进效率？', a: '按销售漏斗分类管理，重点跟进高意向客户，设置自动提醒避免遗漏。'},
            {q: '客户长期不回复怎么办？', a: '可以发送有价值的行业信息或案例，保持存在感，不要频繁催促。'},
            {q: '如何判断客户意向度？', a: '看是否有明确需求、时间表、预算和决策人。四个要素都具备则意向度高。'}
        ]
    },
    'expense-tracking': {
        tips: ['养成随手记录的习惯', '定期分类统计找出超支项', '区分必要支出和欲望支出', '月末复盘调整下月计划'],
        mistakes: ['嫌麻烦不记录', '只记大额忽略小钱累积', '不分类不知道钱花哪了', '记完不看不分析'],
        faq: [
            {q: '记账最麻烦的是什么？', a: '是坚持。建议选择简单好用的记账工具，养成习惯后每天2分钟即可。'},
            {q: '支付宝微信账单能直接导入吗？', a: '可以，很多记账APP支持自动导入，省去手动输入的麻烦。'},
            {q: '记账能帮我省钱吗？', a: '能，当你清楚看到钱花在哪里，才知道哪些该省。记账只是手段，省钱才是目的。'}
        ]
    }
};

function getContent(templateId, category) {
    if (CONTENT[templateId]) {
        return CONTENT[templateId];
    }
    const catDefault = defaultContent[category] || defaultContent['resume'];
    return {
        name: templateId,
        tagline: '专业模板',
        scenarios: ['日常工作', '职场应用', '效率提升'],
        example: '请根据实际情况填写对应内容...\n\n基本信息：姓名、联系方式等\n工作内容：具体任务和职责\n完成情况：进度和成果\n问题反馈：遇到的问题和解决方案',
        tips: catDefault.tips,
        mistakes: catDefault.mistakes,
        faq: catDefault.faq
    };
}

let updated = 0;

templates.forEach(t => {
    const subdir = MAPPINGS[t.id];
    if (!subdir) return;
    
    const dir = '/root/tools-box/templates/' + t.category + '/' + subdir;
    const file = dir + '/index.html';
    if (!fs.existsSync(file)) return;
    
    const content = getContent(t.id, t.category);
    const catName = catNames[t.category] || t.category;
    const gradient = gradients[t.category] || gradients['resume'];
    const icon = icons[t.category] || '📄';
    
    const seoTitle = (t.seo && t.seo.title) || t.name + ' - 免费效率工具箱';
    const seoDesc = (t.seo && t.seo.description) || '免费下载' + t.name;
    const downloadPath = t.downloadPath || '/assets/' + t.category + '/' + subdir + '.docx';
    const formatType = (t.format || 'DOCX').toUpperCase();
    const stats = t.stats || {views:0, downloads:0};
    const relatedGuide = t.relatedGuide || '';
    
    const faqHtml = content.faq.map(f=>'<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">'+f.q+'<span>▼</span></button><div class="faq-answer">'+f.a+'</div></div>').join('');
    const scenariosHtml = content.scenarios.map(s=>'<li><strong>'+s+'</strong></li>').join('');
    const tipsHtml = content.tips.map(tip=>'<li><strong>'+tip+'</strong></li>').join('');
    const mistakesHtml = content.mistakes.map(m=>'<li>'+m+'</li>').join('');
    const exampleHtml = '<div class="example-box"><pre>' + content.example + '</pre></div>';
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/'+relatedGuide+'" class="related-item">📖 查看教程 →</a></div>' : '';
    
    const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+seoTitle+'</title><meta name="description" content="'+seoDesc+'"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/'+dir+'"><meta property="og:title" content="'+seoTitle+'"><meta property="og:description" content="'+seoDesc+'"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/'+t.category+'">'+catName+'</a> / <span>'+t.name+'</span></div><div class="template-hero" style="background:'+gradient+'"><h1>'+icon+' '+t.name+'</h1><p>'+content.tagline+'</p><div class="template-actions"><a href="'+downloadPath+'" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\''+t.id+'\',\''+t.name.replace(/'/g,"\\'")+'\',\''+dir+'\',\''+icon+'\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 '+formatType+'</span><span>👁️ '+stats.views+' 浏览</span><span>📥 '+stats.downloads+' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>'+scenariosHtml+'</ul></div><div class="template-section"><h2>📝 填写示例</h2>'+exampleHtml+'</div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">'+tipsHtml+'</ul></div><div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">'+mistakesHtml+'</ul></div><div class="template-section"><h2>❓ 常见问题</h2>'+faqHtml+'</div>'+guideSection+'<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="'+t.id+'";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>';
    
    fs.writeFileSync(file, html);
    updated++;
});

console.log('Enhanced:', updated, 'template pages');