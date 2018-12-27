## GET http://202.99.114.74:57301/api.php?mod=h5&ac=addfav&uid=1&cid=14


- **`HTTP 请求方式`** GET

##Patametrs
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| uid | true |  int| 无 | 用户UID |
| cid | true |  int| 无 | 分类ID |


##Response Body
```
{
  code: "0",
  datas: {
    vid: "270314941",//视频VID
    createtime: "2018-11-14 20:04:06",//视频发布时间
    vip: "1",//是否免费
    cdn: "http://202.99.114.93/88888891/16/20181108/270314941/270314941.ts",//播放地址
    duration: "15:48",//时长
    pic: "http://202.99.114.74:57301/public/tv/7337055.jpg"//图片地址
  }
}
```