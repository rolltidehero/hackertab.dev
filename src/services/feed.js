import cachedRequest from './cachedRequest'
import axios from 'axios'

const base = ''
const getFeed = async (tags, page = 0) => {
  return await axios.get(`${base}/articles?tags=&limit=12&offset=${page * 12}`)
}
const getProducthuntFeed = async () => {
  return await axios.get(`${base}/producthunt`)
}
const getGithubFeed = async (tags) => {
  return await axios.get(`${base}/github?tags=${tags}`)
}

export default {
  getFeed: getFeed,
  getProducthuntFeed: getProducthuntFeed,
  getGithubFeed: getGithubFeed,
}
