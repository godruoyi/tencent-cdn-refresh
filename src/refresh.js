import http from "./http";
import signature from "./signature";

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

        return http.post(this.requestUrl, this.buildRequestParams(dirs, "dirs"));
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

        return http.post(this.requestUrl, this.buildRequestParams(urls, "urls"));
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
