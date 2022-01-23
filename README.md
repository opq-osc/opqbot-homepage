# opqbot-homepage

opqbot.com 主站仓库

**请自由修订**

### 修订方式

所有数据都在 `src/data/*`，修订格式见 `src/data/type`。

本地修订文档需要 Node.js 环境，可安装 Node.js 后在项目根目录下执行以下命令启动项目：

```bash
  # 安装 yarn
  npm config set registry https://registry.npmmirror.com
  npm install -g pnpm

  # 安装依赖
  pnpm i

  # 启动项目
  pnpm dev
```

启动项目后即可在 `9527` 端口即时修订。

如果不具备环境，请在 `src/data/*` 内按格式修改，然后 Pull Request ，最后由 Organization Owner 整理即可。
