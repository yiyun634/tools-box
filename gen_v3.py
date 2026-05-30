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

const catNames = {resume:'简历模板',budget:'Excel预算表',ppt:'PPT模板','project-plan':'项目计划书','daily-report':'工作日报',okr:'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'};
const gradients = {resume:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',budget:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',ppt:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','project-plan':'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','daily-report':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',okr:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)','meeting-minutes':'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','sales-followup':'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)','expense-tracking':'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'};
const icons = {resume:'📝',budget:'📊',ppt:'📑','project-plan':'📋','daily-report':'📅',okr:'🎯','meeting-minutes':'📝','sales-followup':'📈','expense-tracking':'💰'};

// 每个模板的详细独特内容
const TEMPLATE_CONTENT = {
    // ========== 简历模板 (16个) ==========
    'classic-resume': {
        tagline: '传统经典排版，适合大多数职位申请。正规稳重，永不出错。',
        scenarios: ['国企/事业单位申请', '校招/社招通用', '管理培训生申请', '传统行业岗位'],
        example: `个人信息\n姓名：王小明 | 手机：138-xxxx-xxxx | 邮箱：wangxiaoming@email.com\n现居地：上海 | 政治面貌：中共党员\n\n教育背景\n2020-2024 清华大学 经济管理学院 本科\n主修：工商管理 | GPA：3.8/4.0（专业前10%）\n荣誉：校级三好学生（3次）、学业优秀奖学金（2次）\n\n实习经历\n2023.06-2023.09 字节跳动 产品运营实习生\n• 负责抖音创作者社群运营，制定运营策略，成员从5万增长至12万（+140%）\n• 策划并执行「创作者激励计划」，带动优质内容产出提升60%\n• 策划运营活动2场，参与用户累计超过5万人次\n\n2022.07-2022.09 京东集团 市场部实习生\n• 协助策划618营销活动方案，活动曝光量提升40%\n\n校园经历\n2021-2023 学生会外联部部长\n• 统筹组织校级活动10场，累计参与人数超过1万人\n• 拉取赞助累计5万元\n\n技能证书\n• 语言：英语六级 580分、日语N3\n• 技能：Python数据分析、Axure原型设计、SQL查询`,
        tips: ['联系方式放在顶部显眼位置，格式保持统一', '教育背景按时间倒序，先写最高学历', '工作经历用STAR法则描述：情境、任务、行动、结果', '量化成果用具体数字展示，如提升140%、增长60%', '控制在1-2页内，内容精简重点突出', '不同岗位申请建议准备多个版本，针对性调整'],
        mistakes: ['使用超过2种字体颜色或过于花哨的模板', '联系方式遗漏或格式错误（如手机号少写一位）', '工作经历过于笼统，缺乏具体工作内容和数据', '出现错别字、标点符号不统一、日期格式混乱'],
        faq: [
            {q: '经典简历适合哪些岗位申请？', a: '经典简历适用于国企、事业单位、传统行业（如金融、制造）、管理培训生等正式岗位。排版简洁大方，注重内容呈现，不会因为风格问题被淘汰。如果你申请的是公务员、国企、央企、大型企业，经典简历是最佳选择。'},
            {q: '简历需要放照片吗？国内和国外有区别吗？', a: '国内求职建议附上照片，使用证件照或职业照，避免浓妆艳抹或过度修图的照片。建议白色或蓝色背景。欧美企业通常不需要照片，甚至有些外企明确要求不要放照片，因为担心涉及歧视问题。如果你同时投递国内外企业，可以准备两个版本。'},
            {q: '没有工作经验的应届生怎么写简历？', a: '应届生应该突出实习经历、校园经历、项目经验、课程项目等。重点展示学习能力、沟通能力、团队协作、抗压能力等软技能。用数据说明你的贡献，比如在实习中完成了什么、带来了什么价值。没有工作经验不是问题，关键是你如何展示自己的潜力。'}
        ],
        module1: '💼 岗位适配建议\n✅ 适合国企、事业单位、传统行业、管理培训生\n✅ 建议配合正式正装照片使用\n✅ 可以根据目标岗位调整简历侧重点\n✅ 突出教育背景和学历层次\n✅ 展示稳定性和职业规划\n✅ 使用传统排版，避免过于创意',
        module2: '🎯 面试官关注重点\n🎯 学历背景和毕业院校层次\n🎯 实习经历的具体工作内容\n🎯 校园活动和领导力经历\n🎯 沟通表达能力和举止仪表\n🎯 简历的整体呈现和专业度\n🎯 对企业和岗位的了解程度'
    },
    'developer-resume': {
        tagline: '技术导向设计，突出编程能力和项目经验，让面试官快速判断技术匹配度。',
        scenarios: ['互联网公司开发岗', 'IT/软件企业', '技术管培生', '外资科技公司'],
        example: `个人信息\n张伟 | Java后端工程师 | 4年开发经验\nGitHub：github.com/zhangwei | 技术博客：zhangwei.tech\n\n技术栈\n后端：Java/SpringBoot/Go | 数据库：MySQL/Redis/PostgreSQL\n架构：Docker/K8s微服务 | 工具：Git/Maven/Jenkins\n\n工作经历\n2020-至今 阿里巴巴 高级Java开发工程师\n• 负责电商平台订单系统设计，日订单处理100万+\n• 重构库存系统，接口响应时间从200ms降至50ms\n• 秒杀系统支撑双十一峰值10万QPS，成功率99.9%\n\n项目经验\n2023 秒杀系统（负责人）\n• Redis集群+消息队列，峰值处理能力提升10倍\n• QPS支持10万+，下单成功率99.9%`,
        tips: ['技术栈放在显眼位置，分层展示（语言、框架、数据库、工具等）', '项目描述要突出技术难点和解决方案，不只是做什么而是怎么做', '用数字量化成果：QPS、延迟、覆盖率、增长百分比等', '附上GitHub和技术博客链接，展示技术热情和持续学习能力', '写明参与的架构设计和技术决策，不只是执行者', '面试前准备好项目细节，能详细解释技术选型原因'],
        mistakes: ['堆砌技术名词但没有实际应用场景和成果', '项目描述过于笼统，只说做了什么但不说怎么做的、带来什么价值', '忽略系统设计能力的展示，只关注CRUD', '技术栈与目标岗位要求不匹配'],
        faq: [
            {q: '程序员简历需要写期望薪资吗？', a: '建议写面议或写一个范围（如25-35K），让HR主动联系时有谈判空间。写太高可能直接被筛选掉，写太低会让自己很被动。如果是校招或实习，通常没有谈薪空间，可以不写。'},
            {q: '没有开源项目、没有技术博客怎么办？', a: '可以自己实现小工具并开源、参与开源社区贡献、写技术博客记录学习历程、做个人项目。不要一片空白，要有至少一个能展示你代码风格和思考能力的项目。'},
            {q: '项目太技术化，面试官不是技术出身听不懂怎么办？', a: '先用一个非技术人员能理解的语言描述你解决了什么问题、带来了什么价值（比如「系统处理速度提升了3倍」），然后再展开技术细节。'}
        ],
        module1: '💼 岗位适配建议\n✅ 适合IT/软件/互联网公司技术岗位\n✅ 技术栈要针对目标公司做定制化调整\n✅ 建议附上GitHub和技术博客链接\n✅ 突出项目经验和技术深度\n✅ 展示解决复杂问题的能力\n✅ 量化技术成果（性能提升X%、支撑X用户）',
        module2: '🎯 面试官关注重点\n🎯 技术栈与岗位匹配度\n🎯 项目经验的技术深度\n🎯 问题解决能力和思路\n🎯 编码习惯和代码质量\n🎯 系统设计能力\n🎯 学习能力和技术热情'
    },
    'modern-resume': {
        tagline: '时尚简约设计，适合互联网和创意行业。让作品集说话，让设计能力一目了然。',
        scenarios: ['互联网大厂', '科技公司', '创意设计岗位', '海归求职者'],
        example: `个人信息\n李思思 | 产品设计师 | 3年经验\nPortfolio：dribbble.com/lisisisi | 邮箱：lisisisi.design@email.com\n\n教育背景\n2018-2022 伦敦艺术大学 视觉传达设计 硕士\n\n工作经历\n2022-至今 字节跳动 UI设计师\n• 负责抖音APP核心页面设计，日活用户提升15%\n• 建立设计组件库，覆盖80%的产品界面\n\n技能：Figma / Sketch / Principle / After Effects`,
        tips: ['作品集链接是必须的！选择最优秀的3-5个作品展示', '设计风格要与申请岗位和公司匹配，不要一份简历投所有', '突出创意能力和审美水平，展示独特的设计视角', '保持版面的呼吸感和层次感，不要过于拥挤', '展示设计思路和解决问题的方法，不只是最终效果'],
        mistakes: ['缺少作品集链接或链接失效，面试官无法评估设计能力', '设计风格过于浮夸不够专业，显得不够成熟', '动画效果喧宾夺主，影响信息读取和理解'],
        faq: [
            {q: '现代简历适合什么行业和公司？', a: '互联网、科技、创意设计、媒体广告、游戏等新兴行业更适合。扁平化、渐变色、卡片式设计是互联网风格。国企、传统企业、四大会计师事务所等，过于现代化的简历反而显得不够稳重，要慎用。'},
            {q: '可以添加作品集链接吗？在哪里放？', a: '必须添加！设计类岗位一定要附上作品集链接。建议放在简历最顶部个人信息区域、Dribbble/Behance/个人网站链接都可以。确保链接可直接访问。'}
        ],
        module1: '💼 岗位适配建议\n✅ 适合互联网、科技、创意设计、媒体广告\n✅ 建议附上作品集链接(Dribbble/Behance)\n✅ 可以使用互联网风格的设计元素\n✅ 突出创意能力和审美水平\n✅ 展示设计过程和思路',
        module2: '🎯 面试官关注重点\n🎯 作品集质量和风格匹配度\n🎯 设计工具掌握程度\n🎯 设计思维和方法论\n🎯 审美能力和创意水平\n🎯 沟通表达和团队协作'
    },
    'teacher-resume': {
        tagline: '专业稳重的设计，突出教学能力和教育背景，展示教书育人的专业形象。',
        scenarios: ['公办学校招聘', '私立学校申请', '培训机构', '教育管理岗位'],
        example: `个人信息\n王芳 | 高中数学教师 | 8年教龄\n教师资格证：高中数学 编号2020XXXX\n\n教育背景\n2010-2014 北京师范大学 数学与应用数学 本科\n2014-2016 北师大 数学教育 硕士\n\n教学成果\n• 所带班级高考数学平均分提升15分\n• 指导学生获省级数学竞赛一等奖\n• 连续3年获得校级优秀教师\n\n班主任经验\n2018-2024 连续6年班主任，升学率95%+`,
        tips: ['教师资格证编号是必须的，招聘单位必查', '量化教学成果和学生成绩提升，用数据说话', '突出班主任经历和管理能力，这是核心加分项', '展示教研能力和学术成果（论文、课题、教材）'],
        mistakes: ['未注明教师资格证编号和学科', '教学经历描述过于理论化，缺乏具体数据支撑', '忽略班主任经历和家校沟通能力'],
        faq: [
            {q: '非师范专业能当老师吗？', a: '可以，但必须先考取教师资格证。简历中要突出学科专业性，强调教育相关培训、支教经历、对教育行业的热情。'},
            {q: '培训机构的教学经历怎么写？', a: '突出培训人次、学员满意度、课程研发能力、续报率等指标。展示教学能力而非销售能力。'}
        ],
        module1: '💼 岗位适配建议\n✅ 适合学校、培训机构、教育管理\n✅ 教师资格证编号必须标注\n✅ 突出班主任经历和教学成果\n✅ 展示教研能力和学术成果\n✅ 准备相关证书和荣誉证明',
        module2: '🎯 面试官关注重点\n🎯 教学成果和学生成绩提升数据\n🎯 班主任和管理经验\n🎯 教研能力和学术成果\n🎯 亲和力和表达沟通能力'
    },
    'pm-resume': {
        tagline: '逻辑清晰的设计，突出产品思维和数据能力，展示从需求到落地的全链路能力。',
        scenarios: ['互联网产品经理', '创业公司产品负责人', '产品管培生', '解决方案经理'],
        example: `个人信息\n刘强 | 产品经理 | 6年经验\n公众号：产品大玩家 | 邮箱：liuqang@email.com\n\n工作经历\n2021-至今 腾讯 PCG高级产品经理\n• 负责QQ小程序平台，DAU增长25%\n• 推动商家入驻项目，商家数增长150%\n\n项目经验\nQQ小程序开放平台 0-1建设\n• 完成产品架构，支持50+垂直类目\n• 接入开发者3000+，月活过万`,
        tips: ['突出产品成果，用数据和用户规模证明能力', '展示0-1产品经验和项目推进能力', '体现产品方法论和用户思维', '可以写公众号或博客展示产品思考'],
        mistakes: ['只描述功能没有体现产品价值', '项目经验过于流水账没有重点', '缺少数据支撑和产品思维'],
        faq: [
            {q: '转行做产品经理简历怎么写？', a: '突出你原有行业的业务理解能力，展示你对产品经理技能的自学经历，做过什么项目或作品。'},
            {q: 'B端产品和C端产品经理简历有什么区别？', a: 'C端侧重用户增长、数据分析、体验优化，B端侧重业务理解、解决方案、项目管理。简历要体现对应的能力特征。'}
        ],
        module1: '💼 岗位适配建议\n✅ 适合互联网产品经理、创业公司负责人\n✅ 突出产品成果和用户规模数据\n✅ 建议附上产品分析报告或原型链接\n✅ 展示跨部门协调和团队管理能力',
        module2: '🎯 面试官关注重点\n🎯 产品经验和用户规模\n🎯 数据分析能力证明\n🎯 跨部门协调和推动能力\n🎯 产品思维和方法论'
    },
    'simple-resume': {
        tagline: '极简风格设计，让内容说话。适合应届生和初级岗位。',
        scenarios: ['应届生申请', '实习申请', '跨行业转型', '要求简洁的岗位'],
        example: `个人信息\n赵阳 | 应届毕业生\n手机：138-xxxx-xxxx | 邮箱：zhaoyang@email.com\n\n教育背景\n2020-2024 浙江大学 计算机科学与技术 本科\n\n实习经历\n2023.07-2023.09 蚂蚁集团 软件开发实习生\n\n项目经验\n2023 校园二手交易平台\n• 使用SpringBoot开发后端API\n\n技能：Java / Python / MySQL / Git`,
        tips: ['只保留最关键的信息，不添加无关内容', '突出教育背景和实习/项目经验', '用简洁的语言描述，突出重点'],
        mistakes: ['添加过多无关的校园活动', '格式不统一显得不专业', '联系方式不完整或格式错误'],
        faq: [
            {q: '简洁简历适合什么人？', a: '适合应届生、初级岗位、跨行业转型者。不适合有丰富经验需要展示的人。'},
            {q: '内容太少会不会显得单薄？', a: '不会，内容精简但有实质更重要。与其堆砌无关经历，不如突出核心亮点。'}
        ],
        module1: '💼 岗位适配建议\n✅ 适合应届生、实习生、初级岗位\n✅ 内容精简，重点突出核心优势\n✅ 适合职位要求简洁的岗位\n✅ 突出学习能力和成长潜力',
        module2: '🎯 面试官关注重点\n🎯 学历背景和专业能力\n🎯 实习经历和项目经验\n🎯 学习能力和潜力\n🎯 态度和积极性'
    },
    // 其他16个简历模板用通用内容
    'two-column-resume': {
        tagline: '信息密度高，适合有丰富经历的求职者。',
        scenarios: ['资深职场人', '管理层申请', '外企求职', '需要展示多维度信息'],
        example: `个人信息\n陈明 | 10年经验 | 市场营销总监\n\n【左侧】技能：品牌策略、数字营销、团队管理\n【右侧】工作经历：2020-至今 宝洁 市场营销总监\n• 负责海飞丝品牌全年营销策略，GMV增长35%`,
        tips: ['左右分栏，左侧技能右侧经历', '突出与目标岗位相关的核心技能', '工作经历按时间倒序，量化成果'],
        mistakes: ['两栏内容分配不均', '字体大小不统一', '信息过密难以阅读'],
        faq: [{q: '双栏简历有什么优势？', a: '可以在有限空间内展示更多信息，适合有丰富经历的资深职场人。'}],
        module1: '💼 岗位适配建议\n✅ 适合资深职场人、管理层、外企\n✅ 信息密度高，可展示多方面经历\n✅ 适合有丰富背景需要同时展示的人',
        module2: '🎯 面试官关注重点\n🎯 管理层经验和业绩\n🎯 团队规模和业绩\n🎯 战略思维和规划能力'
    },
    'single-column-resume': {
        tagline: '经典单栏设计，适合传统行业和国企。',
        scenarios: ['国企申请', '事业单位', '传统行业', '体制内工作'],
        example: `个人信息\n李华 | 男 | 1998年生 | 北京\n手机：138-xxxx-xxxx | 邮箱：lihua@email.com\n政治面貌：中共党员 | 婚姻状况：未婚\n\n教育背景\n2016-2020 对外经济贸易大学 金融学 本科\n`,
        tips: ['个人信息完整，包括政治面貌、户籍等', '教育背景详细，写明GPA和荣誉', '校园经历突出学生干部经验'],
        mistakes: ['缺少政治面貌或党员身份未标注', '教育背景没有GPA和排名'],
        faq: [{q: '国企简历需要写政治面貌吗？', a: '需要，特别是党员要标注。'}],
        module1: '💼 岗位适配建议\n✅ 适合国企、传统行业、体制内\n✅ 信息清晰易读，正式规范\n✅ 适合需要快速筛选的HR',
        module2: '🎯 面试官关注重点\n🎯 政治面貌和党员身份\n🎯 学历背景和成绩\n🎯 学生干部经历'
    },
    'fresh-graduate-resume': {
        tagline: '针对应届生设计，突出学习和成长潜力。',
        scenarios: ['校招申请', '应届生求职', '管培生申请', '实习转正'],
        example: `个人信息\n王小明 | 23岁 | 2024届毕业生\n手机：138-xxxx-xxxx | 邮箱：wangxiaoming@email.com\n求职意向：产品经理 | 北京\n\n教育背景\n2020-2024 北京邮电大学 计算机科学与技术 本科`,
        tips: ['突出教育背景和GPA', '实习经历描述具体做了什么、学到什么', '项目经验展示实践能力', '校园经历体现综合素质'],
        mistakes: ['经历描述过于笼统没有具体工作', '缺少与岗位相关的能力证明'],
        faq: [{q: '应届生简历应该多长？', a: '建议1页，内容精简，重点突出。'}],
        module1: '💼 岗位适配建议\n✅ 适合校园招聘、应届生申请\n✅ 教育背景和GPA要突出\n✅ 实习和项目经验并重\n✅ 突出学习能力和成长潜力',
        module2: '🎯 面试官关注重点\n🎯 学历背景和专业成绩\n🎯 实习经历的具体工作\n🎯 项目经验和能力\n🎯 学习潜力'
    },
    'intern-resume': {
        tagline: '针对实习申请设计，轻量但有亮点。',
        scenarios: ['日常实习', '暑期实习', '寒假实习', '转正申请'],
        example: `个人信息\n张晓 | 21岁 | 北京邮电大学 在读本科生\n手机：139-xxxx-xxxx | 邮箱：zhangxiao@email.com\n可实习时间：6个月 | 每周可到岗4天`,
        tips: ['明确说明可实习时间和每周到岗天数', '突出学习能力和主动性', '项目经验展示技能应用'],
        mistakes: ['没有说明可实习时间', '经历描述没有体现学到什么'],
        faq: [{q: '实习生简历需要多详细？', a: '简洁为主，1页足够。重点展示学习能力、主动性、和与岗位相关的技能。'}],
        module1: '💼 岗位适配建议\n✅ 适合在校学生实习申请\n✅ 明确标注可实习时间和周期\n✅ 突出学习能力和积极性\n✅ 展示与岗位相关的技能',
        module2: '🎯 面试官关注重点\n🎯 可实习时间和周期\n🎯 学习能力和态度\n🎯 与岗位相关的技能\n🎯 时间安排'
    },
    'english-resume': {
        tagline: '全英文设计，适合外资企业和海外申请。',
        scenarios: ['外资企业', '海外工作', '留学生求职', '英文工作环境'],
        example: `Jane Wang\nPhone: +86 138-xxxx-xxxx | Email: janewang@email.com\nLinkedIn: linkedin.com/in/janewang\n\nEDUCATION\n2020-2022 Imperial College London\nMaster of Human-Computer Interaction | GPA: 3.8/4.0`,
        tips: ['使用英文母语格式，避免中式英语', '联系方式使用国际格式', '教育背景格式符合英美体系'],
        mistakes: ['直接翻译中文简历语法不通顺', '格式不符合英美习惯'],
        faq: [{q: '英文简历和中文简历格式一样吗？', a: '不完全一样。英文简历更简洁，通常不需要照片、出生日期、婚否等信息。'}],
        module1: '💼 岗位适配建议\n✅ 适合外资企业、海外工作岗位\n✅ 全英文格式，符合国际惯例\n✅ 可以不附照片\n✅ 突出英语能力和国际化经历',
        module2: '🎯 面试官关注重点\n🎯 英语能力和沟通水平\n🎯 国际视野和跨文化经验\n🎯 专业技能和业绩'
    },
    'nurse-resume': {
        tagline: '专业医疗背景设计，突出护理技能和临床经验。',
        scenarios: ['医院招聘', '诊所申请', '护理院校', '医疗管理'],
        example: `基本信息\n姓名：刘芳 | 学历：本科 | 工作年限：6年\n护士资格证：编号2020XXXXX | 职称：护师\n\n工作经历\n2020-至今 中山大学附属第一医院 急诊科护士\n• 日均接待患者50+，危重患者抢救成功率98%`,
        tips: ['护士资格证编号是必须的', '突出临床技能和急救经验', '量化工作成果如抢救成功率'],
        mistakes: ['未注明护士资格证编号和有效期', '技能描述过于笼统没有具体'],
        faq: [{q: '护士简历需要哪些证书？', a: '护士执业资格证是必须的，初级/中级职称证书根据岗位要求。'}],
        module1: '💼 岗位适配建议\n✅ 适合医院、诊所、医疗护理岗位\n✅ 护士资格证编号必须标注\n✅ 突出临床技能和急救经验\n✅ 展示患者安全相关经验',
        module2: '🎯 面试官关注重点\n🎯 护士资格证和职称\n🎯 临床技能和经验\n🎯 急救能力和应变能力\n🎯 沟通和服务意识'
    },
    'accountant-resume': {
        tagline: '严谨专业的设计，突出财务技能和资质。',
        scenarios: ['企业财务', '会计事务所', '金融机构', '审计岗位'],
        example: `个人信息\n陈静 | 财务经理 | 8年经验\n注册会计师（CPA）| 中级会计师\n\n工作经历\n2020-至今 阿里巴巴 财务经理\n• 负责电商板块月度结账，年处理凭证1万+张\n• 优化报销流程，审批效率提升40%`,
        tips: ['CPA、中级会计等证书要突出', '量化财务数据处理能力', '突出合规和审计经验'],
        mistakes: ['证书信息不完整或编号缺失', '财务数据描述过于专业难懂'],
        faq: [{q: '会计简历需要突出哪些证书？', a: 'CPA、中级会计、初级会计、税务师等。根据目标岗位选择重点证书。'}],
        module1: '💼 岗位适配建议\n✅ 适合企业财务、会计事务所、金融机构\n✅ 突出CPA、中级会计等专业证书\n✅ 量化财务工作成果\n✅ 展示合规和审计经验',
        module2: '🎯 面试官关注重点\n🎯 专业资格证CPA、中级会计\n🎯 财务系统使用能力\n🎯 数据分析和报表能力\n🎯 合规和风险意识'
    },
    'sales-resume': {
        tagline: '业绩导向的设计，让销售数字说话。',
        scenarios: ['B2B销售', '销售管理', '业务拓展', '客户成功'],
        example: `个人信息\n张强 | 销售总监 | 10年销售经验\n电话：136-xxxx-xxxx | 邮箱：zhangqiang@email.com | 上海\n\n关键业绩\n• 年销售额：5000万+（2023年）\n• 客户数量：管理50+重点客户，年贡献3000万`,
        tips: ['销售数字必须突出：销售额、增长率、完成率', '客户资源要具体：行业、客户名称、合作金额', '展示谈判和成交能力'],
        mistakes: ['业绩描述没有具体数字', '客户资源虚假夸张'],
        faq: [{q: '销售简历最重要的是什么？', a: '业绩数字！销售额、增长率、客户数量。用数据证明你的销售能力。'}],
        module1: '💼 岗位适配建议\n✅ 适合销售、业务拓展、客户管理\n✅ 用销售数字说话是关键\n✅ 展示客户资源和谈判能力\n✅ 突出业绩和成就',
        module2: '🎯 面试官关注重点\n🎯 销售业绩和完成率\n🎯 客户资源和关系\n🎯 谈判和成交能力\n🎯 抗压和韧性'
    },
    'creative-resume': {
        tagline: '创意设计，适合创意行业和设计师岗位。',
        scenarios: ['设计公司', '创意岗位', '广告公司', '品牌设计'],
        example: `个人信息\n创意满满 | 设计师 | 5年经验\n作品集：behance.net/chuangyi\n\n工作经历\n2020-至今 创意设计工作室 设计总监\n• 负责品牌视觉设计，客户包括多家500强企业`,
        tips: ['作品集是核心，必须提供链接', '选择3-5个代表性作品详细展示', '用数据和获奖证明设计价值'],
        mistakes: ['缺少作品集或作品集质量差', '展示大量商业项目但无设计说明'],
        faq: [{q: '设计师简历放多少作品合适？', a: '选择3-5个最具代表性的高质量作品，详细展示设计思路和成果。不要堆砌数量。'}],
        module1: '💼 岗位适配建议\n✅ 适合设计公司、创意岗位、广告公司\n✅ 作品集是核心，必须提供访问链接\n✅ 选择代表性作品展示\n✅ 突出创意能力和审美',
        module2: '🎯 面试官关注重点\n🎯 作品集质量和风格\n🎯 设计工具掌握程度\n🎯 创意能力和审美\n🎯 项目管理和团队协作'
    },
    'designer-resume': {
        tagline: '作品集导向设计，让设计能力一目了然。',
        scenarios: ['设计公司', '品牌方设计部', '互联网产品设计', '广告传媒公司'],
        example: `个人信息\n陈美玲 | 品牌视觉设计师 | 5年经验\n作品集：behance.net/chenmeiling | 小红书：设计美玲\n\n工作经历\n2021-至今 瑞幸咖啡 品牌设计师\n• 负责全线产品包装设计，爆品推出3款`,
        tips: ['作品集是核心，必须提供链接', '选择3-5个代表性作品详细展示', '用数据和获奖证明设计价值', '展示设计思路和解决问题的方法'],
        mistakes: ['缺少作品集或作品集质量差', '展示大量商业项目但无设计说明', '设计风格不统一显得不专业'],
        faq: [{q: '没有知名项目经历怎么办？', a: '可以展示个人作品、参加设计比赛、参与公益设计项目。关键是展示设计能力和潜力。'}],
        module1: '💼 岗位适配建议\n✅ 适合设计公司、品牌方、互联网产品设计\n✅ 作品集必须提供链接\n✅ 选择代表性作品详细展示\n✅ 突出设计思路和解决问题的方法',
        module2: '🎯 面试官关注重点\n🎯 作品集和设计能力\n🎯 设计工具掌握程度\n🎯 审美能力和创意水平\n🎯 沟通和团队协作'
    }
};

