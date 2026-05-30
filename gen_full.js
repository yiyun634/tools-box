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

// 简历分类专属内容
const resumeModules = (id) => ({
    module1: {
        title: '💼 岗位适配建议',
        content: id === 'classic-resume' ? '✅ 适合国企、事业单位、传统行业、管理培训生\n✅ 建议配合正式正装照片使用\n✅ 可以根据目标岗位调整简历侧重点' :
        id === 'developer-resume' ? '✅ 适合IT/软件/互联网公司技术岗位\n✅ 技术栈要针对目标公司做定制化调整\n✅ 建议附上GitHub和技术博客链接' :
        id === 'teacher-resume' ? '✅ 适合学校、培训机构、教育管理\n✅ 教师资格证编号必须标注\n✅ 突出班主任经历和教学成果' :
        id === 'pm-resume' ? '✅ 适合互联网产品经理、创业公司负责人\n✅ 突出产品成果和用户规模数据\n✅ 建议附上产品分析报告或原型链接' :
        '✅ 适合大多数职位申请\n✅ 根据目标岗位调整简历重点\n✅ 突出与岗位相关的能力和经验'
    },
    module2: {
        title: '🎯 面试官关注重点',
        content: id === 'developer-resume' ? '🎯 技术栈与岗位匹配度\n🎯 项目经验的技术深度\n🎯 问题解决能力和思路\n🎯 编码习惯和代码质量' :
        id === 'teacher-resume' ? '🎯 教学成果和学生成绩提升数据\n🎯 班主任和管理经验\n🎯 教研能力和学术成果\n🎯 亲和力和表达沟通能力' :
        '🎯 与岗位相关的能力证明\n🎯 项目经验和成果数据\n🎯 学习能力和成长潜力\n🎯 沟通表达和团队协作'
    },
    module3: {
        title: '✨ 简历优化技巧',
        content: id === 'developer-resume' ? '📌 技术栈按熟练程度分层展示\n📌 项目描述用STAR法则：情境-任务-行动-结果\n📌 突出解决的技术难点和方案\n📌 GitHub要有内容，保持活跃度' :
        id === 'classic-resume' ? '📌 用Action Verb开头：负责、主导、完成、推动\n📌 量化成果：提升了X%、增长了X元\n📌 使用行业关键词：通过ATS筛选\n📌 定期更新：根据岗位定制' :
        '📌 简洁专业，重点突出\n📌 量化工作成果用数据说话\n📌 定期更新简历内容\n📌 针对不同岗位做定制化调整'
    }
});

// 预算表分类专属内容
const budgetModules = (id) => ({
    module1: {
        title: '📊 常用Excel公式',
        content: id === 'monthly-budget' ? '📈 SUM求和：=SUM(B2:B30) 计算月度总支出\n📈 IF条件：=IF(B2>预算,"超支","正常") 预警超支\n📈 AVERAGE平均：=AVERAGE(B2:B30) 计算月均支出\n📈 VLOOKUP查找：自动匹配预算类别' :
        id === 'annual-budget' ? '📈 SUMIF条件求和：=SUMIF(A:A,"餐饮",B:B) 按类别汇总\n📈 YEAR/MONTH日期：提取年度月份数据\n📈 INDEX+MATCH查找：跨表匹配数据\n📈 数据透视表：快速汇总年度收支' :
        '📈 SUM求和：=SUM(B2:B10) 计算总计\n📈 IF条件：=IF(B2>1000,"超支","正常")\n📈 AVERAGE平均：=AVERAGE(B2:B10)\n📈 VLOOKUP查找：自动匹配数据'
    },
    module2: {
        title: '💰 预算控制方法',
        content: id === 'monthly-budget' ? '🔒 50-30-20法则：50%必要支出，30%可选，20%储蓄\n🔒 优先级排序：先保证必需支出，有余力再考虑其他\n🔒 准备应急基金：预留10%作为意外支出\n🔒 每周检查一次预算执行情况' :
        id === 'household-budget' ? '🔒 家庭会议：每月讨论财务目标和执行情况\n🔒 透明公开：夫妻双方财务透明，共同决策\n🔒 教育金专项：孩子教育金单独规划\n🔒 养老规划：提前规划退休储蓄' :
        '🔒 记录每一笔支出，不要遗漏\n🔒 区分必要支出和欲望支出\n🔒 设定储蓄目标，先存后花\n🔒 定期复盘调整预算'
    },
    module3: {
        title: '📈 财务规划建议',
        content: id === 'investment-budget' ? '📊 资产配置：分散投资降低风险\n📊 定期投资：基金定投养成习惯\n📊 复利效应：越早开始越好\n📊 风险评估：了解自己的风险承受能力' :
        id === 'annual-budget' ? '📊 长期目标：设定5-10年的财务目标\n📊 保险规划：配置必要的保险保障\n📊 税务规划：合理利用税收优惠\n📊 传承规划：考虑家庭财富传承' :
        '📊 养成记录收支的习惯\n📊 设定明确的储蓄目标\n📊 学习基础投资知识\n📊 定期检视财务状况'
    }
});

