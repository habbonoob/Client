import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetLoadingBarUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetLoadingBarUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class LoadingBarWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.loadingbar::LoadingBarWidget'); }

    declare private _window: IBorderWindow;

    declare private _config: ICoreConfiguration;

    declare private _image: BitmapData;

    private _clickUrl: string = "";
    private _SafeStr_5718: Sprite = null;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration) {
        super(param1, param2, param3, param4);
        this._config = param5;
    }

    public override dispose(): void {
        if (this._SafeStr_5718 != null) {
            this._SafeStr_5718.removeEventListener("click", this.clickHandler);
            this._SafeStr_5718 = null;
        }
        if (this._image != null) {
            this._image.dispose();
            this._image = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._config = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWLBUE_SHOW_LOADING_BAR", this.onShowLoadingBar);
        param1.addEventListener("RWLBUW_HIDE_LOADING_BAR", this.onHideLoadingBar);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWLBUE_SHOW_LOADING_BAR", this.onShowLoadingBar);
        param1.removeEventListener("RWLBUW_HIDE_LOADING_BAR", this.onShowLoadingBar);
        param1.removeEventListener("RWLBUW_HIDE_LOADING_BAR", this.onHideLoadingBar);
    }

    private onShowLoadingBar = (param1: RoomWidgetLoadingBarUpdateEvent): void => {
        if (param1 == null || param1.type != "RWLBUE_SHOW_LOADING_BAR") {
            return;
        }
        if (!this.createWindow()) {
            return;
        }
        this._window.visible = true;
        this._window.center();
    };

    private onHideLoadingBar = (param1: RoomWidgetLoadingBarUpdateEvent): void => {
        if (param1 == null || param1.type != "RWLBUW_HIDE_LOADING_BAR") {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    };

    private createWindow(): boolean {
        let _loc4_: number = 0;
        if (this._window != null) {
            return true;
        }
        let _loc2_: XmlAsset = asInstanceOf(this.assets.getAssetByName("room_loading_bar"), XmlAsset);
        if (_loc2_ == null) {
            return false;
        }
        this._window = asGuarded(this.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIBorderWindow);
        if (this._window == null) {
            return false;
        }
        this._window.visible = false;
        let _loc3_: IRegionWindow = asGuarded(this._window.findChildByName("region"), isIRegionWindow);
        if (_loc3_ != null) {
        }
        let _loc1_: IDisplayObjectWrapper = asGuarded(this._window.findChildByName("image"), isIDisplayObjectWrapper);
        if (_loc1_ != null) {
            _loc4_ = _loc1_.height;
            this._window.scale(0, -_loc4_);
        }
        return true;
    }

    private clickHandler = (param1: Event): void => {
        if (this._clickUrl != "") {
            HabboWebTools.openWebPage(this._clickUrl);
        }
    };
}
