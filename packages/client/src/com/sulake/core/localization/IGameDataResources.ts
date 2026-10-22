export interface IGameDataResources {
    isValid(): boolean;
    getExternalTextsUrl(): string;
    getExternalTextsHash(): string;
    getExternalVariablesUrl(): string;
    getExternalVariablesHash(): string;
    getFurniDataUrl(): string;
    getFurniDataHash(): string;
    getProductDataUrl(): string;
    getProductDataHash(): string;
}
