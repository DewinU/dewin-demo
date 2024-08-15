import { SkeletonCard } from '@/components/shared/SkeletonCard'
import { TodoProvider } from '@/components/todos/TodoProvider'
import TodosList from '@/components/todos/TodosList'
import { db } from '@/db'
import { unstable_cache as cache } from 'next/cache'
import { Suspense } from 'react'

export default function TodosPage() {
  // const todos = await db.query.todos.findMany()
  const getCacheTodos = cache(
    () => {
      return db.query.todos.findMany()
    },
    ['todos'],
    {
      tags: ['todos'],
    },
  )

  const todosPromise = getCacheTodos()

  return (
    <main className='ml-36 inline-flex flex-col px-10 py-5'>
      <h1 className='text-center'>Todos</h1>
      <Suspense fallback={<SkeletonCard />}>
        <TodoProvider todosPromise={todosPromise}>
          <TodosList />
        </TodoProvider>
      </Suspense>
    </main>
  )
}
