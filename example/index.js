const Refresher = require('tencent-cdn-refresh')
const refresher = new Refresher({
    SecretId: process.env.SecretId,
    SecretKey: process.env.SecretKey
})

/**
 * 该函数主要用于刷新腾讯云 CDN 缓存，所以在 SCF 配置的触发方式应该为「COS触发」。
 * 触发后收到的数据格式请参考官方文档 https://cloud.tencent.com/document/product/583/9707
 */
exports.main_handler = (event) => {
    /**
     * 注意， 这里的 url 一般为 cos 的访问地址， 并不是 CDN 地址
     * 一般情况下我们都会为 CDN 配置一个 CNAME，并不会使用默认的 CDN 地址
     * 如 COS 地址：http://testpic-1253970026.cos.ap-chengdu.myqcloud.com/images/a.jpg
     * 配置的 CDN 地址：https://cnd.example.com
     *
     * 但腾讯云刷新 CDN 缓存需要用的是 CDN 地址，所以你可能需要将这里的地址替换为
     * https://cnd.example.com/images/a.jpg 再去刷新（针对 url 刷新）。
     */
    let changeUrls = event.Records.map(record => record.cos.cosObject.url)

    /**
     * 刷新 cnd 缓存，支持下列两个方法，参数可为数组或字符串
     *       purgeUrlsCache(['url1', 'url2'])
     *       purgeDirsCache('dir')
     */
    return refresher.purgeUrlsCache(changeUrls).then((response) => {
        // { code: 0, message: '', codeDesc: 'Success', data: { count: 1, task_id: '1555557063687951221' } }
        console.log(data)
    }).catch(console.error)
};
