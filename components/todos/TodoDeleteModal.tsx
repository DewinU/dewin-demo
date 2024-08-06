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
import { ArchiveX } from 'lucide-react'
export function AlertDialogDemo({
  todo,
}: {
  todo: Todo & { isSending?: boolean }
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={todo.isSending}
          size={'sm'}
          className='bg-red-700'
          variant={'destructive'}>
          <ArchiveX className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteTodo(todo.id)
            }}
            className='bg-red-700 text-destructive-foreground hover:bg-red-700/90'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
