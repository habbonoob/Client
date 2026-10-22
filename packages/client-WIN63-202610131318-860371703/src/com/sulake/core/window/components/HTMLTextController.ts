import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { TextEvent } from '@habbo-pixi/runtime/events/TextEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { InteractiveController, TextFieldController } from '@/com/sulake/core/window/Classes.group';
import { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { WindowLinkEvent } from '@/com/sulake/core/window/events/WindowLinkEvent';
import { PropertyKeys } from '@/com/sulake/core/window/theme/PropertyKeys';

export class HTMLTextController extends TextFieldController implements IHTMLTextWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::HTMLTextController'); }

    static #staticsReady = false;

    private static get HTML_STYLESHEET_KEY(): string {
        HTMLTextController.#initStatics();
        return HTMLTextController.HTML_STYLESHEET_KEY;
    }

    private static get _defaultLinkTarget(): string {
        HTMLTextController.#initStatics();
        return HTMLTextController._defaultLinkTarget;
    }
    private static set _defaultLinkTarget(value: string) {
        HTMLTextController.#initStatics();
        HTMLTextController._defaultLinkTarget = value;
    }

    declare private _SafeStr_4056: string;

    declare private _htmlStyleSheetString: string;

    declare private _styleSheet: StyleSheet;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this.immediateClickMode = true;
        if ("allowedDomains" in this._field) {
            this._field["allowedDomains"] = ["images.habbo.com", "www.habbo.com", "www.habbo.com.br", "www.habbo.fi", "www.habbo.fr", "www.habbo.de", "www.habbo.nl", "www.habbo.es", "www.habbo.it", "www.habbo.com.tr", "sandbox.habbo.com", "duke.varoke.net", "s1.varoke.net", "d63.varoke.net", "dev.varoke.net"];
        }
        this._field.type = "dynamic";
        this._field.mouseEnabled = true;
        this._field.selectable = false;
        this._field.mouseWheelEnabled = true;
    }

    public static set defaultLinkTarget(param1: string) {
        HTMLTextController._defaultLinkTarget = param1;
    }

    public static get defaultLinkTarget(): string {
        return HTMLTextController._defaultLinkTarget;
    }

    private static setHtmlStyleSheetString(param1: HTMLTextController, param2: string): void {
        let _loc3_: StyleSheet = null;
        if (param1 == null) {
            return;
        }
        if (param1._htmlStyleSheetString == param2) {
            return;
        }
        param1._htmlStyleSheetString = param2;
        param1._styleSheet = null;
        if (param1._htmlStyleSheetString != null) {
            _loc3_ = new StyleSheet();
            _loc3_.parseCSS(param1._htmlStyleSheetString);
            param1._styleSheet = _loc3_;
        }
    }

    private static convertLinksToEvents(param1: string): string {
        let _loc2_: RegExp = null;
        _loc2_ = /<a[^>]+(http:\/\/[^"']+)['"][^>]*>(.*)<\/a>/gi;
        param1 = param1.replace(_loc2_, "<a href=\'event:$1\'>$2</a>");
        _loc2_ = /<a[^>]+(https:\/\/[^"']+)['"][^>]*>(.*)<\/a>/gi;
        return param1.replace(_loc2_, "<a href=\'event:$1\'>$2</a>");
    }

    private static openWebPage(param1: string, param2: string): void {
        let _loc5_: string = null;
        let _loc3_: any = undefined;
        let _loc4_: URLRequest = null;
        if (param2 == null) {
            param2 = HTMLTextController._defaultLinkTarget;
        }
        if (ExternalInterface.available) {
            try {
                _loc5_ = String(ExternalInterface.call("function() { return navigator.userAgent; }")).toLowerCase();
            } catch (e) {
                _loc5_ = "";
            }
            if (_loc5_.indexOf("safari") > -1 || _loc5_.indexOf("chrome") > -1 || _loc5_.indexOf("firefox") > -1 || _loc5_.indexOf("msie") > -1 && Number(_loc5_.substr(_loc5_.indexOf("msie") + 5, 3)) >>> 0 >= 7) {
                try {
                    _loc3_ = ExternalInterface.call("function() {var win = window.open(\'" + param1 + "\', \'" + param2 + "\'); if (win) { win.focus();} return true; }");
                } catch (e) {
                }
                if (_loc3_) {
                    return;
                }
            }
            _loc4_ = new URLRequest(param1);
            navigateToURL(_loc4_, param2);
        }
    }

    public set linkTarget(param1: string) {
        if (PropertyKeys.HTML_LINK_TARGET_RANGE.indexOf(param1) > -1) {
            this._SafeStr_4056 = param1;
        }
    }

    public get linkTarget(): string {
        return this._SafeStr_4056 == "default" ? HTMLTextController.defaultLinkTarget : this._SafeStr_4056;
    }

    public get htmlStyleSheetString(): string {
        return this._htmlStyleSheetString;
    }

    public set htmlStyleSheetString(param1: string) {
        HTMLTextController.setHtmlStyleSheetString(this, param1);
    }

    public override set immediateClickMode(param1: boolean) {
        if (param1 == this._immediateClickMode || this._field == null) {
            return;
        }
        super.immediateClickMode = param1;
        if (this._immediateClickMode) {
            this._field.addEventListener("link", this.immediateClickHandler);
        } else {
            this._field.removeEventListener("link", this.immediateClickHandler);
        }
    }

    public override set text(param1: string) {
        if (param1 == null) {
            return;
        }
        if (this._localized) {
            this.context.removeLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = false;
        }
        this._caption = param1;
        if (this._caption.charAt(0) == "$" && this._caption.charAt(1) == "{") {
            this.context.registerLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = true;
        } else if (this._field != null) {
            this._field.htmlText = HTMLTextController.convertLinksToEvents(this._caption);
            this.refreshTextImage();
        }
    }

    public override set localization(param1: string) {
        if (param1 != null && this._field != null) {
            this._field.htmlText = this.limitStringLength(HTMLTextController.convertLinksToEvents(param1));
            this.refreshTextImage();
        }
    }

    public override set htmlText(param1: string) {
        if (param1 == null) {
            return;
        }
        if (this._localized) {
            this.context.removeLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = false;
        }
        this._caption = param1;
        if (this._caption.charAt(0) == "$" && this._caption.charAt(1) == "{") {
            this.context.registerLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = true;
        } else if (this._field != null) {
            this._field.htmlText = HTMLTextController.convertLinksToEvents(this._caption);
            this._field.styleSheet = this._styleSheet;
            this.refreshTextImage();
        }
    }

    protected override immediateClickHandler(param1: Event): void {
        let _loc4_: WindowLinkEvent = null;
        let _loc2_: boolean = false;
        if (param1 instanceof TextEvent) {
            _loc4_ = asInstanceOf(WindowLinkEvent.allocate_WindowLinkEvent(castTo(param1, TextEvent).text, this, null), WindowLinkEvent);
            if (this._events) {
                this._events.dispatchEvent(_loc4_);
            }
            _loc2_ = false;
            for (const _loc3_ of this._context.linkEventTrackers ?? []) {
                if (_loc3_.linkPattern.length > 0) {
                    if (_loc4_.link.substr(0, _loc3_.linkPattern.length) == _loc3_.linkPattern) {
                        _loc3_.linkReceived(_loc4_.link);
                        _loc2_ = true;
                    }
                } else {
                    _loc3_.linkReceived(_loc4_.link);
                }
            }
            if (!_loc4_.isWindowOperationPrevented()) {
                if (this.procedure != null) {
                    this.procedure(_loc4_, this);
                }
            }
            if (!_loc2_ && !_loc4_.isWindowOperationPrevented() && this.linkTarget != "internal") {
                HTMLTextController.openWebPage(castTo(param1, TextEvent).text, this.linkTarget);
            }
            param1.stopImmediatePropagation();
            _loc4_.recycle();
        } else {
            super.immediateClickHandler(param1);
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = InteractiveController.writeInteractiveWindowProperties(this, super.properties);
        _loc1_.push(this.createProperty("editable", this._field.type == "input"));
        _loc1_.push(this.createProperty("focus_capturer", this._SafeStr_4217));
        _loc1_.push(this.createProperty("selectable", this._field.selectable));
        _loc1_.push(this.createProperty("display_as_password", this._field.displayAsPassword));
        _loc1_.push(this.createProperty("display_raw", this._displayRaw));
        _loc1_.push(this.createProperty("link_target", this._SafeStr_4056));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "link_target":
                    this._SafeStr_4056 = typeof _loc2_.value === "string" ? _loc2_.value : null;
                    break;
                case "html_stylesheet":
                    this.htmlStyleSheetString = typeof _loc2_.value === "string" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    public initializeLinkStyle(): void {
        let _loc5_: StyleSheet = new StyleSheet();
        let _loc1_: any = {};
        _loc1_.color = "#0051a4";
        let _loc2_: any = {};
        _loc2_.textDecoration = "underline";
        _loc2_.color = "#006de0";
        let _loc4_: any = {};
        _loc4_.color = "#0053ad";
        let _loc3_: any = {};
        _loc3_.textDecoration = "underline";
        _loc5_.setStyle("a:link", _loc2_);
        _loc5_.setStyle("a:hover", _loc1_);
        _loc5_.setStyle("a:active", _loc4_);
        _loc5_.setStyle(".visited", _loc3_);
        this.styleSheet = _loc5_;
    }

    public override dispose(): void {
    }

    protected override initInstanceFields(): void {
        this._SafeStr_4056 = "default";
        this._htmlStyleSheetString = null;
        this._styleSheet = null;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HTMLTextController.#staticsReady) return;
        HTMLTextController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HTMLTextController, name, { value, writable: true, configurable: true, enumerable: true });
        set("HTML_STYLESHEET_KEY", null);
        set("_defaultLinkTarget", null);
        set("HTML_STYLESHEET_KEY", "html_stylesheet");
        set("_defaultLinkTarget", "default");
    }

    public override get immediateClickMode(): boolean {
        return super.immediateClickMode;
    }

    public override get text(): string {
        return super.text;
    }

    public override get htmlText(): string {
        return super.htmlText;
    }

    get [IHTMLTextWindow](): true {
        return true;
    }
}
