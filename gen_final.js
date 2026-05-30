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

// 丰富的每个模板独特内容
const CONTENTS = {
    // 简历模板 - 每个都有独特内容
    'classic-resume': {
        tagline: '传统经典排版，适合大多数职位申请。正规稳重，永不出错。',
        scenarios: ['国企/事业单位申请', '校招/社招通用', '管理培训生申请', '传统行业岗位'],
        example: `个人信息\n姓名：王小明 | 手机：138-xxxx-xxxx | 邮箱：wangxiaoming@email.com\n现居地：上海 | 政治面貌：中共党员\n\n教育背景\n2020-2024 清华大学 经济管理学院 本科\n主修：工商管理 | GPA：3.8/4.0（专业前10%）\n荣誉：校级三好学生（3次）、学业优秀奖学金（2次）\n\n实习经历\n2023.06-2023.09 字节跳动 产品运营实习生\n• 负责抖音创作者社群运营，制定运营策略，成员从5万增长至12万（+140%）\n• 策划并执行「创作者激励计划」，带动优质内容产出提升60%\n• 策划运营活动2场，参与用户累计超过5万人次\n• 独立撰写运营报告，提出的优化建议被团队采纳\n\n2022.07-2022.09 京东集团 市场部实习生\n• 协助策划618营销活动方案，活动曝光量提升40%\n• 负责竞品数据收集与分析，输出竞品周报5份\n\n校园经历\n2021-2023 学生会外联部部长\n• 统筹组织校级活动10场，累计参与人数超过1万人\n• 拉取赞助累计5万元，物资赞助价值3万元\n• 带领团队从5人扩展至15人\n\n技能证书\n• 语言：英语六级 580分、日语N3\n• 技能：Python数据分析、Axure原型设计、SQL查询\n• 证书：初级会计师证、普通话二级甲等\n• Office：精通Excel、PowerPoint（曾获校级演示大赛二等奖）`,
        tips: [
            '联系方式放在顶部显眼位置，格式保持统一',
            '教育背景按时间倒序，先写最高学历',
            '工作经历用STAR法则描述：情境(Situation)、任务(Task)、行动(Action)、结果(Result)',
            '量化成果用具体数字展示，如提升140%、增长60%',
            '控制在1-2页内，内容精简重点突出',
            '不同岗位申请建议准备多个版本，针对性调整'
        ],
        mistakes: [
            '使用超过2种字体颜色或过于花哨的模板',
            '联系方式遗漏或格式错误（如手机号少写一位）',
            '工作经历过于笼统，缺乏具体工作内容和数据',
            '出现错别字、标点符号不统一、日期格式混乱',
            '使用生活照或过度美颜的照片作为证件照',
            '篇幅过长导致重要信息被淹没在后面'
        ],
        faq: [
            {q: '经典简历适合哪些岗位申请？', a: '经典简历适用于国企、事业单位、传统行业（如金融、制造）、管理培训生等正式岗位。排版简洁大方，注重内容呈现，不会因为风格问题被淘汰。如果你申请的是公务员、国企、央企、大型企业，经典简历是最佳选择。'},
            {q: '简历需要放照片吗？国内和国外有区别吗？', a: '国内求职建议附上照片，使用证件照或职业照，避免浓妆艳抹或过度修图的照片。建议白色或蓝色背景。欧美企业通常不需要照片，甚至有些外企明确要求不要放照片，因为担心涉及歧视问题。如果你同时投递国内外企业，可以准备两个版本。'},
            {q: '没有工作经验的应届生怎么写简历？', a: '应届生应该突出实习经历、校园经历、项目经验、课程项目等。重点展示学习能力、沟通能力、团队协作、抗压能力等软技能。用数据说明你的贡献，比如在实习中完成了什么、带来了什么价值。没有工作经验不是问题，关键是你如何展示自己的潜力。'},
            {q: '简历应该控制在几页？工作多少年应该几页？', a: '一般建议1-2页。应届生1页即可，有丰富经验的可适当延长至2页。工作10年以上的职场人可以做3页，但不要为了凑页数而添加无关内容。有些500强企业甚至要求即使是高管也只能1页。关键原则是：内容精简，重点突出。'}
        ]
    },
    'developer-resume': {
        tagline: '技术导向设计，突出编程能力和项目经验，让面试官快速判断技术匹配度。',
        scenarios: ['互联网公司开发岗', 'IT/软件企业', '技术管培生', '外资科技公司'],
        example: `个人信息\n张伟 | Java后端工程师 | 4年开发经验\nGitHub：github.com/zhangwei | 技术博客：zhangwei.tech | 邮箱：zhangwei.dev@email.com\n求职意向：高级开发工程师/技术专家 | 期望薪资：面议 | 地点：北京/上海\n\n技术栈\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n后端开发：Java/SpringBoot/Go | 数据库：MySQL/Redis/PostgreSQL/MongoDB\n架构设计：Docker/K8s微服务 | 消息队列：Kafka/RocketMQ\n工具链：Git/Maven/Jenkins/GitLab CI | 监控：Prometheus/Grafana\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n工作经历\n2020.03-至今 阿里巴巴 高级Java开发工程师\n• 负责电商平台订单系统设计与开发，日订单处理量超过100万单\n• 重构库存系统，采用Redis缓存+异步消息队列，接口响应时间从200ms降至50ms，性能提升75%\n• 设计和实现秒杀系统，支撑双十一峰值流量10万QPS，下单成功率99.9%\n• 搭建自动化测试框架，代码覆盖率达85%，线上Bug率下降60%\n• 主导技术方案评审，帮助3名 junior 工程师成长\n\n2018.07-2020.02 美团点评 Java开发工程师\n• 负责餐厅推荐系统后端开发，通过协同过滤算法优化，推荐准确率提升30%\n• 优化数据库查询，通过索引优化和SQL改写，数据库负载降低40%，慢查询减少80%\n• 参与订单系统微服务拆分，从单体应用拆分为15个微服务，提升系统可维护性\n\n项目经验\n2023.06-2023.09 秒杀系统设计与实现（负责人）\n技术方案：\n• 采用Redis集群+本地缓存两级缓存，降低热点数据压力\n• 使用RocketMQ异步下单，实现削峰填谷，峰值处理能力提升10倍\n• 实施多级限流策略（网关限流→服务限流→接口限流），保护系统稳定性\n\n成果：\n• 双十一当天支撑峰值流量10万QPS，下单成功率99.9%\n• 系统响应时间控制在50ms以内，秒杀成功率行业领先\n• 方案被团队作为后续活动系统参考模板\n\n2022.03-2022.06 用户画像系统（核心开发）\n技术方案：\n• 使用Spark进行海量用户数据处理，日处理数据量超过500GB\n• 构建用户标签体系，支持100+维度标签实时查询\n• 设计标签冷启动策略，解决新用户标签缺失问题\n\n开源贡献\n• GitHub Stars 3000+，维护的开源工具库累计下载量10万+\n• 贡献Spring生态开源项目，提交PR被合并3次\n• 在技术博客撰写原创文章15篇，累计阅读量5万+\n\n技能认证\n• Oracle Certified Professional Java SE 8 Programmer\n• Alibaba Cloud Certified Developer`,
        tips: [
            '技术栈放在显眼位置，分层展示（语言、框架、数据库、工具等）',
            '项目描述要突出技术难点和解决方案，不只是做什么而是怎么做',
            '用数字量化成果：QPS、延迟、覆盖率、增长百分比等',
            '附上GitHub和技术博客链接，展示技术热情和持续学习能力',
            '写明参与的架构设计和技术决策，不只是执行者',
            '面试前准备好项目细节，能详细解释技术选型原因'
        ],
        mistakes: [
            '堆砌技术名词但没有实际应用场景和成果',
            '项目描述过于笼统，只说做了什么但不说怎么做的、带来什么价值',
            '忽略系统设计能力的展示，只关注CRUD',
            '技术栈与目标岗位要求不匹配，投递后端岗列前端技术',
            'GitHub主页空空如也，没有任何项目或贡献',
            '面试时无法详细解释简历上写的技术点，被问住'
        ],
        faq: [
            {q: '程序员简历需要写期望薪资吗？', a: '建议写面议或写一个范围（如25-35K），让HR主动联系时有谈判空间。写太高可能直接被筛选掉，写太低会让自己很被动。如果是校招或实习，通常没有谈薪空间，可以不写。记住，简历是让面试官对你感兴趣的工具，不是薪资谈判的直接手段。'},
            {q: '没有开源项目、没有技术博客怎么办？', a: '可以自己实现小工具并开源、参与开源社区贡献（哪怕是改文档）、写技术博客记录学习历程、做个人项目（完整的小工具或网站）、刷算法题并记录在GitHub。不要一片空白，要有至少一个能展示你代码风格和思考能力的项目。面试官会通过GitHub判断你的编码习惯和 学习能力。'},
            {q: '项目太技术化，面试官不是技术出身听不懂怎么办？', a: '先用一个非技术人员能理解的语言描述你解决了什么问题、带来了什么价值（比如「系统处理速度提升了3倍」），然后再展开技术细节。可以加一句「技术实现细节面试时我可以详细展开」。关键是让面试官知道你解决了什么业务问题，不只是写了什么代码。'},
            {q: '学历一般（双非/专科）怎么弥补？', a: '突出项目经验的质量和数量、开源贡献、技术博客、大厂实习经历等。技术行业更看重实际能力，学历只是敲门砖。如果有985/211的背景会在初筛有优势，但最终能不能通过面试还是看技术实力。可以在简历中强调985/211但不要过分突出学历。'}
        ]
    },
    'teacher-resume': {
        tagline: '专业稳重的设计，突出教学能力和教育背景，展示教书育人的专业形象。',
        scenarios: ['公办学校招聘', '私立学校申请', '培训机构', '教育管理岗位'],
        example: `个人信息\n王芳 | 高中数学教师 | 8年教龄\n教师资格证：高中数学 编号：2020XXXXXXXX\n电话：139-xxxx-xxxx | 邮箱：wangfang@email.com | 现居：北京\n政治面貌：中共党员 | 婚姻状况：已婚\n\n教育背景\n2010.09-2014.06 北京师范大学 数学与应用数学 本科\n• GPA：3.9/4.0（专业排名前5%）\n• 荣誉：北京市优秀毕业生、校级三好学生（3次）\n\n2014.09-2016.06 北京师范大学 数学教育 硕士\n• 研究方向：数学教育心理学\n• 硕士论文获校级优秀论文\n\n教学成果\n📈 所带班级高考数学成绩：\n• 2023届高考数学平均分：128分（超年级平均15分）\n• 2022届高考数学最高分：147分\n• 所带班级本科上线率：保持在95%以上，位列年级前茅\n\n🏆 竞赛辅导成果：\n• 指导学生获省级数学竞赛一等奖2人、二等奖5人、三等奖8人\n• 获评省级数学竞赛优秀辅导员称号\n\n📚 教研成果：\n• 发表教学论文3篇，其中核心期刊1篇（《数学教育学报》）\n• 参与编写校本教材《高中数学思维训练》\n• 主持校级课题《基于核心素养的高中数学教学策略研究》\n\n🌟 荣誉表彰：\n• 2021、2022、2023连续3年获得校级「优秀教师」称号\n• 2022年获区级「教学能手」称号\n• 2023年获市级「优秀班主任」提名\n\n班主任经验\n2018.09-2024.06 连续6年担任班主任\n\n管理成果：\n• 所带班级2023届获省级「优秀班集体」称号\n• 班级凝聚力建设方案被学校作为优秀案例推广\n\n学生工作：\n• 擅长学生心理疏导，帮助15名学生走出学业困境\n• 建立家长沟通机制，家长满意度调查达97%以上\n• 组织的班会活动获校级优质班会一等奖2次\n\n专业发展\n• 2022年参加省级骨干教师培训，获「优秀学员」\n• 2021年获得心理健康教育教师资格证（C证）\n• 每年参加教学研讨会议，累计超过20场\n\n技能特长\n• 教学工具：希沃白板、几何画板、GeoGebra、数学试卷分析系统\n• 办公技能：精通Office、微信公众平台运营、钉钉教学管理\n• 语言：普通话一级乙等、日语N3（可进行简单会话）`,
        tips: [
            '教师资格证编号是必须的，招聘单位必查',
            '量化教学成果和学生成绩提升，用数据说话',
            '突出班主任经历和管理能力，这是核心加分项',
            '展示教研能力和学术成果（论文、课题、教材）',
            '家长沟通能力和学生心理健康知识是重要考察点',
            '持续学习证明（培训、证书、进修）体现专业态度'
        ],
        mistakes: [
            '未注明教师资格证编号和学科，招聘单位无法核实',
            '教学经历描述过于理论化，缺乏具体数据支撑',
            '忽略班主任经历和家校沟通能力，只写教学不提管理',
            '课外活动描述空洞不具体，没有展示综合素质',
            '未提及任何教研成果或专业发展，显得停滞不前',
            '用词过于主观（如「教学能力强」），缺少客观证据'
        ],
        faq: [
            {q: '非师范专业能当老师吗？', a: '可以，但必须先考取教师资格证。非师范专业的优势在于专业背景强（比如数学专业教数学），可以强调学科专业性。简历中要突出教育相关培训经历、支教经历、家教经验、对教育行业的热情和理解。面试时会被问为什么想当老师，要准备好回答。'},
            {q: '培训机构的教学经历怎么写？', a: '突出培训人次、学员满意度、课程研发能力、续报率等商业指标。展示你的教学能力（提分效果、学习方法）而不是销售能力。培训机构经验有时反而更能证明教学能力，因为续报率直接和学生成绩挂钩。'},
            {q: '没有教学经验（应届生）怎么办？', a: '可以写支教经历、家教经验、教育类实习经历、志愿者经历等。重点展示你对教学的理解和潜力，而非只看经验。可以写课程作业中的教学设计、模拟课堂经历、对教育热点问题的思考。试讲环节的表现比简历更重要。'},
            {q: '简历需要附上成绩单和证书复印件吗？', a: '校招通常需要提前准备原件或电子版。社招一般不需要，但可以准备以备不时之需。教师资格证是必附的，普通话等级证书、职称证书（如有）也可以附上。成绩单建议准备，个别学校招聘时会要求。'}
        ]
    },
    'pm-resume': {
        tagline: '逻辑清晰的设计，突出产品思维和数据能力，展示从需求到落地的全链路能力。',
        scenarios: ['互联网产品经理', '创业公司产品负责人', '产品管培生', '解决方案经理'],
        example: `个人信息\n刘强 | 产品经理 | 6年经验\n公众号：产品大玩家（粉丝5万+）| 博客：liuqang.com | 邮箱：liuqang@email.com\n现居：北京 | 期望职位：高级产品经理/产品总监\n\n教育背景\n2014.09-2018.06 复旦大学 计算机科学与技术 本科\n• GPA：3.6/4.0，曾获校级奖学金\n\n工作经历\n2021.03-至今 腾讯 PCG 高级产品经理\n• 负责QQ小程序平台产品规划，直接汇报给P10总监\n• 核心成果：\n  - QQ小程序DAU从800万增长至2500万（+213%），推动平台生态繁荣\n  - 推动商家入驻项目，引入优质商家3000+，商家GMV增长150%\n  - 建立小程序数据指标体系，实现数据驱动决策，策略调整周期缩短50%\n\n2020.05-2021.02 字节跳动 产品经理\n• 负责抖音创作者工具产品，0-1搭建创作者服务体系\n• 核心成果：\n  - 用户满意度从72%提升至89%（+17pp）\n  - 创作者月活从100万增长至400万（+300%）\n  - 提出「创作者成长体系」概念，被公司作为其他产品线参考标准\n\n2018.07-2020.04 京东 产品专员→产品经理\n• 从校招生成长为主产品经理，负责订单履约流程优化\n• 核心成果：\n  - 优化订单履约流程，用户从下单到收货时长缩短12小时\n  - 独立负责「当日达」功能上线，当日达订单占比提升至35%\n\n项目经验\n2023.06-2024.01 QQ小程序开放平台 0-1 建设（负责人）\n\n产品规划：\n• 完成平台产品架构设计，支持50+垂直行业类目接入\n• 设计开发者入驻、分级运营、收益分配机制\n• 建立小程序审核标准和质量评估体系\n\n技术协同：\n• 与技术团队协作，完成底层架构升级，支持弹性扩缩容\n• 推动数据中台建设，实现小程序数据与腾讯系产品打通\n\n运营协同：\n• 设计运营工具和数据分析平台，降低商家运营成本30%\n• 建立开发者社群运营体系，举办线上线下活动10+场\n\n成果：\n• 上线8个月，接入开发者3000+，月活小程序突破1万\n• 入选公司年度创新项目Top10，获得专项奖励\n\n2022.03-2022.09 抖音创作者工具（0-1项目，负责人）\n\n用户研究：\n• 访谈100+创作者，梳理创作者全链路需求\n• 分析竞品（快手、B站、视频号）功能优劣势\n\n产品设计：\n• 设计创作者等级体系、收益分析、数据看板等核心功能\n• 输出PRD文档50+篇，通过技术评审20+次\n\n成果：\n• 功能上线后，创作者日均发布量提升40%\n• 获评字节跳动内部「年度最佳产品实践」案例\n\n技能认证\n• 产品经理认证：NPDP（新产品开发专业人士）\n• 数据分析：SQL熟练、Python数据分析实战项目\n• 工具：Axure RP 9（高级）、Figma、Visio、XMind\n\n行业观察\n• 公众号「产品大玩家」周更，分享产品思考和行业分析\n• 累计输出文章80+篇，关注用户5万+，阅读量100万+\n• 受邀参加人人都是产品经理大会演讲1次`,
        tips: [
            '突出产品成果，用数据和用户规模证明能力（如DAU增长、GMV提升）',
            '展示0-1产品经验和项目推进能力，这是高阶PM的核心',
            '体现产品方法论（用户研究、需求分析、数据驱动）和应用',
            '可以写公众号或博客展示产品思考，这是加分项',
            '展示跨部门协调和团队管理能力（如果有）',
            '准备一个完整的产品分析报告作为面试加分项'
        ],
        mistakes: [
            '只描述功能没有体现产品价值和业务影响',
            '项目经验过于流水账，没有突出你做了什么、带来了什么',
            '缺少数据支撑和产品思维，只有描述没有分析',
            '产品经理技能与目标岗位要求不匹配',
            '没有独立负责项目的经历，只有参与经历',
            '作品集链接失效或内容与简历描述不符'
        ],
        faq: [
            {q: '转行做产品经理（比如从运营、技术转过来），简历怎么写？', a: '突出你原有行业的业务理解能力，这是你的差异化优势。展示你对产品经理技能的自学经历，做过什么项目或作品（可以自己设计一个产品原型、画产品架构图、写产品分析报告）。面试时会被问为什么想做产品经理，要准备好真实且有说服力的回答。'},
            {q: '没有大厂经验怎么办？', a: '可以展示独立负责的项目、创业经历、产品案例。重点说明你做什么、怎么做、结果如何。小公司反而更能锻炼综合能力，你可能独立负责一个产品从0到1，而大公司只负责一个功能点。关键是展示你的产品能力和思考。'},
            {q: '产品经理需要掌握什么技能？简历上应该写哪些？', a: '核心技能：需求分析、产品设计（原型、PRD）、项目管理、数据分析、用户研究、沟通协调。简历中展示你最擅长的即可，不需要面面俱到。建议针对目标岗位调整，突出该岗位最看重的技能。'},
            {q: 'B端产品和C端产品经理简历有什么区别？', a: 'C端侧重用户增长、数据分析、体验优化、转化率提升，简历中多写DAU、留存、转化等数据。B端侧重业务理解、解决方案、项目管理、续费率，简历中多写项目交付、企业级架构、客户成功等。简历要体现对应的能力特征，不能一份简历投两类岗位。'}
        ]
    },
    'modern-resume': {
        tagline: '时尚简约设计，适合互联网和创意行业。让作品集说话，让设计能力一目了然。',
        scenarios: ['互联网大厂', '科技公司', '创意设计岗位', '海归求职者'],
        example: `个人信息\n李思思 | 产品设计师 | 3年经验\nPortfolio：dribbble.com/lisisisi | 小红书：设计思思 | 邮箱：lisisisi.design@email.com\n现居：上海 | 求职意向：高级UI设计师 | 期望薪资：面议\n\n教育背景\n2018.09-2022.06 伦敦艺术大学 视觉传达设计 硕士\n• 研究方向：User Interface Design\n• 毕业设计获「优秀毕业设计」提名\n\n2014.09-2018.06 中央美术学院 视觉设计 本科\n• GPA：3.8/4.0（专业排名前10%）\n\n工作经历\n2022.03-至今 字节跳动 UI设计师\n• 负责抖音App核心页面设计，直接对接产品需求\n• 核心成果：\n  - 设计的新版播放页交互方案，用户播放时长提升25%\n  - 建立抖音设计组件库，覆盖80%的产品界面，开发效率提升40%\n  - 制定抖音设计规范2.0，被其他产品线（如西瓜视频）借鉴采用\n\n2021.06-2022.02 网易云音乐 UI设计师\n• 负责云音乐播放页和评论区设计优化\n• 核心成果：\n  - 设计的新版播放页UX方案，用户满意度提升18%\n  - 输出产品设计规范，统一5条产品线视觉风格\n\n项目作品\n🎨 抖音社交功能UI设计（2023）\n\n挑战：\n• 社交功能入口隐蔽，用户发现率低\n• 现有界面与竞品同质化严重，缺乏品牌特色\n\n方案：\n• 设计创新的交互入口，将社交功能入口从第3屏提升至第1屏\n• 重新设计评论区和分享页视觉，突出抖音品牌调性\n\n成果：\n• 功能曝光率提升120%，社交相关DAU增长80%\n• 通过用户测试优化，转化率提升18%（A/B测试结果）\n• 方案被产品团队作为其他功能设计参考\n\n🎨 网易云音乐皮肤中心设计（2022）\n\n挑战：\n• 皮肤中心入口深，用户使用率低\n• 皮肤内容同质化，付费转化率低\n\n方案：\n• 设计沉浸式皮肤预览和快捷换肤功能\n• 策划「限定皮肤」运营活动，制定视觉设计标准\n\n成果：\n• 皮肤中心使用率提升200%，付费转化率提升35%\n• 设计的限定皮肤成为云音乐爆款，单皮肤销售额突破500万\n\n技能专长\n设计工具：Figma（精通）、Sketch、Adobe Suite（Ps/Ai/Ae）\n动效设计：Principle、After Effects、ProtoPie\n协作工具：Notion、Miro、FigmaJam\n\n语言能力\n• 英语：雅思7.0，可作为工作语言\n• 设计方案全英文输出无障碍\n\n荣誉奖项\n• 2023 字节跳动「年度最佳设计师」提名\n• 2022 Dribbble popular designer（单作品获2000+点赞）\n• 2021 站酷「原创设计大赛」UI方向铜奖`,
        tips: [
            '作品集链接是必须的！选择最优秀的3-5个作品展示',
            '设计风格要与申请岗位和公司匹配，不要一份简历投所有',
            '突出创意能力和审美水平，展示独特的设计视角',
            '保持版面的呼吸感和层次感，不要过于拥挤',
            '展示设计思路和解决问题的方法，不只是最终效果',
            '动效和交互设计能力是加分项，可以附带demo链接'
        ],
        mistakes: [
            '缺少作品集链接或链接失效，面试官无法评估设计能力',
            '设计风格过于浮夸不够专业，显得不够成熟',
            '动画效果喧宾夺主，影响信息读取和理解',
            '字体选择过于个性，缺乏统一性和可读性',
            '配色方案混乱，与目标公司风格不匹配',
            '只展示效果图，没有设计思路和解决问题过程的说明'
        ],
        faq: [
            {q: '现代简历适合什么行业和公司？', a: '互联网、科技、创意设计、媒体广告、游戏等新兴行业更适合。扁平化、渐变色、卡片式设计是互联网风格。如果你申请的是国企、传统企业、四大会计师事务所等，过于现代化的简历反而显得不够稳重，要慎用。'},
            {q: '可以添加作品集链接吗？在哪里放？', a: '必须添加！设计类岗位一定要附上作品集链接。建议放在简历最顶部个人信息区域、Dribbble/Behance/个人网站链接都可以。确保链接可直接访问，最好有1-2个移动端可预览的设计稿。'},
            {q: '现代简历可以打印吗？用什么纸张？', a: '可以打印，建议使用120g以上的高质量纸张，最好是哑光纸。电子版建议导出为PDF保证格式不乱。注意！如果对方要求打印简历就要黑白打印，要确保打印后仍然清晰可读。'},
            {q: '没有很多设计作品怎么办？', a: '可以展示课程项目、虚拟项目（自己设计一个APP界面）、临摹优秀作品（标注是练习）、参与开源设计项目。关键是展示设计能力，而不是作品数量。如果作品少，可以放更多过程稿和草图，展示你的思考。'}
        ]
    }
};

