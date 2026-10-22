import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RareTeaser implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::RareTeaser'); }

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IWindowContainer;

    declare private _SafeStr_4655: any[];

    declare private _SafeStr_6763: any[];

    declare private _pages: any[];

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public dispose(): void {
        this._questEngine = null;
        this._window = null;
    }

    public prepare(param1: IFrameWindow): void {
        let _loc2_: number = 0;
        this._SafeStr_4655 = this.parseInts("quests.seasonalcalendar.rareteaser.days");
        this._SafeStr_6763 = this.parseStrings("quests.seasonalcalendar.rareteaser.images");
        this._pages = this.parseStrings("quests.seasonalcalendar.rareteaser.pages");
        this._window = castGuarded(param1.findChildByName("rare_teaser_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_ = 1;
        while (_loc2_ <= this._SafeStr_4655.length) {
            this.getFurniPic(_loc2_).assetUri = this._questEngine.questController.seasonalCalendarWindow.getCalendarImageGalleryHost() + this._SafeStr_6763[_loc2_ - 1] + ".png";
            _loc2_++;
        }
        this.getClickRegion(1).procedure = this.onFirstSlot;
        this.getClickRegion(2).procedure = this.onSecondSlot;
        this.getClickRegion(3).procedure = this.onThirdSlot;
    }

    public refresh(): void {
        let _loc3_: number = 0;
        let _loc4_: any = false;
        let _loc1_: number = this._questEngine.questController.seasonalCalendarWindow.currentDay;
        let _loc2_: number = -1;
        _loc3_ = 1;
        while (_loc3_ <= this._SafeStr_4655.length) {
            _loc4_ = this._SafeStr_4655[_loc3_ - 1] > _loc1_;
            this.getFurniPic(_loc3_).visible = !_loc4_;
            this.getLockIcon(_loc3_).visible = _loc4_;
            this.getOpenBg(_loc3_).visible = !_loc4_;
            this.getLockedBg(_loc3_).visible = _loc4_;
            this.getClickRegion(_loc3_).visible = !_loc4_;
            if (_loc4_ && _loc2_ == -1) {
                _loc2_ = this._SafeStr_4655[_loc3_ - 1] - _loc1_ | 0;
            }
            _loc3_++;
        }
        this._window.findChildByName("teaser_info").visible = _loc2_ != -1;
        this._questEngine.localization.registerParameter("quests.seasonalcalendar.rareteaser.info", "days", "" + _loc2_);
    }

    private parseInts(param1: string): any[] {
        let _loc4_: string = this._questEngine.localization.getLocalization(param1, "");
        let _loc3_: any[] = _loc4_.split(",");
        let _loc2_: any[] = [];
        for (const _loc5_ of _loc3_ ?? []) {
            if (!isNaN(Number(_loc5_))) {
                _loc2_.push(_loc5_ | 0);
            }
        }
        return _loc2_;
    }

    private parseStrings(param1: string): any[] {
        let _loc4_: string = this._questEngine.localization.getLocalization(param1, "");
        let _loc3_: any[] = _loc4_.split(",");
        let _loc2_: any[] = [];
        for (const _loc5_ of _loc3_ ?? []) {
            if (_loc5_ != "") {
                _loc2_.push(_loc5_);
            }
        }
        return _loc2_;
    }

    private getFurniPic(param1: number): IStaticBitmapWrapperWindow {
        return asGuarded(this.getRare(param1).findChildByName("furni_pic"), isIStaticBitmapWrapperWindow);
    }

    private getLockIcon(param1: number): IWindow {
        return this.getRare(param1).findChildByName("locked_icon");
    }

    private getLockedBg(param1: number): IWindow {
        return this.getRare(param1).findChildByName("locked_bg");
    }

    private getOpenBg(param1: number): IWindow {
        return this.getRare(param1).findChildByName("open_bg");
    }

    private getClickRegion(param1: number): IWindow {
        return this.getRare(param1).findChildByName("click_region");
    }

    private getRare(param1: number): IWindowContainer {
        return castGuarded(this._window.findChildByName("rare_cont_" + param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private onFirstSlot = (param1: WindowEvent, param2: IWindow): void => {
        this.onSlot(param1, 0);
    };

    private onSecondSlot = (param1: WindowEvent, param2: IWindow): void => {
        this.onSlot(param1, 1);
    };

    private onThirdSlot = (param1: WindowEvent, param2: IWindow): void => {
        this.onSlot(param1, 2);
    };

    private onSlot(param1: WindowEvent, param2: number): void {
        if (param1.type == "WME_CLICK" && this._pages[param2] != null) {
            this._questEngine.catalog.openCatalogPage(stringOrNull(this._pages[param2]));
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
