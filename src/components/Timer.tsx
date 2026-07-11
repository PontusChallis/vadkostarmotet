interface TimerProps {
  // Timer no longer owns this state itself — it's passed down from
  // App, because the total cost calculation also needs `seconds` and
  // there's no way for two sibling components to share state except
  // by lifting it up to a common parent.
  seconds: number
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
}

function Timer({ seconds, isRunning, onToggle, onReset }: TimerProps) {
  // Derived values: no new state needed, just calculated fresh from
  // `seconds` on every render.
  const hours = Math.floor(seconds / 3600)
  // Minutes left over after removing whole hours (without % 60 this
  // would keep growing past 59, e.g. 61 minutes instead of 1:01).
  const minutes = Math.floor(seconds / 60) % 60
  const remainingSeconds = seconds % 60

  const displayTime =
    seconds < 60
      ? `${seconds}s`
      : seconds < 3600
        ? `${minutes}:${remainingSeconds}`
        : `${hours}:${minutes}:${remainingSeconds}`;

  return (
    <div className="card">
      <p className="label">Tid</p>
      {/* Below 60s, show plain seconds. Once we cross a minute, switch
          to minutes:seconds, no leading zeroes on either part. */}
      <p className="stat">{displayTime}</p>
      {/* Button label swaps based on isRunning, so it always shows
          the action that will happen next */}
      <button onClick={onToggle}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={onReset}>Nollställ</button>
    </div>
  )
}

export default Timer
