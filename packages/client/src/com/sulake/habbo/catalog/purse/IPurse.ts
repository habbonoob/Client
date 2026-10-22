export interface IPurse {
    get isExpiring(): boolean;
    set isExpiring(param1: boolean);
    get minutesUntilExpiration(): number;
    get credits(): number;
    set credits(param1: number);
    get silverBalance(): number;
    set silverBalance(param1: number);
    get emeraldBalance(): number;
    set emeraldBalance(param1: number);
    get clubDays(): number;
    set clubDays(param1: number);
    get clubPeriods(): number;
    set clubPeriods(param1: number);
    get hasClubLeft(): boolean;
    get isVIP(): boolean;
    get pastClubDays(): number;
    get pastVipDays(): number;
    getActivityPointsForType(param1: number): number;
}
