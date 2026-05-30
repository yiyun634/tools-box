# 免费效率工具箱 - 接入说明文档

## 一、文件修改清单

### 新增文件

```
tools-box/
├── config/
│   ├── ga4.json              # GA4配置（需填入Measurement ID）
│   └── clarity.json         # Clarity配置（需填入Project ID）
│
├── tracking/
│   └── js/
│       ├── tracker.js        # 核心追踪器
│       ├── events.js         # 事件定义
│       └── integration.js    # GA4/Clarity集成
│
├── seo-dashboard/
│   ├── index.html            # SEO监控面板
│   ├── css/
│   │   └── seo.css           # SEO面板样式
│   └── js/
│       └── seo-analyzer.js   # SEO分析器
│
├── analytics/
│   └── js/
│       └── enhanced.js       # 增强分析模块
│
└── docs/
    └── INTEGRATION.md        # 本文档
```

### 修改文件

```
tools-box/
├── index.html                # 添加追踪脚本
├── tools.html               # 添加追踪脚本
├── templates.html            # 添加追踪脚本
├── guide.html               # 添加追踪脚本
├── search.html              # 添加追踪脚本
├── templates/resume/classic/index.html  # 添加下载追踪
├── analytics/index.html     # 增强分析模块
└── data/
    └── analytics.json       # 更新数据结构
```

---

## 二、Google Analytics 4 接入步骤

### 2.1 获取Measurement ID

