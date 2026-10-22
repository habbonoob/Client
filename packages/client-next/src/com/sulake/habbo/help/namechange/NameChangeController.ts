import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ChangeUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/ChangeUserNameResultMessageParser';
import type { CheckUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/CheckUserNameResultMessageParser';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { UserNameChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/UserNameChangedMessageParser';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { INameChangeUI } from '@/com/sulake/habbo/help/INameChangeUI';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ChangeUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/ChangeUserNameResultMessageEvent';
import { CheckUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/CheckUserNameResultMessageEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserNameChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/UserNameChangedMessageEvent';
import { ChangeUserNameInRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/ChangeUserNameInRoomMessageComposer';
import { CheckUserNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/CheckUserNameMessageComposer';
import { HabboHelpTutorialEvent } from '@/com/sulake/habbo/help/enum/HabboHelpTutorialEvent';
import { NameChangeView } from '@/com/sulake/habbo/help/namechange/NameChangeView';

export class NameChangeController implements INameChangeUI, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help.namechange::NameChangeController'); }

    public static readonly NAME_CHANGE: string = "TUI_NAME_VIEW";

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _habboHelp: HabboHelp;

    declare private _SafeStr_2440: NameChangeView;

    declare private _ownUserName: string;

    declare private _SafeStr_5926: number;
    static { (this.prototype as any)._SafeStr_5926 = 0; }

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new ChangeUserNameResultMessageEvent(this.onChangeUserNameResult));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new CheckUserNameResultMessageEvent(this.onCheckUserNameResult));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new UserObjectEvent(this.onUserObject));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new UserNameChangedMessageEvent(this.onUserNameChange));
    }

    public get help(): HabboHelp {
        return this._habboHelp;
    }

    public get assets(): IAssetLibrary {
        return this._habboHelp.assets;
    }

    public get localization(): IHabboLocalizationManager {
        return this._habboHelp.localization;
    }

    public get myName(): string {
        return this._ownUserName;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.disposeView();
            if (this._habboHelp) {
                this._habboHelp = null;
            }
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public showView(): void {
        if (this._SafeStr_2440 == null || this._SafeStr_2440.disposed) {
            this._SafeStr_2440 = new NameChangeView(this);
        }
        this._SafeStr_2440.showMainView();
        this.prepareForTutorial();
    }

    public buildXmlWindow(param1: string, param2: number = 1): IWindow {
        if (this._habboHelp.assets == null) {
            return null;
        }
        let _loc3_: XmlAsset = castTo(this._habboHelp.assets.getAssetByName(param1 + "_xml"), XmlAsset);
        if (_loc3_ == null || this._habboHelp.windowManager == null) {
            return null;
        }
        return this._habboHelp.windowManager.buildFromXML(XML.from(_loc3_.content), param2);
    }

    private disposeWindow(param1: WindowEvent = null): void {
    }

    public disposeView(): void {
        if (this._SafeStr_2440 != null) {
            this._SafeStr_2440.dispose();
            this._SafeStr_2440 = null;
        }
        this.disposeWindow();
    }

    public hideView(): void {
        if (this._SafeStr_2440 != null) {
            this._SafeStr_2440.dispose();
            this._SafeStr_2440 = null;
        }
    }

    public setRoomSessionStatus(param1: boolean): void {
        if (param1 == false) {
            this.disposeView();
        }
    }

    public prepareForTutorial(): void {
        if (this._habboHelp == null || this._habboHelp.events == null) {
            return;
        }
        this._habboHelp.events.dispatchEvent(new HabboHelpTutorialEvent("HHTPNUFWE_AVATAR_TUTORIAL_START"));
    }

    public windowProcedure(param1: WindowEvent, param2: IWindow): void {
        let _loc3_: string = param1.type;
        if ("WME_CLICK" === _loc3_) {
            if (param2.name == "header_button_close") {
                this.disposeView();
            }
        }
    }

    public changeName(param1: string): void {
        this.disposeWindow();
        this._habboHelp.sendMessage(new ChangeUserNameInRoomMessageComposer(param1));
    }

    public checkName(param1: string): void {
        this.disposeWindow();
        this._habboHelp.sendMessage(new CheckUserNameMessageComposer(param1));
    }

    public onUserNameChanged(param1: string): void {
        let name: string = param1;
        if (!this._habboHelp || !this._habboHelp.localization || !this._habboHelp.windowManager) {
            return;
        }
        this._habboHelp.localization.registerParameter("help.tutorial.name.changed", "name", name);
        this._habboHelp.windowManager.alert("${generic.notice}", "${help.tutorial.name.changed}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         });
    }

    private onChangeUserNameResult = (param1: ChangeUserNameResultMessageEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: ChangeUserNameResultMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.resultCode == ChangeUserNameResultMessageEvent._SafeStr_4064) {
            this.onUserNameChanged(_loc2_.name);
            this.hideView();
        } else if (this._SafeStr_2440) {
            this._SafeStr_2440.setNameNotAvailableView(_loc2_.resultCode, _loc2_.name, _loc2_.nameSuggestions);
        }
    };

    private onCheckUserNameResult = (param1: CheckUserNameResultMessageEvent): void => {
        if (!param1 || !this._SafeStr_2440) {
            return;
        }
        let _loc2_: CheckUserNameResultMessageParser = param1.getParser();
        if (_loc2_.resultCode == ChangeUserNameResultMessageEvent._SafeStr_4064) {
            this._SafeStr_2440.checkedName = _loc2_.name;
        } else {
            this._SafeStr_2440.setNameNotAvailableView(_loc2_.resultCode, _loc2_.name, _loc2_.nameSuggestions);
        }
    };

    private onUserObject = (param1: IMessageEvent): void => {
        let _loc2_: UserObjectMessageParser = castTo(param1, UserObjectEvent).getParser();
        this._SafeStr_5926 = _loc2_.id;
        this._ownUserName = _loc2_.name;
    };

    private onUserNameChange = (param1: IMessageEvent): void => {
        let _loc2_: UserNameChangedMessageParser = castTo(param1, UserNameChangedMessageEvent).getParser();
        if (this._SafeStr_5926 == _loc2_.webId) {
            this._ownUserName = _loc2_.newName;
        }
    };

    public get ownUserName(): string {
        return this._ownUserName;
    }

    public get ownUserId(): number {
        return this._SafeStr_5926;
    }

    get [IDisposable](): true {
        return true;
    }
}
