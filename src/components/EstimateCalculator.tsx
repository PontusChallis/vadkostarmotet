import { useState } from 'react'
import type { Participant } from '../types'
import { calculateTotalCost } from '../utils/cost'

interface EstimateCalculatorProps {
  participants: Participant[]
}

function EstimateCalculator({ participants }: EstimateCalculatorProps) {
  // Controlled input, kept as a string just like ParticipantForm's
  // fields — that's what a text/number input naturally produces, and
  // we convert it to a number only where we need to calculate with it.
  const [durationMinutes, setDurationMinutes] = useState('30')

  // Its own toggle, independent from TotalCost's — flipping this one
  // doesn't affect the live meeting view, and vice versa.
  const [includeSocialFees, setIncludeSocialFees] = useState(false)

  // No submit button here: unlike ParticipantForm, there's nothing to
  // "add", so the cost is just recalculated fresh on every render as
  // the user types.
  const seconds = Number(durationMinutes) * 60
  const totalCost = calculateTotalCost(participants, seconds, includeSocialFees)

  function handleToggleSocialFees() {
    setIncludeSocialFees((prev) => !prev)
  }

  return (
    <div className="card">
      <label>
        Mötets längd (minuter)
        <input
          type="number"
          min="0"
          value={durationMinutes}
          onChange={(event) => setDurationMinutes(event.target.value)}
        />
      </label>
      <p className="label">Beräknad kostnad</p>
      <p className="stat">{totalCost.toFixed(2)} kr</p>
      <button onClick={handleToggleSocialFees}>
        {includeSocialFees ? 'Ta bort arbetsgivaravgift' : 'Lägg till arbetsgivaravgift'}
      </button>
    </div>
  )
}

export default EstimateCalculator
