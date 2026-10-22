import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HighScoreStuffData } from '@/com/sulake/habbo/room/object/data/HighScoreStuffData';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HighScoreFurniWidgetHandler } from '@/com/sulake/habbo/ui/handler/HighScoreFurniWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HighScoreDisplayWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.highscore::HighScoreDisplayWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HighScoreDisplayWidget.#initStatics();
        return HighScoreDisplayWidget._log;
    }

    public static readonly INVALID_ID: number = -1;
    private static readonly RELATIVE_OFFSET_X: number = -138;
    private static readonly RELATIVE_OFFSET_Y: number = -400;
    private static readonly SCORETYPE_ONE_PER_TEAM: number = 0;
    private static readonly SCORETYPE_AGGREGATED_WINS: number = 1;
    private static readonly SCORETYPE_ALWAYS_NEW_SCORE: number = 2;
    private static readonly CLEARTYPE_NEVER: number = 0;
    private static readonly CLEARTYPE_DAILY: number = 1;
    private static readonly CLEARTYPE_WEEKLY: number = 2;
    private static readonly CLEARTYPE_MONTHLY: number = 3;
    private static readonly SCORETYPE_LOCALIZATION_KEY_POSTFIX: any[] = ["perteam", "mostwins", "classic", "fastesttime", "longesttime"];
    private static readonly CLEARTYPE_LOCALIZATION_KEY_POSTFIX: any[] = ["alltime", "daily", "weekly", "monthly"];

    private static scoreToTime(param1: number, param2: number): string {
        let _loc3_: number = 0;
        let _loc6_: string = null;
        let _loc5_: any[] = [60, 60, 24];
        if (param2 < 1 || param2 > _loc5_.length) {
            return param1 + "";
        }
        let _loc4_: string = "";
        _loc3_ = 0;
        while (_loc3_ < param2) {
            if (_loc3_ == param2 - 1) {
                _loc6_ = param1 + "";
            } else {
                _loc6_ = "" + param1 % _loc5_[_loc3_];
                param1 = param1 / _loc5_[_loc3_] | 0;
            }
            if (_loc6_.length < 2 && _loc3_ < 2) {
                _loc6_ = "0" + _loc6_;
            }
            _loc4_ = _loc6_ + ":" + _loc4_;
            _loc3_++;
        }
        return _loc4_.substring(0, _loc4_.length - 1);
    }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
        castTo(param1, HighScoreFurniWidgetHandler).widget = this;
        this._SafeStr_2926 = castGuarded(param2.createWindow("room_widget_highscore_background_container", "", 4, 0, 0, new Rectangle(0, 0, 10, 10)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.resizeRootContainerToDesktop();
        this._SafeStr_2926.addEventListener("WE_PARENT_RESIZED", this.resizeRootContainerToDesktop);
    }

    declare private _SafeStr_2926: IWindowContainer;

    declare private _bubble: IBubbleWindow;

    declare private _SafeStr_4960: IWindowContainer;

    private _roomId: number = -1;
    private _roomObjId: number = -1;
    private _SafeStr_4495: Point = new Point(0, 0);

    public override get mainWindow(): IWindow {
        return this._SafeStr_2926;
    }

    public get isOpen(): boolean {
        return this._bubble != null && Boolean(this._bubble.visible);
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomObjId(): number {
        return this._roomObjId;
    }

    public override dispose(): void {
        if (this._bubble != null) {
            this.destroyWindow();
        }
        this._SafeStr_2926.removeEventListener("WE_PARENT_RESIZED", this.resizeRootContainerToDesktop);
        this._SafeStr_2926.dispose();
        super.dispose();
    }

    public open(param1: number, param2: number, param3: HighScoreStuffData): void {
        let _loc4_: string = null;
        let _loc11_: string = null;
        let _loc7_: IWindowContainer = null;
        let _loc6_: string = null;
        if (this._bubble != null) {
            this.destroyWindow();
        }
        let _loc8_: any = false;
        if (param3.clearType != -1 && param3.scoreType != -1) {
            _loc8_ = HighScoreDisplayWidget.SCORETYPE_LOCALIZATION_KEY_POSTFIX[param3.scoreType].indexOf("time") >= 0;
            _loc4_ = castTo(this._SafeStr_2143, HighScoreFurniWidgetHandler).container.localization.getLocalization("high.score.display.cleartype." + HighScoreDisplayWidget.CLEARTYPE_LOCALIZATION_KEY_POSTFIX[param3.clearType]);
            _loc11_ = castTo(this._SafeStr_2143, HighScoreFurniWidgetHandler).container.localization.getLocalization("high.score.display.scoretype." + HighScoreDisplayWidget.SCORETYPE_LOCALIZATION_KEY_POSTFIX[param3.scoreType]);
            castTo(this._SafeStr_2143, HighScoreFurniWidgetHandler).container.localization.registerParameter("high.score.display.caption", "cleartype", _loc4_);
            castTo(this._SafeStr_2143, HighScoreFurniWidgetHandler).container.localization.registerParameter("high.score.display.caption", "scoretype", _loc11_);
        }
        this._roomId = param2;
        this._roomObjId = param1;
        this.createWindow();
        if (!this._SafeStr_4960) {
            HighScoreDisplayWidget._log.error("ERROR: \'entry_template\' could not found from high score display\'s window XML");
            return;
        }
        let _loc9_: ITextWindow = castGuarded(this._bubble.findChildByName("score_header"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc9_.caption = castTo(this._SafeStr_2143, HighScoreFurniWidgetHandler).container.localization.getLocalization(_loc8_ ? "high.score.display.time.header" : "high.score.display.score.header");
        _loc9_.invalidate();
        let _loc10_: IItemListWindow = castGuarded(this._bubble.findChildByName("entries"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        for (const _loc5_ of param3.entries ?? []) {
            _loc7_ = castGuarded(this._SafeStr_4960.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc7_.getChildByName("usernames").caption = this.getUserNameList(_loc5_.users);
            _loc6_ = _loc8_ ? (_loc5_.score >= 3600 ? HighScoreDisplayWidget.scoreToTime(_loc5_.score, 3) : HighScoreDisplayWidget.scoreToTime(_loc5_.score, 2)) : _loc5_.score.toString();
            _loc7_.getChildByName("score").caption = _loc6_;
            _loc10_.addListItem(_loc7_);
        }
        _loc10_.invalidate();
    }

    public setRelativePositionToRoomObjectAt(param1: number, param2: number): void {
        if (!this._bubble) {
            return;
        }
        this._bubble.x = param1 + -138;
        this._bubble.y = param2 + -400;
    }

    public close(): void {
        this.destroyWindow();
    }

    private resizeRootContainerToDesktop = (param1: WindowEvent = null): void => {
        this._SafeStr_2926.width = this._SafeStr_2926.desktop.width;
        this._SafeStr_2926.height = this._SafeStr_2926.desktop.height;
    };

    private getUserNameList(param1: any[]): string {
        let _loc2_: string = "";
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = _loc2_ + _loc3_ + ", ";
        }
        return _loc2_.substr(0, _loc2_.length - 2);
    }

    private createWindow(): void {
        let _loc1_: IBubbleWindow = castGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("high_score_display_xml").content)), isIBubbleWindow, "com.sulake.core.window.components.IBubbleWindow");
        this._SafeStr_4960 = castGuarded(_loc1_.findChildByName("entry_template"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        castGuarded(_loc1_.findChildByName("entries"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItem(this._SafeStr_4960);
        this._bubble = _loc1_;
        this._bubble.x = this._SafeStr_4495.x | 0;
        this._bubble.y = this._SafeStr_4495.y | 0;
        this._SafeStr_2926.addChild(_loc1_);
    }

    private destroyWindow(): void {
        this._SafeStr_2926.removeChild(this._bubble);
        this._SafeStr_4495.x = this._bubble.x;
        this._SafeStr_4495.y = this._bubble.y;
        this._bubble.dispose();
        this._bubble = null;
        this._roomId = -1;
        this._roomObjId = -1;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HighScoreDisplayWidget.#staticsReady) return;
        HighScoreDisplayWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HighScoreDisplayWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.furniture.highscore.HighScoreDisplayWidget"));
    }
}
