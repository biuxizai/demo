// engines.execScriptFile("/sdcard/脚本/早起打卡.js");
// sleep(2000);
// toast("1");
// engines.execScriptFile("/sdcard/脚本/早睡打卡.js");
// exit();

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
            toastLog("1");
            id("close").findOne(300).click();
        }else toastLog("2");


exit();


var e = engines.execScriptFile("./自动签到.js");
//等待脚本启动
sleep(2000);
//向该脚本发送事件
e.getEngine().emit("say", "你好");