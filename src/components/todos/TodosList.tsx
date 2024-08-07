'use client'
import {
  createContext,
  startTransition,
  useActionState,
  useContext,
  useOptimistic,
} from 'react'
import { addTodo, updateTodo } from '@/actions/todos'
import { Button } from '@/components/ui/button'
import { Loader2, ArchiveX, Pencil } from 'lucide-react'
import type { Todo } from '@/db/schema'
import { cn } from '@/lib/utils'
import { DeleteTodoModal } from '@/components/todos/TodoDeleteModal'

// const TodoContext = createContext<TodoContextType | null>(null)

export default function TodosList({ todos }: { todos: any }) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (state: (Todo & { isSending?: boolean })[], action: any) => {
      switch (action.type) {
        case 'ADD_TODO':
          console.log('ADD_TODO', action.payload)
          return [
            ...state,
            {
              title: action.payload,
              isSending: true,
              id: state.length + 1,
              completed: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]
        case 'DELETE_TODO':
          return state.filter((todo: Todo) => todo.id !== action.payload)

        case 'UPDATE_TODO':
          const xd = state.map((todo: Todo) =>
            todo.id === action.payload.id ? action.payload : todo,
          )
          console.log('UPDATE_TODO', xd)
          return xd

        default:
          return state
      }
    },
  )
  const [state, addTodoAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      setOptimisticTodos({
        type: 'ADD_TODO',
        payload: formData.get('todo') as string,
      })
      await addTodo(formData.get('todo') as string)
    },
    null,
  )

  // const [deleteState, deleteTodoAction, isDeletePending] = useActionState(
  //   async (previousState: any, formData: FormData) => {
  //     const id = Number(formData.get('id'))
  //     await deleteTodo(id)
  //   },
  //   null,
  // )
  return (
    <>
      {/* <TodoContext.Provider value={{ setOptimisticTodos }}> */}
      <form
        className='inline-flex flex-col items-center gap-2'
        action={addTodoAction}>
        <label htmlFor='todo'>Manage your todos</label>
        <div className='inline-flex gap-4'>
          <input
            required
            className='rounded-md border border-gray-300 p-2'
            name='todo'
            type='text'
            placeholder='Enter a new todo'
          />
          <Button className='w-36' type='submit' disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait...
              </>
            ) : (
              'Add Todo'
            )}
          </Button>
        </div>
      </form>
      <h2>My Todos</h2>
      <ul className='flex flex-col gap-2'>
        {optimisticTodos.map((todo: Todo & { isSending?: boolean }) => (
          <li
            className={cn(
              'inline-flex items-center justify-between gap-2 rounded bg-gray-300 px-4 py-2',
              { 'bg-gray-200 text-gray-400': todo.isSending },
            )}
            key={todo.id}>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='peer h-4 w-4 cursor-pointer'
                defaultChecked={!!todo.completed}
                onClick={() => {
                  startTransition(async () => {
                    setOptimisticTodos({
                      type: 'UPDATE_TODO',
                      payload: {
                        ...todo,
                        completed: todo.completed ? 0 : 1,
                      },
                    })
                    await updateTodo(todo.id, todo.completed ? 0 : 1)
                  })
                }}
              />
              <span className='peer-checked:line-through'>{todo.title}</span>
            </div>
            <div className='flex gap-2'>
              {/* <Button
                disabled={todo.isSending}
                className='bg-yellow-700 text-destructive-foreground hover:bg-yellow-600/90'
                size={'sm'}>
                <Pencil className='h-4 w-4' />
              </Button> */}
              <DeleteTodoModal
                todo={todo}
                setOptimisticTodos={setOptimisticTodos}
              />
            </div>
          </li>
        ))}
      </ul>
      {/* </TodoContext.Provider> */}
    </>
  )
}

// export function useTodoContext() {
//   const context = useContext(TodoContext)
//   if (!context) {
//     throw new Error('useTodoContext must be used within a TodoProvider')
//   }
//   return context
// }

// export type TodoContextType = {
//   // todos: Todo[]
//   // addTodo: (title: string) => void
//   // deleteTodo: (id: number) => void
//   setOptimisticTodos: (action: any) => void
// }
