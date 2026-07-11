import type { Participant } from '../types'

// Assumption: a full-time work month is ~173 hours (roughly 40h/week).
const WORK_HOURS_PER_MONTH = 173

// "Sociala avgifter" (Swedish employer's social security contribution) —
// on top of gross salary, the employer pays this much extra.
const SOCIAL_FEES_MULTIPLIER = 1.3142

function costPerSecond(monthlySalary: number): number {
  return monthlySalary / WORK_HOURS_PER_MONTH / 3600
}

export function calculateTotalCost(
  participants: Participant[],
  seconds: number,
  includeSocialFees: boolean,
): number {
  const totalCostPerSecond = participants.reduce(
    (total, participant) =>
      total + costPerSecond(participant.monthlySalary) * participant.quantity,
    0,
  )

  const totalCost = totalCostPerSecond * seconds

  return includeSocialFees ? totalCost * SOCIAL_FEES_MULTIPLIER : totalCost
}
