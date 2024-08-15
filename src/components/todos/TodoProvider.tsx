'use client'

import { Todo } from '@/db/schema'
import { createContext, ReactNode, use, useOptimistic } from 'react'
import { v4 as uuidV4 } from 'uuid'

type TodoContextType = {
  todos: Todo[]
  addTodoOptimistic: (title: string) => void
  deleteTodoOptimistic: (id: number) => void
  updateTodoOptimistic: (todo: Todo) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

function todosReducer(state: (Todo & { isSending?: boolean })[], action: any) {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('ADD_TODO', action.payload)
      return [
        ...state,
        {
          title: action.payload,
          isSending: true,
          id: uuidV4(),
          completed: 0,
        },
      ]
    case 'DELETE_TODO':
      console.log('DELETE_TODO', action.payload)
      return state.filter((todo: Todo) => todo.id !== action.payload)

    case 'UPDATE_TODO':
      console.log('UPDATE_TODO', action.payload)
      return state.map((todo: Todo) =>
        todo.id === action.payload.id ? action.payload : todo,
      )

    default:
      return state
  }
}

export function TodoProvider({
  children,
  todosPromise,
}: {
  children: ReactNode
  todosPromise: Promise<Todo[]>
}) {
  const todos = use(todosPromise)

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    todosReducer,
  )

  const addTodoOptimistic = (title: string) => {
    updateOptimisticTodos({
      type: 'ADD_TODO',
      payload: title,
    })
  }

  const deleteTodoOptimistic = (id: number) => {
    updateOptimisticTodos({
      type: 'DELETE_TODO',
      payload: id,
    })
  }

  const updateTodoOptimistic = (todo: Todo) => {
    updateOptimisticTodos({
      type: 'UPDATE_TODO',
      payload: {
        ...todo,
        completed: todo.completed ? 0 : 1,
      },
    })
  }

  const value = {
    todos: optimisticTodos,
    addTodoOptimistic,
    deleteTodoOptimistic,
    updateTodoOptimistic,
  }

  return <TodoContext value={value}>{children}</TodoContext>
}

export function useTodos() {
  const context = use(TodoContext)
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider')
  }
  return context
}
