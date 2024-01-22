import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd"
import { Delete } from "./icons"

const TaskExcerpt = ({
  task,
  dragHandleProps,
  draggableProps,
  innerRef,
  deleteTask,
}: {
  task: Task
  dragHandleProps: DraggableProvidedDragHandleProps | null
  draggableProps: DraggableProvidedDraggableProps
  innerRef: (element?: HTMLElement | null | undefined) => void
  deleteTask: (id: string) => void
}) => {
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="group relative py-4 px-3 bg-white rounded-sm flex flex-col gap-1 ring-1 ring-accent/10 ring-offset-2 shadow-md"
    >
      <h2 className="text-lg select-none text-accent">{task.title}</h2>
      {task.description ? (
        <p className="text-sm select-none text-primary-foreground/80">
          {task.description}
        </p>
      ) : null}
      <button
        onClick={(e) => {
          e.preventDefault()
          deleteTask(task.id)
        }}
        className="group-hover:flex hidden absolute top-[50%] -translate-y-[50%] right-4 w-[40px] aspect-square rounded-md bg-accent/10 items-center justify-center"
      >
        <Delete className="min-w-[28px] max-w-[28px]" />
      </button>
    </div>
  )
}

export default TaskExcerpt
