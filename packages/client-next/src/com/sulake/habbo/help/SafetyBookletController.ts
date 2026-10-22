import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIProgressIndicatorWidget } from '@/com/sulake/habbo/window/widgets/IProgressIndicatorWidget';

export class SafetyBookletController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::SafetyBookletController'); }

    private readonly START_PAGE: number = 0;
    private readonly FINAL_PAGE: number = 7;

    declare private _habboHelp: HabboHelp;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;
    private _currentPage: number = 0;

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.closeWindow();
            if (this._habboHelp) {
                this._habboHelp = null;
            }
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public openSafetyBooklet(): void {
        this.closeWindow();
        this._SafeStr_2492 = this._habboHelp.getModalXmlWindow("safety_booklet");
        this._window = castGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.procedure = this.onWindowEvent;
        this.setCurrentPage(0);
        this._habboHelp.tracking.trackEventLog("Quiz", "", "talent.quiz.open");
    }

    public closeWindow(): void {
        this._window = null;
        if (this._SafeStr_2492) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this._disposed || !this._window || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this.closeWindow();
                break;
            case "next_button":
                this.setCurrentPage(Math.min(7, this._currentPage + 1) | 0);
                this._habboHelp.tracking.trackEventLog("Quiz", "" + this._currentPage, "talent.quiz.change_page");
                this._habboHelp.trackGoogle("safetyBooklet", "clickNextPage_" + this._currentPage);
                break;
            case "back_button":
            case "previous_button":
                this.setCurrentPage(Math.max(0, this._currentPage - 1) | 0);
                this._habboHelp.tracking.trackEventLog("Quiz", "" + this._currentPage, "talent.quiz.change_page");
                this._habboHelp.trackGoogle("safetyBooklet", "clickPrevPage_" + this._currentPage);
                break;
            case "quiz_button":
                this._habboHelp.trackGoogle("safetyBooklet", "clickQuiz");
                this._habboHelp.showSafetyQuiz();
                break;
            case "ok_button":
                this._habboHelp.trackGoogle("safetyBooklet", "clickOk");
                this._habboHelp.showSafetyQuiz();
                this._habboHelp.closeSafetyBooklet();
        }
    };

    private setCurrentPage(param1: number): void {
        this._currentPage = param1;
        this._window.findChildByName("safety.quiz.explanation").visible = !this._habboHelp.safetyQuizDisabled;
        if (this._currentPage < 7) {
            if (this._currentPage == 0) {
                this._window.findChildByName("previous_button").visible = false;
            } else {
                this._window.findChildByName("previous_button").visible = true;
            }
            castGuarded(this._window.findChildByName("illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/page_" + this._currentPage + ".png";
            castGuarded(this._window.findChildByName("safety_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/safety_off.png";
            castGuarded(castGuarded(this._window.findChildByName("page_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIProgressIndicatorWidget, "com.sulake.habbo.window.widgets.IProgressIndicatorWidget").position = this._currentPage + 1 >>> 0;
            this._window.findChildByName("title").caption = "${safety.booklet.page." + this._currentPage + ".title}";
            this._window.findChildByName("description").caption = "${safety.booklet.page." + this._currentPage + ".description}";
            this._window.findChildByName("page_container").visible = true;
            this._window.findChildByName("final_page").visible = false;
            this._window.findChildByName("final_page_no_questions").visible = false;
            this._window.findChildByName("page_container").invalidate();
        } else {
            castGuarded(this._window.findChildByName("illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/page_end.png";
            castGuarded(this._window.findChildByName("safety_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/safety_on.png";
            castGuarded(castGuarded(this._window.findChildByName("page_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIProgressIndicatorWidget, "com.sulake.habbo.window.widgets.IProgressIndicatorWidget").position = 0;
            this._window.findChildByName("page_container").visible = false;
            if (this._habboHelp.safetyQuizDisabled) {
                this._window.findChildByName("final_page_no_questions").visible = true;
                this._window.findChildByName("final_page_no_questions").invalidate();
            } else {
                this._window.findChildByName("final_page").visible = true;
                this._window.findChildByName("final_page").invalidate();
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