// PPT分类专属内容
const pptModules = (id) => ({
    module1: {
        title: '📋 PPT结构设计',
        content: id === 'business-ppt' ? '📐 金字塔结构：结论先行，以上统下\n📐 背景-问题-方案-价值 逻辑框架\n📐 每页一个核心观点，用数据支撑\n📐 故事线：起承转合，引人入胜' :
        id === 'training-ppt' ? '📐 知识结构：循序渐进，由浅入深\n📐 案例丰富：每个知识点配合实际案例\n📐 互动设计：留出讨论和练习时间\n📐 记忆点：每页一个核心要点' :
        '📐 结论先行：先说结论再展开\n📐 逻辑清晰：背景-分析-结论\n📐 视觉化：用图表展示数据\n📐 控制节奏：每页停留适当时间'
    },
    module2: {
        title: '🎨 视觉设计原则',
        content: id === 'business-ppt' ? '🎨 配色：蓝灰、藏青等专业色系\n🎨 字体：标题黑体，正文微软雅黑\n🎨 图片：高质量配图，与内容相关\n🎨 动画：适度使用，不要喧宾夺主' :
        id === 'marketing-ppt' ? '🎨 配色：与品牌调性一致\n🎨 字体：统一字号层次\n🎨 数据可视化：图表直观展示数据\n🎨 留白：保持版面呼吸感' :
        '🎨 配色统一：不超过3种主色\n🎨 字体一致：标题和正文用固定字体\n🎨 图文结合：图片辅助说明\n🎨 层次分明：大小标题区分清晰'
    },
    module3: {
        title: '📊 数据展示技巧',
        content: id === 'business-ppt' ? '📊 用柱状图展示对比，饼图展示占比\n📊 折线图展示趋势变化\n📊 关键数据放大突出显示\n📊 数据来源要标注，增加可信度' :
        id === 'proposal-ppt' ? '📊 ROI对比：展示投入产出比\n📊 竞品对比：表格展示优势\n📊 案例展示：用数据证明效果\n📊 成本明细：用表格清晰列出' :
        '📊 图表优先于文字：用图表代替表格\n📊 标注关键数据：让观众一眼看到重点\n📊 数据来源：注明数据出处增加可信度\n📊 避免歧义：图表要有明确标题和标签'
    }
});

