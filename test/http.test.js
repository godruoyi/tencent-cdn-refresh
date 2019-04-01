import http from './../src/http'
import chai from 'chai'

let assert = chai.assert

describe('Http client test', function() {
    it('Http is a function', function() {
        assert.isFunction(http)
    })
})
