import TodosList from '@/components/todos/TodosList'
import { db } from '@/db'
import { unstable_cache as cache } from 'next/cache'

export default async function TodosPage() {
  // const todos = await db.query.todos.findMany()
  const getCacheTodos = cache(
    async () => {
      return db.query.todos.findMany()
    },
    ['todos'],
    {
      tags: ['todos'],
    },
  )

  const todos = await getCacheTodos()

  return (
    <main className='ml-36 inline-flex flex-col px-10 py-5'>
      <h1 className='text-center'>Todos</h1>
      <TodosList todos={todos} />
    </main>
  )
}
