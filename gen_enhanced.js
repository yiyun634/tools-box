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

// 按分类的内容模块
const CONTENT_BY_CATEGORY = {
    'resume': {
        icon: '📝',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // 按模板ID的独特内容
        'classic-resume': {
            name: '经典简历模板',
            scenarios: ['求职申请', '校招社招', '管理岗位申请'],
            example: '张三 | 产品经理 | 5年经验\n\n教育背景：清华大学 计算机科学 本科\n\n工作经历：\n2019-2023 字节跳动 产品经理\n- 负责抖音社交功能规划，年DAU提升40%\n- 带领10人团队完成20+功能迭代\n\n项目经验：\n2022 用户增长项目\n- 通过A/B测试优化，次日留存提升15%\n\n技能证书：PMP、NPDP、产品分析',
            tips: ['联系方式放在顶部显眼位置', '工作经历按时间倒序排列', '量化成果用数字展示', '控制在1-2页内'],
            mistakes: ['使用过于花哨的字体和颜色', '联系方式遗漏或错误', '工作经历过于笼统缺乏数据', '错别字和格式不统一'],
            faq: [
                {q: '经典简历适合哪些岗位申请？', a: '经典简历适用于绝大多数岗位，尤其是国企、传统行业、管理岗等正式场合。排版简洁大方，不会出错。'},
                {q: '简历照片是必须的吗？', a: '国内求职建议附上照片，优先使用证件照或职业照，避免生活照或浓妆艳抹照。'},
                {q: '工作经历太多怎么办？', a: '保留最近3-5段相关经历，或按职能合并。重点展示最近和最相关的成就。'}
            ]
        },
        'modern-resume': {
            name: '现代简历模板',
            scenarios: ['互联网企业', '创意岗位', '海归求职者'],
            example: '李四 | UI设计师 | 3年经验\n\n教育背景：伦敦艺术大学 视觉传达 硕士\n\n项目经历：\n2022-2024 网易云音乐 UI设计\n- 设计新版播放页，播放量提升25%\n- 制定设计规范，统一产品视觉风格\n\n设计作品集：dribbble.com/lisidesign\n\n技能：Figma/Sketch/Adobe Suite',
            tips: ['可添加作品集链接增强展示', '设计风格要与申请岗位匹配', '突出创意能力和审美水平', '保持版面的呼吸感和层次感'],
            mistakes: ['设计过于浮夸不专业', '动画效果影响阅读', '字体选择过于个性', '配色混乱缺乏统一'],
            faq: [
                {q: '现代简历适合什么行业？', a: '互联网、科技、创意设计、媒体广告等新兴行业更适合现代风格简历。传统行业慎用。'},
                {q: '可以添加作品集链接吗？', a: '必须添加！设计类岗位一定要附上Dribbble、Behance或个人网站链接。'},
                {q: '现代简历能打印吗？', a: '可以，但建议使用较高质量的纸张打印。也可以直接发送PDF电子版。'}
            ]
        },
        'developer-resume': {
            name: '程序员简历模板',
            scenarios: ['技术岗位', 'IT互联网', '软件工程师'],
            example: '王五 | Java开发工程师 | 4年经验\n\n教育背景：华中科技大学 软件工程 本科\n\n技术栈：\nJava/SpringBoot | MySQL/Redis | Docker/K8s | Git\n\n项目经验：\n2021-2024 电商平台后端开发\n- 设计高并发架构，支持10万QPS\n- 优化接口响应时间，从200ms降至50ms\n- 搭建自动化部署系统，发布效率提升60%\n\n开源贡献：\nGitHub 3000+ Stars 项目维护\n贡献Spring生态开源项目',
            tips: ['技术栈放在显眼位置', '突出项目规模和业绩', '附上GitHub和技术博客链接', '写明参与的架构设计和技术决策'],
            mistakes: ['堆砌技术名词无实际应用', '项目描述过于笼统', '忽略算法和系统设计能力', '技术栈与岗位要求不匹配'],
            faq: [
                {q: '程序员简历需要写期望薪资吗？', a: '建议不写或写面议，让HR主动联系时可以有一定谈判空间。'},
                {q: '没有开源项目怎么办？', a: '可以自己实现一些小工具或者参与开源社区贡献，不需要多高大上。'},
                {q: '项目经历太技术化怎么办？', a: '用非技术人员也能理解的语言描述，重点说清楚解决了什么问题、带来了什么价值。'}
            ]
        },
        'teacher-resume': {
            name: '教师简历模板',
            scenarios: ['学校招聘', '培训机构', '教育管理岗'],
            example: '刘老师 | 高中数学教师 | 8年教龄\n\n教育背景：北京师范大学 数学与应用数学 硕士\n\n教师资格证：高中数学 编号2020XXXX\n\n教学成果：\n- 所带班级高考数学平均分提高15分\n- 指导学生获省级数学竞赛一等奖\n- 发表教学论文3篇\n\n班主任经验：\n2018-2024 连续6年担任班主任\n班级升学率保持在95%以上',
            tips: ['突出教师资格证和职称', '量化教学成果和学生进步', '展示班主任和课外活动经验', '附上学生评价和荣誉证书'],
            mistakes: ['忽略教学成果的数据化展示', '未注明教师资格证编号', '课外活动经历过于空洞', '教学理念描述过于理论化'],
            faq: [
                {q: '教师简历需要附上成绩单吗？', a: '不需要，但可以附上优秀学生评价或教学成果证明材料。'},
                {q: '培训机构的教学经历怎么写？', a: '突出培训人次、学员满意度、课程研发等指标，展示教学能力。'},
                {q: '非师范专业能当老师吗？', a: '可以，但需要考取教师资格证。简历中强调教育相关培训经历和教学热情。'}
            ]
        },
        // 其他简历模板的默认内容
        'default': {
            scenarios: ['求职申请', '职场晋升', '简历优化'],
            example: '请根据自身情况填写以下内容...\n\n基本信息：姓名、联系方式、学历背景\n工作经历：时间、公司、职位、业绩\n项目经验：项目名称、角色、成果\n技能证书：专业技能、语言能力、资格证书',
            tips: ['保持简洁专业的排版', '突出与岗位相关的经历', '量化工作成果用数据说话', '定期更新简历内容'],
            mistakes: ['使用过于花哨的模板', '联系方式遗漏或错误', '工作经历过于笼统', '忽略简历与岗位的匹配度'],
            faq: [
                {q: '简历应该控制在几页？', a: '建议1-2页，应届生1页即可，有丰富经验的可适当延长至2页。'},
                {q: '可以同时申请多个岗位用同一份简历吗？', a: '建议根据不同岗位JD调整简历重点，提高匹配度。'},
                {q: '简历需要附上照片吗？', a: '国内求职建议附上证件照，外企通常不需要。'}
            ]
        }
    },
    'budget': {
        icon: '📊',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'monthly-budget': {
            name: '月度预算表',
            scenarios: ['家庭理财', '个人记账', '收支规划'],
            example: '2024年6月预算规划\n\n收入部分：\n工资收入：15,000元\n副业收入：3,000元\n合计：18,000元\n\n支出部分：\n房租：4,500元\n餐饮：2,000元\n交通：500元\n购物：1,500元\n娱乐：500元\n储蓄：8,500元\n合计：18,000元',
            tips: ['预算要符合实际情况，适度留余地', '固定支出和变动支出分开统计', '每月结束后复盘预算执行情况', '建立3-6个月应急基金'],
            mistakes: ['预算过于理想化难以执行', '忽略小额支出的累积效应', '不记录实际支出导致预算失控', '应急情况没有预留机动资金'],
            faq: [
                {q: '预算表需要每天更新吗？', a: '建议每天花2分钟记录当天收支，月底统一复盘。养成习惯后并不耗时。'},
                {q: '收入不稳定怎么制定预算？', a: '以最低收入为基准制定基础预算，额外收入单独处理，可用于储蓄或还债。'},
                {q: '预算超支了怎么办？', a: '分析超支原因，是预算不合理还是执行偏差。下月调整预算或改进执行。'}
            ]
        },
        'annual-budget': {
            name: '年度预算表',
            scenarios: ['企业财务', '项目管理', '家庭规划'],
            example: '2024年度财务规划\n\n年度总收入：216,000元\n年度总支出：156,000元\n年度结余：60,000元\n\n季度分解：\nQ1 结余12,000（春节额外支出）\nQ2 结余15,000\nQ3 结余15,000\nQ4 结余18,000（年终奖）',
            tips: ['按季度分配预算更灵活', '考虑季节性消费高峰', '预留年中调整空间', '与实际执行对比找差距'],
            mistakes: ['预算过于理想化', '忽略年度大型支出规划', '不进行季度复盘', '应急资金未单独规划'],
            faq: [
                {q: '年度预算和月度预算有什么区别？', a: '年度预算是宏观规划，设定全年目标和方向；月度预算是具体执行，细化到每月操作。'},
                {q: '年中发现预算不合理怎么办？', a: '可以年中调整修正，全年目标不变，但分配可以优化。'},
                {q: '年度预算需要包含哪些内容？', a: '收入预期、固定支出、变动支出、储蓄目标、投资计划、应急备用金。'}
            ]
        },
        'default': {
            scenarios: ['财务管理', '预算规划', '收支记录'],
            example: '预算表填写示例：\n\n收入项目：\n- 工资收入\n- 奖金提成\n- 副业收入\n- 投资收益\n\n支出项目：\n- 固定支出（房租、贷款）\n- 变动支出（餐饮、购物）\n- 偶然支出（旅行、医疗）',
            tips: ['养成记录收支的习惯', '区分必要支出和非必要支出', '定期复盘调整预算', '建立储蓄意识'],
            mistakes: ['只记不分析', '预算脱离实际', '忽视小钱累积', '应急情况无准备'],
            faq: [
                {q: '如何开始记账？', a: '从最简单的记录开始，每天花1分钟记录收支，不需要太复杂。'},
                {q: '预算表多久更新一次？', a: '建议每天记录，每周检查，每月总结，每季度调整。'},
                {q: '预算和实际不符怎么办？', a: '分析差距原因，调整预算使其更贴合实际，或改进执行纪律。'}
            ]
        }
    },
    // 其他分类类似...
    'ppt': {
        icon: '📑',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'default': {
            scenarios: ['商务演示', '会议汇报', '培训教学'],
            example: 'PPT内容示例：\n\n封面：标题、副标题、演讲者、日期\n\n目录：演讲大纲概览\n\n内容页：\n- 每页一个主题\n- 文字精炼，重点突出\n- 适当使用图表和图片\n\n结尾：总结、致谢、问答',
            tips: ['每页不超过6行，每行不超过6字', '使用高质量图片素材', '统一配色和字体风格', '提前排练把握时间'],
            mistakes: ['文字过多堆砌', '配色过于花哨', '字体大小不统一', '动画效果喧宾夺主'],
            faq: [
                {q: 'PPT应该多少页？', a: '根据时间和内容密度，一般10-20页较为合适，20分钟演讲约15页。'},
                {q: '什么样的PPT最专业？', a: '配色统一、字体一致、图文结合、重点突出、逻辑清晰。'},
                {q: '可以免费下载PPT素材吗？', a: '可以，推荐使用Unsplash配图、阿里巴巴图标库等免费资源。'}
            ]
        }
    },
    'project-plan': {
        icon: '📋',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'default': {
            scenarios: ['项目管理', '团队协作', '进度跟踪'],
            example: '项目计划表示例：\n\n项目名称：APP迭代开发\n项目周期：2024.3-2024.6\n\n里程碑：\nM1 需求确认 3月底\nM2 核心功能开发 4月底\nM3 测试上线 5月底\nM4 正式发布 6月中\n\n团队分工：\n产品经理1人、开发6人、测试2人、设计2人',
            tips: ['分解任务到可执行的粒度', '设置明确的里程碑节点', '预留缓冲时间应对风险', '定期同步进度和调整计划'],
            mistakes: ['任务分解不够细致', '忽略依赖关系和资源冲突', '时间估计过于乐观', '计划与实际脱节不调整'],
            faq: [
                {q: '项目计划书应该多详细？', a: '详细到知道谁做什么、什么时候完成、交付什么成果即可。不用过度复杂。'},
                {q: '计划总是赶不上变化怎么办？', a: '计划需要动态调整，建议每周检查一次进度并更新计划。'},
                {q: '如何让团队遵守项目计划？', a: '可视化跟踪、明确的考核节点、定期的同步会议，让计划成为团队的工作指引而非束缚。'}
            ]
        }
    },
    'daily-report': {
        icon: '📅',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'default': {
            scenarios: ['工作汇报', '团队协同', '业绩追踪'],
            example: '工作日报示例：\n\n日期：2024.6.15\n\n今日完成：\n1. 完成用户调研报告初稿\n2. 参加产品评审会议\n3. 修复线上Bug #1234\n\n明日计划：\n1. 修改调研报告\n2. 跟进开发进度\n\n遇到问题：\nUI设计稿延期，需要协调资源\n\n工作时长：8h',
            tips: ['记录今天完成的关键任务', '提前规划明日工作重点', '如实记录问题和阻塞', '保持简洁不需要流水账'],
            mistakes: ['写成流水账没有重点', '只记录工作不思考改进', '隐瞒问题和风险', '格式不统一难以汇总'],
            faq: [
                {q: '工作日报应该写多详细？', a: '简洁明了为主，重要任务记录详细，常规工作一句话带过即可。'},
                {q: '日报对绩效考核有帮助吗？', a: '有帮助，日报是工作痕迹的记录，在绩效回顾时有据可查。'},
                {q: '临时任务太多打乱计划怎么办？', a: '在日报中记录临时任务的优先级调整，让领导知道你的工作负荷变化。'}
            ]
        }
    },
    'okr': {
        icon: '🎯',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'default': {
            scenarios: ['目标管理', '绩效评估', '团队对齐'],
            example: 'OKR填写示例：\n\nO（目标）：打造高效能的研发团队\n\nKR（关键结果）：\nKR1：代码评审覆盖率提升至90%\nKR2：线上故障平均解决时间降至30分钟\nKR3：团队技术分享人均每月2次\n\n评分标准：\n0.6-0.7 完成预期\n0.8-1.0 超预期\n<0.6 需改进',
            tips: ['目标要有挑战性但可实现', '关键结果要可量化衡量', '每个KR有明确的完成标准', 'OKR公开透明全公司可见'],
            mistakes: ['目标过于保守缺乏挑战', 'KR无法量化无法评估', 'OKR与实际工作脱节', '只设不跟踪不回顾'],
            faq: [
                {q: 'OKR和KPI有什么区别？', a: 'OKR关注目标达成和挑战性，不直接关联薪酬；KPI关注指标达成，通常关联考核。'},
                {q: 'OKR设置多少个合适？', a: '建议目标1-3个，每个目标2-4个关键结果。聚焦比面面俱到更重要。'},
                {q: '季度中途可以调整OKR吗？', a: '可以，但需要充分理由和说明。调整后需要在团队内同步。'}
            ]
        }
    },
    'meeting-minutes': {
        icon: '📝',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'default': {
            scenarios: ['会议记录', '决策追踪', '任务派发'],
            example: '会议纪要示例：\n\n会议名称：产品迭代规划会\n时间：2024.6.15 14:00-16:00\n参会人：张三（产品）、李四（开发）、王五（测试）\n\n讨论要点：\n1. Q3产品优先级确认\n2. 技术方案可行性讨论\n3. 测试周期评估\n\n决策事项：\n1. 确定Q3主推功能A\n2. 开发周期延至4周\n\n待办任务：\n- 张三：更新PRD 6.20前\n- 李四：出技术方案 6.18前',
            tips: ['会前确认议程和参会人', '会中记录关键决策和理由', '会后48小时内发出纪要', '明确每项待办的责任人和截止时间'],
            mistakes: ['只记录讨论不记录结论', '待办任务没有明确负责人', '纪要发出不及时', '后续跟进不了了之'],
            faq: [
                {q: '会议纪要应该发给谁？', a: '发给所有参会人，并抄送相关协同部门。让大家知道讨论结论和各自任务。'},
                {q: '纪要应该多详细？', a: '记录决策和待办即可，不需要逐字记录讨论过程。详细程度根据会议重要性调整。'},
                {q: '参会人有不同意见怎么办？', a: '记录各种意见和决策理由，体现决策过程的透明性。'}
            ]
        }
    },
    'sales-followup': {
        icon: '📈',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'default': {
            scenarios: ['客户管理', '销售漏斗', '业绩追踪'],
            example: '销售跟进表示例：\n\n客户名称：XX科技有限公司\n联系人：张总 138xxxx\n需求：CRM系统升级\n\n跟进记录：\n6.10 首次电话沟通，了解需求\n6.15 发送产品介绍资料\n6.20 演示产品功能\n6.25 报价并沟通方案\n\n当前阶段：方案确认中\n预计签单：7月中旬\n预估金额：30万',
            tips: ['每次跟进后立即记录要点', '设置下次跟进提醒', '关注客户决策链和关键人', '分析未成单原因积累经验'],
            mistakes: ['跟进记录不完整', '长时间未联系客户冷淡', '不了解客户真实需求', '只顾推进忽略售后预期管理'],
            faq: [
                {q: '如何提高销售跟进效率？', a: '按销售漏斗分类管理，重点跟进高意向客户，设置自动提醒避免遗漏。'},
                {q: '客户长期不回复怎么办？', a: '可以发送有价值的行业信息或案例，保持存在感，不要频繁催促。'},
                {q: '如何判断客户意向度？', a: '看是否有明确需求、时间表、预算和决策人。四个要素都具备则意向度高。'}
            ]
        }
    },
    'expense-tracking': {
        icon: '💰',
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'default': {
            scenarios: ['个人记账', '家庭理财', '报销管理'],
            example: '记账表示例：\n\n日期：2024.6.15\n\n支出：\n早餐：15元（公司楼下包子店）\n午餐：35元（外卖）\n交通：8元（地铁）\n下午茶：28元（咖啡）\n购物：200元（书籍）\n\n合计：286元\n\n备注：书籍属于自我投资，可适当增加预算',
            tips: ['养成随手记录的习惯', '定期分类统计找出超支项', '区分必要支出和欲望支出', '月末复盘调整下月计划'],
            mistakes: ['嫌麻烦不记录', '只记大额忽略小钱累积', '不分类不知道钱花哪了', '记完不看不分析'],
            faq: [
                {q: '记账最麻烦的是什么？', a: '是坚持。建议选择简单好用的记账工具，养成习惯后每天2分钟即可。'},
                {q: '支付宝微信账单能直接导入吗？', a: '可以，很多记账APP支持自动导入，省去手动输入的麻烦。'},
                {q: '记账能帮我省钱吗？', a: '能，当你清楚看到钱花在哪里，才知道哪些该省。记账只是手段，省钱才是目的。'}
            ]
        }
    }
};

