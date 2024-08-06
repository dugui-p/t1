var hidePager = true;
var pageSize = 20;
var page;
var lotteryTime;
var templateCode;
var needRndNum = "0";//是否启用随机数，0=不启用，1=启用
var ftType = 0;
var resultUrl = "/ResultHistory/Lotteryresult?lotterytype=" + page + "&lotteryTime=" + lotteryTime;
var _pager = myPager("pager", pageSize);
$(document).ready(function () {
    if (hidePager) {
        $("#pager").hide();
    }
    _pager.loadData(resultUrl, {
        start: 1,
        rows: pageSize,
        query: "",
    }, function (resp) {
        loadLotteryList(resp["data"]);
    });
    // $("#pageloading").hide();
    $("#lottery option").each(function () {
        var choose = page;
        if ($(this).val() == choose) {
            $(this).attr("selected", "selected");
        }
    });
    $("#hasDatepicker").change(change).datepicker();
});



function lotChange() {

    var type = $("#lottery").find("option[value='" + $('#lottery').val() + "']").attr("type");
    location.href = '/ResultHistory/Index?page=' + $('#lottery').val() + "&lotteryTime=" + (type == "TW4S" ? "" : ($("#hasDatepicker").val() == undefined ? '' : $("#hasDatepicker").val()));
}

function change() {
    location.href = '/ResultHistory/Index?page=' + $('#lottery').val() + "&lotteryTime=" + ($("#hasDatepicker").val() == undefined ? '' : $("#hasDatepicker").val());
}


