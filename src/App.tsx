import { ListCreator } from './components/ListCreator'
import { PacklistView } from './components/PacklistView'
import { usePacklistStore } from './store/packlistStore'

function App() {
  const currentList = usePacklistStore((state) => state.currentList)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {currentList ? (
        <PacklistView packlist={currentList} />
      ) : (
        <ListCreator />
      )}
    </div>
  )
}

export default App