// 默认模板内容
const defaultTemplate = {
    tagline: '专业模板，适合相关场景使用。',
    scenarios: ['适用于日常工作', '职场应用', '效率提升'],
    example: '请根据实际情况填写对应内容...\n\n基础信息：姓名、日期、分类等\n具体内容：根据模板类型填写\n备注说明：补充信息',
    tips: ['保持简洁清晰，重点突出', '定期检查和更新', '针对不同场景调整'],
    mistakes: ['信息不完整', '格式不统一', '缺乏关键细节'],
    faq: [{q: '这个模板适合什么场景？', a: '根据模板类型，适用于相应的场景。'}],
    module1: '💼 使用场景\n✅ 适用于日常工作和生活场景\n✅ 可以根据实际需求调整\n✅ 模板设计符合行业最佳实践',
    module2: '🎯 核心要点\n🎯 保持简洁专业的呈现\n🎯 重点突出关键信息\n🎯 定期检查和更新'
};

function getTemplateContent(templateId) {
    return TEMPLATE_CONTENT[templateId] || defaultTemplate;
}

// 分类模块
const categoryModules = {
    resume: {
        module1: '💼 简历优化技巧\n📌 用Action Verb开头：负责、主导、完成、推动\n📌 量化成果：提升了X%、增长了X元、缩短了X天\n📌 使用行业关键词：通过ATS关键词筛选\n📌 定期更新：根据岗位定制简历内容',
        module2: '🎯 面试官关注重点\n🎯 与岗位相关的能力证明\n🎯 项目经验和成果数据\n🎯 学习能力和成长潜力\n🎯 沟通表达和团队协作'
    },
    budget: {
        module1: '📊 常用Excel公式\n📈 SUM求和：=SUM(B2:B30) 计算月度总支出\n📈 IF条件：=IF(B2>预算,"超支","正常") 预警超支\n📈 AVERAGE平均：=AVERAGE(B2:B30) 计算月均支出\n📈 VLOOKUP查找：自动匹配预算类别',
        module2: '💰 预算控制方法\n🔒 50-30-20法则：50%必要支出，30%可选，20%储蓄\n🔒 优先级排序：先保证必需支出\n🔒 准备应急基金：预留10%作为意外支出'
    },
    ppt: {
        module1: '📋 PPT结构设计\n📐 结论先行：先说结论再展开\n📐 逻辑清晰：背景-分析-结论\n📐 每页一个核心观点，用数据支撑\n📐 故事线：起承转合，引人入胜',
        module2: '🎨 视觉设计原则\n🎨 配色：专业色系，不超过3种主色\n🎨 字体：标题黑体，正文微软雅黑\n🎨 图片：高质量配图，与内容相关'
    },
    'project-plan': {
        module1: '📅 项目拆解方法\n📌 从大到小：从项目到阶段到任务\n📌 任务粒度：每个任务1-3天可完成\n📌 依赖识别：明确任务间的先后关系\n📌 资源匹配：确保人员和时间充足',
        module2: '⚠️ 风险控制方法\n🔍 风险识别：列出项目主要风险\n🔍 风险评估：概率高且影响大的优先关注\n🔍 应对计划：为每个重大风险准备应对方案'
    },
    okr: {
        module1: '🎯 OKR制定方法\n🎯 目标O：有挑战性、鼓舞人心、方向明确\n🎯 关键结果KR：可量化、可实现、有时限\n🎯 聚焦重点：每个周期聚焦3-5个核心目标\n🎯 公开透明：OKR要对团队可见',
        module2: '📈 OKR评分与复盘\n📈 评分标准：0.6-0.7完成预期，0.8-1.0超预期\n📈 季度评分：季度末进行评分和回顾\n📈 复盘内容：完成情况、经验教训、下期改进'
    },
    'daily-report': {
        module1: '📝 日报撰写方法\n📝 关键任务法：只记录最重要的3件事\n📝 数据说话：用数字量化工作成果\n📝 问题导向：重点记录遇到的问题和解决方案\n📝 简洁明了：控制在5行以内',
        module2: '⏰ 时间管理技巧\n⏰ 四象限法：按重要紧急程度分配时间\n⏰ 番茄工作法：25分钟专注工作，5分钟休息\n⏰ 批量处理：同类任务集中处理'
    },
    'sales-followup': {
        module1: '📋 客户管理流程\n📋 漏斗阶段：线索→意向→谈判→成交→服务\n📋 转化率追踪：每个阶段的转化率\n📋 时间节点：每个阶段的平均周期\n📋 异常预警：阶段停滞超预期提醒',
        module2: '💡 成交率提升技巧\n💡 需求挖掘：深入了解客户的真实需求\n💡 方案定制：根据客户需求提供定制方案\n💡 价值展示：让客户看到投入产出比'
    },
    'meeting-minutes': {
        module1: '📝 会议纪要要点\n📝 会议主题：明确讨论的核心问题\n📝 关键决策：记录达成的共识和决定\n📝 待办任务：明确责任人和截止时间\n📝 后续跟进：下次会议需要确认的内容',
        module2: '✅ 行动项跟踪\n✅ 明确责任：每个行动项落实到人\n✅ 设定截止：清楚的任务完成时间\n✅ 定期跟进：检查行动项执行情况'
    },
    'expense-tracking': {
        module1: '📊 记账方法\n📊 随手记录不遗漏\n📊 分类统计找超支\n📊 区分必要和欲望支出\n📊 月末复盘调整',
        module2: '💰 省钱技巧\n💰 记录每一笔支出\n💰 设置预算上限\n💰 定期检查进度\n💰 分析超支原因'
    }
};

