import type { Participant } from '../types'

interface ParticipantListProps {
  participants: Participant[]
  onDeleteParticipant: (id: string) => void
}

function ParticipantList({ participants, onDeleteParticipant }: ParticipantListProps) {
  // Early return: if there are no participants, skip the list entirely
  // and render a different, simpler card instead.
  if (participants.length === 0) {
    return (
      <div className="card">
        <p className="empty-state">Inga deltagare tillagda än</p>
      </div>
    )
  }

  return (
    <ul className="card">
      {/* .map turns each array item into a JSX element. We key on
          participant.id (not the array index) so React can correctly
          track each row even after items are removed from the middle
          of the list. */}
      {participants.map((participant) => (
        <li key={participant.id}>
          <span className="participant-info">
            {participant.name}
            {participant.quantity > 1 ? ` x${participant.quantity}` : ''} —{' '}
            {participant.monthlySalary} kr
          </span>
          <button
            className="delete-button"
            onClick={() => onDeleteParticipant(participant.id)}
          >
            Ta bort
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ParticipantList