function loadLotteryList(jarray) {
    var html = "";
    var rowsProcess = 0;
    var resultList = $("#betList").empty();
    if (templateCode == "HK6" || templateCode == "LHC") {
        jarray = jarray;
        for (var index = 0; index < jarray.length; index++) {
            var oResult = jarray[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.Installments));
            tr.append($("<td>").addClass("drawTime").text(oResult.dayweek).attr("nowrap", true));
            if (oResult.Status == 1) {
                if (oResult.OpenResult == '') {
                    tr.append($("<td>").attr("colspan", 26).text(""));
                    continue;
                }
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Ping1).text(oResult.Ping1)));
                tr.append($("<td>").addClass("name").text(oResult.p1sx));
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Ping2).text(oResult.Ping2)));
                tr.append($("<td>").addClass("name").text(oResult.p2sx));
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Ping3).text(oResult.Ping3)));
                tr.append($("<td>").addClass("name").text(oResult.p3sx));
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Ping4).text(oResult.Ping4)));
                tr.append($("<td>").addClass("name").text(oResult.p4sx));
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Ping5).text(oResult.Ping5)));
                tr.append($("<td>").addClass("name").text(oResult.p5sx));
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Ping6).text(oResult.Ping6)));
                tr.append($("<td>").addClass("name").text(oResult.p6sx));
                tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + oResult.Tema).text(oResult.Tema)));
                tr.append($("<td>").addClass("name").text(oResult.sx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.tds]).text(oResult.tds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.tdx]).text(oResult.tdx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.tdzx]).text(oResult.tdzx));
                tr.append($("<td>").addClass("name " + trendClass[getTwdx(oResult.Tema)]).text(getTwdx(oResult.Tema)));
                tr.append($("<td>").addClass("name " + trendClass[oResult.hds]).text(oResult.hds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.hdx]).text(oResult.hdx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.htwds]).text(oResult.htwds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.sumMa]).text(oResult.sumMa));
                tr.append($("<td>").addClass("name " + trendClass[oResult.zds]).text(oResult.zds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.zdx]).text(oResult.zdx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.tmcolor]).text(oResult.tmcolor));
            }
            else {
                tr.append($("<td>").attr("colspan", 26).text("官方停售,奖期取消"));
            }
        }
    }
    else if (templateCode == "F36X7" || templateCode == "F31X7") {
        jarray = jarray;
        for (var index = 0; index < jarray.length; index++) {
            var oResult = jarray[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.installments));
            tr.append($("<td>").addClass("drawTime").text(oResult.dayweek).attr("nowrap", true));
            if (oResult.status == 1) {
                if (oResult.openResult == '' || oResult.openResult == null) {
                    tr.append($("<td>").attr("colspan", 26).text(""));
                    continue;
                }
                var balls = oResult.openResult.split(',');
                if (templateCode == "F36X7") {
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[0]).text(balls[0])));
                    tr.append($("<td>").addClass("name").text(oResult.p1sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[1]).text(balls[1])));
                    tr.append($("<td>").addClass("name").text(oResult.p2sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[2]).text(balls[2])));
                    tr.append($("<td>").addClass("name").text(oResult.p3sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[3]).text(balls[3])));
                    tr.append($("<td>").addClass("name").text(oResult.p4sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[4]).text(balls[4])));
                    tr.append($("<td>").addClass("name").text(oResult.p5sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[5]).text(balls[5])));
                    tr.append($("<td>").addClass("name").text(oResult.p6sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[6]).text(balls[6])));
                    tr.append($("<td>").addClass("name").text(oResult.p7sx));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[7]).text(balls[7])));
                    tr.append($("<td>").addClass("name").text(oResult.sx));
                } else {
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[0]).text(balls[0])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[1]).text(balls[1])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[2]).text(balls[2])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[3]).text(balls[3])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[4]).text(balls[4])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[5]).text(balls[5])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[6]).text(balls[6])));
                    tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + balls[7]).text(balls[7])));
                }
                tr.append($("<td>").addClass("name " + trendClass[oResult.tds]).text(oResult.tds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.tdx]).text(oResult.tdx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.htwds]).text(oResult.htwds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.hds]).text(oResult.hds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.hdx]).text(oResult.hdx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.sumMa]).text(oResult.sumMa));
                tr.append($("<td>").addClass("name " + trendClass[oResult.zds]).text(oResult.zds));
                tr.append($("<td>").addClass("name " + trendClass[oResult.zdx]).text(oResult.zdx));
                tr.append($("<td>").addClass("name " + trendClass[oResult.tmcolor]).text(oResult.tmcolor));
            }
            else {
                tr.append($("<td>").attr("colspan", 26).text("官方停售,奖期取消"));
            }
        }
    }
    else if (templateCode == "QXC" || templateCode == "PL5") {
        for (var index = 0; index < jarray.Records.length; index++) {
            var oResult = jarray.Records[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.Installments));
            tr.append($("<td>").addClass("drawTime").text(oResult.LotteryTime.split(" ")[0] + " (星期" + oResult.dayweek.split(" ")[1] + ")").attr("nowrap", true));
            var balls = [];
            if (oResult.Status == 1) {
                if (oResult.OpenResult == '') {
                    tr.append($("<td>").attr("colspan", 26).text(""));
                    continue;
                }
                var sum = 0;
                balls = oResult.OpenResult.split(',');

                for (var i = 0; i < balls.length; i++) {
                    var ball = $("<td>").append($("<span>").addClass("ico b" + Number(balls[i])).text(Number(balls[i])));
                    tr.append(ball);
                }
                var trend = [];

                var qian = Number(balls[0]), bai = Number(balls[1]), shi = Number(balls[2]), ge = Number(balls[3]);


                var q = qian % 2 == 0 ? "双" : "单";
                var b = bai % 2 == 0 ? "双" : "单";
                var s = shi % 2 == 0 ? "双" : "单";
                var g = ge % 2 == 0 ? "双" : "单";

                var qb = (qian + bai) % 2 == 0 ? "双" : "单";
                var qs = (qian + shi) % 2 == 0 ? "双" : "单";
                var qg = (qian + ge) % 2 == 0 ? "双" : "单";
                var bs = (bai + shi) % 2 == 0 ? "双" : "单";
                var bg = (bai + ge) % 2 == 0 ? "双" : "单";
                var sg = (shi + ge) % 2 == 0 ? "双" : "单";

                trend.push(q);
                trend.push(b);
                trend.push(s);
                trend.push(g);

                trend.push(qb);
                trend.push(qs);
                trend.push(qg);
                trend.push(bs);
                trend.push(bg);
                trend.push(sg);


                trend.forEach(function (val, idx) {
                    tr.append($("<td>").append($("<span>").addClass(trendClass[val]).text(val)));
                })
            }
            else {
                tr.append($("<td>").attr("colspan", 26).text("官方停售,奖期取消"));
            }
        }
    }
    else if (templateCode == "VNDLT") {
        for (var index = 0; index < jarray.Records.length; index++) {
            var oResult = jarray.Records[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.Installments));
            tr.append($("<td>").addClass("drawTime").text(oResult.LotteryTime.split(" ")[0] + " (星期" + oResult.dayweek.split(" ")[1] + ")").attr("nowrap", true));
            var balls = [];
            if (oResult.Status == 1) {
                if (oResult.OpenResult == '') {
                    tr.append($("<td>").attr("colspan", 26).text(""));
                    continue;
                }
                var sum = 0;
                balls = oResult.OpenResult.split(',');
                oResult.Ping1 = balls.slice(0, 4);
                tr.append($("<td>").append($("<span>").text(oResult.Ping1)));
                oResult.Ping2 = balls.slice(4, 7);
                tr.append($("<td>").append($("<span>").text(oResult.Ping2)));
                oResult.Ping3 = balls.slice(7, 13);
                tr.append($("<td>").append($("<span>").text(oResult.Ping3)));
                oResult.Ping4 = balls.slice(13, 17);
                tr.append($("<td>").append($("<span>").text(oResult.Ping4)));
                oResult.Ping5 = balls.slice(17, 23);
                tr.append($("<td>").append($("<span>").text(oResult.Ping5)));
                oResult.Ping6 = balls.slice(23, 25);
                tr.append($("<td>").append($("<span>").text(oResult.Ping6)));
                oResult.Ping7 = balls.slice(25, 26);
                tr.append($("<td>").append($("<span>").text(oResult.Ping7)));
                oResult.Ping8 = balls.slice(26, 27);
                tr.append($("<td>").append($("<span>").text(oResult.Ping8)));
            }
            else {
                tr.append($("<td>").attr("colspan", 26).text("官方停售,奖期取消"));
            }
        }
    }
    else if (templateCode == "FT") {
        jarray = jarray.Records;
        for (var index = 0; index < jarray.length; index++) {
            var oResult = jarray[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.LeagueName));
            tr.append($("<td>").addClass("period").text(oResult.TeamHome + " vs " + oResult.TeamAway));
            tr.append($("<td>").addClass("drawTime").text(oResult.StartTime).attr("nowrap", true));
            var balls = [];
            if (oResult.Status == 1) {
                tr.append($("<td>").append($("<span>").text(oResult.Score_home + ":" + oResult.Score_away)));
                tr.append($("<td>").append($("<span>").text(oResult.Score_half_h + ":" + oResult.Score_half_a)));
            }
            else {
                tr.append($("<td>").attr("colspan", 2).text("官方停售,奖期取消"));
            }
        }
    }
    else if (templateCode == "PL3") {
        for (var index = 0; index < jarray.Records.length; index++) {
            var oResult = jarray.Records[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.Installments));
            tr.append($("<td>").addClass("drawTime").text(oResult.LotteryTime.split(" ")[0] + " (星期" + oResult.dayweek.split(" ")[1] + ")").attr("nowrap", true));
            var balls = [];
            if (oResult.Status == 1) {
                if (oResult.OpenResult == '') {
                    tr.append($("<td>").attr("colspan", 26).text(""));
                    continue;
                }
                var sum = 0;
                balls = oResult.OpenResult.split(',');

                for (var i = 0; i < balls.length; i++) {
                    var ball = $("<td class='name'>").append($("<span>").addClass("b" + Number(balls[i])).text(Number(balls[i])));
                    tr.append(ball);
                }
                var trend = [];

                var bai = Number(balls[0]), shi = Number(balls[1]), ge = Number(balls[2]);
                var zhishu = [1, 2, 3, 5, 7];

                var bsghs = bai + shi + ge;

                var max = Math.max.apply(null, balls);
                var min = Math.min.apply(null, balls);
                var kd = Number(max) - Number(min);

                var bdx = bai > 4 ? "大" : "小";
                var bds = bai % 2 == 0 ? "双" : "单";
                var bzh = zhishu.indexOf(bai) > -1 ? "质" : "合";

                var sdx = shi > 4 ? "大" : "小";
                var sds = shi % 2 == 0 ? "双" : "单";
                var szh = zhishu.indexOf(shi) > -1 ? "质" : "合";

                var gdx = ge > 4 ? "大" : "小";
                var gds = ge % 2 == 0 ? "双" : "单";
                var gzh = zhishu.indexOf(ge) > -1 ? "质" : "合";



                trend.push(bsghs);
                trend.push(kd);

                trend.push(bdx);
                trend.push(bds);
                trend.push(bzh);

                trend.push(sdx);
                trend.push(sds);
                trend.push(szh);

                trend.push(gdx);
                trend.push(gds);
                trend.push(gzh);

                trend.forEach(function (val, idx) {
                    tr.append($("<td>").append($("<span>").addClass(trendClass[val]).text(val)));
                })
            }
            else {
                tr.append($("<td>").attr("colspan", 26).text("官方停售,奖期取消"));
            }
        }
    }
    else {
        for (var index = 0; index < jarray.Records.length; index++) {
            var oResult = jarray.Records[index];
            if (oResult.Status == 0) {
                continue;
            }
            var tr = $("<tr>").appendTo(resultList);
            tr.append($("<td>").addClass("period").text(oResult.Installments));
            tr.append($("<td>").addClass("drawTime").text(oResult.dayweek).attr("nowrap", true));
            var balls = [];
            if (oResult.Status == 1) {
                if (oResult.OpenResult == '') {
                    tr.append($("<td>").attr("colspan", 26).text(""));
                    continue;
                }
                var sum = 0;
                balls = oResult.OpenResult.split(',');
                if (templateCode == "K3" || templateCode == "BJK8") {
                    balls.sort(function (a, b) {
                        return a - b;
                    })
                }
                if (templateCode == "BINGO" || templateCode == "BINGOFT") {
                    balls = balls.slice(0, 5);
                }
                for (var i = 0; i < balls.length; i++) {
                    if (templateCode == "BINGOFT") {
                        var ball = $("<td>").append($("<span>").text(Number(balls[i])));
                        tr.append(ball);
                        var ft = 1 * balls[i] % 4;
                        ft = ft == 0 ? 4 : ft;
                        tr.append($("<td>").addClass("name").append($("<span>").addClass("ico b" + ft).text(ft)));
                        var ds = ft % 2 == 0 ? "双" : "单";
                        tr.append($("<td>").append($("<span>").addClass(trendClass[ds]).text(ds)));
                        var dx = ft > 2 ? "大" : "小";
                        tr.append($("<td>").append($("<span>").addClass(trendClass[dx]).text(dx)));
                    }
                    else {
                        var ball = $("<td>").addClass("name").append($("<span>").addClass("ico b" + Number(balls[i])).text(Number(balls[i])));
                        tr.append(ball);
                        if (templateCode == "BINGO") {
                            var ds = Number(balls[i]) % 2 == 0 ? "双" : "单";
                            tr.append($("<td>").append($("<span>").addClass(trendClass[ds]).text(ds)));
                            var dx = Number(balls[i]) > 40 ? "大" : "小";
                            tr.append($("<td>").append($("<span>").addClass(trendClass[dx]).text(dx)));
                            var ws = Number(balls[i]) % 10;
                            var wdx = ws >= 5 ? "尾大" : "尾小";
                            tr.append($("<td>").append($("<span>").addClass(trendClass[wdx]).text(wdx)));
                            var hs = Math.trunc(Number(balls[i] / 10));
                            var hds = (hs + ws) % 2 == 0 ? "双" : "单";
                            tr.append($("<td>").append($("<span>").addClass(trendClass[hds]).text(hds)));

                            if (flsx.f.indexOf(Number(balls[i])) != -1) {
                                tr.append($("<td>").append($("<span>").addClass('flsx').text('福')));
                            }
                            else if (flsx.l.indexOf(Number(balls[i])) != -1) {
                                tr.append($("<td>").append($("<span>").addClass('flsx').text('禄')));
                            }
                            else if (flsx.s.indexOf(Number(balls[i])) != -1) {
                                tr.append($("<td>").append($("<span>").addClass('flsx').text('寿')));
                            }
                            else {
                                tr.append($("<td>").append($("<span>").addClass('flsx').text('喜')));
                            }
                        }
                        sum += Number(balls[i]);//总和

                    }
                }
                //随机数 如果有
                // console.log("templateCode=" + templateCode + "needRndNum=" + needRndNum)
                if (needRndNum == "1") {
                    if (oResult.RndNum != null && oResult.RndNum != undefined) {
                        var ball = $("<td>").addClass("name").text("" + oResult.RndNum);
                        tr.append(ball);
                    } else {
                        var ball = $("<td>").addClass("name").text("");
                        tr.append(ball);
                    }
                }

                var trend = [];
                if (templateCode == "PK10") {
                    sum = Number(balls[0]) + Number(balls[1]);
                    var zhdx = sum > 11 ? "大" : "小";
                    var zhds = sum % 2 == 0 ? "双" : "单";
                    trend.push(sum);
                    trend.push(zhdx);
                    trend.push(zhds);
                    for (var i = 0; i < 5; i++) {
                        trend.push(Number(balls[i]) > Number(balls[9 - i]) ? "龙" : "虎");
                    }
                }
                if (templateCode == "SSC") {
                    var zhdx = sum > 22 ? "大" : "小";
                    var zhds = sum % 2 == 0 ? "双" : "单";
                    trend.push(sum);
                    trend.push(zhdx);
                    trend.push(zhds);
                    trend.push(Number(balls[0]) == Number(balls[4]) ? "和" : (Number(balls[0]) > Number(balls[4]) ? "龙" : "虎"));
                    trend.push(qzhFn(Number(balls[0]), Number(balls[1]), Number(balls[2])));
                    trend.push(qzhFn(Number(balls[1]), Number(balls[2]), Number(balls[3])));
                    trend.push(qzhFn(Number(balls[2]), Number(balls[3]), Number(balls[4])));
                }
                if (templateCode == "PCDD") {
                    trend.push(sum);
                    var zh = "";
                    if (sum == 13) {
                        trend.push("小和");
                        trend.push("单和");
                        zh = "小单和"
                    } else if (sum == 14) {
                        trend.push("大和");
                        trend.push("双和");
                        zh = "大双和"
                    } else {
                        trend.push(sum < 13 ? "小" : "大");
                        trend.push(sum % 2 == 0 ? "双" : "单");
                        zh = (sum < 13 ? "小" : "大") + (sum % 2 == 0 ? "双" : "单");
                    }
                    if (sum < 6) {
                        trend.push("极小");
                        jizhics = "jdxs";
                    }
                    else if (sum > 21) {
                        trend.push("极大");
                        jizhics = "jdxd";
                    } else {
                        trend.push("--");
                    }
                    trend.push(zh);
                    if (Number(balls[0]) == Number(balls[1]) && Number(balls[1]) == Number(balls[2])) {
                        trend.push("豹子");
                    } else {
                        trend.push("--");
                    }
                }
                if (templateCode == "KL10") {
                    trend.push(sum);
                    if (sum == 84) {
                        trend.push("和");
                    } else {
                        trend.push(sum > 84 ? "大" : "小");
                    }
                    trend.push(sum % 2 == 0 ? "双" : "单");
                    trend.push(sum % 10 >= 5 ? "尾大" : "尾小");
                    for (var i = 0; i < 4; i++) {
                        trend.push(Number(balls[i]) > Number(balls[7 - i]) ? "龙" : "虎");
                    }
                }
                if (templateCode == "K3") {
                    for (var i = 0; i < 3; i++) {
                        trend.push(yxx[balls[i]]);
                    }
                    trend.push(sum);
                    if (Number(balls[0]) == Number(balls[1]) && Number(balls[1]) == Number(balls[2])) {
                        trend.push("通吃");
                    } else {
                        trend.push(sum > 10 ? "大" : "小");
                    }
                }
                if (templateCode == "GXK10") {
                    trend.push(sum);
                    if (sum == 55) {
                        trend.push("和");
                    }
                    else {
                        trend.push(sum > 55 ? "大" : "小");
                    }
                    trend.push(sum % 2 == 0 ? "双" : "单");
                    trend.push(sum % 10 >= 5 ? "尾大" : "尾小");
                    trend.push(Number(balls[0]) > Number(balls[4]) ? "龙" : "虎");
                }
                if (templateCode == "BJK8") {
                    trend.push(sum);
                    if (sum == 810) {
                        trend.push("和");
                        trend.push("和");
                    } else {
                        trend.push(sum > 810 ? "大" : "小");
                        trend.push(sum % 2 == 0 ? "双" : "单");
                    }
                    trend.push(wxFn(sum));
                    var dsh_dCount = 0, dsh_sCount = 0, qhh_qCount = 0, qhh_hCount = 0
                    balls.forEach(function (data, index, arr) {
                        if (data % 2 == 0) {
                            dsh_sCount++;
                        }
                        else {
                            dsh_dCount++;
                        }

                        if (data > 40) {
                            qhh_hCount++;
                        } else {
                            qhh_qCount++;
                        }
                    });
                    if (qhh_qCount == qhh_hCount) {
                        trend.push("前后(和)");
                    } else {
                        trend.push(qhh_qCount > qhh_hCount ? "前(多)" : "后(多)");
                    }
                    if (dsh_sCount == dsh_dCount) {
                        trend.push("单双(和)");
                    } else {
                        trend.push(dsh_sCount > dsh_dCount ? "双(多)" : "单(多)");
                    }

                }
                if (templateCode == "11X5") {
                    trend.push(sum);
                    if (sum == 30) {
                        trend.push("和");
                    } else {
                        trend.push(sum > 30 ? "大" : "小");
                    }
                    trend.push(sum % 2 == 0 ? "双" : "单");
                    trend.push(sum % 10 > 4 ? "尾大" : "尾小");
                    trend.push(Number(balls[0]) > Number(balls[4]) ? "龙" : "虎");
                    balls.forEach(function (val, idx) {
                        if (Number(val) == 11) {
                            trend.push("和");
                        } else {
                            trend.push(Number(val) > 5 ? "大" : "小");
                        }
                    });

                }
                if (templateCode == "FANT") {
                    if (ftType == 0) {
                        //pk10类番摊 10个号码
                        if (balls.length == 10) {
                            sum = Number(balls[0]) + Number(balls[1]) + Number(balls[2]);
                        } else if (balls.length == 8) {
                            sum = Number(balls[0]);
                        } else {
                            sum = Number(balls[0]) + Number(balls[1]) + Number(balls[2]);
                        }
                    }
                    else if (ftType == 1) {
                        if (balls.length == 10) {
                            sum = Number(balls[4]) + Number(balls[5]) + Number(balls[6]);
                        } else if (balls.length == 8) {
                            sum = Number(balls[4]);
                        }
                        else {
                            sum = Number(balls[0]) + Number(balls[1]) + Number(balls[2]) + Number(balls[3]);
                        }
                    }
                    else if (ftType == 2) {
                        if (balls.length == 10) {
                            sum = Number(balls[7]) + Number(balls[8]) + Number(balls[9]);
                        } else if (balls.length == 8) {
                            sum = Number(balls[balls.length - 1]);
                        }
                        else {
                            sum = Number(balls[0]) + Number(balls[1]) + Number(balls[2]) + Number(balls[3]) + Number(balls[4]);
                        }
                    }
                    var fa = sum % 4;
                    var ds = fa % 2 == 0 ? "双" : "单";
                    var dx = fa == 1 || fa == 2 ? "小" : "大";
                    var fantZhong = ["123中", "124中", "134中", "234中"];
                    var zhong = [];
                    fantZhong.forEach(function (value, index, array) {
                        if (value.indexOf(fa == 0 ? 4 : fa) > -1) {
                            zhong.push(value);
                        }
                    });

                    //时时彩类番摊 5个号码
                    if (balls.length == 5) {
                        var tieArr = "";
                        var ballStr = "";
                        if (ftType == 0) {
                            tieArr = ",000,111,222,333,444,555,666,777,888,999,";
                            ballStr = balls[0] + '' + balls[1] + '' + balls[2];
                        } else if (ftType == 1) {
                            tieArr = ",0000,1111,2222,3333,4444,5555,6666,7777,8888,9999,";
                            ballStr = balls[0] + '' + balls[1] + '' + balls[2] + '' + balls[3];
                        } else if (ftType == 2) {
                            tieArr = ",00000,11111,22222,33333,44444,55555,66666,77777,88888,99999,";
                            ballStr = balls[0] + '' + balls[1] + '' + balls[2] + '' + balls[3] + '' + balls[4];
                        }

                        if (tieArr && tieArr.indexOf(ballStr) > -1) {
                            ds = "和";
                            dx = "和";
                            zhong.splice(0, zhong.length);
                            zhong.push("和");
                        }
                    }

                    trend.push(sum);
                    trend.push(fa);
                    trend.push(fa == 0 ? 4 : fa);
                    trend.push(zhong.join(','));
                    trend.push(ds);
                    trend.push(dx);
                }
                if (templateCode == "BINGO") {
                    trend.push(sum);
                    trend.push(sum % 2 == 0 ? "双" : "单");
                    trend.push(sum >= 203 ? "大" : "小");
                    trend.push(sum % 10 >= 5 ? "尾大" : "尾小");
                    trend.push(Number(balls[0]) > Number(balls[4]) ? "龙" : "虎");
                }
                if (templateCode == "BINGOFT") {

                }
                trend.forEach(function (val, idx) {
                    tr.append($("<td>").append($("<span>").addClass(trendClass[val]).text(val)));
                })
            }

            else {
                tr.append($("<td>").attr("colspan", 41).text("官方停售,奖期取消"));
            }
        }
    }
    bindingHover();
}

