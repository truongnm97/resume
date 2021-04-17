import React from 'react'

const Icon = ({ onClose, onMinimize, onExpand, ...props }) => {
  return (
    <svg width={48} height={12} fill='none' viewBox='0 0 48 12' {...props}>
      <circle cx={6} cy={6} r={6} fill='#ED6A5E' style={{ cursor: 'pointer' }} onClick={onClose} />
      <circle
        cx={24}
        cy={6}
        r={6}
        fill='#F6BF50'
        style={{ cursor: 'pointer' }}
        onClick={onMinimize}
      />
      <circle
        cx={42}
        cy={6}
        r={6}
        fill='#62C554'
        style={{ cursor: 'pointer' }}
        onClick={onExpand}
      />
    </svg>
  )
}

export default Icon
