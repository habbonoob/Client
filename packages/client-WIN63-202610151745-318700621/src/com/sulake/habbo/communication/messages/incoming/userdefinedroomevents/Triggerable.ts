import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { InputSourcesConf } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/InputSourcesConf';
import { WiredContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/WiredContext';

export class Triggerable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::Triggerable'); }

    declare private _furniLimit: number;
    static { (this.prototype as any)._furniLimit = 0; }

    declare private _stuffIds: any[];

    declare private _stuffIds2: any[];

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _stringParam: string;

    declare private _intParams: any[];

    declare private _variableIds: any[];

    declare private _SafeStr_7026: number;
    static { (this.prototype as any)._SafeStr_7026 = 0; }

    declare private _code: number;
    static { (this.prototype as any)._code = 0; }

    declare private _furniSourceTypes: any[];

    declare private _userSourceTypes: any[];

    declare private _SafeStr_6811: boolean;
    static { (this.prototype as any)._SafeStr_6811 = false; }

    declare private _SafeStr_5706: InputSourcesConf;

    declare private _allowWallFurni: boolean;
    static { (this.prototype as any)._allowWallFurni = false; }

    declare private _wiredContext: WiredContext;

    declare private _defaultIntParams: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc7_: number = 0;
        let _loc2_: number = 0;
        let _loc10_: number = 0;
        this.initInstanceFields();
        this._stuffIds = [];
        this._stuffIds2 = [];
        this._intParams = [];
        this._variableIds = [];
        this._furniSourceTypes = [];
        this._userSourceTypes = [];
        this._defaultIntParams = [];
        this._furniLimit = param1.readInteger();
        let _loc9_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc9_) {
            _loc2_ = param1.readInteger();
            this._stuffIds.push(_loc2_);
            _loc7_++;
        }
        let _loc3_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc3_) {
            _loc10_ = param1.readInteger();
            this._stuffIds2.push(_loc10_);
            _loc7_++;
        }
        this._SafeStr_7026 = param1.readInteger();
        this._id = param1.readInteger();
        this._stringParam = param1.readString();
        let _loc4_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc4_) {
            this._intParams.push(param1.readInteger());
            _loc7_++;
        }
        let _loc6_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            this._variableIds.push(param1.readString());
            _loc7_++;
        }
        let _loc5_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc5_) {
            this._furniSourceTypes.push(param1.readInteger());
            _loc7_++;
        }
        let _loc11_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc11_) {
            this._userSourceTypes.push(param1.readInteger());
            _loc7_++;
        }
        this._code = param1.readInteger();
        this.readDefinitionSpecifics(param1);
        this._SafeStr_6811 = param1.readBoolean();
        this._SafeStr_5706 = new InputSourcesConf(param1);
        this._allowWallFurni = param1.readBoolean();
        this.readTypeSpecifics(param1);
        this._wiredContext = new WiredContext(param1);
        let _loc8_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc8_) {
            this._defaultIntParams.push(param1.readInteger());
            _loc7_++;
        }
    }

    public get furniLimit(): number {
        return this._furniLimit;
    }

    public get stuffIds(): any[] {
        return this._stuffIds;
    }

    public set stuffIds(param1: any[]) {
        this._stuffIds = param1;
    }

    public get stuffIds2(): any[] {
        return this._stuffIds2;
    }

    public set stuffIds2(param1: any[]) {
        this._stuffIds2 = param1;
    }

    public get id(): number {
        return this._id;
    }

    public get stringParam(): string {
        return this._stringParam;
    }

    public set stringParam(param1: string) {
        this._stringParam = param1;
    }

    public get intParams(): any[] {
        return this._intParams;
    }

    public set intParams(param1: any[]) {
        this._intParams = param1;
    }

    public get variableIds(): any[] {
        return this._variableIds;
    }

    public set variableIds(param1: any[]) {
        this._variableIds = param1;
    }

    public get furniSourceTypes(): any[] {
        return this._furniSourceTypes;
    }

    public set furniSourceTypes(param1: any[]) {
        this._furniSourceTypes = param1;
    }

    public get userSourceTypes(): any[] {
        return this._userSourceTypes;
    }

    public set userSourceTypes(param1: any[]) {
        this._userSourceTypes = param1;
    }

    public get advancedMode(): boolean {
        return this._SafeStr_6811;
    }

    public get inputSourcesConf(): InputSourcesConf {
        return this._SafeStr_5706;
    }

    public get code(): number {
        return this._code;
    }

    public get stuffTypeId(): number {
        return this._SafeStr_7026;
    }

    public getBoolean(param1: number): boolean {
        return this._intParams[param1] == 1;
    }

    public getString(param1: number = -1, param2: string = "\t"): string {
        if (param1 == -1) {
            return this._stringParam;
        }
        let _loc3_: any[] = this._stringParam.split(param2);
        return stringOrNull(_loc3_.length > param1 ? _loc3_[param1] : "");
    }

    public getInt(param1: number): number {
        return this._intParams[param1] | 0;
    }

    public get allowWallFurni(): boolean {
        return this._allowWallFurni;
    }

    public get wiredContext(): WiredContext {
        return this._wiredContext;
    }

    public get defaultIntParams(): any[] {
        return this._defaultIntParams;
    }

    protected readDefinitionSpecifics(param1: IMessageDataWrapper): void {
    }

    protected readTypeSpecifics(param1: IMessageDataWrapper): void {
    }

    public get usingCustomInputSources(): boolean {
        return this._SafeStr_5706.isUsingAdvancedSettings(this.furniSourceTypes, this.userSourceTypes);
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}
