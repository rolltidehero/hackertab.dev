import React, { useState, useEffect, useContext, useRef } from 'react'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import feed from '../services/feed'
import InfiniteScroll from 'react-infinite-scroller'
import { MdAccessTime } from 'react-icons/md'
import { format } from 'timeago.js'

function FeedLayout() {
  const [feedItems, setFeedItems] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async (page) => {
    const articles = await feed.getDummyData(page)
    setHasMore(articles.data.data.length > 0)
    setFeedItems((prev) => [...prev, ...articles.data.data])
  }

  return (
    <InfiniteScroll
      pageStart={-1}
      loadMore={(p) => {
        loadMore(p)
      }}
      hasMore={hasMore}
      element="main"
      className="AppContent scrollable feed"
      useWindow={true}>
      {feedItems.map((item, index) => {
        return (
          <div className="item" key={item.id}>
            <div className="item-content">
              <span className="item-source">{item.source_id}</span>
              <h4 className="item-title">{item.title}</h4>
              <div className="item-meta">
                <ColoredLanguagesBadge languages={item.tags.slice(0, 3)} />
                <span className="item-date">
                  <MdAccessTime className="rowTitleIcon" />
                  {format(new Date())}
                </span>
              </div>
            </div>
            <div className="item-image">
              <img src={item.img_src} />
            </div>
          </div>
        )
      })}
    </InfiniteScroll>
  )
}

export default FeedLayout
