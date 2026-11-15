import { createContext, useContext, useEffect, useState } from 'react'
import { defaultHomeContent } from '../data/homeContent'
import { getHomeContent } from '../lib/supabase'

const HomeContentContext = createContext(defaultHomeContent)

export function HomeContentProvider({ children }) {
  const [content, setContent] = useState(defaultHomeContent)
  useEffect(() => {
    let active = true
    const refresh = () => getHomeContent()
      .then((value) => {
        if (!active || !value) return
        setContent({
          ...defaultHomeContent,
          ...value,
          hero: { ...defaultHomeContent.hero, ...(value.hero || {}) },
          faqs: Array.isArray(value.faqs) ? value.faqs : defaultHomeContent.faqs,
          communitySlides: Array.isArray(value.communitySlides)
            ? value.communitySlides
            : Array.isArray(value.testimonials) && value.testimonials.length
              ? value.testimonials.map((item, index) => ({
                id: item.id || `legacy-slide-${index}`,
                image: item.image || item.photo || '',
                title: item.title || item.name || '',
                description: item.description || item.comment || '',
              }))
              : defaultHomeContent.communitySlides,
        })
      })
      .catch((error) => { if (active) console.error('No se pudo cargar el contenido de la portada desde Supabase.', error) })
    refresh()
    window.addEventListener('focus', refresh)
    const refreshTimer = window.setInterval(refresh, 15000)
    return () => { active = false; window.removeEventListener('focus', refresh); window.clearInterval(refreshTimer) }
  }, [])
  return <HomeContentContext.Provider value={content}>{children}</HomeContentContext.Provider>
}

export function useHomeContent() { return useContext(HomeContentContext) }
