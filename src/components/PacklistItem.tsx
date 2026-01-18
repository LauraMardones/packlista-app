import type { PacklistItem as PacklistItemType } from '../types/packlist'

interface PacklistItemProps {
  item: PacklistItemType
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function PacklistItem({ item, onToggle, onDelete }: PacklistItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300">
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className={[
          'flex h-6 w-6 items-center justify-center rounded-md border transition',
          item.checked
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 bg-white',
        ].join(' ')}
        aria-pressed={item.checked}
      >
        {item.checked ? '✓' : ''}
      </button>

      <div className="flex-1">
        <p
          className={[
            'text-sm font-medium transition',
            item.checked ? 'text-slate-400 line-through' : 'text-slate-800',
          ].join(' ')}
        >
          {item.name}
        </p>
        {item.notes ? (
          <p className="mt-1 text-xs text-slate-500">{item.notes}</p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
        aria-label={`Ta bort ${item.name}`}
      >
        Ta bort
      </button>
    </div>
  )
}
