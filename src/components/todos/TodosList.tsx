'use client'
import { startTransition, useActionState } from 'react'
import { addTodo, updateTodo } from '@/actions/todos'
import { Button } from '@/components/ui/button'
import { Loader2, ArchiveX, Pencil } from 'lucide-react'
import type { Todo } from '@/db/schema'
import { cn } from '@/lib/utils'
import { DeleteTodoModal } from '@/components/todos/TodoDeleteModal'
import { useTodos } from './TodoProvider'
import { useAuth } from '../auth/AuthProvider'

export default function TodosList() {
  const user = useAuth()
  const {
    todos,
    updateTodoOptimistic,
    addTodoOptimistic,
    deleteTodoOptimistic,
  } = useTodos()
  const [state, addTodoAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const title = formData.get('todo') as string
      addTodoOptimistic(title)
      await addTodo(title)
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
      <p>{`Welcome ${user?.email}`}</p>
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
        {todos.map((todo: Todo & { isSending?: boolean }) => (
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
                    updateTodoOptimistic(todo)
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
              <DeleteTodoModal todo={todo} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
