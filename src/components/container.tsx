import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const Container = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex max-w-screen-xl w-full mx-auto md:px-10 px-5",
        className ?? ""
      )}
    >
      {children}
    </div>
  )
}

export default Container
