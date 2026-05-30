/**
 * 免费效率工具箱 - 追踪集成器
 * 自动加载GA4和Clarity，注入追踪代码
 */

(function() {
    'use strict';
    
    // ==================== 配置加载 ====================
    async function loadConfig() {
        const [ga4Config, clarityConfig] = await Promise.all([
            fetch('/config/ga4.json').then(r => r.json()).catch(() => ({})),
            fetch('/config/clarity.json').then(r => r.json()).catch(() => ({}))
        ]);
        
        return { ga4Config, clarityConfig };
    }
    
    // ==================== GA4初始化 ====================
    function initGA4(config) {
        if (!config.enabled || !config.measurementId) {
            console.log('[Tracker] GA4 not configured');
            return;
        }
        
        // 加载GA4脚本
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.measurementId;
        document.head.appendChild(script);
        
        // 初始化dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', config.measurementId, {
            send_page_view: false, // 我们自己控制page_view
            cookie_domain: config.cookieDomain || 'auto',
            cookie_expires: config.cookieExpires || 63072000
        });
        
        console.log('[Tracker] GA4 initialized with ID:', config.measurementId);
    }
    
    // ==================== Clarity初始化 ====================
    function initClarity(config) {
        if (!config.enabled || !config.projectId) {
            console.log('[Tracker] Clarity not configured');
            return;
        }
        
        // 加载Clarity脚本
        (function(c, l, a, r, i, t, y) {
            c[a] = c[a] || function() {
                (c[a].q = c[a].q || []).push(arguments);
            };
            t = l.createElement(r);
            t.async = 1;
            t.src = 'https://www.clarity.ms/tag/' + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', config.projectId);
        
        console.log('[Tracker] Clarity initialized with Project ID:', config.projectId);
    }
    
    // ==================== 页面追踪 ====================
    function trackPage(pageData) {
        if (!window.gtag) return;
        
        window.gtag('event', 'page_view', {
            page_location: window.location.href,
            page_title: pageData.title || document.title,
            page_referrer: pageData.referrer || document.referrer || ''
        });
    }
    
    // ==================== 事件绑定 ====================
    function bindEvents() {
        // 搜索事件
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('search', function() {
                if (this.value) {
                    trackEvent('search', 'search', this.value);
                }
            });
        }
        
        // 收藏按钮
        document.querySelectorAll('[id="favorite-btn"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const templateId = getCurrentTemplateId();
                if (templateId) {
                    trackEvent('favorite', this.textContent.includes('已收藏') ? 'remove' : 'add', templateId);
                }
            });
        });
        
        // 下载按钮
        document.querySelectorAll('a[download]').forEach(link => {
            link.addEventListener('click', function() {
                const href = this.getAttribute('href');
                if (href && href.includes('/assets/')) {
                    const filename = href.split('/').pop();
                    trackEvent('download', 'file_download', filename);
                }
            });
        });
        
        // 工具使用按钮
        document.querySelectorAll('button[class*="btn-primary"]').forEach(btn => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('压缩') || text.includes('转换') || text.includes('计算')) {
                btn.addEventListener('click', function() {
                    const toolId = getCurrentToolId();
                    trackEvent('tool_use', 'tool_action', toolId);
                });
            }
        });
    }
    
    function getCurrentTemplateId() {
        const path = window.location.pathname;
        const match = path.match(/\/templates\/[^\/]+\/([^\/]+)/);
        return match ? match[1] : null;
    }
    
    function getCurrentToolId() {
        const path = window.location.pathname;
        return path.replace('/', '');
    }
    
    function trackEvent(category, action, label) {
        if (!window.gtag) return;
        
        window.gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // ==================== 自动初始化 ====================
    async function init() {
        const { ga4Config, clarityConfig } = await loadConfig();
        
        // 初始化追踪器
        initGA4(ga4Config);
        initClarity(clarityConfig);
        
        // 页面加载完成后追踪
        window.addEventListener('load', function() {
            setTimeout(function() {
                trackPage({
                    title: document.title,
                    referrer: document.referrer
                });
            }, 100);
        });
        
        // 绑定事件
        bindEvents();
        
        console.log('[Tracker] Integration initialized');
    }
    
    // ==================== 公开API ====================
    window.TrackerIntegration = {
        init: init,
        trackPage: trackPage,
        trackEvent: trackEvent
    };
    
    // 自动初始化
    init();
    
})();