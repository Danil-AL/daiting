import Confetti from './Confetti'

export default function Confirmation({ details, onReset }) {
  if (!details) return null

  return (
    <div className="step-container">
      <Confetti />
      <div className="confirmation-card">
        <div className="big-hearts">💖 💕 💖</div>
        <h1>Свидание назначено! 🎉</h1>
        <div className="date-details">
          <p>📅 <span>{details.date}</span></p>
          <p>⏰ <span>{details.time}</span></p>
          <p>📍 <span>{details.place}</span></p>
        </div>
        <p className="confirmation-message">
          Я уже жду с нетерпением!<br />Это будет незабываемый вечер 💕
        </p>
        <div className="final-hearts">💕 💖 💕 💖 💕</div>
        <button className="btn btn-primary" onClick={onReset}>
          Начать заново 🔄
        </button>
      </div>
    </div>
  )
}
