import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FigureUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/FigureUpdateEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';

export class MeMenuNewIconLoader implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu::MeMenuNewIconLoader'); }

    private static readonly MAX_ICON_HEIGHT: number = 50;

    declare private _toolbar: HabboToolbar;

    declare private _SafeStr_5021: string;

    declare private _SafeStr_5051: BitmapData;

    declare private _SafeStr_3892: UserObjectEvent;

    declare private _SafeStr_3973: FigureUpdateEvent;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this._SafeStr_3892 = new UserObjectEvent(this.onUserObject);
        this._SafeStr_3973 = new FigureUpdateEvent(this.onFigureUpdate);
        this._toolbar.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_3892);
        this._toolbar.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_3973);
        this.setMeMenuToolbarIcon();
    }

    private setMeMenuToolbarIcon(param1: string = null): void {
        let _loc2_: any = null;
        let _loc5_: string = null;
        let _loc3_: string = null;
        let _loc6_: IAvatarImage = null;
        let _loc4_: BitmapData = null;
        if (this._toolbar.avatarRenderManager != null) {
            _loc5_ = param1 == null ? this._toolbar.sessionDataManager.figure : param1;
            if (_loc5_ != this._SafeStr_5021) {
                _loc3_ = this._toolbar.sessionDataManager.gender;
                _loc6_ = this._toolbar.avatarRenderManager.createAvatarImage(_loc5_, "h", _loc3_, this);
                if (_loc6_ != null && !_loc6_.isPlaceholder()) {
                    _loc4_ = HabboFaceFocuser.focusUserFace(_loc6_, "full", 3, 1);
                    _loc6_.dispose();
                }
                this._SafeStr_5021 = _loc5_;
                if (this._SafeStr_5051 != null) {
                    this._SafeStr_5051.dispose();
                }
                this._SafeStr_5051 = _loc4_;
            } else {
                _loc4_ = this._SafeStr_5051;
            }
        }
        if (this._toolbar != null) {
            if (_loc4_ != null) {
                _loc4_ = HabboFaceFocuser.cutCircleFromBitmap(_loc4_, 20);
            }
            this._toolbar.setIconBitmap("HTIE_ICON_MEMENU", _loc4_);
        }
    }

    public avatarImageReady(param1: string): void {
        this._SafeStr_5021 = "";
        this.setMeMenuToolbarIcon();
    }

    private onUserObject = (param1: UserObjectEvent): void => {
        this.setMeMenuToolbarIcon(param1.getParser().figure);
    };

    private onFigureUpdate = (param1: FigureUpdateEvent): void => {
        if (this.disposed) {
            return;
        }
        this.setMeMenuToolbarIcon(param1.figure);
    };

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_3892 != null) {
            this._toolbar.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_3892);
            this._SafeStr_3892 = null;
        }
        if (this._SafeStr_3973 != null) {
            this._toolbar.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_3973);
            this._SafeStr_3973 = null;
        }
        this._toolbar = null;
    }

    public get disposed(): boolean {
        return this._toolbar == null;
    }

    get [IDisposable](): true {
        return true;
    }
}
