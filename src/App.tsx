import { useEffect, useState } from 'react'
import Header from './components/Header'
import Timer from './components/Timer'
import ParticipantForm from './components/ParticipantForm'
import ParticipantList from './components/ParticipantList'
import TotalCost from './components/TotalCost'
import EstimateCalculator from './components/EstimateCalculator'
import Footer from './components/Footer'
import type { Participant } from './types'
import './App.css'

export default function App() {
  const [participants, setParticipants] = useState<Participant[]>([])

  // Moved here (from Timer) so both Timer and TotalCost can read the
  // same elapsed-time value — this is "lifting state up" to the
  // nearest common parent of the components that need it.
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Which view is showing: the live, ticking meeting, or a what-if
  // estimate for a meeting that hasn't happened yet.
  const [mode, setMode] = useState<'live' | 'estimate'>('live')

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  function handleToggleTimer() {
    setIsRunning((prev) => !prev)
  }

  function handleToggleMode() {
    setMode((prev) => (prev === 'live' ? 'estimate' : 'live'))
  }

  function handleResetTimer() {
    setIsRunning(false)
    setSeconds(0)
  }

  function handleAddParticipant(participant: Participant) {
    setParticipants((prev) => [...prev, participant])
  }

  function handleDeleteParticipant(id: string) {
    // Keep every participant whose id doesn't match the one being
    // removed — filter() returns a new array, which is what React
    // needs to notice the state changed.
    setParticipants((prev) => prev.filter((participant) => participant.id !== id))
  }

return (
<div className="app">
    <Header />

    <div className="card">
      <p className="label">
        Växlar mellan taxameter och beräkna kostnaden i förväg
      </p>
      <button onClick={handleToggleMode}>
        {mode === 'live' ? 'Beräkna i förväg' : 'Visa pågående möte'}
      </button>
    </div>

    {/* A fragment (<>...</>) groups Timer and TotalCost as one JSX
        expression without adding an extra <div> to the page — it exists
        only so the ternary below has a single value to return for the
        "live" branch. */}
    {mode === 'live' ? (
      <>
        <Timer
          seconds={seconds}
          isRunning={isRunning}
          onToggle={handleToggleTimer}
          onReset={handleResetTimer}
        />
        <TotalCost participants={participants} seconds={seconds} />
      </>
    ) : (
      <EstimateCalculator participants={participants} />
    )}

    <ParticipantForm onAddParticipant={handleAddParticipant} />
    <ParticipantList
      participants={participants}
      onDeleteParticipant={handleDeleteParticipant}
    />
    <Footer />
</div>
  );
}