var trendClass = {
    "大": "dx_d",
    "小": "dx_x",
    "和": "dx_h",
    "双": "ds_s",
    "单": "ds_d",
    "龙": "lh_l",
    "虎": "lh_h",
    "小和": "zhh",
    "单和": "zhh",
    "大和": "zhh",
    "双和": "zhh",
    "极小": "jdxs",
    "极大": "jdxd",
    "豹子": "bz",
    "尾小": "wdx_x",
    "尾大": "wdx_d",
    "鱼": "yu",
    "虾": "xia",
    "葫芦": "hulu",
    "金钱": "jingqian",
    "螃蟹": "xie",
    "鷄": "ji",
    "通吃": "dx_h",
    "前后(和)": "qhh_hh",
    "前(多)": "qhh_q",
    "后(多)": "qhh_h",
    "单双(和)": "dsh_h",
    "双(多)": "dsh_s",
    "单(多)": "dsh_d",
    "红": "red02",
    "蓝": "blue02",
    "绿": "green02",
    "小单和": "zhh",
    "大双和": "zhh",
    "小单": "zh_xd",
    "小双": "zh_xs",
    "大单": "zh_dd",
    "大双": "zh_ds",
    "质":"zh_z"
}

var qzhFn = function (num1, num2, num3) {
    var qzh = new Array(num1, num2, num3)
    qzh.sort();
    if (qzh[0] == qzh[1] && qzh[1] == qzh[2]) {
        return "豹子";
    }
    else if ((qzh[0] == qzh[1] && qzh[1] != qzh[2]) || (qzh[1] == qzh[2] && qzh[0] != qzh[2])) {
        return "对子";
    }
    else if ((qzh[2] - qzh[1] == 1 && qzh[1] - qzh[0] == 1) || (qzh[0] == 0 && qzh[1] == 8 && qzh[2] == 9) || (qzh[0] == 0 && qzh[1] == 1 && qzh[2] == 9)) {
        return "顺子";
    }
    else if ((qzh[2] - qzh[1] == 1 && qzh[1] - qzh[0] > 1) || (qzh[2] - qzh[1] > 1 && qzh[1] - qzh[0] == 1) || (qzh[0] == 0 && qzh[2] == 9 && qzh[1] != 1)) {
        return "半顺";
    }
    else {
        return "杂六";
    }
}

