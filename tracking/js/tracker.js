/**
 * 免费效率工具箱 - 数据追踪器
 * 核心模块：处理所有埋点和事件追踪
 */

(function() {
    'use strict';
    
    // ==================== 配置 ====================
    const CONFIG = {
        debug: false,
        sessionTimeout: 1800000, // 30分钟
        heartbeatInterval: 30000, // 30秒心跳
        bounceThreshold: 30000, // 30秒无交互视为跳出
        storageKey: 'tb_data'
    };
    
    // ==================== 状态 ====================
    let state = {
        sessionId: null,
        userId: null,
        pageStartTime: null,
        lastActivityTime: null,
        isBounced: false,
        events: [],
        config: null
    };
    
    // ==================== 工具函数 ====================
    function log(msg, data) {
        if (CONFIG.debug) {
            console.log('[Tracker]', msg, data || '');
        }
    }
    
    function generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }
    
    function setCookie(name, value, days) {
        const exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + ';path=/';
    }
    
    function getStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || {};
        } catch {
            return {};
        }
    }
    
    function setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            log('Storage error', e);
        }
    }
    
    // ==================== 会话管理 ====================
    function initSession() {
        const stored = getStorage('tb_session');
        
        if (stored && Date.now() - stored.lastActive < CONFIG.sessionTimeout) {
            state.sessionId = stored.sessionId;
            state.userId = stored.userId;
            log('Session restored', state.sessionId);
        } else {
            state.sessionId = generateId();
            state.userId = generateId();
            log('New session created', state.sessionId);
        }
        
        state.lastActivityTime = Date.now();
        saveSession();
    }
    
    function saveSession() {
        setStorage('tb_session', {
            sessionId: state.sessionId,
            userId: state.userId,
            lastActive: Date.now()
        });
    }
    
    function updateActivity() {
        state.lastActivityTime = Date.now();
        saveSession();
    }
    
    // ==================== 事件追踪 ====================
    function trackEvent(category, action, label, value) {
        const event = {
            category: category,
            action: action,
            label: label || '',
            value: value || 0,
            timestamp: Date.now(),
            sessionId: state.sessionId,
            userId: state.userId,
            pageUrl: window.location.pathname,
            pageTitle: document.title
        };
        
        // 保存到本地
        saveEventLocally(event);
        
        // 发送到GA4
        if (window.gtag) {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        
        log('Event tracked', event);
        return event;
    }
    
    function saveEventLocally(event) {
        const events = getStorage('tb_events') || [];
        events.push(event);
        
        // 保留最近1000条
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        setStorage('tb_events', events);
    }
    
    // ==================== 页面浏览追踪 ====================
    function trackPageView() {
        const pageData = {
            url: window.location.pathname,
            title: document.title,
            referrer: document.referrer || '',
            timestamp: Date.now(),
            sessionId: state.sessionId,
            userId: state.userId
        };
        
        // 保存页面访问
        const pageViews = getStorage('tb_pageviews') || [];
        pageViews.push(pageData);
        
        // 保留最近500条
        if (pageViews.length > 500) {
            pageViews.splice(0, pageViews.length - 500);
        }
        
        setStorage('tb_pageviews', pageViews);
        
        // 发送到GA4
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_location: window.location.href,
                page_title: document.title
            });
        }
        
        log('Page view tracked', pageData);
        return pageData;
    }
    
    // ==================== 页面停留时间 ====================
    function initPageTiming() {
        state.pageStartTime = Date.now();
        state.isBounced = false;
        
        // 标记用户活跃
        const activeEvents = ['click', 'scroll', 'keypress', 'mousemove'];
        activeEvents.forEach(eventType => {
            document.addEventListener(eventType, () => {
                state.isBounced = false;
            }, { passive: true });
        });
        
        // 监听页面隐藏
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                savePageDuration();
            }
        });
        
        // 页面离开时
        window.addEventListener('beforeunload', () => {
            savePageDuration();
        });
    }
    
    function savePageDuration() {
        if (!state.pageStartTime) return;
        
        const duration = Date.now() - state.pageStartTime;
        
        // 判断是否跳出
        if (duration > CONFIG.bounceThreshold && state.isBounced === false) {
            // 用户有交互，不是跳出
            state.isBounced = false;
        }
        
        // 保存时长数据
        const durationData = {
            url: window.location.pathname,
            duration: duration,
            bounced: state.isBounced,
            timestamp: Date.now(),
            sessionId: state.sessionId
        };
        
        const durations = getStorage('tb_durations') || [];
        durations.push(durationData);
        
        if (durations.length > 500) {
            durations.splice(0, durations.length - 500);
        }
        
        setStorage('tb_durations', durations);
        
        // 发送到GA4
        if (window.gtag) {
            window.gtag('event', 'timing_complete', {
                name: 'page_duration',
                value: Math.round(duration),
                event_category: 'Timing'
            });
        }
        
        log('Duration saved', durationData);
    }
    
    // ==================== 来源追踪 ====================
    function trackSource() {
        const params = new URLSearchParams(window.location.search);
        
        // UTM参数
        const utmSource = params.get('utm_source');
        const utmMedium = params.get('utm_medium');
        const utmCampaign = params.get('utm_campaign');
        
        const sourceData = {
            source: utmSource || getReferrerSource() || 'direct',
            medium: utmMedium || (document.referrer ? 'referral' : 'none'),
            campaign: utmCampaign || '',
            referrer: document.referrer || '',
            timestamp: Date.now(),
            sessionId: state.sessionId
        };
        
        setStorage('tb_source', sourceData);
        log('Source tracked', sourceData);
        
        return sourceData;
    }
    
    function getReferrerSource() {
        const referrer = document.referrer;
        if (!referrer) return null;
        
        try {
            const url = new URL(referrer);
            const host = url.hostname;
            
            if (host.includes('google')) return 'google';
            if (host.includes('bing')) return 'bing';
            if (host.includes('baidu')) return 'baidu';
            if (host.includes('twitter')) return 'twitter';
            if (host.includes('facebook')) return 'facebook';
            if (host.includes('linkedin')) return 'linkedin';
            
            return host;
        } catch {
            return null;
        }
    }
    
    // ==================== 搜索事件追踪 ====================
    function trackSearch(keyword, resultCount) {
        const searchData = {
            keyword: keyword,
            resultCount: resultCount || 0,
            timestamp: Date.now(),
            sessionId: state.sessionId,
            userId: state.userId
        };
        
        const searches = getStorage('tb_searches') || [];
        searches.push(searchData);
        
        if (searches.length > 500) {
            searches.splice(0, searches.length - 500);
        }
        
        setStorage('tb_searches', searches);
        
        if (window.gtag) {
            window.gtag('event', 'search', {
                search_term: keyword,
                search_results: resultCount
            });
        }
        
        log('Search tracked', searchData);
        return searchData;
    }
    
    // ==================== 收藏事件追踪 ====================
    function trackFavorite(action, itemType, itemId, itemName) {
        const favoriteData = {
            action: action, // 'add' or 'remove'
            itemType: itemType,
            itemId: itemId,
            itemName: itemName,
            timestamp: Date.now(),
            sessionId: state.sessionId,
            userId: state.userId
        };
        
        const favorites = getStorage('tb_favorites') || [];
        favorites.push(favoriteData);
        
        if (favorites.length > 500) {
            favorites.splice(0, favorites.length - 500);
        }
        
        setStorage('tb_favorites', favorites);
        
        if (window.gtag) {
            window.gtag('event', action === 'add' ? 'add_to_favorites' : 'remove_from_favorites', {
                item_id: itemId,
                item_name: itemName,
                item_category: itemType
            });
        }
        
        log('Favorite tracked', favoriteData);
        return favoriteData;
    }
    
    // ==================== 下载事件追踪 ====================
    function trackDownload(itemType, itemId, itemName) {
        const downloadData = {
            itemType: itemType,
            itemId: itemId,
            itemName: itemName,
            sourcePage: window.location.pathname,
            timestamp: Date.now(),
            sessionId: state.sessionId,
            userId: state.userId
        };
        
        const downloads = getStorage('tb_downloads') || [];
        downloads.push(downloadData);
        
        if (downloads.length > 500) {
            downloads.splice(0, downloads.length - 500);
        }
        
        setStorage('tb_downloads', downloads);
        
        if (window.gtag) {
            window.gtag('event', 'file_download', {
                file_name: itemName,
                file_type: itemType
            });
        }
        
        log('Download tracked', downloadData);
        return downloadData;
    }
    
    // ==================== 工具使用追踪 ====================
    function trackToolUse(toolId, toolName, action, metadata) {
        const toolData = {
            toolId: toolId,
            toolName: toolName,
            action: action,
            metadata: metadata || {},
            timestamp: Date.now(),
            sessionId: state.sessionId,
            userId: state.userId
        };
        
        const toolUses = getStorage('tb_tool_uses') || [];
        toolUses.push(toolData);
        
        if (toolUses.length > 500) {
            toolUses.splice(0, toolUses.length - 500);
        }
        
        setStorage('tb_tool_uses', toolUses);
        
        if (window.gtag) {
            window.gtag('event', 'tool_use', {
                tool_name: toolName,
                tool_action: action
            });
        }
        
        log('Tool use tracked', toolData);
        return toolData;
    }
    
    // ==================== 初始化 ====================
    function init(config) {
        CONFIG.debug = config?.debug || false;
        
        log('Tracker initializing', config);
        
        // 初始化会话
        initSession();
        
        // 追踪来源
        trackSource();
        
        // 追踪页面浏览
        trackPageView();
        
        // 初始化时长追踪
        initPageTiming();
        
        // 心跳保持活跃
        setInterval(() => {
            updateActivity();
        }, CONFIG.heartbeatInterval);
        
        // 监听路由变化（如果是SPA）
        if (history.pushState) {
            const originalPushState = history.pushState;
            history.pushState = function() {
                originalPushState.apply(history, arguments);
                trackPageView();
            };
        }
        
        log('Tracker initialized', state);
    }
    
    // ==================== 暴露API ====================
    window.Tracker = {
        init: init,
        trackEvent: trackEvent,
        trackPageView: trackPageView,
        trackSearch: trackSearch,
        trackFavorite: trackFavorite,
        trackDownload: trackDownload,
        trackToolUse: trackToolUse,
        getState: () => state,
        getConfig: () => CONFIG
    };
    
})();