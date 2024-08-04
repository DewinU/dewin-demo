import TodosList from '@/components/todos/TodosList'
import { db } from '@/db'

export default async function TodosPage() {
  const todos = await db.query.todos.findMany()

  return (
    <main className='ml-36 flex flex-col items-center'>
      <h1>Todos</h1>
      <p>Manage your todos</p>
      <TodosList todos={todos} />
    </main>
  )
}
