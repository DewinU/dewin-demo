'use client'
import { useActionState, useOptimistic } from 'react'
import { addTodo, deleteTodo } from '@/actions/todos'
import { Button } from '@/components/ui/button'
import { Loader2, ArchiveX } from 'lucide-react'
import type { Todo } from '@/db/schema'
import { cn } from '@/lib/utils'
import { AlertDialogDemo } from '@/components/todos/TodoDeleteModal'

export default function TodosList({ todos }: { todos: any }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newItem: string) => [
      ...state,
      {
        isSending: true,
        id: state.length + 1,
        title: `${newItem}`,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  )
  const [addState, addTodoAction, isAddPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      addOptimisticTodo(formData.get('todo') as string)
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
            <AlertDialogDemo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  )
}
