import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = document.createElement('div')
    dot.className = 'wursa-cursor'
    document.body.appendChild(dot)

    let rafId: number | null = null
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }
    let scale = 1

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const setActive = (active: boolean) => {
      scale = active ? 1.8 : 1
      dot.classList.toggle('wursa-cursor--active', active)
    }

    const handleHover = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer',
      )
      setActive(!!el)
    }

    const render = () => {
      const speed = 0.18
      pos.x += (target.x - pos.x) * speed
      pos.y += (target.y - pos.y) * speed
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`
      rafId = window.requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', handleHover)
    rafId = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', handleHover)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      dot.remove()
    }
  }, [])

  return null
}

