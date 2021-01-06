import { changeMark } from "../../utils/methods"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repos: []
  },

  changeMarkStatus(ev){
    changeMark.bind(this)(ev)
  },

  init(){
    let markedRepos = wx.getStorageSync('markedRepos')
    let temp = Object.keys(markedRepos).map((key) => {
      return markedRepos[key]
    })
    this.setData({
      repos: temp
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init()
  },




})