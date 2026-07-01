export default function Letter({ onNext }) {
  return (
    <div className="step-container">
      <div className="letter">
        <span className="salutation">Привет...</span>
        <p>Я знаю, мы знакомы всего пару дней, но я уже понял, что ты особенная.</p>
        <p>Мне кажется, нам стоит узнать друг друга получше. За чашкой кофе, за разговором ни о чём и обо всём сразу.</p>
        <p>Никаких грандиозных планов — просто приятный вечер в хорошей компании.</p>
        <p className="signature">Ты как на это смотришь? 💕</p>
        <button className="btn btn-primary" onClick={onNext}>Далее →</button>
      </div>
    </div>
  )
}
