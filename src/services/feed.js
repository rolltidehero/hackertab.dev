import cachedRequest from './cachedRequest'
import axios from 'axios'

const getDummyData = async () => {
  return await axios.get('https://api.hackertab.dev/devto/articles?state=rising&per_page=12')
}

export default {
  getDummyData: getDummyData,
}