// 项目计划分类专属内容
const projectPlanModules = (id) => ({
    module1: {
        title: '📅 项目拆解方法',
        content: id === 'agile-plan' ? '📌 User Story Map：从用户视角拆解功能\n📌 Sprint规划：2周为一个迭代周期\n📌 任务分解：Epic→Story→Task 层层分解\n📌 Definition of Done：明确完成标准' :
        id === 'waterfall-plan' ? '📌 WBS分解：工作分解结构，层层细化\n📌 任务分配：RACI矩阵明确责任人\n📌 依赖关系：识别任务间的依赖和约束\n📌 里程碑设置：关键节点设置评审' :
        '📌 从大到小：从项目到阶段到任务\n📌 任务粒度：每个任务1-3天可完成\n📌 依赖识别：明确任务间的先后关系\n📌 资源匹配：确保人员和时间充足'
    },
    module2: {
        title: '⚠️ 风险控制方法',
        content: id === 'agile-plan' ? '🔍 风险识别：每个Sprint识别top3风险\n🔍 风险量化：评估概率和影响程度\n🔍 应对策略：规避、转移、减轻、接受\n🔍 风险缓冲：预留应急时间和预算' :
        id === 'startup-plan' ? '🔍 MVP优先：最小可行产品快速验证\n🔍 假设验证：关键假设优先测试\n🔍 敏捷调整：根据反馈快速迭代\n🔍 资源限制：明确核心资源和约束' :
        '🔍 风险识别：列出项目主要风险\n🔍 风险评估：概率高且影响大的优先关注\n🔍 应对计划：为每个重大风险准备应对方案\n🔍 定期回顾：每月检视风险状态'
    },
    module3: {
        title: '📊 甘特图应用',
        content: id === 'agile-plan' ? '📊 Sprint甘特图：展示每个Sprint的任务安排\n📊 燃尽图：追踪Sprint剩余工作量的变化\n📊 版本线：标注关键版本发布日期\n📊 资源负载：展示团队成员的工作分配' :
        id === 'project-plan' ? '📊 阶段甘特图：展示项目各阶段的起止时间\n📊 关键路径：标注项目的关键路径\n📊 里程碑：标注关键节点和交付物\n📊 依赖关系：展示任务间的先后约束' :
        '📊 时间轴：清晰展示任务起止时间\n📊 里程碑：标注关键节点和交付物\n📊 进度追踪：用颜色或填充表示完成度\n📊 资源可视化：展示人员分配情况'
    }
});

// OKR分类专属内容
const okrModules = (id) => ({
    module1: {
        title: '🎯 OKR制定方法',
        content: id === 'company-okr' ? '🎯 战略对齐：公司OKR支撑战略目标\n🎯 自上而下：总部先定，各部门承接\n🎯 挑战目标：目标要有挑战性，70%完成度为佳\n🎯 公开透明：全公司可见，促进对齐' :
        id === 'personal-okr' ? '🎯 成长导向：个人OKR聚焦能力提升\n🎯 可衡量：KR要有明确的衡量标准\n🎯 与工作结合：OKR要与日常工作任务结合\n🎯 自我驱动：主动设定有挑战的目标' :
        '🎯 目标O：有挑战性、鼓舞人心、方向明确\n🎯 关键结果KR：可量化、可实现、有时限\n🎯 聚焦重点：每个周期聚焦3-5个核心目标\n🎯 公开透明：OKR要对团队可见'
    },
    module2: {
        title: '📈 OKR评分与复盘',
        content: id === 'department-okr' ? '📈 中期检查：第6周进行进度检查\n📈 评分讨论：团队一起评分和讨论\n📈 经验沉淀：好的实践固化，差的改进\n📈 跨部门对齐：与关联部门同步OKR进展' :
        id === 'team-okr' ? '📈 周检视：每周五回顾本周OKR进展\n📈 月评分：每月进行团队评分\n📈 季度复盘：总结本季度团队成果\n📈 跨团队协调：与其他团队同步进展' :
        '📈 评分标准：0.6-0.7完成预期，0.8-1.0超预期\n📈 季度评分：季度末进行评分和回顾\n📈 复盘内容：完成情况、经验教训、下期改进\n📈 与绩效脱钩：OKR不是绩效考核依据'
    },
    module3: {
        title: '🔗 OKR与绩效管理',
        content: id === 'company-okr' ? '🔗 战略落地：OKR是战略落地的工具\n🔗 组织对齐：全公司聚焦同一目标\n🔗 文化塑造：高绩效文化的基础\n🔗 资源配置：OKR指导资源分配决策' :
        id === 'personal-okr' ? '🔗 成长记录：OKR记录个人成长轨迹\n🔗 能力聚焦：每个周期聚焦2-3项核心能力\n🔗 反馈循环：通过OKR获得及时反馈\n🔗 职业发展：OKR与职业发展规划结合' :
        '🔗 目标对齐：个人目标支撑团队目标\n🔗 进展追踪：通过OKR追踪成长进度\n🔗 反馈机制：定期获得上级反馈\n🔗 持续改进：在OKR中学习成长'
    }
});

