export interface SliderValueConverter {
    toIntParam(param1: string): number;
    toString(param1: number): string;
    get precision(): number;
    get endsWithFive(): boolean;
}
