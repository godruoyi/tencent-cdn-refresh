import Refresh from './../src/refresh'
import chai from 'chai'

let assert = chai.assert

describe('Tencent Refresh CDN Cache test', function() {
    describe('The framework test', function () {

        it('Assert refresh is object', function() {
            assert.isObject(new Refresh)
        })

        it('Assert getConfigs return object', function() {
            let refresh = new Refresh({_test: '1234'})
            let config  = refresh.getConfigs()

            assert.isObject(config)
            assert.hasAnyKeys(config, ['_test'])
            assert.equal(config._test, '1234')
        })
    })
})
