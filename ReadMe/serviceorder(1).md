## GET http://202.99.114.74:57301/api.php?mod=user&ac=serviceorder

业务订购
- **`HTTP 请求方式`** GET

##Patametrs
| 参数名 | 必选 | 参数对应值 | 默认值 | 说明 |
| :--- | :---: | :---: | :---: | ---: |
| UserID | true |  string| 无 | IPTV 用户业务编号 |
| UserToken | true |  string| 无 | 该用户的临时身份证明 |
| CarrierID | true |  string| 无 | 运营商编号 |
| ProductID | true |  string| 无 | 产品ID |


##Response Body
```
跳转到支付页面
```