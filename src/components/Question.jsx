import { useRef, useEffect, useState } from 'react'

const ESCAPE_MESSAGES = [
  'Не надо 😊',
  'Подумай ещё 💭',
  'Ты же хочешь сказать да! 💕',
  'Ну пожалуйста! 🥺',
  'Я не сдаюсь! 💪',
  'Попробуй ещё раз! 😄',
  'Ты меня не поймаешь! 🏃',
  'Давай, скажи да! 💖',
  'Упс, промахнулась! 😅',
]

export default function Question({ onYes }) {
  const btnRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const origRef = useRef(null)
  const countRef = useRef(0)
  const lastMsgRef = useRef(0)
  const rafRef = useRef(null)
  const [messages, setMessages] = useState([])

  function showMsg() {
    const text = ESCAPE_MESSAGES[countRef.current % ESCAPE_MESSAGES.length]
    const id = Date.now()
    setMessages(prev => [...prev, { id, text }])
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== id))
    }, 2000)
    countRef.current++
  }

  function runAway(cx, cy) {
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const btnCx = rect.left + rect.width / 2
    const btnCy = rect.top + rect.height / 2
    const dist = Math.sqrt((cx - btnCx) ** 2 + (cy - btnCy) ** 2)

    if (!origRef.current) {
      origRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
    }

    const o = origRef.current
    const origCx = o.left + o.width / 2
    const origCy = o.top + o.height / 2

    btn.style.position = 'fixed'

    if (dist >= 160) {
      btn.style.left = o.left + 'px'
      btn.style.top = o.top + 'px'
      btn.style.transition = 'left 0.35s ease, top 0.35s ease'
      return
    }

    const angle = Math.atan2(origCy - cy, origCx - cx)
    const radius = 20 + Math.random() * 20
    const targetCx = origCx + Math.cos(angle) * radius
    const targetCy = origCy + Math.sin(angle) * radius

    btn.style.left = (targetCx - o.width / 2) + 'px'
    btn.style.top = (targetCy - o.height / 2) + 'px'
    btn.style.transition = 'left 0.1s ease, top 0.1s ease'

    if (dist < 100 && Date.now() - lastMsgRef.current > 800) {
      showMsg()
      lastMsgRef.current = Date.now()
    }
  }

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    document.addEventListener('mousemove', onMove)

    function loop() {
      runAway(mouseRef.current.x, mouseRef.current.y)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="step-container">
      <div className="question-card">
        <h1 className="question-title">Пойдешь со мной<br />на свидание?</h1>
        <div className="hearts-row">💕 💖 💕</div>
        <div className="buttons-container">
          <button className="btn btn-yes" onClick={onYes}>Да 💕</button>
          <button className="btn btn-no" ref={btnRef}>Нет</button>
        </div>
        <div className="no-messages">
          {messages.map(m => (
            <div key={m.id} className="msg">{m.text}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
