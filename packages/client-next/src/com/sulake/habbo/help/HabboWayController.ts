import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIProgressIndicatorWidget } from '@/com/sulake/habbo/window/widgets/IProgressIndicatorWidget';

export class HabboWayController {
    static { registerClassName(this, 'com.sulake.habbo.help::HabboWayController'); }

    private readonly START_PAGE: number = 0;
    private _pageCount: number = 0;
    private _currentPage: number = 0;

    declare private _habboHelp: HabboHelp;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

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

    private get finalPage(): number {
        return this._habboHelp.getInteger("help.habboway.page.count", 6);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public showHabboWay(): void {
        this.closeWindow();
        this._SafeStr_2492 = this._habboHelp.getModalXmlWindow("habbo_way");
        this._window = castGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.procedure = this.onWindowEvent;
        castGuarded(castGuarded(this._window.findChildByName("page_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIProgressIndicatorWidget, "com.sulake.habbo.window.widgets.IProgressIndicatorWidget").size = this.finalPage >>> 0;
        this.setCurrentPage(0);
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
                this.setCurrentPage(Math.min(this.finalPage, this._currentPage + 1) | 0);
                this._habboHelp.trackGoogle("habboWay", "clickNextPage_" + this._currentPage);
                break;
            case "back_button":
            case "previous_button":
                this.setCurrentPage(Math.max(0, this._currentPage - 1) | 0);
                this._habboHelp.trackGoogle("habboWay", "clickPrevPage_" + this._currentPage);
                break;
            case "quiz_button":
                this._habboHelp.trackGoogle("habboWay", "clickQuiz");
                this._habboHelp.showHabboWayQuiz();
        }
    };

    private setCurrentPage(param1: number): void {
        this._currentPage = param1;
        if (this._currentPage < this.finalPage) {
            if (this._currentPage == 0) {
                this._window.findChildByName("previous_button").visible = false;
            } else {
                this._window.findChildByName("previous_button").visible = true;
            }
            castGuarded(this._window.findChildByName("illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}habboway/page_" + this._currentPage + ".png";
            castGuarded(this._window.findChildByName("dove_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "help_habboway_dove_off";
            castGuarded(castGuarded(this._window.findChildByName("page_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIProgressIndicatorWidget, "com.sulake.habbo.window.widgets.IProgressIndicatorWidget").position = this._currentPage + 1 >>> 0;
            this._window.findChildByName("correct_title").caption = "${habbo.way.page." + this._currentPage + ".correct.title}";
            this._window.findChildByName("correct_description").caption = "${habbo.way.page." + this._currentPage + ".correct.description}";
            this._window.findChildByName("wrong_title").caption = "${habbo.way.page." + this._currentPage + ".wrong.title}";
            this._window.findChildByName("wrong_description").caption = "${habbo.way.page." + this._currentPage + ".wrong.description}";
            this._window.findChildByName("page_container").visible = true;
            this._window.findChildByName("final_page").visible = false;
            this._window.findChildByName("page_container").invalidate();
        } else {
            castGuarded(this._window.findChildByName("illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}habboway/page_end.png";
            castGuarded(this._window.findChildByName("dove_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "help_habboway_dove_on";
            castGuarded(castGuarded(this._window.findChildByName("page_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIProgressIndicatorWidget, "com.sulake.habbo.window.widgets.IProgressIndicatorWidget").position = 0;
            this._window.findChildByName("page_container").visible = false;
            this._window.findChildByName("final_page").visible = true;
            this._window.findChildByName("final_page").invalidate();
        }
    }
}
