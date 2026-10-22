import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ISideContentModel } from '@/com/sulake/habbo/avatar/common/ISideContentModel';
import { WardrobeSlot } from '@/com/sulake/habbo/avatar/wardrobe/WardrobeSlot';
import { WardrobeView } from '@/com/sulake/habbo/avatar/wardrobe/WardrobeView';

export class WardrobeModel implements ISideContentModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.wardrobe::WardrobeModel'); }

    declare private _controller: HabboAvatarEditor;

    declare private _view: WardrobeView;

    declare private _SafeStr_2217: UtilsMap;

    private _isInitialized: boolean = false;

    constructor(param1: HabboAvatarEditor) {
        this._controller = param1;
    }

    public get availableSlots(): number {
        return this._controller.manager.getInteger("avatareditor.wardrobe.slots", 10);
    }

    public dispose(): void {
        this._controller = null;
        for (let _loc1_ of valuesOf(this._SafeStr_2217)) {
            _loc1_.dispose();
            _loc1_ = null;
        }
        this._SafeStr_2217 = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._isInitialized = false;
    }

    public reset(): void {
        this._isInitialized = false;
    }

    private init(): void {
        let _loc1_: number = 0;
        if (this._view) {
            this._view.dispose();
        }
        this._view = new WardrobeView(this);
        if (this._controller.handler != null) {
            this._controller.handler.getWardrobe();
        }
        if (this._SafeStr_2217) {
            for (let _loc2_ of valuesOf(this._SafeStr_2217)) {
                _loc2_.dispose();
                _loc2_ = null;
            }
        }
        this._SafeStr_2217 = new UtilsMap();
        _loc1_ = 1;
        while (_loc1_ <= this.availableSlots) {
            this._SafeStr_2217.add(_loc1_, new WardrobeSlot(this._view.slotTemplate, this._controller, _loc1_, this.isSlotEnabled(_loc1_)));
            _loc1_++;
        }
        this._isInitialized = true;
        this.updateView();
    }

    public get controller(): HabboAvatarEditor {
        return this._controller;
    }

    public getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        return this._view.getWindowContainer();
    }

    private updateView(): void {
        this._view.update();
    }

    public updateSlots(param1: number, param2: any[]): void {
        let _loc3_: WardrobeSlot = null;
        if (!this._isInitialized) {
            return;
        }
        if (!param2) {
            ErrorReportStorage.addDebugData("WardrobeModel", "updateSlots: outfits is null!");
        }
        if (!this._SafeStr_2217) {
            ErrorReportStorage.addDebugData("WardrobeModel", "updateSlots: _slots is null!");
        }
        for (const _loc4_ of param2 ?? []) {
            _loc3_ = asInstanceOf(this._SafeStr_2217.getValue(_loc4_.slotId), WardrobeSlot);
            if (_loc3_) {
                _loc3_.update(stringOrNull(_loc4_.figureString), stringOrNull(_loc4_.gender), this.isSlotEnabled(_loc3_.id));
            }
        }
    }

    private isSlotEnabled(param1: number): boolean {
        if (param1 <= 5) {
            return this._controller.manager.sessionData.hasClub;
        }
        return this._controller.manager.sessionData.hasVip;
    }

    public get slots(): any[] {
        return this._SafeStr_2217.getValues();
    }

    get [ISideContentModel](): true {
        return true;
    }
}
