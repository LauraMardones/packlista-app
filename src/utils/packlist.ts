import type { Category, PacklistItem } from '../types/packlist'

export const groupByCategory = (
  items: PacklistItem[],
): Record<Category, PacklistItem[]> => {
  return items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] ?? []
    acc[item.category].push(item)
    return acc
  }, {} as Record<Category, PacklistItem[]>)
}
