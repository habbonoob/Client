export interface IKeyExchange {
    init(param1: string, param2?: number): boolean;
    generateSharedKey(param1: string, param2?: number): string;
    getSharedKey(param1?: number): string;
    getPublicKey(param1?: number): string;
    isValidServerPublicKey(): boolean;
    isValidSharedKey(): boolean;
}
