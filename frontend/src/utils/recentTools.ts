"use client";

import { Tool, TOOLS } from "@/constants/tools";

const RECENT_TOOLS_KEY = "turbo-recent-tools";
const MAX_RECENT = 4;

export function saveRecentTool(toolId: string) {
  if (typeof window === "undefined") return;
  
  try {
    const recent = getRecentToolIds();
    const updated = [toolId, ...recent.filter(id => id !== toolId)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage is not available:", e);
  }
}

export function getRecentToolIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_TOOLS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function getRecentTools(): Tool[] {
  const ids = getRecentToolIds();
  return ids.map(id => TOOLS.find(t => t.id === id)).filter(Boolean) as Tool[];
}
