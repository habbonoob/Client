import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CellTemplate } from '@/com/sulake/habbo/window/utils/tableview/CellTemplate';
import type { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import type { TableRowView } from '@/com/sulake/habbo/window/utils/tableview/TableRowView';
import type { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class TableCellView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::TableCellView'); }

    private _disposed: boolean = false;

    declare private _SafeStr_2737: TableView;

    declare private _SafeStr_3133: TableRowView;

    declare private _SafeStr_3906: string;

    declare private _SafeStr_2192: TableCell;

    declare private _container: IRegionWindow;

    declare private _transitionTimer: Timer;

    constructor(param1: TableView, param2: TableRowView, param3: string, param4: TableCell) {
        this._SafeStr_2737 = param1;
        this._SafeStr_3133 = param2;
        this._SafeStr_3906 = param3;
        this._SafeStr_2192 = param4;
        this._container = asGuarded(this.template.clone(), isIRegionWindow);
        this.updateWidth();
        this.initializeView();
        this._container.addEventListener("WME_DOUBLE_CLICK", this.onDoubleClick);
        this._container.addEventListener("WME_DOWN", param2.onDown);
        this._container.addEventListener("WME_OVER", param2.onHoverOver);
        this._container.addEventListener("WME_OUT", param2.onHoverOut);
        this._container.addEventListener("WME_CLICK_AWAY", param2.onClickAway);
        this._container.mouseThreshold = 0;
    }

    private static easeInOutCubic(param1: number, param2: number, param3: number, param4: number): number {
        let _loc5_: number = param1 / param4;
        let _loc6_: number = -(_loc5_ * 1.75 - 0.7) * (_loc5_ * 1.75 - 0.7) + 1;
        return param2 + param3 * _loc6_;
    }

    public reuse(param1: TableCell): void {
        this._SafeStr_2192 = param1;
        this.initializeView();
    }

    public update(param1: TableCell): void {
        this._SafeStr_2192 = param1;
        let _loc2_: ITextFieldWindow = this.getInputElement(false);
        if (_loc2_ != null && Boolean(_loc2_.visible)) {
            this.updateContents();
        } else {
            this.initializeView();
            if (param1.highlightOnChange) {
                this.highlight();
            }
        }
    }

    private setAllInvisible(): void {
        let _loc3_: ITextWindow = this.getTextElement(false);
        let _loc4_: ITextFieldWindow = this.getInputElement(false);
        let _loc2_: IRegionWindow = this.getLinkRegion(false);
        let _loc1_: IRegionWindow = this.getExtraButtonRegion(false);
        this.turnInvisible(_loc3_);
        this.turnInvisible(_loc4_);
        this.turnInvisible(_loc2_);
        this.turnInvisible(_loc1_);
    }

    private turnInvisible(param1: IWindow): void {
        if (param1 != null) {
            param1.visible = false;
        }
    }

    private onLinkClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2192 != null && this._SafeStr_2192.linkClickCallback != null) {
            this._SafeStr_2192.linkClickCallback();
        }
    };

    private onExtraButtonClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2192 != null && this._SafeStr_2192.extraBtnCallback != null) {
            this._SafeStr_2192.extraBtnCallback();
        }
    };

    private initializeView(): void {
        this.setAllInvisible();
        if (this._SafeStr_2192.type == TableCell._SafeStr_3709) {
            this.getLinkRegion(true).visible = true;
        } else if (this._SafeStr_2192.type == TableCell._SafeStr_2166) {
            this.getTextElement(true).visible = true;
        }
        this.updateContents();
    }

    private updateContents(): void {
        let _loc3_: ITextWindow = null;
        if (this._SafeStr_2192.type == TableCell._SafeStr_3709) {
            this.getLinkElement(true).text = asGuarded(this._SafeStr_2192.contents, isString);
        } else if (this._SafeStr_2192.type == TableCell._SafeStr_2166) {
            _loc3_ = this.getTextElement(true);
            _loc3_.textColor = this._SafeStr_2192.textColor >>> 0;
            _loc3_.autoSize = this.column.alignment;
            _loc3_.text = asGuarded(this._SafeStr_2192.contents, isString);
        }
        let _loc2_: string = "";
        if (this._SafeStr_2192.tooltipText != null) {
            _loc2_ = this._SafeStr_2192.tooltipText;
        } else if (this._SafeStr_2192.type == TableCell._SafeStr_2166 && _loc3_ != null && _loc3_.isOverflown) {
            _loc2_ = asGuarded(this._SafeStr_2192.contents, isString);
        }
        this._container.toolTipCaption = _loc2_;
        let _loc1_: IRegionWindow = this.getExtraButtonRegion(false);
        if (this._SafeStr_2192.extraBtn != null) {
            _loc1_ = this.getExtraButtonRegion(true);
            _loc1_.visible = true;
            this.getExtraButton(true).assetUri = this._SafeStr_2192.extraBtn;
            _loc1_.interactiveCursorDisabled = this._SafeStr_2192.extraBtnCallback == null;
        } else if (_loc1_ != null) {
            _loc1_.visible = false;
        }
    }

    private get column(): TableColumn {
        return this._SafeStr_2737.getColumnById(this._SafeStr_3906);
    }

    public updateWidth(): void {
        this._container.width = this._SafeStr_2737.getCellWidth(this._SafeStr_3906);
    }

    public get container(): IWindowContainer {
        return this._container;
    }

    private onInputEdit = (param1: WindowEvent): void => {
        let _loc2_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: ITextFieldWindow = this.getInputElement(false);
        if (_loc2_.keyCode == 13 && this._SafeStr_2192.isEditable) {
            this._SafeStr_2737.onEnterNewCellValue(_loc3_.text, this._SafeStr_3133.object, this._SafeStr_3906);
            this.initializeView();
        } else if (_loc2_.keyCode == 27) {
            this.initializeView();
        }
    };

    private onInputFocusOut = (param1: WindowEvent): void => {
        this.initializeView();
    };

    private onDoubleClick = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextFieldWindow = null;
        if (this._SafeStr_2192.isInspectable || this._SafeStr_2192.isEditable) {
            this.setAllInvisible();
            _loc2_ = this.getInputElement(true);
            _loc2_.visible = true;
            _loc2_.text = this._SafeStr_2192.textFieldValue;
            _loc2_.editable = this._SafeStr_2192.isEditable;
            _loc2_.focus();
        }
    };

    public recycle(): void {
        this._SafeStr_2192 = null;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._container.dispose();
        this._SafeStr_3906 = null;
        this._SafeStr_2737 = null;
        this._container = null;
        this._SafeStr_2192 = null;
        this._disposed = true;
        if (this._transitionTimer != null) {
            this._transitionTimer.reset();
            this._transitionTimer = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private getTextElement(param1: boolean): ITextWindow {
        let _loc2_: ITextWindow = asGuarded(this._container.findChildByName("element_text"), isITextWindow);
        if (_loc2_ == null && param1) {
            return asGuarded(this.template.createElementText(this._container), isITextWindow);
        }
        return _loc2_;
    }

    private getInputElement(param1: boolean): ITextFieldWindow {
        let _loc3_: ITextFieldWindow = null;
        let _loc2_: ITextFieldWindow = asGuarded(this._container.findChildByName("element_input"), isITextFieldWindow);
        if (_loc2_ == null && param1) {
            _loc3_ = asGuarded(this.template.createElementInput(this._container), isITextFieldWindow);
            _loc3_.addEventListener("WKE_KEY_DOWN", this.onInputEdit);
            _loc3_.addEventListener("WKE_KEY_UP", this.onInputEdit);
            _loc3_.addEventListener("WE_UNFOCUS", this.onInputFocusOut);
            _loc3_.addEventListener("WME_CLICK_AWAY", this._SafeStr_3133.onClickAway);
            return _loc3_;
        }
        return _loc2_;
    }

    private getLinkRegion(param1: boolean): IRegionWindow {
        let _loc3_: IRegionWindow = null;
        let _loc2_: IRegionWindow = asGuarded(this._container.findChildByName("link_container"), isIRegionWindow);
        if (_loc2_ == null && param1) {
            _loc3_ = asGuarded(this.template.createLinkContainer(this._container), isIRegionWindow);
            _loc3_.addEventListener("WME_DOWN", this._SafeStr_3133.onDown);
            _loc3_.addEventListener("WME_OVER", this._SafeStr_3133.onHoverOver);
            _loc3_.addEventListener("WME_OUT", this._SafeStr_3133.onHoverOut);
            _loc3_.addEventListener("WME_CLICK_AWAY", this._SafeStr_3133.onClickAway);
            _loc3_.addEventListener("WME_CLICK", this.onLinkClick);
            _loc3_.mouseThreshold = 0;
            return _loc3_;
        }
        return _loc2_;
    }

    private getLinkElement(param1: boolean): ITextWindow {
        let _loc2_: IRegionWindow = this.getLinkRegion(param1);
        if (_loc2_ == null) {
            return null;
        }
        return asGuarded(_loc2_.findChildByName("element_link"), isITextWindow);
    }

    private getHighlightBorder(param1: boolean): IBorderWindow {
        let _loc2_: IBorderWindow = asGuarded(this._container.findChildByName("highlight_border"), isIBorderWindow);
        if (_loc2_ == null && param1) {
            return asGuarded(this.template.createHighlightBorder(this._container), isIBorderWindow);
        }
        return _loc2_;
    }

    private getExtraButtonRegion(param1: boolean): IRegionWindow {
        let _loc3_: IRegionWindow = null;
        let _loc2_: IRegionWindow = asGuarded(this._container.findChildByName("extra_button"), isIRegionWindow);
        if (_loc2_ == null && param1) {
            _loc3_ = asGuarded(this.template.createExtraButton(this._container), isIRegionWindow);
            _loc3_.addEventListener("WME_CLICK", this.onExtraButtonClick);
            _loc3_.addEventListener("WME_OVER", this._SafeStr_3133.onHoverOver);
            _loc3_.addEventListener("WME_OUT", this._SafeStr_3133.onHoverOut);
            return _loc3_;
        }
        return _loc2_;
    }

    private getExtraButton(param1: boolean): IStaticBitmapWrapperWindow {
        let _loc2_: IRegionWindow = this.getExtraButtonRegion(param1);
        if (_loc2_ == null) {
            return null;
        }
        return asGuarded(_loc2_.findChildByName("extra_button_bitmap"), isIStaticBitmapWrapperWindow);
    }

    private get template(): CellTemplate {
        return this._SafeStr_2737.cellTemplate;
    }

    private highlight(): void {
        let highlightBorder: IBorderWindow;
        let transitionDuration: number = NaN;
        let delay: number = 0;
        let steps: number = 0;
        let minValue: number = NaN;
        let maxValue: number = NaN;
        let updateValue: any = (param1: TimerEvent): void => {
             let _loc2_: number = TableCellView.easeInOutCubic(this._transitionTimer.currentCount, minValue, maxValue - minValue, steps);
             highlightBorder.blend = _loc2_;
         };
        let onTimerComplete: any = (param1: TimerEvent): void => {
             highlightBorder.visible = false;
         };
        if (this._transitionTimer != null && this._transitionTimer.running) {
            return;
        }
        highlightBorder = this.getHighlightBorder(true);
        transitionDuration = 500;
        delay = 16;
        steps = transitionDuration / delay | 0;
        minValue = 0;
        maxValue = 0.35;
        highlightBorder.visible = true;
        highlightBorder.blend = 0;
        if (this._transitionTimer != null) {
            this._transitionTimer.reset();
        } else {
            this._transitionTimer = new Timer(delay, steps);
            this._transitionTimer.addEventListener("timer", updateValue);
            this._transitionTimer.addEventListener("timerComplete", onTimerComplete);
        }
        this._transitionTimer.start();
    }

    get [IDisposable](): true {
        return true;
    }
}
