import TopBar from './components/TopBar'
import MyApps from './components/MyApps'
import NewsBoard from './components/NewsBoard'
import NoticePanel from './components/NoticePanel'
import TodoPanel from './components/TodoPanel'
import StatsPanel from './components/StatsPanel'
import AppViews from './AppViews'
import { UiProvider, useUi } from './ui/UiProvider'
import { DataProvider } from './ui/DataStore'

/**
 * 首页外壳：V1.0 为「左右两栏」结构，V2.0 为「上层业务区 + 底部资讯通栏」结构。
 * 两种结构复用同一批业务组件，跳转与弹窗逻辑完全一致。
 */
function HomeShell() {
  const { version } = useUi()

  if (version === 'v2') {
    return (
      <>
        <TopBar />
        <main className="layout layout--v2">
          <div className="v2-top">
            <div className="v2-apps">
              <MyApps />
            </div>
            <aside className="v2-rail">
              <StatsPanel />
              <NoticePanel />
              <TodoPanel />
            </aside>
          </div>
          <div className="v2-news">
            <NewsBoard />
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <TopBar />
      <main className="layout">
        <div className="col-left">
          <MyApps />
          <NewsBoard />
        </div>
        <aside className="col-right col-right--two">
          <TodoPanel />
          <StatsPanel />
        </aside>
      </main>
    </>
  )
}

export default function App() {
  return (
    <UiProvider>
      <DataProvider>
        <HomeShell />
        <AppViews />
      </DataProvider>
    </UiProvider>
  )
}
