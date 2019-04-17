let crypto = require("crypto");

class Signature {
    /**
     * Auto Register secretid and secretkey
     *
     * @param  {String} secretKey
     * @param  {String} path
     */
    constructor(secretKey = null, path = "/v2/index.php") {
        this.secretKey = secretKey;
        this.requestPath = path;
    }

    /**
     * Set secret key
     *
     * @param {String} secretKey
     */
    setSecretKey(secretKey) {
        this.secretKey = secretKey;

        return this;
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
        let result = this.toQueryString(this.dictionaryOrder(params));
        method = method.toUpperCase();

        let originSignature =`${method}${host}${this.requestPath}?${result}`;

        return this.getHmacAlgorithm().update(originSignature).digest().toString("base64");
    }

    /**
     * Get hamc algorithm by gieced secretkey
     *
     * @return {mixed}
     */
    getHmacAlgorithm() {
        return crypto.createHmac("sha1", this.secretKey);
    }

    /**
     * Transforme Object to http query string
     *
     * @param  {Object} obj
     *
     * @return {string}
     */
    toQueryString(obj) {
        let keys = Object.keys(obj);
        let str = "";

        keys.forEach(k => {
            if (obj.hasOwnProperty(k)) {
                str += `&${k}=${obj[k]}`;
            }
        });

        return str.slice(1);
    }

    /**
     * Js dictionary Order
     *
     * @param  {array} params
     *
     * @return {array}
     */
    dictionaryOrder(params) {
        let result = [];

        for (let key of Object.keys(params).sort()) {
            result[key] = params[key];
        }

        return result;
    }
}

let signature = new Signature;

module.exports = signature;
