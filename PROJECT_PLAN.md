# SPO Frontend AI 代码生成测试项目计划

## 项目概述

本项目旨在测试多个AI模型在React + TypeScript前端UI生成方面的能力。以SPO (Social Platform Operations) 前端为原型，通过统一的规范和评估标准，对比不同AI模型的代码生成质量。

## RIPER-5 规则架构

### R - Requirements (需求定义)

#### 1.1 功能需求
基于 `swagger.json` API文档，前端需要实现以下核心功能模块：

**1.1.1 平台管理模块**
- 平台列表展示（支持6个平台：抖音、Bilibili、小红书、快手、视频号、TikTok）
- 平台启用/禁用状态管理
- 平台信息展示卡片

**1.1.2 账号管理模块**
- 账号列表展示（支持筛选、搜索）
- 账号详情查看
- 账号创建（登录流程）
- 账号编辑（更新账号信息）
- 账号删除
- Cookie详情查看
- 账号验证和刷新
- 账号信息批量更新

**1.1.3 资源库管理模块**
- 资源库列表展示
- 资源库创建（支持local、webdav、smb、ftp四种类型）
- 资源库配置编辑
- 资源库删除
- 资源库连接测试
- 默认资源库设置

**1.1.4 资源浏览模块**
- 资源库文件浏览（树形/列表视图）
- 资源类型筛选（video、image、audio、folder）
- 资源排序（按名称、大小、日期）
- 资源搜索
- 资源详情查看
- 批量资源信息获取

**1.1.5 全局功能**
- 健康检查状态显示
- 错误处理和提示
- 加载状态管理
- 响应式布局

#### 1.2 非功能需求

**1.2.1 UI设计要求**
- 采用圆角设计风格（border-radius ≥ 8px）
- 现代化、简洁的界面风格
- 良好的视觉层次和间距
- 支持深色/浅色主题（可选）

**1.2.2 技术栈要求**
- React 18+
- TypeScript 5+
- 状态管理：React Hooks / Context API / Zustand（任选）
- HTTP客户端：axios / fetch
- UI组件库：Ant Design / Material-UI / shadcn/ui（任选，或自建）
- 路由：React Router v6
- 构建工具：Vite / Create React App

**1.2.3 代码质量要求**
- TypeScript严格模式
- ESLint代码规范
- 组件化设计（可复用）
- 错误边界处理
- API响应类型定义完整

### I - Implementation (实现规范)

#### 2.1 项目结构规范

```
{model-name}/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── common/          # 通用组件（Button, Input, Card等）
│   │   ├── layout/          # 布局组件（Header, Sidebar, Container）
│   │   └── features/        # 功能模块组件
│   │       ├── platform/    # 平台管理
│   │       ├── account/     # 账号管理
│   │       ├── resource/    # 资源管理
│   │       └── library/     # 资源库管理
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx
│   │   ├── Platforms.tsx
│   │   ├── Accounts.tsx
│   │   ├── ResourceLibraries.tsx
│   │   └── ResourceBrowser.tsx
│   ├── services/            # API服务层
│   │   ├── api.ts           # API基础配置
│   │   ├── platform.ts      # 平台API
│   │   ├── account.ts       # 账号API
│   │   └── resource.ts      # 资源API
│   ├── types/               # TypeScript类型定义
│   │   ├── api.ts           # API响应类型
│   │   ├── platform.ts      # 平台相关类型
│   │   ├── account.ts       # 账号相关类型
│   │   └── resource.ts      # 资源相关类型
│   ├── hooks/               # 自定义Hooks
│   ├── utils/               # 工具函数
│   ├── styles/              # 样式文件
│   ├── App.tsx              # 根组件
│   └── main.tsx             # 入口文件
├── public/                  # 静态资源
├── package.json
├── tsconfig.json
├── vite.config.ts (或类似)
└── README.md                # 项目说明
```

#### 2.2 API集成规范

**2.2.1 API基础配置**
- Base URL: `http://localhost:3001`
- 统一响应格式：`{ code: number, message: string, data: any }`
- 统一错误处理
- 请求拦截器（可选：添加token等）
- 响应拦截器（统一处理错误码）

**2.2.2 API服务层要求**
- 每个API模块独立文件
- 完整的TypeScript类型定义
- 错误处理封装
- 支持请求取消（可选）

#### 2.3 组件开发规范

**2.3.1 组件设计原则**
- 单一职责原则
- Props类型明确定义
- 使用函数式组件 + Hooks
- 组件文档注释（JSDoc）

**2.3.2 状态管理**
- 本地状态：useState
- 共享状态：Context API 或状态管理库
- 服务端状态：自定义Hook封装

**2.3.3 样式规范**
- 统一使用圆角设计（border-radius: 8px-16px）
- 统一的颜色系统
- 统一的间距系统（8px基准）
- 响应式设计（移动端适配）

### P - Patterns (设计模式)

#### 3.1 推荐设计模式

**3.1.1 容器/展示组件模式**
- Container组件：负责数据获取和状态管理
- Presentational组件：负责UI展示

**3.1.2 自定义Hooks模式**
- 数据获取：`useAccounts`, `usePlatforms`, `useResources`
- 业务逻辑：`useAccountActions`, `useResourceActions`

**3.1.3 组合模式**
- 复杂组件通过小组件组合
- 使用children props实现灵活组合

#### 3.2 代码组织模式

**3.2.1 功能模块化**
- 按业务功能组织代码
- 每个功能模块包含：组件、类型、服务、Hooks

**3.2.2 关注点分离**
- UI逻辑与业务逻辑分离
- API调用与组件分离

### E - Evaluation (评估标准)

详见 `EVALUATION.md` 文档

### R - Review (审查检查点)

#### 5.1 代码审查清单

**5.1.1 功能完整性**
- [ ] 所有API端点已实现
- [ ] 所有功能模块已实现
- [ ] 错误处理已实现
- [ ] 加载状态已实现

**5.1.2 代码质量**
- [ ] TypeScript类型定义完整
- [ ] 无ESLint错误
- [ ] 组件可复用性良好
- [ ] 代码注释充分

**5.1.3 UI/UX质量**
- [ ] 圆角设计风格一致
- [ ] 响应式布局正常
- [ ] 交互反馈明确
- [ ] 视觉层次清晰

**5.1.4 技术实现**
- [ ] 项目可正常启动
- [ ] API调用正常
- [ ] 路由配置正确
- [ ] 构建无错误

## 开发任务分解

### Phase 1: 项目初始化
1. 创建React + TypeScript项目
2. 配置构建工具和开发环境
3. 安装必要依赖
4. 配置TypeScript和ESLint

### Phase 2: 基础架构
1. 创建项目目录结构
2. 配置路由
3. 创建API服务层基础
4. 定义TypeScript类型

### Phase 3: 核心功能实现
1. 平台管理模块
2. 账号管理模块
3. 资源库管理模块
4. 资源浏览模块

### Phase 4: 优化和完善
1. 错误处理优化
2. 加载状态优化
3. UI/UX优化
4. 代码重构和优化

## 参考资源

- API文档：`./swagger.json`
- 后端地址：`D:\git\github\spo-backend`
- 前端参考：`D:\git\github\spo-frontend`
- 技术参考：`D:\git\github\social-auto-upload`

## 注意事项

1. 每个AI模型应在独立的文件夹中生成代码（文件夹名为模型名）
2. 所有模型应遵循相同的规范和评估标准
3. 代码应可直接运行，无需额外配置
4. 每个模型应提供README说明其实现特点

