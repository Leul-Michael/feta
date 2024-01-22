"use client"

import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd"
import useLocalStorage from "@/hooks/use-local-storage"

import TaskExcerpt from "./task-excerpt"
import { cn } from "@/lib/utils"
import NewTaskModal from "./new-task-modal"

const stautsMapping: {
  [key in Status]: { index: number; name: string }
} = {
  todo: { index: 0, name: "Todo" },
  inprogress: { index: 1, name: "In Progress" },
  done: { index: 2, name: "Done" },
}

const Board = () => {
  const [modal, setModal] = useState<{
    show: boolean
    status: Status
  }>({
    show: false,
    status: "todo",
  })

  const [tasks, setTasks] = useLocalStorage<Task[]>("verenda-tasks", () => {
    return [...Array(5).keys()].map((i) => {
      const randomIndex = Math.floor(
        Math.random() * Object.keys(stautsMapping).length
      )

      return {
        id: uuidv4(),
        title: `Item ${i + 1}`,
        added_at: new Date(),
        status: Object.keys(stautsMapping)[randomIndex] as Status,
      }
    })
  })

  // to avoid board duplicates, and map items with the same category together.
  const [data, setData] = useState<Map<Status, Data>>(new Map())

  useEffect(() => {
    setData(() => {
      if (tasks.length) {
        return tasks.reduce((acc, task) => {
          if (acc.get(task.status) == null) {
            acc.set(task.status, {
              id: task.status,
              tasks: [],
            })
          }

          acc.get(task.status)!.tasks.push(task)

          // make sure every status is included
          for (const sta of Array.from(
            Object.keys(stautsMapping)
          ) as Status[]) {
            if (acc.get(sta) == null) {
              acc.set(sta, {
                id: sta,
                tasks: [],
              })
            }
          }

          return new Map(
            Array.from(acc.entries()).sort((a, b) => {
              return stautsMapping[a[0]].index - stautsMapping[b[0]].index
            })
          )
        }, new Map<Status, Data>())
      } else {
        const empty_array = new Map()
        Object.keys(stautsMapping).map((a) => {
          empty_array.set(a, {
            id: a,
            tasks: [] as Task[],
          })
        })

        return empty_array
      }
    })
  }, [tasks])

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, type } = result
    if (!destination) {
      return
    }

    if (type === "board") {
      const current_data = Array.from(data.entries())
      const [removed] = current_data.splice(source.index, 1)
      current_data.splice(destination.index, 0, removed)

      // convert the array to map
      setData(new Map(current_data))
    }

    if (type === "task") {
      const current_data = Array.from(data)

      const start_board = current_data[Number(source.droppableId)]
      const dest_baord = current_data[Number(destination.droppableId)]

      if (!start_board || !dest_baord) return

      if (
        source.index === destination.index &&
        start_board[0] === dest_baord[0]
      )
        return

      if (start_board[0] === dest_baord[0]) {
        // handle same board movement
        const current_tasks = start_board[1].tasks
        const [removed] = current_tasks.splice(source.index, 1)
        current_tasks.splice(destination.index, 0, removed)

        const current_task_ids = current_tasks.map((task) => task.id)

        setTasks((prev) => [
          ...new Set([
            ...prev.filter((task) => !current_task_ids.includes(task.id)),
            ...current_tasks,
          ]),
        ])
      } else {
        // handle movement to different board
        const current_tasks = start_board[1].tasks
        const updated_tasks = dest_baord[1].tasks
        const [removed] = current_tasks.splice(source.index, 1)
        removed.status = dest_baord[0]
        updated_tasks.splice(destination.index, 0, removed)

        const current_task_ids = [...updated_tasks, ...current_tasks].map(
          (task) => task.id
        )

        setTasks((prev) => [
          ...new Set([
            ...prev.filter((task) => !current_task_ids.includes(task.id)),
            ...current_tasks,
            ...updated_tasks,
          ]),
        ])
      }
    }
  }

  const addTask = (formData: FormProps) => {
    const new_task = {
      id: uuidv4(),
      title: formData.title,
      added_at: new Date(),
      status: formData.status,
      ...(formData.description.length && { description: formData.description }),
    }

    setTasks((prev) => [...prev, new_task])
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      return prev.filter((task) => task.id !== id)
    })
  }

  return (
    <>
      {modal.show ? (
        <NewTaskModal
          status={modal.status}
          closeModal={() =>
            setModal((prev) => ({
              ...prev,
              show: false,
            }))
          }
          addTask={addTask}
        />
      ) : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="root" direction="horizontal" type="board">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-layout-300 gap-4 w-full items-start"
            >
              {Array.from(data.entries()).map(([id, data], index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="rounded-[6px] bg-board flex flex-col"
                    >
                      <h2 className="select-none p-4 text-lg font-bold text-accent">
                        {stautsMapping[data.id].name}
                      </h2>
                      <Droppable droppableId={index.toString()} type="task">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cn(
                              "flex flex-col gap-4 p-4 rounded-md",
                              snapshot.isDraggingOver
                                ? "bg-gradient-to-b from-background-light/20 via-background-light/50 to-background-light/20"
                                : "bg-transparent"
                            )}
                          >
                            {data.tasks.length > 0 ? (
                              data.tasks.map((task, idx) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={idx}
                                >
                                  {(provided) => (
                                    <TaskExcerpt
                                      innerRef={provided.innerRef}
                                      dragHandleProps={provided.dragHandleProps}
                                      draggableProps={provided.draggableProps}
                                      deleteTask={deleteTask}
                                      task={task}
                                    />
                                  )}
                                </Draggable>
                              ))
                            ) : (
                              <span className="text-sm text-secondary select-none">
                                No &apos; {stautsMapping[id].name} &apos; task
                                found
                              </span>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <button
                        onClick={() =>
                          setModal({
                            show: true,
                            status: id,
                          })
                        }
                        className="py-[0.6rem] px-4 rounded-sm text-base flex items-center justify-start gap-2 text-accent hover:bg-accent/10"
                      >
                        <span className="text-xl">&#43;</span> Add Task
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Board
