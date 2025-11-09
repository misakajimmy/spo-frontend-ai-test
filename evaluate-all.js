#!/usr/bin/env node

/**
 * 批量评估所有AI模型生成的代码
 * 
 * 使用方法: node evaluate-all.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function main() {
  const projectRoot = process.cwd();
  log('\n🔍 扫描AI模型项目...', 'bright');
  
  // 获取所有子目录
  const items = fs.readdirSync(projectRoot, { withFileTypes: true });
  const modelFolders = items
    .filter(item => item.isDirectory())
    .map(item => item.name)
    .filter(name => {
      // 排除隐藏目录和常见目录
      return !name.startsWith('.') && 
             name !== 'node_modules' &&
             fs.existsSync(path.join(projectRoot, name, 'package.json'));
    });

  if (modelFolders.length === 0) {
    log('\n⚠️  未找到任何AI模型项目', 'yellow');
    log('请确保每个模型项目都有package.json文件', 'yellow');
    return;
  }

  log(`\n找到 ${modelFolders.length} 个模型项目:`, 'cyan');
  modelFolders.forEach(folder => log(`  - ${folder}`, 'blue'));

  const results = [];

  // 评估每个项目
  for (const folder of modelFolders) {
    log(`\n${'='.repeat(60)}`, 'bright');
    log(`评估: ${folder}`, 'bright');
    log('='.repeat(60), 'bright');
    
    try {
      execSync(`node evaluate.js "${folder}"`, { 
        stdio: 'inherit',
        cwd: projectRoot 
      });
      
      // 读取评估报告
      const reportPath = path.join(projectRoot, folder, 'evaluation-report.json');
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
        results.push({
          model: folder,
          ...report,
        });
      }
    } catch (error) {
      log(`\n✗ 评估失败: ${folder}`, 'red');
      results.push({
        model: folder,
        error: error.message,
      });
    }
  }

  // 生成对比报告
  log(`\n${'='.repeat(60)}`, 'bright');
  log('📊 对比分析报告', 'bright');
  log('='.repeat(60), 'bright');

  if (results.length === 0) {
    log('\n⚠️  没有可用的评估结果', 'yellow');
    return;
  }

  // 按总分排序
  const validResults = results.filter(r => r.totalScore !== undefined);
  validResults.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));

  log('\n排名:', 'cyan');
  validResults.forEach((result, index) => {
    const percentage = parseFloat(result.percentage);
    const color = percentage >= 70 ? 'green' : percentage >= 50 ? 'yellow' : 'red';
    log(`  ${index + 1}. ${result.model}: ${result.totalScore}/${result.maxScore} (${result.percentage}%)`, color);
  });

  // 详细对比
  log('\n详细对比:', 'cyan');
  log('\n项目结构得分:');
  validResults.forEach(result => {
    const score = result.scores?.structure?.score || 0;
    log(`  ${result.model}: ${score.toFixed(1)}/${result.scores?.structure?.max || 10}`, 
        score >= 7 ? 'green' : 'yellow');
  });

  log('\nAPI实现得分:');
  validResults.forEach(result => {
    const score = result.scores?.api?.score || 0;
    log(`  ${result.model}: ${score.toFixed(1)}/${result.scores?.api?.max || 10}`, 
        score >= 7 ? 'green' : 'yellow');
  });

  log('\n类型定义得分:');
  validResults.forEach(result => {
    const score = result.scores?.types?.score || 0;
    log(`  ${result.model}: ${score.toFixed(1)}/${result.scores?.types?.max || 8}`, 
        score >= 6 ? 'green' : 'yellow');
  });

  // 保存对比报告
  const comparisonReport = {
    timestamp: new Date().toISOString(),
    total: validResults.length,
    results: validResults,
  };

  const reportPath = path.join(projectRoot, 'comparison-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(comparisonReport, null, 2));
  log(`\n✓ 对比报告已保存: ${reportPath}`, 'green');

  // 生成Markdown格式的对比报告
  const markdownReport = generateMarkdownReport(comparisonReport);
  const mdReportPath = path.join(projectRoot, 'COMPARISON_REPORT.md');
  fs.writeFileSync(mdReportPath, markdownReport);
  log(`✓ Markdown对比报告已保存: ${mdReportPath}`, 'green');
}

function generateMarkdownReport(data) {
  let md = `# AI模型代码生成能力对比报告\n\n`;
  md += `生成时间: ${new Date(data.timestamp).toLocaleString('zh-CN')}\n\n`;
  md += `## 总体排名\n\n`;
  md += `| 排名 | 模型名称 | 总分 | 百分比 |\n`;
  md += `|------|---------|------|--------|\n`;

  data.results.forEach((result, index) => {
    md += `| ${index + 1} | ${result.model} | ${result.totalScore}/${result.maxScore} | ${result.percentage}% |\n`;
  });

  md += `\n## 详细对比\n\n`;

  // 各维度对比
  const dimensions = [
    { name: '项目结构', key: 'structure', max: 10 },
    { name: 'API实现', key: 'api', max: 10 },
    { name: '类型定义', key: 'types', max: 8 },
    { name: '项目配置', key: 'config', max: 5 },
  ];

  dimensions.forEach(dim => {
    md += `### ${dim.name}\n\n`;
    md += `| 模型名称 | 得分 | 百分比 |\n`;
    md += `|---------|------|--------|\n`;
    
    data.results.forEach(result => {
      const score = result.scores?.[dim.key]?.score || 0;
      const percentage = ((score / dim.max) * 100).toFixed(1);
      md += `| ${result.model} | ${score.toFixed(1)}/${dim.max} | ${percentage}% |\n`;
    });
    md += `\n`;
  });

  // 文件统计
  md += `## 文件统计\n\n`;
  md += `| 模型名称 | 总文件数 | TypeScript文件 | 组件文件 |\n`;
  md += `|---------|---------|---------------|----------|\n`;
  
  data.results.forEach(result => {
    const files = result.files || {};
    md += `| ${result.model} | ${files.count || 0} | ${files.tsFiles || 0} | ${files.componentFiles || 0} |\n`;
  });

  return md;
}

main();

