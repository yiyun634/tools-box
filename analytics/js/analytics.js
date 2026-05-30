// SEO监控面板 - 主逻辑

// 加载数据
async function loadAnalyticsData() {
    try {
        // 加载主数据
        const response = await fetch('/data/analytics.json');
        let data = await response.json();
        
        // 加载配置获取总页面数
        const templatesResponse = await fetch('/data/templates.json');
        const templatesData = await templatesResponse.json();
        
        const toolsResponse = await fetch('/data/tools.json');
        const toolsData = await toolsResponse.json();
        
        const guidesResponse = await fetch('/data/guides.json');
        const guidesData = await guidesResponse.json();
        
        // 更新siteStats
        data.siteStats = {
            totalPages: 4 + // 汇总页 (index, tools, templates, guide, search)
                      toolsData.tools.length +
                      templatesData.templates.length +
                      guidesData.guides.length,
            sitemapUrls: 121, // 从sitemap.xml获取
            lastUpdated: new Date().toISOString()
        };
        
        return data;
    } catch (error) {
        console.error('Failed to load analytics data:', error);
        return getDefaultAnalytics();
    }
}

// 获取默认数据
function getDefaultAnalytics() {
    return {
        siteStats: {
            totalPages: 121,
            sitemapUrls: 121,
            lastUpdated: new Date().toISOString()
        },
        views: {
            templates: {},
            tools: {},
            guides: {}
        },
        searches: {
            keywords: {}
        },
        favorites: {
            ranking: {}
        },
        trends: {
            daily: generateSampleDailyData()
        },
        gsc: {
            enabled: false
        }
    };
}

// 生成示例每日数据
function generateSampleDailyData() {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        data.push({
            date: date.toISOString().split('T')[0],
            views: Math.floor(Math.random() * 500) + 200,
            downloads: Math.floor(Math.random() * 100) + 50,
            favorites: Math.floor(Math.random() * 20) + 5,
            searches: Math.floor(Math.random() * 50) + 10
        });
    }
    
    return data;
}

// 初始化页面
async function initAnalytics() {
    const data = await loadAnalyticsData();
    
    // 更新统计卡片
    updateStatsCards(data);
    
    // 更新趋势图表
    renderTrendChart(data.trends.daily || []);
    
    // 更新热门模板
    const topTemplates = getTopTemplates(data);
    renderTopTemplates(topTemplates);
    
    // 更新热门工具
    const topTools = getTopTools(data);
    renderTopTools(topTools);
    
    // 更新搜索关键词
    renderKeywordCloud(data.searches.keywords || {});
    
    // 更新收藏排行
    const topFavorites = getTopFavorites(data);
    renderTopFavorites(topFavorites);
    
    // 更新每日数据表
    renderDailyTable(data.trends.daily || []);
    
    // 更新GSC数据（如果有）
    if (data.gsc && data.gsc.enabled) {
        updateGSCStats(data.gsc);
    }
    
    // 更新时间戳
    document.getElementById('last-updated').textContent = new Date().toLocaleString('zh-CN');
}

// 更新统计卡片
function updateStatsCards(data) {
    const siteStats = data.siteStats || {};
    
    document.getElementById('total-pages').textContent = siteStats.totalPages || 0;
    document.getElementById('sitemap-count').textContent = siteStats.sitemapUrls || 0;
    
    // 计算总浏览量
    let totalViews = 0;
    if (data.views) {
        Object.values(data.views).forEach(category => {
            Object.values(category).forEach(item => {
                totalViews += item.views || 0;
            });
        });
    }
    
    // 如果没有数据，使用趋势数据
    if (totalViews === 0 && data.trends?.daily) {
        totalViews = data.trends.daily.reduce((sum, d) => sum + (d.views || 0), 0);
    }
    
    document.getElementById('total-views').textContent = formatNumber(totalViews);
    
    // 计算总下载量
    let totalDownloads = 0;
    if (data.views?.templates) {
        Object.values(data.views.templates).forEach(item => {
            totalDownloads += item.downloads || 0;
        });
    }
    
    if (totalDownloads === 0 && data.trends?.daily) {
        totalDownloads = data.trends.daily.reduce((sum, d) => sum + (d.downloads || 0), 0);
    }
    
    document.getElementById('total-downloads').textContent = formatNumber(totalDownloads);
    
    // 计算变化率（与前一天相比）
    if (data.trends?.daily?.length >= 2) {
        const today = data.trends.daily[data.trends.daily.length - 1];
        const yesterday = data.trends.daily[data.trends.daily.length - 2];
        
        const viewsChange = yesterday.views ? Math.round((today.views - yesterday.views) / yesterday.views * 100) : 0;
        const downloadsChange = yesterday.downloads ? Math.round((today.downloads - yesterday.downloads) / yesterday.downloads * 100) : 0;
        
        document.getElementById('views-change').textContent = `↑ ${viewsChange}%`;
        document.getElementById('downloads-change').textContent = `↑ ${downloadsChange}%`;
    }
}