// 日报分类专属内容
const dailyReportModules = (id) => ({
    module1: {
        title: '📝 日报撰写方法',
        content: id === 'daily-report-template' ? '📝 关键任务法：只记录最重要的3件事\n📝 番茄工作法：按25分钟分段记录\n📝 问题导向：重点记录遇到的问题和解决方案\n📝 数据说话：用数字量化工作成果' :
        id === 'weekly-report-template' ? '📝 周度视角：总结本周完成的关键成果\n📝 下周计划：提前规划下周重点工作\n📝 跨项目追踪：同时追踪多个项目的进展\n📝 数据汇总：用数据展示一周的工作量' :
        id === 'monthly-report-template' ? '📝 月度视角：总结本月核心成果和KPI\n📝 问题分析：深入分析遇到的问题和根因\n📝 经验沉淀：沉淀可复用的工作方法和经验\n📝 下月规划：设定下月目标和关键任务' :
        '📝 简洁明了：控制在5行以内\n📝 重点突出：只记录关键任务和成果\n📝 时间顺序：按时间或优先级排列\n📝 反思改进：记录问题和改进想法'
    },
    module2: {
        title: '⏰ 时间管理技巧',
        content: id === 'daily-report-template' ? '⏰ 四象限法：按重要紧急程度分配时间\n⏰ 番茄工作法：25分钟专注工作，5分钟休息\n⏰ 批量处理：同类任务集中处理\n⏰ 早起规划：早上10分钟规划全天工作' :
        id === 'project-weekly-report' ? '⏰ 周一规划：明确本周最重要的5件事\n⏰ 周三检视：中期检查进度，调整计划\n⏰ 周五复盘：总结本周完成情况\n⏰ 预留缓冲：留出20%时间处理意外' :
        '⏰ 优先处理重要紧急的事\n⏰ 集中处理碎片化任务\n⏰ 预留应急时间处理意外\n⏰ 定期检视时间使用效率'
    },
    module3: {
        title: '📊 工作成果量化',
        content: id === 'sales-daily-report' ? '📊 新增客户：今日新增多少潜在客户\n📊 跟进记录：今日跟进多少客户\n📊 成交金额：今日成交多少钱\n📊 转化率：跟进转化为成交的比例' :
        id === 'operations-daily-report' ? '📊 DAU/MAU：日活月活数据\n📊 内容产出：发布多少内容\n📊 用户反馈：收到多少反馈和投诉\n📊 问题解决：解决了多少用户问题' :
        '📊 数量指标：完成了多少\n📊 质量指标：完成质量如何\n📊 效率指标：花费了多少时间\n📊 影响指标：带来了什么影响'
    }
});

