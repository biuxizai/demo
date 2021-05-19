var view_time = 13;
var like = "ll_like";
var comment = "ll_comments";
var comment_1 = "input_hint";
var comment_2 = "send";
// exit();
main();

function main() {
    auto.waitFor();
    WakeUp();
    switch_mute();
    Off_WLAN();
    threads.start(thread_close_update);
    app.launchApp("爆赞小视频");
    
    id(like).waitFor();
    sleep(2000);
    like_comment();
    // view_topic();
    threads.start(repeat_vedio);
    sleep(view_time*60*1000);
    threads.shutDownAll();
    if(punch()){
        toastLog("爆赞小视频任务完成！！");
        dealError();
    }
    engines.execScriptFile("/sdcard/脚本/视频点赞.js");
    toastLog("视频点赞ing..");
    
    exit();
    
}
function like_comment() {
    var i = 0;
    var k = 0;
   
    while(true) {
        if (i < 5) {
            if (click_id(like)) {
                i++;
            }
        }
        if (k < 3) {
            click_id(comment);
            click_id(comment_1);
            setText("1111111111111111111");
            if (click_id(comment_2))
                k++;
        }
       
        click_id("close");
        sleep(500);
        swipe(device.width / 2, device.height * 4 / 5, device.width / 2, 10, 800);
        if(i==5 && k==3) break;
    }

}
function view_topic(){
    click_text("发现");
    id("tv_name").waitFor();
    id("tv_name").findOne().parent().parent().click();
    id(like).waitFor();
    sleep(500);
    back();
    id("tv_name").waitFor();
    sleep(500);

    swipe(device.width / 2, 500, device.width / 2, device.height * 4 / 5, 800);

    sleep(3000);
    id("tv_name").waitFor();
    id("tv_name").findOne().parent().parent().click();
    sleep(500);
}


function repeat_vedio() {
    while (true) {

        swipe(device.width / 2, device.height * 4 / 5, device.width / 2, 10, 800);
        sleep(5000);
        swipe(device.width / 2, 100, device.width / 2, device.height * 4 / 5, 800);
        sleep(5000);
    }

}

function punch(){
    click_text("我的");
    click_text("签到");
    click_text("去签到");
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
        press(932, 480,500);
        sleep(1500);
        swipe(230,1245,140,1245,300);
        sleep(500);
        home();
        sleep(500);
    }
}
//处理异常
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

function open_WLAN(){
    notifications();
    sleep(1000);
    press(142,460,500);
    sleep(1000);
    if(!text("WLAN 助理").findOne(1000)){
        toastLog("正在打开WLAN");
        click_id("switchWidget");
    }else toastLog("已打开WLAN");
    home();
    sleep(500);
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