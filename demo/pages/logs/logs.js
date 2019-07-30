// pages/index/index.js
const fetch = require('../../utils/fetch')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        containershow: true,
        searchxx: false,
        categories: [],
        //获取商品数据
        products: [],
        opts:{},
        pageIndex:1,
        pageSzize:20,
        isshowlayer: false,
    },
    goods: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            opts:options
        })
        //获取商品列表数据
        this.products()


        //分类
        wx.request({
            //192  是本地的
            url: 'http://192.168.0.208:8081/sm_wechatapplet/categories',
            success: res => {
                this.setData({ categories: res.data })
            }
        })

        //产品
        //   wx.request({
        //       url: 'http://192.168.0.208:8081/sm_wechatapplet/products',
        //       success: res => {
        //           this.setData({ products: res.data })
        //       }
        //   }) 


        //搜索2
        var that = this;
        wx.request({
            url: 'http://116.62.240.255:8081/sm_wechatapplet/sellwell',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                wx.setStorage({
                    key: 'newsList',
                    data: res.data,
                })
                that.setData({
                    newsList: res.data
                })
            }
        })
        wx.request({
            url: 'http://116.62.240.255:8081/sm_wechatapplet/sellwell',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.setStorage({
                    key: 'sharesList',
                    data: res.data,
                })
                that.setData({
                    shareList: res.data
                })
            }
        })
        wx.request({
            url: 'http://116.62.240.255:8081/sm_wechatapplet/sellwell',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.setStorage({
                    key: 'weixinList',
                    data: res.data,
                })
                that.setData({
                    weixinList: res.data
                })
            }
        })
        wx.request({
            url: 'http://116.62.240.255:8081/sm_wechatapplet/sellwell',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.setStorage({
                    key: 'netearnList',
                    data: res.data,
                })
                that.setData({
                    netearnList: res.data
                })
            }
        })
        wx.request({
            url: 'http://116.62.240.255:8081/sm_wechatapplet/sellwell',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.setStorage({
                    key: 'economyList',
                    data: res.data,
                })
                that.setData({
                    economyList: res.data
                })
            }
        })
    },
    //获取商品数据
    products: function () {
        //产品
        wx.request({
            url: 'http://192.168.0.208:8081/sm_wechatapplet/products?size=20',
            success: res => {
                // console.log(res.data)
                this.setData({ products: res.data })
            }
        })
    },

    //搜索框
    // onBindFocus: function (event) {
    //     wx.request({
    //         url: 'http://116.62.240.255:8081/sm_wechatapplet/foresearch', //仅为示例，并非真实的接口地址
    //         data: {
    //             'searchValue': event.detail.value,
    //         },
    //         header: {
    //             //设置参数内容类型为x-www-form-urlencoded
    //             'content-type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         method: 'POST',
    //         success(res) {
    //             console.log(res)
    //         }
    //     })
    // },

    //搜索方法 key为用户输入的查询字段
    search: function (key) {
        /*console.log('搜索函数触发')*/
        var that = this;
        var newsList = wx.getStorage({
            key: 'newsList',
            success: function (res) {//从storage中取出存储的数据*/
                /*console.log(res)*/
                if (key == '') {//用户没有输入 全部显示
                    that.setData({
                        newsList: res.data
                    })
                    return;
                }
                var arr = [];//临时数组 用于存放匹配到的数据
                for (let i in res.data) {
                    if (res.data[i].title.indexOf(key) >= 0) {//查找
                        arr.push(res.data[i])
                    }
                }
                if (arr.length == 0) {
                    that.setData({
                        newsList: []
                    })
                } else {
                    that.setData({
                        newsList: arr//在页面显示找到的数据
                    })
                }
            }
        })
    },


    //搜索框关闭的点击事件
    onBingTop: function () {
        this.setData({
            containershow: true,
            searchxx: false,
            value: false
        })
    },

    //拍照
    bindViewTap: function () {
        var that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera', 'album'],
            success: function (res) {
                // tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                that.setData({ avatarUrl: tempFilePaths[0] })
            },
            complete: function () {
                console.log("complete")
            }
        })
    },

    // 收藏弹出框
    showlayer(event) {
        this.setData({
            isshowlayer: true
        })
        goods = event;
        console.log(event);

    },
    hiddenlayer() {
        this.setData({
            isshowlayer: false
        })
    },
    //加入购物车
    addCart() {
        //产品的参数
        var {
            count,
            currentGG,
            goodsid
        } = this.data

        var obj = {
            count,
            currentGG,
            goodsid
        }

        //$.ajax()  后台保存数据
        // wx.setStorage({
        //     key: 'shopcart',
        //     data: JSON.stringify(obj),
        //     success() {
        //         wx.showToast({
        //             title: '加入成功'
        //         })
        //     }
        // })
    },
    //？？？？？
    shouCang(event) {
        console.log(event);
        console.log(goods);
        wx.request({
            url: 'demo', //仅为示例，并非真实的接口地址
            data: {
                'id': goods.id,
                'prevent': goods.prevent
            },
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            method: 'POST',
            success(res) {
                console.log(res)
            }
        })

        //   wx.request({
        //     url: 'demo.php?value=' + event.detail.value, //仅为示例，并非真实的接口地址
        //     method: 'GET',
        //     success(res) {
        //       console.log(res)
        //     }
        //   })

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
        console.log('daodingl')
    },


    //搜索
    wxSearchInput: function (e) {
        this.search(e.detail.value);
        console.log(e.detail.value)
        console.log(123)
    },
    wxSerchFocus: function (e) {
        this.search(e.detail.value);
    },
    wxSearchBlur: function (e) {
        this.search(e.detail.value);
    },
    wxSearchFn: function (e) {
        /*console.log(e)*/
    },


})