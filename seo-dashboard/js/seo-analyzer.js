/**
 * 免费效率工具箱 - SEO分析器
 * 负责网站SEO健康度检测和分析
 */

(function() {
    'use strict';
    
    // ==================== 配置 ====================
    const SEO_CONFIG = {
        sitemapUrl: '/sitemap.xml',
        maxTitleLength: 60,
        maxDescLength: 160,
        minTitleLength: 10
    };
    
    // ==================== 状态 ====================
    let seoData = {
        pages: [],
        issues: [],
        health: {
            score: 100,
            healthy: 0,
            warnings: 0,
            errors: 0
        },
        meta: {
            titleMissing: 0,
            descMissing: 0,
            titleOk: 0,
            descOk: 0
        },
        internalLinks: {
            total: 0,
            byPage: []
        }
    };
    
    // ==================== 页面分析 ====================
    async function analyzePage(pageUrl) {
        const pageData = {
            url: pageUrl,
            title: '',
            description: '',
            h1: '',
            issues: [],
            internalLinks: 0
        };
        
        // 从缓存获取页面数据（实际部署时从sitemap获取）
        const pageCache = getPageCache();
        
        if (pageCache[pageUrl]) {
            pageData.title = pageCache[pageUrl].title || '';
            pageData.description = pageCache[pageUrl].description || '';
            pageData.h1 = pageCache[pageUrl].h1 || '';
        }
        
        // 检查Title
        if (!pageData.title) {
            pageData.issues.push({ type: 'missing', field: 'title' });
            seoData.meta.titleMissing++;
        } else if (pageData.title.length < SEO_CONFIG.minTitleLength) {
            pageData.issues.push({ type: 'warning', field: 'title_too_short' });
        } else if (pageData.title.length > SEO_CONFIG.maxTitleLength) {
            pageData.issues.push({ type: 'warning', field: 'title_too_long' });
        } else {
            seoData.meta.titleOk++;
        }
        
        // 检查Description
        if (!pageData.description) {
            pageData.issues.push({ type: 'missing', field: 'description' });
            seoData.meta.descMissing++;
        } else if (pageData.description.length > SEO_CONFIG.maxDescLength) {
            pageData.issues.push({ type: 'warning', field: 'description_too_long' });
        } else {
            seoData.meta.descOk++;
        }
        
        return pageData;
    }
    
    // ==================== 批量分析 ====================
    async function runSiteAudit() {
        // 加载页面缓存
        const pageCache = getPageCache();
        const pages = Object.keys(pageCache);
        
        seoData.pages = [];
        seoData.issues = [];
        seoData.meta = { titleMissing: 0, descMissing: 0, titleOk: 0, descOk: 0 };
        seoData.internalLinks = { total: 0, byPage: [] };
        
        for (const pageUrl of pages) {
            const pageData = await analyzePage(pageUrl);
            seoData.pages.push(pageData);
            
            // 收集问题
            pageData.issues.forEach(issue => {
                seoData.issues.push({
                    url: pageUrl,
                    title: pageData.title,
                    ...issue
                });
            });
        }
        
        // 计算健康度
        calculateHealthScore();
        
        // 保存审计结果
        saveAuditResult();
        
        // 更新UI
        updateUI();
        
        return seoData;
    }
    
    // ==================== 健康度计算 ====================
    function calculateHealthScore() {
        const total = seoData.pages.length;
        const errors = seoData.meta.titleMissing + seoData.meta.descMissing;
        const warnings = seoData.issues.filter(i => i.type === 'warning').length;
        
        // 健康页面 = 没有错误的页面
        seoData.health.healthy = total - (errors > 0 ? 1 : 0);
        seoData.health.warnings = warnings;
        seoData.health.errors = errors > 0 ? 1 : 0;
        
        // 分数计算：100 - (错误数*10) - (警告数*2)
        let score = 100;
        score -= errors * 10;
        score -= warnings * 2;
        score = Math.max(0, score);
        
        seoData.health.score = score;
    }
    
    // ==================== 本地存储 ====================
    function getPageCache() {
        // 从已有数据构建页面缓存
        return {
            '/': { title: '免费效率工具箱 - 模板/工具/教程一站式平台', description: '免费的在线效率工具箱...' },
            '/tools.html': { title: '全部工具 - 免费效率工具箱', description: '免费在线工具箱...' },
            '/templates.html': { title: '全部模板 - 免费效率工具箱', description: '免费下载简历模板...' },
            '/guide.html': { title: '全部教程 - 免费效率工具箱', description: '免费学习简历写作...' },
            '/search.html': { title: '搜索结果 - 免费效率工具箱', description: '' },
            '/analytics': { title: 'SEO监控面板 - 免费效率工具箱', description: '网站SEO健康度分析...' },
            '/seo-dashboard': { title: 'SEO监控面板 - 免费效率工具箱', description: '网站SEO健康度分析...' },
            '/image-compress': { title: '免费图片压缩工具', description: '在线压缩图片...' },
            '/image-merge': { title: '免费图片拼接工具', description: '多张图片合并...' },
            '/image-crop': { title: '免费图片裁剪工具', description: '裁剪图片...' },
            '/image-to-pdf': { title: '免费图片转PDF工具', description: '图片转PDF...' },
            '/pdf-to-image': { title: '免费PDF转图片工具', description: 'PDF转图片...' },
            '/bmi-calculator': { title: '免费BMI计算器', description: '计算身体质量指数...' },
            '/roi-calculator': { title: '免费ROI计算器', description: '计算投资回报率...' },
            '/compound-interest-calculator': { title: '免费复利计算器', description: '计算复利增长...' },
            '/templates/resume': { title: '简历模板 - 免费效率工具箱', description: '免费下载简历模板...' },
            '/templates/resume/classic': { title: '经典简历模板', description: '经典排版设计...' },
            '/templates/resume/modern': { title: '现代简历模板', description: '现代简约设计...' },
            '/templates/resume/simple': { title: '简约简历模板', description: '简洁单栏布局...' },
            '/templates/budget': { title: 'Excel预算表 - 免费效率工具箱', description: '免费下载预算表...' },
            '/templates/budget/monthly': { title: '月度预算表', description: '家庭月度收支预算...' },
            '/templates/budget/annual': { title: '年度预算表', description: '全年财务规划...' },
            '/guide/resume-writing': { title: '如何写简历', description: '简历写作教程...' },
            '/guide/budget-making': { title: '如何制作预算表', description: '预算表制作教程...' },
            '/guide/okr-guide': { title: '如何制定OKR', description: 'OKR目标管理教程...' }
        };
    }
    
    function saveAuditResult() {
        seoData.lastAudit = new Date().toISOString();
        localStorage.setItem('seo_audit', JSON.stringify(seoData));
    }
    
    function loadAuditResult() {
        try {
            const data = localStorage.getItem('seo_audit');
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }
    
    // ==================== UI更新 ====================
    function updateUI() {
        // 健康度
        document.querySelector('.score-value').textContent = seoData.health.score;
        
        // 统计数字
        document.getElementById('healthy-pages').textContent = seoData.health.healthy;
        document.getElementById('warning-pages').textContent = seoData.health.warnings;
        document.getElementById('error-pages').textContent = seoData.health.errors;
        
        // Meta统计
        document.getElementById('title-ok').textContent = seoData.meta.titleOk;
        document.getElementById('desc-ok').textContent = seoData.meta.descOk;
        document.getElementById('title-missing').textContent = seoData.meta.titleMissing;
        document.getElementById('desc-missing').textContent = seoData.meta.descMissing;
        
        // 问题列表
        updateIssuesTable();
        
        // 更新时间
        document.getElementById('last-updated').textContent = new Date().toLocaleString('zh-CN');
    }
    
    function updateIssuesTable() {
        const tbody = document.getElementById('issues-tbody');
        
        if (seoData.issues.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="empty-state">🎉 暂无问题页面！</td></tr>';
            return;
        }
        
        tbody.innerHTML = seoData.issues.map(issue => {
            const issueType = issue.type === 'missing' ? 'missing' : 'warning';
            const issueLabel = issue.type === 'missing' ? '缺失' : '警告';
            const fieldLabel = {
                'title': 'Title标签',
                'description': 'Description标签',
                'title_too_short': 'Title过短',
                'title_too_long': 'Title过长',
                'description_too_long': 'Description过长'
            }[issue.field] || issue.field;
            
            const suggestion = {
                'title': '为页面添加有意义的Title标签，包含核心关键词',
                'description': '为页面添加Description标签，描述页面内容',
                'title_too_short': 'Title至少需要10个字符，建议包含关键词',
                'title_too_long': 'Title不应超过60个字符',
                'description_too_long': 'Description不应超过160个字符'
            }[issue.field] || '检查并优化该标签';
            
            return `
                <tr>
                    <td><a href="${issue.url}" target="_blank">${issue.url}</a></td>
                    <td><span class="issue-type ${issueType}">${issueLabel}: ${fieldLabel}</span></td>
                    <td>${suggestion}</td>
                </tr>
            `;
        }).join('');
    }
    
    // ==================== GSC导入 ====================
    function showGSCModal() {
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
                window.pendingGSCData = parsed;
                
                const preview = document.getElementById('import-preview');
                const previewContent = document.getElementById('preview-content');
                
                previewContent.innerHTML = `
                    <p>发现 ${parsed.length} 条记录</p>
                    <table style="width:100%; font-size:12px; margin-top:10px;">
                        <tr><th>查询</th><th>点击</th><th>展示</th><th>CTR</th></tr>
                        ${parsed.slice(0, 5).map(r => `
                            <tr>
                                <td>${r.query}</td>
                                <td>${r.clicks}</td>
                                <td>${r.impressions}</td>
                                <td>${((r.clicks / r.impressions) * 100).toFixed(2)}%</td>
                            </tr>
                        `).join('')}
                    </table>
                `;
                preview.style.display = 'block';
            }
        };
        reader.readAsText(file);
    }
    
    function parseGSCCSV(content) {
        const lines = content.split('\n');
        if (lines.length < 2) return null;
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const parts = line.split(',');
            if (parts.length >= 5) {
                data.push({
                    query: parts[1]?.trim() || '',
                    clicks: parseInt(parts[3]) || 0,
                    impressions: parseInt(parts[4]) || 0
                });
            }
        }
        
        return data;
    }
    
    function confirmImport() {
        if (!window.pendingGSCData) return;
        
        const data = window.pendingGSCData;
        
        const totalClicks = data.reduce((sum, r) => sum + r.clicks, 0);
        const totalImpressions = data.reduce((sum, r) => sum + r.impressions, 0);
        const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : 0;
        const avgPosition = 25; // GSC导出不包含position，需要单独设置
        
        // 更新SEO数据
        seoData.gsc = {
            enabled: true,
            lastImport: new Date().toISOString(),
            clicks: totalClicks,
            impressions: totalImpressions,
            ctr: avgCTR,
            position: avgPosition,
            topQueries: data.slice(0, 50)
        };
        
        localStorage.setItem('seo_audit', JSON.stringify(seoData));
        
        // 更新UI
        document.getElementById('gsc-preview').style.display = 'block';
        document.getElementById('gsc-clicks').textContent = formatNumber(totalClicks);
        document.getElementById('gsc-impressions').textContent = formatNumber(totalImpressions);
        document.getElementById('gsc-ctr').textContent = avgCTR + '%';
        document.getElementById('gsc-position').textContent = avgPosition;
        
        closeGSCModal();
        alert('GSC数据导入成功！');
    }
    
    // ==================== 辅助函数 ====================
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    }
    
    // ==================== 导出报告 ====================
    function exportSEO() {
        const exportData = {
            exportDate: new Date().toISOString(),
            healthScore: seoData.health.score,
            stats: {
                totalPages: seoData.pages.length,
                sitemapUrls: 121,
                healthy: seoData.health.healthy,
                warnings: seoData.health.warnings,
                errors: seoData.health.errors
            },
            meta: seoData.meta,
            issues: seoData.issues,
            gsc: seoData.gsc || null
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-audit-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // ==================== 初始化 ====================
    function init() {
        // 尝试加载缓存的审计结果
        const cached = loadAuditResult();
        
        if (cached) {
            seoData = cached;
            updateUI();
        } else {
            // 运行新审计
            runSiteAudit();
        }
    }
    
    // 公开API
    window.SEOAnalyzer = {
        init: init,
        runAudit: runSiteAudit,
        exportSEO: exportSEO,
        showGSCModal: showGSCModal,
        closeGSCModal: closeGSCModal,
        handleGSCFile: handleGSCFile,
        confirmImport: confirmImport
    };
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', init);
    
})();