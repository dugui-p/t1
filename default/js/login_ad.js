$(function () {
    $(".login_ad").show();
    // 获取当前日期时间对象
    var now = new Date();
    // 设置秒数和毫秒数为0
    now.setSeconds(0, 0);
    // 获取时间戳（精确到分钟）
    var timestamp = Math.floor(now.getTime() / 1000);
    $(".login_ad").html("<a href=\"https://nizb.xyz/24D7h\" target=\"_blank\"><img src=\"//img-qwzb.yzzb.xyz/qwzb_ad_b6806352a/login_ad_cr.png?_=" + timestamp + "\" /></a>");
});