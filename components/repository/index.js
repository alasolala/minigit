Component({
  /**
   * 组件的属性列表
   */
  properties: {
    reposList: Array,
    timeSpan: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeMark(ev){
      let mark = ev.currentTarget.dataset['mark'],
          index = ev.currentTarget.dataset['reposindex']
        this.triggerEvent('changeMarkFn', {
          index: index,
          markStatus: mark
        })
    },
    checkDetail(ev){
      let reposname = ev.currentTarget.dataset['reposname']
      wx.navigateTo({
        url: '/pages/detail/detail?reposname='+reposname
      })
    }
  }
})