// 获取模板内容的函数
function getContent(templateId, category) {
    const catContent = CONTENT_BY_CATEGORY[category] || CONTENT_BY_CATEGORY['resume'];
    // 先尝试精确匹配
    if (catContent[templateId]) {
        return catContent[templateId];
    }
    // 对于resume类别，再尝试按名称关键词匹配
    if (category === 'resume') {
        if (templateId.includes('developer') || templateId.includes('engineer')) {
            return catContent['developer-resume'];
        }
        if (templateId.includes('designer')) {
            return catContent['developer-resume']; // 使用developer内容作为近似
        }
        if (templateId.includes('teacher')) {
            return catContent['teacher-resume'];
        }
        if (templateId.includes('pm') || templateId.includes('product')) {
            return catContent['classic-resume'];
        }
    }
    // 返回分类默认内容
    return catContent['default'] || {
        scenarios: ['通用场景'],
        example: '请根据实际情况填写内容...',
        tips: ['保持简洁清晰', '突出重点信息', '定期检查更新'],
        mistakes: ['信息不完整', '格式不统一', '缺乏关键细节'],
        faq: [
            {q: '如何使用这个模板？', a: '下载后根据指引填写对应内容即可。'},
            {q: '需要注册账号吗？', a: '不需要，直接下载使用，完全免费。'},
            {q: '可以自定义吗？', a: '可以，根据您的需求修改内容。'}
        ]
    };
}

