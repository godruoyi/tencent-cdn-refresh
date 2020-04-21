const Refresher = require('../src/index')
const nock = require('nock')
const { assert } = require('chai')

describe('Tencent Refresh CDN Cache test', () => {
    describe('The framework test', () => {
        it('Assert transformer Urls', () => {
            let refresh = new Refresher()

            let datas = refresh.transformerUrls('https://hy.dayuw.cn/')

            assert.isObject(datas)
            assert.property(datas, 'urls.0')
            assert.notProperty(datas, 'urls.1')

            let datas1 = refresh.transformerUrls([
                'https://hy.dayuw.cn/1', 'https://hy.dayuw.cn/2', 'https://hy.dayuw.cn/3'
            ], 'dirs')

            assert.hasAllKeys(datas1, ['dirs.0', 'dirs.1', 'dirs.2'])
        })

        it('Assert build Request Params', () => {
            let refresh = new Refresher({SecretKey: 'SecretKey', SecretId: 'SecretId'})
            let config  = refresh.buildRequestParams('https://hy.dayuw.cn/')

            assert.isObject(config)
            assert.hasAllKeys(config, [
                'Action', 'Timestamp', 'Nonce', 'SecretId', 'urls.0', 'Signature'
            ])
        })
    })

    describe('Test flash cache', () => {
        let refresh

        before(() => {
            refresh = new Refresher({
                SecretId: 'AKIDjLpdemoWwDNNKBtdemolEWdpsSxJ',
                SecretKey: 'JRXXNWgfU4XQNmodeUeg2TidemoqdHm'
            })
        })

        it('Assert purgeDirsCache', () => {
            nock(`https://${refresh.host}`)
                .filteringRequestBody(body => '*')
                .post(refresh.configs.path, '*')
                .reply(200, { data: 'mock-result' })

            return refresh.purgeDirsCache(['https://hy.dayuw.cn']).then((response) => {
                assert.deepEqual(response, { data: 'mock-result' })
            }).catch(assert.fail)
        })

        it('Assert purgeUrlsCache', () => {
            nock(`https://${refresh.host}`)
                .filteringRequestBody(body => '*')
                .post(refresh.configs.path, '*')
                .reply(200, { data: 'mock-result' })

            return refresh.purgeUrlsCache('http://www.test.com').then((response) => {
                assert.deepEqual(response, { data: 'mock-result' })
            }).catch(assert.fail)
        })
    })
})
