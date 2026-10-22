import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TalentTrack } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrack';
import type { HabboTalent } from '@/com/sulake/habbo/friendbar/talent/HabboTalent';
import type { TalentTrackController } from '@/com/sulake/habbo/friendbar/talent/TalentTrackController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class TalentProgressMeter implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.talent::TalentProgressMeter'); }

    private readonly ACHIEVED_DIVIDER: string = "talent_achieved_div";
    private readonly UNACHIEVED_DIVIDER: string = "talent_unachieved_div";
    private readonly DIVIDER_WINDOW_PREFIX: string = "progress_divider_level_";
    private readonly AVATAR_GLOW_RADIUS: number = 10;

    constructor(param1: HabboTalent, param2: TalentTrackController) {
        this._habboTalent = param1;
        this._controller = param2;
        this._talentTrack = this._controller.talentTrack;
        this.createMeter();
    }

    declare private _habboTalent: HabboTalent;

    declare private _controller: TalentTrackController;

    declare private _talentTrack: TalentTrack;

    declare private _SafeStr_2466: IWindowContainer;

    declare private _divider: IStaticBitmapWrapperWindow;

    declare private _SafeStr_2615: IWidgetWindow;

    declare private _SafeStr_5437: IStaticBitmapWrapperWindow;

    declare private _SafeStr_5205: IStaticBitmapWrapperWindow;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get width(): number {
        return this._controller.window.width;
    }

    public get progressPerLevelWidth(): number {
        return Math.floor(MathUtils.lerp(this._talentTrack.progressPerLevel, 0, this.width)) | 0;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._divider) {
                this._divider.dispose();
                this._divider = null;
            }
            this._SafeStr_5437 = null;
            this._SafeStr_5205 = null;
            this._SafeStr_2615 = null;
            this._SafeStr_2466 = null;
            this._talentTrack = null;
            this._controller = null;
            this._habboTalent = null;
            this._disposed = true;
        }
    }

    public resize(): void {
        let _loc5_: number = 0;
        let _loc4_: IStaticBitmapWrapperWindow = null;
        let _loc1_: number = Math.floor(MathUtils.lerp(this._talentTrack.totalProgress, 0, this.width)) | 0;
        this._SafeStr_2466.width = this.width;
        this._SafeStr_5205.width = this.width;
        this._SafeStr_5437.width = _loc1_;
        this._SafeStr_2615.x = MathUtils.clamp(_loc1_ - (this._SafeStr_2615.width / 2 | 0), 0, this.width - this._SafeStr_2615.width) | 0;
        let _loc2_: IWindow = this._SafeStr_2466.findChildByName("avatar_glow");
        _loc2_.x = this._SafeStr_2615.x - 10;
        _loc2_.y = this._SafeStr_2615.y - 10;
        _loc2_.width = this._SafeStr_2615.width + 2 * 10;
        _loc2_.height = this._SafeStr_2615.height + 2 * 10;
        let _loc3_: IWindow = this._SafeStr_2466.findChildByName("progress_balloon");
        _loc3_.x = this._SafeStr_2615.x + Math.floor(this._SafeStr_2615.width / 2) - Math.floor(_loc3_.width / 2) + 5 | 0;
        _loc5_ = 1;
        while (_loc5_ < this._talentTrack.levels.length) {
            _loc4_ = castGuarded(this._SafeStr_2466.findChildByName("progress_divider_level_" + _loc5_), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
            _loc4_.x = _loc5_ * this.progressPerLevelWidth;
            if (_loc4_.x < _loc1_) {
                _loc4_.assetUri = "talent_achieved_div";
            } else {
                _loc4_.assetUri = "talent_unachieved_div";
            }
            _loc4_.visible = true;
            _loc5_++;
        }
        this._SafeStr_2466.invalidate();
    }

    private createMeter(): void {
        let _loc2_: number = 0;
        let _loc1_: IStaticBitmapWrapperWindow = null;
        this._SafeStr_2466 = castGuarded(this._controller.window.findChildByName("progress_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._divider = castGuarded(this._SafeStr_2466.removeChild(this._SafeStr_2466.findChildByName("progress_level_divider")), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._SafeStr_5437 = castGuarded(this._SafeStr_2466.findChildByName("achieved_mid"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._SafeStr_5205 = castGuarded(this._SafeStr_2466.findChildByName("unachieved_mid"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        _loc2_ = 1;
        while (_loc2_ < this._talentTrack.levels.length) {
            _loc1_ = castGuarded(this._divider.clone(), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
            _loc1_.name = "progress_divider_level_" + _loc2_;
            this._SafeStr_2466.addChild(_loc1_);
            _loc2_++;
        }
        this._SafeStr_2615 = castGuarded(this._SafeStr_2466.findChildByName("progress_needle"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        castGuarded(this._SafeStr_2615.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = this._habboTalent.sessionManager.figure;
        this._SafeStr_2466.setChildIndex(this._SafeStr_2615, this._SafeStr_2466.numChildren - 1);
    }

    get [IDisposable](): true {
        return true;
    }
}
