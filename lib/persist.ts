import fs from "fs";
import path from "path";

/**
 * 数据持久化：先原子写本地文件（当前实例立即生效），
 * 若配置了 GitHub 环境变量，则把改动提交回仓库，
 * 这样免费 Render 实例重启/重新部署后数据不会丢失。
 *
 * 需要的环境变量（未配置则只写本地，适合本地开发）：
 *   GITHUB_TOKEN  —— 有 repo 写权限的 PAT（fine-grained: Contents 读写）
 *   GITHUB_REPO   —— owner/repo，默认 zdtzn/snack-museum
 *   GITHUB_BRANCH —— 目标分支，默认 main
 */

/** 原子写本地文件：先写 .tmp 再重命名，防止写一半崩溃损坏数据 */
export function writeLocalFile(relativePath: string, content: string): void {
  const fullPath = path.join(process.cwd(), relativePath);
  const tmpPath = fullPath + ".tmp";
  fs.writeFileSync(tmpPath, content, "utf-8");
  fs.renameSync(tmpPath, fullPath);
}

function githubConfig() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  const repo = process.env.GITHUB_REPO || "zdtzn/snack-museum";
  const branch = process.env.GITHUB_BRANCH || "main";
  const [owner, name] = repo.split("/");
  if (!owner || !name) return null;
  return { token, owner, name, branch };
}

/** 是否已启用 GitHub 回写 */
export function githubPersistEnabled(): boolean {
  return githubConfig() !== null;
}

/** 把文件内容提交回 GitHub（Contents API），失败抛错由调用方处理 */
async function commitToGithub(relativePath: string, content: string): Promise<void> {
  const cfg = githubConfig();
  if (!cfg) return;

  const apiPath = relativePath.split(path.sep).join("/");
  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.name}/contents/${apiPath}`;
  const headers = {
    Authorization: `Bearer ${cfg.token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  // 先取当前文件 SHA（更新已存在文件时必填）
  let sha: string | undefined;
  const getRes = await fetch(`${url}?ref=${cfg.branch}`, { headers });
  if (getRes.ok) {
    const data = (await getRes.json()) as { sha?: string };
    sha = data.sha;
  } else if (getRes.status !== 404) {
    throw new Error(`GitHub 读取文件失败：${getRes.status} ${await getRes.text()}`);
  }

  const body = {
    message: `chore(data): 后台更新 ${apiPath}`,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: cfg.branch,
    ...(sha ? { sha } : {}),
  };

  const putRes = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  if (!putRes.ok) {
    throw new Error(`GitHub 提交失败：${putRes.status} ${await putRes.text()}`);
  }
}

/**
 * 持久化 data 目录下的一个 JSON 文件。
 * 返回是否已同步到 GitHub（false 表示只存在于当前实例，重启后会丢）。
 */
export async function persistDataFile(
  fileName: string,
  content: string
): Promise<{ committed: boolean; warning?: string }> {
  const relativePath = path.join("data", fileName);
  writeLocalFile(relativePath, content);

  if (!githubPersistEnabled()) {
    return { committed: false };
  }

  try {
    await commitToGithub(relativePath, content);
    return { committed: true };
  } catch (err) {
    // 本地已写成功，仅回写失败：不阻断请求，但把警告带回去
    const warning = err instanceof Error ? err.message : String(err);
    console.error("[persist] GitHub 回写失败：", warning);
    return { committed: false, warning };
  }
}