1. 登录 [Google Analytics](https://analytics.google.com/)
2. 进入"管理" → "创建账户"或选择已有账户
3. 创建属性（如果还没有）：
   - 属性名称：免费效率工具箱
   - 报告时区：中国
   - 货币：人民币 (CNY)
4. 进入"数据流" → "Web"
5. 添加网站流：
   - 网站网址：https://tools-box-topaz.vercel.app
6. 复制Measurement ID（如：G-XXXXXXXXXX）

### 2.2 配置GA4

编辑 `/root/tools-box/config/ga4.json`：

```json
{
    "measurementId": "G-XXXXXXXXXX",
    "enabled": true,
    "debugMode": false,
    "trackRoutes": true,
    "cookieDomain": "tools-box-topaz.vercel.app",
    "cookieExpires": 63072000,
    "fields": {
        "send_page_view": false
    }
}
```

### 2.3 部署

```bash
# 修改配置后推送
cd /root/tools-box
git add -A
git commit -m "添加GA4配置"
git push

# Vercel自动部署
```

### 2.4 测试

1. 访问网站 https://tools-box-topaz.vercel.app
2. 打开GA4 Realtime报告
3. 确认页面浏览出现在实时报告中

---

## 三、Microsoft Clarity 接入步骤

### 3.1 获取Project ID

1. 登录 [Microsoft Clarity](https://clarity.microsoft.com/)
2. 点击"New Project"
3. 填写项目信息：
   - Project Name: 免费效率工具箱
   - Website URL: https://tools-box-topaz.vercel.app
4. 复制Project ID（如：XXXXXXXXXX）

### 3.2 配置Clarity

编辑 `/root/tools-box/config/clarity.json`：

```json
{
    "projectId": "XXXXXXXXXX",
    "enabled": true,
    "heatmap": true,
    "recording": true,
    "clickTracking": true,
    "scrollTracking": true,
    "uploadDelay": 1000,
    "correlation": true
}
```

### 3.3 部署

```bash
# 修改配置后推送
cd /root/tools-box
git add -A
git commit -m "添加Clarity配置"
git push
```

### 3.4 测试

1. 访问网站
2. 登录Clarity Dashboard
3. 确认项目显示"Active"

---

## 四、Google Search Console 接入步骤

### 4.1 验证网站所有权

1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 点击"添加资源"
3. 输入：https://tools-box-topaz.vercel.app
4. 选择验证方法（HTML文件或DNS）

### 4.2 导出搜索分析数据

1. 进入Search Console
2. 选择网站
3. 点击"导出" → "CSV"
4. 选择日期范围（如：过去28天）
5. 下载Search Analytics数据

### 4.3 导入数据到监控面板

1. 访问 https://tools-box-topaz.vercel.app/analytics
2. 点击"导入数据"按钮
3. 上传CSV文件
4. 确认数据预览
5. 点击"确认导入"

---

## 五、上线检查清单

### 5.1 追踪配置检查

| 检查项 | 状态 | 说明 |
|-------|------|------|
| GA4 Measurement ID已填入 | ☐ | 检查config/ga4.json |
| Clarity Project ID已填入 | ☐ | 检查config/clarity.json |
| 追踪脚本已加载 | ☐ | F12检查网络请求 |
| page_view事件正常 | ☐ | GA4 Realtime显示 |
| search事件正常 | ☐ | 搜索关键词测试 |
| download事件正常 | ☐ | 下载模板测试 |

### 5.2 功能检查

| 功能 | 页面 | 检查方法 |
|------|------|---------|
| 首页 | `/` | 页面正常加载 |
| 工具页 | `/image-compress` | 工具可使用 |
| 模板页 | `/templates/resume/classic` | 下载按钮可用 |
| 搜索页 | `/search.html?q=test` | 搜索功能正常 |
| 运营分析 | `/analytics` | 数据显示正确 |
| SEO监控 | `/seo-dashboard` | SEO数据显示 |

### 5.3 浏览器测试

- [ ] Chrome 最新版
- [ ] Safari 最新版
- [ ] Firefox 最新版
- [ ] Edge 最新版
- [ ] 移动端Chrome

### 5.4 数据验证

| 数据项 | 预期值 | 验证方法 |
|-------|-------|---------|
| PV统计 | 页面访问+1 | GA4 Realtime |
| 搜索记录 | 关键词存入 | localStorage检查 |
| 下载记录 | 下载次数+1 | analytics面板 |
| 工具使用 | 使用次数+1 | 运营分析面板 |

---

## 六、部署命令

```bash
# 1. SSH连接到VPS
ssh root@107.175.245.203

# 2. 进入项目目录
cd /root/tools-box

# 3. 修改配置文件（填入ID）
vim config/ga4.json
vim config/clarity.json

# 4. 提交代码
git add -A
git commit -m "配置追踪工具"
git push

# 5. 等待Vercel自动部署（约1-2分钟）

# 6. 验证部署
curl -I https://tools-box-topaz.vercel.app

# 7. 检查追踪是否生效
# 浏览器打开网站，按F12查看Network
# 应该看到 googletagmanager.com 和 clarity.ms 的请求
```

---

## 七、追踪事件说明

### 7.1 自动追踪事件

| 事件 | 触发条件 | 数据内容 |
|------|---------|---------|
| page_view | 页面加载 | URL, Title, Referrer |
| scroll_depth | 滚动>25%/50%/75%/100% | 滚动百分比 |
| timing | 页面离开 | 停留时间 |

### 7.2 用户行为事件

| 事件 | 触发条件 | 数据内容 |
|------|---------|---------|
| search | 用户搜索 | 关键词, 结果数 |
| favorite_add | 点击收藏 | 模板/工具ID, 名称 |
| favorite_remove | 取消收藏 | 模板/工具ID |
| file_download | 下载模板 | 文件名, 类型 |
| tool_use | 使用工具 | 工具名称, 操作类型 |

### 7.3 自定义事件追踪

在代码中可以手动调用：

```javascript
// 追踪自定义事件
window.TrackerIntegration.trackEvent('category', 'action', 'label');

// 示例
window.TrackerIntegration.trackEvent('button', 'click', 'cta-button');
```

---

## 八、常见问题

### Q1: GA4收不到数据？
- 检查Measurement ID是否正确
- 检查网络是否能访问google.com
- 确认dataLayer已初始化
- 检查是否有广告拦截器阻止

### Q2: Clarity没有数据？
- 检查Project ID是否正确
- 确认Clarity标签已加载（检查源码）
- Clarity需要至少48小时才能显示热力图

### Q3: 本地存储数据格式？
```javascript
// 查看追踪数据
localStorage.getItem('tb_events')
localStorage.getItem('tb_pageviews')
localStorage.getItem('tb_searches')
```

### Q4: 如何清空测试数据？
```javascript
// 在浏览器控制台执行
localStorage.clear();
```

---

## 九、后续扩展

### 9.1 预留接口

- Google Search Console API直连（需要OAuth）
- Google Analytics API对接
- 自定义事件分析面板

### 9.2 数据导出

所有数据可通过 `/analytics` 页面的"导出数据"按钮导出为JSON格式。

---

**完成以上所有步骤后，网站即可开始收集用户行为数据！**