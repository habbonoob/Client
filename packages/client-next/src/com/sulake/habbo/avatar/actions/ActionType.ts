import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class ActionType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.actions::ActionType'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    private _prevents: any[] = [];
    private _preventHeadTurn: boolean = true;
    private _isAnimated: boolean = true;

    constructor(param1: XML) {
        this._id = parseInt(param1.attribute("value").toString()) | 0;
        this._value = parseInt(param1.attribute("value").toString()) | 0;
        let _loc3_: string = String(param1.attribute("prevents"));
        if (_loc3_ != "") {
            this._prevents = _loc3_.split(",");
        }
        this._preventHeadTurn = String(param1.attribute("preventheadturn")) == "true";
        let _loc2_: string = String(param1.attribute("animated"));
        if (_loc2_ == "") {
            this._isAnimated = true;
        } else {
            this._isAnimated = _loc2_ == "true";
        }
    }

    public get id(): number {
        return this._id;
    }

    public get value(): number {
        return this._value;
    }

    public get prevents(): any[] {
        return this._prevents;
    }

    public get preventHeadTurn(): boolean {
        return this._preventHeadTurn;
    }

    public get isAnimated(): boolean {
        return this._isAnimated;
    }
}
