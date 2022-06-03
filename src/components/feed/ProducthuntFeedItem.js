import React from 'react'
import ColoredLanguagesBadge from '../../components/ColoredLanguagesBadge'
import ClickableItem from '../ClickableItem'
import DateElement from './elements/DateElement'
import BookmarkButton from './elements/BookmarkButton'

function ProducthuntFeedItem({ item }) {
  return (
    <ClickableItem className="item" key={item.id} link={item.url} analyticsSource={'producthunt'}>
      <div className="item-content">
        <div className="item-content-header">
          <BookmarkButton />
          <span className="item-source">Product Hunt</span>
        </div>
        <h4 className="item-title">
          {item.name} — <span className="item-description">{item.tagline}</span>
        </h4>
        <div className="item-meta">
          <span className="item-date">
            <ColoredLanguagesBadge languages={item.topics} />
          </span>
        </div>
      </div>
      <div className="item-image">
        <img src={item.img_src} />
      </div>
    </ClickableItem>
  )
}
export default ProducthuntFeedItem
