import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

import { MASTERLIST } from '../data/masterlist'
import type { Category, Packlist, PacklistItem } from '../types/packlist'

const STORAGE_KEY = 'packlista-current-list'

type AddItemInput = Omit<PacklistItem, 'id' | 'checked'> & {
  id?: string
  checked?: boolean
}

interface PacklistState {
  currentList: Packlist | null
  selectedCategories: Category[]
  createList: (name: string, categories: Category[]) => void
  addItem: (item: AddItemInput) => void
  removeItem: (id: string) => void
  toggleItem: (id: string) => void
  clearChecked: () => void
  resetList: () => void
  updateListName: (name: string) => void
  selectCategories: (categories: Category[]) => void
}

const generateItemsFromCategories = (
  categories: Category[],
): PacklistItem[] => {
  const selected = new Set(categories)
  const seenNames = new Set<string>()

  return MASTERLIST.filter((item) => selected.has(item.category)).reduce(
    (items, item) => {
      const key = item.name.toLowerCase()
      if (seenNames.has(key)) {
        return items
      }

      seenNames.add(key)
      items.push({
        id: uuidv4(),
        name: item.name,
        category: item.category,
        checked: false,
      })
      return items
    },
    [] as PacklistItem[],
  )
}

const loadState = (): Pick<PacklistState, 'currentList' | 'selectedCategories'> => {
  if (typeof window === 'undefined') {
    return { currentList: null, selectedCategories: [] }
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { currentList: null, selectedCategories: [] }
  }

  try {
    const parsed = JSON.parse(raw) as {
      currentList: Packlist | null
      selectedCategories: Category[]
    }

    if (parsed.currentList) {
      parsed.currentList = {
        ...parsed.currentList,
        createdAt: new Date(parsed.currentList.createdAt),
        updatedAt: new Date(parsed.currentList.updatedAt),
      }
    }

    return {
      currentList: parsed.currentList,
      selectedCategories: parsed.selectedCategories ?? [],
    }
  } catch {
    return { currentList: null, selectedCategories: [] }
  }
}

const saveState = (state: PacklistState) => {
  if (typeof window === 'undefined') {
    return
  }

  const payload = JSON.stringify({
    currentList: state.currentList,
    selectedCategories: state.selectedCategories,
  })
  window.localStorage.setItem(STORAGE_KEY, payload)
}

const initialState = loadState()

export const usePacklistStore = create<PacklistState>((set, get) => ({
  currentList: initialState.currentList,
  selectedCategories: initialState.selectedCategories,
  createList: (name, categories) => {
    const now = new Date()
    const items = generateItemsFromCategories(categories)
    const packlist: Packlist = {
      id: uuidv4(),
      name,
      selectedCategories: categories,
      items,
      createdAt: now,
      updatedAt: now,
    }

    set({ currentList: packlist, selectedCategories: categories })
  },
  addItem: (item) => {
    const { currentList } = get()
    if (!currentList) {
      return
    }

    const newItem: PacklistItem = {
      id: item.id ?? uuidv4(),
      name: item.name,
      category: item.category,
      checked: item.checked ?? false,
      quantity: item.quantity,
      notes: item.notes,
    }

    set({
      currentList: {
        ...currentList,
        items: [...currentList.items, newItem],
        updatedAt: new Date(),
      },
    })
  },
  removeItem: (id) => {
    const { currentList } = get()
    if (!currentList) {
      return
    }

    set({
      currentList: {
        ...currentList,
        items: currentList.items.filter((item) => item.id !== id),
        updatedAt: new Date(),
      },
    })
  },
  toggleItem: (id) => {
    const { currentList } = get()
    if (!currentList) {
      return
    }

    set({
      currentList: {
        ...currentList,
        items: currentList.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
        updatedAt: new Date(),
      },
    })
  },
  clearChecked: () => {
    const { currentList } = get()
    if (!currentList) {
      return
    }

    set({
      currentList: {
        ...currentList,
        items: currentList.items.filter((item) => !item.checked),
        updatedAt: new Date(),
      },
    })
  },
  resetList: () => {
    set({ currentList: null, selectedCategories: [] })
  },
  updateListName: (name) => {
    const { currentList } = get()
    if (!currentList) {
      return
    }

    set({
      currentList: { ...currentList, name, updatedAt: new Date() },
    })
  },
  selectCategories: (categories) => {
    const { currentList } = get()
    if (!currentList) {
      set({ selectedCategories: categories })
      return
    }

    const items = generateItemsFromCategories(categories)
    set({
      currentList: {
        ...currentList,
        selectedCategories: categories,
        items,
        updatedAt: new Date(),
      },
      selectedCategories: categories,
    })
  },
}))

usePacklistStore.subscribe((state) => {
  saveState(state)
})
