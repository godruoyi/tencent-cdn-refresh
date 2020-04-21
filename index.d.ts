export interface Response {
    code: number;
    message: string;
    codeDesc: string;
    data: { count: number, task_id: string };
}

export = class Refresh {
    public host: string;
    public protocol: string;
    public constructor(public configs: {
        SecretId: string;
        SecretKey: string;
        Timestamp?: number;
        Nonce?: number;
        path?: string;
    });

    public purgeDirsCache(dirs: string | string[]): Promise<Response>
    public purgeUrlsCache(dirs: string | string[]): Promise<Response>

    public request(params: any): Promise<Response>
    public transformerUrls(urls: string | string[], type?: 'urls' | 'dirs'): Record<string, string>
    public buildRequestParams(urls: string | string[], type?: 'urls' | 'dirs', action?: 'RefreshCdnUrl' | 'RefreshCdnDir'): Record<string, string>
}
