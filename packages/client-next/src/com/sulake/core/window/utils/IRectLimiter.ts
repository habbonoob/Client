export interface IRectLimiter {
    get minWidth(): number;
    get maxWidth(): number;
    get minHeight(): number;
    get maxHeight(): number;
    set minWidth(param1: number);
    set maxWidth(param1: number);
    set minHeight(param1: number);
    set maxHeight(param1: number);
    get isEmpty(): boolean;
    setEmpty(): void;
    limit(): void;
}
