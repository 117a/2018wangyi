
function increase1(btn){
    //获取数量
    var $cyNum=$(".cyNum");
    var $cyNumLeft=$(".cyNumLeft");
    var $allPro=$(".first>.allPro");
    var $cyyPrice=$(".cyyPrice");
    var $cyPrice=$(".cyPrice");
    var n=$cyNum.val();
    //+1,再写入框内
    $cyNum.val(++n);
    $cyNumLeft.html(n);
    $allPro.html(`全部商品&nbsp;(${ n })`);
    //获取单价
    window.localStorage.cartNumber=n
    var p=$cyyPrice.html();

    //计算金额并写入金额列
    $cyPrice.html(p*n);
    sum();
}


// let linum=0;
// function addCarts(){
//     let phoneNum=$(".total").children().val();
//
//     let shopName=$(".pro_title").html();
//     let shopNum=$(".cyNum").html();
//     let select=$(".select").html();
//     let shopPrice=$(".price").children().html()
//
//     let small_img=$(".small_img").children()[0].src;
//
//
//     cartsNum= $(".num").html();
//     shopPrice=shopPrice.replace("￥","");
//
//
//     linum+=Number(phoneNum);
//     console.log(linum);
//     window.localStorage.objcart=JSON.stringify({
//         "cartNumber":phoneNum,
//         "shopName":shopName,
//         "shopPrice":shopPrice,
//         "small_img":small_img,
//         "select":select
//     });
//     localStorage.objcart[select]=select;
//     window.localStorage.cartNumber=parseInt(cartsNum)+Number(phoneNum);
//     $(".num").html(parseInt(cartsNum)+Number(phoneNum));
//     add_shoppingcart();
//     let index=0;
//     if (localStorage.arycart==undefined){
//         var arycart=[];
//     }else{
//         arycart=JSON.parse(localStorage.arycart)
//     }
//     console.log(arycart);
//     arycart.forEach((item,indexary)=>{
//         objc=JSON.parse(item)
//         objw=JSON.parse(localStorage.objcart);
//         // console.log(objw.select);
//
//         if (objc.select==objw.select){
//             index=1;
//             objcNum=objc.cartNumber
//
//             // console.log(objc.cartNumber);
//             // console.log(Number(phoneNum));
//             objc.cartNumber=Number(objcNum)+Number(phoneNum)
//             console.log(objc);
//             arycart[indexary]=JSON.stringify(objc)
//             // item=objc
//         }
//     });
//     // console.log(index);
//     if (index==0||arycart[0]=="" ){
//         arycart.push(localStorage.objcart);
//     }
//
//     console.log(5555);
//     console.log(arycart);
//     localStorage.arycart=JSON.stringify(arycart)
// }
// $(".num").html(localStorage.cartNumber);



        function cartselect(){
            let color_list=$(".color_list>ul>li")
            color_list.each(function (index,item) {

                $(item).on("click",function () {

                    $(this).siblings().removeClass("select");
                    this.className="select";

                    console.log(this);
                })
            })

        }
        cartselect()
    //加入购物车
    function add_shoppingcart(btn){

        console.log(localStorage.arycart);
        if (localStorage.cartNumber==undefined) {
            let del=undefined

        }else {

            var del=JSON.parse(localStorage.objcart)
        }
       let $ncartAll=$(".cyNumLeft");
       let $cyNumLeft=$(".cyNumLeft");

        let $ncart=$(".n-cart");
        if (del==undefined||del.del==1){


            $cyNumLeft.html(0)
            $ncart.html(`<div class="empty">
<i class="icon"></i>
<span class="f-fs3" style="margin-left: -10px;">
<span class="s-fc3 f-tc">购物车还是空的 ,</span>
<a href="/store/product" class="s-fcLink">去逛逛 &gt;</a>
</span>
<iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></div>`)
        }else {
            let objary=JSON.parse(localStorage.arycart);
            console.log(objary);
            $ncart=$(".cyfor");
            let str=``;
            let allNum=0
            objary.forEach(objcart=>{

                objcart=JSON.parse(objcart);
                console.log(objcart.cartNumber);
                allNum+=Number(objcart.cartNumber);
                console.log(allNum);
                str+=`
                <!--<div class="f-cb s-fc4 head">
                    <div class="check f-fl">
                        <i class="checkbox u-checkbox z-checked checkCy" id="checkCy1"></i>
                    </div>
                    <div class="cnt f-fl">
                        <div class="coverwrap f-fl s-fc333">全选</div>
                        <div class="product f-fl">商品</div>
                        <div class="pri1 f-fl f-tc">金额</div>
                        <div class="num f-fl f-tc">数量</div>
                        <div class="pri2 f-fl f-tc">小计</div>
                        <div class="man f-fl">操作</div>

                    <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></div>
                </div>
                <ul>
                    <li class="f-cb s-fc4 first">
                        <div class="f-fl product allPro">全部商品&nbsp;(${localStorage.cartNumber})&nbsp;</div>
                        <div class="f-fr f-mgr20">
                            <!--Regular if9-->
           <!--<div class="f-fl icon"><i></i></div>
           <div class="f-fl txt s-fc333">
           全场满<em class="s-fcTheme">¥119</em>免运费
           </div>

           </div>
           </li>-->
           <!--Regular list-->
           <li class="f-cb"  cyNum=${objcart.cartNumber}>
           <div class="check f-fl">
           <i class="checkbox u-checkbox z-checked checkCy">
           </i>
           </div>
           <div class="cnt f-fl">
           <div class="coverwrap f-fl">
           <div class="cover f-bd2">
           <a target="_blank" href="/store/product/detail?id=9385002">
           <img src="${objcart.small_img}">
           </a>
           </div>
           </div>
           <!--Regular if10-->
           <div class="msg f-fl">
           <a target="_blank" href="/store/product/detail?id=9385002">
           <p class="tit f-thide">${objcart.shopName}</p>
           </a>
           <p class="sku s-fc4 f-thide">${objcart.select}</p>
           </div>

           <div class="price f-fl f-tc">￥<em class="cyyPrice">${objcart.shopPrice}</em></div>
           <div class="ctrl f-fl f-pr f-tc">
           <div class="u-counter f-fl number">
           <a data-action="down" href="javascript:;" class="btn j-x"><i type="button" value="+" class="u-icn u-icn-27" cyNum=${objcart.cartNumber}></i></a>
           <span class="tot">
           <input disabled="disabled" type="text" class="text f-fs1 j-x cyNum" value="${objcart.cartNumber}">
           </span>
           <a data-action="plus" href="javascript:;" class="btn j-x"><i class="u-icn u-icn-28"   cyNum=${objcart.cartNumber}></i></a>
           </div>
           <!--Regular if11-->
           </div>
           <div class="price line f-fl f-tc cyPrice">${objcart.cartNumber*objcart.shopPrice}</div>
           <div class="delete f-fl" onclick="deleteCy(this)">
           </div>
           </div>
           </li>

           <!--<li class="bottom" id="bottom" style="position: static; z-index: 1; bottom: 0px;">-->
           <!--<div class="f-cb s-fc4">-->
           <!--<div class="check f-fl">-->
           <!--<i class="checkbox u-checkbox z-checked checkCy" id="checkCy"></i>-->
           <!--</div>-->
           <!--<div class="f-fl">-->
           <!--<div class="coverwrap f-fl s-fc333">全选</div>-->
           
           <!--<div class="product f-fl">已选择<em class="s-fcTheme cyNumLeft"></em>件商品</div>
           </div>*/
           
           
           <!--<div class="paybtn f-fr" onclick="checkOut(this);">结算</div>-->
           <!--<div class="f-fr">-->
           <!--<span class="s-fc4">-->
           <!--Regular if12-->
           <!--已享受免运费-->
           <!--&nbsp;|&nbsp;-->
           <!--</span>-->
           <!--<span class="s-fc1">合计&nbsp;:&nbsp;</span>-->
           <!--<span class="f-fs20 s-fcTheme cyPrice">-->
           <!--Regular if13-->
           <!--<em></em>-->
           <!--Regular if14-->
           <!--</span>-->
           <!--</div>-->
           <!--</div>-->
           <!--</li>-->
           <!--</ul>-->
           <!--Regular if15-->`
            })
           $ncart.html(str)
           $ncartAll.html(allNum)
           localStorage.cartNumber=allNum


    //         $ncart=$(".n-cart");
    // // $cyNumLeft=$(".cyNumLeft");
    // let objcart=JSON.parse(localStorage.objcart);
    // $cyNumLeft.html(localStorage.cartNumber);
    // $ncart.html(`<div class="f-cb s-fc4 head">
    //                 <div class="check f-fl">
    //                     <i class="checkbox u-checkbox z-checked checkCy" id="checkCy1"></i>
    //                 </div>
    //                 <div class="cnt f-fl">
    //                     <div class="coverwrap f-fl s-fc333">全选</div>
    //                     <div class="product f-fl">商品</div>
    //                     <div class="pri1 f-fl f-tc">金额</div>
    //                     <div class="num f-fl f-tc">数量</div>
    //                     <div class="pri2 f-fl f-tc">小计</div>
    //                     <div class="man f-fl">操作</div>
    //
    //                 <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></div>
    //             </div>
    //             <ul>
    //                 <li class="f-cb s-fc4 first">
    //                     <div class="f-fl product allPro">全部商品&nbsp;(${localStorage.cartNumber})&nbsp;</div>
    //                     <div class="f-fr f-mgr20">
    //                         <!--Regular if9-->
    //        <div class="f-fl icon"><i></i></div>
    //        <div class="f-fl txt s-fc333">
    //        全场满<em class="s-fcTheme">¥119</em>免运费
    //        </div>
    //
    //        </div>
    //        </li>
    //        <!--Regular list-->
    //        <li class="f-cb">
    //        <div class="check f-fl">
    //        <i class="checkbox u-checkbox z-checked checkCy">
    //        </i>
    //        </div>
    //        <div class="cnt f-fl">
    //        <div class="coverwrap f-fl">
    //        <div class="cover f-bd2">
    //        <a target="_blank" href="/store/product/detail?id=9385002">
    //        <img src="${objcart.small_img}">
    //        </a>
    //        </div>
    //        </div>
    //        <!--Regular if10-->
    //        <div class="msg f-fl">
    //        <a target="_blank" href="/store/product/detail?id=9385002">
    //        <p class="tit f-thide">${objcart.shopName}</p>
    //        </a>
    //        <p class="sku s-fc4 f-thide">${objcart.select}</p>
    //        </div>
    //
    //        <div class="price f-fl f-tc">￥<em class="cyyPrice">${objcart.shopPrice}</em></div>
    //        <div class="ctrl f-fl f-pr f-tc">
    //        <div class="u-counter f-fl number">
    //        <a data-action="down" href="javascript:;" class="btn j-x"><i type="button" value="+" class="u-icn u-icn-27" onclick="decrease(this);"></i></a>
    //        <span class="tot">
    //        <input disabled="disabled" type="text" class="text f-fs1 j-x cyNum" value="${localStorage.cartNumber}">
    //        </span>
    //        <a data-action="plus" href="javascript:;" class="btn j-x"><i class="u-icn u-icn-28" onclick="increase(this);"></i></a>
    //        </div>
    //        <!--Regular if11-->
    //        </div>
    //        <div class="price line f-fl f-tc cyPrice">${localStorage.cartNumber*objcart.shopPrice}</div>
    //        <div class="delete f-fl" onclick="deleteCy(this)">
    //        </div>
    //        </div>
    //        </li>
    //
    //        <li class="bottom" id="bottom" style="position: static; z-index: 1; bottom: 0px;">
    //        <div class="f-cb s-fc4">
    //        <div class="check f-fl">
    //        <i class="checkbox u-checkbox z-checked checkCy" id="checkCy"></i>
    //        </div>
    //        <div class="f-fl">
    //        <div class="coverwrap f-fl s-fc333">全选</div>
    //        <div class="product f-fl">已选择 <em class="s-fcTheme cyNumLeft">${localStorage.cartNumber}</em> 件商品</div>
    //        </div>
    //        <div class="paybtn f-fr" onclick="checkOut(this);">结算</div>
    //        <div class="f-fr">
    //        <span class="s-fc4">
    //        <!--Regular if12-->
    //        已享受免运费
    //        &nbsp;|&nbsp;
    //        </span>
    //        <span class="s-fc1">合计&nbsp;:&nbsp;</span>
    //        <span class="f-fs20 s-fcTheme cyPrice">
    //        <!--Regular if13--><em>${localStorage.cartNumber*objcart.shopPrice}</em><!--Regular if14-->
    //        </span>
    //        </div>
    //        </div>
    //        </li>
    //        </ul>
    //        <!--Regular if15-->`);
    increase()
    CyChecked();
            decrease2()
        }
}
    //加法

    function increase(){
    //获取数量
        if(localStorage.objcart!=undefined) {
            var aryNew1 = JSON.parse(localStorage.arycart);
            console.log(aryNew1);
            var $cyNum = $(".cyNum");
            var up = $(".u-icn-28");
            up.each(function (index,item) {
                item.onclick = function () {
                    var n = this.getAttribute("cynum");
                    //this.setAttribute("cynum",++n);
                    $(this).attr("cynum", ++n);
                    $cyNum = $(this).parent().prev().children()
                    $cyNum.val(n);
                    console.log(index);
                    // var cartNumberNew=cartNumber+index;
                    var objNew = JSON.parse(aryNew1[index])
                    objNew.cartNumber = n
                    // console.log(JSON.parse(aryNew1[index]));
                    // console.log(objNew);
                    aryNew1[index] = JSON.stringify(objNew)
                    console.log(aryNew1);
                    localStorage.objcart = JSON.stringify(aryNew1)
                    localStorage.arycart = JSON.stringify(aryNew1)
                    add_shoppingcart()
                }
            })
        }
    //     //+1,再写入框内
    // $cyNum.val(++n);
    // $cyNumLeft.html(n);
    // $allPro.html(`全部商品&nbsp;(${ n })`);
    // //获取单价
    //     window.localStorage.cartNumber=n
    // var p=$cyyPrice.html();
    //
    // //计算金额并写入金额列
    // $cyPrice.html(p*n);
    // sum();
}
function decrease2(){
    //获取数量
    if(localStorage.objcart!=undefined) {
        var aryNew1 = JSON.parse(localStorage.arycart);
        console.log(aryNew1);
        var $cyNum = $(".cyNum");
        var up = $(".u-icn-27");
        up.each(function (index,item) {
            item.onclick = function () {
                var n = this.getAttribute("cynum");
                //this.setAttribute("cynum",++n);
                $(this).attr("cynum", --n);
                $cyNum = $(this).parent().siblings(".cyNum").children()
                $cyNum.val(n);
                console.log(index);
                // var cartNumberNew=cartNumber+index;
                var objNew = JSON.parse(aryNew1[index])
                objNew.cartNumber = n
                // console.log(JSON.parse(aryNew1[index]));
                // console.log(objNew);
                aryNew1[index] = JSON.stringify(objNew)
                console.log(aryNew1);
                localStorage.objcart = JSON.stringify(aryNew1)
                localStorage.arycart = JSON.stringify(aryNew1)
                add_shoppingcart()
            }
        })
    }
    //     //+1,再写入框内
    // $cyNum.val(++n);
    // $cyNumLeft.html(n);
    // $allPro.html(`全部商品&nbsp;(${ n })`);
    // //获取单价
    //     window.localStorage.cartNumber=n
    // var p=$cyyPrice.html();
    //
    // //计算金额并写入金额列
    // $cyPrice.html(p*n);
    // sum();
}
    //减法
    function decrease(btn){
    var $cyNum=$(".cyNum");
    var $cyNumLeft=$(".cyNumLeft");
    var $allPro=$(".first>.allPro");
    var $cyyPrice=$(".cyyPrice");
    var $cyPrice=$(".cyPrice");
    var n=$cyNum.val();
    //数量不能小于1
    if(n<= 1) {
    return;
}
    $cyNum.val(--n);
    $cyNumLeft.html(n);
    $allPro.html(`全部商品&nbsp;(${ n })`);
        window.localStorage.cartNumber=n
    var p=$cyyPrice.html();
    $cyPrice.html(p*n);
    sum();
}
    //删除
    function del(btn){
    var s=$(btn).parent().parent();
    $(s).remove();
    sum();
}
    //求和
    function sum(){
    //获取tbody下所有的行
    var $trs = $("#goods tr");
    console.log($trs);
    console.log($trs.length);
    //遍历他们
    var sum = 0;
    for(var i=0;i<$trs.length;i++) {
    //获取每一行
    var $tr = $trs.eq(i);
    console.log($tr);
    //获取该行中第4列的值(金额/String)
    var mny =
    $tr.children().eq(3).html();
    //    tds      td3     金额
    console.log(mny);
    sum += parseFloat(mny);
}
    console.log(sum);
    //将合计值写入合计列
    $("#total").html(sum);
};
    function checkOut(btn) {
    alert("结算成功");
}

    function CyChecked() {
    let $checkCy=$("#checkCy"),
    $checkCyClass=$(".checkCy"),
    $cyPrice=$(".cyPrice");
    var priceCheck=0;
    $checkCyClass.on("click",function () {
    console.log(this);
    $this=$(this)

    if($(this).hasClass("z-checked")){
    priceCheck=$cyPrice.children().html();
    priceCheck=$cyPrice.html();
    $this.removeClass("z-checked");
    $checkCyClass.removeClass("z-checked");
    $cyPrice.children().html("0");
    $cyPrice.html("0");
}else {
    $this.addClass("z-checked");
    $checkCyClass.addClass("z-checked");
    $cyPrice.children().html(priceCheck);
    $cyPrice.html(priceCheck);

}
})
}
    CyChecked()


    function deleteCy(btn) {
    let $ncart=$(".n-cart");
    var $cyNumLeft=$(".cyNumLeft");

    $ncart.html(`<div class="empty">
<i class="icon"></i>
<span class="f-fs3" style="margin-left: -10px;">
<span class="s-fc3 f-tc">购物车还是空的 ,</span>
<a href="/store/product" class="s-fcLink">去逛逛 &gt;</a>
</span> 
<iframe id="tmp_downloadhelper_iframe" style="display: none;">

</iframe>
</div>`)
        window. localStorage.cartNumber=0
        window.localStorage.objcart=JSON.stringify({del:1});
        window.localStorage.arycart=JSON.stringify([]);
    $cyNumLeft.html(0);
}

