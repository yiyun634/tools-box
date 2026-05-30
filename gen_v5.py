#!/usr/bin/env python3
import json, os, re

with open('/root/tools-box/data/templates.json') as f:
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

# 每个模板的详细独特内容
TEMPLATE_DETAIL = {
    'classic-resume': {
        'tagline': '传统经典排版，适合大多数职位申请。正规稳重，永不出错。',
        'scenarios': ['国企/事业单位申请', '校招/社招通用', '管理培训生申请', '传统行业岗位', '公务员/选调生申请', '银行/金融行业申请', '公务员遴选'],
        'example': '''基本信息
姓名：王小明 | 手机：138-xxxx-xxxx | 邮箱：wangxiaoming@email.com
现居地：上海 | 政治面貌：中共党员 | 婚姻状况：已婚

教育背景
2020-2024 清华大学 经济管理学院 本科
主修：工商管理 | GPA：3.8/4.0（专业前10%）
荣誉：校级三好学生（3次）、学业优秀奖学金（2次）、优秀学生干部
海外交换：2022年 赴美交换一学期（UIUC）

实习经历
2023.06-2023.09 字节跳动 产品运营实习生
• 负责抖音创作者社群运营，制定运营策略，成员从5万增长至12万（+140%）
• 策划并执行「创作者激励计划」，带动优质内容产出提升60%
• 策划运营活动2场，参与用户累计超过5万人次
• 撰写活动复盘报告3份，提出优化建议被团队采纳

2022.07-2022.09 京东集团 市场部实习生
• 协助策划618营销活动方案，活动曝光量提升40%
• 负责竞品数据收集与分析，输出竞品周报5份
• 独立完成竞品分析报告1份，为产品策略提供支持

校园经历
2021-2023 学生会外联部部长
• 统筹组织校级活动10场，累计参与人数超过1万人
• 拉取赞助累计5万元，物资赞助价值3万元
• 带领团队从5人扩展至15人，培养下一任部长

2020-2021 志愿服务队副队长
• 组织社区志愿服务5次，累计服务时长100小时
• 获校级「优秀志愿者」称号

技能证书
• 语言：英语六级 580分、日语N3（可日常会话）
• 技能：Python数据分析、Axure原型设计、SQL查询、PowerBI可视化
• 证书：初级会计师证、普通话二级甲等、教师资格证

自我评价
性格开朗，责任心强，有良好的沟通协调能力和团队合作精神。在校期间积极参加社会实践，积累了丰富的组织和策划经验。期望在企业管理或市场分析方向发展。''',
        'tips': ['联系方式放在顶部显眼位置，格式保持统一', '教育背景按时间倒序，先写最高学历', '工作经历用STAR法则描述：情境、任务、行动、结果', '量化成果用具体数字展示，如提升140%、增长60%', '控制在1-2页内，内容精简重点突出', '不同岗位申请建议准备多个版本，针对性调整', '定期更新简历内容，保持信息时效性', '注意格式统一，字体大小行距保持一致'],
        'mistakes': ['使用超过2种字体颜色或过于花哨的模板', '联系方式遗漏或格式错误', '工作经历过于笼统，缺乏具体工作内容和数据', '出现错别字、标点符号不统一、日期格式混乱', '照片使用生活照或过度美颜的照片', '篇幅过长导致重要信息被淹没'],
        'faq': [
            {'q': '经典简历适合哪些岗位申请？', 'a': '经典简历适用于国企、事业单位、传统行业（如金融、制造）、管理培训生等正式岗位。排版简洁大方，注重内容呈现，不会因为风格问题被淘汰。如果你申请的是公务员、国企、央企、大型企业，经典简历是最佳选择。'},
            {'q': '简历需要放照片吗？国内和国外有区别吗？', 'a': '国内求职建议附上照片，使用证件照或职业照，避免浓妆艳抹或过度修图的照片。建议白色或蓝色背景。欧美企业通常不需要照片，甚至有些外企明确要求不要放照片，因为担心涉及歧视问题。如果你同时投递国内外企业，可以准备两个版本。'},
            {'q': '没有工作经验的应届生怎么写简历？', 'a': '应届生应该突出实习经历、校园经历、项目经验、课程项目等。重点展示学习能力、沟通能力、团队协作、抗压能力等软技能。用数据说明你的贡献，比如在实习中完成了什么、带来了什么价值。没有工作经验不是问题，关键是你如何展示自己的潜力。'},
            {'q': '简历应该控制在几页？工作多少年应该几页？', 'a': '一般建议1-2页。应届生1页即可，有丰富经验的可适当延长至2页。工作10年以上的职场人可以做3页，但不要为了凑页数而添加无关内容。有些500强企业甚至要求即使是高管也只能1页。关键原则是：内容精简，重点突出。'}
        ],
        'module1': '''💼 简历优化技巧
📌 用Action Verb开头：负责、主导、完成、推动、带领
📌 量化成果：提升了X%、增长了X元、缩短了X天
📌 使用行业关键词：通过ATS关键词筛选，提高通过率
📌 定期更新：根据岗位定制简历内容，针对性投递
📌 避免低级错误：错别字、格式不统一是大忌
📌 简历命名：姓名-岗位-年份.pdf，方便HR归档
📌 突出核心优势：用2-3个关键词概括你的核心竞争力
📌 项目经验用STAR法则：Situation情境、Task任务、Action行动、Result结果''',
        'module2': '''🎯 面试官关注重点
🎯 学历背景和毕业院校层次（985/211优势明显）
🎯 实习经历的具体工作内容和成果数据
🎯 校园活动和领导力经历（体现综合素质）
🎯 沟通表达能力和举止仪表（第一印象很关键）
🎯 简历的整体呈现和专业度（细节决定成败）
🎯 对企业和岗位的了解程度（说明你做了功课）
🎯 职业规划和发展潜力（看你是否适合长期培养）
🎯 解决问题的方法和思路（体现思辨能力）'''
    },
    'developer-resume': {
        'tagline': '技术导向设计，突出编程能力和项目经验，让面试官快速判断技术匹配度。',
        'scenarios': ['互联网公司开发岗', 'IT/软件企业', '技术管培生', '外资科技公司', '创业公司技术合伙人', '外资投行技术部', '国企科技部门'],
        'example': '''个人信息
张伟 | Java后端工程师 | 4年开发经验
GitHub：github.com/zhangwei | 技术博客：zhangwei.tech | 邮箱：zhangwei.dev@email.com
求职意向：高级开发工程师/技术专家 | 期望薪资：面议 | 地点：北京/上海

技术栈
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
后端开发：Java/SpringBoot/Go | 数据库：MySQL/Redis/PostgreSQL/MongoDB
架构设计：Docker/K8s微服务 | 消息队列：Kafka/RocketMQ
工具链：Git/Maven/Jenkins/GitLab CI | 监控：Prometheus/Grafana
前端：Vue.js/React（可以写简单前端）| 云服务：AWS/Aliyun
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

工作经历
2020.03-至今 阿里巴巴 高级Java开发工程师
• 负责电商平台订单系统设计与开发，日订单处理量超过100万单
• 重构库存系统，采用Redis缓存+异步消息队列，接口响应时间从200ms降至50ms，性能提升75%
• 设计和实现秒杀系统，支撑双十一峰值流量10万QPS，下单成功率99.9%
• 搭建自动化测试框架，代码覆盖率达85%，线上Bug率下降60%
• 主导技术方案评审，帮助3名 junior 工程师成长

2018.07-2020.02 美团点评 Java开发工程师
• 负责餐厅推荐系统后端开发，通过协同过滤算法优化，推荐准确率提升30%
• 优化数据库查询，通过索引优化和SQL改写，数据库负载降低40%，慢查询减少80%
• 参与订单系统微服务拆分，从单体应用拆分为15个微服务，提升系统可维护性

项目经验
2023.06-2023.09 秒杀系统设计与实现（负责人）
技术方案：
• 采用Redis集群+本地缓存两级缓存，降低热点数据压力
• 使用RocketMQ异步下单，实现削峰填谷，峰值处理能力提升10倍
• 实施多级限流策略（网关限流→服务限流→接口限流），保护系统稳定性

成果：
• 双十一当天支撑峰值流量10万QPS，下单成功率99.9%
• 系统响应时间控制在50ms以内，秒杀成功率行业领先
• 方案被团队作为后续活动系统参考模板

2022.03-2022.06 用户画像系统（核心开发）
技术方案：
• 使用Spark进行海量用户数据处理，日处理数据量超过500GB
• 构建用户标签体系，支持100+维度标签实时查询
• 设计标签冷启动策略，解决新用户标签缺失问题

成果：
• 标签覆盖率达95%，精准营销转化率提升25%
• 查询性能：P99延迟<100ms，支持高并发访问

开源贡献
• GitHub Stars 3000+，维护的开源工具库累计下载量10万+
• 贡献Spring生态开源项目，提交PR被合并3次
• 在技术博客撰写原创文章15篇，累计阅读量5万+

技能认证
• Oracle Certified Professional Java SE 8 Programmer
• Alibaba Cloud Certified Developer''',
        'tips': ['技术栈放在显眼位置，分层展示（语言、框架、数据库、工具等）', '项目描述要突出技术难点和解决方案，不只是做什么而是怎么做', '用数字量化成果：QPS、延迟、覆盖率、增长百分比等', '附上GitHub和技术博客链接，展示技术热情和持续学习能力', '写明参与的架构设计和技术决策，不只是执行者', '面试前准备好项目细节，能详细解释技术选型原因', '突出解决复杂问题和性能优化的能力', '展示技术视野和系统性思维'],
        'mistakes': ['堆砌技术名词但没有实际应用场景和成果', '项目描述过于笼统，只说做了什么但不说怎么做的、带来什么价值', '忽略系统设计能力的展示，只关注CRUD', '技术栈与目标岗位要求不匹配', 'GitHub主页空空如也，没有任何项目或贡献', '面试时无法详细解释简历上写的技术点'],
        'faq': [
            {'q': '程序员简历需要写期望薪资吗？', 'a': '建议写面议或写一个范围（如25-35K），让HR主动联系时有谈判空间。写太高可能直接被筛选掉，写太低会让自己很被动。如果是校招或实习，通常没有谈薪空间，可以不写。记住，简历是让面试官对你感兴趣的工具，不是薪资谈判的直接手段。'},
            {'q': '没有开源项目、没有技术博客怎么办？', 'a': '可以自己实现小工具并开源、参与开源社区贡献（哪怕是改文档）、写技术博客记录学习历程、做个人项目（完整的小工具或网站）、刷算法题并记录在GitHub。不要一片空白，要有至少一个能展示你代码风格和思考能力的项目。面试官会通过GitHub判断你的编码习惯和学习能力。'},
            {'q': '项目太技术化，面试官不是技术出身听不懂怎么办？', 'a': '先用一个非技术人员能理解的语言描述你解决了什么问题、带来了什么价值（比如「系统处理速度提升了3倍」），然后再展开技术细节。可以加一句「技术实现细节面试时我可以详细展开」。关键是让面试官知道你解决了什么业务问题，不只是写了什么代码。'},
            {'q': '学历一般（双非/专科）怎么弥补？', 'a': '突出项目经验的质量和数量、开源贡献、技术博客、大厂实习经历等。技术行业更看重实际能力，学历只是敲门砖。如果有985/211的背景会在初筛有优势，但最终能不能通过面试还是看技术实力。可以在简历中强调项目深度而不是学历背景。'}
        ],
        'module1': '''💼 岗位适配建议
✅ 适合IT/软件/互联网公司技术岗位
✅ 技术栈要针对目标公司做定制化调整
✅ 建议附上GitHub和技术博客链接
✅ 突出项目经验和技术深度
✅ 展示解决复杂问题的能力
✅ 量化技术成果（性能提升X%、支撑X用户）
✅ 针对不同技术方向准备不同版本
✅ 外资公司要准备英文简历和技术词汇''',
        'module2': '''🎯 面试官关注重点
🎯 技术栈与岗位匹配度（是否能在短期内上手）
🎯 项目经验的技术深度（不只是会用，还要懂原理）
🎯 问题解决能力和思路（遇到bug怎么排查）
🎯 编码习惯和代码质量（可读性、可维护性）
🎯 系统设计能力（设计一个微博首页怎么说）
🎯 学习能力和技术热情（最近在学什么新技术）
🎯 团队协作和沟通能力（能不能和团队配合）
🎯 对业务的理解（不只是写代码，要懂业务）'''
    },
    'modern-resume': {
        'tagline': '时尚简约设计，适合互联网和创意行业。让作品集说话，让设计能力一目了然。',
        'scenarios': ['互联网大厂', '科技公司', '创意设计岗位', '海归求职者', '游戏公司', '新媒体运营', '品牌设计'],
        'example': '''个人信息
李思思 | 产品设计师 | 3年经验
Portfolio：dribbble.com/lisisisi | 小红书：设计思思 | 邮箱：lisisisi.design@email.com
现居：上海 | 求职意向：高级UI设计师 | 期望薪资：面议

教育背景
2018.09-2022.06 伦敦艺术大学 视觉传达设计 硕士
• 研究方向：User Interface Design
• 毕业设计获「优秀毕业设计」提名

2014.09-2018.06 中央美术学院 视觉设计 本科
• GPA：3.8/4.0（专业排名前10%）

工作经历
2022.03-至今 字节跳动 UI设计师
• 负责抖音App核心页面设计，直接对接产品需求
• 核心成果：
  - 设计的新版播放页交互方案，用户播放时长提升25%
  - 建立抖音设计组件库，覆盖80%的产品界面，开发效率提升40%
  - 制定抖音设计规范2.0，被其他产品线（如西瓜视频）借鉴采用

2021.06-2022.02 网易云音乐 UI设计师
• 负责云音乐播放页和评论区设计优化
• 核心成果：
  - 设计的新版播放页UX方案，用户满意度提升18%
  - 输出产品设计规范，统一5条产品线视觉风格

项目作品
🎨 抖音社交功能UI设计（2023）
挑战：社交功能入口隐蔽，用户发现率低
方案：设计创新的交互入口，将社交功能入口从第3屏提升至第1屏
成果：功能曝光率提升120%，社交相关DAU增长80%

🎨 网易云音乐皮肤中心设计（2022）
挑战：皮肤中心入口深，用户使用率低
方案：设计沉浸式皮肤预览和快捷换肤功能
成果：皮肤中心使用率提升200%，付费转化率提升35%

技能专长
设计工具：Figma（精通）、Sketch、Adobe Suite（Ps/Ai/Ae）
动效设计：Principle、After Effects、ProtoPie
协作工具：Notion、Miro、FigmaJam

语言能力
• 英语：雅思7.0，可作为工作语言
• 设计方案全英文输出无障碍

荣誉奖项
• 2023 字节跳动「年度最佳设计师」提名
• 2022 Dribbble popular designer（单作品获2000+点赞）
• 2021 站酷「原创设计大赛」UI方向铜奖''',
        'tips': ['作品集链接是必须的！选择最优秀的3-5个作品展示', '设计风格要与申请岗位和公司匹配，不要一份简历投所有', '突出创意能力和审美水平，展示独特的设计视角', '保持版面的呼吸感和层次感，不要过于拥挤', '展示设计思路和解决问题的方法，不只是最终效果', '动效和交互设计能力是加分项，可以附带demo链接', '设计规范和组件库经验是大型互联网公司的加分项', '保持个人风格但不失专业度'],
        'mistakes': ['缺少作品集链接或链接失效，面试官无法评估设计能力', '设计风格过于浮夸不够专业，显得不够成熟', '动画效果喧宾夺主，影响信息读取和理解', '字体选择过于个性，缺乏统一性和可读性', '配色方案混乱，与目标公司风格不匹配', '只展示效果图，没有设计思路和解决问题过程的说明'],
        'faq': [
            {'q': '现代简历适合什么行业和公司？', 'a': '互联网、科技、创意设计、媒体广告、游戏等新兴行业更适合。扁平化、渐变色、卡片式设计是互联网风格。如果你申请的是国企、传统企业、四大会计师事务所等，过于现代化的简历反而显得不够稳重，要慎用。'},
            {'q': '可以添加作品集链接吗？在哪里放？', 'a': '必须添加！设计类岗位一定要附上作品集链接。建议放在简历最顶部个人信息区域、Dribbble/Behance/个人网站链接都可以。确保链接可直接访问，最好有1-2个移动端可预览的设计稿。'},
            {'q': '现代简历可以打印吗？用什么纸张？', 'a': '可以打印，建议使用120g以上的高质量纸张，最好是哑光纸。电子版建议导出为PDF保证格式不乱。注意！如果对方要求打印简历就要黑白打印，要确保打印后仍然清晰可读。'},
            {'q': '没有很多设计作品怎么办？', 'a': '可以展示课程项目、虚拟项目（自己设计一个APP界面）、临摹优秀作品（标注是练习）、参与开源设计项目。关键是展示设计能力，而不是作品数量。如果作品少，可以放更多过程稿和草图，展示你的思考。'}
        ],
        'module1': '''💼 岗位适配建议
✅ 适合互联网、科技、创意设计、媒体广告、游戏公司
✅ 建议附上作品集链接(Dribbble/Behance/Pinterest)
✅ 可以使用互联网风格的设计元素
✅ 突出创意能力和审美水平
✅ 展示设计过程和思路
✅ 量化设计带来的业务价值
✅ 准备移动端适配的设计稿
✅ 针对不同公司准备不同风格版本''',
        'module2': '''🎯 面试官关注重点
🎯 作品集质量和风格匹配度（是否符合公司风格）
🎯 设计工具掌握程度（Figma/Sketch等）
🎯 设计思维和方法论（怎么定义问题、分析需求）
🎯 审美能力和创意水平（有没有独特的视角）
🎯 沟通表达和团队协作（能不能清晰表达设计意图）
🎯 对行业的理解和热情（有没有关注设计趋势）
🎯 作品集链接的可访问性（确保能打开）
🎯 设计落地能力（设计稿能不能被开发实现）'''
    }
}

