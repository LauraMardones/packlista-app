/**
 * Category identifiers for packlist items.
 */
export type Category =
  | 'bad'
  | 'elektronik'
  | 'traning'
  | 'golf'
  | 'hygien'
  | 'ovrigt'
  | 'forberedelser'
  | 'klader'
  | 'barbershop'

/**
 * Display labels for each category.
 */
export const CATEGORY_LABELS: Record<Category, { emoji: string; name: string }> =
  {
    bad: { emoji: '🏖️', name: 'Bad/Strand' },
    elektronik: { emoji: '🔌', name: 'Elektronik' },
    traning: { emoji: '🏋️', name: 'Träning' },
    golf: { emoji: '⛳', name: 'Golf' },
    hygien: { emoji: '🧼', name: 'Hygien' },
    ovrigt: { emoji: '🧩', name: 'Övrigt' },
    forberedelser: { emoji: '✅', name: 'Förberedelser' },
    klader: { emoji: '👗', name: 'Kläder' },
    barbershop: { emoji: '💈', name: 'Barbershop' },
  }

/**
 * A single item in a packlist.
 */
export interface PacklistItem {
  /** Unique item ID. */
  id: string
  /** Item name. */
  name: string
  /** Item category. */
  category: Category
  /** Whether the item is checked off. */
  checked: boolean
  /** Optional quantity. */
  quantity?: number
  /** Optional notes. */
  notes?: string
}

/**
 * A complete packlist with metadata and items.
 */
export interface Packlist {
  /** Unique packlist ID. */
  id: string
  /** Packlist name. */
  name: string
  /** Selected categories for this list. */
  selectedCategories: Category[]
  /** Items in the list. */
  items: PacklistItem[]
  /** Creation timestamp. */
  createdAt: Date
  /** Last update timestamp. */
  updatedAt: Date
}

/**
 * A master item used to build a packlist.
 */
export interface MasterlistItem {
  /** Item name. */
  name: string
  /** Item category. */
  category: Category
}