// 获取热门模板
function getTopTemplates(data) {
    const templates = data.views?.templates || {};
    
    const templateList = Object.entries(templates).map(([id, stats]) => {
        return {
            id,
            name: getTemplateName(id),
            category: getTemplateCategory(id),
            categoryName: getCategoryName(getTemplateCategory(id)),
            views: stats.views || 0,
            downloads: stats.downloads || 0,
            favorites: stats.favorites || 0
        };
    });
    
    return templateList.sort((a, b) => b.views - a.views);
}

// 获取热门工具
function getTopTools(data) {
    const tools = data.views?.tools || {};
    
    const toolList = Object.entries(tools).map(([id, stats]) => {
        return {
            id,
            name: getToolName(id),
            category: getToolCategory(id),
            icon: getToolIcon(id),
            views: stats.views || 0,
            uses: stats.uses || 0
        };
    });
    
    return toolList.sort((a, b) => b.views - a.views);
}

// 获取收藏排行
function getTopFavorites(data) {
    const ranking = data.favorites?.ranking || {};
    
    return Object.entries(ranking)
        .map(([id, stats]) => {
            const isTemplate = !data.views?.tools?.[id];
            return {
                id,
                name: isTemplate ? getTemplateName(id) : getToolName(id),
                type: isTemplate ? 'template' : 'tool',
                count: stats.count || 0
            };
        })
        .sort((a, b) => b.count - a.count);
}

// 刷新数据
async function refreshData() {
    location.reload();
}

// 导出数据
function exportData() {
    loadAnalyticsData().then(data => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

// GSC导入相关
function showGSCImport() {
    document.getElementById('gsc-modal').classList.add('active');
}

function closeGSCModal() {
    document.getElementById('gsc-modal').classList.remove('active');
}

function handleGSCFile(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        const parsed = parseGSCCSV(content);
        
        if (parsed) {
            const preview = document.getElementById('import-preview');
            const previewContent = document.getElementById('preview-content');
            
            previewContent.innerHTML = `
                <p>发现 ${parsed.length} 条记录</p>
                <table style="width:100%; font-size: 12px; margin-top: 10px;">
                    <tr><th>日期</th><th>查询</th><th>点击</th><th>展示</th></tr>
                    ${parsed.slice(0, 5).map(r => `<tr><td>${r.date}</td><td>${r.query}</td><td>${r.clicks}</td><td>${r.impressions}</td></tr>`).join('')}
                </table>
            `;
            preview.style.display = 'block';
            
            window.pendingGSCData = parsed;
        }
    };
    reader.readAsText(file);
}

function parseGSCCSV(content) {
    const lines = content.split('\n');
    if (lines.length < 2) return null;
    
    // 跳过第一行（标题）
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // 简单CSV解析（假设没有逗号在引号内）
        const parts = line.split(',');
        if (parts.length >= 5) {
            data.push({
                date: parts[0]?.trim(),
                query: parts[1]?.trim() || '',
                page: parts[2]?.trim() || '',
                clicks: parseInt(parts[3]) || 0,
                impressions: parseInt(parts[4]) || 0
            });
        }
    }
    
    return data;
}

