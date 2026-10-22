import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { AvatarUpdateEvent } from '@/com/sulake/habbo/avatar/events/AvatarUpdateEvent';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserChangeMessageEvent';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class AvatarImageWidget implements ILandingViewWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::AvatarImageWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _SafeStr_3905: IWidgetWindow;

    declare private _SafeStr_3892: UserObjectEvent;

    declare private _SafeStr_4105: UserChangeMessageEvent;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
        this._SafeStr_3892 = new UserObjectEvent(this.onUserObject);
        this._SafeStr_4105 = new UserChangeMessageEvent(this.onUserChange);
        this._landingView.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_3892);
        this._landingView.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_4105);
        this._landingView.avatarEditor.events.addEventListener("AVATAR_FIGURE_UPDATED", this.onAvatarFigureUpdated);
    }

    public get container(): IWindow {
        return this._SafeStr_3905;
    }

    public dispose(): void {
        if (this._SafeStr_3892 != null) {
            this._landingView.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_3892);
            this._SafeStr_3892 = null;
        }
        if (this._SafeStr_4105 != null) {
            this._landingView.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_4105);
            this._SafeStr_4105 = null;
        }
        if (this._landingView != null) {
            this._landingView.avatarEditor.events.removeEventListener("AVATAR_FIGURE_UPDATED", this.onAvatarFigureUpdated);
            this._landingView = null;
        }
        this._SafeStr_3905 = null;
    }

    public initialize(): void {
        this._SafeStr_3905 = castGuarded(this._landingView.getXmlWindow("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
    }

    public refresh(): void {
        this.refreshAvatarInfo();
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    private onUserObject = (param1: UserObjectEvent): void => {
        this.refreshAvatarInfo(param1.getParser().figure);
    };

    private onUserChange = (param1: IMessageEvent): void => {
        let _loc2_: UserChangeMessageEvent = param1 instanceof UserChangeMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.id == -1) {
            this.refreshAvatarInfo(_loc2_.figure);
        }
    };

    private onAvatarFigureUpdated = (param1: AvatarUpdateEvent): void => {
        this.refreshAvatarInfo(param1.figure);
    };

    private refreshAvatarInfo(param1: string = null): void {
        let _loc2_: IAvatarImageWidget = null;
        if (!param1 && this._landingView.sessionDataManager) {
            param1 = this._landingView.sessionDataManager.figure;
        }
        if (this._SafeStr_3905 != null) {
            _loc2_ = asGuarded(this._SafeStr_3905.widget, isIAvatarImageWidget);
            if (_loc2_ != null) {
                _loc2_.figure = param1;
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
