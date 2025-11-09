# AI模型代码生成任务说明

## 任务概述

请根据以下要求，在 `{你的模型名称}` 文件夹下生成一个完整的React + TypeScript前端项目。

## 项目要求

### 1. 技术栈
- **框架**: React 18+
- **语言**: TypeScript 5+
- **构建工具**: Vite 或 Create React App
- **状态管理**: 自选（React Hooks / Context API / Zustand / Redux等）
- **HTTP客户端**: axios 或 fetch
- **UI组件库**: 自选（Ant Design / Material-UI / shadcn/ui / 自建组件）
- **路由**: React Router v6

### 2. 功能需求

基于 `./swagger.json` API文档，实现以下功能：

#### 2.1 平台管理
- 获取平台列表 (`GET /api/platforms`)
- 获取启用的平台列表 (`GET /api/platforms/enabled`)
- 平台信息展示卡片

#### 2.2 账号管理
- 获取所有账号 (`GET /api/accounts`)
- 获取单个账号详情 (`GET /api/accounts/{id}`)
- 更新账号 (`PUT /api/accounts/{id}`)
- 删除账号 (`DELETE /api/accounts/{id}`)
- 根据平台获取账号 (`GET /api/accounts/platform/{platform}`)
- 获取Cookie详情 (`GET /api/accounts/{id}/cookie-details`)
- 开始登录 (`POST /api/accounts/login/start`)
- 完成登录 (`POST /api/accounts/login/finish`)
- 取消登录 (`POST /api/accounts/login/cancel`)
- 验证账号 (`POST /api/accounts/{id}/validate`)
- 刷新账号 (`POST /api/accounts/{id}/refresh`)
- 更新账号信息 (`POST /api/accounts/{id}/update-info`)
- 批量更新账号信息 (`POST /api/accounts/update-all-info`)

#### 2.3 资源库管理
- 获取所有资源库 (`GET /api/resources/libraries`)
- 创建资源库 (`POST /api/resources/libraries`)
- 获取激活的资源库 (`GET /api/resources/libraries/active`)
- 更新资源库 (`PUT /api/resources/libraries/{id}`)
- 删除资源库 (`DELETE /api/resources/libraries/{id}`)
- 测试资源库连接 (`POST /api/resources/libraries/{id}/test`)

#### 2.4 资源浏览
- 浏览资源库 (`GET /api/resources/browse/{libraryId}`)
- 浏览默认资源库 (`GET /api/resources/browse`)
- 搜索资源 (`GET /api/resources/search/{libraryId}`)
- 获取资源信息 (`GET /api/resources/info/{libraryId}`)
- 获取资源访问路径 (`GET /api/resources/access-path/{libraryId}`)
- 批量获取资源信息 (`POST /api/resources/batch-info/{libraryId}`)

#### 2.5 其他
- 健康检查 (`GET /health`)

### 3. UI设计要求

#### 3.1 设计风格
- **圆角设计**: 所有卡片、按钮、输入框等元素使用圆角，border-radius ≥ 8px
- **现代化风格**: 简洁、现代、专业的界面设计
- **视觉层次**: 清晰的视觉层次和间距

#### 3.2 布局要求
- 响应式设计，支持桌面端和移动端
- 统一的间距系统（建议8px基准）
- 统一的颜色系统

#### 3.3 交互要求
- 所有操作有明确的反馈（加载状态、成功提示、错误提示）
- 表单验证和错误提示
- 友好的错误信息展示

### 4. 代码规范

#### 4.1 项目结构
请按照以下结构组织代码：
```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   └── features/        # 功能模块组件
├── pages/              # 页面组件
├── services/           # API服务层
├── types/              # TypeScript类型定义
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── styles/             # 样式文件
├── App.tsx
└── main.tsx
```

#### 4.2 TypeScript要求
- 所有API响应必须有类型定义
- 避免使用 `any` 类型（特殊情况需注释说明）
- 使用接口（interface）定义数据结构
- 组件Props必须有类型定义

#### 4.3 代码质量
- 遵循ESLint规则
- 组件职责单一
- 代码注释充分（关键函数和组件）
- 可复用组件设计

### 5. API集成要求

#### 5.1 API配置
- Base URL: `http://localhost:3001`
- 统一响应格式处理：`{ code: number, message: string, data: any }`
- 统一错误处理
- 请求/响应拦截器（可选）

#### 5.2 类型定义
根据 `swagger.json` 中的schemas定义完整的TypeScript类型：
- `PlatformAccount`
- `ResourceLibrary`
- `ResourceInfo`
- `LocalResourceConfig`
- `WebDAVResourceConfig`
- `ApiResponse`

### 6. 必须实现的功能

#### 6.1 核心功能
- [x] 平台列表展示
- [x] 账号列表展示（支持筛选）
- [x] 账号创建（登录流程）
- [x] 账号编辑和删除
- [x] 资源库列表展示
- [x] 资源库创建和编辑
- [x] 资源浏览（支持筛选和排序）
- [x] 资源搜索

#### 6.2 基础功能
- [x] 路由配置
- [x] 错误处理
- [x] 加载状态
- [x] 响应式布局

### 7. 项目交付要求

#### 7.1 必须包含的文件
- `package.json` - 完整的依赖配置
- `tsconfig.json` - TypeScript配置
- `README.md` - 项目说明文档（包含启动方式、技术选型说明）
- 所有源代码文件

#### 7.2 项目要求
- 项目必须可以直接运行（`npm install` 后 `npm run dev`）
- 无编译错误
- 无运行时错误（基础功能可正常使用）
- 代码结构清晰，易于维护

### 8. 评估标准

你的代码将根据以下维度进行评估：
1. **功能完整性** (30%) - 所有功能是否实现
2. **代码质量** (25%) - TypeScript使用、代码规范、可维护性
3. **UI/UX设计质量** (20%) - 设计规范、用户体验、界面美观度
4. **技术实现质量** (15%) - 架构设计、性能优化、错误处理
5. **可运行性** (10%) - 项目配置、运行状态

详细评估标准请参考 `EVALUATION.md`

### 9. 参考文档

- 项目计划: `PROJECT_PLAN.md`
- 评估标准: `EVALUATION.md`
- API文档: `swagger.json`

### 10. 注意事项

1. **独立开发**: 在 `{你的模型名称}` 文件夹下独立开发，不要参考其他模型的代码
2. **完整实现**: 尽量实现所有功能，但可以优先实现核心功能
3. **代码质量**: 注重代码质量和可维护性
4. **UI设计**: 注重UI设计的一致性和用户体验
5. **文档说明**: 在README中说明你的技术选型和实现特点

### 11. 开始任务

1. 在项目根目录下创建以你的模型名称命名的文件夹
2. 在该文件夹下初始化React + TypeScript项目
3. 按照要求实现所有功能
4. 确保项目可以正常运行
5. 编写README说明文档

## 祝你编码愉快！

如有疑问，请参考 `PROJECT_PLAN.md` 中的详细说明。

