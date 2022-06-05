import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getBaseApi } from '../../utils/DataUtils'

function PlaceholderAdFeedItem() {
  return (
    <div className="item placeholder">
      <span className="line" />
      <span className="line small" />
      <span className="ad-media" />
      <span className="source" />
    </div>
  )
}

function AdFeedItem() {
  const [ad, setAd] = useState()

  useEffect(() => {
    const setup = async () => {
      const userAgent = new URLSearchParams(navigator.userAgent).toString()
      const request = await axios.get(`${getBaseApi('')}/monetization/?useragent=${userAgent}`)
      if (request.data) {
        setAd(request.data.ads[0])
      }
    }
    setup()
  }, [])

  const prependHTTP = (url) => {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'https://' + url
    }
    return url
  }

  return ad ? (
    <a
      className="item"
      href={prependHTTP(ad.statlink)}
      target="_blank"
      rel="noopener sponsored"
      title={ad.company + ' ' + ad.companyTagline}>
      <div className="item-content">
        <h4 className="item-title">{ad.description}</h4>
      </div>
      <div className="item-ad-image">
        <img src={ad.smallImage} style={{ background: ad.backgroundColor }} />
      </div>
      <div className="item-content-footer">
        <span className="item-source">by CarbonAds</span>
      </div>
    </a>
  ) : (
    <PlaceholderAdFeedItem />
  )
}
export { AdFeedItem, PlaceholderAdFeedItem }
