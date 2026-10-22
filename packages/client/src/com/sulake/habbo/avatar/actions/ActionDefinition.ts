import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ActionType } from '@/com/sulake/habbo/avatar/actions/ActionType';

export class ActionDefinition implements IActionDefinition {
    static { registerClassName(this, 'com.sulake.habbo.avatar.actions::ActionDefinition'); }

    constructor(param1: XML = null) {
        if (param1 != null) {
            this.createFromXml(param1);
        }
    }

    declare private _id: string;

    declare private _state: string;

    declare private _precedence: number;
    static { (this.prototype as any)._precedence = 0; }

    declare private _activePartSet: string;

    declare private _assetPartDefinition: string;

    declare private _lay: string;

    declare private _geometryType: string;

    private _isAnimation: boolean = false;
    private _startFromFrameZero: boolean = false;
    private _prevents: any[] = [];

    declare private _preventHeadTurn: boolean;
    static { (this.prototype as any)._preventHeadTurn = false; }

    declare private _SafeStr_2793: UtilsMap;

    private _types: Map<any, any> = new Dictionary();
    private _SafeStr_4970: string = "";
    private _isMain: boolean = false;

    public get isMain(): boolean {
        return this._isMain;
    }

    private _isDefault: boolean = false;

    public get isDefault(): boolean {
        return this._isDefault;
    }

    private _params: Map<any, any> = new Dictionary();

    public get params(): Map<any, any> {
        return this._params;
    }

    public get id(): string {
        return this._id;
    }

    public get state(): string {
        return this._state;
    }

    public get precedence(): number {
        return this._precedence;
    }

    public get activePartSet(): string {
        return this._activePartSet;
    }

    public get assetPartDefinition(): string {
        return this._assetPartDefinition;
    }

    public get lay(): string {
        return this._lay;
    }

    public get geometryType(): string {
        return this._geometryType;
    }

    public get isAnimation(): boolean {
        return this._isAnimation;
    }

    public get startFromFrameZero(): boolean {
        return this._startFromFrameZero;
    }

    public setOffsets(param1: string, param2: number, param3: any[]): void {
        if (this._SafeStr_2793 == null) {
            this._SafeStr_2793 = new UtilsMap();
        }
        if (this._SafeStr_2793.getValue(param1) == null) {
            this._SafeStr_2793.add(param1, new UtilsMap());
        }
        let _loc4_: UtilsMap = this._SafeStr_2793.getValue(param1);
        _loc4_.add(param2, param3);
    }

    public getOffsets(param1: string, param2: number): any[] {
        if (this._SafeStr_2793 == null) {
            return null;
        }
        let _loc3_: UtilsMap = asInstanceOf(this._SafeStr_2793.getValue(param1), UtilsMap);
        if (_loc3_ == null) {
            return null;
        }
        return asGuarded(_loc3_.getValue(param2), Array.isArray);
    }

    public getParameterValue(param1: string): string {
        if (param1 == "") {
            return "";
        }
        let _loc2_: string = stringOrNull(this._params.get(param1));
        if (_loc2_ == null) {
            _loc2_ = this._SafeStr_4970;
        }
        return _loc2_;
    }

    public toString(): string {
        return "[ActionDefinition]\nid:           " + this.id + "\n" + "state:        " + this.state + "\n" + "main:         " + this.isMain + "\n" + "default:      " + this.isDefault + "\n" + "geometry:     " + this.state + "\n" + "precedence:   " + this.precedence + "\n" + "activepartset:" + this.activePartSet + "\n" + "activepartdef:" + this.assetPartDefinition + "";
    }

    public getPrevents(param1: string = ""): any[] {
        return this._prevents.concat(this.getTypePrevents(param1));
    }

    public getPreventHeadTurn(param1: string = ""): boolean {
        if (param1 == "") {
            return this._preventHeadTurn;
        }
        let _loc2_: ActionType = this._types.get(param1);
        if (_loc2_ != null) {
            return _loc2_.preventHeadTurn;
        }
        return this._preventHeadTurn;
    }

    public isAnimated(param1: string): boolean {
        if (param1 == "") {
            return true;
        }
        let _loc2_: ActionType = this._types.get(param1);
        if (_loc2_ != null) {
            return _loc2_.isAnimated;
        }
        return true;
    }

    public setGeometryType(param1: string): void {
        this._geometryType = param1;
    }

    public setState(param1: string): void {
        this._state = param1;
    }

    public setAssetPartDefinition(param1: string): void {
        this._assetPartDefinition = param1;
    }

    public copy(): ActionDefinition {
        let _loc1_: ActionDefinition = new ActionDefinition();
        _loc1_._id = this._id;
        _loc1_._state = this._state;
        _loc1_._precedence = this._precedence;
        _loc1_._activePartSet = this._activePartSet;
        _loc1_._assetPartDefinition = this._assetPartDefinition;
        _loc1_._lay = this._lay;
        _loc1_._geometryType = this._geometryType;
        _loc1_._isMain = this._isMain;
        _loc1_._isDefault = this._isDefault;
        _loc1_._isAnimation = this._isAnimation;
        _loc1_._startFromFrameZero = this._startFromFrameZero;
        _loc1_._prevents = this._prevents;
        _loc1_._preventHeadTurn = this._preventHeadTurn;
        _loc1_._SafeStr_2793 = this._SafeStr_2793;
        _loc1_._types = this._types;
        _loc1_._params = this._params;
        _loc1_._SafeStr_4970 = this._SafeStr_4970;
        return _loc1_;
    }

    private createFromXml(param1: XML): void {
        let _loc6_: string = null;
        let _loc7_: string = null;
        let _loc4_: string = null;
        this._id = String(param1.attribute("id"));
        this._state = String(param1.attribute("state"));
        this._precedence = parseInt(param1.attribute("precedence").toString()) | 0;
        this._activePartSet = String(param1.attribute("activepartset"));
        this._assetPartDefinition = String(param1.attribute("assetpartdefinition"));
        this._lay = String(param1.attribute("lay"));
        this._geometryType = String(param1.attribute("geometrytype"));
        this._isMain = Boolean(parseInt(param1.attribute("main").toString()));
        this._isDefault = Boolean(parseInt(param1.attribute("isdefault").toString()));
        this._isAnimation = Boolean(parseInt(param1.attribute("animation").toString()));
        this._startFromFrameZero = param1.attribute("startfromframezero")?.toString() == "true";
        this._preventHeadTurn = param1.attribute("preventheadturn")?.toString() == "true";
        let _loc3_: string = String(param1.attribute("prevents"));
        if (_loc3_ != "") {
            this._prevents = _loc3_.split(",");
        }
        for (const _loc2_ of param1.child("param") ?? []) {
            _loc6_ = String(_loc2_.attribute("id"));
            _loc7_ = String(_loc2_.attribute("value"));
            if (_loc6_ == "default") {
                this._SafeStr_4970 = _loc7_;
            } else {
                this._params.set(_loc6_, _loc7_);
            }
        }
        for (const _loc5_ of param1.child("type") ?? []) {
            _loc4_ = String(_loc5_.attribute("id"));
            this._types.set(_loc4_, new ActionType(_loc5_));
        }
    }

    private getTypePrevents(param1: string): any[] {
        if (param1 == "") {
            return [];
        }
        let _loc2_: ActionType = this._types.get(param1);
        if (_loc2_ != null) {
            return _loc2_.prevents;
        }
        return [];
    }
}
