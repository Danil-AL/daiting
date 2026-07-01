import { useState, useEffect } from 'react'
import HeartsBackground from './components/HeartsBackground'
import Envelope from './components/Envelope'
import Letter from './components/Letter'
import Question from './components/Question'
import Details from './components/Details'
import Confirmation from './components/Confirmation'
import './App.css'

const STORAGE_KEY = 'daiting-response'

export default function App() {
  const [step, setStep] = useState('envelope')
  const [resetKey, setResetKey] = useState(0)
  const [confirmedDetails, setConfirmedDetails] = useState(null)
  const [savedResponse, setSavedResponse] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setSavedResponse(JSON.parse(saved))
    } catch {}
  }, [])

  const goTo = (s) => setStep(s)

  const handleConfirm = (details) => {
    const data = { ...details, timestamp: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSavedResponse(data)
    setConfirmedDetails(details)
    goTo('confirmation')
  }

  const handleViewSaved = () => {
    if (!savedResponse) return
    const { timestamp: _, ...details } = savedResponse
    setConfirmedDetails(details)
    goTo('confirmation')
  }

  const handleClearResponse = () => {
    localStorage.removeItem(STORAGE_KEY)
    setSavedResponse(null)
  }

  const handleReset = () => {
    setConfirmedDetails(null)
    setResetKey(k => k + 1)
    goTo('envelope')
  }

  return (
    <>
      <HeartsBackground />
      {step === 'envelope' && (
        <Envelope
          onOpen={() => goTo('letter')}
          savedResponse={savedResponse}
          onViewSaved={handleViewSaved}
          onClearResponse={handleClearResponse}
        />
      )}
      {step === 'letter' && (
        <Letter onNext={() => goTo('question')} />
      )}
      {step === 'question' && (
        <Question key={resetKey} onYes={() => goTo('details')} />
      )}
      {step === 'details' && (
        <Details onConfirm={handleConfirm} />
      )}
      {step === 'confirmation' && (
        <Confirmation details={confirmedDetails} onReset={handleReset} />
      )}
    </>
  )
}
