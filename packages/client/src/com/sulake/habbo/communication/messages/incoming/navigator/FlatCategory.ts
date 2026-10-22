import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FlatCategory {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::FlatCategory'); }

    constructor(param1: IMessageDataWrapper) {
        this._nodeId = param1.readInteger();
        this._nodeName = param1.readString();
        this._visible = param1.readBoolean();
        this._automatic = param1.readBoolean();
        this._automaticCategoryKey = param1.readString();
        this._globalCategoryKey = param1.readString();
        this._staffOnly = param1.readBoolean();
    }

    declare private _nodeId: number;
    static { (this.prototype as any)._nodeId = 0; }

    declare private _nodeName: string;

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    declare private _automatic: boolean;
    static { (this.prototype as any)._automatic = false; }

    declare private _automaticCategoryKey: string;

    declare private _globalCategoryKey: string;

    declare private _staffOnly: boolean;
    static { (this.prototype as any)._staffOnly = false; }

    public get nodeId(): number {
        return this._nodeId;
    }

    public get nodeName(): string {
        return this._nodeName;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get automatic(): boolean {
        return this._automatic;
    }

    public get staffOnly(): boolean {
        return this._staffOnly;
    }

    public get automaticCategoryKey(): string {
        return this._automaticCategoryKey;
    }

    public get globalCategoryKey(): string {
        return this._globalCategoryKey;
    }

    public get visibleName(): string {
        return this._globalCategoryKey == "" ? this._nodeName : "${navigator.flatcategory.global." + this._globalCategoryKey + "}";
    }
}
