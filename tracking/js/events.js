/**
 * 免费效率工具箱 - 事件定义
 * 定义所有可追踪的事件类型
 */

(function() {
    'use strict';
    
    // ==================== 事件常量 ====================
    const EVENT_TYPES = {
        // 页面事件
        PAGE_VIEW: 'page_view',
        TIMING: 'timing',
        SCROLL: 'scroll_depth',
        
        // 搜索事件
        SEARCH: 'search',
        SEARCH_RESULT: 'search_result',
        
        // 收藏事件
        FAVORITE_ADD: 'favorite_add',
        FAVORITE_REMOVE: 'favorite_remove',
        
        // 下载事件
        DOWNLOAD: 'file_download',
        
        // 工具使用事件
        TOOL_USE: 'tool_use',
        TOOL_COMPLETE: 'tool_complete',
        TOOL_ERROR: 'tool_error',
        
        // 用户交互事件
        CLICK: 'click',
        COPY_LINK: 'copy_link',
        SHARE: 'share',
        
        // 自定义事件
        CUSTOM: 'custom_event'
    };
    
    // ==================== 工具类型映射 ====================
    const TOOL_TYPES = {
        'image-compress': { name: '图片压缩', category: 'image' },
        'image-merge': { name: '图片拼接', category: 'image' },
        'image-crop': { name: '图片裁剪', category: 'image' },
        'image-to-pdf': { name: '图片转PDF', category: 'image' },
        'pdf-to-image': { name: 'PDF转图片', category: 'pdf' },
        'bmi-calculator': { name: 'BMI计算器', category: 'calc' },
        'roi-calculator': { name: 'ROI计算器', category: 'calc' },
        'compound-interest-calculator': { name: '复利计算器', category: 'calc' }
    };
    
    // ==================== 模板类型映射 ====================
    const TEMPLATE_TYPES = {
        'resume': { name: '简历模板', icon: '📝' },
        'budget': { name: 'Excel预算表', icon: '📊' },
        'ppt': { name: 'PPT模板', icon: '📑' },
        'project-plan': { name: '项目计划书', icon: '📋' },
        'daily-report': { name: '工作日报', icon: '📅' },
        'okr': { name: 'OKR模板', icon: '🎯' },
        'meeting-minutes': { name: '会议纪要', icon: '📝' },
        'sales-followup': { name: '销售跟进表', icon: '📈' },
        'expense-tracking': { name: '个人记账', icon: '💰' }
    };
    
    // ==================== 工具函数 ====================
    function getToolInfo(toolId) {
        return TOOL_TYPES[toolId] || { name: toolId, category: 'other' };
    }
    
    function getTemplateInfo(category) {
        return TEMPLATE_TYPES[category] || { name: category, icon: '📄' };
    }
    
    // ==================== 事件追踪包装器 ====================
    function createTracker(gtag) {
        return {
            // 页面浏览
            trackPageView: function(pageData) {
                if (gtag) {
                    gtag('event', 'page_view', {
                        page_location: pageData.url,
                        page_title: pageData.title,
                        page_referrer: pageData.referrer || ''
                    });
                }
            },
            
            // 搜索事件
            trackSearch: function(keyword, resultCount) {
                if (gtag) {
                    gtag('event', 'search', {
                        search_term: keyword,
                        search_results: resultCount || 0
                    });
                }
            },
            
            // 收藏事件
            trackFavorite: function(action, itemType, itemId, itemName) {
                if (gtag) {
                    const eventName = action === 'add' ? 'add_to_favorites' : 'remove_from_favorites';
                    gtag('event', eventName, {
                        item_id: itemId,
                        item_name: itemName,
                        item_category: itemType
                    });
                }
            },
            
            // 下载事件
            trackDownload: function(itemType, itemId, itemName) {
                if (gtag) {
                    gtag('event', 'file_download', {
                        file_name: itemName,
                        file_type: itemType,
                        item_id: itemId
                    });
                }
            },
            
            // 工具使用
            trackToolUse: function(toolId, toolName, action) {
                if (gtag) {
                    gtag('event', 'tool_use', {
                        tool_id: toolId,
                        tool_name: toolName,
                        tool_action: action
                    });
                }
            },
            
            // 工具完成
            trackToolComplete: function(toolId, duration, outputSize) {
                if (gtag) {
                    gtag('event', 'tool_complete', {
                        tool_id: toolId,
                        duration_ms: duration,
                        output_size: outputSize || 0
                    });
                }
            },
            
            // 自定义事件
            trackCustom: function(category, action, label, value) {
                if (gtag) {
                    gtag('event', action, {
                        event_category: category,
                        event_label: label,
                        value: value || 0
                    });
                }
            },
            
            // 时长追踪
            trackTiming: function(category, name, value) {
                if (gtag) {
                    gtag('event', 'timing_complete', {
                        name: name,
                        value: Math.round(value),
                        event_category: category
                    });
                }
            },
            
            // 滚动深度
            trackScrollDepth: function(percent) {
                if (gtag) {
                    gtag('event', 'scroll', {
                        percent_scrolled: percent
                    });
                }
            },
            
            // 分享
            trackShare: function(method, contentType, itemId) {
                if (gtag) {
                    gtag('event', 'share', {
                        method: method,
                        content_type: contentType,
                        item_id: itemId
                    });
                }
            }
        };
    }
    
    // ==================== 暴露 ====================
    window.Events = {
        TYPES: EVENT_TYPES,
        TOOLS: TOOL_TYPES,
        TEMPLATES: TEMPLATE_TYPES,
        getToolInfo: getToolInfo,
        getTemplateInfo: getTemplateInfo,
        createTracker: createTracker
    };
    
})();