export interface IFigurePart {
    get id(): number;
    get type(): string;
    get breed(): number;
    get colorLayerIndex(): number;
    get index(): number;
    get paletteMap(): number;
}
