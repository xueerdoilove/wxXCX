// pages/challenge/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '周挑战赛', backcolor: '#01919A' },
    daduijiti:3,// 答对几题
    animationData: {},//正转动画
    animationData1: {},//倒转动画
    bgmovie:{},//倒计时 背景动画
    indexmovie:{},// 第几题 动画
    timumovie:{},// 题目 动画
    chakandn:{},//查看答案 动画
    donghuaView: true,
    btnstate:{a1:'',a2:'',a3:'',a4:''},//按钮 答案提示
    proData: { showValue: 0, value: 0, animation: {}, animation1: {} },
    btnmovie:{}, //按钮 动画
    jiazai:{},//加载转圈动画 
    endimgmovie:{},//答题结束胜利失败 动画
    yssurl:'http://image.didayundong.com/3ddbb780-d786-4a0d-95e9-f48b1dfd6ae2',
    ysscss:'lostimg',
    endimgmovie1:{},
    tssurl:'http://image.didayundong.com/94a23aa9-7e91-406b-a359-d869da121aa4',
    datichaoshi:null,//答题超时 计时器
    datikaiguan:false,
    datijieend:false,//答题结束后 的 页面 显示控制器
    fxzj:true,//分享战绩 按钮  显示 开关
    timu:[
      { q: '1+2=', a1: '1', a2: '2', a3: '3', a4: '4', index: '一', fenzhi: 200, ans: '3'},
      { q: '1+1=', a1: '1', a2: '2', a3: '3', a4: '4', index: '二', fenzhi: 200, ans: '2'},
      { q: '1+3=', a1: '1', a2: '2', a3: '3', a4: '4', index: '三', fenzhi: 200, ans: '4'},
      { q: '1+4=', a1: '1', a2: '2', a3: '3', a4: '5', index: '四', fenzhi: 200, ans: '5'},
      { q: '1+5=', a1: '1', a2: '2', a3: '3', a4: '6', index: '五', fenzhi: 200, ans: '6'},
    ],
    timudetail: { q: '1+2=', a1: '1', a2: '2', a3: '3', a4: '4', index: '一', fenzhi: 200 ,ans:'3'},
    timuindex:3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 20000,
      timingFunction: 'linear',
    })
    var animation1 = wx.createAnimation({
      duration: 20000,
      timingFunction: 'linear',
    })
    this.animation = animation
    this.animation1 = animation
    setTimeout(function () {
      animation.rotate(1020).step()
      animation1.rotate(-1020).step()
      this.setData({
        animationData: animation.export(),
        animationData1: animation1.export(),
      })
    }.bind(this), 300);
    setTimeout(function () {
      this.jiazaimove()// 加载动画  上移 动画
    }.bind(this), 3000)
    setTimeout(function(){
      this.setData({//显示 答题 ,关闭 进入 动画
        donghuaView: false
      })
      this.bgdonghua()//倒计时背景 动画
      this.nexttimu()// 开始 第一题
    }.bind(this),4000)


  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotodaan:function(){
    wx.navigateTo({
      url: '../answer/answer',
    })
  },
  setprogress: function (val, showVal) {// 得分进度 动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
    })
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    })
    animation.width(val).step()
    animation1.scale(1.5, 1.5).step()
    animation1.scale(1,1).step()
    this.setData({
      'proData.value': val,
      'proData.showValue': showVal,
      'proData.animation': animation.export(),
      'proData.animation1': animation1.export(),
    })
  },
  bgdonghua:function(){//背景 圆点动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
    })
    animation.scale(1, 1).step()
    this.setData({
      'bgmovie': animation.export(),
    })
  },
  indexdonghua:function(){//第一题 动画
    var animation = wx.createAnimation({
      duration:300,
      timingFunction:'ease-in-out'
    })
    animation.scale(1.2, 1.2).opacity(1).step()
    animation.scale(1 ,1 ).step()
    this.setData({
      'indexmovie':animation.export()
    })
  },
  timushow:function(){ //问题 显示 动画
    var animation = wx.createAnimation({
      duration:20,
    })
    animation.opacity(1).step()
    this.setData({
      'timumovie':animation.export()
    })
  },
  timuhide:function(){// 问题 隐藏动画
    var animation = wx.createAnimation({
      duration: 20,
    })
    animation.opacity(0).step()
    this.setData({
      'timumovie': animation.export()
    })
  },
  btnshow:function(){ // 答案 选项 show 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    })
    animation.scale(1.1, 1.1).step()
    animation.scale(1, 1).step()
    this.setData({
      'btnmovie': animation.export(),
    })
  },
  btnhidden: function () {// 答案 选项 hide 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    })
    animation.scale(0, 0).step()
    this.setData({
      'btnmovie': animation.export(),
    })
  },
  jiazaimove:function(){ //场景加载 上移动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
    })
    animation.translateY(-1000).step()
    this.setData({
      'jiazai': animation.export(),
    })
  },
  stopTime:function(){ //停止 秒表 并返回 剩余时间
    var timesurplus = this.selectComponent("#componentId").stopDrawCircle()
    return timesurplus
  },
  initTime:function(){ // 秒表 归位 10
    this.selectComponent("#componentId").backInit()
  },
  startTime:function(){// 开始 计时
    this.selectComponent("#componentId").countInterval()
  },
  datikaishi:function(){// 开始 答题
    setTimeout(function(){
      this.btnshow()
    }.bind(this),2500)
    setTimeout(function () {
      this.data.datikaiguan = true;
      this.selectComponent("#componentId").countInterval()
      this.data.datichaoshi = setTimeout(function () {
        this.nexttimu()
      }.bind(this), 11000)
    }.bind(this), 3000)
  },
  datijieshu:function(){// 答题结束
    this.setData({
      datijieend:true
    })
    this.endimgdonghua()
  },
  defen: function (event){//答题 得分
    if (!this.data.datikaiguan){return}
    this.data.datikaiguan = false;
    clearTimeout(this.data.datichaoshi)
    var ans = event.target.dataset.ans
    var btnindex = event.target.dataset.index

    if (ans == this.data.timudetail.ans){
      this.data.daduijiti++
      var bb = 'btnstate.' + btnindex
      //proData: { showValue: 0, value: 0, animation: {}, animation1: {} },
      var a = this.stopTime() * this.data.timudetail.fenzhi / 10 +this.data.proData.showValue;
      var b = this.stopTime() * 2 + this.data.proData.value
      this.setprogress(b,a)
      this.setData({
        [bb]:'correct'
      })
    }else{
      var bb = 'btnstate.' + btnindex
      for(var key in this.data.timudetail){
        if(key=='ans') continue
        if (this.data.timudetail[key]==this.data.timudetail.ans)
        {
          var dd = key
        }
      }
      
      var cc = 'btnstate.' + dd
      this.setData({
        [bb]: 'wrong',
        [cc]:'correct'
      })
      this.stopTime()
    }
    setTimeout(function(){
      this.nexttimu()
    }.bind(this),2000)

  },
  nexttimu: function () {// 下一道题目 
    this.data.timuindex++
    if(this.data.timuindex>4){ 
      this.datijieshu()
      return;
    }
    this.setData({
      timudetail:this.data.timu[this.data.timuindex]
    })
    this.initTime()
    this.btnhidden()
    this.timuhide()
    this.setData({
      'btnstate.a1': '',
      'btnstate.a2': '',
      'btnstate.a3': '',
      'btnstate.a4':''
    })
    setTimeout(function () {
      this.indexdonghua()//第一题 显现 变大变小
      setTimeout(function () {
        this.timushow()
        this.datikaishi()// 开始答题
        
      }.bind(this), 1500)
    }.bind(this), 1000)
  },
  endimgdonghua:function(){//挑战结果 胜败 动画
    if (this.data.daduijiti>=3){
      this.setData({
        yssurl:'http://image.didayundong.com/00590b3d-50b4-475b-a88a-fe6d7e6962fe',
        ysscss:'victoryimg',
        tssurl:'http://image.didayundong.com/a5513882-a7e4-4eb1-9892-06318262c5a4',
        fxzj: true,
        daduijiti: this.data.daduijiti
      })
    }else{

      this.setData({
        yssurl: 'http://image.didayundong.com/3ddbb780-d786-4a0d-95e9-f48b1dfd6ae2',
        ysscss: 'lostimg',
        tssurl: 'http://image.didayundong.com/94a23aa9-7e91-406b-a359-d869da121aa4',
        fxzj:false,
        daduijiti: this.data.daduijiti
      })
    }
    
    setTimeout(function(){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in-out',
      })
      animation.translateY(-215).step()
      this.setData({
        endimgmovie: animation.export(),
      })
    }.bind(this),320)
    setTimeout(function () {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
      })
      animation.opacity(1).scale(1,1).step()
      this.setData({
        endimgmovie1: animation.export(),
      })
    }.bind(this), 20)
    setTimeout(function(){
      var ani = wx.createAnimation({
        duration:300,
        timingFunction:'ease-in-out'
      })
      ani.translateY(-70).step()
      this.setData({
        chakandn:ani.export()
      })
    }.bind(this),1000)
  },
})