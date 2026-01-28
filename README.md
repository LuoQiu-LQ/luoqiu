# 落秋工坊

个人技术博客网站，使用 Next.js + Supabase 构建。

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes + Supabase
- **数据库**: PostgreSQL (Supabase)
- **认证**: Supabase Auth (GitHub/Google)
- **部署**: Vercel

## 功能特性

- 🚀 博客系统 (Markdown 支持)
- 💬 评论系统 (嵌套回复)
- 👤 用户系统 (GitHub/Google 登录)
- 🛠️ 工具箱 (JSON 格式化等)
- 📝 友链管理
- 💭 留言板
- 🌙 暗黑模式
- 📱 响应式设计

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，并填写配置：

```bash
cp .env.example .env.local
```

需要配置：
- Supabase URL 和 Anon Key
- GitHub OAuth (可选)
- Google OAuth (可选)

### 3. 设置数据库

在 Supabase 控制台运行 `supabase/schema.sql` 创建表。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 部署

项目已配置好 Vercel 部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

## 目录结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── (public)/          # 公开页面
│   │   ├── page.tsx       # 首页
│   │   ├── blog/          # 博客
│   │   ├── tools/         # 工具
│   │   ├── guestbook/     # 留言板
│   │   └── links/         # 友链
│   └── (admin)/           # 管理后台
│       ├── dashboard/     # 仪表盘
│       └── posts/         # 文章管理
├── components/            # React 组件
├── lib/                   # 工具函数
├── types/                 # TypeScript 类型
└── styles/                # 全局样式
```

## License

MIT
