import React, { useState, useContext, useEffect } from 'react'
import ColoredLanguagesBadge from '../../components/ColoredLanguagesBadge'
import ClickableItem from '../ClickableItem'
import DateElement from './elements/DateElement'
import BookmarkButton from './elements/BookmarkButton'

function ArticleFeedItem({ item }) {
  return (
    <ClickableItem className="item" key={item.id} link={item.link} analyticsSource={item.source_id}>
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
      <div className="item-content-header">
        <BookmarkButton />
        <span className="item-source">{item.source.name}</span>
      </div>
    </ClickableItem>
  )
}
export default ArticleFeedItem
