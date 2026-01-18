import { useMemo, useState } from 'react'

import { CATEGORY_LABELS } from '../types/packlist'
import type { Category, PacklistItem as PacklistItemType } from '../types/packlist'
import { PacklistItem } from './PacklistItem'

interface PacklistCategoryProps {
  category: Category
  items: PacklistItemType[]
  onToggleItem: (id: string) => void
  onDeleteItem: (id: string) => void
}

export function PacklistCategory({
  category,
  items,
  onToggleItem,
  onDeleteItem,
}: PacklistCategoryProps) {
  const [isOpen, setIsOpen] = useState(true)
  const label = CATEGORY_LABELS[category]

  const { checkedCount, totalCount, progress } = useMemo(() => {
    const checked = items.filter((item) => item.checked).length
    const total = items.length
    const value = total === 0 ? 0 : Math.round((checked / total) * 100)
    return { checkedCount: checked, totalCount: total, progress: value }
  }, [items])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{label.emoji}</span>
            <h3 className="text-base font-semibold text-slate-900">
              {label.name}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {checkedCount}/{totalCount}
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-slate-600">
          {isOpen ? 'Dölj' : 'Visa'}
        </span>
      </button>

      {isOpen ? (
        <div className="space-y-3 border-t border-slate-100 px-5 pb-5 pt-4">
          {items.map((item) => (
            <PacklistItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
              onDelete={onDeleteItem}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
