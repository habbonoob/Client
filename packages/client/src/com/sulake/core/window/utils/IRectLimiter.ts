export interface IRectLimiter {
    get minWidth(): number;
    set minWidth(param1: number);
    get maxWidth(): number;
    set maxWidth(param1: number);
    get minHeight(): number;
    set minHeight(param1: number);
    get maxHeight(): number;
    set maxHeight(param1: number);
    get isEmpty(): boolean;
    setEmpty(): void;
    limit(): void;
}
