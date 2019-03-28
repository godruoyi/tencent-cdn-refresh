class Refresh {
    constructor(configs) {
        this.configs = Object.assign({
            secretid: '',
            secretid: '',
            secretid: '',
            secretid: '',
            secretid: '',
            secretid: '',
        }, configs)
    }

    dir(dirs) {

    }

    url(urls) {

    }

    getConfigs(key = null) {
        if (key && this.configs[key] !== undefined) {
            return this.configs[key]
        }

        return this.configs;
    }
}

module.exports = Refresh;
