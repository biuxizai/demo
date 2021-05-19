
// 我的OPPO

launchApp("我的 OPPO");
packageName("com.oppo.usercenter").waitFor();
while(textContains("跳").findOne(1000) != null){
    toast("find!");
    sleep(200);
    textContains("跳").click();
    break;
};
text("签到").waitFor();
sleep(500);
var b = text("签到").findOne();
if(b){
    click(b.bounds().centerX(),b.bounds().centerY())
};
sleep(500);
text("签到").waitFor();
var c = text("签到").findOne();
if(c){
    click(c.bounds().centerX(),c.bounds().centerY())
};
sleep(600);
