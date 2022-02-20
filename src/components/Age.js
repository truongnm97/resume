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

  const pluralize = (number, type) =>
    number ? `${number === 1 ? 'a' : number} ${type}${number !== 1 ? 's' : ''}` : ''

  const ageMs = now - time
  const ageDate = new Date(ageMs)
  const years = ageDate.getUTCFullYear() - 1970
  const months = ageDate.getUTCMonth()
  const days = ageDate.getUTCDate()
  const hours = ageDate.getUTCHours()
  const minutes = ageDate.getUTCMinutes()
  const seconds = ageDate.getUTCSeconds()

  const timeArray = [
    pluralize(years, 'year'),
    pluralize(months, 'month'),
    pluralize(days, 'day'),
    pluralize(hours, 'hour'),
    pluralize(minutes, 'minute'),
    pluralize(seconds, 'second'),
  ].filter(Boolean)

  return <span>{`I'm ${timeArray.join(', ')} old`}</span>
}

export default Age