// 销售跟进分类专属内容
const salesFollowupModules = (id) => ({
    module1: {
        title: '📋 客户管理流程',
        content: id === 'crm-sales-followup' ? '📋 漏斗阶段：线索→意向→谈判→成交→服务\n📋 转化率追踪：每个阶段的转化率\n📋 时间节点：每个阶段的平均周期\n📋 异常预警：阶段停滞超预期提醒' :
        id === 'potential-customer-table' ? '📋 线索获取：通过展会、网络、广告等渠道获取\n📋 线索筛选：通过电话沟通筛选意向客户\n📋 需求确认：了解客户需求和购买时间表\n📋 机会转化：将高意向客户转为签约客户' :
        '📋 客户分层：ABC分类，重点客户重点跟进\n📋 跟进频率：A类客户每周2次，B类每周1次\n📋 跟进记录：每次跟进详细记录要点\n📋 下次计划：每次跟进明确下次跟进时间'
    },
    module2: {
        title: '💡 成交率提升技巧',
        content: id === 'contract-tracking-table' ? '💡 合同条款：明确付款方式、交付时间\n💡 风险条款：识别合同中的风险点\n💡 执行跟踪：定期跟踪合同执行情况\n💡 变更管理：合同变更要走审批流程' :
        id === 'record' ? '💡 快速响应：客户咨询5分钟内响应\n💡 专业形象：展示行业专业知识\n💡 信任建立：通过案例和口碑建立信任\n💡 跟进节奏：保持适度频率，不冷淡不骚扰' :
        '💡 了解需求：不盲目推销，先了解客户需求\n💡 展示价值：让客户看到产品/服务的价值\n💡 处理异议：客户有顾虑时及时解答\n💡 促进成交：适度催促，不要太佛系'
    },
    module3: {
        title: '🔧 销售工具使用',
        content: id === 'crm-sales-followup' ? '🔧 录入完整：客户信息录入要完整准确\n🔧 标签管理：用标签分类客户，便于筛选\n🔧 自动化：设置自动化任务和提醒\n🔧 数据分析：用CRM数据分析客户行为' :
        id === 'potential-customer-table' ? '🔧 数据来源：记录线索来源渠道\n🔧 评分机制：给线索评分，优先跟进高评分\n🔧 跟进提醒：设置下次跟进时间\n🔧 转化分析：分析转化率低的阶段原因' :
        '🔧 及时录入：跟进后立即录入CRM\n🔧 完整记录：记录客户需求、跟进进展\n🔧 设置提醒：重要节点设置提醒\n🔧 定期整理：定期清理和更新客户信息'
    }
});

// 会议纪要分类专属内容
const meetingMinutesModules = (id) => ({
    module1: {
        title: '📝 会议纪要要点',
        content: id === 'executive-minutes' ? '📝 高管会议：决策事项、战略方向、资源调配\n📝 决策记录：每个决策的背景和理由\n📝 行动方案：明确责任人和完成时间\n📝 战略对齐：确保高管团队方向一致' :
        id === 'project-meeting-minutes' ? '📝 技术评审：方案可行性、技术风险、资源需求\n📝 进度同步：各模块进度和问题\n📝 决策事项：技术选型、架构调整等\n📝 后续行动：明确各团队的后续任务' :
        '📝 会议主题：明确讨论的核心问题\n📝 关键决策：记录达成的共识和决定\n📝 待办任务：明确责任人和截止时间\n📝 后续跟进：下次会议需要确认的内容'
    },
    module2: {
        title: '✅ 行动项跟踪',
        content: id === 'project-meeting-minutes' ? '✅ 任务分配：每个行动项指定责任人\n✅ 时间节点：明确完成时间和交付物\n✅ 进度检查：定期检查行动项进展\n✅ 结果验收：确认行动项完成情况' :
        '✅ 明确责任：每个行动项落实到人\n✅ 设定截止：清楚的任务完成时间\n✅ 定期跟进：检查行动项执行情况\n✅ 结果反馈：行动完成后的反馈闭环'
    },
    module3: {
        title: '📊 会议效率提升',
        content: id === 'standard-minutes' ? '📊 会前准备：提前发送议程和资料\n📊 时间控制：控制在预定时间内\n📊 参与度：确保关键人员参与\n📊 会后跟进：48小时内发出会议纪要' :
        '📊 明确目的：每次会议有清晰的目标\n📊 限制人数：只邀请必要人员\n📊 缩短时间：站着开会可以缩短时间\n📊 避免偏移：及时拉回讨论主题'
    }
});

