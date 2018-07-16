let details=(function () {
    let $pic=$('.pic'),
        $smallBox=$pic.children('.small_img'),
        $mask=$smallBox.children('.small_mask'),
        $bigBox=$pic.children('.big_img'),
        $bigImg=$bigBox.children('img'),
        $imgnav=$('.imgnav'),
        $oUl=$imgnav.children('ul'),
        $img=$smallBox.children('img'),
        $arrowL=$pic.find('.arrowL'),
        $arrowR=$pic.find('.arrowR'),
        $numBox=$pic.find('.b_num'),
        $numCtn=$numBox.children('.numctn'),
        $numIndex=$pic.find('#j-banneridx'),
        $colorList=$(".color_list"),
        $colorUl=$colorList.children('ul');
//获取数据
    let getData=function getData() {
        return new Promise((resolve)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('get','./json/data1.json',true);
            xhr.onreadystatechange=()=>{
                if(xhr.readyState==4&&xhr.status==200){
                    let data=JSON.parse(xhr.responseText);
                    resolve(data)
                }
            }
            xhr.send(null);

        })
    };
    //将商品信息绑定到页面上,商品颜色和商品图片导航
    let bindHtml=function bindHtml(navData,colorData) {
        let navStr=``,colorStr=``;
        if(navData){
            $.each(navData.imgnav,(index,item)=>{
                navStr+=`<li><img src="${item}" alt=""></li>`;
            });
            $oUl.html(navStr);
        }
        let $oLis=$oUl.children('li');
        $oLis.eq(0).css({
            border: '2px solid #d33a31'
        });
        if(colorData){
            $.each(colorData,(index,item)=>{
                colorStr+=`<li>${item.color}</li>`;
            });
            $colorUl.html(colorStr);
        }
    };
    ////放大镜
    let enlarge=function enlarge(data) {
        $smallBox.on('mouseenter',function (e) {
            let $numIndex=$pic.find('#j-banneridx');
            e.preventDefault();
            $mask.show();
            $bigBox.show();
            $numBox.show();
            position(e);
            let tmp=Number($numIndex.html()-1);
            hideArrow(data,tmp);
        }).on('mousemove',function (e) {
            let $numIndex=$pic.find('#j-banneridx');
            let tmp=Number($numIndex.html()-1);
            position(e);
            hideArrow(data,tmp);
        }).on('mouseleave',function (e) {
            $mask.hide();
            $bigBox.hide();
            $numBox.hide();
            $arrowR.hide();
            $arrowL.hide();
        });
        function position(e) {
            var $x=e.pageX-$smallBox.offset().left-$mask.outerWidth()/2;
            var $y=e.clientY-$smallBox.offset().top-$mask.outerHeight()/2-$(document).scrollTop();
            var $maxLeft=$smallBox.outerWidth()-$mask.outerWidth();
            var $maxTop=$smallBox.outerHeight()-$mask.outerHeight();
            var $minLeft=0;
            var $minTop=0;
            $x=$x<$minLeft?0:($x>$maxLeft?$maxLeft:$x);
            $y=$y<$minTop?0:($y>$maxTop?$maxTop:$y);
            $mask.css({left:$x,top:$y});
            $bigImg.css({
                left:-$bigBox.outerWidth()/$smallBox.outerWidth()*$x,
                top:-$bigBox.outerHeight()/$smallBox.outerHeight()*$y,
            })
        }
    };
    //切换颜色
    let changeColor=function changeColor(data) {
        let $colorLi=$colorUl.children('li');
        $.each($colorLi,(index,item)=>{
            $(item).on('click',function () {
                let numStr=`<em id="j-banneridx">1</em>
                            /${data[index].imgnav.length}`;
                $numCtn.html(numStr);
                $(this).addClass('selected').siblings().removeClass('selected');
                $img[0].src=`${data[index].simg[0]}`;
                $bigImg[0].src=`${data[index].bimg[0]}`;
                bindHtml(data[index]);
                $oUl.css({
                    left:0,
                    transition:"0s"
                })
                let $oLis=$oUl.children('li');
                $oLis.eq(0).css({
                    border: '2px solid #d33a31'
                });
                let i=index;
                $.each($oLis,(index,item)=>{
                    item.onclick=function () {
                        pubChange(data[i],$(item),index);
                    }
                });
            })
        });
    };
    //切换图片导航
    let changeNav=function changeNav(data){
        let $oLis=$oUl.children('li');
        $.each($oLis,(index,item)=>{
            item.onclick=function () {
                pubChange(data,$(item),index);
            }
        });
    };
    //切换时各项的变化
    let pubChange=function pubChange(data,ele,i) {
        if(i<data.simg.length){
            let curNum=i+1;
            let $numIndex=$pic.find('#j-banneridx');
            $numIndex.html(curNum);
            $img[0].src=`${data.simg[i]}`;
            $bigImg[0].src=`${data.bimg[i]}`;
            ele.css({
                border: '2px solid #d33a31'
            });
            ele.siblings().css({
                border: '2px solid #fff'
            });
            if(i>3){
                if(i>=2&&i<6){
                    $oUl.css({
                        left:-90*(i-2),
                        transition:'1s'
                    });
                }
            }

        }
    };
    //控制箭头的显示和隐藏
    let hideArrow=function hideArrow(data,tmp) {
        if(data.imgnav.length-1==0){
           // console.log(1);
            $arrowR.hide();
            $arrowL.hide();
        }else{
            if(tmp==0){
                $arrowL.hide();
                $arrowR.show();
            }else if(tmp==data.imgnav.length-1){
                $arrowR.hide();
                $arrowL.show();
            }else{
                $arrowL.show();
                $arrowR.show();
            }
        }

    };
//切换箭头
    let changeArrow=function changeArrow(data,flag) {
        let $oLis=$oUl.children('li');
        let $numIndex=$pic.find('#j-banneridx');
        let tmp=Number($numIndex.html())-1;
        $numBox.show();
        if(flag==1){
            if(tmp<data.imgnav.length-1){
                tmp++;
                hideArrow(data,tmp);
                pubChange(data,$oLis.eq(tmp),tmp);
            };
        }else{
            if(tmp>0){
                tmp--;
                hideArrow(data,tmp);
                pubChange(data,$oLis.eq(tmp),tmp);
            }
        }

        $arrowR.on('mouseenter',function (e) {
            let $numIndex=$pic.find('#j-banneridx');
            let tmp=Number($numIndex.html()-1);
            //console.log($numIndex.html());
            //console.log(tmp);
            hideArrow(data,tmp);
            $mask.hide();
            $bigImg.hide();
            $numBox.show();
        }).on('mouseleave',function () {
            let tmp=Number($numIndex.html()-1);
            hideArrow(data,tmp);
            $mask.show();
            $bigImg.show();
            $numBox.show();
        });
        $arrowL.on('mouseenter',function (e) {
            e.preventDefault();
            let $numIndex=$pic.find('#j-banneridx');
            let tmp=Number($numIndex.html()-1);
            hideArrow(data,tmp);
            $mask.hide();
            $bigImg.hide();
            $numBox.show();
        }).on('mouseleave',function () {
            let tmp=Number($numIndex.html()-1);
            hideArrow(data,tmp);
            $mask.show();
            $bigImg.show();
            $numBox.show();
        });
    };

    return {
        init:function init() {
            let promise=getData();
            promise.then((res)=>{
                let $colorLi=$colorUl.children('li');
                bindHtml(res[0][0],res[1]);
                changeColor(res[1]);
                changeNav(res[0][0]);
                enlarge(res[0][0]);
                /*$colorLi.each(function (index,item) {
                    if($(item).hasClass('selected')){
                        n=index;
                        console.log(1);
                        enlarge(res[1][n])
                    }
                });*/
                $arrowR.on('click',function () {
                   let $oLis=$oUl.children('li');
                   if($oLis.length!=8){
                       $colorLi.each(function (index,item) {
                           if($(item).hasClass('selected')){
                               n=index;
                               return n
                           }
                       })
                       changeArrow(res[1][n],1);
                   }else{
                       changeArrow(res[0][0],1)
                   }
               });
                $arrowL.on('click',function () {
                    let $oLis=$oUl.children('li');
                    if($oLis.length!=8){
                        $colorLi.each(function (index,item) {
                            if($(item).hasClass('selected')){
                                n=index;
                                return n
                            }
                        })
                        changeArrow(res[1][n],0);
                    }else{
                        changeArrow(res[0][0],0);
                    }
                })
            });
        }
    }
})();
details.init();
let linum=0;
function addCarts(){
    let phoneNum=$(".total").children().val();

    let shopName=$(".pro_title").html();
    let shopNum=$(".cyNum").html();
    let select=$(".selected").html();
    let shopPrice=$(".price").children().html()

    let small_img=$(".small_img").children()[0].src;


    cartsNum= $(".num").html();
    shopPrice=shopPrice.replace("￥","");


    linum+=Number(phoneNum);
    console.log(linum);
    window.localStorage.objcart=JSON.stringify({
        "cartNumber":phoneNum,
        "shopName":shopName,
        "shopPrice":shopPrice,
        "small_img":small_img,
        "select":select
    });
    localStorage.objcart[select]=select;
    window.localStorage.cartNumber=parseInt(cartsNum)+Number(phoneNum);
    $(".num").html(parseInt(cartsNum)+Number(phoneNum));

    let index=0;
    if (localStorage.arycart==undefined){
        var arycart=[];
    }else{
        arycart=JSON.parse(localStorage.arycart)
    }
    console.log(arycart);
    arycart.forEach((item,indexary)=>{
        objc=JSON.parse(item)
        objw=JSON.parse(localStorage.objcart);
        // console.log(objw.select);

        if (objc.select==objw.select){
            index=1;
            objcNum=objc.cartNumber;

            // console.log(objc.cartNumber);
            // console.log(Number(phoneNum));
            objc.cartNumber=Number(objcNum)+Number(phoneNum)
            console.log(objc);
            arycart[indexary]=JSON.stringify(objc)
            // item=objc
        }
    });
    // console.log(index);
    if (index==0||arycart[0]=="" ){
        arycart.push(localStorage.objcart);
    }

    console.log(5555);
    console.log(arycart);
    localStorage.arycart=JSON.stringify(arycart)
    add_shoppingcart();
}
$(".num").html(localStorage.cartNumber);