import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { Effect } from '@/com/sulake/habbo/inventory/effects/Effect';
import type { EffectsView } from '@/com/sulake/habbo/inventory/effects/EffectsView';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IAvatarEffect } from '@/com/sulake/habbo/inventory/IAvatarEffect';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { AvatarEffectActivatedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/avatareffect/AvatarEffectActivatedComposer';
import { AvatarEffectSelectedComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/avatareffect/AvatarEffectSelectedComposer';
import { EffectListProxy } from '@/com/sulake/habbo/inventory/effects/EffectListProxy';
import { isIAvatarEffect } from '@/com/sulake/habbo/inventory/IAvatarEffect';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';

export class EffectsModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.effects::EffectsModel'); }

    public static readonly FILTER_NONE: number = -1;
    public static readonly FILTER_INCLUDE_INACTIVE: number = 0;
    public static readonly FILTER_INCLUDE_ACTIVE: number = 1;

    declare private _controller: HabboInventory;

    declare private _view: EffectsView;

    declare private _effects: any[];

    declare private _assets: IAssetLibrary;

    declare private _communication: IHabboCommunicationManager;

    declare private _SafeStr_4516: EffectListProxy;

    declare private _SafeStr_4263: EffectListProxy;

    private _disposed: boolean = false;
    private _lastActivatedEffect: number = -1;

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IHabboLocalizationManager) {
        this._controller = param1;
        this._effects = [];
        this._assets = param4;
        this._communication = param3;
        this._SafeStr_4516 = new EffectListProxy(this, 1);
        this._SafeStr_4263 = new EffectListProxy(this, 0);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get lastActivatedEffect(): number {
        return this._lastActivatedEffect;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._controller = null;
            if (this._view != null) {
                this._view.dispose();
            }
            if (this._SafeStr_4516 != null) {
                this._SafeStr_4516.dispose();
                this._SafeStr_4516 = null;
            }
            if (this._SafeStr_4263 != null) {
                this._SafeStr_4263.dispose();
                this._SafeStr_4263 = null;
            }
            this._disposed = true;
        }
    }

    public requestInitialization(): void {
    }

    public categorySwitch(param1: string): void {
    }

    public addEffect(param1: Effect, param2: boolean = true): void {
        let _loc4_: BitmapDataAsset = null;
        let _loc3_: Effect = this.getEffect(param1.type);
        if (_loc3_ != null) {
            _loc3_.amountInInventory++;
        } else {
            _loc4_ = castTo(this._assets.getAssetByName("fx_icon_" + param1.type + "_png"), BitmapDataAsset);
            if (_loc4_ != null) {
                param1.iconImage = castTo(_loc4_.content, BitmapData);
            }
            this._effects.push(param1);
        }
        if (param2) {
            this.refreshViews();
        }
    }

    private getEffect(param1: number): Effect {
        let _loc3_: number = 0;
        let _loc2_: Effect = null;
        _loc3_ = 0;
        while (_loc3_ < this._effects.length) {
            _loc2_ = this._effects[_loc3_];
            if (_loc2_.type == param1) {
                return _loc2_;
            }
            _loc3_++;
        }
        return null;
    }

    private removeEffect(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: Effect = null;
        _loc3_ = 0;
        while (_loc3_ < this._effects.length) {
            _loc2_ = this._effects[_loc3_];
            if (_loc2_.type == param1) {
                this._effects.splice(_loc3_, 1);
                this.refreshViews();
                return;
            }
            _loc3_++;
        }
    }

    public refreshViews(): void {
        if (this._view) {
            this._view.updateListViews();
            this._view.updateActionView();
        }
    }

    public requestEffectActivated(param1: number): void {
        this._controller.communication.connection.send(new AvatarEffectActivatedComposer(param1));
    }

    public setEffectActivated(param1: number): void {
        let _loc2_: Effect = this.getEffect(param1);
        if (_loc2_ != null) {
            this.stopUsingAllEffects(false, false);
            _loc2_.isActive = true;
            _loc2_.isInUse = true;
            this.refreshViews();
        }
    }

    public useEffect(param1: number): void {
        this.stopUsingAllEffects(false, false, true);
        let _loc2_: Effect = this.getEffect(param1);
        if (_loc2_ == null) {
            return;
        }
        if (!_loc2_.isActive) {
            this.requestEffectActivated(_loc2_.type);
        }
        if (_loc2_.isInUse == false) {
            _loc2_.isInUse = true;
            this._controller.communication.connection.send(new AvatarEffectSelectedComposer(param1));
            this._lastActivatedEffect = param1;
            this.refreshViews();
        }
    }

    public stopUsingEffect(param1: number, param2: boolean = false): void {
        let _loc3_: Effect = this.getEffect(param1);
        if (_loc3_ != null) {
            if (_loc3_.isInUse == true) {
                _loc3_.isInUse = false;
                if (param2) {
                    this._controller.communication.connection.send(new AvatarEffectSelectedComposer(-1));
                    this._lastActivatedEffect = -1;
                }
                this.refreshViews();
            }
        }
    }

    public stopUsingAllEffects(param1: boolean = true, param2: boolean = true, param3: boolean = false): void {
        let _loc5_: number = 0;
        let _loc4_: Effect = null;
        _loc5_ = 0;
        while (_loc5_ < this._effects.length) {
            _loc4_ = this._effects[_loc5_];
            _loc4_.isInUse = false;
            _loc5_++;
        }
        if (param1) {
            this._controller.communication.connection.send(new AvatarEffectSelectedComposer(-1));
        }
        if (param2) {
            this.refreshViews();
        }
        if (param3) {
            this._lastActivatedEffect = -1;
        }
    }

    public toggleEffectSelected(param1: number): void {
        let _loc2_: Effect = this.getEffect(param1);
        if (_loc2_ != null) {
            if (_loc2_.isSelected) {
                this.setEffectDeselected(param1);
            } else {
                this.setEffectSelected(param1);
            }
            this.refreshViews();
        }
    }

    public getEffectInterface(param1: number): IAvatarEffect {
        return asGuarded(this.getEffect(param1), isIAvatarEffect);
    }

    public setEffectSelected(param1: number): void {
        let _loc2_: Effect = this.getEffect(param1);
        if (_loc2_ != null) {
            this.setAllEffectsDeselected(false);
            _loc2_.isSelected = true;
            this.refreshViews();
        }
    }

    public setEffectDeselected(param1: number): void {
        let _loc2_: Effect = this.getEffect(param1);
        if (_loc2_ != null) {
            _loc2_.isSelected = false;
            this.refreshViews();
        }
    }

    private setAllEffectsDeselected(param1: boolean = true): void {
        let _loc3_: number = 0;
        let _loc2_: Effect = null;
        _loc3_ = 0;
        while (_loc3_ < this._effects.length) {
            _loc2_ = this._effects[_loc3_];
            _loc2_.isSelected = false;
            _loc3_++;
        }
        if (param1) {
            this.refreshViews();
        }
    }

    public getSelectedEffect(param1: number = -1): Effect {
        let _loc4_: number = 0;
        let _loc3_: Effect = null;
        let _loc2_: any[] = this.getEffects(param1);
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length) {
            _loc3_ = _loc2_[_loc4_];
            if (_loc3_.isSelected) {
                return _loc3_;
            }
            _loc4_++;
        }
        return null;
    }

    public getEffects(param1: number = -1): any[] {
        let _loc4_: number = 0;
        let _loc3_: Effect = null;
        let _loc2_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < this._effects.length) {
            _loc3_ = this._effects[_loc4_];
            if (_loc3_.isActive && param1 == 1 || !_loc3_.isActive && param1 == 0 || param1 == -1) {
                _loc2_.push(_loc3_);
            }
            _loc4_++;
        }
        return _loc2_;
    }

    public setEffectExpired(param1: number): void {
        this._lastActivatedEffect = -1;
        let _loc2_: Effect = this.getEffect(param1);
        if (_loc2_ != null) {
            if (_loc2_.amountInInventory > 1) {
                _loc2_.setOneEffectExpired();
                this.refreshViews();
            } else {
                this.removeEffect(_loc2_.type);
            }
        }
    }

    public getItemInIndex(param1: number, param2: number = -1): Effect {
        let _loc3_: any[] = this.getEffects(param2);
        if (param1 < 0 || param1 >= _loc3_.length) {
            return null;
        }
        return _loc3_[param1];
    }

    public getWindowContainer(): IWindowContainer {
        return this._view ? this._view.getWindowContainer() : null;
    }

    public closingInventoryView(): void {
    }

    public subCategorySwitch(param1: string): void {
    }

    public reactivateLastEffect(): void {
        if (this._lastActivatedEffect != -1) {
            this.useEffect(this._lastActivatedEffect);
        }
    }

    public updateView(): void {
        if (this._view && !this._view.disposed) {
            this._view.updateListViews();
            this._view.updateActionView();
        }
    }

    public selectItemById(param1: string): void {
        this.setEffectSelected(Number(param1) | 0);
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
