// 弹窗提示
var Dialog = {
    Close: function (obj) {
        try {
            window.$('#dialog').dialog("close").remove();
        } catch (e) {

        }
        try {
            window.top.$('#dialog').dialog("close").remove();
        } catch (e) {

        }
    },
    _show: function (title, html, _buttons, minWidth, minHeight, cls) {
        Dialog.Close();
        var $div = window.$('<div id="dialog"></div>');
        $div.html('<div class="dialog-html"><span class="img"></span>' + html + '</div>');
        $div.dialog({
            resizable: false,
            modal: true,
            buttons: _buttons,
            title: title,
            dialogClass: cls,
            minWidth: minWidth,
            minHeight: minHeight
        });
    },
    Load: function (html) {
        var $div = window.$('<div id="dialog"></div>');
        $div.html('<div class="dialog-html">' + html + '</div>');
        $div.dialog({
            resizable: false,
            modal: true,
            buttons: {},
            title: "",
            dialogClass: "dialog-loading dialog-no-title",
            width: 190,
            minHeight: 50
        });
    },
    Alert: function (html, buttons) {
        if (buttons.length == 0) {
            buttons = [{
                text: "确定",
                click: function () {
                    Dialog.Close();
                }
            }]
        }
        Dialog._show("", html, buttons, 250, 100, "dialog-alert dialog-no-title");
    },
    Error: function (html, buttons) {
        if (buttons.length == 0) {
            buttons = [{
                text: "确定",
                click: function () {
                    Dialog.Close();
                }
            }]
        }
        Dialog._show("", html, buttons, 250, 100, "dialog-error dialog-no-title");
    },
    Confirm: function (title, html, buttons) {
        Dialog._show(title, html, buttons, 250, 150, "dialog-confirm");
    }
};
// 弹窗提示
var DialogOpen = {
    Show: function (url) {
        var $div = window.$('<div id="dialog_open"></div>');
        $div.html('<iframe class="dialog_iframe" src="' + url + '"/>');
        var myw = screen.availWidth;   //定义一个myw，接受到当前全屏的宽
        var myh = screen.availHeight;  //定义一个myw，接受到当前全屏的高

        $div.dialog({
            resizable: false,
            modal: true,
            width: myw * 0.8,
            height: myh * 0.8,
            open: function (event, ui) {
                var $dialog = $(this);
                var atext = $(".ui-dialog-titlebar-close").replaceWith('<p class="ui-xlgwr"><span class="ui-icon ui-icon-minusthick">minusthick</span> <span class="ui-icon ui-icon-extlink">extlink</span><span class="ui-icon ui-icon-closethick">close</span></p>');
                $(".ui-xlgwr>span").click(function () {
                    var spantext = $(this).text();
                    //alert("ok:ui-span" + spantext);
                    if (spantext == "extlink") {

                        if (window.screen) {              //判断浏览器是否支持window.screen判断浏览器是否支持screen
                            //var myw = screen.availWidth;   //定义一个myw，接受到当前全屏的宽
                            //var myh = screen.availHeight;  //定义一个myw，接受到当前全屏的高
                            //window.moveTo(0, 0);           //把window放在左上脚
                            //window.resizeTo(myw, myh);     //把当前窗体的长宽跳转为myw和myh
                            $dialog.dialog({
                                position: ['left', 'top'],
                                width: myw * 0.8,
                                height: myh * 0.8
                            });

                        } else {
                            $dialog.dialog({
                                position: 'center',
                                width: 800,
                                height: 600
                            });
                        }
                    } else if (spantext == "minusthick") {
                        $dialog.dialog({
                            position: 'top',
                            width: 210,
                            height: 210
                        });
                    } else if (spantext == "close") {
                        $dialog.dialog("close");
                    } else {
                        alert("请选择正确的图标,谢谢.");
                    }
                });
            },
            close: function () {
                //$("#dialogtools").text("加载中...");
                $("#dialog_open").remove();
            }
        });
    },
    Layer: function (url) {
        var $div = window.$('<div id="layer"></div>');
        $div.html('<iframe class="dialog_iframe" frameborder="0" src="' + url + '"/>');
        $div.dialog({
            resizable: true,
            modal: true,
            width: 520,
            height: 280,
            open: function (event, ui) {
                var $dialog = $(this);
                $(".ui-xlgwr>span").click(function () {
                    $dialog.dialog("close");
                });
            },
            close: function () {
                $("#layer").remove();
            }
        });
    }
};