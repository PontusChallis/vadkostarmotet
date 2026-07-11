import { useEffect, useState } from 'react'
import Header from './components/Header'
import Timer from './components/Timer'
import ParticipantForm from './components/ParticipantForm'
import ParticipantList from './components/ParticipantList'
import TotalCost from './components/TotalCost'
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
    <Timer
      seconds={seconds}
      isRunning={isRunning}
      onToggle={handleToggleTimer}
      onReset={handleResetTimer}
    />
    <TotalCost participants={participants} seconds={seconds} />
    <ParticipantForm onAddParticipant={handleAddParticipant} />
    <ParticipantList
      participants={participants}
      onDeleteParticipant={handleDeleteParticipant}
    />
    <Footer />
</div>
  );
}



