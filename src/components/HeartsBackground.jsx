import { useEffect } from 'react'

const EMOJIS = ['💕', '💖', '❤', '💗', '💝', '💘']

export default function HeartsBackground() {
  useEffect(() => {
    const container = document.createElement('div')
    container.id = 'hearts-container'
    document.body.prepend(container)

    const hearts = []
    for (let i = 0; i < 25; i++) {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      heart.style.left = Math.random() * 100 + '%'
      heart.style.fontSize = (12 + Math.random() * 24) + 'px'
      heart.style.animationDuration = (10 + Math.random() * 15) + 's'
      heart.style.animationDelay = (Math.random() * 15) + 's'
      heart.style.opacity = 0.2 + Math.random() * 0.4
      container.appendChild(heart)
      hearts.push(heart)
    }

    return () => {
      hearts.forEach(h => h.remove())
      container.remove()
    }
  }, [])

  return null
}
