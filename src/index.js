'use strict';

let refresh = require('./refresh')
const CDNCache = new refresh({
    SecretId: '',
    SecretKey: ''
})

exports.main_handler = (event, context, callback) => {
    let changeUrls = []

    event.Records.forEach(function (record) {
        changeUrls.push(record.cos.cosObject.url)
    })

    /**
     * 刷新 cnd 缓存，支持下列两个方法，参数可为数组或字符串
     *       flashUrls(['url1', 'url2'])
     *       flashDirs('dir')
     */
    CDNCache.flashUrls(changeUrls).then(function (response) {
        let data = JSON.parse(response)
        // { code: 0, message: '', codeDesc: 'Success', data: { count: 1, task_id: '1555557063687951221' } }

        console.log(data)
    }).catch(function (error) {
        console.log('Error')
        console.log(error)
    })
};
