let reposNameReg = /class="text\-normal">([^<]*)<\/span>([^<]*)/g  //仓库名称不含<,<会被换成-
let descReg = /<p class="col-9 text-gray my-1 pr-4">([\s\S]*)\<\/p\>/g //描述中可含<
let langReg = /<span itemprop="programmingLanguage">([^<]*)/g
let numReg = /<\/svg>[\s]*([\d|,]+)/g   //star、fork等，都是</svg>后面跟数字
let emojiReg = /<g-emoji[\s\S]*<\/g-emoji>/g
let linkReg = /<a[\s\S]*<\/a>/g

export function parseTrending(html){
  let rows = html.split('<article class="Box-row">')
  rows.shift()
  let trendingData = []
  rows.forEach((row) => {
    let data = Object.create(null)

    reposNameReg.lastIndex = 0
    let name = reposNameReg.exec(row)
    data.reposName = name[1].trim().slice(0,-2) + "/" + name[2].trim()

    descReg.lastIndex = reposNameReg.lastIndex
    let desc = descReg.exec(row)
    data.desc = desc ?  desc[1] : ''
    data.desc = data.desc.replace(emojiReg,"")
    data.desc = data.desc.replace(linkReg,"")

    langReg.lastIndex = descReg.lastIndex
    let lang = langReg.exec(row)
    data.language = lang ? lang[1] : ''

    numReg.lastIndex = langReg.lastIndex
    data.starSum = numReg.exec(row)[1]
    data.fork = numReg.exec(row)[1]
    data.starTimespan = numReg.exec(row)[1]
    trendingData.push(data)
  })
  return trendingData
}

