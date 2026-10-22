import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboClubCenter } from '@/com/sulake/habbo/catalog/clubcenter/HabboClubCenter';
import type { ScrKickbackData } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrKickbackData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ClubSpecialInfoBubbleView {
    static { registerClassName(this, 'com.sulake.habbo.catalog.clubcenter::ClubSpecialInfoBubbleView'); }

    private static readonly MARGIN: number = 8;

    constructor(param1: HabboClubCenter, param2: IHabboWindowManager, param3: ScrKickbackData, param4: IWindow) {
        this._data = param3;
        this._controller = param1;
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("club_center_special_info_xml").content)), isIWindowContainer);
        if (!this._window) {
            return;
        }
        this._window.procedure = this.onInput;
        this.positionWindow(param4);
        this.setElementText("info_creditsspent", this.getLocalization("hccenter.breakdown.creditsspent").replace("%credits%", String(this._data.totalCreditsSpent)));
        let _loc6_: number = this._data.kickbackPercentage * 100 | 0;
        this.setElementText("info_factor", this.getLocalization("hccenter.breakdown.paydayfactor").replace("%percent%", String(_loc6_)).replace("%multiplier%", String(this._data.kickbackPercentage)));
        _loc6_ = this._data.kickbackPercentage * 100 | 0;
        let _loc5_: string = this._controller.localization.getLocalization("hccenter.breakdown.paydayfactor.percent");
        if (_loc5_ && _loc5_.length > 0) {
            _loc5_ = _loc5_.replace("%percent%", String(_loc6_)).replace("%multiplier%", String(this._data.kickbackPercentage));
        } else {
            _loc5_ = this.getLocalization("hccenter.breakdown.paydayfactor").replace("%percent%", String(this._data.kickbackPercentage));
        }
        this.setElementText("info_factor", _loc5_);
        this.setElementText("info_streakbonus", this.getLocalization("hccenter.breakdown.streakbonus").replace("%credits%", String(this._data.creditRewardForStreakBonus)));
        let _loc8_: number = ((this._data.kickbackPercentage * this._data.totalCreditsSpent + this._data.creditRewardForStreakBonus) * 100 | 0) / 100;
        let _loc7_: number = (this._data.creditRewardForMonthlySpent + this._data.creditRewardForStreakBonus) * 100 / 100 | 0;
        this.setElementText("info_total", this.getLocalization("hccenter.breakdown.total").replace("%credits%", String(_loc7_)).replace("%actual%", String(_loc8_)));
        this._window.activate();
        this._SafeStr_3705 = new Timer(80, 1);
        this._SafeStr_3705.addEventListener("timer", this.onTimerEvent);
        this._SafeStr_3705.start();
        if (this._controller.stage) {
            this._controller.stage.addEventListener("click", this.onStageClick);
        }
    }

    declare private _data: ScrKickbackData;

    declare private _controller: HabboClubCenter;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3705: Timer;

    public dispose(): void {
        if (this._controller && this._controller.stage) {
            this._controller.stage.removeEventListener("click", this.onStageClick);
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._controller = null;
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_DOWN" || !this._controller) {
            return;
        }
        param1.stopImmediatePropagation();
        let _loc3_: any = param2.name;
        if ("special_infolink" === _loc3_) {
            this._controller.openPaydayHelpPage();
        }
        this._controller.removeBreakdown();
    };

    private positionWindow(param1: IWindow): void {
        if (!param1 || !this._window || !this._controller || !this._controller.stage) {
            return;
        }
        let _loc2_: Point = new Point();
        param1.getGlobalPosition(_loc2_);
        if (this._controller.stage.stageWidth < _loc2_.x + param1.width + this._window.width + 8 && _loc2_.x > this._window.width + 8) {
            (isIBubbleWindow(this._window) ? this._window : null).direction = "right";
            _loc2_.x -= this._window.width + 8;
        } else {
            _loc2_.x += param1.width + 8;
        }
        _loc2_.y += param1.height * 0.5 - this._window.height * 0.5;
        this._window.position = _loc2_;
    }

    private setElementText(param1: string, param2: string): void {
        if (!this._window) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName(param1), isITextWindow);
        if (_loc3_) {
            _loc3_.text = param2;
        }
    }

    private getLocalization(param1: string): string {
        if (!this._controller || !this._controller.localization) {
            return "";
        }
        return this._controller.localization.getLocalization(param1, param1);
    }

    private onTimerEvent = (param1: TimerEvent): void => {
        this._SafeStr_3705.stop();
        this._SafeStr_3705.removeEventListener("timer", this.onTimerEvent);
        this._SafeStr_3705 = null;
        this._window.activate();
    };

    private onStageClick = (param1: MouseEvent): void => {
        if (this._controller) {
            this._controller.removeBreakdown();
        }
    };
}
