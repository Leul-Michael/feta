"use client"

import { cn } from "@/lib/utils"
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react"

type InputProps = {
  onValueChange: (v: string) => void
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: InputProps) => {
  const { value, placeholder, id, className, type, onValueChange, ...rest } =
    props
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative flex w-full">
      <label
        className={cn(
          "custom-transition duration-[250ms] absolute -translate-y-[50%] pointer-events-none text-secondary",
          focused || (value && value.toString().length > 0)
            ? "top-[22.5%] left-4 text-[0.7rem]"
            : "top-[50%] left-5 text-xs md:text-sm"
        )}
        htmlFor={id}
      >
        {placeholder}
      </label>
      <input
        type={type ?? "text"}
        name={id}
        className={cn(
          "border border-accent/50 h-[45px] md:h-[55px] w-full bg-white px-4 pt-2 rounded-md text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent",
          className ?? ""
        )}
        placeholder=""
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </div>
  )
}

export default Input
