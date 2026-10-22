import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetAvatarEffect } from '@/com/sulake/habbo/ui/widget/memenu/IWidgetAvatarEffect';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IHabboAvatarEditorAvatarEffect } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorAvatarEffect';
import { IAvatarEffect } from '@/com/sulake/habbo/inventory/IAvatarEffect';
import { IThumbListDrawableItem } from '@/com/sulake/habbo/inventory/IThumbListDrawableItem';

export class Effect implements IWidgetAvatarEffect, IThumbListDrawableItem, IHabboAvatarEditorAvatarEffect, IAvatarEffect {
    static { registerClassName(this, 'com.sulake.habbo.inventory.effects::Effect'); }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _subType: number;
    static { (this.prototype as any)._subType = 0; }

    declare private _duration: number;
    static { (this.prototype as any)._duration = 0; }

    private _amountInInventory: number = 1;

    declare private _SafeStr_4639: number;
    static { (this.prototype as any)._SafeStr_4639 = 0; }

    private _isPermanent: boolean = false;
    private _isActive: boolean = false;
    private _isSelected: boolean = false;
    private _SafeStr_4883: boolean = false;

    declare private _iconImage: BitmapData;

    declare private _SafeStr_7181: Date;

    constructor() {
    }

    public get type(): number {
        return this._type;
    }

    public get subType(): number {
        return this._subType;
    }

    public get duration(): number {
        return this._duration;
    }

    public get amountInInventory(): number {
        return this._amountInInventory;
    }

    public get isPermanent(): boolean {
        return this._isPermanent;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public get isInUse(): boolean {
        return this._SafeStr_4883;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public get icon(): BitmapData {
        return this._iconImage;
    }

    public get iconImage(): BitmapData {
        return this._iconImage;
    }

    public get secondsLeft(): number {
        let _loc1_: number = 0;
        if (this._isActive) {
            _loc1_ = this._SafeStr_4639 - (new Date().valueOf() - this._SafeStr_7181.valueOf()) / 1000 | 0;
            _loc1_ = Math.floor(_loc1_) | 0;
            if (_loc1_ < 0) {
                _loc1_ = 0;
            }
            return _loc1_;
        }
        return this._SafeStr_4639;
    }

    public set type(param1: number) {
        this._type = param1;
    }

    public set subType(param1: number) {
        this._subType = param1;
    }

    public set duration(param1: number) {
        this._duration = param1;
    }

    public set secondsLeft(param1: number) {
        this._SafeStr_4639 = param1;
    }

    public set isPermanent(param1: boolean) {
        this._isPermanent = param1;
    }

    public set isSelected(param1: boolean) {
        this._isSelected = param1;
    }

    public set isInUse(param1: boolean) {
        this._SafeStr_4883 = param1;
    }

    public set iconImage(param1: BitmapData) {
        this._iconImage = param1;
    }

    public set amountInInventory(param1: number) {
        this._amountInInventory = param1;
    }

    public set isActive(param1: boolean) {
        if (param1 && !this._isActive) {
            this._SafeStr_7181 = new Date();
        }
        this._isActive = param1;
    }

    public setOneEffectExpired(): void {
        this._amountInInventory = this._amountInInventory - 1;
        if (this._amountInInventory < 0) {
            this._amountInInventory = 0;
        }
        this._SafeStr_4639 = this._duration;
        this._isActive = false;
        this._SafeStr_4883 = false;
    }

    get [IThumbListDrawableItem](): true {
        return true;
    }

    get [IHabboAvatarEditorAvatarEffect](): true {
        return true;
    }

    get [IAvatarEffect](): true {
        return true;
    }
}
