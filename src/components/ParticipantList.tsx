import { useState } from 'react'
import type { Participant } from '../types'

interface ParticipantListProps {
  participants: Participant[]
  onDeleteParticipant: (id: string) => void
  onEditParticipant: (participant: Participant) => void
}

function ParticipantList({
  participants,
  onDeleteParticipant,
  onEditParticipant,
}: ParticipantListProps) {
  // Which participant (by id) is currently in edit mode — only one row
  // can be edited at a time, so a single id (or null, meaning "none")
  // is enough to track it.
  const [editingId, setEditingId] = useState<string | null>(null)

  // The in-progress edit values. Same controlled-input pattern as
  // ParticipantForm — kept as strings because that's what the inputs
  // produce — but these only mean anything while editingId is set.
  const [editName, setEditName] = useState('')
  const [editMonthlySalary, setEditMonthlySalary] = useState('')
  const [editQuantity, setEditQuantity] = useState('')

  // Early return: if there are no participants, skip the list entirely
  // and render a different, simpler card instead.
  if (participants.length === 0) {
    return (
      <div className="card">
        <p className="empty-state">Inga deltagare tillagda än</p>
      </div>
    )
  }

  function handleStartEdit(participant: Participant) {
    setEditingId(participant.id)
    setEditName(participant.name)
    setEditMonthlySalary(String(participant.monthlySalary))
    setEditQuantity(String(participant.quantity))
  }

  function handleCancelEdit() {
    setEditingId(null)
  }

  function handleSaveEdit(id: string) {
    onEditParticipant({
      id,
      name: editName,
      monthlySalary: Number(editMonthlySalary),
      quantity: Number(editQuantity),
    })
    setEditingId(null)
  }

  return (
    <ul className="card">
      {/* .map turns each array item into a JSX element. We key on
          participant.id (not the array index) so React can correctly
          track each row even after items are removed from the middle
          of the list. Each row picks between two different layouts
          depending on whether it's the one currently being edited. */}
      {participants.map((participant) =>
        editingId === participant.id ? (
          <li key={participant.id} className="edit-row">
            <input
              type="text"
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
            />
            <input
              type="number"
              value={editMonthlySalary}
              onChange={(event) => setEditMonthlySalary(event.target.value)}
            />
            <input
              type="number"
              min="1"
              value={editQuantity}
              onChange={(event) => setEditQuantity(event.target.value)}
            />
            <button onClick={() => handleSaveEdit(participant.id)}>Spara</button>
            <button onClick={handleCancelEdit}>Avbryt</button>
          </li>
        ) : (
          <li key={participant.id}>
            <span className="participant-info">
              {participant.name}
              {participant.quantity > 1 ? ` x${participant.quantity}` : ''} —{' '}
              {participant.monthlySalary} kr
            </span>
            <button onClick={() => handleStartEdit(participant)}>Redigera</button>
            <button
              className="delete-button"
              onClick={() => onDeleteParticipant(participant.id)}
            >
              Ta bort
            </button>
          </li>
        ),
      )}
    </ul>
  )
}

export default ParticipantList
