## GET http://202.99.114.74:57301/api.php?mod=h5&ac=get_playlist&tab_id=2


- **`HTTP 请求方式`** GET

##Patametrs
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| tab_id | true |  int| 无 | 传递点击一级分类的tab_id |


##
枚举说明
> type
>>`宽图 1`  `高图 2`

##Response Body
```
{
  "code": "0",
  "datas": [
    {
      "playlist_id": "4",                  //二级分类id
      "name": "\u7cd6\u7cd6\u8001\u5e08",   //名称
      "title": "\u7cd6\u7cd6\u8001\u5e08title", //标题
      "color": "",    //颜色
      "pic": "",      //图片
      "video_num": 2,   //视频数量
      "video_play_count": 0 //视频播放次数
    }
  ]
}
```