import TopBar from './components/TopBar'
import MyApps from './components/MyApps'
import NewsBoard from './components/NewsBoard'
import NoticePanel from './components/NoticePanel'
import TodoPanel from './components/TodoPanel'
import StatsPanel from './components/StatsPanel'
import { UiProvider } from './ui/UiProvider'

export default function App() {
  return (
    <UiProvider>
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
    </UiProvider>
  )
}
