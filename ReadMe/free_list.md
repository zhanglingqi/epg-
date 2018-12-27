## GET http://202.99.114.74:57301/api.php?mod=h5&ac=free_list


- **`HTTP 请求方式`** GET
##Patametrsc
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| page | false |  int| 无 | 页码 |


##Response Body
```
{
	code: "0",
	pagesize: 10,
	msg: "成功",
	datas: {
		playlist: {
			id: "18",
			title: "免费视频",
			content: "",
			pic: "/public/tv/20181123164003.jpg",
			video_num: "31",
			video_play_count: 0,
			isfav: 0
		},
		video: [{
				vid: "270312651",
				title: "阿里郎",
				duration: "14:31",
				pic: "/public/tv/1471526929.jpg"
			},
			{
				vid: "270312655",
				title: "爱情火苗",
				duration: "13:07",
				pic: "/public/tv/1498398985.jpg"
			}
		]
	}
}
```