//钱包

launchApp("钱包");
packageName("com.finshell.wallet").waitFor();
while(textContains("跳过").findOne(1000) != null){
    toast("find!");
    sleep(200);
    textContains("跳过").click();
};
packageName("com.finshell.wallet").waitFor();
sleep(500);
while(text("更新").findOne(1000) != null){
    text("取消").click();
};
text("我的").waitFor();
var a = text("我的").findOne();
if(a){
    click(a.bounds().centerX(),a.bounds().centerY());
};
id("rela_left").waitFor();
var b = id("rela_left").findOne();
if(b){
    click(b.bounds().centerX(),b.bounds().centerY())
};

text("签到").waitFor();
sleep(500)
var c = text("签到").findOne(1000);
if(c){
    c.click()
};
sleep(600);