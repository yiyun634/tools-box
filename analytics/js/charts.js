// SEO监控面板 - 图表渲染

// 全局图表实例
let trendChart = null;

// 渲染趋势图表
function renderTrendChart(dailyData) {
    const ctx = document.getElementById('trend-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (trendChart) {
        trendChart.destroy();
    }
    
    const labels = dailyData.map(d => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    const viewsData = dailyData.map(d => d.views || 0);
    const downloadsData = dailyData.map(d => d.downloads || 0);
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '浏览量',
                    data: viewsData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: '下载量',
                    data: downloadsData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        color: '#64748b'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// 渲染热门模板排行
function renderTopTemplates(templates) {
    const container = document.getElementById('top-templates');
    if (!container) return;
    
    const top10 = templates.slice(0, 10);
    
    if (top10.length === 0) {
        container.innerHTML = '<p class="empty-state">暂无数据</p>';
        return;
    }
    
    container.innerHTML = top10.map((item, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const icon = getCategoryIcon(item.category);
        
        return `
            <div class="ranking-item">
                <div class="ranking-rank ${rankClass}">${index + 1}</div>
                <div class="ranking-icon">${icon}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${item.name}</div>
                    <div class="ranking-category">${item.categoryName}</div>
                </div>
                <div class="ranking-stat">
                    <div class="ranking-value">${formatNumber(item.views)}</div>
                    <div class="ranking-label">浏览</div>
                </div>
            </div>
        `;
    }).join('');
}

// 渲染热门工具排行
function renderTopTools(tools) {
    const container = document.getElementById('top-tools');
    if (!container) return;
    
    const top10 = tools.slice(0, 10);
    
    if (top10.length === 0) {
        container.innerHTML = '<p class="empty-state">暂无数据</p>';
        return;
    }
    
    container.innerHTML = top10.map((item, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const icon = item.icon || '🛠️';
        
        return `
            <div class="ranking-item">
                <div class="ranking-rank ${rankClass}">${index + 1}</div>
                <div class="ranking-icon">${icon}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${item.name}</div>
                    <div class="ranking-category">${item.category}</div>
                </div>
                <div class="ranking-stat">
                    <div class="ranking-value">${formatNumber(item.views)}</div>
                    <div class="ranking-label">浏览</div>
                </div>
            </div>
        `;
    }).join('');
}

// 渲染关键词云
function renderKeywordCloud(keywords) {
    const container = document.getElementById('keyword-cloud');
    if (!container) return;
    
    const sorted = Object.entries(keywords)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 15);
    
    if (sorted.length === 0) {
        container.innerHTML = '<p class="empty-state">暂无搜索数据</p>';
        return;
    }
    
    // 计算字体大小范围
    const counts = sorted.map(s => s[1].count);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    
    container.innerHTML = sorted.map(([keyword, data]) => {
        // 计算相对大小 (1-1.5)
        const ratio = maxCount === minCount ? 1 : (data.count - minCount) / (maxCount - minCount);
        const fontSize = 14 + ratio * 6;
        
        return `
            <div class="keyword-item" onclick="searchKeyword('${keyword}')">
                ${keyword}
                <span class="keyword-count">${data.count}</span>
            </div>
        `;
    }).join('');
}

// 渲染收藏排行
function renderTopFavorites(favorites) {
    const container = document.getElementById('top-favorites');
    if (!container) return;
    
    const top10 = favorites.slice(0, 10);
    
    if (top10.length === 0) {
        container.innerHTML = '<p class="empty-state">暂无收藏数据</p>';
        return;
    }
    
    container.innerHTML = top10.map((item, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const icon = item.type === 'template' ? '📄' : '🛠️';
        
        return `
            <div class="ranking-item">
                <div class="ranking-rank ${rankClass}">${index + 1}</div>
                <div class="ranking-icon">${icon}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${item.name}</div>
                    <div class="ranking-category">${item.type === 'template' ? '模板' : '工具'}</div>
                </div>
                <div class="ranking-stat">
                    <div class="ranking-value">${item.count}</div>
                    <div class="ranking-label">次收藏</div>
                </div>
            </div>
        `;
    }).join('');
}

// 渲染每日数据表
function renderDailyTable(dailyData) {
    const tbody = document.getElementById('daily-tbody');
    if (!tbody) return;
    
    if (dailyData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">暂无数据</td></tr>';
        return;
    }
    
    tbody.innerHTML = dailyData.map(d => {
        const date = new Date(d.date);
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        return `
            <tr>
                <td>${dateStr}</td>
                <td>${formatNumber(d.views || 0)}</td>
                <td>${formatNumber(d.downloads || 0)}</td>
                <td>${formatNumber(d.favorites || 0)}</td>
                <td>${formatNumber(d.searches || 0)}</td>
            </tr>
        `;
    }).join('');
}

// 辅助函数
function getCategoryIcon(category) {
    const icons = {
        resume: '📝', budget: '📊', ppt: '📑', 'project-plan': '📋',
        'daily-report': '📅', okr: '🎯', 'meeting-minutes': '📝',
        'sales-followup': '📈', 'expense-tracking': '💰', image: '🖼️', pdf: '📄', calc: '🔢'
    };
    return icons[category] || '📄';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function searchKeyword(keyword) {
    window.location.href = `/search.html?q=${encodeURIComponent(keyword)}`;
}