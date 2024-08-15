import { deleteTodo } from '@/actions/todos'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { Todo } from '@/db/schema'
import { ArchiveX, Trash2 } from 'lucide-react'
import { startTransition } from 'react'
import { useTodos } from './TodoProvider'
export function DeleteTodoModal({
  todo,
}: {
  todo: Todo & { isSending?: boolean }
}) {
  const { deleteTodoOptimistic } = useTodos()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={todo.isSending}
          size={'sm'}
          className='bg-red-700'
          variant={'destructive'}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                deleteTodoOptimistic(todo.id)
                await deleteTodo(todo.id)
              })
            }}
            className='bg-red-800 text-destructive-foreground hover:bg-red-600/90'>
            Delete
            <Trash2 className='ml-2 h-5 w-5' />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
