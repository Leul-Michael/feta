"use client"

import { FormEventHandler, MouseEventHandler, useState } from "react"

import Input from "./input"
import { Close } from "./icons"
import { cn } from "@/lib/utils"

type ModalProps = {
  status: Status
  closeModal: () => void
  addTask: (v: FormProps) => void
}

const NewTaskModal = ({ status, closeModal, addTask }: ModalProps) => {
  const [formData, setFormData] = useState<FormProps>({
    title: "",
    description: "",
    status: status,
  })

  const isActive = (v: string) => {
    return formData.status === v
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!formData.title) return

    addTask(formData)
    setFormData({
      title: "",
      description: "",
      status: status,
    })
    closeModal()
  }

  return (
    <div className="z-[99] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] py-8 px-6 md:px-8 md:py-10 rounded-md bg-gradient-to-b from-background-light via-board to-background-light flex flex-col gap-4 shadow-2xl min-w-[95%] sm:min-w-[450px]">
      <button
        onClick={(e) => {
          e.preventDefault()
          closeModal()
        }}
        className="flex w-[40px] aspect-square rounded-md items-center justify-center self-end hover:bg-accent/10 focus:bg-accent/10"
      >
        <Close className="min-w-[28px] max-w-[28px]" />
      </button>
      <h1 className="select-none p-4 text-lg font-bold text-accent">
        Add New Task
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          value={formData.title}
          id="title"
          placeholder="Your Title"
          onValueChange={(v) => setFormData((prev) => ({ ...prev, title: v }))}
          required
          autoFocus
        />
        <div className="flex items-center justify-between gap-4 border border-accent/20 rounded-md py-4 px-6 flex-wrap">
          <StatusButton
            title="Todo"
            isActive={isActive("todo")}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: "todo",
              }))
            }
          />
          <StatusButton
            title="In Progress"
            isActive={isActive("inprogress")}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: "inprogress",
              }))
            }
          />
          <StatusButton
            title="Done"
            isActive={isActive("done")}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: "done",
              }))
            }
          />
        </div>
        <Input
          value={formData.description}
          id="description"
          placeholder="Description"
          onValueChange={(v) =>
            setFormData((prev) => ({ ...prev, description: v }))
          }
        />
        <button
          type="submit"
          className="py-[0.6rem] px-4 rounded-md text-base flex items-center justify-center gap-2 text-white bg-accent"
        >
          <span className="text-xl">&#43;</span> Add Task
        </button>
      </form>
    </div>
  )
}

export default NewTaskModal

const StatusButton = ({
  title,
  onClick,
  isActive,
}: {
  title: string
  onClick: MouseEventHandler<HTMLButtonElement>
  isActive: boolean
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex justify-center items-center px-4 py-2 rounded-md text-xs text-white",
        isActive
          ? "bg-gradient-to-r from-background via-background/80 to-background"
          : "bg-accent/50"
      )}
    >
      {title}
    </button>
  )
}
