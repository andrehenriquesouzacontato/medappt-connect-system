
import * as React from "react"

export function useCookies() {
  const getCookie = React.useCallback((name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }, [])

  const setCookie = React.useCallback(
    (name: string, value: string, maxAge: number) => {
      document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
    },
    []
  )

  const deleteCookie = React.useCallback((name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }, [])

  return { getCookie, setCookie, deleteCookie }
}
