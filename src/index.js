const fetch = require('node-fetch');
const Signature = require('./signature');
const { URLSearchParams } = require('url');

module.exports = class Refresher {
    constructor(configs) {
        this.configs = Object.assign({
            SecretId: null,
            SecretKey: null,
            Timestamp: Date.now(),
            Nonce: Math.ceil(Math.random() * 10000),
            path: '/v2/index.php'
        }, configs);

        this.host = 'cdn.api.qcloud.com';
        this.protocol = 'https:';
    }

    /**
     * Flash dirs cache
     * example:
     *      purgeDirsCache(dir1)
     *      purgeDirsCache(['dir1', 'dir2'])
     *
     * @param  {mixed} dirs
     *
     * @return {mixed}
     */
    purgeDirsCache(dirs) {
        return this.request(this.buildRequestParams(dirs, 'dirs', 'RefreshCdnDir'));
    }

    /**
     * Flash url cache
     *
     * example:
     *      purgeUrlsCache(url1)
     *      purgeUrlsCache(['url1', 'url2'])
     *
     * @param  {mixed} urls
     *
     * @return {mixed}
     */
    purgeUrlsCache(urls) {
        return this.request(this.buildRequestParams(urls));
    }

    /**
     * Request
     *
     * @param  {mixed} params
     *
     * @return {mixed}
     */
    request(params) {
        return fetch(`${this.protocol}//${this.host}${this.configs.path}`, {
            method: 'POST',
            body: new URLSearchParams(params)
        }).then((it) => it.json());
    }

    /**
     * Transformer Urls
     *
     * @param  {String|Array} urls
     * @param  {String} type
     *
     * @return {Object}
     */
    transformerUrls(urls, type = 'urls') {
        let body = {};

        if (! Array.isArray(urls)) {
            if (typeof urls !== 'string') {
                new Error('Unsupported urls type,only support Array or String.');
            }

            body[`${type}.0`] = urls;
        } else {
            urls.forEach((url, index) => {
                body[`${type}.${index}`] = url;
            })
        }

        return body;
    }

    /**
     * Build request params
     *
     * @param  {String|Array} urls
     * @param  {String} type
     * @param  {String} action
     *
     * @return {Object}
     */
    buildRequestParams(urls, type = 'urls', action = 'RefreshCdnUrl') {
        let params = Object.assign(this.transformerUrls(urls, type), {
            Action: action,
            Timestamp: Math.round(new Date().getTime() / 1000),
            Nonce: Math.ceil(Math.random() * 10000),
            SecretId: this.configs.SecretId,
        });

        params.Signature = new Signature(this.configs.SecretKey).sign('post', this.host, params);

        return params;
    }
}