def get_default_content(tid, category, name):
    return {
        'tagline': f'专业{name}，适合{category}相关场景使用。',
        'scenarios': [f'{name}适用场景1', f'{name}适用场景2', f'{name}适用场景3', f'{name}适用场景4', f'{name}适用场景5'],
        'example': f'''基本信息
模板名称：{name}
日期：2024年X月X日

主要内容
请根据实际情况填写具体内容...

填写说明
1. 第一步：XXX
2. 第二步：XXX
3. 第三步：XXX

注意事项
• 保持信息准确完整
• 格式规范统一
• 定期检查更新''',
        'tips': ['保持简洁清晰，重点突出', '定期检查和更新内容', '根据实际使用情况调整格式', '确保信息准确完整', '注意保密和安全', '善用快捷键提高效率', '做好备份防止丢失'],
        'mistakes': ['信息不完整或错误', '格式不统一不规范', '缺乏关键细节', '更新不及时', '忽视数据备份'],
        'faq': [
            {'q': '这个模板适合什么场景使用？', 'a': f'根据模板类型，适用于{category}相关的各种场景。模板设计符合行业最佳实践，可以直接下载使用。'},
            {'q': '模板需要收费吗？', 'a': '完全免费，可以直接下载使用。请勿二次销售模板。'},
            {'q': '可以自定义修改吗？', 'a': '可以，下载后用相应软件打开即可修改内容和格式。'},
            {'q': '有使用教程吗？', 'a': '有的，每个模板都有详细的使用说明和填写示例，可以参考教程文档。'}
        ],
        'module1': f'''💼 {catNames.get(category, category)}使用技巧
📌 快速上手：按照示例填写，节省时间
📌 格式规范：保持统一的格式和风格
📌 定期更新：及时更新内容保持时效性
📌 数据备份：重要数据做好备份
📌 高效使用：善用快捷键和模板功能''',
        'module2': '''🎯 核心要点
🎯 明确使用目的和场景
🎯 突出关键信息和重点
🎯 格式统一风格专业
🎯 定期检查及时更新
🎯 注意数据安全和备份'''
    }

