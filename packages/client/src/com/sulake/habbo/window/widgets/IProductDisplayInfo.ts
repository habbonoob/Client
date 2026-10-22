export interface IProductDisplayInfo {
    get productTypeId(): number;
    get itemTypeId(): string;
    get extraData(): string;
    get petFigureString(): string;
    get figureSetIds(): number[];
}
