import { useMemo } from 'react'

import { MASTERLIST } from '../data/masterlist'
import { CATEGORY_LABELS } from '../types/packlist'
import type { Category } from '../types/packlist'

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

interface CategorySelectorProps {
  selected: Category[]
  onChange: (categories: Category[]) => void
}

export function CategorySelector({ selected, onChange }: CategorySelectorProps) {
  const selectedSet = useMemo(() => new Set(selected), [selected])
  const counts = useMemo(() => {
    const tally: Record<Category, number> = {
      bad: 0,
      elektronik: 0,
      traning: 0,
      golf: 0,
      hygien: 0,
      ovrigt: 0,
      forberedelser: 0,
      klader: 0,
      barbershop: 0,
    }

    for (const item of MASTERLIST) {
      tally[item.category] += 1
    }

    return tally
  }, [])

  const toggleCategory = (category: Category) => {
    if (selectedSet.has(category)) {
      onChange(selected.filter((item) => item !== category))
      return
    }

    onChange([...selected, category])
  }

  const selectAll = () => onChange([...ALL_CATEGORIES])
  const deselectAll = () => onChange([])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={selectAll}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          Välj alla
        </button>
        <button
          type="button"
          onClick={deselectAll}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          Rensa
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {ALL_CATEGORIES.map((category) => {
          const isSelected = selectedSet.has(category)
          const label = CATEGORY_LABELS[category]
          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={[
                'group relative rounded-2xl border px-4 py-4 text-left shadow-sm transition',
                isSelected
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{label.emoji}</span>
                <span
                  className={[
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600',
                  ].join(' ')}
                >
                  {counts[category]}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold">{label.name}</p>
              <p
                className={[
                  'mt-1 text-xs',
                  isSelected ? 'text-white/70' : 'text-slate-500',
                ].join(' ')}
              >
                {isSelected ? 'Vald kategori' : 'Tryck för att välja'}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
