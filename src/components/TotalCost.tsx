import { useState } from 'react'
import type { Participant } from '../types'
import { calculateTotalCost } from '../utils/cost'

interface TotalCostProps {
  participants: Participant[]
  seconds: number
}

function TotalCost({ participants, seconds }: TotalCostProps) {
  // Local state — only this component needs to know whether social
  // fees are included, so it doesn't need to live up in App.
  const [includeSocialFees, setIncludeSocialFees] = useState(false)

  const totalCost = calculateTotalCost(participants, seconds, includeSocialFees)

  function handleToggleSocialFees() {
    setIncludeSocialFees((prev) => !prev)
  }

  return (
    <div className="card">
      {/* toFixed(2) formats to 2 decimal places, e.g. 12.5 -> "12.50" */}
      <p className="label">Kostnad</p>
      <p className="stat">{totalCost.toFixed(2)} kr</p>
      <button onClick={handleToggleSocialFees}>
        {includeSocialFees ? 'Ta bort arbetsgivaravgift' : 'Lägg till arbetsgivaravgift'}
      </button>
    </div>
  )
}

export default TotalCost
