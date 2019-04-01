import signature from './../src/signature'
import chai from 'chai'

let assert = chai.assert

describe('Tencent signature test', function() {
    it('Dictionary order test', function() {
        let testData = {
            "SecretId": "AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D",
            "Nonce": 13029,
            "Action": "DescribeCdnHosts",
            "Timestamp": 1463122059,
            "offset": 0,
            "limit": 10
        }

        assert.isTrue(Object.keys(testData)[0] == 'SecretId');

        let data = signature.dictionaryOrder(testData)

        assert.isTrue(Object.keys(data)[0] == 'Action')
        assert.isTrue(Object.keys(data)[5] == 'offset')
    })

    it('Assert object to query string', function () {
        let testData = {
            "SecretId": "AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D",
            "Nonce": 13029,
            "Action": "DescribeCdnHosts",
            "Timestamp": 1463122059,
            "offset": 0,
            "limit": 10
        }

        assert.equal(signature.toQueryString(
            signature.dictionaryOrder(testData)), 'Action=DescribeCdnHosts&Nonce=13029&SecretId=AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D&Timestamp=1463122059&limit=10&offset=0'
        )
    })

    it('Assert signature params to string', function () {
        let testData = {
            "SecretId": "AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D",
            "Nonce": 13029,
            "Action": "DescribeCdnHosts",
            "Timestamp": 1463122059,
            "offset": 0,
            "limit": 10
        }

        let signatureInstance = signature.setSecretKey('pxPgRWDbCy86ZYyqBTDk7WmeRZSmPco0')

        assert.equal('bWMMAR1eFGjZ5KWbfxTlBiLiNLc=', signatureInstance.sign('get', 'cdn.api.qcloud.com', testData))
        assert.equal('i/KcLp6VaOtUmVtT0dqtLpKJOkg=', signatureInstance.sign('post', 'cdn.api.qcloud.com', testData))
    })
})
