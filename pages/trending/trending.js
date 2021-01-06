// pages/trending/trending.js
import { getTrending } from "../../utils/api"
import { parseTrending } from "../../utils/parseTrending"
import { checkMark, changeMark } from "../../utils/methods"
const LANGUAGE =  ['All Language', 'JavaScript', 'HTML', 'PHP', 'Java', 'C++', 'C', 'CSS', 'Dart', 'Ruby', 'Python', 'Go', 'Vue', 'TypeScript', 'C#']
const TIMESPAN = {
  'daily': 'today',
  'weekly': 'this week',
  'monthly': 'this month'
}
const TIMESPANX = {
  'today': 'daily',
  'this week': 'weekly',
  'this month': 'monthly'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
    timeSpan: 'daily',
    isLoading: false,
    showData: false,
    language: undefined,
    columns: [
      {
        values: LANGUAGE
      },
      {
        values: Object.values(TIMESPAN)
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrendingFn()
  },

  getTrendingFn(timespan,language){
    this.setData({
      isLoading: true
    })
    getTrending(this.data.timeSpan,this.data.language).then((res) => {
      let repos = parseTrending(res)
      repos.forEach((item) => {
        item.marked = checkMark(item.reposName)
      })
      let timeSpanText = TIMESPAN[this.data.timeSpan]
      this.setData({
        isLoading: false,
        showData: true,
        repos: repos,
        timeSpanText: timeSpanText
      })
    },()=>{
      this.setData({
        isLoading: false,
        showData: true,
        repos: []
      })
      wx.showToast({
        title: '出错了，请重试~',
        icon: 'none',
        duration: 1000,
        mask:true
      })
    })
  },

  onTap(){
    this.setData({
      showPopup: true
    })
  },

  changeMarkStatus(ev){
    changeMark.bind(this)(ev)
  },

  closePopup(){
    this.setData({
      showPopup: false
    })
  },

  onConfirm(event) {
    this.closePopup()
    if(this.data.isLoading) return
    let lang = event.detail.value[0], time = TIMESPANX[event.detail.value[1]]
    lang = lang === 'All Language' ? undefined : lang.toLowerCase()
    this.setData({
      language: lang,
      timeSpan: time
    })
    this.getTrendingFn()
  },

  onCancel() {
    this.closePopup()
  },
 
})