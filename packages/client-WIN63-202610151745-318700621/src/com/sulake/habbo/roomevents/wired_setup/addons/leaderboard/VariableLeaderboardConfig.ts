import { asGuarded, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import type { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';

export class VariableLeaderboardConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.leaderboard::VariableLeaderboardConfig'); }

    public static readonly OPERAND_LITERAL: number = 0;
    public static readonly _SafeStr_14536: number = 1;
    public static readonly NULL_VARIABLE_ID: string = "0";

    declare private _title: string;

    declare private _description: string;

    declare private _columns: VariableLeaderboardColumn[];

    declare private _sortMode: number;
    static { (this.prototype as any)._sortMode = 0; }

    declare private _SafeStr_14048: number;
    static { (this.prototype as any)._SafeStr_14048 = 0; }

    declare private _SafeStr_14537: boolean;
    static { (this.prototype as any)._SafeStr_14537 = false; }

    declare private _SafeStr_14538: string;

    declare private _SafeStr_14539: boolean;
    static { (this.prototype as any)._SafeStr_14539 = false; }

    declare private _SafeStr_14540: number;
    static { (this.prototype as any)._SafeStr_14540 = 0; }

    declare private _SafeStr_14541: string;

    declare private _SafeStr_14542: string;

    declare private _displayOverrides: any;

    declare private _location: VariableLeaderboardLocation;

    constructor(param1: string, param2: string, param3: VariableLeaderboardColumn[], param4: number, param5: boolean, param6: string, param7: boolean, param8: number, param9: string, param10: string, param11: any, param12: VariableLeaderboardLocation, param13: number = 0) {
        if (param1 == null || param2 == null || param3 == null || param6 == null || param9 == null || param10 == null || param11 == null || param12 == null) {
            throw new ArgumentError("Variable leaderboard configuration fields must not be null.");
        }
        this._title = param1;
        this._description = param2;
        this._columns = param3.slice();
        // this._columns.fixed = true: an array's length cannot be fixed
        this._sortMode = param4;
        this._SafeStr_14048 = param13;
        this._SafeStr_14537 = param5;
        this._SafeStr_14538 = param6;
        this._SafeStr_14539 = param7;
        this._SafeStr_14540 = param8;
        this._SafeStr_14541 = param9;
        this._SafeStr_14542 = param10;
        this._displayOverrides = VariableLeaderboardConfig.copyDisplayOverrides(param11);
        this._location = param12;
    }

    private static copyDisplayOverrides(param1: any): any {
        let _loc3_: string = null;
        let _loc2_: any = {};
        for (const _loc4_ of keysOf(param1)) {
            if (param1.hasOwnProperty(_loc4_)) {
                _loc3_ = asGuarded(param1[_loc4_], isString);
                if (_loc3_ == null) {
                    throw new ArgumentError("Variable leaderboard display override must be a String.");
                }
                if (_loc3_.length > 0) {
                    _loc2_[_loc4_] = _loc3_;
                }
            }
        }
        return _loc2_;
    }

    private static compareSerializedIds(param1: string, param2: string): number {
        if (param1 < param2) {
            return -1;
        }
        if (param1 > param2) {
            return 1;
        }
        return 0;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get columns(): VariableLeaderboardColumn[] {
        return this._columns.slice();
    }

    public get sortMode(): number {
        return this._sortMode;
    }

    public get filterEnabled(): boolean {
        return this._SafeStr_14537;
    }

    public get pageSizeOption(): number {
        return this._SafeStr_14048;
    }

    public get entriesPerPage(): number {
        return VariableLeaderboardDescriptor._SafeStr_14046[this._SafeStr_14048];
    }

    public setPageSizeOption(param1: number): void {
        this._SafeStr_14048 = param1;
    }

    public get filterVariableId(): string {
        return this._SafeStr_14538;
    }

    public get comparisonEnabled(): boolean {
        return this._SafeStr_14539;
    }

    public get operandKind(): number {
        return this._SafeStr_14540;
    }

    public get globalOperandVariableId(): string {
        return this._SafeStr_14541;
    }

    public get literal(): string {
        return this._SafeStr_14542;
    }

    public get displayOverrideIds(): string[] {
        let _loc1_: string[] = [];
        for (const _loc2_ of keysOf(this._displayOverrides)) {
            if (this._displayOverrides.hasOwnProperty(_loc2_)) {
                _loc1_.push(stringOrNull(_loc2_));
            }
        }
        _loc1_.sort(VariableLeaderboardConfig.compareSerializedIds);
        return _loc1_;
    }

    public get location(): VariableLeaderboardLocation {
        return this._location;
    }

    public displayOverrideFor(param1: string): string {
        if (param1 == null || !this._displayOverrides.hasOwnProperty(param1)) {
            return null;
        }
        return asGuarded(this._displayOverrides[param1], isString);
    }

    public setInformation(param1: string, param2: string): void {
        this._title = param1;
        this._description = param2;
    }

    public setColumns(param1: VariableLeaderboardColumn[]): void {
        this._columns = param1.slice();
        // this._columns.fixed = true: an array's length cannot be fixed
    }

    public setSortMode(param1: number): void {
        this._sortMode = param1;
    }

    public setFilter(param1: boolean, param2: string, param3: boolean, param4: number, param5: string, param6: string): void {
        this._SafeStr_14537 = param1;
        this._SafeStr_14538 = param2;
        this._SafeStr_14539 = param3;
        this._SafeStr_14540 = param4;
        this._SafeStr_14541 = param5;
        this._SafeStr_14542 = param6;
    }

    public setDisplayOverrides(param1: any): void {
        this._displayOverrides = VariableLeaderboardConfig.copyDisplayOverrides(param1);
    }

    public setLocation(param1: VariableLeaderboardLocation): void {
        this._location = param1;
    }
}
