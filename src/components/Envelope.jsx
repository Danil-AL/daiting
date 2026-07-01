import { useState } from 'react'

export default function Envelope({ onOpen, savedResponse, onViewSaved, onClearResponse }) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (open) return
    setOpen(true)
    setTimeout(onOpen, 700)
  }

  return (
    <div className="step-container">
      {savedResponse && (
        <div className="saved-banner">
          <span>💕 Уже есть приглашение!</span>
          <div className="saved-banner-actions">
            <button className="btn-saved-view" onClick={onViewSaved}>Посмотреть</button>
            <button className="btn-saved-clear" onClick={onClearResponse}>✕</button>
          </div>
        </div>
      )}
      <div className="envelope-wrapper" onClick={handleClick}>
        <div className={`envelope${open ? ' open' : ''}`}>
          <div className="envelope-flap" />
          <div className="envelope-body">
            <div className="icon">💌</div>
            <div className="label">Тебе письмо</div>
          </div>
        </div>
      </div>
      {!savedResponse && <p className="hint">Нажми на конверт, чтобы открыть</p>}
    </div>
  )
}
