const fetch =require('../../utils/fetch')


Page({
    data: {
        //点击收藏
        isshowfenlei:false,
        //当前加载的分类
        category:{},
        //子分类下的全部商品
        shops:[],
        pageIndex: 0,
        pageSize:10,
        totalCount:0,
        hasMore:true,
        categories: [],
        goodslist:[
            {
                id:1,
                title:'项链',
                img:''
            }
        ]
    },
    //分类点击切换
    showimg() {
        this.setData({
          isshowfenlei: !this.data.isshowfenlei
        })
    },
    //加载下一页数据
    

    // 收藏弹出框
    showlayer() {
        console.log(123)
        this.setData({
            isshowlayer: true
        })
    },
    hiddenlayer() {
        console.log(1234)
        this.setData({
            isshowlayer: false
        })
    },
    


    onLoad: function (options) {
        
        fetch(`categories/${options.id}`).then(res =>{
            //分类的头部文字
            //不能确定是在 onReady 之后执行
            console.log(res.data)
            // this.setData({ category:res.data })
            // wx.setNavigationBarTitle({
            //     title:res.data.name
            // })
            //加载完分类之后再去加载商品信息 shops   商品的地址
            // this.loadMore()
        })



        //分类
        wx.request({
            url: 'http://192.168.0.208:8081/sm_wechatapplet/categories',
            success: res => {
                this.setData({ categories: res.data })
            }
        })  
    },
    categories(e) {
        // console.log(e.currentTarget.dataset.id)
        this.setData({
            activeId: e.currentTarget.dataset.id
        })
    },
    

    onReady: function () {
        //分类头部文字
        if(this.data.category.name){
            wx.setNavigationBarTitle({
                title:this.data.category.name
            })
        }
    },

    onPullDownRefresh: function () {
        //重新加载数据
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log('到底了，别拉了')
        //判断是否正在加载，否则会有多次触发问题

    },
    

    onShareAppMessage: function () {

    }
})