import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { DiscordRichPresenceEvent } from '@/com/sulake/discord/events/DiscordRichPresenceEvent';
import type { DiscordPreferences } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferences';
import type { HabboActivityState } from '@/com/sulake/habbo/discord/habbo_activity/HabboActivityState';
import type { IHabboDiscordManager } from '@/com/sulake/habbo/discord/IHabboDiscordManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { StatusEvent } from '@habbo-pixi/runtime/events/StatusEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { DiscordRichPresence } from '@/com/sulake/discord/DiscordRichPresence';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { HabboActivityDetection } from '@/com/sulake/habbo/discord/habbo_activity/HabboActivityDetection';
import { DiscordSettingsController } from '@/com/sulake/habbo/discord/settings/DiscordSettingsController';
import { DeBouncer } from '@/com/sulake/habbo/utils/DeBouncer';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboDiscordManager extends Component implements IHabboDiscordManager {
    static { registerClassName(this, 'com.sulake.habbo.discord::HabboDiscordManager'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboDiscordManager.#initStatics();
        return HabboDiscordManager._log;
    }

    private static readonly REFRESH_TIMEOUT_MS: number = 10000;
    private static readonly ALLOWED_ENVIRONMENTS: any[] = ["en", "pt", "fi", "fr", "de", "nl", "es", "it", "tr", "s2", "local"];

    declare private rpc: DiscordRichPresence;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_3557 = new DeBouncer(1500, 3000, this.updatePresence);
        this._SafeStr_2825 = new DiscordSettingsController(this, param1, 0, param3);
        this._SafeStr_2673 = new HabboActivityDetection(this, param1, 0, param3);
        this._startTime = new Date().getTime() / 1000 | 0;
        this.initialize();
        this._SafeStr_3241 = new Timer(10000);
        this._SafeStr_3241.addEventListener("timer", this.onPresenceTimer);
        this._SafeStr_3241.start();
    }

    declare private _localization: IHabboLocalizationManager;

    declare private _SafeStr_2825: DiscordSettingsController;

    declare private _SafeStr_2673: HabboActivityDetection;

    declare private _SafeStr_3910: boolean;

    declare private _SafeStr_3557: DeBouncer;

    declare private _SafeStr_3241: Timer;

    declare private _SafeStr_4950: boolean;

    declare private _lastDetails: string;

    declare private _SafeStr_4916: string;

    declare private _lastStartTime: number;

    declare private _startTime: number;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localization = param1;
            })]);
    }

    private get featureEnabled(): boolean {
        return this.getBoolean("discord.enabled");
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_3910 = false;
        if (this._SafeStr_3241 != null) {
            this._SafeStr_3241.stop();
            this._SafeStr_3241.removeEventListener("timer", this.onPresenceTimer);
            this._SafeStr_3241 = null;
        }
        if (this._SafeStr_2825 != null) {
            this._SafeStr_2825.dispose();
            this._SafeStr_2825 = null;
        }
        if (this._SafeStr_2673 != null) {
            this._SafeStr_2673.dispose();
            this._SafeStr_2673 = null;
        }
        if (this._SafeStr_3557 != null) {
            this._SafeStr_3557.dispose();
            this._SafeStr_3557 = null;
        }
        this._localization = null;
        if (this.rpc) {
            try {
                this.rpc.shutdown();
                this.rpc.dispose();
            } catch (error) {
            }
        }
        super.dispose();
    }

    public initialize(): void {
        if (this.rpc) {
            try {
                this.rpc.addJoinListener((param1: DiscordRichPresenceEvent): void => {
                    });
                this.rpc.addJoinRequestListener((param1: DiscordRichPresenceEvent): void => {
                    });
                this.rpc.addStatusListener((param1: StatusEvent): void => {
                        if (this.disposed) {
                            return;
                        }
                        if (param1.code == "DISCORD_CONNECTED") {
                            if (this._SafeStr_2825 != null) {
                                this._SafeStr_2825.onDiscordConnected();
                            }
                            this._SafeStr_3910 = true;
                            this.tryUpdatePresence(true, true);
                        } else if (param1.code == "DISCORD_SHUTDOWN") {
                            this._SafeStr_3910 = false;
                            this.tryUpdatePresence(true);
                        }
                    });
                this.rpc.initialize("1440237225051947050");
            } catch (error) {
                HabboDiscordManager._log.warn("Failed to initialize discord rich presence: " + error);
            }
        }
    }

    public tryUpdatePresence(param1: boolean = false, param2: boolean = false): void {
        if (this.disposed || this._SafeStr_3557 == null) {
            return;
        }
        if (param2) {
            this._startTime = new Date().getTime() / 1000 | 0;
        }
        this._SafeStr_3557.trigger(param1);
    }

    public updatePresence(): void {
        let _loc1_: boolean = false;
        let _loc11_: boolean = false;
        let _loc2_: HabboActivityState = null;
        let _loc8_: string = null;
        let _loc9_: string = null;
        let _loc4_: string = null;
        let _loc3_: string = null;
        if (!this.rpc || !this._SafeStr_3910 || !this._SafeStr_2825 || !this._SafeStr_2673 || !this._localization || !this.featureEnabled) {
            return;
        }
        let _loc10_: DiscordPreferences = this._SafeStr_2825.preferences;
        if (!_loc10_ || !_loc10_.showHabbo) {
            if (this._SafeStr_4950) {
                try {
                    this.rpc.clearPresence();
                } catch (e) {
                }
            }
            this._SafeStr_4950 = false;
            this._lastDetails = null;
            this._SafeStr_4916 = null;
            this._lastStartTime = -1;
            return;
        }
        let _loc6_: string = this.getEnvironmentName();
        let _loc5_: string = this._localization.getLocalizationWithParams("discord.rpc.details", "", "hotel_id", _loc6_);
        let _loc7_: string = null;
        if (_loc10_.shareActivity) {
            _loc1_ = this._SafeStr_2673.isInRoom();
            _loc11_ = this._SafeStr_2673.isInHiddenRoom();
            if (!_loc1_) {
                _loc7_ = this._localization.getLocalization("discord.rpc.state.hotelview");
            } else if (_loc11_ && _loc10_.hideInHiddenRooms) {
                _loc7_ = this._localization.getLocalization("discord.rpc.state.hidden");
            } else {
                _loc2_ = this._SafeStr_2673.getCurrentRoomActivity();
                _loc8_ = this._SafeStr_2673.getCurrentRoomName();
                _loc9_ = _loc2_.name;
                _loc4_ = this._localization.getLocalization("discord.rpc.state.room." + _loc9_);
                if (_loc8_ == null || _loc8_.length == 0 || _loc4_ == null || _loc4_.length == 0) {
                    _loc7_ = null;
                } else {
                    _loc7_ = this._localization.getLocalizationWithParams("discord.rpc.state.room", "", "noun", _loc4_, "room_name", _loc8_);
                }
            }
        }
        if (_loc5_ == this._lastDetails && _loc7_ == this._SafeStr_4916 && this._startTime == this._lastStartTime) {
            return;
        }
        try {
            if (_loc7_ != null && _loc7_.length > 0) {
                _loc3_ = this.getLink();
                if (_loc3_ != null) {
                    this.rpc.updatePresence({ "details": _loc5_, "state": _loc7_, "timestamps": { "start": this._startTime }, "buttons": [{ "label": "Visit room", "url": _loc3_ }] });
                } else {
                    this.rpc.updatePresence({ "details": _loc5_, "state": _loc7_, "timestamps": { "start": this._startTime } });
                }
            } else {
                this.rpc.updatePresence({ "details": _loc5_, "timestamps": { "start": this._startTime } });
            }
            this._lastDetails = _loc5_;
            this._SafeStr_4916 = _loc7_;
            this._lastStartTime = this._startTime;
        } catch (e) {
        }
        this._SafeStr_4950 = true;
    }

    private getEnvironmentName(): string {
        let _loc1_: string = this.getProperty(HabboProperty.ENVIRONMENT_ID);
        if (HabboDiscordManager.ALLOWED_ENVIRONMENTS.indexOf(_loc1_) == -1) {
            return "";
        }
        if (_loc1_ == "s2") {
            return "Sandbox";
        }
        _loc1_ = _loc1_.replace("pt", "br");
        _loc1_ = _loc1_.replace("en", "com");
        return _loc1_.toUpperCase();
    }

    private getLink(): string {
        if (this._SafeStr_2825 == null || this._SafeStr_2825.preferences == null) {
            return null;
        }
        if (!this._SafeStr_2825.preferences.allowJoining || !this._SafeStr_2673.isInRoom() || this._SafeStr_2673.roomId == -1) {
            return null;
        }
        let _loc1_: string = this.getProperty(HabboProperty.ENVIRONMENT_ID);
        if (HabboDiscordManager.ALLOWED_ENVIRONMENTS.indexOf(_loc1_) == -1 || _loc1_ == "local") {
            return null;
        }
        return this._localization.getLocalizationWithParams("navigator.embed.src", "", "roomId", this._SafeStr_2673.roomId);
    }

    private onPresenceTimer(param1: TimerEvent): void {
        if (this.disposed || this._SafeStr_3241 == null) {
            return;
        }
        this.tryUpdatePresence();
    }

    protected override initInstanceFields(): void {
        this.updatePresence = this.updatePresence.bind(this);
        this.onPresenceTimer = this.onPresenceTimer.bind(this);
        this.rpc = DiscordRichPresence.isSupported ? DiscordRichPresence.instance : null;
        this._SafeStr_3910 = false;
        this._SafeStr_4950 = false;
        this._lastDetails = null;
        this._SafeStr_4916 = null;
        this._lastStartTime = -1;
        this._startTime = 0;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboDiscordManager.#staticsReady) return;
        HabboDiscordManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboDiscordManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.discord.HabboDiscordManager"));
    }
}
