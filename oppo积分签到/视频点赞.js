var timeOfvideo = 45 //观看视频总时间
var video_times = 5 //观看视频次数(任务奖励次数)
var comment_times = 3 //评论次数
var loves = "praise_view" //点赞id
var comments = "comment_cnt" //评论id

main();

function main() {
    WakeUp();
    launchApp("视频"); 
    packageName("com.heytap.yoli").waitFor();
    toastLog("等待主界面");
    sleep(3000);
    // 刷评论和点赞
    like_comment();
    // 刷视频并到一定时间自动领奖励
    video_start();
}

//刷视频
function video_start() {
    threads.start(threads_end_view);
    sleep(2000);
    view_five_time();
    repeat_view();

}
//刷5次完整视频
function view_five_time() {
    sleep(1000);
    if (!text("儿童").findOne().click()) {
        id("channel").findOne().scrollRight();
        view_five_time();
    }
    sleep(1000);
    var i = 0 //视频计数
    for (; i < video_times;) {
        if (mission_video()) {
            i++;
        }

    }
}


//重复看同个视频
function repeat_view() {
    sleep(3000);
    id("channel").findOne().scrollLeft();
    id("channel").findOne().scrollLeft();
    if (!click_text("推荐")) {
        repeat_view();
    }


    id(loves).waitFor();//等待界面
    sleep(500);
    play_video();
    threads.start(thread_video);

}


//看视频任务
function mission_video() {
    sleep(4000);
    if (!play_video()) {
        return 0;
    }

    textContains("关闭广告").waitFor();
    refresh();

    return 1;

}

// 播放视频
function play_video() {
    sleep(1000);
    var b = text("儿童").findOne().parent().bounds();
    log(b);
    if (!click(device.width / 2, b.bottom + 600)) {
        return 0;
    }

    return 1;
}

// 刷新
function refresh() {
    back();
}

//观看视频一定时间自动关闭并开始领取奖励
function threads_end_view() {

    sleep(timeOfvideo * 60 * 1000);
    //领取积分
    rec_point();
    toastLog("视频任务完成！！");
    dealError();
    exit();

}

//刷视频自动关闭广告并重播的线程
function thread_video() {
    while (true) {
        if (textContains("关闭广告").findOne()) {
            textContains("关闭广告").findOne().parent().click();
        }
        if (text("重播").findOne()) {
            sleep(500);
            click("重播");
        }
        sleep(5000)
    }

}

//点赞并评论
function like_comment() {
    for (var i = 0; i < comment_times; i++) {
        // find all botton of like
        id(loves).waitFor();
        sleep(500);
        var love = id(loves).find();
        if (!love.empty()) {
            //traver botton of like
            love.forEach(function (currentvalue, index) {
                if (index < 2 && currentvalue) {
                    var like = currentvalue
                    //give a like 
                    if (like.click()) {
                        log("第" + index + "：点赞成功");
                        sleep(random(1000, 2000));
                    }
                    else {
                        log("Error：第" + index + "：点赞失败");
                    }
                }
            })
        }
        else toast("unfind!");

        //find all botton of comment
        var comment_bnt = id(comments).find();
        if (!comment_bnt.empty()) {
            //traver the botton of comment
            comment_bnt.forEach(function (currentvalue, index) {
                if (index < 2 && currentvalue) {
                    var comment = currentvalue;
                    //comment
                    if (comment.click()) {
                        sleep(1000);
                        while (id("comment_input").findOne().setText("66666666666666666") == true) {
                            sleep(1000)
                            id("comment_send").findOne().click();
                            sleep(random(1000, 1500));
                            back();
                            sleep(700);
                            back();
                            sleep(1500);
                            break;
                        }
                    }
                    else {
                        log("Error：第" + index + "：评论失败");
                    }
                }
            })
        }
        else toast("unfind!");

        // refresh
        refresh();
        sleep(3000);

    }
    return 1;
}
// 领取积分
function rec_point() {
    //视频奖励
    click_id("awards_indicator");
    className("android.widget.Button").waitFor();
    sleep(500);
    className("android.widget.Button").findOne().parent().click();
    click_id("back_img_btn");

    //任务奖励
    click_text("我的");
    text("积分规则").waitFor();
    sleep(1000);
    var gain = text("领取").find();
    gain.forEach(function (element, index) {

        if (!element.click()) {
            sleep(500);
            rec_point();
        }
        toast("领取成功");
        sleep(1000);

    })

    //签到
    punch();
}
// 签到
function punch() {
    click_text("我的");
    click_text("签到");
    click_text("签到");
    sleep(700);
    back();
    sleep(700);
    desc("转到上一层级").findOne().click();
}


// 范围点击id
function click_id(texts) {
    var i = 0;
    sleep(1000);
    while (!id(texts).findOne(500)) {
        if (i == 10) return 0;
        i++;
    }
    var a = id(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());
    sleep(1000);
    return 1;


}
// 范围点击文字
function click_text(texts) {
    var i = 0;
    sleep(1000);
    while (!text(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = text(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());
    sleep(1000);
    return 1;
}
// 范围点击文字（匹配）
function click_textC(texts) {
    var i = 0
    sleep(1000);
    while (!textContains(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());

    sleep(1000);
    return 1;
}

// 点击id
function Click_id(texts) {
    var i = 0;
    sleep(1000);
    while (!id(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = id(texts).findOne(500);
    a.click();
    sleep(1000);
    return 1;


}
// 点击文字
function Click_text(texts) {
    var i = 0;
    // text(texts).waitFor();

    // var a = text(texts).findOne(500).bounds();

    sleep(1000);
    while (!text(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = text(texts).findOne(500);
    a.click();
    sleep(1000);
    return 1;
}
// 点击文字（匹配）
function Click_textC(texts) {
    var i = 0
    sleep(1000);
    while (!textContains(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500);
    a.click();

    sleep(1000);
    return 1;
}

function WakeUp() {
    device.wakeUp();
    sleep(500);
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 8, 300);
    sleep(1000);
}

function dealError() {
    sleep(1000);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(1000);
}