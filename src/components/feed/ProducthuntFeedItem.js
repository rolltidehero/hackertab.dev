import React from 'react'
import ColoredLanguagesBadge from '../../components/ColoredLanguagesBadge'
import ClickableItem from '../ClickableItem'
import { SiProducthunt } from 'react-icons/si'
import { BsBoxSeam } from 'react-icons/bs'
import BookmarkButton from './elements/BookmarkButton'

function ProducthuntFeedItem({ item }) {
  return (
    <ClickableItem className="item" key={item.id} link={item.url} analyticsSource={'producthunt'}>
      <div className="item-content">
        <h4 className="item-title">
          <BsBoxSeam className={'rowTitleIcon'} />
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
      <div className="item-content-header">
        <BookmarkButton />
        <span className="item-source">
          <SiProducthunt className="icon" color="#D65736" /> Product Hunt
        </span>
      </div>
    </ClickableItem>
  )
}
export default ProducthuntFeedItem
