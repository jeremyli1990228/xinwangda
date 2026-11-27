import { useUi } from './ui/UiProvider'
import NoticeListPage from './components/pages/NoticeListPage'
import NoticeDetailPage from './components/pages/NoticeDetailPage'
import TodoListPage from './components/pages/TodoListPage'
import TodoDetailPage from './components/pages/TodoDetailPage'

export default function AppViews() {
  const { view } = useUi()
  if (!view) return null

  switch (view.name) {
    case 'noticeList':
      return <NoticeListPage />
    case 'noticeDetail':
      return <NoticeDetailPage id={view.id} />
    case 'todoList':
      return <TodoListPage initialTab={view.tab} />
    case 'todoDetail':
      return <TodoDetailPage id={view.id} />
    default:
      return null
  }
}
