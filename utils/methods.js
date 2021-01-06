export function checkMark(name){
  let markedRepos = wx.getStorageSync('markedRepos')
  if(!markedRepos || markedRepos[name] === undefined){
    return false
  }else{
    return true
  }
}

export function formatNum(num){
  let division = num/1000
  if(division > 1){
    return division.toFixed(1) + 'k'
  }
  return num
}

export function changeMark(ev){
  let { index, markStatus } = ev.detail
    let markedRepos = wx.getStorageSync('markedRepos') || {}
    if(markStatus === 'false'){
      this.data.repos[index].marked = false
      delete markedRepos[this.data.repos[index].reposName]
    }else{
      this.data.repos[index].marked = true
      markedRepos[this.data.repos[index].reposName] = this.data.repos[index]
    }
    this.setData({
      repos: this.data.repos
    })
    wx.setStorageSync('markedRepos', markedRepos)
}