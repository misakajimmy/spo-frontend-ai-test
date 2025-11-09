#!/usr/bin/env node

/**
 * AI模型代码生成能力评估脚本
 * 
 * 使用方法: node evaluate.js <model-folder-path>
 * 示例: node evaluate.js claude-3.5-sonnet
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
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

// API端点列表（从swagger.json提取）
const API_ENDPOINTS = {
  platform: [
    'GET /api/platforms',
    'GET /api/platforms/enabled',
  ],
  account: [
    'GET /api/accounts',
    'GET /api/accounts/{id}',
    'PUT /api/accounts/{id}',
    'DELETE /api/accounts/{id}',
    'GET /api/accounts/platform/{platform}',
    'GET /api/accounts/{id}/cookie-details',
    'POST /api/accounts/login/start',
    'POST /api/accounts/login/finish',
    'POST /api/accounts/login/cancel',
    'POST /api/accounts/{id}/validate',
    'POST /api/accounts/{id}/refresh',
    'POST /api/accounts/{id}/update-info',
    'POST /api/accounts/update-all-info',
  ],
  resource: [
    'GET /api/resources/libraries',
    'POST /api/resources/libraries',
    'GET /api/resources/libraries/active',
    'PUT /api/resources/libraries/{id}',
    'DELETE /api/resources/libraries/{id}',
    'POST /api/resources/libraries/{id}/test',
    'GET /api/resources/browse/{libraryId}',
    'GET /api/resources/browse',
    'GET /api/resources/search/{libraryId}',
    'GET /api/resources/info/{libraryId}',
    'GET /api/resources/access-path/{libraryId}',
    'POST /api/resources/batch-info/{libraryId}',
  ],
  other: [
    'GET /health',
  ],
};

// TypeScript类型定义列表
const REQUIRED_TYPES = [
  'PlatformAccount',
  'ResourceLibrary',
  'ResourceInfo',
  'LocalResourceConfig',
  'WebDAVResourceConfig',
  'ApiResponse',
];

class ProjectEvaluator {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.srcPath = path.join(projectPath, 'src');
    this.results = {
      structure: { score: 0, max: 10, details: [] },
      api: { score: 0, max: 10, details: [] },
      types: { score: 0, max: 8, details: [] },
      config: { score: 0, max: 5, details: [] },
      files: { count: 0, tsFiles: 0, componentFiles: 0 },
    };
  }

  // 检查项目结构
  checkStructure() {
    log('\n📁 检查项目结构...', 'cyan');
    const requiredDirs = [
      'src',
      'src/components',
      'src/pages',
      'src/services',
      'src/types',
    ];
    
    const optionalDirs = [
      'src/hooks',
      'src/utils',
      'src/styles',
    ];

    let score = 0;
    const details = [];

    // 检查必需目录
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.projectPath, dir);
      if (fs.existsSync(dirPath)) {
        score += 1;
        details.push(`✓ ${dir} 存在`);
      } else {
        details.push(`✗ ${dir} 缺失`);
      }
    }

    // 检查可选目录（加分项）
    for (const dir of optionalDirs) {
      const dirPath = path.join(this.projectPath, dir);
      if (fs.existsSync(dirPath)) {
        score += 0.5;
        details.push(`+ ${dir} 存在（加分）`);
      }
    }

    this.results.structure = { score, max: 10, details };
    log(`  得分: ${score}/${this.results.structure.max}`, score >= 7 ? 'green' : 'yellow');
  }

  // 检查API实现
  checkAPI() {
    log('\n🔌 检查API实现...', 'cyan');
    let score = 0;
    const details = [];
    const servicesPath = path.join(this.srcPath, 'services');

    if (!fs.existsSync(servicesPath)) {
      this.results.api = { score: 0, max: 10, details: ['✗ services目录不存在'] };
      return;
    }

    // 检查API服务文件
    const apiFiles = this.findFiles(servicesPath, '.ts', '.tsx');
    this.results.files.apiFiles = apiFiles.length;

    // 检查关键API文件
    const keyFiles = ['api.ts', 'platform.ts', 'account.ts', 'resource.ts'];
    let foundKeyFiles = 0;
    
    for (const file of keyFiles) {
      const filePath = path.join(servicesPath, file);
      if (fs.existsSync(filePath)) {
        foundKeyFiles++;
        details.push(`✓ ${file} 存在`);
        
        // 检查文件内容
        const content = fs.readFileSync(filePath, 'utf-8');
        if (content.includes('axios') || content.includes('fetch')) {
          score += 0.5;
        }
      } else {
        details.push(`✗ ${file} 缺失`);
      }
    }

    score += foundKeyFiles * 1.5; // 每个关键文件1.5分

    // 检查API端点实现（简单检查）
    const allApiContent = apiFiles.map(file => 
      fs.readFileSync(file, 'utf-8')
    ).join('\n');

    let implementedEndpoints = 0;
    for (const [category, endpoints] of Object.entries(API_ENDPOINTS)) {
      for (const endpoint of endpoints) {
        const method = endpoint.split(' ')[0];
        const path = endpoint.split(' ')[1].replace(/{[^}]+}/g, '');
        if (allApiContent.includes(path) || allApiContent.includes(method.toLowerCase())) {
          implementedEndpoints++;
        }
      }
    }

    const endpointScore = Math.min(implementedEndpoints / 5, 3); // 最多3分
    score += endpointScore;
    details.push(`API端点实现: ${implementedEndpoints}/${Object.values(API_ENDPOINTS).flat().length}`);

    this.results.api = { score: Math.min(score, 10), max: 10, details };
    log(`  得分: ${score.toFixed(1)}/${this.results.api.max}`, score >= 7 ? 'green' : 'yellow');
  }

  // 检查TypeScript类型定义
  checkTypes() {
    log('\n📝 检查TypeScript类型定义...', 'cyan');
    let score = 0;
    const details = [];
    const typesPath = path.join(this.srcPath, 'types');

    if (!fs.existsSync(typesPath)) {
      this.results.types = { score: 0, max: 8, details: ['✗ types目录不存在'] };
      return;
    }

    const typeFiles = this.findFiles(typesPath, '.ts', '.tsx');
    const allTypesContent = typeFiles.map(file => 
      fs.readFileSync(file, 'utf-8')
    ).join('\n');

    // 检查必需类型
    let foundTypes = 0;
    for (const type of REQUIRED_TYPES) {
      if (allTypesContent.includes(type)) {
        foundTypes++;
        details.push(`✓ ${type} 已定义`);
      } else {
        details.push(`✗ ${type} 缺失`);
      }
    }

    score += (foundTypes / REQUIRED_TYPES.length) * 5; // 类型完整性5分

    // 检查any使用情况
    const anyCount = (allTypesContent.match(/\bany\b/g) || []).length;
    const totalLines = allTypesContent.split('\n').length;
    const anyRatio = anyCount / totalLines;

    if (anyRatio < 0.05) {
      score += 2;
      details.push(`✓ any使用率低 (${(anyRatio * 100).toFixed(2)}%)`);
    } else if (anyRatio < 0.1) {
      score += 1;
      details.push(`⚠ any使用率中等 (${(anyRatio * 100).toFixed(2)}%)`);
    } else {
      details.push(`✗ any使用率较高 (${(anyRatio * 100).toFixed(2)}%)`);
    }

    // 检查接口定义
    const interfaceCount = (allTypesContent.match(/\binterface\s+\w+/g) || []).length;
    if (interfaceCount >= 5) {
      score += 1;
      details.push(`✓ 接口定义充分 (${interfaceCount}个)`);
    }

    this.results.types = { score: Math.min(score, 8), max: 8, details };
    log(`  得分: ${score.toFixed(1)}/${this.results.types.max}`, score >= 6 ? 'green' : 'yellow');
  }

  // 检查项目配置
  checkConfig() {
    log('\n⚙️  检查项目配置...', 'cyan');
    let score = 0;
    const details = [];

    // 检查package.json
    const packageJsonPath = path.join(this.projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      score += 1;
      details.push('✓ package.json 存在');
      
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (pkg.dependencies?.react) {
          score += 0.5;
          details.push(`✓ React版本: ${pkg.dependencies.react}`);
        }
        if (pkg.dependencies?.typescript || pkg.devDependencies?.typescript) {
          score += 0.5;
          details.push('✓ TypeScript已配置');
        }
        if (pkg.scripts?.dev || pkg.scripts?.start) {
          score += 0.5;
          details.push('✓ 启动脚本已配置');
        }
        if (pkg.scripts?.build) {
          score += 0.5;
          details.push('✓ 构建脚本已配置');
        }
      } catch (e) {
        details.push('✗ package.json解析失败');
      }
    } else {
      details.push('✗ package.json 缺失');
    }

    // 检查tsconfig.json
    const tsconfigPath = path.join(this.projectPath, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
      score += 1;
      details.push('✓ tsconfig.json 存在');
      
      try {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
        if (tsconfig.compilerOptions?.strict) {
          score += 0.5;
          details.push('✓ 严格模式已启用');
        }
      } catch (e) {
        details.push('⚠ tsconfig.json解析失败');
      }
    } else {
      details.push('✗ tsconfig.json 缺失');
    }

    // 检查README
    const readmePath = path.join(this.projectPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      score += 0.5;
      details.push('✓ README.md 存在');
    } else {
      details.push('✗ README.md 缺失');
    }

    this.results.config = { score: Math.min(score, 5), max: 5, details };
    log(`  得分: ${score.toFixed(1)}/${this.results.config.max}`, score >= 4 ? 'green' : 'yellow');
  }

  // 统计文件信息
  countFiles() {
    log('\n📊 统计文件信息...', 'cyan');
    const srcPath = this.srcPath;
    
    if (!fs.existsSync(srcPath)) {
      return;
    }

    const allFiles = this.findAllFiles(srcPath);
    const tsFiles = allFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
    const componentFiles = tsFiles.filter(f => 
      f.includes('components') || f.includes('Component')
    );

    this.results.files = {
      count: allFiles.length,
      tsFiles: tsFiles.length,
      componentFiles: componentFiles.length,
    };

    log(`  总文件数: ${allFiles.length}`);
    log(`  TypeScript文件: ${tsFiles.length}`);
    log(`  组件文件: ${componentFiles.length}`);
  }

  // 辅助方法：查找文件
  findFiles(dir, ...extensions) {
    if (!fs.existsSync(dir)) return [];
    
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.findFiles(fullPath, ...extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }

    return files;
  }

  // 辅助方法：查找所有文件
  findAllFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.findAllFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }

    return files;
  }

  // 生成评估报告
  generateReport() {
    const totalScore = this.results.structure.score + 
                      this.results.api.score + 
                      this.results.types.score + 
                      this.results.config.score;
    const maxScore = this.results.structure.max + 
                    this.results.api.max + 
                    this.results.types.max + 
                    this.results.config.max;

    log('\n' + '='.repeat(60), 'bright');
    log('📋 评估报告', 'bright');
    log('='.repeat(60), 'bright');

    log(`\n项目路径: ${this.projectPath}`, 'cyan');
    log(`文件统计:`, 'cyan');
    log(`  - 总文件数: ${this.results.files.count}`);
    log(`  - TypeScript文件: ${this.results.files.tsFiles}`);
    log(`  - 组件文件: ${this.results.files.componentFiles || 0}`);

    log(`\n各维度得分:`, 'cyan');
    log(`  1. 项目结构: ${this.results.structure.score.toFixed(1)}/${this.results.structure.max}`, 
        this.results.structure.score >= 7 ? 'green' : 'yellow');
    log(`  2. API实现: ${this.results.api.score.toFixed(1)}/${this.results.api.max}`, 
        this.results.api.score >= 7 ? 'green' : 'yellow');
    log(`  3. 类型定义: ${this.results.types.score.toFixed(1)}/${this.results.types.max}`, 
        this.results.types.score >= 6 ? 'green' : 'yellow');
    log(`  4. 项目配置: ${this.results.config.score.toFixed(1)}/${this.results.config.max}`, 
        this.results.config.score >= 4 ? 'green' : 'yellow');

    log(`\n总分: ${totalScore.toFixed(1)}/${maxScore} (${((totalScore/maxScore)*100).toFixed(1)}%)`, 
        totalScore >= maxScore * 0.7 ? 'green' : totalScore >= maxScore * 0.5 ? 'yellow' : 'red');

    log(`\n详细说明:`, 'cyan');
    this.results.structure.details.forEach(d => log(`  ${d}`));
    this.results.api.details.forEach(d => log(`  ${d}`));
    this.results.types.details.forEach(d => log(`  ${d}`));
    this.results.config.details.forEach(d => log(`  ${d}`));

    log('\n' + '='.repeat(60), 'bright');

    // 生成JSON报告
    const reportPath = path.join(this.projectPath, 'evaluation-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      projectPath: this.projectPath,
      scores: {
        structure: this.results.structure,
        api: this.results.api,
        types: this.results.types,
        config: this.results.config,
      },
      files: this.results.files,
      totalScore: totalScore.toFixed(1),
      maxScore: maxScore,
      percentage: ((totalScore/maxScore)*100).toFixed(1),
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`\n✓ 评估报告已保存: ${reportPath}`, 'green');
  }

  // 执行评估
  evaluate() {
    log(`\n🚀 开始评估项目: ${this.projectPath}`, 'bright');
    
    if (!fs.existsSync(this.projectPath)) {
      log(`\n✗ 错误: 项目路径不存在: ${this.projectPath}`, 'red');
      process.exit(1);
    }

    this.checkStructure();
    this.checkAPI();
    this.checkTypes();
    this.checkConfig();
    this.countFiles();
    this.generateReport();
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('使用方法: node evaluate.js <model-folder-path>', 'yellow');
    log('示例: node evaluate.js claude-3.5-sonnet', 'yellow');
    process.exit(1);
  }

  const projectPath = path.resolve(args[0]);
  const evaluator = new ProjectEvaluator(projectPath);
  evaluator.evaluate();
}

main();

