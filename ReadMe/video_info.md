## GET http://202.99.114.74:57301/api.php?mod=h5&ac=video_info&playlist_id=4


- **`HTTP 请求方式`** GET

##Patametrs
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| playlist_id | true |  int| 无 | 二级分类的id |



##Response Body
```
{
  "code": "0",
  "datas": {
    "playlist": {
      "cid": "4",                           //分类id
      "title": "\u7cd6\u7cd6\u8001\u5e08title",   //标题
      "content": "\u7cd6\u7cd6\u8001\u5e08content",   //简介
      "pic": ""                      //图片
    },
    "video": [
      {
        "vid": "270312651",             //视频vid
        "title": "\u963f\u91cc\u90ce",   //视频标题
        "duration": "871",               //播放时长
        "pic": "\/public\/tv\/1471526929.jpg"   //图片
      },
      {
        "vid": "270312677",
        "title": "\u7231\u60c5\u5f53\u6e38\u620f",
        "duration": "842",
        "pic": "\/public\/tv\/5417887.jpg"
      }
    ]
  }
}
```