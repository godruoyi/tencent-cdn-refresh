const crypto = require('crypto');

module.exports = class Signature {
    /**
     * Auto Register secretid and secretkey
     *
     * @param  {String} secretKey
     * @param  {String} path
     */
    constructor(secretKey = null, path = '/v2/index.php') {
        this.secretKey = secretKey;
        this.requestPath = path;
    }

    /**
     * Sign for tencent clould
     *
     * @param  {String} method
     * @param  {String} host
     * @param  {Object} params
     *
     * @return {String}
     */
    sign(method, host, params) {
        let originSignature = method.toUpperCase() + host + this.requestPath + '?' + this.toQueryString(params);

        return crypto.createHmac('sha1', this.secretKey).update(originSignature).digest().toString('base64');
    }

    /**
     * Transform object to http query string
     *
     * @param  {array} params
     *
     * @return {string}
     */
    toQueryString(params) {
        return Object.keys(params).sort().map((key => `${key}=${params[key]}`)).join('&');
    }
}
