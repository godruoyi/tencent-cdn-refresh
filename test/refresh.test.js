import Refresh from './../src/refresh'
import chai from 'chai'
import nock from 'nock'

let assert = chai.assert

describe('Tencent Refresh CDN Cache test', function() {
    describe('The framework test', function () {

        it('Assert refresh is object', function() {
            let refresh = new Refresh

            assert.isObject(refresh)
            assert.equal('https://cdn.api.qcloud.com/v2/index.php', refresh.requestUrl);
        })

        it('Assert transformer Urls', function () {
            let refresh = new Refresh()

            let datas = refresh.transformerUrls('https://hy.dayuw.cn/')

            assert.isObject(datas)
            assert.property(datas, 'urls.0')
            assert.notProperty(datas, 'urls.1')

            let datas1 = refresh.transformerUrls([
                'https://hy.dayuw.cn/1', 'https://hy.dayuw.cn/2', 'https://hy.dayuw.cn/3'
            ], 'dirs')

            assert.hasAllKeys(datas1, ['dirs.0', 'dirs.1', 'dirs.2'])
        })

        it('Assert build Request Params', function() {
            let refresh = new Refresh({SecretKey: 'SecretKey', SecretId: 'SecretId'})
            let config  = refresh.buildRequestParams('https://hy.dayuw.cn/')

            assert.isObject(config)
            assert.hasAllKeys(config, [
                'Action', 'Timestamp', 'Nonce', 'SecretId', 'urls.0', 'Signature'
            ])
        })
    })

    describe('Test flash cache', function () {
        let refresh

        before(() => {
            refresh = new Refresh({
                SecretId: 'AKIDjLpdemoWwDNNKBtdemolEWdpsSxJ',
                SecretKey: 'JRXXNWgfU4XQNmodeUeg2TidemoqdHm'
            })
        })

        it('Assert flashDirs', function () {
            nock(`https://${refresh.host}`)
                .filteringRequestBody(body => '*')
                .post(refresh.configs.path, '*')
                .reply(200, 'mock-result')

            return Promise.all([
                refresh.flashDirs(['https://hy.dayuw.cn']).then(function (response) {
                    assert.equal(response, 'mock-result')
                }).catch(function (error) {
                    assert.isTrue(false)
                })
            ])
        })

        it('Assert flashUrls', function () {
            nock(`https://${refresh.host}`)
                .filteringRequestBody(body => '*')
                .post(refresh.configs.path, '*')
                .reply(200, 'mock-result')

            return Promise.all([
                refresh.flashUrls('http://www.test.com').then(function (response) {
                    assert.equal(response, 'mock-result')
                }).catch(function (error) {
                    assert.isTrue(false)
                })
            ])
        })
    })
})
