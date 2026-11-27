import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { noticeItems, type NoticeItem } from '../data/notices'
import { todoItems, type TodoItem } from '../data/todos'

interface DataApi {
  notices: NoticeItem[]
  todos: TodoItem[]
  markNoticeRead: (id: string) => void
  removeTodo: (id: string) => void
}

const DataContext = createContext<DataApi | null>(null)

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData 必须在 DataProvider 内使用')
  return ctx
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<NoticeItem[]>(noticeItems)
  const [todos, setTodos] = useState<TodoItem[]>(todoItems)

  const markNoticeRead = useCallback((id: string) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }, [])

  const removeTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <DataContext.Provider value={{ notices, todos, markNoticeRead, removeTodo }}>
      {children}
    </DataContext.Provider>
  )
}