// 默认内容
const defaultContent = {
    resume: {tips: ['量化成果用数字展示', '保持格式统一专业', '针对岗位定制简历', '定期更新简历内容'], mistakes: ['使用花哨字体超过2种', '联系方式遗漏或错误', '工作经历缺乏数据', '错别字格式不统一'], faq: [{q: '这个简历模板适合什么岗位？', a: '适合正式岗位申请，如管理培训生、国企、事业单位、传统行业等。'}, {q: '如何让简历更有竞争力？', a: '突出与岗位相关的能力和经历，用数据说话，定期更新简历。'}, {q: '简历需要几页？', a: '建议1-2页，内容精简重点突出。'}]},
    budget: {tips: ['养成记录收支的习惯', '区分必要和欲望支出', '定期复盘调整计划', '建立储蓄目标'], mistakes: ['预算过于理想化', '忽略小额累积效应', '不记录导致失控', '应急情况无准备'], faq: [{q: '预算表多久更新一次？', a: '建议每天记录，每周检查，每月总结。'}, {q: '预算总是超支怎么办？', a: '分析原因，调整预算或改进执行。'}, {q: '记账和预算有什么关系？', a: '预算计划支出，记账追踪实际。两者结合才能管好钱。'}]},
    ppt: {tips: ['每页不超过6行内容', '用图表代替文字', '提前排练把控时间', '统一配色和字体'], mistakes: ['文字堆砌没有重点', '配色过于花哨', '字体大小不统一', '动画喧宾夺主'], faq: [{q: 'PPT一般多少页？', a: '10-20页，根据时间和内容调整。'}, {q: '什么样的PPT最专业？', a: '配色统一、字体一致、图文结合、重点突出。'}, {q: '可以免费下载素材吗？', a: '可以，Unsplash配图、阿里巴巴图标库等免费资源。'}]},
    'project-plan': {tips: ['分解任务到可执行', '设置明确里程碑', '预留缓冲应对变化', '定期同步进度'], mistakes: ['任务分解不够细', '忽略依赖和冲突', '时间估计过于乐观', '计划与实际脱节'], faq: [{q: '项目计划应该多详细？', a: '详细到知道谁做什么、什么时候完成、交付什么。'}, {q: '计划赶不上变化怎么办？', a: '每周检查进度并更新计划，动态调整。'}, {q: '如何让团队遵守计划？', a: '可视化跟踪、明确考核节点、定期同步会议。'}]},
    'daily-report': {tips: ['记录关键任务成果', '提前规划次日工作', '如实反馈问题阻塞', '简洁不需要流水账'], mistakes: ['写成流水账无重点', '只记录不反思', '隐瞒问题和风险', '格式不统一'], faq: [{q: '日报应该写多详细？', a: '重要任务详细，常规工作简略。'}, {q: '日报对绩效有帮助吗？', a: '有帮助，日报是工作痕迹记录。'}, {q: '临时任务太多怎么办？', a: '记录优先级调整，说明工作负荷变化。'}]},
    okr: {tips: ['目标有挑战性可实现', 'KR要可量化可评估', '公开透明全公司可见', '定期回顾调整'], mistakes: ['目标过于保守', 'KR无法量化', 'OKR与工作脱节', '只设不跟踪'], faq: [{q: 'OKR和KPI有什么区别？', a: 'OKR关注目标达成和挑战性，KPI关注指标达成。'}, {q: 'OKR设置多少个合适？', a: '目标1-3个，每个目标2-4个KR。聚焦最重要。'}, {q: '季度中途可以调整吗？', a: '可以，但需要充分理由并在团队同步。'}]},
    'meeting-minutes': {tips: ['会前确认议程参会人', '记录决策和待办任务', '48小时内发出纪要', '明确责任人和截止'], mistakes: ['只记讨论不记结论', '待办无明确负责人', '纪要发出不及时', '后续不了了之'], faq: [{q: '会议纪要应该发给谁？', a: '发给所有参会人，并抄送相关协同部门。'}, {q: '纪要应该多详细？', a: '记录决策和待办即可，不需要逐字记录。'}, {q: '有不同意见怎么办？', a: '记录各种意见和决策理由，体现透明性。'}]},
    'sales-followup': {tips: ['每次跟进后记录要点', '设置下次跟进提醒', '分析未成单原因', '关注决策链关键人'], mistakes: ['跟进记录不完整', '长时间不联系客户', '不了解真实需求', '忽略售后管理'], faq: [{q: '如何提高跟进效率？', a: '按销售漏斗分类管理，设置自动提醒。'}, {q: '客户长期不回复怎么办？', a: '发送有价值的信息，保持存在感。'}, {q: '如何判断意向度？', a: '看需求、时间表、预算、决策人四个要素。'}]},
    'expense-tracking': {tips: ['随手记录不遗漏', '分类统计找超支', '区分必要和欲望支出', '月末复盘调整'], mistakes: ['嫌麻烦不记录', '只记大额忽略小钱', '不分类不知花哪', '记完不看分析'], faq: [{q: '记账最麻烦的是什么？', a: '是坚持。建议选择简单好用的工具，养成习惯。'}, {q: '账单能自动导入吗？', a: '可以，记账APP支持支付宝微信自动导入。'}, {q: '记账能省钱吗？', a: '能！知道钱花哪了，才知道哪些该省。'}]}
};

function getContent(templateId, category, templateName) {
    if (CONTENTS[templateId]) {
        return CONTENTS[templateId];
    }
    const catDefault = defaultContent[category] || defaultContent['resume'];
    return {
        tagline: `专业${templateName}，适合${category}相关场景使用`,
        scenarios: [`${templateName}适用场景1`, `${templateName}适用场景2`, `${templateName}适用场景3`, `${templateName}适用场景4`],
        example: `${templateName}填写示例\n\n请根据实际情况填写对应内容...\n\n基础信息：姓名、日期、分类等\n具体内容：根据模板类型填写详细的内容\n每个字段都要有具体的示例和数据\n备注说明：补充信息和注意事项`,
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
    
    const content = getContent(t.id, t.category, t.name);
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

console.log('Generated:', updated, 'pages with enhanced content');
