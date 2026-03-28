import { PRODUCT_TYPES, AUDIENCES, ACTIONS, PROBLEMS } from "./idea-blocks"

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