const catNames = {resume:'简历模板',budget:'Excel预算表',ppt:'PPT模板','project-plan':'项目计划书','daily-report':'工作日报',okr:'OKR模板','meeting-minutes':'会议纪要','sales-followup':'销售跟进表','expense-tracking':'个人记账'};

let updated = 0;

templates.forEach(t => {
    const subdir = MAPPINGS[t.id];
    if (!subdir) return;
    
    const dir = '/root/tools-box/templates/' + t.category + '/' + subdir;
    const file = dir + '/index.html';
    if (!fs.existsSync(file)) return;
    
    const content = getContent(t.id, t.category);
    const catName = catNames[t.category] || t.category;
    const gradient = CONTENT_BY_CATEGORY[t.category]?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    const icon = CONTENT_BY_CATEGORY[t.category]?.icon || '📄';
    
    const seoTitle = (t.seo && t.seo.title) || t.name + ' - 免费效率工具箱';
    const seoDesc = (t.seo && t.seo.description) || '免费下载' + t.name;
    const downloadPath = t.downloadPath || '/assets/' + t.category + '/' + subdir + '.docx';
    const formatType = (t.format || 'DOCX').toUpperCase();
    const stats = t.stats || {views:0, downloads:0};
    const relatedGuide = t.relatedGuide || '';
    
    // 生成独特的FAQ
    const faqHtml = content.faq.map(f=>'<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">'+f.q+'<span>▼</span></button><div class="faq-answer">'+f.a+'</div></div>').join('');
    
    // 生成独特的场景
    const scenariosHtml = content.scenarios.map(s=>'<li><strong>'+s+'</strong></li>').join('');
    
    // 生成独特的技巧
    const tipsHtml = content.tips.map(t=>'<li><strong>'+t+'</strong></li>').join('');
    
    // 生成独特的错误
    const mistakesHtml = content.mistakes.map(m=>'<li>'+m+'</li>').join('');
    
    // 生成填写示例
    const exampleHtml = '<div class="example-box"><pre>' + content.example + '</pre></div>';
    
    // 相关教程
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/'+relatedGuide+'" class="related-item">📖 查看教程 →</a></div>' : '';
    
    const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+seoTitle+'</title><meta name="description" content="'+seoDesc+'"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/'+dir+'"><meta property="og:title" content="'+seoTitle+'"><meta property="og:description" content="'+seoDesc+'"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/'+t.category+'">'+catName+'</a> / <span>'+t.name+'</span></div><div class="template-hero" style="background:'+gradient+'"><h1>'+icon+' '+t.name+'</h1><p>'+(t.description||'')+'</p><div class="template-actions"><a href="'+downloadPath+'" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\''+t.id+'\',\''+t.name.replace(/'/g,"\\'")+'\',\''+dir+'\',\''+icon+'\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 '+formatType+'</span><span>👁️ '+stats.views+' 浏览</span><span>📥 '+stats.downloads+' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>'+scenariosHtml+'</ul></div><div class="template-section"><h2>📝 填写示例</h2>'+exampleHtml+'</div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">'+tipsHtml+'</ul></div><div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">'+mistakesHtml+'</ul></div><div class="template-section"><h2>❓ 常见问题</h2>'+faqHtml+'</div>'+guideSection+'<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="'+t.id+'";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>';
    
    fs.writeFileSync(file, html);
    updated++;
});

console.log('Updated:', updated, 'template pages with enhanced content');
