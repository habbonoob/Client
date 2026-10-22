import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class IssueMessageData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::IssueMessageData'); }

    public static readonly STATE_OPEN: number = 1;
    public static readonly _SafeStr_8296: number = 2;
    public static readonly _SafeStr_8586: number = 3;

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: string, param10: number, param11: string, param12: number, param13: string, param14: string, param15: number, param16: any[]) {
        this._issueId = param1;
        this._state = param2;
        this._categoryId = param3;
        this._reportedCategoryId = param4;
        this._issueAgeInMilliseconds = param5;
        this._priority = param6;
        this._groupingId = param7;
        this._reporterUserId = param8;
        this._reporterUserName = param9;
        this._reportedUserId = param10;
        this._reportedUserName = param11;
        this._pickerUserId = param12;
        this._pickerUserName = param13;
        this._message = param14;
        this._chatRecordId = param15;
        this._patterns = param16;
        this._SafeStr_6781 = getTimer();
    }

    declare private _issueId: number;
    static { (this.prototype as any)._issueId = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _reportedCategoryId: number;
    static { (this.prototype as any)._reportedCategoryId = 0; }

    declare private _issueAgeInMilliseconds: number;
    static { (this.prototype as any)._issueAgeInMilliseconds = NaN; }

    declare private _groupingId: number;
    static { (this.prototype as any)._groupingId = 0; }

    declare private _reporterUserId: number;
    static { (this.prototype as any)._reporterUserId = 0; }

    declare private _reporterUserName: string;

    declare private _reportedUserId: number;
    static { (this.prototype as any)._reportedUserId = 0; }

    declare private _pickerUserId: number;
    static { (this.prototype as any)._pickerUserId = 0; }

    declare private _pickerUserName: string;

    declare private _message: string;

    declare private _chatRecordId: number;
    static { (this.prototype as any)._chatRecordId = 0; }

    declare private _patterns: any[];

    private _disposed: boolean = false;

    declare private _SafeStr_6781: number;
    static { (this.prototype as any)._SafeStr_6781 = NaN; }

    declare private _priority: number;
    static { (this.prototype as any)._priority = 0; }

    public get priority(): number {
        return this._priority;
    }

    declare private _reportedUserName: string;

    public get reportedUserName(): string {
        return this._reportedUserName;
    }

    public get issueId(): number {
        return this._issueId;
    }

    public get state(): number {
        return this._state;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get reportedCategoryId(): number {
        return this._reportedCategoryId;
    }

    public get issueAgeInMilliseconds(): number {
        return this._issueAgeInMilliseconds;
    }

    public get groupingId(): number {
        return this._groupingId;
    }

    public get reporterUserId(): number {
        return this._reporterUserId;
    }

    public get reporterUserName(): string {
        return this._reporterUserName;
    }

    public get reportedUserId(): number {
        return this._reportedUserId;
    }

    public get pickerUserId(): number {
        return this._pickerUserId;
    }

    public get pickerUserName(): string {
        return this._pickerUserName;
    }

    public get message(): string {
        return this._message;
    }

    public get chatRecordId(): number {
        return this._chatRecordId;
    }

    public get patterns(): any[] {
        return this._patterns;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        for (const _loc1_ of this._patterns ?? []) {
            _loc1_.dispose();
        }
        this._patterns = [];
        this._disposed = true;
    }

    public getOpenTime(param1: number): string {
        let _loc7_: number = (this._issueAgeInMilliseconds + param1 - this._SafeStr_6781) / 1000 | 0;
        let _loc5_: number = _loc7_ / 60 | 0;
        let _loc6_: number = _loc5_ % 60;
        let _loc4_: number = _loc5_ / 60 | 0;
        let _loc2_: string = (_loc6_ < 10 ? "0" : "") + _loc6_;
        let _loc3_: string = (_loc4_ < 10 ? "0" : "") + _loc4_;
        return _loc3_ + ":" + _loc2_;
    }

    get [IDisposable](): true {
        return true;
    }
}
