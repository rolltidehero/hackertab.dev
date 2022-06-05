import React, { useState, useContext, useEffect } from 'react'
import ColoredLanguagesBadge from '../../components/ColoredLanguagesBadge'
import ClickableItem from '../ClickableItem'
import DateElement from './elements/DateElement'
import BookmarkButton from './elements/BookmarkButton'
import { FaDev } from 'react-icons/fa'
import HashNodeIcon from '../../static/icon_hashnode.png'

function ArticleFeedItem({ item }) {
  const displaySource = (source) => {
    switch (source.id) {
      case 'devto':
        return (
          <>
            <FaDev className="icon blockHeaderWhite" /> {source.name}
          </>
        )
      case 'hashnode':
        return (
          <>
            <img src={HashNodeIcon} className="icon" style={{ width: '12px', height: '12px' }} />{' '}
            {source.name}
          </>
        )
      default:
        return source.name
    }
  }

  return (
    <div className={`item ${item.source.id}`}>
      <ClickableItem key={item.id} link={item.link} analyticsSource={item.source_id}>
        <div className="item-content">
          <h4 className="item-title">{item.title}</h4>
          <div className="item-meta">
            <span className="item-date">
              <ColoredLanguagesBadge languages={item.tags} />
            </span>
            <DateElement date={item.pub_date} />
          </div>
        </div>
        <div className="item-image">
          <img src={item.img_src} />
        </div>
      </ClickableItem>

      <div className="item-content-footer">
        <BookmarkButton item={item} />
        <span className="item-source">{displaySource(item.source)}</span>
      </div>
    </div>
  )
}
export default ArticleFeedItem
