import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { HabboDiscordManager } from '@/com/sulake/habbo/discord/HabboDiscordManager';
import type { IDiscordSettings } from '@/com/sulake/habbo/discord/settings/IDiscordSettings';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { DiscordPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/discord/DiscordPreferencesEvent';
import { GetDiscordPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/discord/GetDiscordPreferencesMessageComposer';
import { SetDiscordPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/discord/SetDiscordPreferencesMessageComposer';
import { DiscordPreferences } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferences';
import { DiscordSettingsView } from '@/com/sulake/habbo/discord/settings/DiscordSettingsView';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class DiscordSettingsController extends Component implements ILinkEventTracker, IDiscordSettings {
    static { registerClassName(this, 'com.sulake.habbo.discord.settings::DiscordSettingsController'); }

    static #staticsReady = false;

    private static readonly _log: number = 5000;

    private static get PREFERENCES_UNINITIALIZED(): DiscordPreferences {
        DiscordSettingsController.#initStatics();
        return DiscordSettingsController.PREFERENCES_UNINITIALIZED;
    }

    private static get PREFERENCES_DEFAULT(): DiscordPreferences {
        DiscordSettingsController.#initStatics();
        return DiscordSettingsController.PREFERENCES_DEFAULT;
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _manager: HabboDiscordManager;

    declare private _view: DiscordSettingsView;

    declare private _messageEvents: IMessageEvent[];

    declare private _preferences: DiscordPreferences;

    declare private _SafeStr_2818: DiscordPreferences;

    declare private _SafeStr_5329: boolean;

    declare private _checkedForPopup: boolean;

    declare private _SafeStr_5531: boolean;

    declare private _disposed_DiscordSettingsController: boolean;

    constructor(param1: HabboDiscordManager, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._manager = param1;
        this._messageEvents = [];
        this._messageEvents.push(new DiscordPreferencesEvent(this.onDiscordPreferences));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    private onDiscordPreferences(param1: DiscordPreferencesEvent): void {
        this._preferences = param1.preferences;
        this._SafeStr_2818 = this._preferences;
        if (this._SafeStr_2818.version == 0) {
            this._SafeStr_2818 = DiscordSettingsController.PREFERENCES_DEFAULT;
        }
        this.maybeShowPopup();
        this._manager.tryUpdatePresence(true, true);
    }

    private maybeShowPopup(): void {
        if (this._checkedForPopup || this._SafeStr_2818 == null || !this._SafeStr_5329) {
            return;
        }
        this._checkedForPopup = true;
        if (this._SafeStr_2818.version >= this.preferenceGlobalVersion || this._SafeStr_5531) {
            return;
        }
        setTimeout((): void => {
             if (!this._SafeStr_5531) {
                 this.showView();
             }
         }, 5000);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboConfigurationManager(), null, true)]);
    }

    public onDiscordConnected(): void {
        this._SafeStr_5329 = true;
        this.maybeShowPopup();
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
        this._communicationManager.connection.send(new GetDiscordPreferencesMessageComposer());
    }

    public get linkPattern(): string {
        return "discord/settings/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 3) {
            return;
        }
        if (_loc2_[2] == "open") {
            this.showView();
        }
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public showView(): void {
        if (this._SafeStr_2818 == null) {
            Logger.log("Attempted to open DiscordSettingsView but didn\'t have preferences available");
            return;
        }
        if (this._view == null) {
            this._view = new DiscordSettingsView(this, this._windowManager);
        }
        this._view.initialize(this._SafeStr_2818);
        this._view.show();
        this._SafeStr_5531 = true;
    }

    public hideView(): void {
        if (this._view && this._view.isShowing()) {
            this._view.hide();
        }
    }

    public get preferenceGlobalVersion(): number {
        return this.getInteger("discord_activity.settings.version", 1);
    }

    public updatePreferences(param1: boolean, param2: boolean, param3: boolean, param4: boolean): void {
        this._preferences = new DiscordPreferences(this.preferenceGlobalVersion, param1, param2, param3, param4);
        this._SafeStr_2818 = this._preferences;
        this._communicationManager.connection.send(new SetDiscordPreferencesMessageComposer(this.preferenceGlobalVersion, param1, param2, param3, param4));
        this._manager.tryUpdatePresence(true, true);
    }

    public get preferences(): DiscordPreferences {
        if (this._preferences == null) {
            return DiscordSettingsController.PREFERENCES_UNINITIALIZED;
        }
        return this._preferences;
    }

    public override dispose(): void {
        if (this._disposed_DiscordSettingsController) {
            return;
        }
        this._disposed_DiscordSettingsController = true;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._windowManager = null;
        this._localization = null;
        this._manager = null;
        this._SafeStr_2818 = null;
        this._preferences = null;
        this._SafeStr_5329 = false;
        this._checkedForPopup = false;
        this.context.removeLinkEventTracker(this);
        super.dispose();
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    protected override initInstanceFields(): void {
        this.onDiscordPreferences = this.onDiscordPreferences.bind(this);
        this._preferences = null;
        this._SafeStr_2818 = null;
        this._SafeStr_5329 = false;
        this._checkedForPopup = false;
        this._SafeStr_5531 = false;
        this._disposed_DiscordSettingsController = false;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (DiscordSettingsController.#staticsReady) return;
        DiscordSettingsController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(DiscordSettingsController, name, { value, writable: true, configurable: true, enumerable: true });
        set("PREFERENCES_UNINITIALIZED", null);
        set("PREFERENCES_DEFAULT", null);
        set("PREFERENCES_UNINITIALIZED", new DiscordPreferences(0, false, false, false, false));
        set("PREFERENCES_DEFAULT", new DiscordPreferences(0, true, true, true, true));
    }
}
