import { useMemo, useState } from 'react'

import { MASTERLIST } from '../data/masterlist'
import type { Category } from '../types/packlist'
import { CategorySelector } from './CategorySelector'
import { usePacklistStore } from '../store/packlistStore'

export function ListCreator() {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const createList = usePacklistStore((state) => state.createList)

  const previewCount = useMemo(() => {
    if (categories.length === 0) {
      return 0
    }

    const selected = new Set(categories)
    const names = new Set<string>()
    for (const item of MASTERLIST) {
      if (selected.has(item.category)) {
        names.add(item.name.toLowerCase())
      }
    }

    return names.size
  }, [categories])

  const canCreate = name.trim().length > 0 && categories.length > 0

  const handleCreate = () => {
    if (!canCreate) {
      return
    }
    createList(name.trim(), categories)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Skapa packlista
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Vad ska listan heta?
          </h1>
        </div>

        <div className="mt-6">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Sommarresa 2026"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
          />
        </div>

        <div className="mt-8">
          <CategorySelector selected={categories} onChange={setCategories} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Förhandsvisning</p>
            <p className="text-lg font-semibold text-slate-900">
              {previewCount} saker kommer läggas till
            </p>
          </div>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!canCreate}
            className={[
              'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition',
              canCreate
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'cursor-not-allowed bg-slate-200 text-slate-500',
            ].join(' ')}
          >
            Skapa lista
          </button>
        </div>
      </div>
    </div>
  )
}
