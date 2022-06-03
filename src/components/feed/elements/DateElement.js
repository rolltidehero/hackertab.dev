import React from 'react'
import { MdAccessTime } from 'react-icons/md'

function DateElement({ date }) {
  return (
    <span className="item-date">
      <MdAccessTime className="rowTitleIcon" />
      {new Date(date).toDateString().replace(/^\S+\s/, '')}
    </span>
  )
}

export default DateElement
