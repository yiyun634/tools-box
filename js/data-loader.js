// 免费效率工具箱 - 数据加载器

class DataLoader {
    constructor() {
        this.dataPath = '/data/';
        this.cache = {};
    }

    async loadJSON(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }
        
        try {
            const response = await fetch(this.dataPath + filename);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            this.cache[filename] = data;
            return data;
        } catch (error) {
            console.error(`Failed to load ${filename}:`, error);
            return null;
        }
    }

    // 模板子目录映射
    getTemplateSubdir(templateId) {
        const map = {
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
        };
        return map[templateId] || templateId;
    }

    // 获取模板列表
    async getTemplates() {
        const data = await this.loadJSON('templates.json');
        const templates = data?.templates || [];
        // 为每个模板添加path字段
        return templates.map(t => ({
            ...t,
            path: `/templates/${t.category}/${this.getTemplateSubdir(t.id)}/`
        }));
    }

    // 获取教程列表
    async getGuides() {
        const data = await this.loadJSON('guides.json');
        return data?.guides || [];
    }

    // 获取分类
    async getCategories() {
        const data = await this.loadJSON('categories.json');
        return data?.categories || [];
    }

    // 按分类获取模板
    async getTemplatesByCategory(categoryId) {
        const templates = await this.getTemplates();
        return templates.filter(t => t.category === categoryId);
    }

    // 获取单个模板
    async getTemplate(templateId) {
        const templates = await this.getTemplates();
        return templates.find(t => t.id === templateId);
    }

    // 获取单个教程
    async getGuide(guideId) {
        const guides = await this.getGuides();
        return guides.find(g => g.id === guideId);
    }
}

// 全局数据加载器
const dataLoader = new DataLoader();