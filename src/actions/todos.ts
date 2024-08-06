'use server'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

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
    await db.insert(todos).values({ title: todoText })
    //add 10 seconds lag
    // await new Promise(resolve => setTimeout(resolve, 2000))
  } catch (err) {
    console.error(err)
    return { error: 'An error occurred while adding the todo' }
  } finally {
    // revalidatePath('/todos', 'page')
    revalidateTag('todos')
  }
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id))

  //add 10 seconds lag
  //await new Promise(resolve => setTimeout(resolve, 2000))

  revalidateTag('todos')
}
