import type { AppLanguage } from "../i18n";
import type { EndingId, ItemId, Scene, SceneId } from "./types";

// Episode 1 is authored in English. Keep these helpers as stable boundaries for
// saved profiles and future translations without presenting stale localized lore.
export function getItemCopy(
  _id: ItemId,
  _language: AppLanguage,
  fallback: { name: string; short: string },
) {
  return fallback;
}

export function localizeStoredItemName(name: string, _language: AppLanguage) {
  void _language;
  return name;
}

export function getSceneCopy(
  _id: SceneId,
  _language: AppLanguage,
  fallback: Scene,
): Scene {
  return fallback;
}

export function getEndingCopy(
  _id: EndingId,
  _language: AppLanguage,
  fallback: { title: string; body: string },
) {
  return fallback;
}

export function localizeGameRole(role: string, _language: AppLanguage) {
  void _language;
  return role;
}

export function localizeGameLog(text: string, _language: AppLanguage) {
  void _language;
  return text;
}
