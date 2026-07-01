import { useState } from 'react'

const PLACES = [
  { value: '🍽️ Уютный ресторан', label: '🍽️ Ресторан' },
  { value: '☕ Небольшое кафе', label: '☕ Кафе' },
  { value: '🌳 Прогулка в парке', label: '🌳 Парк' },
  { value: '🎬 Кинотеатр', label: '🎬 Кино' },
  { value: '✨ Свой вариант', label: '✨ Свой вариант' },
]

const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

export default function Details({ onConfirm }) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const minDate = today.toISOString().split('T')[0]
  const [date, setDate] = useState(tomorrow.toISOString().split('T')[0])
  const [time, setTime] = useState('18:00')
  const [place, setPlace] = useState(null)
  const [customPlace, setCustomPlace] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  const handleSelectPlace = (value) => {
    if (value === '✨ Свой вариант') {
      setShowCustom(true)
      setPlace(null)
    } else {
      setShowCustom(false)
      setPlace(value)
    }
  }

  const handleConfirm = () => {
    if (!date) { alert('Выбери дату 💕'); return }
    if (!time) { alert('Выбери время 💕'); return }

    const finalPlace = place || (customPlace.trim() ? '✨ ' + customPlace.trim() : null)
    if (!finalPlace) { alert('Выбери место 💕'); return }

    const d = new Date(date + 'T' + time)
    const dateStr = d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear()

    onConfirm({ date: dateStr, time, place: finalPlace })
  }

  return (
    <div className="step-container">
      <div className="details-card">
        <h2>Выбери детали нашего свидания 💕</h2>

        <div className="form-group">
          <label>📅 Дата</label>
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>⏰ Время</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>📍 Место</label>
          <div className="place-options">
            {PLACES.map(p => (
              <div
                key={p.value}
                className={`place-option${place === p.value ? ' selected' : ''}`}
                onClick={() => handleSelectPlace(p.value)}
              >
                {p.label}
              </div>
            ))}
          </div>
          {showCustom && (
            <input
              type="text"
              placeholder="Напиши свой вариант..."
              value={customPlace}
              onChange={e => setCustomPlace(e.target.value)}
              style={{ marginTop: 10 }}
            />
          )}
        </div>

        <button className="btn btn-primary" onClick={handleConfirm}>
          Подтвердить 💕
        </button>
      </div>
    </div>
  )
}
