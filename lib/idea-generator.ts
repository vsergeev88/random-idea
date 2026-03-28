import { PRODUCT_TYPES, AUDIENCES, ACTIONS, PROBLEMS, SERVICES, PAIN_ACTIONS } from "./idea-blocks"

export interface GeneratedIdea {
  id: string
  text: string
  productType: string
  audience: string
  action: string
  problem: string
  generatedAt: number
}

export interface PinnedBlocks {
  productType?: string
  audience?: string
  action?: string
  problem?: string
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateIdea(
  recentTexts: string[] = [],
  pinned: PinnedBlocks = {}
): GeneratedIdea {
  let productType: string
  let audience: string
  let action: string
  let problem: string
  let text: string
  let attempts = 0

  do {
    productType = pinned.productType ?? randomFrom(PRODUCT_TYPES)
    audience = pinned.audience ?? randomFrom(AUDIENCES)
    action = pinned.action ?? randomFrom(ACTIONS)
    problem = pinned.problem ?? randomFrom(PROBLEMS)
    text = `${productType} для ${audience} — помогает ${action} ${problem}`
    attempts++
  } while (recentTexts.includes(text) && attempts < 20)

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    productType,
    audience,
    action,
    problem,
    generatedAt: Date.now(),
  }
}

export interface AnalogyIdea {
  id: string
  text: string
  service: string
  audience: string
  generatedAt: number
}

export interface PinnedAnalogyBlocks {
  service?: string
  audience?: string
}

export interface PainIdea {
  id: string
  text: string
  painAction: string
  problem: string
  generatedAt: number
}

export interface PinnedPainBlocks {
  painAction?: string
  problem?: string
}

export function generatePain(
  recentTexts: string[] = [],
  pinned: PinnedPainBlocks = {}
): PainIdea {
  let painAction: string
  let problem: string
  let text: string
  let attempts = 0

  do {
    painAction = pinned.painAction ?? randomFrom(PAIN_ACTIONS)
    problem = pinned.problem ?? randomFrom(PROBLEMS)
    text = `Что-то ${painAction} ${problem}`
    attempts++
  } while (recentTexts.includes(text) && attempts < 20)

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    painAction,
    problem,
    generatedAt: Date.now(),
  }
}

export function generateAnalogy(
  recentTexts: string[] = [],
  pinned: PinnedAnalogyBlocks = {}
): AnalogyIdea {
  let service: string
  let audience: string
  let text: string
  let attempts = 0

  do {
    service = pinned.service ?? randomFrom(SERVICES)
    audience = pinned.audience ?? randomFrom(AUDIENCES)
    text = `${service} для ${audience}`
    attempts++
  } while (recentTexts.includes(text) && attempts < 20)

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    service,
    audience,
    generatedAt: Date.now(),
  }
}
