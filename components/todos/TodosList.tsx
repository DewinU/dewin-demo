'use client'
import { useActionState, useOptimistic } from 'react'
import { addTodo, deleteTodo } from '@/actions/todos'
import { Button } from '@/components/ui/button'
import { Loader2, ArchiveX } from 'lucide-react'
import type { Todo } from '@/db/schema'
import { cn } from '@/lib/utils'
import { AlertDialogDemo } from '@/components/todos/TodoDeleteModal'

export default function TodosList({ todos }: { todos: any }) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (state, action: any) => {
      switch (action.type) {
        case 'ADD_TODO':
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
          return state.map((todo: Todo) =>
            todo.id === action.payload.id
              ? { ...todo, ...action.payload }
              : todo,
          )
      }
    },
  )
  const [addState, addTodoAction, isAddPending] = useActionState(
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
          <Button className='w-36' type='submit' disabled={isAddPending}>
            {isAddPending ? (
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
        {optimisticTodos.map((todo: Todo & { isSending: boolean }) => (
          <li
            className={cn(
              'inline-flex items-center justify-between gap-2 rounded bg-gray-300 px-4 py-2',
              { 'bg-gray-200 text-gray-400': todo.isSending },
            )}
            key={todo.id}>
            <span>{todo.title}</span>
            <AlertDialogDemo
              todo={todo}
              setOptimisticTodos={setOptimisticTodos}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
