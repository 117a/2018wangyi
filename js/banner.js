let $banner = $("#banner"),
    $ul = $(".list"),
    $lis = $ul.children("li"),
    $tip = $(".tip"),
    $tips = $tip.children("li"),
    $arrow = $(".arrow"),
    $arrowL = $(".arrowL"),
    $arrowR = $(".arrowR"),
    index = 0,
    timert = null;

$lis.eq(0).css({zIndex: 1});
$lis.eq(0).animate({opacity: 1});
$tips.eq(0).addClass('select');

function autoPlay() {
    timert = window.setInterval(function () {
        index == $lis.length - 1 ? index = 0 : index++;
        change();
    }, 3000)
}
autoPlay();

function change() {
    $lis.eq(index).css({zIndex: 1}).siblings().css({zIndex: 0});
    $lis.eq(index).animate({opacity: 1}, 1000, 'linear').siblings().animate({opacity: 0});
    $tips.eq(index).addClass('select').siblings().removeClass('select');
}

$banner.on("mouseover", function () {
    window.clearInterval(timert);
    $arrow.show();
});
$banner.on("mouseout", function () {
    autoPlay();
    $arrow.hide();
});

$arrowL.on("click", function () {
    index == 0 ? index = $lis.length - 1 : index--;
    change();
});

$arrowR.on("click", function () {
    index == $lis.length - 1? index = 0:index++;
    change();
});

$tips.on("click",function () {
    let $this = $(this);
    index = $this.index();
    change();
});