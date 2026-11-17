export function getYouTubeEmbedUrl(value) {
  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^www\./, '')
    let id = ''
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || ''
    else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      id = url.pathname === '/watch'
        ? url.searchParams.get('v') || ''
        : url.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1] || ''
    }
    return /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : ''
  } catch { return '' }
}
