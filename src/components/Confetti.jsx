import { useEffect } from 'react'

const COLORS = ['#e91e63', '#ff6b9d', '#ffd54f', '#9c27b0', '#ff4081', '#7c4dff', '#ffab40', '#f50057']
const SHAPES = ['■', '●', '▲', '★', '♦']

export default function Confetti() {
  useEffect(() => {
    const container = document.createElement('div')
    container.id = 'confetti-container'
    document.body.appendChild(container)

    const pieces = []
    for (let i = 0; i < 120; i++) {
      const piece = document.createElement('div')
      piece.className = 'confetti-piece'
      piece.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      piece.style.left = Math.random() * 100 + '%'
      piece.style.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      piece.style.fontSize = (8 + Math.random() * 14) + 'px'
      piece.style.animationDuration = (2 + Math.random() * 3) + 's'
      piece.style.animationDelay = (Math.random() * 2) + 's'
      piece.style.opacity = 0.8 + Math.random() * 0.2
      container.appendChild(piece)
      pieces.push(piece)
    }

    const timer = setTimeout(() => {
      pieces.forEach(p => p.remove())
      container.remove()
    }, 6000)

    return () => {
      clearTimeout(timer)
      pieces.forEach(p => p.remove())
      container.remove()
    }
  }, [])

  return null
}
