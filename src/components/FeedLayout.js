import React, { useState, useContext, useEffect } from 'react'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import feed from '../services/feed'
import InfiniteScroll from 'react-infinite-scroller'
import PreferencesContext from '../preferences/PreferencesContext'
import ArticleFeedItem from './feed/ArticleFeedItem'
import GithubFeedItem from './feed/GithubFeedItem'
import ProducthuntFeedItem from './feed/ProducthuntFeedItem'
import { AdFeedItem, PlaceholderAdFeedItem } from './feed/AdFeedItem'
import './feed/feed.scss'

function FeedLayout() {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags } = preferences
  const [feedItems, setFeedItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [promisesValues, setPromisesValues] = useState([])

  useEffect(() => {
    const fetchInitialFeed = async () => {
      const tags = userSelectedTags.map((v) => v.value).join(',')
      const feedItemsPromises = [
        feed.getFeed(tags),
        feed.getGithubFeed(tags),
        feed.getProducthuntFeed(),
      ]

      let promisesRequests = await Promise.allSettled(feedItemsPromises)
      let promisesValues = []
      promisesRequests.map((res) => {
        console.log(res)
        let value = res.value
        if (res.status === 'rejected') {
          return {}
        }

        let url = value.config.url
        if (url.includes('producthunt')) {
          return (promisesValues['producthunt'] = value.data)
        } else if (url.includes('github')) {
          return (promisesValues['github'] = value.data)
        } else {
          return (promisesValues['articles'] = value.data.data)
        }
      })

      setPromisesValues(promisesValues)
      constructFeed(promisesValues)
    }
    fetchInitialFeed()
  }, [userSelectedTags])

  // To be refactored
  const constructFeed = (feedValues) => {
    let items = [...feedValues.articles]
    items.splice(0, 0, { type: 'ad' })

    if (feedValues.github && feedValues.github.length > 0) {
      const githubItem = feedValues.github[0]
      githubItem.type = 'github'
      items.splice(5, 0, githubItem)
      feedValues.github.splice(0, 1)
    }

    if (feedValues.producthunt) {
      const producthuntItem = feedValues.producthunt[0]
      producthuntItem.type = 'producthunt'
      items.splice(10, 0, feedValues.producthunt[0])
      feedValues.producthunt.splice(0, 1)
    }

    console.log('New feed', items)
    setFeedItems(items)

    promisesValues.github = feedValues.github
    promisesValues.producthunt = feedValues.producthunt
    setPromisesValues(promisesValues)
  }
  // To be refactored
  const loadMore = async (page) => {
    const articles = await feed.getFeed(userSelectedTags.map((v) => v.value).join(','), page)
    setHasMore(articles.data.data.length > 0)

    let newItems = [...articles.data.data]
    newItems.splice(3, 0, { type: 'ad' })

    if (promisesValues) {
      if (promisesValues.github && promisesValues.github.length > 0) {
        const githubItem = promisesValues.github[0]
        githubItem.type = 'github'
        newItems.splice(5, 0, githubItem)
        promisesValues.github.splice(0, 1)
      }

      if (promisesValues.producthunt) {
        const producthuntItem = promisesValues.producthunt[0]
        producthuntItem.type = 'producthunt'
        newItems.splice(9, 0, producthuntItem)
        promisesValues.producthunt.splice(0, 1)
      }

      setPromisesValues(promisesValues)
    }

    setFeedItems((prev) => [...prev, ...newItems])
  }

  return (
    <InfiniteScroll
      pageStart={-1}
      initialLoad={true}
      loadMore={(p) => {
        loadMore(p)
      }}
      hasMore={hasMore}
      element="main"
      className="AppContent feed"
      useWindow={true}>
      {feedItems.map((item, index) => {
        return item.type ? (
          item.type === 'ad' ? (
            <AdFeedItem />
          ) : item.type === 'github' ? (
            <GithubFeedItem item={item} />
          ) : item.type === 'producthunt' ? (
            <ProducthuntFeedItem item={item} />
          ) : (
            <div>Unsupported type</div>
          )
        ) : (
          <ArticleFeedItem item={item} />
        )
      })}
    </InfiniteScroll>
  )
}

export default FeedLayout