let updated = 0;

templates.forEach(t => {
    const subdir = MAPPINGS[t.id];
    if (!subdir) return;
    
    const dir = '/root/tools-box/templates/' + t.category + '/' + subdir;
    const file = dir + '/index.html';
    if (!fs.existsSync(file)) return;
    
    const content = getTemplateContent(t.id);
    const catName = catNames[t.category] || t.category;
    const gradient = gradients[t.category] || gradients['resume'];
    const icon = icons[t.category] || '📄';
    
    const seoTitle = (t.seo && t.seo.title) || t.name + ' - 免费效率工具箱';
    const seoDesc = (t.seo && t.seo.description) || '免费下载' + t.name;
    const downloadPath = t.downloadPath || '/assets/' + t.category + '/' + subdir + '.docx';
    const formatType = (t.format || 'DOCX').toUpperCase();
    const stats = t.stats || {views:0, downloads:0};
    const relatedGuide = t.relatedGuide || '';
    
    // 基础内容
    const scenariosHtml = content.scenarios.map(s=>'<li><strong>'+s+'</strong></li>').join('');
    const tipsHtml = content.tips.map(t=>'<li><strong>'+t+'</strong></li>').join('');
    const mistakesHtml = content.mistakes.map(m=>'<li>'+m+'</li>').join('');
    const faqHtml = content.faq.map(f=>'<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">'+f.q+'<span>▼</span></button><div class="faq-answer">'+f.a+'</div></div>').join('');
    const exampleHtml = '<div class="example-box"><pre>' + content.example + '</pre></div>';
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/'+relatedGuide+'" class="related-item">📖 查看教程 →</a></div>' : '';
    
    // 获取分类模块
    const catMod = categoryModules[t.category] || categoryModules['resume'];
    
    // 构建HTML
    const module1Html = '<div class="template-section"><h2>' + (content.module1 ? content.module1.split('\n')[0] : catMod.module1.split('\n')[0]) + '</h2><div class="module-content"><pre>' + (content.module1 || catMod.module1) + '</pre></div></div>';
    const module2Html = '<div class="template-section"><h2>' + (content.module2 ? content.module2.split('\n')[0] : catMod.module2.split('\n')[0]) + '</h2><div class="module-content"><pre>' + (content.module2 || catMod.module2) + '</pre></div></div>';
    
    const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+seoTitle+'</title><meta name="description" content="'+seoDesc+'"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/'+dir+'"><meta property="og:title" content="'+seoTitle+'"><meta property="og:description" content="'+seoDesc+'"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/'+t.category+'">'+catName+'</a> / <span>'+t.name+'</span></div><div class="template-hero" style="background:'+gradient+'"><h1>'+icon+' '+t.name+'</h1><p>'+content.tagline+'</p><div class="template-actions"><a href="'+downloadPath+'" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\''+t.id+'\',\''+t.name.replace(/'/g,"\\'")+'\',\''+dir+'\',\''+icon+'\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 '+formatType+'</span><span>👁️ '+stats.views+' 浏览</span><span>📥 '+stats.downloads+' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>'+scenariosHtml+'</ul></div><div class="template-section"><h2>📝 填写示例</h2>'+exampleHtml+'</div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">'+tipsHtml+'</ul></div>' + module1Html + module2Html + '<div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">'+mistakesHtml+'</ul></div><div class="template-section"><h2>❓ 常见问题</h2>'+faqHtml+'</div>'+guideSection+'<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="'+t.id+'";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>';
    
    fs.writeFileSync(file, html);
    updated++;
});

console.log('Generated:', updated, 'enhanced template pages');
