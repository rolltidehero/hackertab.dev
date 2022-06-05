import React, { useState, useContext, useEffect } from 'react'
import ColoredLanguagesBadge from '../../components/ColoredLanguagesBadge'
import ClickableItem from '../ClickableItem'
import BookmarkButton from './elements/BookmarkButton'
import { SiGithub } from 'react-icons/si'
import { VscRepo, VscRepoForked, VscStarFull } from 'react-icons/vsc'

function GithubFeedItem({ item }) {
  return (
    <ClickableItem
      className="item github"
      key={item.id}
      link={item.link}
      analyticsSource={'github'}>
      <div className="item-content">
        <h4 className="item-title">
          <VscRepo className={'rowTitleIcon'} />
          {item.owner && `${item?.owner}/`}
          {item.name} — <span className="item-description">{item.description}</span>
        </h4>
        <div className="item-meta">
          <span className="item-date">
            <ColoredLanguagesBadge languages={[item.language]} />
          </span>
          {item.stars && (
            <span className="item-date">
              <VscStarFull /> {item.stars} stars
            </span>
          )}
          {item.forks && (
            <span className="item-date">
              <VscRepoForked /> {item.forks} forks
            </span>
          )}
        </div>
      </div>
      <div className="item-image">
        <img src={item.img_src} />
      </div>
      <div className="item-content-footer">
        <BookmarkButton />
        <span className="item-source">
          <SiGithub className="icon blockHeaderWhite" /> Github
        </span>
      </div>
    </ClickableItem>
  )
}
export default GithubFeedItem
