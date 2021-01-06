export function request(options){
  /* options
  {
    url,
    method,
    data
  } 
  */
  return new Promise((resolve,reject) => {
    wx.request(Object.assign({
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      },
      timeout: 10000
    },options))
  })
}