let musicIndex = (function () {
    let oUl = document.getElementsByClassName("oUl");
    $musicPlay = $(".musicPlay");


    let $audio = $("#audio")[0],
        $song = $(".song"),
        $songTime = $(".songTime"),
        $runTime = $(".runTime"),
        $innerL = $(".innerL"),
        $btn = $(".btn");

//点击音乐按钮的功能
    $musicPlay.on("click", function () {
        if (!$musicPlay.hasClass("stop")) {
            $audio.play();
            $musicPlay.addClass('stop');
            $song.show();
            $songTime.show();
            setTime();
        } else {
            $audio.pause();
            $musicPlay.removeClass('stop');
            clearInterval(timer);
        }
    });

//处理播放时间
    function setTime() {
        timer = window.setInterval(function () {
            let runT = computedTime($audio.currentTime);
            let percent = $audio.currentTime / $audio.duration;
            $innerL.css({width: `${percent * 100}%`});
            $btn.css({left: `${percent * 100}%`});
            $runTime.html(runT + "/" + computedTime($audio.duration));
            if ($audio.duration == $audio.currentTime) {
                clearInterval(timer);
                $musicPlay.removeClass('stop');
            }
        }, 300);
    }

//处理播放时间的格式
    function computedTime(time) {
        //把时间处理成00:00格式
        let m = Math.floor(time / 60);
        let s = Math.floor(time - m * 60);
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;
    }
    // 拖拽
    $(function ($) {
        let dragStart = function (e) {
            //按下时需要记录btn按钮的位置以及鼠标的坐标
            this.x = $(this).offset().left;//盒子的左偏移量
            this.mx = e.clientX;//鼠标的坐标
            this.DRAG_MOVE = dragMove.bind(this);
            this.DRAG_UP = dragUp.bind(this);
            $audio.pause();
            $(document).on("mousemove", this.DRAG_MOVE);
            $(document).on("mouseup", this.DRAG_UP);
        };

        let dragMove = function (e) {
            //btn按钮现在的位置 = 之前的位置+鼠标移动的距离（现在鼠标的坐标-按下时鼠标的坐标）
            let posX = this.x + (e.clientX - this.mx - 418);
            posX = 0>posX?posX=0:(posX>500?500:posX);
            $(this).css({left: posX});
            $audio.currentTime = (posX/$audio.duration)*100;
        };

        let dragUp = function () {
            $audio.play();
            $(document).off("mousemove", this.DRAG_MOVE);
            $(document).off("mouseup", this.DRAG_UP);
        };

        $("#btn").on("mousedown", dragStart)
    });
    function change() {
        console.log(1);
        for (var i = 0; i < oUl.length; i++) {
            let oLis = oUl[i].querySelectorAll("li");
            for (var j = 0; j < oLis.length; j++) {
                oLis[j].className = j % 2 == 0 ? 'bg1' : 'bg2';
            }
        }
    }

    let arrowL = document.getElementById("arrowL"),
        arrowR = document.getElementById("arrowR"),
        list = document.getElementById("list"),
        lis = list.getElementsByTagName("li"),
        step = 0,
        first = lis[0].cloneNode(true);
    list.appendChild(first);

    utils.css(list, "width", lis.length * lis[0].offsetWidth);
    function handleArrow() {
        arrowL.onclick = function () {
            step--;
            if (step < 0) {
                //立马到最后一张
                list.style.left = -(lis.length - 1) * 624 + "px";
                step = lis.length - 2;//紧接着走到倒数第二张
            }
            animate(list, {left: -step * 624}, 700, 0);
        };
        arrowR.onclick = function () {
            step++;
            if (step === lis.length) {
                list.style.left = 0; //瞬间移动到第一张
                step = 1;// 紧接着移动到第二张
            }
            animate(list, {left: -step * 624}, 700);
        }
    }
    let oTop = document.getElementsByClassName("backTop")[0];
    function btnDisplay(){
        var scrollT = utils.win("scrollTop");
        if(scrollT>=100){
            utils.css(oTop,"display","block");
        }else{
            utils.css(oTop,"display","none");
        }
    }
    var duration = 500;
    var interval = 15;
    //var timer = null;//不推荐
    oTop.onclick = function(){
        clearInterval(this.timer);
        window.onscroll = null;
        var pos = utils.win("scrollTop");
        var step = interval/duration*pos;
        this.timer = window.setInterval(function(){
            pos-=step;
            if(pos<=0){
                utils.win("scrollTop",0);
                clearInterval(oTop.timer);
                window.onscroll = scroll;
                return;
            }
            utils.win("scrollTop",pos);
        },interval);
    };
    function scroll(){
        btnDisplay();
    }
    window.onscroll = scroll;
    window.onmousewheel = function(){
        clearInterval(oTop.timer);
    };

    return {
        init(){
            change();
            handleArrow();
        }
    }
})();
musicIndex.init();