count = 0
for t in templates:
    tid = t['id']
    subdir = MAPPINGS.get(tid)
    if not subdir:
        continue
    
    file_path = '/root/tools-box/templates/' + t['category'] + '/' + subdir + '/index.html'
    if not os.path.exists(file_path):
        continue
    
    content = TEMPLATE_DETAIL.get(tid) or get_default_content(tid, t['category'], t['name'])
    
    cat_name = catNames.get(t['category'], t['category'])
    gradient = gradients.get(t['category'], gradients['resume'])
    icon = icons.get(t['category'], '📄')
    
    seo_title = (t.get('seo') or {}).get('title') or f"{t['name']} - 免费效率工具箱"
    seo_desc = (t.get('seo') or {}).get('description') or f"免费下载{t['name']}"
    download_path = t.get('downloadPath', f"/assets/{t['category']}/{subdir}.docx")
    format_type = (t.get('format') or 'DOCX').upper()
    stats = t.get('stats', {'views': 0, 'downloads': 0})
    related_guide = t.get('relatedGuide', '')
    
    scenarios_html = ''.join('<li><strong>' + s + '</strong></li>' for s in content['scenarios'])
    tips_html = ''.join('<li><strong>' + tip + '</strong></li>' for tip in content['tips'])
    mistakes_html = ''.join('<li>' + m + '</li>' for m in content['mistakes'])
    faq_html = ''.join('<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">' + f['q'] + '<span>▼</span></button><div class="faq-answer">' + f['a'] + '</div></div>' for f in content['faq'])
    example_html = '<div class="example-box"><pre>' + content['example'] + '</pre></div>'
    guide_section = '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/' + related_guide + '" class="related-item">📖 查看教程 →</a></div>' if related_guide else ''
    
    module1_lines = content['module1'].split('\n', 1)
    module2_lines = content['module2'].split('\n', 1)
    module1_html = '<div class="template-section"><h2>' + module1_lines[0] + '</h2><div class="module-content"><pre>' + content['module1'] + '</pre></div></div>'
    module2_html = '<div class="template-section"><h2>' + module2_lines[0] + '</h2><div class="module-content"><pre>' + content['module2'] + '</pre></div></div>'
    
    name_escaped = t['name'].replace("'", "\\'")
    
    html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + seo_title + '</title><meta name="description" content="' + seo_desc + '"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/templates/' + t['category'] + '/' + subdir + '"><meta property="og:title" content="' + seo_title + '"><meta property="og:description" content="' + seo_desc + '"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/' + t['category'] + '">' + cat_name + '</a> / <span>' + t['name'] + '</span></div><div class="template-hero" style="background:' + gradient + '"><h1>' + icon + ' ' + t['name'] + '</h1><p>' + content['tagline'] + '</p><div class="template-actions"><a href="' + download_path + '" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\'' + t['id'] + '\',\'' + name_escaped + '\',\'templates/' + t['category'] + '/' + subdir + '\',\'' + icon + '\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 ' + format_type + '</span><span>👁️ ' + str(stats['views']) + ' 浏览</span><span>📥 ' + str(stats['downloads']) + ' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>' + scenarios_html + '</ul></div><div class="template-section"><h2>📝 填写示例</h2>' + example_html + '</div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">' + tips_html + '</ul></div>' + module1_html + module2_html + '<div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">' + mistakes_html + '</ul></div><div class="template-section"><h2>❓ 常见问题</h2>' + faq_html + '</div>' + guide_section + '<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="' + t['id'] + '";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>'
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    count += 1

print(f'Generated {count} template pages with enhanced content')
