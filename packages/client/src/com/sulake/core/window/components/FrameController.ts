import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ICloseButtonWindow } from '@/com/sulake/core/window/components/ICloseButtonWindow';
import type { IHeaderWindow } from '@/com/sulake/core/window/components/IHeaderWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IScalerWindow } from '@/com/sulake/core/window/components/IScalerWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { ContainerController, WindowController } from '@/com/sulake/core/window/Classes.group';
import { isICloseButtonWindow } from '@/com/sulake/core/window/components/ICloseButtonWindow';
import { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIHeaderWindow } from '@/com/sulake/core/window/components/IHeaderWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIScalerWindow } from '@/com/sulake/core/window/components/IScalerWindow';
import { ContainerIterator } from '@/com/sulake/core/window/iterators/ContainerIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { TextMargins } from '@/com/sulake/core/window/utils/TextMargins';

export class FrameController extends ContainerController implements IFrameWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::FrameController'); }

    private static readonly TAG_TITLE_ELEMENT: string = "_TITLE";
    private static readonly TAG_HEADER_ELEMENT: string = "_HEADER";
    private static readonly TAG_CONTENT_ELEMENT: string = "_CONTENT";
    private static readonly TAG_SCALER_ELEMENT: string = "_SCALER";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 1;
        param4 = (param4 & ~0x10) >>> 0;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_3794 = true;
        this.activate();
        this.setupScaling();
        let _loc12_: IWindow = this.findChildByName("header_button_help");
        if (_loc12_ != null) {
            _loc12_.procedure = this.helpButtonProcedure;
        }
        this.helpPage = this._helpPage;
        this.menuButtonVisible = false;
    }

    declare private _title: ILabelWindow;

    declare private _margins: IMargins;

    declare private _SafeStr_3794: boolean;

    declare private _helpPage: string;

    declare private _helpButtonAction: (...args: any[]) => any;

    public override set caption(param1: string) {
        super.caption = param1;
        try {
            this.title.text = param1;
        } catch (e) {
        }
    }

    public override set color(param1: number) {
        super.color = param1;
        let _loc2_: any[] = [];
        this.groupChildrenWithTag("_COLORIZE", _loc2_);
        for (const _loc3_ of _loc2_ ?? []) {
            _loc3_.color = param1;
        }
    }

    public override get iterator(): IIterator {
        return this.content != null && this._SafeStr_3794 ? this.content.iterator : new ContainerIterator(this);
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        let _loc2_: any = this._margins != null;
        _loc1_.push(new PropertyStruct("help_page", this._helpPage, "String", this._helpPage != ""));
        _loc1_.push(new PropertyStruct("margin_left", this.content.left, "int", _loc2_));
        _loc1_.push(new PropertyStruct("margin_top", this.content.top, "int", _loc2_));
        _loc1_.push(new PropertyStruct("margin_right", this._SafeStr_2132 - this.content.right, "int", _loc2_));
        _loc1_.push(new PropertyStruct("margin_bottom", this._height - this.content.bottom, "int", _loc2_));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "help_page":
                    this.helpPage = typeof _loc2_.value === "string" ? _loc2_.value : null;
                    break;
                case "margin_left":
                    this.margins.left = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    break;
                case "margin_top":
                    this.margins.top = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    break;
                case "margin_right":
                    this.margins.right = this._SafeStr_2132 - (typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null);
                    break;
                case "margin_bottom":
                    this.margins.bottom = this._height - (typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null);
            }
        }
        super.properties = param1;
    }

    declare private _header: IHeaderWindow;

    public get header(): IHeaderWindow {
        return this._header ? this._header : (this._header = castGuarded(this.findChildByTag("_HEADER"), isIHeaderWindow, "com.sulake.core.window.components.IHeaderWindow"));
    }

    declare private _content: IWindowContainer;

    public get content(): IWindowContainer {
        return this._content ? this._content : (this._content = castGuarded(this.findChildByTag("_CONTENT"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
    }

    public get title(): ILabelWindow {
        return this._title ? this._title : (this._title = castGuarded(this.findChildByTag("_TITLE"), isILabelWindow, "com.sulake.core.window.components.ILabelWindow"));
    }

    public get scaler(): IScalerWindow {
        return asGuarded(this.findChildByTag("_SCALER"), isIScalerWindow);
    }

    public get margins(): IMargins {
        if (!this._margins) {
            this._margins = new TextMargins(this.content.left, this.content.top, this.content.right, this.content.bottom, this.marginsCallback);
        }
        return this._margins;
    }

    public set helpButtonAction(param1: (...args: any[]) => any) {
        this._helpButtonAction = param1;
    }

    public get helpPage(): string {
        return this._helpPage;
    }

    public set helpPage(param1: string) {
        this._helpPage = param1;
        let _loc2_: IWindow = this.findChildByName("header_button_help");
        if (_loc2_ != null) {
            _loc2_.visible = this._helpPage != "";
        }
    }

    public get menuButton(): ICloseButtonWindow {
        return asGuarded(this.findChildByName("header_button_menu"), isICloseButtonWindow);
    }

    public get menuButtonVisible(): boolean {
        let _loc1_: ICloseButtonWindow = this.menuButton;
        return _loc1_ != null && Boolean(_loc1_.visible);
    }

    public set menuButtonVisible(param1: boolean) {
        let _loc2_: ICloseButtonWindow = this.menuButton;
        if (_loc2_ != null) {
            _loc2_.visible = param1;
        }
    }

    public override buildFromXML(param1: XML, param2: UtilsMap = null): boolean {
        return this.context.getWindowParser().parseAndConstruct(param1, this.content, param2) != null;
    }

    public override setParamFlag(param1: number, param2: boolean = true): void {
        super.setParamFlag(param1, param2);
        this.setupScaling();
    }

    public resizeToFitContent(): void {
        WindowController.resizeToAccommodateChildren(asInstanceOf(this.content, WindowController));
    }

    private helpButtonProcedure(param1: WindowEvent, param2: IWindow): void {
        if (param1.type == "WME_CLICK" && this._helpPage != "" && this._helpButtonAction != null) {
            this._helpButtonAction(this._helpPage);
        }
    }

    private setupScaling(): void {
        let _loc1_: IWindow = this.scaler;
        let _loc2_: boolean = this.testParamFlag(65536);
        let _loc3_: boolean = this.testParamFlag(8192);
        let _loc4_: boolean = this.testParamFlag(4096);
        if (_loc1_) {
            if (_loc3_ || _loc2_) {
                _loc1_.setParamFlag(8192, true);
            } else {
                _loc1_.setParamFlag(8192, false);
            }
            if (_loc4_ || _loc2_) {
                _loc1_.setParamFlag(4096, true);
            } else {
                _loc1_.setParamFlag(4096, false);
            }
            _loc1_.visible = _loc3_ || _loc4_ || _loc2_;
        }
    }

    private marginsCallback(param1: IMargins): void {
        let _loc2_: IWindow = this.content;
        let _loc4_: number = _loc2_.param;
        let _loc5_: number = (_loc2_.param & (0xC0 | 0x0C00)) >>> 0;
        if (_loc5_) {
            _loc2_.setParamFlag((0xC0 | 0x0C00) >>> 0, false);
        }
        let _loc3_: number = (_loc2_.param & 0xC00000) >>> 0;
        if (_loc3_) {
            _loc2_.setParamFlag(12582912, false);
        }
        _loc2_.rectangle = new Rectangle(param1.left, param1.top, param1.right - param1.left, param1.bottom - param1.top);
        if (_loc5_ || _loc3_) {
            _loc2_.setParamFlag(4294967295, false);
            _loc2_.setParamFlag(_loc4_, true);
        }
    }

    protected override initInstanceFields(): void {
        this.helpButtonProcedure = this.helpButtonProcedure.bind(this);
        this.marginsCallback = this.marginsCallback.bind(this);
        this._SafeStr_3794 = false;
        this._helpPage = "";
        this._helpButtonAction = null;
        super.initInstanceFields();
    }

    public override get caption(): string {
        return super.caption;
    }

    public override get color(): number {
        return super.color;
    }

    get [IFrameWindow](): true {
        return true;
    }
}
