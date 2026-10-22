export interface IHabboWebApiListener {
    get disposed(): boolean;
    habboWebApiResponse(param1: string, param2: any): void;
    habboWebApiRawResponse(param1: string, param2: any): void;
    habboWebApiError(param1: string, param2: number, param3: string, param4: any, param5?: boolean): void;
}
