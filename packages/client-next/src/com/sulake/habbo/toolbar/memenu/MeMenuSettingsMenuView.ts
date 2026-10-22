import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MeMenuController } from '@/com/sulake/habbo/toolbar/memenu/MeMenuController';
import type { ToolbarView } from '@/com/sulake/habbo/toolbar/ToolbarView';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MeMenuSoundSettingsView } from '@/com/sulake/habbo/toolbar/memenu/soundsettings/MeMenuSoundSettingsView';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class MeMenuSettingsMenuView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu::MeMenuSettingsMenuView'); }

    declare private _widget: MeMenuController;

    declare private _window: IWindowContainer;

    declare private _toolbarView: ToolbarView;

    declare private _SafeStr_4234: MeMenuSoundSettingsView;

    constructor() {
    }

    public init(param1: MeMenuController, param2: ToolbarView): void {
        this._toolbarView = param2;
        this._widget = param1;
        this.createWindow();
    }

    public dispose(): void {
        if (this._SafeStr_4234 != null) {
            this._SafeStr_4234.dispose();
            this._SafeStr_4234 = null;
        }
        this._widget = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private createWindow(): void {
        let _loc1_: XmlAsset = asInstanceOf(this._widget.toolbar.assets.getAssetByName("me_menu_settings_menu_xml"), XmlAsset);
        if (_loc1_) {
            this._window = asGuarded(this._widget.toolbar.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        }
        if (this._window == null) {
            throw new Error("Failed to construct settings window from XML!");
        }
        this._window.procedure = this.eventHandler;
        this._window.x = this._toolbarView.window.width + 10;
        this._window.y = this._toolbarView.window.bottom - this._window.height;
        if (!ExternalInterface.available || this._widget.toolbar.getProperty("has.identity") != "1") {
            this._window.findChildByName("character_settings").disable();
        } else {
            this._window.findChildByName("identity_text").visible = false;
        }
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "character_settings":
                HabboWebTools.openAvatars();
                break;
            case "sound_settings":
                this._SafeStr_4234 = new MeMenuSoundSettingsView();
                this._SafeStr_4234.init(this, this._toolbarView);
                this._window.visible = false;
                break;
            case "back":
                this._widget.window.visible = true;
                this.dispose();
        }
    };

    public updateUnseenItemCount(param1: string, param2: number): void {
    }

    public get widget(): MeMenuController {
        return this._widget;
    }
}
