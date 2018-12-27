收藏列表

## GET http://202.99.114.74:57301/api.php?mod=h5&ac=user_fav&uid=1


- **`HTTP 请求方式`** GET

##Patametrs
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| uid | true |  int | 无 | 用户的uid |


##Response Body
```
{
  "code": "0",
  "datas": [
    {
      "pic": "",      //图片
      "cid": "2",    //分类id
      "video_num": 0,        //视频数
      "video_play_count": 0  //播放次数
    }
  ]
}
```

