import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ISideContentView } from '@/com/sulake/habbo/avatar/common/ISideContentView';
import type { WardrobeModel } from '@/com/sulake/habbo/avatar/wardrobe/WardrobeModel';
import type { WardrobeSlot } from '@/com/sulake/habbo/avatar/wardrobe/WardrobeSlot';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class WardrobeView implements ISideContentView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.wardrobe::WardrobeView'); }

    public static readonly SLOTS_PER_COL: number = 7;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2134: WardrobeModel;

    declare private _SafeStr_3732: IItemListWindow;

    declare private _SafeStr_4339: IItemListWindow;

    declare private _slotWindowTemplate: IWindow;

    constructor(param1: WardrobeModel) {
        let _loc4_: number = 0;
        let _loc3_: IItemListWindow = null;
        this._SafeStr_2134 = param1;
        let _loc2_: XmlAsset = asInstanceOf(this._SafeStr_2134.controller.manager.assets.getAssetByName("avatareditor_wardrobe_base"), XmlAsset);
        this._window = asGuarded(this._SafeStr_2134.controller.manager.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        this._SafeStr_3732 = asGuarded(this._window.findChildByName("slots_columns_list"), isIItemListWindow);
        this._SafeStr_4339 = asGuarded(this._SafeStr_3732.findChildByName("slots_column_template"), isIItemListWindow);
        this._slotWindowTemplate = this._SafeStr_4339.findChildByName("slot_template");
        this._SafeStr_4339.removeListItems();
        this._SafeStr_3732.removeListItems();
        let _loc5_: number = (param1.availableSlots + 7 - 1) / 7 | 0;
        _loc4_ = 0;
        while (_loc4_ < _loc5_) {
            _loc3_ = asGuarded(this._SafeStr_4339.clone(), isIItemListWindow);
            this._SafeStr_3732.addListItem(_loc3_);
            _loc4_ += 1;
        }
        this._window.visible = false;
    }

    public get slotTemplate(): IWindow {
        return this._slotWindowTemplate;
    }

    public dispose(): void {
        this._SafeStr_2134 = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
            this._SafeStr_3732 = null;
            this._SafeStr_4339.dispose();
            this._SafeStr_4339 = null;
            this._slotWindowTemplate.dispose();
            this._slotWindowTemplate = null;
        }
    }

    public update(): void {
        let _loc4_: number = 0;
        let _loc2_: IItemListWindow = null;
        let _loc5_: WardrobeSlot = null;
        let _loc3_: number = 0;
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_3732.numListItems) {
            _loc2_ = asGuarded(this._SafeStr_3732.getListItemAt(_loc4_ >>> 0), isIItemListWindow);
            _loc2_.removeListItems();
            _loc4_ += 1;
        }
        let _loc1_: any[] = this._SafeStr_2134.slots;
        _loc3_ = 0;
        while (_loc3_ < _loc1_.length) {
            _loc5_ = _loc1_[_loc3_];
            _loc4_ = _loc3_ / 7 | 0;
            _loc2_ = asGuarded(this._SafeStr_3732.getListItemAt(_loc4_ >>> 0), isIItemListWindow);
            if (_loc2_) {
                _loc2_.addListItem(_loc5_.view);
                _loc5_.view.visible = true;
            }
            _loc3_++;
        }
    }

    public getWindowContainer(): IWindowContainer {
        return this._window;
    }
}
