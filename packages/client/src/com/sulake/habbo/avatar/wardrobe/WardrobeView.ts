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

    constructor(param1: WardrobeModel) {
        this._SafeStr_2134 = param1;
        let _loc2_: XmlAsset = asInstanceOf(this._SafeStr_2134.controller.manager.assets.getAssetByName("avatareditor_wardrobe_base"), XmlAsset);
        this._window = asGuarded(this._SafeStr_2134.controller.manager.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        this._SafeStr_3732 = asGuarded(this._window.findChildByName("hc_slots"), isIItemListWindow);
        this._SafeStr_4339 = asGuarded(this._window.findChildByName("vip_slots"), isIItemListWindow);
        this._slotWindowTemplate = this._window.findChildByName("slot_template");
        if (this._slotWindowTemplate) {
            this._window.removeChild(this._slotWindowTemplate);
        }
        this._window.visible = false;
    }

    declare private _window: IWindowContainer;

    declare private _SafeStr_2134: WardrobeModel;

    declare private _SafeStr_3732: IItemListWindow;

    declare private _SafeStr_4339: IItemListWindow;

    declare private _slotWindowTemplate: IWindow;

    public get slotWindowTemplate(): IWindow {
        return this._slotWindowTemplate;
    }

    public dispose(): void {
        this._SafeStr_2134 = null;
        this._SafeStr_3732 = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public update(): void {
        let _loc3_: WardrobeSlot = null;
        let _loc2_: number = 0;
        if (this._SafeStr_3732) {
            this._SafeStr_3732.removeListItems();
        }
        if (this._SafeStr_4339) {
            this._SafeStr_4339.removeListItems();
        }
        let _loc1_: any[] = this._SafeStr_2134.slots;
        _loc2_ = 0;
        while (_loc2_ < _loc1_.length) {
            _loc3_ = _loc1_[_loc2_];
            if (_loc2_ < 5) {
                if (this._SafeStr_3732) {
                    this._SafeStr_3732.addListItem(_loc3_.view);
                    _loc3_.view.visible = true;
                }
            } else if (this._SafeStr_4339) {
                this._SafeStr_4339.addListItem(_loc3_.view);
                _loc3_.view.visible = true;
            }
            _loc2_++;
        }
    }

    public getWindowContainer(): IWindowContainer {
        return this._window;
    }
}
