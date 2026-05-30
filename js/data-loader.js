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

    // 加载所有数据
    async loadAll() {
        const [tools, templates, guides, searchIndex, analytics] = await Promise.all([
            this.loadJSON('tools.json'),
            this.loadJSON('templates.json'),
            this.loadJSON('guides.json'),
            this.loadJSON('search-index.json'),
            this.loadJSON('analytics.json')
        ]);

        return { tools, templates, guides, searchIndex, analytics };
    }

    // 获取工具列表
    async getTools() {
        const data = await this.loadJSON('tools.json');
        return data?.tools || [];
    }

    // 获取模板列表
    async getTemplates() {
        const data = await this.loadJSON('templates.json');
        return data?.templates || [];
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

    // 获取搜索索引
    async getSearchIndex() {
        const data = await this.loadJSON('search-index.json');
        return data?.index || [];
    }

    // 搜索
    async search(query) {
        if (!query || query.length < 2) return { tools: [], templates: [], guides: [] };
        
        const index = await this.getSearchIndex();
        const q = query.toLowerCase();
        
        const results = index.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(q);
            const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(q));
            return nameMatch || keywordMatch;
        });

        return {
            tools: results.filter(r => r.type === 'tool'),
            templates: results.filter(r => r.type === 'template'),
            guides: results.filter(r => r.type === 'guide')
        };
    }

    // 获取热门内容
    async getHot() {
        const data = await this.loadJSON('analytics.json');
        const hot = data?.hot || {};
        
        const templates = await this.getTemplates();
        const tools = await this.getTools();
        const guides = await this.getGuides();

        return {
            hotTemplates: (hot.hotTemplates || []).map(id => templates.find(t => t.id === id)).filter(Boolean),
            hotTools: (hot.hotTools || []).map(id => tools.find(t => t.id === id)).filter(Boolean),
            hotGuides: (hot.hotGuides || []).map(id => guides.find(g => g.id === id)).filter(Boolean)
        };
    }

    // 获取最近使用
    async getRecentlyUsed() {
        const data = await this.loadJSON('analytics.json');
        const recentlyUsed = data?.recentlyUsed || { items: [] };
        
        const templates = await this.getTemplates();
        const tools = await this.getTools();
        
        return recentlyUsed.items.map(item => {
            if (item.type === 'template') {
                return { ...item, data: templates.find(t => t.id === item.id) };
            } else if (item.type === 'tool') {
                return { ...item, data: tools.find(t => t.id === item.id) };
            }
            return item;
        }).filter(item => item.data);
    }

    // 添加到最近使用
    async addToRecentlyUsed(type, id) {
        const data = await this.loadJSON('analytics.json') || {};
        const recentlyUsed = data.recentlyUsed || { items: [], maxItems: 10 };
        
        // 移除已存在的
        recentlyUsed.items = recentlyUsed.items.filter(item => !(item.type === type && item.id === id));
        
        // 添加到开头
        recentlyUsed.items.unshift({ type, id, timestamp: Date.now() });
        
        // 限制数量
        recentlyUsed.items = recentlyUsed.items.slice(0, recentlyUsed.maxItems || 10);
        recentlyUsed.lastUpdated = new Date().toISOString();
        
        data.recentlyUsed = recentlyUsed;
        
        // 保存到localStorage（前端本地存储）
        localStorage.setItem('analytics', JSON.stringify(data));
    }

    // 获取收藏
    async getFavorites() {
        const data = await this.loadJSON('analytics.json');
        const favorites = data?.favorites || { items: [] };
        
        const templates = await this.getTemplates();
        const tools = await this.getTools();
        
        return favorites.items.map(item => {
            if (item.type === 'template') {
                return { ...item, data: templates.find(t => t.id === item.id) };
            } else if (item.type === 'tool') {
                return { ...item, data: tools.find(t => t.id === item.id) };
            }
            return item;
        }).filter(item => item.data);
    }

    // 切换收藏状态
    async toggleFavorite(type, id) {
        const data = await this.loadJSON('analytics.json') || {};
        const favorites = data.favorites || { items: [] };
        
        const index = favorites.items.findIndex(item => item.type === type && item.id === id);
        
        if (index >= 0) {
            favorites.items.splice(index, 1);
        } else {
            favorites.items.push({ type, id, timestamp: Date.now() });
        }
        
        favorites.lastUpdated = new Date().toISOString();
        data.favorites = favorites;
        
        localStorage.setItem('analytics', JSON.stringify(data));
        
        return index < 0; // 返回是否添加成功
    }

    // 加载本地收藏数据
    loadLocalFavorites() {
        try {
            const local = localStorage.getItem('analytics');
            return local ? JSON.parse(local) : null;
        } catch {
            return null;
        }
    }
}

// 全局实例
const dataLoader = new DataLoader();

// 导出
window.DataLoader = DataLoader;
window.dataLoader = dataLoader;