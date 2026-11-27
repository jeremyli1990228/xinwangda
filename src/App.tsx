import TopBar from './components/TopBar'
import MyApps from './components/MyApps'
import NewsBoard from './components/NewsBoard'
import NoticePanel from './components/NoticePanel'
import TodoPanel from './components/TodoPanel'
import StatsPanel from './components/StatsPanel'
import AppViews from './AppViews'
import { UiProvider } from './ui/UiProvider'
import { DataProvider } from './ui/DataStore'

export default function App() {
  return (
    <UiProvider>
      <DataProvider>
        <TopBar />
        <main className="layout">
          <div className="col-left">
            <MyApps />
            <NewsBoard />
          </div>
          <aside className="col-right">
            <NoticePanel />
            <TodoPanel />
            <StatsPanel />
          </aside>
        </main>
        <AppViews />
      </DataProvider>
    </UiProvider>
  )
}
