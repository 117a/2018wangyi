/**
 * Created by DELL on 2018/6/30.
 */
var input=document.getElementsByTagName("input")[0];
var list=document.getElementsByClassName("meng-list")[0];
function mengNavInput() {
        input.onfocus=function () {
            if(list.style.display="none"){
                list.style.display="block";
            }
        };
      input.onblur=function () {
          if(list.style.display="block"){
              list.style.display="none";
          }
      }
}
mengNavInput();

function Banner(id,url) {
    this.banner=document.getElementById(id);
    this.oUl=utils.children(this.banner,"ul")[0];
    this.oLis=this.oUl.getElementsByTagName("li");
    this.oImgs=this.oUl.getElementsByTagName("img");
    this.bannerTip=utils.children(this.banner,"div")[0];

    this.btnLeft=utils.children(this.banner,"span")[0];
    this.btnRight=utils.children(this.banner,"span")[1];
    this.resData=null;
    this.step=0;
    this.timer=null;
    this.url=url;
    this.init();
}
Banner.prototype={
    init:function () {
        //1 获取数据
        this.getData();
        //2 绑定数据
        this.bindHtml();
        //3 延迟加载
        // window.setTimeout(()=>{
            // this.loadImg();
        // },1000);
        //4 自动轮播
        this.autoPlay();
        //5 启动和停止轮播
        this.overout();
        //    6 点击焦点切换banner
        this.bannerBtn();
        //    7 点击左右箭头轮播
        this.handleArrow();
    },
    getData:function () {
        var xhr=new XMLHttpRequest();
        xhr.open("get",this.url,false);
        xhr.onreadystatechange=()=> {
            if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
                this.resData=JSON.parse(xhr.responseText)
            }
        };
        xhr.send(null);
    },
    bindHtml:function () {
        let strLi=``;
        let strA=``;
        this.resData.forEach((item,index)=>{
            strLi+=`<li><img src="${item.img}" realImg=""></li>`;
            strA+=index==0?`<a href="javascript:void(0)" class="bg"></a>`:`<a href="javascript:void(0)"></a>`;
        });
        strLi+=`<li><img src="${this.resData[0].img}" realImg=""></li>`;

        this.oUl.innerHTML=strLi;
        this.oUl.style.width=this.oLis.length*this.oLis[0].offsetWidth+"px";
        this.bannerTip.innerHTML=strA;
    },
    // loadImg:function () {
    //     [...this.oImgs].forEach((item,index)=>{
    //         var tempImg=new Image();
    //         tempImg.src=item.getAttribute("realImg");
    //         tempImg.onload=function () {
    //             item.src=this.src;
    //             animate(item,{opacity:1},500);
    //         }
    //     })
    // },
    autoPlay:function () {
            clearInterval(this.autoTimer);
        this.autoTimer=window.setInterval(()=>{
            this.step++;
            if(this.step===this.oLis.length){
                this.oUl.style.left=0;
                this.step=1
            }
            animate(this.oUl,{left:-this.step*this.oLis[0].offsetWidth},3);
            this.focusFn()
        },2000)
    },
    focusFn:function () {
        this.oAs=utils.children(this.bannerTip,"a");
        let step= this.step==this.oLis.length-1?0:this.step;
        this.oAs.forEach((item,index)=>{
            this.step==index?utils.addClass(item,"bg"):utils.removeClass(item,"bg")
        })
    },
    overout:function () {
        this.banner.onmouseover=()=>{
            window.clearInterval(this.autoTimer);
            this.btnLeft.style.display=this.btnRight.style.display="block"
        };
        this.banner.onmouseout=()=>{
            this.btnLeft.style.display=this.btnRight.style.display="none";
            this.autoTimer=window.setInterval(()=>{
                this.autoPlay();
            },2000)
        }
    },
    bannerBtn:function () {
        this.oAs=utils.children(this.bannerTip,"a");
        this.oAs.forEach((item,index)=>{
            item.onclick=()=>{
                this.step=index;
                animate(this.oUl,{left:-this.step*this.oLis[0].offsetWidth},3);
                this.focusFn()
            }
        })
    },
    handleArrow:function () {
        this.btnLeft.onclick=()=>{
            this.step--;
            if(this.step<0){
                this.oUl.style.left=-(this.oLis.length-1)*this.oLis[0].offsetWidth+"px";
                this.step=this.oLis.length-2;
            }
            animate(this.oUl,{left:-this.step*this.oLis[0].offsetWidth},3);
            this.focusFn();
        };
        this.btnRight.onclick=()=>{
            window.clearInterval(this.autoTimer);
            this.step++;
            if(this.step===this.oLis.length){
                this.oUl.style.left=0;
                this.step=1
            }
            animate(this.oUl,{left:-this.step*this.oLis[0].offsetWidth},3);
            this.focusFn()
        }
    },
};



var pic=document.getElementById("ett");
let back=document.getElementById("top");
let banner=document.getElementById("banner");
let bannert=banner.offsetTop+banner.offsetHeight;
console.log(back);
window.onscroll=function () {
    console.log(1);
    let scrollT=utils.win("scrollTop");
    let winH=utils.win("clientHeight");
    console.log(winH);
    let s=winH/3;
  if(scrollT>=winH-600){
      pic.style.display="block";
  }else {
      pic.style.display="none"
  }
  if(scrollT>=bannert){
      back.style.display="block";
      // back.style.right="4%";
      // back.style.top="50%"
  }
  else if(scrollT<=bannert){
      back.style.display="none";
  }
};

let d=500;
let i=15;
pic.onclick=function () {
    let target=utils.win("scrollTop");
    let step=i/d*target;
    let timer=window.setInterval(()=>{
       let cur=utils.win("scrollTop");
        cur-=step;
        if(cur<=0){
            clearInterval(timer);
            utils.win("scrollTop",0);
            return;
        }
        utils.win("scrollTop",cur)
    },i)
};









