var timeOfvideo = 41 //观看视频总时间
var video_times = 5 //观看视频次数(任务奖励次数)
var comment_times = 3 //评论次数
var loves = "praise_view" //点赞id
var comments = "comment_cnt" //评论id

main();

function main() {
    auto.waitFor();
    WakeUp();
    Off_WLAN();
    //加载关闭更新提示线程
    threads.start(thread_close_update);
    launchApp("视频");
    packageName("com.heytap.yoli").waitFor();
    toastLog("等待主界面");
    sleep(3000);
    // 刷评论和点赞
    like_comment();
    // 刷视频并到一定时间自动领奖励
    video_start();
    toastLog("视频任务完成！");
    
    // threads.shutDownAll();
    // engines.execScriptFile("/sdcard/脚本/自动签到.js");
    // toastLog("自动签到ing..")
    exit();
}

//刷视频
function video_start() {
    // threads.start(threads_end_view);
    // sleep(2000);
    repeat_view();
    sleep(timeOfvideo*1000*60);
    view_reward();
    sleep(1000);
    view_five_time();
    sleep(1000);
    rec_point();
}
//刷5次完整视频
function view_five_time() {
    click_text("我的");
    text("签到").waitFor();
    sleep(500);
    id("mine_list").findOne().scrollForward();
    click_text("我的收藏");
    id("view_cnt").waitFor();
    var view = id("view_cnt").find();
    view.forEach(function (element, index) {
        if (index < 5 && element != null) {
            element.parent().parent().click()
            sleep(20 * 1000);
            back();
            sleep(1000);
        }
    })
    back();
    sleep(1000);
    id("mine_list").findOne().scrollBackward();
}


//重复看同个视频
function repeat_view() {
    // id("channel").findOne().scrollLeft();
    // id("channel").findOne().scrollLeft();
    // if (!click_text("推荐")) {
    //     repeat_view();
    // }


    id(loves).waitFor();//等待界面
    sleep(500);
    play_video();
    click_text("继续播放");
    threads.start(thread_video);

   

}

 //视频奖励
 function view_reward(){
    click_id("awards_indicator");
    className("android.widget.Button").waitFor();
    sleep(500);
    className("android.widget.Button").findOne().parent().click();
    click_id("back_img_btn");
    back();
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




}

//刷视频自动关闭广告并重播的线程
function thread_video() {
    while (true) {
        if (textContains("关闭广告").findOne(100)) {
            textContains("关闭广告").findOne().parent().click();
        }
        if (text("重播").findOne(100)) {
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
                        sleep(1000);
                        while (id("comment_input").findOne().setText("1111111111111") == true) {
                            sleep(2500)
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
    // //视频奖励
    // click_id("awards_indicator");
    // className("android.widget.Button").waitFor();
    // sleep(500);
    // className("android.widget.Button").findOne().parent().click();
    // click_id("back_img_btn");

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
function click_id(texts,param) {
    param = (typeof param != "undefined") ? param : 0;

    var i = 0;
    if (!id(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1500);
    if (!id(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    if (param != 0) {
        var a = id(texts).findOne(500)
        if(!a.click()){
            sleep(1000);
            return 0;
        }else return 1;
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
    sleep(1500);
    if (!text(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    if (param != 0) {
        var a = text(texts).findOne(500);
        if(!a.click()){
            sleep(1000);
            return 0;
        }else return 1;
    } else {
        var a = text(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }

}

// 范围点击文字（匹配）
function click_textC(texts,param) {
    param = (typeof param != "undefined") ? param : 0;
    var i = 0
    if (!textContains(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1500);
    if (!textContains(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    if(param!=0){
        var a = textContains(texts).findOne(500);
        if(!a.click()){
            sleep(1000);
            return 0;
        }else return 1;
    }else{
        var a = textContains(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }
}




function WakeUp() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1500);
        swipe(device.width / 2, device.height - 500, device.width / 2, device.height / 7, 1000);
        sleep(1000);
        if (!packageName("com.oppo.launcher").findOne(1000)) {
            var scret = [1400, 1600, 1800, 2000, 1800, 2000];

            var i;
            for (i = 0; i < 6; i++) {
                click(540, scret[i]);
                sleep(1000);
            }
        }
    }

}

function switch_mute() {
    if (device.getMusicVolume()) {
        sleep(1000);
        notifications();
        sleep(1000);
        press(932, 480, 1000);
        sleep(1500);
        swipe(230, 1245, 140, 1245, 300);
        sleep(500);
        home();
        sleep(500);
    }
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



//关闭自动更新线程
function thread_close_update() {
    while (true) {
        if (textMatches(/.*新版本.*/).findOne(100)&&textMatches(/.*大小.*/).findOne(100)) {
            sleep(200)
            textMatches(/.*(取消|暂不|稍后).*/).findOne(300).click();
        }
        if(idMatches(/.*(close_button|dialog_delete|ivClose|dialog_clos_image).*/).findOne(100)){
            sleep(200);
            idMatches(/.*(close_button|dialog_delete|ivClose|dialog_clos_image).*/).findOne(100).click()
        }
    }
}
function Off_WLAN() {
    notifications();
    sleep(1000);
    press(142, 460, 500);
    sleep(1000);
    if (text("WLAN 助理").findOne(1000)) {
        toastLog("正在关闭WLAN");
        click_id("switchWidget");
    } else toastLog("已处于数据网络");
    home();
    sleep(500);
}