// 默认模块
const defaultModules = () => ({
    module1: {title: '📋 使用指南', content: '✅ 根据实际情况填写对应内容\n✅ 保持信息完整和准确\n✅ 定期检查和更新内容\n✅ 如有问题参考常见问题部分'},
    module2: {title: '💡 实用技巧', content: '📌 保持简洁清晰，重点突出\n📌 定期备份重要数据\n📌 根据实际使用情况调整格式\n📌 遇到问题及时记录和解决'},
    module3: {title: '⚠️ 注意事项', content: '⚠️ 定期保存，避免数据丢失\n⚠️ 信息填写要准确完整\n⚠️ 重要数据建议多重备份\n⚠️ 遵守公司相关规定和要求'}
});

// 获取模块函数
function getModules(category, templateId) {
    switch(category) {
        case 'resume': return resumeModules(templateId);
        case 'budget': return budgetModules(templateId);
        case 'ppt': return pptModules(templateId);
        case 'project-plan': return projectPlanModules(templateId);
        case 'okr': return okrModules(templateId);
        case 'daily-report': return dailyReportModules(templateId);
        case 'sales-followup': return salesFollowupModules(templateId);
        default: return defaultModules();
    }
}

let updated = 0;

templates.forEach(t => {
    const subdir = MAPPINGS[t.id];
    if (!subdir) return;
    
    const dir = '/root/tools-box/templates/' + t.category + '/' + subdir;
    const file = dir + '/index.html';
    if (!fs.existsSync(file)) return;
    
    const modules = getModules(t.category, t.id);
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
    const scenarios = t.scenarios || ['适用于日常工作'];
    const tips = t.tips || ['使用前请仔细阅读说明'];
    const mistakes = t.mistakes || ['避免常见错误'];
    const faq = t.faq || [];
    const example = t.example || '请根据实际情况填写...\n基础信息：名称、日期、分类等\n具体内容：根据模板类型填写';
    
    const scenariosHtml = scenarios.map(s=>'<li><strong>'+s+'</strong></li>').join('');
    const tipsHtml = tips.map(t=>'<li><strong>'+t+'</strong></li>').join('');
    const mistakesHtml = mistakes.map(m=>'<li>'+m+'</li>').join('');
    const faqHtml = faq.length > 0 ? faq.map(f=>'<div class="faq-item"><button class="faq-question" onclick="toggleFAQ(this)">'+f.question+'<span>▼</span></button><div class="faq-answer">'+f.answer+'</div></div>').join('') : '<p>暂无FAQ</p>';
    const exampleHtml = '<div class="example-box"><pre>' + example + '</pre></div>';
    const guideSection = relatedGuide ? '<div class="template-section"><h2>📚 相关教程</h2><a href="/guide/'+relatedGuide+'" class="related-item">📖 查看教程 →</a></div>' : '';
    
    // 分类专属模块
    const module1Html = '<div class="template-section"><h2>' + modules.module1.title + '</h2><div class="module-content"><pre>' + modules.module1.content + '</pre></div></div>';
    const module2Html = '<div class="template-section"><h2>' + modules.module2.title + '</h2><div class="module-content"><pre>' + modules.module2.content + '</pre></div></div>';
    const module3Html = '<div class="template-section"><h2>' + modules.module3.title + '</h2><div class="module-content"><pre>' + modules.module3.content + '</pre></div></div>';
    
    const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+seoTitle+'</title><meta name="description" content="'+seoDesc+'"><link rel="stylesheet" href="/css/main.css"><link rel="canonical" href="https://tools-box-topaz.vercel.app/'+dir+'"><meta property="og:title" content="'+seoTitle+'"><meta property="og:description" content="'+seoDesc+'"></head><body><header class="header"><div class="container header-inner"><a href="/" class="logo">🧰 <span>免费效率工具箱</span></a><div class="search-box"><input type="text" id="search-input" placeholder="搜索工具、模板、教程..."><button onclick="search()">🔍</button></div><nav class="nav"><a href="/tools.html">🛠️ 工具</a><a href="/templates.html">📄 模板</a><a href="/guide.html">📚 教程</a></nav></div></header><main class="main"><div class="container template-detail"><div class="breadcrumb"><a href="/">首页</a> / <a href="/templates">模板中心</a> / <a href="/templates/'+t.category+'">'+catName+'</a> / <span>'+t.name+'</span></div><div class="template-hero" style="background:'+gradient+'"><h1>'+icon+' '+t.name+'</h1><p>'+seoDesc+'</p><div class="template-actions"><a href="'+downloadPath+'" class="btn btn-primary" download>📥 免费下载</a><button class="btn btn-secondary" id="favorite-btn" onclick="toggleFavorite(\''+t.id+'\',\''+t.name.replace(/'/g,"\\'")+'\',\''+dir+'\',\''+icon+'\')">🤍 收藏</button><button class="btn btn-secondary" onclick="copyLink()">📋 复制链接</button></div><div class="template-meta"><span>📁 '+formatType+'</span><span>👁️ '+stats.views+' 浏览</span><span>📥 '+stats.downloads+' 下载</span></div></div><div class="ad-placeholder">广告位 - 顶部</div><div class="template-section"><h2>💡 使用场景</h2><ul>'+scenariosHtml+'</ul></div><div class="template-section"><h2>📝 填写示例</h2>'+exampleHtml+'</div><div class="ad-placeholder">广告位 - 中部</div><div class="template-section"><h2>🔥 使用技巧</h2><ul class="tips-list">'+tipsHtml+'</ul></div>' + module1Html + module2Html + module3Html + '<div class="template-section"><h2>⚠️ 常见错误</h2><ul class="tips-list">'+mistakesHtml+'</ul></div><div class="template-section"><h2>❓ 常见问题</h2>'+faqHtml+'</div>'+guideSection+'<div class="ad-placeholder">广告位 - 底部</div></div></main><footer class="footer"><div class="container footer-bottom"><p>© 2026 免费效率工具箱 - 所有模板完全免费</p></div></footer><script>function search(){var q=document.getElementById("search-input").value.trim();if(q)location.href="/search.html?q="+encodeURIComponent(q);}document.getElementById("search-input").addEventListener("keypress",function(e){if(e.key==="Enter")search();});function toggleFAQ(b){b.parentElement.classList.toggle("open");}function toggleFavorite(id,name,path,icon){var btn=document.getElementById("favorite-btn");var d=JSON.parse(localStorage.getItem("analytics")||"{\\"favorites\\":{\\"items\\":[]}}");var i=d.favorites.items.findIndex(function(x){return x.id===id;});if(i>=0){d.favorites.items.splice(i,1);btn.textContent="🤍 收藏";}else{d.favorites.items.push({type:"template",id:id,name:name,path:path,icon:icon,timestamp:Date.now()});btn.textContent="❤️ 已收藏";}localStorage.setItem("analytics",JSON.stringify(d));}function copyLink(){navigator.clipboard.writeText(location.href).then(function(){alert("链接已复制！");});}var local=JSON.parse(localStorage.getItem("analytics")||"{}");if(local.favorites&&local.favorites.items&&local.favorites.items.find(function(x){return x.id=="'+t.id+'";})){document.getElementById("favorite-btn").textContent="❤️ 已收藏";}</script></body></html>';
    
    fs.writeFileSync(file, html);
    updated++;
});

console.log('Generated:', updated, 'pages with category modules');
