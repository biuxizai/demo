
main();

function main() {
    auto.waitFor();
    WakeUp();

    wait_for_game();
    
    threads.start(thread_lose_ad);
    threads.start(thread_close_update);
    // 早起打卡报名
    sign_up_AM()
    // 早睡打卡报名
    sign_up_PM()
    home();
    exit();
}

function sign_up_AM(){
    launch("com.oppo.community");
    click_text("早起挑战");
    click_text("消耗 500 积分报名");
    if(click_text("好的")){
        toastLog("早起打卡报名成功！");
        return 1;
    }else return 0;
}
function sign_up_PM(){
    launchApp("欢太商城");
    click_text("我的");
    text("任务中心").findOne(2000);
    sleep(3000);
    swipe(device.width / 2, device.height * 4 / 5, device.width / 2, 10, 800);
    click_text("早睡打卡");
    click_text("500积分报名");
    if(text("报名成功").findOne()){
        toastLog("早睡打卡报名成功！");
        return 1;
    }else return 0;
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

function wait_for_game() {
    while(1)
    {
        if(packageName("com.tencent.tmgp.sgame").findOne(3000)) {
            toastLog("打卡waiting...");
            sleep(10000);
            continue;
        }
        else break;
    }
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
        if(id("close").findOne(100)){
            sleep(200);
            id("close").findOne(300).click();
        }

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
