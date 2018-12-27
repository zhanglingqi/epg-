## GET http://202.99.114.74:57301/api.php?mod=h5&ac=home


- **`HTTP 请求方式`** GET

##Patametrs
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| tab_id | false |  int| 无 | 传递点击tab的tab_id |


##
枚举说明
> type
>>`宽图 1`  `高图 2`

>entity
>>`一级分类 tab`  `二级分类 playlist`

##Response Body
```
{
  "code": "0",
  "pagesize": 5,
  "datas": {
    "tab": [
      {
        "tab_id": 0,
        "name": "\u7cbe\u9009\u89c6\u9891"
      },
      {
        "tab_id": "1",
        "name": "\u5e7f\u573a\u821e\u8bfe\u5802"
      },
      {
        "tab_id": "3",
        "name": "\u6c11\u65cf\u821e"
      },
      {
        "tab_id": "8",
        "name": "\u5065\u8eab\u64cd"
      },
      {
        "tab_id": "9",
        "name": "\u745c\u4f3d"
      },
      {
        "tab_id": "2",
        "name": "\u8fbe\u4eba\u4e13\u533a"
      },
      {
        "tab_id": 999,
        "name": "\u67e5\u770b\u66f4\u591a"
      }
    ],
    "content": [
      {
        "playlist_id": "4",                           //二级分类的id
        "name": "\u7cd6\u7cd6\u8001\u5e08",           //名称
        "title": "\u7cd6\u7cd6\u8001\u5e08title",     //标题
        "color": "",                                  //标题颜色
        "type": "1",                                  //图片大小
        "pic": "",                                     //图片
        "video_num": 2,                          //视频数量
        "video_play_count": 0,                  //视频播放次数
        "entity": "playlist"                    //分类
      }
    ]
  }
}
```