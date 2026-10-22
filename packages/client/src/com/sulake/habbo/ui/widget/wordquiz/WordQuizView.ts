import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WordQuizWidget } from '@/com/sulake/habbo/ui/widget/wordquiz/WordQuizWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class WordQuizView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.wordquiz::WordQuizView'); }

    public static readonly STATE_QUESTION: number = 0;
    public static readonly STATE_RESULT: number = 1;
    private static readonly CONTAINER_IN_BOTTOM: boolean = false;
    private static _SafeStr_6317: number = 0;

    constructor(param1: WordQuizWidget) {
        this._widget = param1;
        WordQuizView._SafeStr_6317 = this._widget.handler.container.config.getInteger("poll.word.quiz.result.view.seconds", 4) * 1000;
    }

    declare private _widget: WordQuizWidget;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2856: Timer;

    declare private _SafeStr_5675: string;

    public get mainWindow(): IWindow {
        return this._window;
    }

    public dispose(): void {
        this._widget = null;
        this.removeWindow();
        if (this._window) {
            if (this._window.desktop) {
                this._window.desktop.removeEventListener("WE_RESIZED", this.onDesktopResized);
            }
            this._window.dispose();
            this._window = null;
        }
    }

    public createWindow(param1: number, param2: string = null): void {
        let _loc3_: string = null;
        this.removeWindow();
        if (param1 == 0) {
            _loc3_ = "wordquiz_question_xml";
        } else {
            _loc3_ = "wordquiz_result_xml";
        }
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(this._widget.assets.getAssetByName(_loc3_).content, XML)), isIWindowContainer);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        let _loc4_: IWindow = this._window.findChildByName("button_like");
        if (_loc4_) {
            _loc4_.addEventListener("WME_CLICK", this.onLike);
        }
        _loc4_ = this._window.findChildByName("button_dislike");
        if (_loc4_) {
            _loc4_.addEventListener("WME_CLICK", this.onDislike);
        }
        if (param2 != null) {
            this._SafeStr_5675 = param2;
        }
        this._window.findChildByName("quiz_topic").caption = this._SafeStr_5675;
        this._window.findChildByName("quiz_topic").width = Math.min(660, this.getCorrectTextWidth(param1, this._SafeStr_5675) + 6) | 0;
        this._window.findChildByName("quiz_topic").y = 3;
        this.positionWindow();
        this._window.desktop.addEventListener("WE_RESIZED", this.onDesktopResized);
    }

    public removeWindow(): void {
        if (!this._window || this._window.numChildren == 0) {
            return;
        }
        this._window.desktop.addEventListener("WE_RESIZED", this.onDesktopResized);
        this._window.dispose();
        this._window = null;
        if (this._SafeStr_2856) {
            this._SafeStr_2856.reset();
            this._SafeStr_2856 = null;
        }
    }

    public updateCounter(param1: string): void {
        if (!this._window || !this._window.findChildByName("countdown")) {
            return;
        }
        if (param1 == "0") {
            param1 = "";
        }
        this._window.findChildByName("countdown").caption = param1;
    }

    public updateResults(param1: UtilsMap): void {
        if (!this._window || !param1) {
            return;
        }
        let _loc3_: number = Number(param1["0"] != null ? param1.getValue("0") : 0) | 0;
        let _loc2_: ILabelWindow = asGuarded(this._window.findChildByName("lbl_dislike_count"), isILabelWindow);
        if (_loc2_) {
            _loc2_.text = _loc3_.toString();
        }
        _loc3_ = Number(param1["1"] != null ? param1.getValue("1") : 0) | 0;
        _loc2_ = asGuarded(this._window.findChildByName("lbl_like_count"), isILabelWindow);
        if (_loc2_) {
            _loc2_.text = _loc3_.toString();
        }
    }

    public displayResults(param1: UtilsMap): void {
        this.createWindow(1);
        this.updateResults(param1);
        this._SafeStr_2856 = new Timer(WordQuizView._SafeStr_6317);
        this._SafeStr_2856.addEventListener("timer", this.onWaitTimer);
        this._SafeStr_2856.start();
    }

    private getCorrectTextWidth(param1: number, param2: string = null): number {
        let _loc4_: string = null;
        let _loc5_: IWindowContainer = null;
        if (param1 == 0) {
            _loc4_ = "wordquiz_question_xml";
        } else {
            _loc4_ = "wordquiz_result_xml";
        }
        _loc5_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(this._widget.assets.getAssetByName(_loc4_).content, XML)), isIWindowContainer);
        if (_loc5_ == null) {
            throw new Error("Failed to construct window from XML!");
        }
        _loc5_.findChildByName("quiz_topic").caption = param2;
        _loc5_.findChildByName("quiz_topic").width = 660;
        let _loc3_: number = castGuarded(_loc5_.findChildByName("quiz_topic"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textWidth | 0;
        _loc5_.dispose();
        return _loc3_;
    }

    private onLike = (param1: WindowMouseEvent): void => {
        this._widget.sendAnswer(1);
    };

    private onDislike = (param1: WindowMouseEvent): void => {
        this._widget.sendAnswer(0);
    };

    private onDesktopResized = (param1: WindowEvent): void => {
        this.positionWindow();
    };

    private positionWindow(): void {
        if (!this._window || this._window.numChildren == 0) {
            return;
        }
        let _loc1_: IWindow = this._window.getChildAt(0);
        this._window.x = this._window.desktop.width / 2 - _loc1_.width / 2 | 0;
        this._window.y = 6;
    }

    private onWaitTimer = (param1: TimerEvent): void => {
        this.removeWindow();
    };
}
