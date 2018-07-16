var details=(function () {
    function enlarge() {
        let $pic=$('.pic'),
            $smallBox=$pic.children('.small_img'),
            $mask=$smallBox.children('.small_mask'),
            $bigBox=$pic.children('.big_img'),
            $bigImg=$bigBox.children('img');
        // console.log($bigBox);
        // console.log($bigImg);
        // console.log($smallBox);
        // console.log($mask);
        $smallBox.on('mouseover',function (e) {
            $mask.show();
            $bigBox.show();
            position(e);
        }).on('mousemove',function (e) {
            position(e);
        }).on('mouseout',function (e) {
            $mask.hide();
            $bigBox.hide();
        });
        function position(e) {

            var $x=e.pageX-$smallBox.offset().left-$mask.outerWidth()/2;
            var $y=e.pageY-$smallBox.offset().top-$mask.outerHeight()/2;

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
    }
    let arycart=[];
    function addCarts(){
        let phoneNum=$(".total").children().val();

        let shopName=$(".pro_title").html();
        let shopNum=$(".cyNum").html();
        let select=$(".select").html();
        let shopPrice=$(".price").children().html()

        let small_img=$(".small_img").children()[0].src;

        console.log(phoneNum);
        cartsNum= $(".num").html();
        shopPrice=shopPrice.replace("￥","");

        window.localStorage.objcart=JSON.stringify({
            // "cartNumber":parseInt(cartsNum)+Number(phoneNum),
            "shopName":shopName,
            "shopPrice":shopPrice,
            "small_img":small_img,
            "select":select
        });
        localStorage.objcart[select]=select;
        window.localStorage.cartNumber=parseInt(cartsNum)+Number(phoneNum);
        $(".num").html(parseInt(cartsNum)+Number(phoneNum));
        add_shoppingcart();
        let index=0;
        console.log(arycart);
        arycart.forEach(item=>{
            objc=JSON.parse(item)
            objw=JSON.parse(localStorage.objcart);
            console.log(objw.select);

            if (objc.select==objw.select){
                index=1
            }
        });
        console.log(index);
        if (index==0||arycart[0]=="" ){
            arycart.push(localStorage.objcart);
        }


        console.log(arycart);
        localStorage.arycart=arycart
    }
    $(".num").html(localStorage.cartNumber);
    enlarge();
    return {
        addCarts
    }
})();
