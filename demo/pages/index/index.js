//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        isShow: false,
    },
    handleClick() {
        //点击跳转到首页
        wx.redirectTo({
            url: "/pages/logs/logs",
        })
    },
    //事件处理函数
    onLoad: function (options) {
        // console.log(this)
        this.getUserInfo()
    },
    handleGetUserInfo(data) {
        // console.log('用户点击了', data)
        //判断用户点击的是否是允许
        if (data.detail.rawData) {
            //用户点击是允许
            this.getUserInfo()
        }
    },
    getUserInfo() {
        //判断用户是否授权
        wx.getSetting({
            success: (data) => {
                // console.log(data)
                if (data.authSetting['scope.userInfo']) {
                    //用户已经授权
                    this.setData({
                        isShow: false
                    })
                } else {
                    //用户没有授权
                    this.setData({
                        isShow: true
                    })
                }
            }
        })
        //获取用户登录信息
        wx.getUserInfo({
            success: (data) => {
                // console.log(data)
                this.setData({
                    userInfo: data.userInfo
                })
            },
            fail: () => {
                console.log('获取用户信息失败')
            }
        })
    }
})