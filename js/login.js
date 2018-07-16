let login=(function ($) {
    let $login = $(".loginTop a"),
        $phone = $(".phone"),
        $login1=$(".contentR>.top>a"),
        $p = $phone.children("p"),
        $forget = $(".forget"),
        $tel = $(".loginBox :first"),
        $email = $(".loginBox li:eq(4)"),
        $emaBtn = $(".email .left"),
        $back = $(".back"),
        $left = $(".left"),
        $right = $(".right"),
        $numBtn = $(".sign input:eq(0)"),
        $enroll = $(".enroll"),
        $forBtn = $phone.eq(4).find(".left"),
        $regBack = $phone.eq(3).find(".left"),
        $select = $("select"),
        $num = $(".tel"),
        $only = $(".only"),
        $entry = $(".entry"),
        $pass = $(".pass"),
        $emailNum = $(".email .num"),
        $address = $(".address"),
        $none = $(".none"),
        $emailA = $(".address a"),
        $i = $(".inputBox i"),
        $em = $(".inputBox em"),
        $emailBtn=$(".sign ul li:eq(3)"),
        MOVE = null,
        UP = null;
    function drag() {
        let maxL = document.documentElement.clientWidth-$phone.outerWidth();
        let maxT = document.body.clientHeight-$phone.outerHeight();
        console.log(maxL,maxT);
        $phone.css({
            left:maxL/2,
            top:maxT/2,
        });
        $p.on("mousedown",down);
        function down(e) {
            var $this = $(this);
            this.x = $phone.offset().left;
            this.y = $phone.offset().top;
            this.mx = e.clientX;
            this.my = e.clientY;
            MOVE = move.bind(this);
            UP = up.bind(this);
            $(document).on("mousemove",MOVE);
            $(document).on("mouseup",UP)
        }
        function move(e) {
            e.preventDefault();
            if (e.target.nodeName.toLowerCase()==="p"){
                let l = e.clientX-this.mx+this.x;
                let t = e.clientY-this.my+this.y;
                l = l>maxL?maxL:l<0?0:l;
                t = t>maxT?maxT:t<0?0:t;
                $phone.css({
                    left:l,
                    top:t,
                })
            }
        }
        function up() {
            $(document).off("mousemove",MOVE);
            $(document).off("mouseup",UP)
        }
    }
    function cli() {
        function upIndex(index1,index2) {
            $phone.eq(index1).css({
                zIndex:999,
            });
            $phone.eq(index2).css({
                zIndex:998
            })
        }
        $login.on("click",function () {
            $phone.show();
            console.log($phone.eq(2));
            $phone.eq(2).css("zIndex",999).siblings().css("zIndex",998)
        });
        $login1.on("click",function () {
            $phone.show();
            console.log($phone.eq(2));
            $phone.eq(2).css("zIndex",999).siblings().css("zIndex",998)
        });
        $tel.on("click",function () {
            $phone.show();
            $phone.eq(0).css("zIndex",999).siblings().css("zIndex",998)
        });
        $email.on("click",function () {
            $phone.show();
            $phone.eq(1).css("zIndex",999).siblings().css("zIndex",998)
        });
        $back.on("click",function () {
            $phone.hide();
        });

        $left.on("click",upIndex.bind(null,2,0));
        $numBtn.on("click",upIndex.bind(null,0,2));
        $enroll.on("click",upIndex.bind(null,3,2));
        $regBack.on("click",upIndex.bind(null,2,3));
        $right.on("click",upIndex.bind(null,3,0));
        $emailBtn.on("click",upIndex.bind(null,1,2));
        $emaBtn.on("click",upIndex.bind(null,2,1));
        $forget.on("click",upIndex.bind(null,4,0));
        $forBtn.on("click",upIndex.bind(null,2,4))
    }
    function input() {
        let reg = /^1[35789]\d{9}/;
        let reg1 =/\w{6,16}/;
        let aHref = "##";
        $only.on("input",function () {
            this.value=this.value.replace(/[^\d+]/,"");
        });
        $num.on("focus",function () {
            $(this).css({
                borderColor:""
            });
            $select.css({
                borderColor:""
            });
            $i.hide();
            $em.hide();
        });
        function color(index,n) {
            $entry.eq(index).on("click",function () {
                if ($num.eq(index).val()===""){
                    $num.eq(index).css({
                        borderColor:"red"
                    });
                    $select.eq(n).css({
                        borderColor:"red"
                    });
                    $pass.eq(index).css("borderColor","");
                    $i.eq(index).show();
                    $em.eq(index).show();
                    $em.eq(index).html("请输入手机号")
                }else if($pass.eq(index).val()==="") {
                    $pass.eq(index).css("borderColor","red");
                    $i.eq(index).show();
                    $em.eq(index).show();
                    $em.eq(index).html("请输入登录密码");
                }else if(!reg.test($num.eq(index).val())){
                    $num.eq(index).css({
                        borderColor:"red"
                    });
                    $select.eq(n).css({
                        borderColor:"red"
                    });
                    $pass.eq(index).css("borderColor","");
                    $i.eq(index).show();
                    $em.eq(index).show();
                    $em.eq(index).html("请输入正确的手机号");
                }else if(!reg1.test($pass.eq(index).val())){
                    $i.eq(index).show();
                    $em.eq(index).show();
                    $em.eq(index).html("手机号或密码错误");
                    $em.eq(index).css("borderColor","");
                    console.log(this.href);
                }else {
                    this.href = this.getAttribute("data-href")
                }
            });
        }
        color(0,0);
        color(2,1);
        function emailFn() {
            let reg1 =/^\w{6,16}/;
            $emailNum.on('keyup',function () {
                if ($emailNum.val().length>0){
                    $address.show();
                    $none.hide();
                    $emailA.eq(0).html($emailNum.val()+"@163.com");
                    $emailA.eq(1).html($emailNum.val()+"@126.com");
                    $emailA.eq(2).html($emailNum.val()+"@yeah.net");
                    $emailA.eq(3).html($emailNum.val()+"@vip.163.com");
                    $emailA.eq(4).html($emailNum.val()+"@vip.126.com");
                    $emailA.eq(5).html($emailNum.val()+"@188.com")
                }else {
                    $address.hide();
                    $none.show();
                }
            });
            $emailA.on("click",function () {
                $emailNum[0].value = $(this).html();
                $address.hide();
                $none.show();
            });
            $entry.eq(1).on("click",function () {
                if ($num.eq(1).val()===""){
                    $num.eq(1).css({
                        borderColor:"red"
                    });
                    $pass.eq(1).css("borderColor","");
                    $i.eq(1).show();
                    $em.eq(1).show();
                    $em.eq(1).html("请输入邮箱账号")
                }else if($pass.eq(1).val()==="") {
                    $pass.eq(1).css("borderColor","red");
                    $i.eq(1).show();
                    $em.eq(1).show();
                    $em.eq(1).html("请输入登录密码");
                }else if(!reg1.test($pass.eq(1).val())){
                    $i.eq(1).show();
                    $em.eq(1).show();
                    $em.eq(1).html("账号或密码错误");
                    $em.eq(1).css("borderColor","");
                    console.log(this.href);
                }else {
                    this.href = this.getAttribute("data-href")
                }
            })

        }
        emailFn()
    }
    return {
        drag:drag,
        cli:cli,
        input:input
    }
})(jQuery);
login.cli();
login.drag();
login.input();