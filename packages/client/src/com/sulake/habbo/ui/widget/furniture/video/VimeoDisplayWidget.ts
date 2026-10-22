import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurnitureVimeoDisplayWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureVimeoDisplayWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { VimeoPlayer } from '@/com/vimeo/api/VimeoPlayer';

export class VimeoDisplayWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.video::VimeoDisplayWidget'); }

    private static readonly _SafeStr_8435: string = "9a106b76302cbce891b714afdc6a0c93";

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
        this.ownHandler.widget = this;
    }

    declare private _player: VimeoPlayer;

    declare private _window: IWindowContainer;

    declare private _roomObject: IRoomObject;

    public override get mainWindow(): IWindow {
        return this._window;
    }

    private get ownHandler(): FurnitureVimeoDisplayWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureVimeoDisplayWidgetHandler ? this._SafeStr_2143 : null;
    }

    public show(param1: IRoomObject, param2: boolean, param3: number): void {
        this._roomObject = param1;
        this.createWindow(param2, param3);
        this._window.visible = true;
    }

    public hide(param1: IRoomObject): void {
        if (this._roomObject != param1) {
            return;
        }
        if (this._player != null) {
            this._player.destroy();
            this._player = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._roomObject = null;
    }

    private createWindow(param1: boolean, param2: number): void {
        if (this._window != null) {
            return;
        }
        this._window = asGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("vimeo_viewer_xml").content)), isIWindowContainer);
        this._window.findChildByName("video_id_editor").visible = param1;
        this._window.findChildByName("video_wrapper").visible = param2 > 0;
        this._window.procedure = this.windowProcedure;
        this._window.center();
        let _loc3_: IDisplayObjectWrapper = castGuarded(this._window.findChildByName("video_wrapper"), isIDisplayObjectWrapper, "com.sulake.core.window.components.IDisplayObjectWrapper");
        this._player = new VimeoPlayer("9a106b76302cbce891b714afdc6a0c93", param2, _loc3_.width, _loc3_.height);
        _loc3_.setDisplayObject(this._player);
        this._player.addEventListener("mouseUp", this.onVideoMouseEvent);
        this._player.addEventListener("mouseMove", this.onVideoMouseEvent);
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: any;
        let _loc3_: number = 0;
        switch (param1.type) {
            case "WME_CLICK":
                _loc4_ = param2.name;
                if ("header_button_close" !== _loc4_) {
                    break;
                }
                this.hide(this._roomObject);
                break;
            case "WE_RESIZE":
                _loc4_ = param2.name;
                if ("video_wrapper" !== _loc4_) {
                    break;
                }
                if (this._player != null) {
                    this._player.setSize(param2.width, param2.height);
                }
                break;
            case "WKE_KEY_DOWN":
                if (castTo(param1, WindowKeyboardEvent).charCode == 13) {
                    _loc3_ = Number(this._window.findChildByName("video_id").caption) | 0;
                    this.ownHandler.setVideo(this._roomObject, _loc3_);
                    this._window.findChildByName("video_wrapper").visible = _loc3_ > 0;
                    this._player.loadVideo(_loc3_);
                }
        }
    };

    private onVideoMouseEvent = (param1: MouseEvent): void => {
        if (this._window != null) {
            castTo(param1.target, DisplayObject).stage.dispatchEvent(param1);
        }
    };
}
