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

// 使用模板名称生成独特内容
function generateContent(templateId, category, templateName) {
    // 基于模板ID和名称生成独特内容
    const uniqueId = templateId + '_' + Date.now();
    
    // 分类的通用场景
    const categoryScenarios = {
        resume: ['求职申请', '职场晋升', '简历优化', '面试准备'],
        budget: ['财务管理', '预算规划', '收支记录', '理财规划'],
        ppt: ['商务演示', '会议汇报', '培训教学', '演讲展示'],
        'project-plan': ['项目管理', '团队协作', '进度追踪', '规划执行'],
        'daily-report': ['工作汇报', '任务追踪', '团队协同', '自我管理'],
        okr: ['目标管理', '绩效评估', '团队对齐', '自我提升'],
        'meeting-minutes': ['会议记录', '决策追踪', '任务派发', '沟通协作'],
        'sales-followup': ['客户管理', '销售跟进', '商机追踪', '业绩提升'],
        'expense-tracking': ['个人记账', '家庭理财', '报销管理', '预算控制']
    };
    
    // 每个模板的独特使用场景
    const uniqueScenarios = {
        'classic-resume': ['国企申请', '事业单位', '传统行业', '管理培训生'],
        'modern-resume': ['互联网企业', '创意公司', '海归求职', '科技公司'],
        'developer-resume': ['软件工程师', '后端开发', '前端工程师', '全栈工程师'],
        'designer-resume': ['UI设计', '视觉设计', '品牌设计', '插画设计'],
        'pm-resume': ['产品经理', '项目经理', '产品负责人', '产品规划'],
        'teacher-resume': ['教师招聘', '学校申请', '培训讲师', '教育管理'],
        'simple-resume': ['应届生', '实习申请', '初级岗位', '跨行转型'],
        'two-column-resume': ['资深职场', '管理岗位', '外企求职', '高管申请'],
        'single-column-resume': ['国企申请', '传统行业', '体制内', '正式岗位'],
        'fresh-graduate-resume': ['校园招聘', '应届求职', '管培生', '校招申请'],
        'intern-resume': ['实习申请', '在校学生', '暑期实习', '兼职申请'],
        'english-resume': ['外企求职', '海外工作', '留学申请', '国际岗位'],
        'nurse-resume': ['护士招聘', '医疗行业', '医院申请', '护理岗位'],
        'accountant-resume': ['财务岗位', '会计工作', '审计工作', '金融行业'],
        'sales-resume': ['销售岗位', '业务拓展', '客户管理', '业绩导向'],
        'monthly-budget': ['月光族', '年轻人理财', '个人记账', '收支管理'],
        'annual-budget': ['企业预算', '家庭规划', '年度财务', '投资规划'],
        'household-budget': ['家庭财务', '夫妻共同', '子女教育', '养老规划'],
        'project-budget': ['项目管理', '活动策划', '研发预算', '成本控制'],
        'department-budget': ['部门管理', '企业预算', '成本控制', '资源分配'],
        'wedding-budget': ['婚礼筹备', '新婚规划', '结婚预算', '婚纱摄影'],
        'travel-budget': ['旅行规划', '自助游', '出国旅行', '穷游攻略'],
        'renovation-budget': ['房屋装修', '新房布置', '旧房改造', '办公室装修'],
        'student-budget': ['学生理财', '生活费规划', '省钱攻略', '理财入门'],
        'investment-budget': ['投资理财', '基金股票', '资产配置', '财务自由'],
        'business-ppt': ['商业提案', '方案汇报', '年度总结', '商务演讲'],
        'meeting-ppt': ['会议演示', '例会汇报', '周会月会', '工作协调'],
        'plan-ppt': ['项目计划', '商业计划', '产品规划', '战略规划'],
        'training-ppt': ['企业培训', '技能培训', '教学演示', '课程开发'],
        'marketing-ppt': ['营销策划', '推广方案', '市场分析', '品牌营销'],
        'product-ppt': ['产品介绍', '产品规划', '需求评审', '产品展示'],
        'proposal-ppt': ['商务提案', '合作方案', '招标投标', '项目提案'],
        'resume-ppt': ['求职面试', '述职报告', '晋升答辩', '个人展示'],
        'agile-plan': ['敏捷开发', 'Scrum', '互联网项目', '快速迭代'],
        'waterfall-plan': ['传统项目', '大型工程', '政府项目', '阶段管理'],
        'startup-plan': ['创业计划', '融资路演', '商业计划', '创业大赛'],
        'product-plan': ['产品路线', '产品规划', '年度计划', '战略分解'],
        'marketing-plan': ['营销计划', '推广策略', '市场拓展', '增长计划'],
        'rnd-plan': ['研发计划', '技术创新', '产品开发', '技术规划'],
        'event-plan': ['活动策划', '展会会议', '品牌活动', '执行方案'],
        'it-plan': ['IT规划', '数字化转型', '系统建设', '技术架构'],
        'daily-report-template': ['日常工作', '任务记录', '每日复盘', '工作追踪'],
        'weekly-report-template': ['周度总结', '工作复盘', '团队同步', '进度汇报'],
        'monthly-report-template': ['月度总结', '绩效汇报', 'OKR复盘', '工作复盘'],
        'project-weekly-report': ['项目周报', '进度汇报', '风险管理', '里程碑追踪'],
        'sales-daily-report': ['销售日报', '客户跟进', '业绩追踪', '商机管理'],
        'operations-daily-report': ['运营日报', '数据分析', '活动追踪', '用户运营'],
        'customer-service-report': ['客服日报', '问题追踪', '满意度分析', '服务质量'],
        'admin-daily-report': ['行政日报', '后勤管理', '采购管理', '日常协调'],
        'company-okr': ['公司战略', '年度目标', '组织对齐', '绩效管理'],
        'department-okr': ['部门目标', '团队OKR', '跨部协作', '资源协调'],
        'personal-okr': ['个人发展', '职业规划', '自我管理', '目标追踪'],
        'team-okr': ['团队目标', '协作对齐', '集体绩效', '方向一致'],
        'sales-okr': ['销售目标', '业绩达成', '客户开拓', '团队管理'],
        'standard-minutes': ['标准会议', '常规会议', '例会纪要', '讨论记录'],
        'executive-minutes': ['高管会议', '董事会', '决策会议', '战略讨论'],
        'project-meeting-minutes': ['项目会议', '技术评审', '进度同步', '问题讨论'],
        'sales-meeting-minutes': ['销售会议', '业务讨论', '客户沟通', '业绩分析'],
        'training-meeting-minutes': ['培训会议', '教学研讨', '课程讨论', '学习交流'],
        'crm-sales-followup': ['CRM客户管理', '客户关系', '销售系统', '客户数据'],
        'sales-followup-template': ['销售跟进', '客户记录', '商机跟进', '销售管理'],
        'potential-customer-table': ['潜在客户', '商机管理', '客户开发', '销售漏斗'],
        'contract-tracking-table': ['合同追踪', '合同管理', '履约跟踪', '法务管理'],
        'expense-tracking-simple': ['简单记账', '入门级', '基础记账', '新手记账'],
        'household-expense': ['家庭支出', '日常花费', '家庭账本', '主妇记账'],
        'reimbursement-table': ['报销管理', '差旅报销', '费用报销', '财务报销']
    };
    
    const scenarios = uniqueScenarios[templateId] || categoryScenarios[category] || ['日常工作'];
    
    // 独特FAQ - 每个模板3个独特问题
    const faqsByTemplate = {
        'classic-resume': [
            {q: '经典简历和现代简历有什么区别？', a: '经典简历排版传统正式，适合国企和传统行业；现代简历设计感强，适合互联网和创意行业。根据目标行业选择。'},
            {q: '简历照片应该用什么底色？', a: '建议白色或蓝色背景，红色太过喜庆不够专业。证件照要有亲和力但不失专业。'},
            {q: '工作经历需要从第一份工作写起吗？', a: '不需要，从最近一份工作开始写，保留最近3-5段即可。过于久远的工作可以合并或省略。'}
        ],
        'developer-resume': [
            {q: '技术简历需要写自我评价吗？', a: '不需要！技术简历看重技能和项目经历，自我评价容易显得空洞且占篇幅。直接展示你的代码和项目。'},
            {q: 'GitHub没有内容怎么办？', a: '可以参与开源项目、刷算法题并记录、写技术博客、或者做一个个人项目。不要空白，一个完整的项目胜过什么都没有。'},
            {q: '面试时问到简历上没写的内容怎么办？', a: '诚实回答，不要装懂。可以说这个领域我不熟悉，但我的经验是XXX，把话题拉回你熟悉的领域。'}
        ],
        'teacher-resume': [
            {q: '教师资格证编号在哪里找？', a: '在教师资格证左下角有一串12位数字编号。也可以通过中国教师资格网查询。这是必填项。'},
            {q: '没有班主任经验怎么写？', a: '可以写课外活动指导、教研组工作、学生工作经历等。突出你与学生和家长沟通的能力。'},
            {q: '教学科研成果怎么写？', a: '论文写明发表期刊和时间、获奖项目写明奖项级别和颁发单位、课题写明是主持还是参与。'}
        ],
        'pm-resume': [
            {q: '转行做产品经理简历怎么突出？', a: '突出你的行业经验、业务理解能力、对产品工作的热情。可以写产品分析报告、竞品分析、或者独立完成的项目原型。'},
            {q: '产品经理简历需要作品集吗？', a: '建议附上Axure原型链接、PRD文档案例、产品分析报告等。有作品比空口说能力有说服力。'},
            {q: 'B端和C端产品经理简历有什么区别？', a: 'B端侧重业务理解、解决方案、项目管理；C端侧重用户增长、数据分析、体验优化。简历要体现对应能力。'}
        ],
        'monthly-budget': [
            {q: '月光族怎么开始记账？', a: '从最简单的开始：每天睡前花1分钟记录当天花了多少钱。坚持一个月后，你就能看到钱到底花在哪里了。'},
            {q: '预算总是超支怎么办？', a: '分析超支原因：是预算定太高还是执行失控。如果预算合理，那就要分析哪些不该花的下次控制。'},
            {q: '记账APP和Excel哪个好？', a: '记账APP更方便，自动导入账单省时间。但Excel更灵活，可以做复杂分析。两者结合最好。'}
        ],
        'annual-budget': [
            {q: '年度预算需要细分到月吗？', a: '需要！年度预算是目标，月度预算是执行。没有月度分解的年度预算只是空想。'},
            {q: '年中发现预算不合理怎么办？', a: '可以调整，但全年目标不变。年中做一次预算复盘，优化后续月份的分配。'},
            {q: '家庭年度预算谁来管？', a: '建议夫妻共同管理，设置共同账户和个人零花钱账户。财务透明可以减少很多矛盾。'}
        ],
        'business-ppt': [
            {q: '商务PPT一般多少页？', a: '15-30页，取决于内容复杂度。10分钟演讲建议15页左右，20分钟演讲可以到25页。'},
            {q: '商务PPT用什么字体？', a: '标题用黑体或微软雅黑，正文用微软雅黑或宋体。避免太花哨的字体，保持专业感。'},
            {q: 'PPT需要动画吗？', a: '适度动画可以增加层次感，但不要用动画来讲重要内容。动画是辅助，不是主角。'}
        ],
        'agile-plan': [
            {q: '敏捷开发适合什么团队？', a: '需求不确定、需要快速迭代、团队规模5-15人、成员自驱力强的团队。大型传统团队慎用。'},
            {q: 'Sprint周期多长合适？', a: '常规2周。创业团队可以用1周以加快节奏。周期太长反馈慢，太短没有节奏感。'},
            {q: '每日站会说什么？', a: '三个问题：昨天做了什么？今天计划做什么？有什么阻碍？控制在15分钟以内。'}
        ],
        'daily-report-template': [
            {q: '工作日报什么时候写？', a: '建议下班前花5分钟写，趁记忆新鲜。如果太忙，第二天早上补写也行。'},
            {q: '日报需要写给领导看吗？', a: '根据公司文化定。有些公司需要邮件发送，有些只是记录。如果是给领导看，重点突出你的产出。'},
            {q: '临时任务太多怎么记录？', a: '在明日计划里标注优先级调整，说明临时插入了什么任务。领导看到也知道你的工作负荷变化。'}
        ],
        'company-okr': [
            {q: 'OKR和KPI哪个更好？', a: '没有绝对好坏，适用不同场景。OKR适合创新型组织，关注挑战和成长；KPI适合执行型组织，关注指标达成。'},
            {q: 'OKR评分谁来做？', a: '通常是自评+上级确认。评分不是绩效考核，是进步回顾。0.6-0.7是完成预期，不要追求1分。'},
            {q: 'OKR需要所有人都写吗？', a: '管理层必须写，核心员工建议写。不需要全员写，但要让所有人知道公司的OKR。'}
        ]
    };
    
    const faq = faqsByTemplate[templateId] || [
        {q: '这个模板适合什么场景使用？', a: '根据模板类型，适用于相应的场景。模板设计符合行业最佳实践，可以直接下载使用。'},
        {q: '模板需要收费吗？', a: '完全免费，可以直接下载使用。请勿二次销售模板。'},
        {q: '可以自定义修改吗？', a: '可以，下载后用Word或Excel打开即可修改内容和格式。'}
    ];
    
    // 独特填写示例
    const examplesByTemplate = {
        'classic-resume': '个人信息\n姓名：王小明 | 手机：138-xxxx-xxxx | 邮箱：wangxm@email.com\n\n教育背景\n2020-2024 清华大学 经济管理学院 本科\nGPA：3.8/4.0 | 荣誉：校级三好学生\n\n实习经历\n2023.06-2023.09 字节跳动 产品运营实习生\n• 负责创作者社群运营，成员增长120%\n• 策划运营活动2场，参与用户5万+\n\n技能证书\n• 语言：英语六级 580分\n• 技能：Python、Axure原型设计',
        'developer-resume': '个人信息\n张伟 | Java后端工程师 | 4年经验\nGitHub：github.com/zhangwei | 技术博客：zhangwei.tech\n\n技术栈\n后端：Java/SpringBoot/MySQL | 架构：Docker/K8s | 工具：Git/Jenkins\n\n工作经历\n2020-至今 阿里巴巴 高级Java开发\n• 负责订单系统，日订单处理100万+\n• 重构库存系统，接口响应从200ms降至50ms\n\n项目：秒杀系统\n• 使用Redis集群支撑双十一峰值流量\n• QPS支持10万+，成功率99.9%',
        'pm-resume': '个人信息\n刘强 | 产品经理 | 6年经验\n公众号：产品大玩家 | 邮箱：liuqang@email.com\n\n工作经历\n2021-至今 腾讯 PCG高级产品经理\n• 负责QQ小程序平台，DAU增长25%\n• 推动商家入驻项目，商家数增长150%\n\n项目经验\nQQ小程序开放平台 0-1建设\n• 完成产品架构，支持50+垂直类目\n• 接入开发者3000+，月活过万',
        'teacher-resume': '个人信息\n王芳 | 高中数学教师 | 8年教龄\n教师资格证：高中数学 编号2020XXXX\n\n教育背景\n2010-2014 北京师范大学 数学与应用数学 本科\n2014-2016 北师大 数学教育 硕士\n\n教学成果\n• 所带班级高考数学平均分提升15分\n• 指导学生获省级数学竞赛一等奖\n• 连续3年获得校级优秀教师\n\n班主任经验\n2018-2024 连续6年班主任，升学率95%+',
        'monthly-budget': '2024年6月预算规划\n\n收入：\n工资：18,000元\n奖金：3,000元\n副业：2,000元\n合计：23,000元\n\n支出：\n房租：4,500元\n餐饮：2,500元\n交通：600元\n购物：1,500元\n娱乐：500元\n储蓄：13,400元\n合计：23,000元\n\n本月目标储蓄率：58%',
        'annual-budget': '2024年度财务规划\n\n年度收入：280,000元\n年度支出：180,000元\n年度储蓄目标：100,000元\n\n季度分解：\nQ1：收入65,000/支出48,000/结余17,000\nQ2：收入70,000/支出42,000/结余28,000\nQ3：收入70,000/支出45,000/结余25,000\nQ4：收入75,000/支出45,000/结余30,000\n\n大型支出：旅行15,000/装修30,000',
        'business-ppt': '目录\n1. 公司简介与业务概览\n2. 市场分析与机会\n3. 解决方案与优势\n4. 商业模式与盈利\n5. 团队与资源\n6. 融资需求与退出\n\n内容页示例（市场分析）\n行业规模：2023年5000亿元，年增长率15%\n目标市场：一线城市2000亿，新一线1500亿\n用户画像：25-35岁白领，月收入8000-15000元',
        'agile-plan': '敏捷开发计划\n\n项目：APP 2.0迭代开发\n周期：3个月（12周）\n团队：10人 | 模式：Scrum 2周Sprint\n\nSprint规划：\nSprint 1（1-2周）：基础框架+用户认证\nSprint 2（3-4周）：核心功能开发\nSprint 3-4（5-8周）：业务功能完善\nSprint 5-6（9-12周）：测试优化+发布\n\n每日站会：每天10点，15分钟',
        'daily-report-template': '日期：2024.6.15\n\n今日完成：\n1. 完成用户调研报告初稿\n2. 参加产品评审会议\n3. 修复线上Bug #1234\n\n明日计划：\n1. 修改调研报告\n2. 跟进开发进度\n\n遇到问题：\nUI设计稿延期，需要协调资源\n\n工作时长：8h',
        'company-okr': '公司OKR 2024年\n\n愿景：成为最受尊敬的职场社交平台\n\nO1：打造行业领先的社交产品\nKR1：MAU突破5000万（当前3000万）\nKR2：用户满意度达到90%\nKR3：NPS达到60\n\nO2：建立高效组织能力\nKR1：人效提升30%\nKR2：关键岗位人才密度80%\nKR3：员工满意度达到85%\n\nO3：实现可持续商业增长\nKR1：年收入突破5亿（当前3亿）\nKR2：毛利率提升至75%'
    };
    
    const example = examplesByTemplate[templateId] || `${templateName}填写示例\n\n请根据实际情况填写对应内容...\n\n基础信息：姓名、日期、分类等\n具体内容：根据模板类型填写\n备注说明：补充信息和注意事项`;
    
    // 独特技巧
    const tipsByCategory = {
        resume: ['量化成果用数字展示', '保持格式统一专业', '针对岗位定制简历', '定期更新简历内容'],
        budget: ['养成记录收支的习惯', '区分必要和欲望支出', '定期复盘调整计划', '建立储蓄目标'],
        ppt: ['每页不超过6行内容', '用图表代替文字', '提前排练把控时间', '统一配色和字体'],
        'project-plan': ['分解任务到可执行', '设置明确里程碑', '预留缓冲应对变化', '定期同步进度'],
        'daily-report': ['记录关键任务成果', '提前规划次日工作', '如实反馈问题阻塞', '简洁不需要流水账'],
        okr: ['目标有挑战性可实现', 'KR要可量化可评估', '公开透明全公司可见', '定期回顾调整'],
        'meeting-minutes': ['会前确认议程参会人', '记录决策和待办任务', '48小时内发出纪要', '明确责任人和截止'],
        'sales-followup': ['每次跟进后记录要点', '设置下次跟进提醒', '分析未成单原因', '关注决策链关键人'],
        'expense-tracking': ['随手记录不遗漏', '分类统计找超支', '区分必要和欲望支出', '月末复盘调整']
    };
    
    const tips = tipsByCategory[category] || ['保持简洁清晰', '突出重点信息', '定期检查更新'];
    
    // 独特错误
    const mistakesByCategory = {
        resume: ['使用花哨字体超过2种', '联系方式遗漏或错误', '工作经历缺乏数据', '错别字格式不统一'],
        budget: ['预算过于理想化', '忽略小额累积效应', '不记录导致失控', '应急情况无准备'],
        ppt: ['文字堆砌没有重点', '配色过于花哨', '字体大小不统一', '动画喧宾夺主'],
        'project-plan': ['任务分解不够细', '忽略依赖和冲突', '时间估计过于乐观', '计划与实际脱节'],
        'daily-report': ['写成流水账无重点', '只记录不反思', '隐瞒问题和风险', '格式不统一'],
        okr: ['目标过于保守', 'KR无法量化', 'OKR与工作脱节', '只设不跟踪'],
        'meeting-minutes': ['只记讨论不记结论', '待办无明确负责人', '纪要发出不及时', '后续不了了之'],
        'sales-followup': ['跟进记录不完整', '长时间不联系客户', '不了解真实需求', '忽略售后管理'],
        'expense-tracking': ['嫌麻烦不记录', '只记大额忽略小钱', '不分类不知花哪', '记完不看分析']
    };
    
    const mistakes = mistakesByCategory[category] || ['信息不完整', '格式不统一', '缺乏关键细节'];
    
    return {
        name: templateName,
        tagline: `专业${templateName}，适合${scenarios.join('、')}`,
        scenarios: scenarios,
        example: example,
        tips: tips,
        mistakes: mistakes,
        faq: faq
    };
}

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
    
    const content = generateContent(t.id, t.category, t.name);
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

console.log('Generated unique content for:', updated, 'template pages');
