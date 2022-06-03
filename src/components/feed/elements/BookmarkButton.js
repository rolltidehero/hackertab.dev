import React from 'react'
import { BiBookmarkPlus } from 'react-icons/bi'

function BookmarkButton() {
  return (
    <button className={`actionButton`} onClick={(e) => alert(e)}>
      <BiBookmarkPlus />
    </button>
  )
}

export default BookmarkButton
