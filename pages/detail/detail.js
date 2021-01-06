import { getRepoInfo, getReadme } from "../../utils/api"
import { Base64 } from 'js-base64'
import { formatNum } from "../../utils/methods"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    showData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let reposname = options.reposname
    wx.setNavigationBarTitle({
      title: reposname
    })
    this.setData({
      isLoading: true
    })
    Promise.all([getRepoInfo(reposname),getReadme(reposname)]).then((res) => {
      let infoTemp = res[0], readmeTemp = res[1].content
      let info = {
        name: infoTemp.full_name,
        desc: infoTemp.description ? infoTemp.description: '',
        star: formatNum(infoTemp.stargazers_count),
        fork: formatNum(infoTemp.forks_count)
      }
      let readme = readmeTemp ? Base64.decode(readmeTemp) : '该仓库暂无README'
      this.setData({
        info: info,
        readme: readme,
        isLoading: false,
        showData: true
      })
    },()=>{
      this.setData({
        isLoading: false
      })
      wx.showToast({
        title: '出错了，请重试~',
        icon: 'none',
        duration: 1000,
        mask:true
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})