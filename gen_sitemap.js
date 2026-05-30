const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/root/tools-box/data/templates.json'));
const guidesData = JSON.parse(fs.readFileSync('/root/tools-box/data/guides.json'));
const templates = data.templates;
const guides = guidesData.guides;

const BASE_URL = 'https://tools-box-topaz.vercel.app';

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

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static pages
const staticPages = [
    ['/', '1.0', 'daily'],
    ['/tools.html', '0.9', 'weekly'],
    ['/templates.html', '0.9', 'weekly'],
    ['/guide.html', '0.9', 'weekly'],
    ['/search.html', '0.5', 'weekly'],
    ['/analytics', '0.8', 'daily'],
    ['/seo-dashboard', '0.8', 'weekly']
];

staticPages.forEach(([path, priority, freq]) => {
    sitemap += `    <url><loc>${BASE_URL}${path}</loc><priority>${priority}</priority><changefreq>${freq}</changefreq></url>\n`;
});

// Tools
const tools = ['image-compress', 'image-merge', 'image-crop', 'image-to-pdf', 'pdf-to-image', 'bmi-calculator', 'roi-calculator', 'compound-interest-calculator'];
tools.forEach(tool => {
    sitemap += `    <url><loc>${BASE_URL}/${tool}</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>\n`;
});

// Template categories
const templateCategories = ['resume', 'budget', 'ppt', 'project-plan', 'daily-report', 'okr', 'meeting-minutes', 'sales-followup', 'expense-tracking'];
templateCategories.forEach(cat => {
    sitemap += `    <url><loc>${BASE_URL}/templates/${cat}</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>\n`;
});

// Template detail pages
templates.forEach(t => {
    const subdir = MAPPINGS[t.id];
    if (!subdir) return;
    sitemap += `    <url><loc>${BASE_URL}/templates/${t.category}/${subdir}</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>\n`;
});

// Guide pages
guides.forEach(g => {
    sitemap += `    <url><loc>${BASE_URL}/guide/${g.id}</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>\n`;
});

sitemap += '</urlset>';

fs.writeFileSync('/root/tools-box/sitemap.xml', sitemap);
console.log('Sitemap generated');