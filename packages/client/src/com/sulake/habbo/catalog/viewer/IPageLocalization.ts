export interface IPageLocalization {
    get imageCount(): number;
    get textCount(): number;
    getTextElementName(param1: number, param2: string): string;
    getImageElementName(param1: number, param2: string): string;
    getTextElementContent(param1: number): string;
    getImageElementContent(param1: number): string;
    dispose(): void;
    hasLinks(param1: string): boolean;
    getLinks(param1: string): any[];
    getColorUintFromText(param1: number): number;
}
