//打开指定qq
app.startActivity({
    data:"mqqwpa://im/chat?chat_type=wpa&uin="+QQ_num,
});

//打开指定QQ群
app.startActivity({
    data:"mqqwpa://im/chat?chat_type=group&uin="+Group_num,
});