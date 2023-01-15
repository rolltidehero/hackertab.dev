import { useQuery } from '@tanstack/react-query'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Ad } from '../types'
import { axios } from 'src/lib/axios'

const getAd = async (keywords: string[]): Promise<Ad | null> => {
  let url = new URL(window.location.href);
  let ref  = url.searchParams.get("ref");
  return axios.get('/engine/ads/', {params: { ref, keywords: keywords.join(",") }})
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  keywords: string[];
  config?: QueryConfig<QueryFnType>
}
export const useGetAd = ({ keywords, config }: UseGetAdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad'],
    queryFn: () => getAd(keywords),
  })
}