import React, { useState, useContext, useEffect } from 'react'
import PreferencesContext from '../../../preferences/PreferencesContext'
import { BiBookmarkPlus, BiBookmarkMinus } from 'react-icons/bi'

function BookmarkButton({ item }) {
  const { dispatcher, userBookmarks } = useContext(PreferencesContext)
  const [isBookmarked, setIsBookmarked] = useState(
    userBookmarks.some((bm) => bm.source == item?.source?.id && bm.url == item.link)
  )

  const onBookmarkClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatcher({
      type: isBookmarked ? 'unBookmarkItem' : 'bookmarkItem',
      value: {
        title: item.title,
        url: item.link,
        source: item.source.id,
      },
    })
    const f = {
      title: item.title,
      url: item.link,
      source: item.source.id,
    }

    setIsBookmarked(!isBookmarked)
  }
  useEffect(() => {
    if (userBookmarks && item) {
      setIsBookmarked(
        userBookmarks.some((bm) => bm.source == item.source.id && bm.url == item.link)
      )
    }
  }, [userBookmarks, item])

  return (
    <button className={`actionButton ${isBookmarked ? 'active' : ''}`} onClick={onBookmarkClick}>
      {!isBookmarked ? (
        <>
          <BiBookmarkPlus /> Bookmark{' '}
        </>
      ) : (
        <>
          <BiBookmarkMinus /> unbookmark
        </>
      )}
    </button>
  )
}

export default BookmarkButton
