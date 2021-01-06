import { request } from "./request"

const BASE_URL = "https://api.github.com"
const TRENDING_URL = "https://github.com/trending" 


export function getTrending(timespan,language){
  let trendingUrl =  language ? `${TRENDING_URL}/${language}` : TRENDING_URL
  let params = {
    url: trendingUrl,
    data: {
      since : timespan ? timespan : "daily"
    }
  }
  return request(params)
}

export function getReadme(reposname){
  return request({
    url: `${BASE_URL}/repos/${reposname}/contents/README.md`
  })
}

export function getRepoInfo(reposname){
  return request({
    url: `${BASE_URL}/repos/${reposname}`
  })
}

export function searchRepos(keyword,page){
  return request({
    url: `${BASE_URL}/search/repositories?p=${page}&q=${keyword}&sort=match`
  })
}

