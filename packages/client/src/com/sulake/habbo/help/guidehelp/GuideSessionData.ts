import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GuideSessionData {
    static { registerClassName(this, 'com.sulake.habbo.help.guidehelp::GuideSessionData'); }

    public static readonly ROLE_UNDECIDED: number = 0;
    public static readonly ROLE_GUIDE: number = 1;
    public static readonly ROLE_USER: number = 2;
    public static readonly _SafeStr_8434: number = 0;
    public static readonly _SafeStr_8238: number = 1;
    public static readonly _SafeStr_7892: number = 2;

    constructor() {
    }

    private _role: number = 0;
    private _activeWindow: string = "";
    private _requestType: number = 0;
    private _requestDescription: string = "";
    private _userId: number = 0;
    private _userFigure: string = "";
    private _guideId: number = 0;
    private _guideFigure: string = "";
    private _userName: string = "";

    public get userName(): string {
        return this._userName;
    }

    public set userName(param1: string) {
        this._userName = param1;
    }

    private _guideName: string = "";

    public get guideName(): string {
        return this._guideName;
    }

    public set guideName(param1: string) {
        this._guideName = param1;
    }

    public set role(param1: number) {
        this._role = param1;
    }

    public get activeWindow(): string {
        return this._activeWindow;
    }

    public set activeWindow(param1: string) {
        this._activeWindow = param1;
    }

    public get requestType(): number {
        return this._requestType;
    }

    public set requestType(param1: number) {
        this._requestType = param1;
    }

    public get requestDescription(): string {
        return this._requestDescription;
    }

    public set requestDescription(param1: string) {
        this._requestDescription = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(param1: number) {
        this._userId = param1;
    }

    public get userFigure(): string {
        return this._userFigure;
    }

    public set userFigure(param1: string) {
        this._userFigure = param1;
    }

    public get guideId(): number {
        return this._guideId;
    }

    public set guideId(param1: number) {
        this._guideId = param1;
    }

    public get guideFigure(): string {
        return this._guideFigure;
    }

    public set guideFigure(param1: string) {
        this._guideFigure = param1;
    }

    public isActiveSession(): boolean {
        return this.isActiveUserSession() || this.isActiveGuideSession();
    }

    public isActiveUserSession(): boolean {
        return this._role == 2 && (this._activeWindow == "user_create" || this._activeWindow == "user_pending" || this._activeWindow == "user_ongoing" || this._activeWindow == "user_feedback");
    }

    public isActiveGuideSession(): boolean {
        return this._role == 1 && (this._activeWindow == "guide_accept" || this._activeWindow == "guide_ongoing" || this._activeWindow == "guide_closed");
    }

    public isOnGoingSession(): boolean {
        return this._activeWindow == "guide_ongoing" || this._activeWindow == "user_ongoing";
    }
}
