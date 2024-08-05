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
    <main className='ml-36 flex flex-col items-center'>
      <h1>Todos</h1>
      <p>Manage your todos</p>
      <TodosList todos={todos} />
    </main>
  )
}
