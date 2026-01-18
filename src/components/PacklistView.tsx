import { useMemo, useState } from 'react'

import { CATEGORY_LABELS } from '../types/packlist'
import type { Category, Packlist } from '../types/packlist'
import { usePacklistStore } from '../store/packlistStore'
import { groupByCategory } from '../utils/packlist'
import { PacklistCategory } from './PacklistCategory'

interface PacklistViewProps {
  packlist: Packlist
}

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as Category[]

export function PacklistView({ packlist }: PacklistViewProps) {
  const {
    toggleItem,
    removeItem,
    clearChecked,
    resetList,
    updateListName,
    addItem,
  } = usePacklistStore()
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState<Category>('ovrigt')

  const stats = useMemo(() => {
    const total = packlist.items.length
    const checked = packlist.items.filter((item) => item.checked).length
    const progress = total === 0 ? 0 : Math.round((checked / total) * 100)
    return { total, checked, progress }
  }, [packlist.items])

  const itemsByCategory = useMemo(
    () => groupByCategory(packlist.items),
    [packlist.items],
  )

  const categories = useMemo(() => {
    const present = new Set(packlist.items.map((item) => item.category))
    const ordered = CATEGORY_ORDER.filter((category) => present.has(category))
    return ordered
  }, [packlist.items])

  const handleAddItem = () => {
    const trimmed = newName.trim()
    if (!trimmed) {
      return
    }

    addItem({ name: trimmed, category: newCategory })
    setNewName('')
    setNewCategory('ovrigt')
    setIsAdding(false)
  }

  const handleEditName = () => {
    const next = window.prompt('Nytt namn på listan', packlist.name)
    if (!next || !next.trim()) {
      return
    }
    updateListName(next.trim())
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Din packlista
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {packlist.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {stats.checked}/{stats.total} klara · {stats.progress}%
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearChecked}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Rensa klara
            </button>
            <button
              type="button"
              onClick={handleEditName}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Ändra namn
            </button>
            <button
              type="button"
              onClick={resetList}
              className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              Återställ
            </button>
          </div>
        </div>
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </header>

      {stats.total === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Inga saker ännu
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Lägg till en egen sak eller välj fler kategorier.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {categories.map((category) => (
            <PacklistCategory
              key={category}
              category={category}
              items={itemsByCategory[category] ?? []}
              onToggleItem={toggleItem}
              onDeleteItem={removeItem}
            />
          ))}
        </div>
      )}

      {isAdding ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-900">
              Lägg till egen sak
            </h2>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="T.ex. Vattenflaska"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
              />
              <select
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value as Category)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
              >
                {CATEGORY_ORDER.map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_LABELS[category].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
              >
                Avbryt
              </button>
              <button
                type="button"
                onClick={handleAddItem}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Lägg till
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsAdding(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-2xl text-white shadow-xl transition hover:bg-slate-800"
        aria-label="Lägg till egen sak"
      >
        +
      </button>
    </div>
  )
}
