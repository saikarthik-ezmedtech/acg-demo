import '@testing-library/jest-dom/vitest'
import { beforeEach, vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const React = await import('react')
  const passthrough = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) =>
    React.createElement('div', { ref, ...props }, children),
  )
  const motionProxy = new Proxy(
    {},
    {
      get: () => passthrough,
    },
  )

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: motionProxy,
    useScroll: () => ({
      scrollYProgress: {
        on: vi.fn(),
        get: () => 0,
      },
    }),
    useTransform: () => ({ on: vi.fn(), get: () => 0 }),
    useMotionValueEvent: vi.fn(),
  }
})

vi.mock('lenis', () => ({
  default: class Lenis {
    scrollTo = vi.fn()
    raf = vi.fn()
    destroy = vi.fn()

    constructor() {
      const instances = ((globalThis as { __lenisInstances?: unknown[] }).__lenisInstances ??= [])
      instances.push(this)
    }
  },
}))

beforeEach(() => {
  window.localStorage.clear()
  document.body.innerHTML = ''
  document.documentElement.className = ''
  document.documentElement.style.cssText = ''
  document.body.style.cssText = ''
  window.scrollTo = vi.fn()
  window.requestAnimationFrame = vi.fn(() => 1) as typeof window.requestAnimationFrame
  window.cancelAnimationFrame = vi.fn()
  ;(globalThis as { __lenisInstances?: unknown[] }).__lenisInstances = []
})

class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

// @ts-expect-error test env shim
global.IntersectionObserver = MockIntersectionObserver