var yxx = {
    1: "鱼",
    2: "虾",
    3: "葫芦",
    4: "金钱",
    5: "螃蟹",
    6: "鷄",
}

//金（210～695）、木（696～763）、水（764～855）、火（856～923）和土（924～1410）
var wxFn = function (sum) {
    if (sum <= 695) {
        return "金";
    } else if (sum >= 696 && sum <= 763) {
        return "木";
    } else if (sum >= 764 && sum <= 855) {
        return "水";
    } else if (sum >= 856 && sum <= 923) {
        return "火";
    } else if (sum >= 924) {
        return "土";
    }
}

function getTwdx(tm) {
    var d = [5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 35, 36, 37, 38, 39, 45, 46, 47, 48];
    var x = [1, 2, 3, 4, 10, 20, 30, 40, 11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];
    tm = tm - 0;

    for (var index = 0; index < d.length; index++) {
        if (d[index] == tm) {
            return "大";
        }
    }
    for (var index = 0; index < x.length; index++) {
        if (x[index] == tm) {
            return "小";
        }
    }
    return "和";
}

var flsx = {
    f: [1, 2, 3, 4, 5, 21, 22, 23, 24, 25, 41, 42, 43, 44, 45, 61, 62, 63, 64, 65],//福
    l: [6, 7, 8, 9, 10, 26, 27, 28, 29, 30, 46, 47, 48, 49, 50, 66, 67, 68, 69, 70],//禄
    s: [11, 12, 13, 14, 15, 31, 32, 33, 34, 35, 51, 52, 53, 54, 55, 71, 72, 73, 74, 75],//寿
    x: [16, 17, 18, 19, 20, 36, 37, 38, 39, 40, 56, 57, 58, 59, 60, 76, 77, 78, 79, 80]//喜
}

var pl3Fn = {
    z: [1, 2, 3, 5, 7],//质数
    h: [0, 4, 6, 8, 9],//合数
}