import type { AppLanguage } from "../i18n";
import { GAME_KO, GAME_ROLES_KO } from "./ko";
import type { CaseRecord, EndingId, ItemId, Scene, SceneId } from "./types";

export function localizeGameText(text: string, language: AppLanguage) {
  return language === "ko" ? (GAME_KO[text] ?? text) : text;
}

export function getItemCopy(
  _id: ItemId,
  language: AppLanguage,
  fallback: { name: string; short: string },
) {
  return language === "ko"
    ? {
        name: localizeGameText(fallback.name, language),
        short: localizeGameText(fallback.short, language),
      }
    : fallback;
}

export function localizeStoredItemName(name: string, language: AppLanguage) {
  return localizeGameText(name, language);
}

export function getSceneCopy(
  _id: SceneId,
  language: AppLanguage,
  fallback: Scene,
): Scene {
  if (language === "en") return fallback;
  return {
    ...fallback,
    title: localizeGameText(fallback.title, language),
    ambient: localizeGameText(fallback.ambient, language),
    art: fallback.art,
    hotspots: fallback.hotspots.map((hotspot) => ({
      ...hotspot,
      label: localizeGameText(hotspot.label, language),
    })),
  };
}

export function getEndingCopy(
  _id: EndingId,
  language: AppLanguage,
  fallback: { title: string; body: string },
) {
  return language === "ko"
    ? {
        title: localizeGameText(fallback.title, language),
        body: localizeGameText(fallback.body, language),
      }
    : fallback;
}

export function getCaseRecordCopy(caseRecord: CaseRecord, language: AppLanguage): CaseRecord {
  if (language === "en") return caseRecord;
  return {
    ...caseRecord,
    title: localizeGameText(caseRecord.title, language),
    rows: caseRecord.rows.map((row) => ({
      ...row,
      label: localizeGameText(row.label, language),
      text: localizeGameText(row.text, language),
    })),
    notes: caseRecord.notes?.map((note) => ({
      ...note,
      text: localizeGameText(note.text, language),
    })),
  };
}

export function localizeGameRole(role: string, language: AppLanguage) {
  return language === "ko" ? (GAME_ROLES_KO[role] ?? role) : role;
}

export function localizeGameLog(text: string, language: AppLanguage) {
  if (language === "en") return text;
  if (text.startsWith("→ ")) {
    return `→ ${localizeGameText(text.slice(2), language)}`;
  }
  return localizeGameText(text, language);
}
