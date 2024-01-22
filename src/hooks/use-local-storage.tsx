"use client"

import { useEffect, useState } from "react"

function getLocalValue<T>(key: string, initialValue: T | (() => T)) {
  if (typeof window === "undefined") return initialValue

  const jsonValue = localStorage.getItem(key)

  if (jsonValue != null) return JSON.parse(jsonValue)

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    return getLocalValue<T>(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}
