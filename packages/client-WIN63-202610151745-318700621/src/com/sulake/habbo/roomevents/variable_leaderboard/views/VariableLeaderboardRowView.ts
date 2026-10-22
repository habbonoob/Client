import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { VariableLeaderboardRow } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardRow';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';

export class VariableLeaderboardRowView implements IDisposable, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard.views::VariableLeaderboardRowView'); }

    private static readonly CELL_HORIZONTAL_PADDING: number = 6;
    private static readonly _SafeStr_14322: string = "-";
    private static readonly MINUTE_MS: number = 60000;
    private static readonly HOUR_MS: number = 3600000;

    declare private _window: IWindowContainer;

    declare private _localization: IHabboLocalizationManager;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _groupsManager: IHabboGroupsManager;

    declare private _SafeStr_3375: VariableLeaderboardRow;

    private _columnTypes: number[] = [];
    private _SafeStr_14323: number[] = [];

    declare private _dataCells: ITextWindow[];

    declare private _currentTime: number;
    static { (this.prototype as any)._currentTime = NaN; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: IHabboLocalizationManager, param3: boolean) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._localization = param2;
        this._dataCells = Array.from([this.dataCell1, this.dataCell2, this.dataCell3]);
        this.rowBackground.color = param3 ? 4280558628 : 4280032284;
        this.faceBitmap.disposesBitmap = false;
        this.profileRegion.addEventListener("WME_CLICK", this.onProfileClick);
        this._window.visible = false;
    }

    private static formatValue(param1: string): string {
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        if (param1 == null || param1.length == 0) {
            return "";
        }
        let _loc5_: string = "";
        let _loc2_: string = param1.charAt(0);
        if (_loc2_ == "-" || _loc2_ == "+") {
            _loc5_ = _loc2_;
            _loc4_ = 1;
        }
        if (_loc4_ == param1.length) {
            return param1;
        }
        _loc7_ = _loc4_;
        while (_loc7_ < param1.length) {
            _loc9_ = param1.charCodeAt(_loc7_) | 0;
            if (_loc9_ < 48 || _loc9_ > 57) {
                return param1;
            }
            _loc7_++;
        }
        let _loc8_: string = param1.substr(_loc4_);
        let _loc6_: number = _loc8_.length % 3;
        if (_loc6_ == 0) {
            _loc6_ = 3;
        }
        let _loc3_: string = _loc5_ + _loc8_.substr(0, _loc6_);
        _loc7_ = _loc6_;
        while (_loc7_ < _loc8_.length) {
            _loc3_ += "," + _loc8_.substr(_loc7_, 3);
            _loc7_ += 3;
        }
        return _loc3_;
    }

    private static padTwoDigits(param1: number): string {
        return param1 < 10 ? "0" + param1 : String(param1);
    }

    private static isTimeType(param1: number): boolean {
        return param1 == 2 || param1 == 3;
    }

    public setDependencies(param1: IAvatarRenderManager, param2: IHabboGroupsManager): void {
        let _loc3_: boolean = this._avatarRenderManager != param1;
        this._avatarRenderManager = param1;
        this._groupsManager = param2;
        if (_loc3_) {
            this.renderFace();
        }
    }

    public configureColumns(param1: number[], param2: number[], param3: number): void {
        let _loc4_: number = 0;
        let _loc7_: ITextWindow = null;
        let _loc6_: number = 0;
        this._columnTypes = param1.slice();
        this._SafeStr_14323 = param2.slice();
        this._window.width = param3;
        let _loc5_: number = 38;
        this.profileRegion.x = _loc5_;
        this.profileRegion.width = this._SafeStr_14323[0];
        this.usernameText.width = Math.max(0, this.profileRegion.width - this.usernameText.x - 3) | 0;
        _loc5_ += this._SafeStr_14323[0];
        _loc4_ = 0;
        while (_loc4_ < this._dataCells.length) {
            _loc7_ = this._dataCells[_loc4_];
            _loc6_ = _loc4_ + 1;
            _loc7_.visible = _loc6_ < this._columnTypes.length;
            if (!_loc7_.visible) {
                _loc7_.text = "";
            } else {
                _loc7_.x = _loc5_ + 6 / 2 | 0;
                _loc7_.width = Math.max(0, this._SafeStr_14323[_loc6_] - 6) | 0;
                _loc5_ += this._SafeStr_14323[_loc6_];
            }
            _loc4_++;
        }
        this.renderCells();
    }

    public setData(param1: VariableLeaderboardRow, param2: number): void {
        let _loc3_: string = this._SafeStr_3375?.figure;
        this._SafeStr_3375 = param1;
        this._currentTime = param2;
        this._window.visible = true;
        this.rankText.text = String(param1.rank);
        this.usernameText.text = param1.username;
        this.renderCells();
        if (_loc3_ != param1.figure || this.faceBitmap.bitmap == null) {
            this.renderFace();
        }
    }

    public clear(): void {
        this._SafeStr_3375 = null;
        this._window.visible = false;
        this.rankText.text = "";
        this.usernameText.text = "";
        for (const _loc1_ of this._dataCells ?? []) {
            _loc1_.text = "";
        }
        this.clearFace();
    }

    public refreshRelativeTimes(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: string = null;
        if (this._SafeStr_3375 == null) {
            return;
        }
        this._currentTime = param1;
        _loc2_ = 0;
        while (_loc2_ < this._dataCells.length) {
            _loc3_ = _loc2_ + 1;
            if (!(_loc3_ >= this._columnTypes.length || !VariableLeaderboardRowView.isTimeType(this._columnTypes[_loc3_]))) {
                _loc4_ = this.formatColumn(this._columnTypes[_loc3_]);
                if (this._dataCells[_loc2_].text != _loc4_) {
                    this._dataCells[_loc2_].text = _loc4_;
                }
            }
            _loc2_++;
        }
    }

    private renderCells(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (this._SafeStr_3375 == null) {
            return;
        }
        _loc1_ = 0;
        while (_loc1_ < this._dataCells.length) {
            _loc2_ = _loc1_ + 1;
            if (_loc2_ < this._columnTypes.length) {
                this._dataCells[_loc1_].text = this.formatColumn(this._columnTypes[_loc2_]);
            }
            _loc1_++;
        }
    }

    private formatColumn(param1: number): string {
        let _loc2_: string = null;
        switch (param1 - 1) {
            case 0:
                _loc2_ = VariableLeaderboardRowView.formatValue(this._SafeStr_3375.rawValue);
                return _loc2_.length == 0 ? "-" : _loc2_;
            case 1:
                return this.formatTime(this._SafeStr_3375.lastUpdateTime, this._currentTime);
            case 2:
                return this.formatTime(this._SafeStr_3375.creationTime, this._currentTime);
            case 3:
                return this._SafeStr_3375.levelAvailable ? VariableLeaderboardRowView.formatValue(this._SafeStr_3375.level) : "-";
            case 4:
                return this._SafeStr_3375.textConnectionAvailable ? this._SafeStr_3375.textConnection : "-";
            default:
                return "";
        }
    }

    private formatTime(param1: number, param2: number): string {
        let _loc7_: number = 0;
        if (param1 <= 0) {
            return "-";
        }
        let _loc3_: number = param2 - param1;
        if (_loc3_ >= 0 && _loc3_ < 3600000) {
            _loc7_ = Math.max(1, Math.floor(_loc3_ / 60000)) | 0;
            return this._localization.getLocalizationWithParams("wiredfurni.variable_leaderboard.minutes_ago", "%minutes%m ago", "minutes", String(_loc7_));
        }
        let _loc4_: Date = new Date(param1);
        let _loc8_: Date = new Date(param2);
        if (_loc4_.getFullYear() == _loc8_.getFullYear() && _loc4_.getMonth() == _loc8_.getMonth() && _loc4_.getDate() == _loc8_.getDate()) {
            return VariableLeaderboardRowView.padTwoDigits(_loc4_.getHours() | 0) + ":" + VariableLeaderboardRowView.padTwoDigits(_loc4_.getMinutes() | 0);
        }
        let _loc6_: string = this._localization.getLocalization("wiredfurni.params.time.month." + (_loc4_.getMonth() + 1));
        if (_loc6_.charAt(_loc6_.length - 1) == ".") {
            _loc6_ = _loc6_.substr(0, _loc6_.length - 1);
        }
        let _loc5_: string = _loc6_ + " " + _loc4_.getDate();
        return _loc4_.getFullYear() == _loc8_.getFullYear() ? _loc5_ : _loc5_ + ", " + _loc4_.getFullYear();
    }

    private renderFace(): void {
        let _loc1_: BitmapData = null;
        this.clearFace();
        if (this._SafeStr_3375 == null || this._avatarRenderManager == null || this._SafeStr_3375.figure == null || this._SafeStr_3375.figure.length == 0) {
            return;
        }
        let _loc2_: IAvatarImage = this._avatarRenderManager.createAvatarImage(this._SafeStr_3375.figure, "h", null, this);
        if (_loc2_ == null) {
            return;
        }
        try {
            _loc1_ = HabboFaceFocuser.focusUserFace(_loc2_, "head", 2, 0.5, this.faceBitmap.width, this.faceBitmap.height);
        } finally {
            _loc2_.dispose();
        }
        this.faceBitmap.bitmap = _loc1_;
        this.faceBitmap.invalidate();
    }

    public avatarImageReady(param1: string): void {
        if (!this._disposed && this._SafeStr_3375 != null && this._SafeStr_3375.figure == param1) {
            this.renderFace();
        }
    }

    private clearFace(): void {
        if (this.faceBitmap.bitmap != null) {
            this.faceBitmap.bitmap.dispose();
            this.faceBitmap.bitmap = null;
            this.faceBitmap.invalidate();
        }
    }

    private onProfileClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_3375 != null && this._groupsManager != null) {
            this._groupsManager.showExtendedProfile(this._SafeStr_3375.userId);
        }
    };

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window != null && !this._window.disposed) {
            this.profileRegion.removeEventListener("WME_CLICK", this.onProfileClick);
            this.clearFace();
            this._window.dispose();
        }
        this._window = null;
        this._localization = null;
        this._avatarRenderManager = null;
        this._groupsManager = null;
        this._SafeStr_3375 = null;
        this._columnTypes = null;
        this._SafeStr_14323 = null;
        this._dataCells = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get rowBackground(): IWindowContainer {
        return asGuarded(this._window.findChildByName("row_background"), isIWindowContainer);
    }

    private get rankText(): ITextWindow {
        return asGuarded(this._window.findChildByName("rank_text"), isITextWindow);
    }

    private get profileRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("profile_region"), isIRegionWindow);
    }

    private get faceBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("face_bitmap"), isIBitmapWrapperWindow);
    }

    private get usernameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("username_text"), isITextWindow);
    }

    private get dataCell1(): ITextWindow {
        return asGuarded(this._window.findChildByName("data_cell_1"), isITextWindow);
    }

    private get dataCell2(): ITextWindow {
        return asGuarded(this._window.findChildByName("data_cell_2"), isITextWindow);
    }

    private get dataCell3(): ITextWindow {
        return asGuarded(this._window.findChildByName("data_cell_3"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
