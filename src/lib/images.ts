/** Serves an image from /public through the Netlify Image CDN at the requested width. */
export function cdn(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=80`
}
