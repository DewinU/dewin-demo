'use server'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath, revalidateTag } from 'next/cache'
// export async function addTodo(previosState: any, formData: any) {
//   console.log('previosState', previosState)
//   const todoText = formData.get('todo')
//   console.log('todoText', todoText)
//   await db.insert(todos).values({ title: todoText })

//   //add 10 seconds lag
//   await new Promise(resolve => setTimeout(resolve, 2000))

//   revalidatePath('/todos')
// }

export async function addTodo(todoText: string) {
  try {
    //add 10 seconds lag
    //await new Promise(resolve => setTimeout(resolve, 2000))
    await db.insert(todos).values({ title: todoText })
  } catch (err) {
    console.error(err)
    return { error: 'An error occurred while adding the todo' }
  } finally {
    // revalidatePath('/todos', 'page')
    revalidateTag('todos')
  }
}

export async function deleteTodo(id: number) {
  //await new Promise(resolve => setTimeout(resolve, 2000))
  await db.delete(todos).where(eq(todos.id, id))

  revalidateTag('todos')
}

export async function updateTodo(id: number, completed: number) {
  //add 10 seconds lag
  //await new Promise(resolve => setTimeout(resolve, 2000))
  await db.update(todos).set({ completed }).where(eq(todos.id, id))

  console.log('voy a revalidar')
  revalidateTag('todos')
}
