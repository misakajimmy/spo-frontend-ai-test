# 使用说明

## 项目概述

本项目用于测试和评估多个AI模型在React + TypeScript前端UI生成任务中的能力。

## 快速开始

### 1. 项目结构

```
spo-frontend-ai-test/
├── PROJECT_PLAN.md           # 项目计划和架构（RIPER-5规则）
├── EVALUATION.md             # 评估标准和方法
├── AI_TASK_DESCRIPTION.md    # AI模型任务说明
├── USAGE.md                  # 本使用说明
├── swagger.json              # API文档
├── evaluate.js               # 单个项目评估脚本
├── evaluate-all.js           # 批量评估脚本
├── package.json
└── {model-name}/             # AI模型生成的代码（每个模型一个文件夹）
```

### 2. 为AI模型创建任务

1. **创建模型文件夹**
   ```bash
   mkdir {model-name}
   # 例如: mkdir claude-3.5-sonnet
   ```

2. **提供任务说明**
   - 将 `AI_TASK_DESCRIPTION.md` 的内容提供给AI模型
   - 或者让AI模型直接阅读该文件

3. **AI模型生成代码**
   - AI模型应在 `{model-name}` 文件夹下生成完整的React + TypeScript项目
   - 项目应可直接运行（`npm install` 后 `npm run dev`）

### 3. 评估代码生成能力

#### 3.1 评估单个项目

```bash
node evaluate.js {model-name}
```

例如：
```bash
node evaluate.js claude-3.5-sonnet
```

评估脚本会：
- 检查项目结构
- 检查API实现
- 检查TypeScript类型定义
- 检查项目配置
- 生成评估报告（`{model-name}/evaluation-report.json`）

#### 3.2 批量评估所有项目

```bash
node evaluate-all.js
```

该脚本会：
- 自动扫描所有包含 `package.json` 的子文件夹
- 逐个评估每个项目
- 生成对比分析报告（`comparison-report.json` 和 `COMPARISON_REPORT.md`）

### 4. 查看评估结果

#### 4.1 单个项目评估报告

每个项目评估后会生成 `{model-name}/evaluation-report.json`，包含：
- 各维度得分
- 详细检查结果
- 文件统计信息

#### 4.2 对比分析报告

运行 `evaluate-all.js` 后会生成：
- `comparison-report.json` - JSON格式的对比数据
- `COMPARISON_REPORT.md` - Markdown格式的对比报告

## 评估维度

评估脚本会从以下维度进行评估：

1. **项目结构** (10分)
   - 必需目录是否存在
   - 可选目录是否创建

2. **API实现** (10分)
   - API服务文件是否完整
   - API端点是否实现

3. **类型定义** (8分)
   - 必需类型是否定义
   - any使用率
   - 接口定义充分性

4. **项目配置** (5分)
   - package.json配置
   - tsconfig.json配置
   - README文档

**总分**: 33分（自动化评估部分）

> 注意：完整的评估还包括人工评估部分，详见 `EVALUATION.md`

## 工作流程

### 完整测试流程

1. **准备阶段**
   - 阅读 `PROJECT_PLAN.md` 了解项目要求
   - 阅读 `EVALUATION.md` 了解评估标准
   - 阅读 `AI_TASK_DESCRIPTION.md` 了解任务要求

2. **代码生成阶段**
   - 为每个AI模型创建独立文件夹
   - 将任务说明提供给AI模型
   - AI模型在对应文件夹下生成代码

3. **自动化评估阶段**
   - 运行 `node evaluate-all.js` 进行批量评估
   - 查看自动化评估结果

4. **人工评估阶段**
   - 手动测试各功能模块
   - 审查代码质量
   - 评估UI/UX设计
   - 测试项目运行状态

5. **结果分析阶段**
   - 对比各模型得分
   - 分析各模型优劣势
   - 生成最终评估报告

## 注意事项

1. **项目独立性**
   - 每个AI模型应在独立文件夹中生成代码
   - 不要参考其他模型的代码

2. **代码可运行性**
   - 项目必须可以直接运行
   - 确保 `package.json` 配置正确
   - 确保依赖安装后无错误

3. **评估标准一致性**
   - 所有模型使用相同的评估标准
   - 评估过程应客观公正

4. **文档完整性**
   - 每个模型项目应包含README说明
   - 说明技术选型和实现特点

## 常见问题

### Q: 评估脚本报错怎么办？

A: 检查：
1. 项目路径是否正确
2. 项目是否包含 `package.json`
3. Node.js版本是否支持（建议v14+）

### Q: 如何添加新的评估维度？

A: 编辑 `evaluate.js`，添加新的检查方法，并在 `generateReport()` 中更新报告生成逻辑。

### Q: 评估结果不准确怎么办？

A: 自动化评估只是初步评估，还需要结合人工评估。详细的人工评估标准请参考 `EVALUATION.md`。

### Q: 如何自定义评估标准？

A: 可以修改 `evaluate.js` 中的评分逻辑，或编辑 `EVALUATION.md` 中的评估标准。

## 贡献

欢迎提交：
- 评估方法的改进建议
- 评估脚本的bug修复
- 新的评估维度
- 测试结果和对比分析

## 许可证

MIT

