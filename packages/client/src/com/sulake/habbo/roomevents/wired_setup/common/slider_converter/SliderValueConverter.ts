export interface SliderValueConverter {
    get precision(): number;
    get endsWithFive(): boolean;
    toIntParam(param1: string): number;
    toString(param1: number): string;
}
