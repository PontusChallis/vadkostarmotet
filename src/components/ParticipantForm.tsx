import { useState, type SubmitEvent } from 'react'
import type { Participant } from '../types'

interface ParticipantFormProps {
  // A function passed down from the parent (App) so this form can hand
  // the new participant back up, without needing to know how/where
  // the list of participants is actually stored.
  onAddParticipant: (participant: Participant) => void
}

function ParticipantForm({ onAddParticipant }: ParticipantFormProps) {
  // Both fields are "controlled": their value lives in React state,
  // and the <input>'s value prop always reflects that state back.
  // monthlySalary is kept as a string here because that's what a text
  // input naturally produces — we convert it to a number on submit.
  const [name, setName] = useState('')
  const [monthlySalary, setMonthlySalary] = useState('')
  const [quantity, setQuantity] = useState('1')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Forms reload the page by default on submit — this stops that.
    event.preventDefault()

    const participant: Participant = {
      // crypto.randomUUID() is a browser built-in that generates a
      // unique id — this is what lets us reliably delete the right
      // participant later, instead of relying on their position in the list.
      id: crypto.randomUUID(),
      name,
      monthlySalary: Number(monthlySalary),
      quantity: Number(quantity),
    }

    console.log(participant)
    onAddParticipant(participant)

    // Clear the form for the next entry.
    setName('')
    setMonthlySalary('')
    setQuantity('1')
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>
        Namn eller titel
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Månadslön (kr)
        <input
          type="number"
          value={monthlySalary}
          onChange={(event) => setMonthlySalary(event.target.value)}
        />
      </label>
      <label>
        Antal
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </label>
      <button type="submit">Lägg till deltagare</button>
    </form>
  )
}

export default ParticipantForm
