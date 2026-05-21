# 开卷 Unfold

AI 叙事游戏创作工具。当前版本已接入世界设定页的真实 AI 生成链路，并保留本地规则兜底。

## 本地启动

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:3001`。

## AI 环境变量

在本地创建 `.env.local`：

```bash
OPENAI_API_KEY=你的_OpenAI_API_Key
OPENAI_MODEL=gpt-5.2
```

`OPENAI_MODEL` 可以不填，默认使用 `gpt-5.2`。

部署到 Vercel 时，也需要在项目的 Environment Variables 里配置 `OPENAI_API_KEY`，否则页面会自动使用本地模拟生成逻辑兜底。

## 项目数据

工具会自动把当前项目保存到浏览器本地存储。顶部可以：

- 导出 JSON：把当前项目交给别人继续开发或备份
- 导入 JSON：恢复之前导出的项目继续编辑

## 验证

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm exec next build --webpack
```
