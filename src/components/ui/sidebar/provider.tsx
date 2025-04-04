
import * as React from "react"
import { useCookies } from "@/hooks/use-cookies"
import { useMediaQuery } from "@/hooks/use-media-query"

import { SidebarContext } from "./context"

export const SIDEBAR_WIDTH = "250px"
export const SIDEBAR_WIDTH_ICON = "60px"
export const SIDEBAR_WIDTH_MOBILE = "100%"
export const SIDEBAR_COOKIE_NAME = "sidebar:state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export function SidebarProvider({
  children,
  defaultState = "expanded",
  defaultOpen = true,
  defaultCollapsible = "offcanvas",
  defaultSide = "left",
  defaultVariant = "sidebar",
}: {
  children: React.ReactNode
  defaultState?: "expanded" | "collapsed"
  defaultOpen?: boolean
  defaultCollapsible?: "offcanvas" | "icon" | "none"
  defaultSide?: "left" | "right"
  defaultVariant?: "sidebar" | "floating" | "inset"
}) {
  const { getCookie, setCookie } = useCookies()
  const [previousSidebarState, setPreviousSidebarState] = React.useState(
    defaultState
  )
  
  const [state, setState] = React.useState<"expanded" | "collapsed">(
    getCookie(SIDEBAR_COOKIE_NAME) === "collapsed" ? "collapsed" : defaultState
  )
  
  const [openMobile, setOpenMobile] = React.useState(defaultOpen)
  const [open, setOpen] = React.useState(defaultOpen)
  const isMobile = useMediaQuery("(max-width: 768px)")

  React.useEffect(() => {
    if (!isMobile && state === "collapsed") {
      document.documentElement.style.setProperty(
        "--sidebar-width",
        SIDEBAR_WIDTH
      )
      document.documentElement.style.setProperty(
        "--sidebar-width-icon",
        SIDEBAR_WIDTH_ICON
      )
    } else if (!isMobile && state === "expanded") {
      document.documentElement.style.setProperty(
        "--sidebar-width",
        SIDEBAR_WIDTH
      )
      document.documentElement.style.setProperty(
        "--sidebar-width-icon",
        SIDEBAR_WIDTH_ICON
      )
    } else {
      document.documentElement.style.setProperty(
        "--sidebar-width",
        SIDEBAR_WIDTH_MOBILE
      )
    }
  }, [state, isMobile])

  // Toggle sidebar state when pressing the keyboard shortcut.
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // If it's the keyboard shortcut, toggle the sidebar.
      if (
        e.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey
      ) {
        e.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [state])

  // Fix the layout when the page height is too short for mobile.
  React.useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      )
    }

    const setHeightOnResize = () => {
      if (isMobile) {
        setHeight()
      }
    }

    setHeightOnResize()
    window.addEventListener("resize", setHeightOnResize)
    return () => window.removeEventListener("resize", setHeightOnResize)
  }, [isMobile])

  // Toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    const newState = state === "expanded" ? "collapsed" : "expanded"
    setState(newState)
    setCookie(SIDEBAR_COOKIE_NAME, newState, SIDEBAR_COOKIE_MAX_AGE)
  }, [state, setCookie])

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      <div
        data-state={state}
        data-collapsible={defaultCollapsible}
        data-side={defaultSide}
        data-variant={defaultVariant}
        style={
          {
            "--sidebar-width": isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties
        }
        className="relative flex min-h-screen max-w-full items-stretch"
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
