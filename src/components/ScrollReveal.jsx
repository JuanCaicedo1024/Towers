import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    const elements = document.querySelectorAll('main section, main > div, footer')

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('scroll-reveal--visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    elements.forEach((element) => {
      element.classList.add('scroll-reveal')
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  return null
}

export default ScrollReveal
