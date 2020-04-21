const Signature = require('./../src/signature');
const { assert } = require('chai')

describe('Tencent signature test', () => {
    it('Assert object to query string', () => {
        let testData = {
            SecretId: 'AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D',
            Nonce: 13029,
            Action: 'DescribeCdnHosts',
            Timestamp: 1463122059,
            offset: 0,
            limit: 10
        }

        assert.equal(
            new Signature().toQueryString(testData),
            'Action=DescribeCdnHosts&Nonce=13029&SecretId=AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D&Timestamp=1463122059&limit=10&offset=0'
        )
    })

    it('Assert signature params to string', () => {
        let testData = {
            SecretId: 'AKIDT8G5AsY1D3MChWooNq1rFSw1fyBVCX9D',
            Nonce: 13029,
            Action: 'DescribeCdnHosts',
            Timestamp: 1463122059,
            offset: 0,
            limit: 10
        }

        let signatureInstance = new Signature('pxPgRWDbCy86ZYyqBTDk7WmeRZSmPco0')

        assert.equal('bWMMAR1eFGjZ5KWbfxTlBiLiNLc=', signatureInstance.sign('get', 'cdn.api.qcloud.com', testData))
        assert.equal('i/KcLp6VaOtUmVtT0dqtLpKJOkg=', signatureInstance.sign('post', 'cdn.api.qcloud.com', testData))
    })
})
