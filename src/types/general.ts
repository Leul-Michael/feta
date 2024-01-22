type Status = "todo" | "inprogress" | "done"

type Board = {
  list: Map<Status, Data>
}

type Data = {
  id: Status
  tasks: Task[]
}

type Task = {
  id: string
  title: string
  description?: string
  status: Status
  added_at: Date
}

type FormProps = {
  title: string
  description: string
  status: Status
}
