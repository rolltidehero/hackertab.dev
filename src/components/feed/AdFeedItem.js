import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getBaseApi } from '../../utils/DataUtils'

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
        <div className="item-content-header">
          <span className="item-source">by CarbonAds</span>
        </div>
        <h4 className="item-title">{ad.description}</h4>
      </div>
      <div className="item-ad-image">
        <img src={ad.smallImage} style={{ background: ad.backgroundColor }} />
      </div>
    </a>
  ) : (
    <div>Loading</div>
  )
}
export default AdFeedItem
