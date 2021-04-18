import React, { useEffect, useState } from 'react'

const Age = ({ time }) => {
  const [now, setNow] = useState(new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().getTime())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const ageMs = now - time
  const ageDate = new Date(ageMs)
  const years = ageDate.getUTCFullYear() - 1970
  const months = ageDate.getUTCMonth()
  const days = ageDate.getUTCDate()
  const hours = ageDate.getUTCHours()
  const minutes = ageDate.getUTCMinutes()
  const seconds = ageDate.getUTCSeconds()
  return (
    <span>{`I'm ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds old`}</span>
  )
}

export default Age
