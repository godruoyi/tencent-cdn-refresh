<h1 align="center"> Refresh tencent cloud CDN cache </h1>

## 说明
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgodruoyi%2Ftencent-cdn-refresh.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgodruoyi%2Ftencent-cdn-refresh?ref=badge_shield)


通过 [腾讯云无服务器云函数](https://cloud.tencent.com/product/scf)，自动刷新 CDN 缓存。

## 使用

登录腾讯云无服务器云函数 [管理后台](https://console.cloud.tencent.com/scf/list/create)，新建云函数并上传 `Zip` 代码包。

> 云函数暂不支持直接引入已发布到 `npm` 的 `package`，可通过 `zip` 打包方式上传。

点击 [这里](https://github.com/godruoyi/tencent-cdn-refresh/blob/master/refreshcache.zip) 下载 ZIP 文件。

上传成功后，编辑入口文件的 `SecretId` 及 `SecretKey`，添加 **触发方式**后即可查看实际的运行效果。

更多资料请参考官方文档。另外你可能需要 [对象存储 COSCMD 工具](https://cloud.tencent.com/document/product/436/10976) 来自动上传你本地的资源文件。

## 参考

[对象存储 COSCMD 工具](https://cloud.tencent.com/document/product/436/10976)
[无服务器云函数 - 文档中心 - 腾讯云](https://cloud.tencent.com/document/product/583)
[内容分发网络 - 文档中心 - 腾讯云](https://cloud.tencent.com/document/product/228)
[内容分发网络 刷新 URL - API 文档 - 文档中心 - 腾讯云](https://cloud.tencent.com/document/product/228/3946)

## LISTEN

MIT


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgodruoyi%2Ftencent-cdn-refresh.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgodruoyi%2Ftencent-cdn-refresh?ref=badge_large)