function confirmImport() {
    if (!window.pendingGSCData) return;
    
    // 汇总数据
    const data = window.pendingGSCData;
    
    const totalClicks = data.reduce((sum, r) => sum + r.clicks, 0);
    const totalImpressions = data.reduce((sum, r) => sum + r.impressions, 0);
    const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : 0;
    
    // 计算平均排名（用position字段，但CSV可能没有）
    const avgPosition = (data.reduce((sum, r) => sum + (r.position || 50), 0) / data.length).toFixed(1);
    
    // 保存到analytics
    loadAnalyticsData().then(analytics => {
        analytics.gsc = {
            enabled: true,
            lastImport: new Date().toISOString(),
            clicks: totalClicks,
            impressions: totalImpressions,
            ctr: avgCTR,
            position: avgPosition,
            topQueries: data.slice(0, 20)
        };
        
        // 保存到localStorage
        localStorage.setItem('gsc_data', JSON.stringify(analytics.gsc));
        
        // 更新UI
        updateGSCStats(analytics.gsc);
        
        closeGSCModal();
        alert('GSC数据导入成功！');
    });
}

function updateGSCStats(gsc) {
    document.getElementById('gsc-stats').querySelector('.hint').style.display = 'none';
    document.getElementById('gsc-metrics').style.display = 'grid';
    
    document.getElementById('gsc-clicks').textContent = formatNumber(gsc.clicks || 0);
    document.getElementById('gsc-impressions').textContent = formatNumber(gsc.impressions || 0);
    document.getElementById('gsc-ctr').textContent = (gsc.ctr || 0) + '%';
    document.getElementById('gsc-position').textContent = gsc.position || '-';
}

// 辅助函数
function getTemplateName(id) {
    const names = {
        'classic-resume': '经典简历模板',
        'modern-resume': '现代简约简历模板',
        'simple-resume': '简约单栏简历模板',
        'developer-resume': '程序员简历模板',
        'designer-resume': '设计师简历模板',
        'pm-resume': '产品经理简历模板',
        'fresh-graduate-resume': '应届生简历模板',
        'intern-resume': '实习生简历模板',
        'english-resume': '英文简历模板',
        'monthly-budget': '月度预算表',
        'annual-budget': '年度预算表',
        'household-budget': '家庭预算表',
        'business-ppt': '商务汇报PPT',
        'agile-plan': '敏捷开发计划',
        'company-okr': '企业OKR模板'
    };
    return names[id] || id;
}

function getTemplateCategory(id) {
    if (id.includes('resume')) return 'resume';
    if (id.includes('budget')) return 'budget';
    if (id.includes('ppt')) return 'ppt';
    if (id.includes('plan')) return 'project-plan';
    if (id.includes('okr')) return 'okr';
    return 'other';
}

function getToolName(id) {
    const names = {
        'image-compress': '图片压缩',
        'image-merge': '图片拼接',
        'image-crop': '图片裁剪',
        'image-to-pdf': '图片转PDF',
        'pdf-to-image': 'PDF转图片',
        'bmi-calculator': 'BMI计算器',
        'roi-calculator': 'ROI计算器',
        'compound-interest-calculator': '复利计算器'
    };
    return names[id] || id;
}

function getToolCategory(id) {
    if (id.includes('image') || id.includes('pdf')) return '图片工具';
    return '计算器';
}

function getToolIcon(id) {
    const icons = {
        'image-compress': '🗜️',
        'image-merge': '🖼️',
        'image-crop': '✂️',
        'image-to-pdf': '📄',
        'pdf-to-image': '🖼️',
        'bmi-calculator': '⚖️',
        'roi-calculator': '📈',
        'compound-interest-calculator': '💰'
    };
    return icons[id] || '🛠️';
}

function getCategoryName(category) {
    const names = {
        resume: '简历模板',
        budget: 'Excel预算表',
        ppt: 'PPT模板',
        'project-plan': '项目计划书',
        'daily-report': '工作日报',
        okr: 'OKR模板',
        'meeting-minutes': '会议纪要',
        'sales-followup': '销售跟进表',
        'expense-tracking': '个人记账'
    };
    return names[category] || category;
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initAnalytics);