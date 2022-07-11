import React, { useContext, useState, useEffect } from 'react'
import { format } from 'timeago.js'
import { VscTriangleUp } from 'react-icons/vsc'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import feed from '../services/feed'
import { MdAccessTime } from 'react-icons/md'
import CardLink from '../components/CardLink'
import CardItemWithActions from '../components/CardItemWithActions'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import PreferencesContext from '../preferences/PreferencesContext'

const ArticleItem = ({ item, index, analyticsTag }) => {
  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'hackernews'}
      index={index}
      item={item}
      key={index}
      cardItem={
        <>
          <p className="rowTitle">
            <CardLink link={item.link} analyticsSource={analyticsTag}>
              {listingMode === 'compact' && (
                <span className="counterWrapper">
                  <VscTriangleUp />
                  <span className="value">{item.score}</span>
                </span>
              )}

              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem source">
                <img className="icon" src={item.source.icon} />
                {item.source.name}
              </span>

              <span className="rowItem" title={new Date(item.pub_date).toUTCString()}>
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.pub_date))}
              </span>
              <ColoredLanguagesBadge languages={item.tags} />
            </div>
          )}
        </>
      }
    />
  )
}

function ArticlesCard({ analyticsTag, label, icon, withAds }) {
  const { userSelectedTags = [] } = useContext(PreferencesContext)
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const fetchStories = async () => {
    const tags = userSelectedTags.map((v) => v.value).join(',')
    console.log(tags)
    const data = await feed.getFeed(tags)
    return data.data.data
  }

  const renderItem = (item, index) => (
    <ArticleItem item={item} key={`st-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent icon={<span className="blockHeaderIcon">{icon}</span>} title={label}>
      <ListComponent fetchData={fetchStories} renderItem={renderItem} withAds={withAds} />
    </CardComponent>
  )
}

export default ArticlesCard
