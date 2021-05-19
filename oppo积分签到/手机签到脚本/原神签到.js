var x = [202, 429, 651, 873];
var y = [1185, 1521];

main();

function main() {
    app.launchApp("米游社");
    threads.start(thread_lose_ad);
    threads.start(thread_close_update);

    text("旅行者讨论区").findOne(5000);
    sleep(1000);
    click_text("原神");
    sleep(1000);

    sign_impact();
    get_coin();

    dealError();
    exit();
}

function get_coin() {

    // //分享
    // click_id("mPostCard1TvTitle");
    // if (id("mPostDetailActionBarIvMore").findOne(4000)) {
    //     click_id("mPostDetailActionBarIvMore");
    //     click_text("QQ");
    //     click_text("吾等#");
    //     click_text("发送");
    //     if (text("分享成功")) toastLog("分享完成");
    //     click_text("返回米游社");
    //     sleep(1500);
    //     back();
    // }


    //点赞和浏览
    click_text("旅行者讨论区");
    text("酒馆").findOne(3000);
    click_text("酒馆");
    click_id("orderTv");
    click_text("最新发布");
    sleep(1000);
    var LikeNum = 0;
    var ViewNum = 0;
    var ShareNum = 0;
    while (1) {
        
        click_id("likeCountTv", 1);
        sleep(1000);
        if (id("likeCountTv").findOne().selected()) {
            LikeNum++;
            toastLog("点赞成功");
            sleep(1000);
        }

        if (ViewNum < 3) {
            click_id("commentCountTv", 1);
            if (id("mPostDetailActionBarLikeView").findOne(4000)) {
                ViewNum++;
                toastLog(("浏览成功"));
            }
            sleep(1000);
            if (ShareNum == 0) {
                if (id("mPostDetailActionBarIvMore").findOne(2000)) {
                    click_id("mPostDetailActionBarIvMore");
                } else {
                    click_id("mPostDetailActionBarIvMore2");

                }

                click_text("QQ");
                click_text("吾等#");
                click_text("发送");
                click_text("返回米游社");
                ShareNum++;
                sleep(1500);
            }
            back();
        }
        className("androidx.recyclerview.widget.RecyclerView").scrollable(true).findOne().scrollForward();
        sleep(500);
        className("androidx.recyclerview.widget.RecyclerView").scrollable(true).findOne().scrollForward();
        sleep(1000);



        if (LikeNum == 5) break;
        sleep(500);
    }

    back();
    sleep(1000);
    click_text("我的");
    if (text("已完成今日任务").findOne(1000)) toastLog("米游币获取完成");

}
function sign_impact() {
    click_text("签到福利");
    sleep(4000);

    var i = 0;
    var j = 0;

    while (1) {
        click(x[i], y[j]);
        i++;
        if (i == 4) {
            i = 0;
            j++;
        }
        if (j > 1) {
            toastLog("签到失败");
            break;
        }
        if (text("好的").findOne(500)) {
            click_text("好的");
            toastLog("签到成功");
            break;
        }
    }
    back();

}
//关闭广告线程
function thread_lose_ad() {
    while (true) {
        textContains("跳").findOne();
        sleep(200);
        var skip = textContains("跳").findOne().bounds();
        click(skip.centerX(), skip.centerY());
        sleep(1000);
    }
}


// 范围点击id
function click_id(texts, param) {
    param = (typeof param != "undefined") ? param : 0;

    var i = 0;
    if (!id(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1500);
    if (param != 0) {
        var a = id(texts).findOne(500)
        if (!a.click()) {
            sleep(1000);
            return 0;
        } else return 1;
    } else {
        var a = id(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }

}

// 范围点击文字
function click_text(texts, param) {
    param = (typeof param != "undefined") ? param : 0;
    var i = 0;
    if (!text(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1000);
    if (param != 0) {
        var a = text(texts).findOne(500);
        if (!a.click()) {
            sleep(1000);
            return 0;
        } else return 1;
    } else {
        var a = text(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }

}

// 范围点击文字（匹配）
function click_textC(texts, param) {
    param = (typeof param != "undefined") ? param : 0;
    var i = 0
    if (!textContains(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1500);
    if (param != 0) {
        var a = textContains(texts).findOne(500);
        if (!a.click()) {
            sleep(1000);
            return 0;
        } else return 1;
    } else {
        var a = textContains(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }
}

//关闭自动更新线程
function thread_close_update() {
    while (true) {
        if (textMatches(/.*本次更新.*/).findOne(100) && textMatches(/.*大小.*/).findOne(100)) {
            sleep(200)
            textMatches(/.*(取消|暂不|稍后|下次).*/).findOne(300).click();
        }

    }
}


function dealError() {
    sleep(1000);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(1000);
}

