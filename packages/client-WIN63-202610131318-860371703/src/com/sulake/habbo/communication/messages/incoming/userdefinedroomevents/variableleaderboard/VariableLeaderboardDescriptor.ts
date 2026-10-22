import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import { VariableLeaderboardDescriptorChoice } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptorChoice';
import { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';

export class VariableLeaderboardDescriptor {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardDescriptor'); }

    public static readonly _SafeStr_14138: number[] = [10, 15, 20];

    declare private _overlayInstanceId: number;
    static { (this.prototype as any)._overlayInstanceId = 0; }

    declare private _SafeStr_14030: number;
    static { (this.prototype as any)._SafeStr_14030 = 0; }

    declare private _title: string;

    declare private _description: string;

    declare private _location: VariableLeaderboardLocation;

    declare private _sortMode: number;
    static { (this.prototype as any)._sortMode = 0; }

    declare private _SafeStr_14139: number;
    static { (this.prototype as any)._SafeStr_14139 = 0; }

    declare private _columns: VariableLeaderboardColumn[];

    declare private _SafeStr_14075: VariableLeaderboardDescriptorChoice[];

    declare private _SafeStr_14140: string;

    constructor(param1: number, param2: number, param3: string, param4: string, param5: VariableLeaderboardLocation, param6: number, param7: VariableLeaderboardColumn[], param8: VariableLeaderboardDescriptorChoice[], param9: string, param10: number) {
        this._overlayInstanceId = param1;
        this._SafeStr_14030 = param2;
        this._title = param3;
        this._description = param4;
        this._location = param5;
        this._sortMode = param6;
        this._SafeStr_14139 = param10;
        this._columns = param7.slice();
        // this._columns.fixed = true: an array's length cannot be fixed
        this._SafeStr_14075 = param8.slice();
        // this._SafeStr_14075.fixed = true: an array's length cannot be fixed
        this._SafeStr_14140 = param9;
    }

    public static fromMessage(param1: IMessageDataWrapper): VariableLeaderboardDescriptor {
        let _loc4_: number = 0;
        let _loc9_: number = param1.readInteger();
        let _loc12_: number = param1.readInteger();
        let _loc10_: string = param1.readString();
        let _loc3_: string = param1.readString();
        let _loc5_: VariableLeaderboardLocation = new VariableLeaderboardLocation(param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger());
        let _loc6_: number = param1.readInteger();
        let _loc7_: number = param1.readInteger();
        if (_loc7_ < 1 || _loc7_ > 4) {
            return null;
        }
        let _loc2_: VariableLeaderboardColumn[] = [];
        _loc4_ = 0;
        while (_loc4_ < _loc7_) {
            _loc2_.push(new VariableLeaderboardColumn(param1.readInteger(), param1.readString(), param1.readInteger()));
            _loc4_++;
        }
        let _loc8_: number = param1.readInteger();
        if (_loc8_ < 0 || _loc8_ > 10) {
            return null;
        }
        let _loc11_: VariableLeaderboardDescriptorChoice[] = [];
        _loc4_ = 0;
        while (_loc4_ < _loc8_) {
            _loc11_.push(new VariableLeaderboardDescriptorChoice(param1.readString(), param1.readString()));
            _loc4_++;
        }
        return new VariableLeaderboardDescriptor(_loc9_, _loc12_, _loc10_, _loc3_, _loc5_, _loc6_, _loc2_, _loc11_, param1.readString(), param1.readInteger());
    }

    public get overlayInstanceId(): number {
        return this._overlayInstanceId;
    }

    public get queryRevision(): number {
        return this._SafeStr_14030;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get location(): VariableLeaderboardLocation {
        return this._location;
    }

    public get sortMode(): number {
        return this._sortMode;
    }

    public get columns(): VariableLeaderboardColumn[] {
        return this._columns.slice();
    }

    public get pageSizeOption(): number {
        return this._SafeStr_14139;
    }

    public get entriesPerPage(): number {
        return VariableLeaderboardDescriptor._SafeStr_14138[this._SafeStr_14139];
    }

    public get choices(): VariableLeaderboardDescriptorChoice[] {
        return this._SafeStr_14075.slice();
    }

    public get defaultVariableId(): string {
        return this._SafeStr_14140;
    }
}
