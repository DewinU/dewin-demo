'use client'
import { useActionState, useOptimistic } from 'react'
import { addTodo } from '@/actions/todos'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Todo } from '@/db/schema'
import { cn } from '@/lib/utils'

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
  const [state, addTodoAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      addOptimisticTodo(formData.get('todo') as string)
      await addTodo(formData.get('todo') as string)
    },
    null,
  )
  return (
    <>
      <form className='flex flex-col items-center' action={addTodoAction}>
        <label className='block' htmlFor='todo'>
          Todo
        </label>
        <input
          required
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
      </form>
      <h2>My Todos</h2>
      <ul>
        {optimisticTodos.map((todo: Todo & { isSending: string }) => (
          <li className={cn({ 'text-gray-500': todo.isSending })} key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  )
}
