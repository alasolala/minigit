import { searchRepos } from "../../utils/api"
import { checkMark, formatNum, changeMark } from "../../utils/methods"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    page: 1,
    repos: [],
    isLoading: false,
    showData: false
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch(){
    this.setData({
      isLoading: true,
      page: 1
    })
    this.searchFn()
  },

  searchFn(){
    searchRepos(this.data.value, this.data.page).then((res) => {
      let list = res.items
      let temp = []
      list.forEach((item) => {
        temp.push({
          reposName: item.full_name,
          desc: item.description,
          language: item.language,
          starSum: formatNum(item.stargazers_count),
          fork: formatNum(item.forks_count),
          marked: checkMark(item.full_name)
        })
      })
      if(this.data.page > 1){
        temp = this.data.repos.concat(temp)
      }
      this.setData({
        repos: temp,
        isLoading: false,
        showData: true
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


  changeMarkStatus(ev){
    changeMark.bind(this)(ev)
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('reach bottom')
    this.setData({
      page: ++ this.data.page
    })
    this.searchFn()
  }
})