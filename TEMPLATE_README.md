# {模型名称} - SPO Frontend 实现

## 项目简介

本项目是使用 {模型名称} 生成的SPO (Social Platform Operations) 前端应用，基于React + TypeScript开发。

## 技术栈

- **框架**: React {版本}
- **语言**: TypeScript {版本}
- **构建工具**: {Vite/CRA/其他}
- **状态管理**: {状态管理方案}
- **HTTP客户端**: {axios/fetch}
- **UI组件库**: {组件库名称/自建}
- **路由**: React Router v6

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   └── features/       # 功能模块组件
├── pages/              # 页面组件
├── services/           # API服务层
├── types/              # TypeScript类型定义
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── styles/             # 样式文件
├── App.tsx
└── main.tsx
```

## 功能模块

### 1. 平台管理
- 平台列表展示
- 平台状态管理

### 2. 账号管理
- 账号列表和详情
- 账号创建、编辑、删除
- 账号登录流程
- 账号验证和刷新

### 3. 资源库管理
- 资源库列表
- 资源库创建、编辑、删除
- 资源库连接测试

### 4. 资源浏览
- 资源浏览和筛选
- 资源搜索
- 资源详情查看

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## API配置

默认API地址: `http://localhost:3001`

如需修改，请编辑 `src/services/api.ts` 中的 `BASE_URL` 配置。

## 实现特点

### 设计特点
- {描述UI设计特点，如：采用圆角设计，统一的颜色系统等}

### 技术特点
- {描述技术实现特点，如：使用自定义Hooks封装API调用，组件化设计等}

### 代码特点
- {描述代码质量特点，如：完整的TypeScript类型定义，良好的代码组织等}

## 开发说明

### 代码规范
- 使用ESLint进行代码检查
- TypeScript严格模式
- 组件化开发

### 注意事项
- {如有特殊注意事项，请在此说明}

## 已知问题

- {如有已知问题，请在此列出}

## 后续优化

- {如有后续优化计划，请在此列出}

