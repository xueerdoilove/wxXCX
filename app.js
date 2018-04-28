//app.js App() 必须在 app.js 中注册，且不能注册多个。 通过 getApp() 获取实例之后，不要私自调用生命周期函数 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function (options) {
    // Do something when show.当小程序启动，或从后台进入前台显示，会触发 onShow
    // console.log(options)
  },
  onHide: function () {
    // Do something when hide.当小程序从前台进入后台，会触发 onHide
  },
  onError: function (msg) {
    //当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    console.log(msg)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})