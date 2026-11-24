import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Jumps to the top of the page whenever you navigate to a new page.
 * If the link has a hash (e.g. /#about) it scrolls to that section instead.
 * Back/forward keeps the browser's normal behaviour.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (navType === 'POP') return

    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }

    // 'instant' skips the smooth-scroll set in index.css so it doesn't animate from the middle
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash, navType])

  return null
}
