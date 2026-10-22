export interface ICaptchaListener {
    handleCaptchaError(): void;
    handleCaptchaResult(param1: string): void;
    getProperty(param1: string, param2?: Map<any, any>): string;
}
