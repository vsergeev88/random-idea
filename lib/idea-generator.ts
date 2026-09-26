import {
  ACTIONS,
  AUDIENCES,
  PAIN_ACTIONS,
  PROBLEMS,
  PRODUCT_TYPES,
  SERVICES,
} from "./idea-blocks";

export interface GeneratedIdea {
  action: string;
  audience: string;
  generatedAt: number;
  id: string;
  problem: string;
  productType: string;
  text: string;
}

export interface PinnedBlocks {
  action?: string;
  audience?: string;
  problem?: string;
  productType?: string;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateIdea(
  recentTexts: string[] = [],
  pinned: PinnedBlocks = {}
): GeneratedIdea {
  let productType: string;
  let audience: string;
  let action: string;
  let problem: string;
  let text: string;
  let attempts = 0;

  do {
    productType = pinned.productType ?? randomFrom(PRODUCT_TYPES);
    audience = pinned.audience ?? randomFrom(AUDIENCES);
    action = pinned.action ?? randomFrom(ACTIONS);
    problem = pinned.problem ?? randomFrom(PROBLEMS);
    text = `${productType} для ${audience} — помогает ${action} ${problem}`;
    attempts++;
  } while (recentTexts.includes(text) && attempts < 20);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    productType,
    audience,
    action,
    problem,
    generatedAt: Date.now(),
  };
}

export interface AnalogyIdea {
  audience: string;
  generatedAt: number;
  id: string;
  service: string;
  text: string;
}

export interface PinnedAnalogyBlocks {
  audience?: string;
  service?: string;
}

export interface PainIdea {
  generatedAt: number;
  id: string;
  painAction: string;
  problem: string;
  text: string;
}

export interface PinnedPainBlocks {
  painAction?: string;
  problem?: string;
}

export function generatePain(
  recentTexts: string[] = [],
  pinned: PinnedPainBlocks = {}
): PainIdea {
  let painAction: string;
  let problem: string;
  let text: string;
  let attempts = 0;

  do {
    painAction = pinned.painAction ?? randomFrom(PAIN_ACTIONS);
    problem = pinned.problem ?? randomFrom(PROBLEMS);
    text = `Что-то ${painAction} ${problem}`;
    attempts++;
  } while (recentTexts.includes(text) && attempts < 20);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    painAction,
    problem,
    generatedAt: Date.now(),
  };
}

export function generateAnalogy(
  recentTexts: string[] = [],
  pinned: PinnedAnalogyBlocks = {}
): AnalogyIdea {
  let service: string;
  let audience: string;
  let text: string;
  let attempts = 0;

  do {
    service = pinned.service ?? randomFrom(SERVICES);
    audience = pinned.audience ?? randomFrom(AUDIENCES);
    text = `${service} для ${audience}`;
    attempts++;
  } while (recentTexts.includes(text) && attempts < 20);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    service,
    audience,
    generatedAt: Date.now(),
  };
}
