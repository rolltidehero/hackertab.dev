import React, { useState, useContext, useEffect } from 'react'
import ColoredLanguagesBadge from '../../components/ColoredLanguagesBadge'
import ClickableItem from '../ClickableItem'
import BookmarkButton from './elements/BookmarkButton'
import { SiGithub } from 'react-icons/si'

function GithubFeedItem({ item }) {
  return (
    <ClickableItem className="item" key={item.id} link={item.link} analyticsSource={'github'}>
      <div className="item-content">
        <h4 className="item-title">
          {item.name} — <span className="item-description">{item.description}</span>
        </h4>
        <div className="item-meta">
          <span className="item-date">
            <ColoredLanguagesBadge languages={[item.language]} />
          </span>
        </div>
      </div>
      <div className="item-image">
        <img src={item.img_src} />
      </div>
      <div className="item-content-header">
        <BookmarkButton />
        <span className="item-source">
          <SiGithub className="icon blockHeaderWhite" /> Github
        </span>
      </div>
    </ClickableItem>
  )
}
export default GithubFeedItem
