import chai from 'chai'

let assert = chai.assert

import tencentCdn from './../dist/refresh.min.js'

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it('Assert refresh is object', function() {
        let refresh = new tencentCdn;

        assert.isObject(refresh);
        assert.equal('https://cdn.api.qcloud.com/v2/index.php', refresh.requestUrl);
    });
  });
});
