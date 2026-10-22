import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OtherSettingsView } from '@/com/sulake/habbo/toolbar/extensions/settings/OtherSettingsView';
import { SoundSettingsView } from '@/com/sulake/habbo/toolbar/extensions/settings/SoundSettingsView';
import { WordFilterSettingsView } from '@/com/sulake/habbo/toolbar/extensions/settings/WordFilterSettingsView';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class SettingsExtension implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions::SettingsExtension'); }

    private static readonly SPACING: number = 3;
    private static readonly PADDING: number = 7;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(param1.assets.getAssetByName("settings_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.windowProcedure;
        this.addButton("avatar_settings", this._toolbar.localization.getLocalization("widget.memenu.settings.character", "Avatar settings"));
        this.addButton("privacy", this._toolbar.localization.getLocalization("title.privacy.settings", "Privacy settings"));
        this.addButton("sound", this._toolbar.localization.getLocalization("widget.memenu.settings.audio", "Sound settings"));
        let _loc3_: boolean = this._toolbar.getBoolean("discord.enabled");
        if (_loc3_) {
            this.addButton("discord", this._toolbar.localization.getLocalization("widget.memenu.settings.discord", "Discord settings"));
        }
        this.addButton("chat", this._toolbar.localization.getLocalization("widget.memenu.settings.other", "Other settings"));
        let _loc2_: boolean = this._toolbar.getBoolean("user.custom.filter.enabled");
        if (_loc2_) {
            this.addButton("word_filter", this._toolbar.localization.getLocalization("word_filter.settings.title", "Word filter"));
        }
        param1.extensionView.attachExtension("settings", this._window, 1);
        this._window.visible = false;
    }

    declare private _toolbar: HabboToolbar;

    private _buttons: IWindow[] = [];

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._toolbar = null;
    }

    private addButton(param1: string, param2: string): void {
        let _loc3_: IWindowContainer = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(this._toolbar.assets.getAssetByName("setting_category_xml").content, XML)), isIWindowContainer);
        this._window.addChild(_loc3_);
        _loc3_.findChildByName("button_label").caption = param2;
        if (this._buttons.length > 0) {
            _loc3_.y = this._buttons[this._buttons.length - 1].bottom + 3;
        } else {
            _loc3_.y = 7;
        }
        _loc3_.x = 7;
        _loc3_.name = param1;
        _loc3_.procedure = this.windowProcedure;
        this._buttons.push(_loc3_);
        this._window.height = this._buttons[this._buttons.length - 1].bottom + 7;
    }

    private openSoundSettingsWindow(): void {
        let _loc2_: SoundSettingsView = new SoundSettingsView(this._toolbar);
        let _loc1_: IWindowContainer = this._toolbar.windowManager.getDesktop(1);
        _loc1_.addChild(_loc2_.window);
        _loc2_.window.x = _loc1_.width - _loc2_.window.width - 200;
    }

    private openChatSettingsWindow(): void {
        let _loc2_: OtherSettingsView = new OtherSettingsView(this._toolbar);
        let _loc1_: IWindowContainer = this._toolbar.windowManager.getDesktop(1);
        _loc1_.addChild(_loc2_.window);
        _loc2_.window.x = _loc1_.width - _loc2_.window.width - 200;
    }

    private openWordFilterWindow(): void {
        let _loc1_: WordFilterSettingsView = new WordFilterSettingsView(this._toolbar);
        let _loc2_: IWindowContainer = this._toolbar.windowManager.getDesktop(1);
        _loc2_.addChild(_loc1_.window);
        _loc1_.window.x = _loc2_.width - _loc1_.window.width - 200;
    }

    private openDiscordSettingsWindow(): void {
        this._toolbar.context.createLinkEvent("discord/settings/open");
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "avatar_settings":
                HabboWebTools.openAvatars();
                this._toolbar.toggleSettingVisibility();
                break;
            case "privacy":
                HabboWebTools.openPrivacy();
                this._toolbar.toggleSettingVisibility();
                break;
            case "sound":
                this.openSoundSettingsWindow();
                this._toolbar.toggleSettingVisibility();
                break;
            case "chat":
                this.openChatSettingsWindow();
                this._toolbar.toggleSettingVisibility();
                break;
            case "word_filter":
                this.openWordFilterWindow();
                this._toolbar.toggleSettingVisibility();
                break;
            case "discord":
                this.openDiscordSettingsWindow();
                this._toolbar.toggleSettingVisibility();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
