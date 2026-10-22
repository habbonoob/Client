import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserChangeMessageEvent';

export class MeMenuIconLoader implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu::MeMenuIconLoader'); }

    private static readonly MAX_ICON_HEIGHT: number = 50;
    private static readonly HEAD_MARGIN: number = 3;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this._SafeStr_3892 = new UserObjectEvent(this.onUserObject);
        this._SafeStr_4105 = new UserChangeMessageEvent(this.onUserChange);
        this._toolbar.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_3892);
        this._toolbar.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_4105);
        this.setMeMenuToolbarIcon();
    }

    declare private _toolbar: HabboToolbar;

    declare private _SafeStr_5021: string;

    declare private _SafeStr_5051: BitmapData;

    declare private _SafeStr_5423: BitmapData;

    declare private _SafeStr_3892: UserObjectEvent;

    declare private _SafeStr_4105: UserChangeMessageEvent;

    public get disposed(): boolean {
        return this._toolbar == null;
    }

    public avatarImageReady(param1: string): void {
        this._SafeStr_5021 = "";
        this.setMeMenuToolbarIcon();
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_3892 != null) {
            this._toolbar.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_3892);
            this._SafeStr_3892 = null;
        }
        if (this._SafeStr_4105 != null) {
            this._toolbar.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_4105);
            this._SafeStr_4105 = null;
        }
        this._toolbar = null;
    }

    private setMeMenuToolbarIcon(param1: string = null): void {
        let _loc3_: BitmapData = null;
        let _loc5_: BitmapData = null;
        let _loc7_: string = null;
        let _loc4_: string = null;
        let _loc8_: IAvatarImage = null;
        let _loc6_: any = null;
        let _loc9_: BitmapData = null;
        let _loc2_: Rectangle = null;
        if (this._toolbar.avatarRenderManager != null) {
            _loc7_ = param1 == null ? this._toolbar.sessionDataManager.figure : param1;
            if (_loc7_ != this._SafeStr_5021) {
                _loc4_ = this._toolbar.sessionDataManager.gender;
                _loc8_ = this._toolbar.avatarRenderManager.createAvatarImage(_loc7_, "h", _loc4_, this);
                if (_loc8_ != null) {
                    _loc8_.setDirection("full", 2);
                    _loc3_ = _loc8_.getCroppedImage("full");
                    _loc5_ = _loc8_.getCroppedImage("head");
                    _loc8_.dispose();
                }
                this._SafeStr_5021 = _loc7_;
                if (this._SafeStr_5051 != null) {
                    this._SafeStr_5051.dispose();
                }
                this._SafeStr_5051 = _loc3_;
                if (this._SafeStr_5423 != null) {
                    this._SafeStr_5423.dispose();
                }
                this._SafeStr_5423 = _loc5_;
            } else {
                _loc3_ = this._SafeStr_5051;
                _loc5_ = this._SafeStr_5423;
            }
        }
        if (this._toolbar != null) {
            if (_loc3_ != null && _loc5_ != null) {
                if (_loc3_.height > 50) {
                    _loc9_ = new BitmapData(_loc3_.width, 50, true, 0);
                    _loc2_ = _loc9_.rect.clone();
                    if (_loc5_.height > 50 - 3) {
                        _loc2_.offset(0, _loc5_.height - 50 + 3);
                    }
                    _loc9_.copyPixels(_loc3_, _loc2_, new Point(0, 0));
                    _loc6_ = _loc9_;
                } else {
                    _loc6_ = _loc3_.clone();
                }
            }
            this._toolbar.setIconBitmap("HTIE_ICON_MEMENU", _loc6_);
        }
    }

    private onUserObject = (param1: UserObjectEvent): void => {
        this.setMeMenuToolbarIcon(param1.getParser().figure);
    };

    private onUserChange = (param1: UserChangeMessageEvent): void => {
        if (param1.id == -1) {
            this.setMeMenuToolbarIcon(param1.figure);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
