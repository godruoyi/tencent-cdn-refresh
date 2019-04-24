const http = require('./http');
const signature = require('./signature');

class Refresh {
    constructor(configs) {
        this.configs = Object.assign({
            SecretId: null,
            SecretKey: null,
            Timestamp: new Date().getTime(),
            Nonce: Math.ceil(Math.random() * 10000),
            path: "/v2/index.php"
        }, configs);

        this.method = "post";
        this.host   = "cdn.api.qcloud.com";
        this.action = "RefreshCdnUrl";
        this.requestUrl = `https://${this.host}${this.configs.path}`;
    }

    /**
     * Flash dirs cache
     *
     * @param  {mixed} dirs
     *
     * @return {mixed}
     */
    flashDirs(dirs) {
        this.action = "RefreshCdnDir";

        return this.request(this.buildRequestParams(dirs, "dirs"));
    }

    /**
     * Flash url cache
     *
     * @param  {mixed} urls
     *
     * @return {mixed}
     */
    flashUrls(urls) {
        this.action = "RefreshCdnUrl";

        return this.request(this.buildRequestParams(urls, "urls"));
    }

    /**
     * Request
     *
     * @param  {mixed} params
     *
     * @return {mixed}
     */
    request(params) {
        let requestUrl = this.requestUrl

        return new Promise(function (resolve, reject) {
            http.post(requestUrl, {form: params}, function (err, httpResponse, body) {
                if (err) {
                    reject(err, httpResponse, body)
                } else {
                    resolve(httpResponse.body, body)
                }
            });
        });
    }

    /**
     * Transformer Urls
     *
     * @param  {String|Array} urls
     * @param  {String} type
     *
     * @return {Object}
     */
    transformerUrls(urls, type = "urls") {
        let bodys = {};

        if (! Array.isArray(urls)) {
            if (typeof urls !== "string") {
                new Error("Unsupported urls type,only support Array or String.");
            }

            bodys[`${type}.0`] = urls;
        } else {
            for (let index = 0; index < urls.length; index ++) {
                let filedName = `${type}.${index}`;
                bodys[filedName] = urls[index];
            }
        }

        return bodys;
    }

    /**
     * Build request params
     *
     * @param  {String|Array} urls
     * @param  {String} type
     *
     * @return {Object}
     */
    buildRequestParams(urls, type = "urls") {
        let params = Object.assign(this.transformerUrls(urls, type), {
            "Action": this.action,
            "Timestamp": Math.round(new Date().getTime() / 1000),
            "Nonce": Math.ceil(Math.random() * 10000),
            "SecretId": this.configs.SecretId,
        });

        params["Signature"] = signature.setSecretKey(this.configs.SecretKey).sign(this.method, this.host, params);

        return params;
    }
}

module.exports = Refresh;
