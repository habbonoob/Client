import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TalentLevelUpMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentLevelUpMessageParser';
import type { TalentTrackLevelMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackLevelMessageParser';
import type { HabboTalent } from '@/com/sulake/habbo/friendbar/talent/HabboTalent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { TalentLevelUpMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/talent/TalentLevelUpMessageEvent';
import { TalentTrackLevelMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/talent/TalentTrackLevelMessageEvent';
import { GetTalentTrackLevelMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackLevelMessageComposer';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';

export class TalentPromoCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.talent::TalentPromoCtrl'); }

    private static readonly BG_COLOR_LIGHT: number = 4286084205;
    private static readonly BG_COLOR_DARK: number = 4283781966;

    constructor(param1: HabboTalent) {
        this._manager = param1;
    }

    declare private _manager: HabboTalent;

    declare private _window: IWindowContainer;

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    declare private _SafeStr_6265: number;
    static { (this.prototype as any)._SafeStr_6265 = 0; }

    public get disposed(): boolean {
        return this._manager == null;
    }

    private get enabled(): boolean {
        return this.promotedTalentTrack != "";
    }

    private get promotedTalentTrack(): string {
        return this._manager.getProperty("talentpromo.track");
    }

    private get maxLevelReached(): boolean {
        return this._level >= this._maxLevel;
    }

    public dispose(): void {
        if (this.toolbarAttachAllowed()) {
            this._manager.toolbar.extensionView.detachExtension("talent_promo");
        }
        this._manager = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public initialize(): void {
        if (!this.enabled) {
            return;
        }
        this._manager.communicationManager.addHabboConnectionMessageEvent(new UserObjectEvent(this.onUserObject));
        this._manager.communicationManager.addHabboConnectionMessageEvent(new TalentTrackLevelMessageEvent(this.onTalentTrackLevel));
        this._manager.communicationManager.addHabboConnectionMessageEvent(new TalentLevelUpMessageEvent(this.onTalentLevelUp));
    }

    public close(): void {
        if (this._window != null) {
            if (this.toolbarAttachAllowed()) {
                this._manager.toolbar.extensionView.detachExtension("talent_promo");
            }
        }
    }

    private onUserObject = (param1: UserObjectEvent): void => {
        this._manager.send(new GetTalentTrackLevelMessageComposer(this.promotedTalentTrack));
    };

    private onTalentTrackLevel = (param1: TalentTrackLevelMessageEvent): void => {
        let _loc2_: TalentTrackLevelMessageParser = param1.getParser();
        if (_loc2_.talentTrackName == this.promotedTalentTrack) {
            this._maxLevel = _loc2_.maxLevel;
            this._level = _loc2_.level;
            this.refresh();
        }
    };

    private onTalentLevelUp = (param1: TalentLevelUpMessageEvent): void => {
        let _loc2_: TalentLevelUpMessageParser = param1.getParser();
        if (_loc2_.talentTrackName == this.promotedTalentTrack) {
            this._level = _loc2_.level;
            this.refresh();
        }
    };

    private refresh(): void {
        if (!this.enabled || this.maxLevelReached) {
            this.close();
            return;
        }
        this.prepareWindow();
        this.setText("title");
        this._window.x = 0;
        this._window.y = 0;
        if (this.toolbarAttachAllowed()) {
            this._manager.toolbar.extensionView.attachExtension("talent_promo", this._window, 7);
        }
    }

    private setText(param1: string): void {
        this._window.findChildByName(param1 + "_txt").caption = "${talentpromo." + this.promotedTalentTrack + "." + param1 + "}";
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("track_promo"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.addEventListener("WME_CLICK", this.onCheckProgress);
        this._window.addEventListener("WME_OVER", this.onContainerMouseOver);
        this._window.addEventListener("WME_OUT", this.onContainerMouseOut);
        this._SafeStr_6265 = this._window.height;
    }

    private onCheckProgress = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK" && this.enabled) {
            this._manager.tracking.trackTalentTrackOpen(this.promotedTalentTrack, "talentpromo");
            this._manager.send(new GetTalentTrackMessageComposer(this.promotedTalentTrack));
        }
    };

    private toolbarAttachAllowed(): boolean {
        return this._manager != null && this._manager.toolbar != null && this._manager.toolbar.extensionView != null && this.enabled;
    }

    private onContainerMouseOver = (param1: WindowMouseEvent): void => {
        this._window.findChildByTag("BGCOLOR").color = 4286084205;
    };

    private onContainerMouseOut = (param1: WindowMouseEvent): void => {
        this._window.findChildByTag("BGCOLOR").color = 4283781966;
    };

    get [IDisposable](): true {
        return true;
    }
}
