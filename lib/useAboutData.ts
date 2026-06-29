"use client";

import { useEffect, useState } from "react";
import type { AboutData } from "@/lib/about";

// 模块级 promise 缓存：同一次页面加载内，多个组件共享同一次 /api/about 请求
let aboutDataPromise: Promise<AboutData> | null = null;

function fetchAboutData(): Promise<AboutData> {
  if (!aboutDataPromise) {
    aboutDataPromise = fetch("/api/about")
      .then((r) => r.json())
      .catch((err) => {
        // 失败时清空缓存，允许下次重试
        aboutDataPromise = null;
        throw err;
      });
  }
  return aboutDataPromise;
}

export function useAboutData<K extends keyof AboutData>(
  key: K
): AboutData[K] | null {
  const [data, setData] = useState<AboutData[K] | null>(null);

  useEffect(() => {
    let active = true;
    fetchAboutData()
      .then((d) => {
        if (active) setData(d[key]);
      })
      .catch(() => {
        if (active) setData(null);
      });
    return () => {
      active = false;
    };
  }, [key]);

  return data;
}
