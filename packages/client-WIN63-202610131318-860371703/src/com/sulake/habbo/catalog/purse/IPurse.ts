export interface IPurse {
    set credits(param1: number);
    set silverBalance(param1: number);
    set emeraldBalance(param1: number);
    set clubDays(param1: number);
    set clubPeriods(param1: number);
    get isExpiring(): boolean;
    get minutesUntilExpiration(): number;
    set isExpiring(param1: boolean);
    get credits(): number;
    get silverBalance(): number;
    get emeraldBalance(): number;
    get clubDays(): number;
    get clubPeriods(): number;
    get hasClubLeft(): boolean;
    get isVIP(): boolean;
    get pastClubDays(): number;
    get pastVipDays(): number;
    getActivityPointsForType(param1: number): number;
}
