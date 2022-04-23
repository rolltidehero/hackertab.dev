import React, { useState, useEffect, useContext, useRef } from 'react'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import feed from '../services/feed'

function FeedLayout() {
  const [feedItems, setFeedItems] = useState([])

  useEffect(() => {
    const setup = async () => {
      const articles = await feed.getDummyData()
      setFeedItems(articles.data.data)
    }
    setup()
  }, [])
  return (
    <main className="AppContent scrollable feed">
      {feedItems.map((item, index) => {
        return (
          <div className="item" key={index}>
            <div className="item-image">
              <img src={item.img_src} />
            </div>
            <div className="item-content">
              <h4 className="item-title">{item.title}</h4>
              <ColoredLanguagesBadge languages={item.tags.slice(0, 3)} />
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default FeedLayout
