import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { EffectsWidgetHandler } from '@/com/sulake/habbo/ui/handler/EffectsWidgetHandler';
import { EffectView } from '@/com/sulake/habbo/ui/widget/effects/EffectView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class EffectsWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.effects::EffectsWidget'); }

    private static readonly LIST_HEIGHT_MAX: number = 320;
    private static readonly LIST_HEIGHT_MIN: number = 48;
    private static readonly TOOLBAR_MARGIN: number = 2;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary) {
        super(param1, param2, param3);
        this.handler.widget = this;
        this._SafeStr_2837 = new UtilsMap();
    }

    declare private _view: IWindowContainer;

    declare private _SafeStr_2221: IScrollableListWindow;

    declare private _SafeStr_2837: UtilsMap;

    public get handler(): EffectsWidgetHandler {
        return this._SafeStr_2143 instanceof EffectsWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2837) {
            for (const _loc1_ of valuesOf(this._SafeStr_2837)) {
                _loc1_.dispose();
            }
            this._SafeStr_2837.dispose();
            this._SafeStr_2837 = null;
        }
        this._SafeStr_2221 = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        super.dispose();
    }

    public open(): void {
        let _loc2_: XmlAsset = null;
        let _loc1_: Rectangle = null;
        let _loc3_: IWindow = null;
        if (!this._view) {
            _loc2_ = asInstanceOf(this.assets.getAssetByName("effects_widget"), XmlAsset);
            this._view = asGuarded(this.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
            _loc1_ = this.handler.container.toolbar.getRect();
            this._view.x = _loc1_.right + 2 | 0;
            this._view.y = _loc1_.bottom - this._view.height | 0;
            this._SafeStr_2221 = asGuarded(this._view.findChildByName("list"), isIScrollableListWindow);
            _loc3_ = this._view.findChildByName("close");
            _loc3_.addEventListener("WME_CLICK", this.onClose);
        }
        this.update();
        this._view.visible = true;
    }

    public update(): void {
        let _loc1_: EffectView = null;
        let _loc4_: number = 0;
        let _loc2_: any[] = this.handler.container.inventory.getAvatarEffects();
        for (const _loc3_ of _loc2_ ?? []) {
            _loc1_ = asInstanceOf(this._SafeStr_2837.getValue(_loc3_.type), EffectView);
            if (_loc1_) {
                _loc1_.update();
            } else {
                _loc1_ = new EffectView(this, _loc3_);
                this._SafeStr_2837.add(_loc3_.type, _loc1_);
                this._SafeStr_2221.addListItem(_loc1_.window);
            }
        }
        _loc4_ = this._SafeStr_2837.length - 1;
        while (_loc4_ >= 0) {
            _loc1_ = this._SafeStr_2837.getWithIndex(_loc4_);
            if (_loc2_.indexOf(_loc1_.effect) == -1) {
                this._SafeStr_2221.removeListItem(_loc1_.window);
                this._SafeStr_2837.remove(this._SafeStr_2837.getKey(_loc4_));
                _loc1_.dispose();
            }
            _loc4_--;
        }
        let _loc5_: number = this._SafeStr_2221.scrollableRegion.height | 0;
        this._SafeStr_2221.height = Math.max(Math.min(_loc5_, 320), 48) | 0;
        this._view.findChildByName("no_effects").visible = _loc2_.length == 0;
    }

    public selectEffect(param1: number, param2: boolean): void {
        if (param2) {
            this.handler.container.inventory.setEffectDeselected(param1);
        } else {
            this.handler.container.inventory.setEffectSelected(param1);
        }
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this._view.visible = false;
    };
}
