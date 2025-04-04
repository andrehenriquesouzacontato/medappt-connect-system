
import * as React from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window === "undefined") {
      return;
    }
    
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Define the event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener safely
    mediaQuery.addEventListener("change", handleChange)
    
    // Clean up
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [query])

  return matches
}
