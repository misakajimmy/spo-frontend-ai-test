# SPO Frontend AI 代码生成测试项目

## 项目简介

本项目旨在测试多个AI模型在React + TypeScript前端UI生成方面的能力。以SPO (Social Platform Operations) 前端为原型，通过统一的规范和评估标准，对比不同AI模型的代码生成质量。

## 项目结构

```
spo-frontend-ai-test/
├── PROJECT_PLAN.md           # 项目计划和架构文档（RIPER-5规则）
├── EVALUATION.md             # 代码生成能力评估方法
├── AI_TASK_DESCRIPTION.md    # AI模型代码生成任务说明
├── TEMPLATE_README.md        # README模板
├── swagger.json              # API文档
├── {model-name-1}/           # AI模型1生成的代码
├── {model-name-2}/           # AI模型2生成的代码
└── ...
```

## 技术栈要求

- **后端**: NodeJS + Express + TypeScript (参考: `D:\git\github\spo-backend`)
- **前端**: React + TypeScript
- **UI设计**: 圆角设计风格
- **API参考**: `./swagger.json`

## 快速开始

### 1. 查看项目计划

详细的项目计划和架构设计请参考 [PROJECT_PLAN.md](./PROJECT_PLAN.md)

### 2. 查看评估标准

代码生成能力的评估方法请参考 [EVALUATION.md](./EVALUATION.md)

### 3. AI模型任务说明

AI模型需要遵循的任务说明请参考 [AI_TASK_DESCRIPTION.md](./AI_TASK_DESCRIPTION.md)

## 评估维度

1. **功能完整性** (30%) - API集成、功能模块、交互功能
2. **代码质量** (25%) - TypeScript使用、代码规范、可维护性
3. **UI/UX设计质量** (20%) - 设计规范、用户体验、界面美观度
4. **技术实现质量** (15%) - 架构设计、性能优化、错误处理
5. **可运行性** (10%) - 项目配置、运行状态

## 参与测试的AI模型

（待添加）

## 评估结果

（待生成评估报告）

## 参考资源

- **后端地址**: `D:\git\github\spo-backend`
- **前端参考**: `D:\git\github\spo-frontend`
- **技术参考**: `D:\git\github\social-auto-upload`
- **API文档**: `./swagger.json`

## 项目说明

### RIPER-5规则

本项目采用RIPER-5规则进行架构设计：

- **R - Requirements**: 需求定义
- **I - Implementation**: 实现规范
- **P - Patterns**: 设计模式
- **E - Evaluation**: 评估标准
- **R - Review**: 审查检查点

### 测试流程

1. **任务分发**: 将 `AI_TASK_DESCRIPTION.md` 提供给各个AI模型
2. **代码生成**: 各AI模型在独立文件夹中生成代码
3. **代码评估**: 根据 `EVALUATION.md` 进行评估
4. **结果对比**: 生成对比分析报告

## 贡献

本项目用于测试和评估AI模型的代码生成能力，欢迎提交评估结果和改进建议。

## 许可证

MIT

