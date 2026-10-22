import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { HabboPhoneNumber } from '@/com/sulake/habbo/phonenumber/HabboPhoneNumber';
import { JSONDecoder } from '@habbo-pixi/runtime/json/JSONDecoder';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextWindowUtils } from '@/com/sulake/habbo/utils/TextWindowUtils';

export class PhoneNumberCollectView {
    static { registerClassName(this, 'com.sulake.habbo.phonenumber::PhoneNumberCollectView'); }

    private static readonly INPUT_MAX_CHARS: number = 30;
    private static readonly ALL_COUNTRY_CODES: any[] = ["VU", "EC", "VN", "VI", "DZ", "VG", "VE", "DM", "VC", "DO", "VA", "DE", "UZ", "UY", "DK", "DJ", "US", "UG", "UA", "ET", "ES", "ER", "EH", "EG", "EE", "TZ", "TT", "TW", "TV", "GD", "GE", "GF", "GA", "GB", "FR", "FO", "FK", "FJ", "FM", "FI", "WS", "GY", "GW", "GU", "GT", "GR", "GQ", "WF", "GP", "GN", "GM", "GL", "GI", "GH", "GG", "RE", "RO", "AT", "AS", "AR", "QA", "AW", "AU", "AZ", "BA", "PT", "AC", "AD", "PW", "AG", "AE", "PR", "PS", "AF", "AL", "AI", "AO", "PY", "AM", "BW", "TG", "BY", "TD", "TK", "BS", "TJ", "BR", "BT", "TH", "TO", "TN", "TM", "TL", "CA", "BZ", "TR", "BF", "SV", "BG", "BH", "SS", "BI", "ST", "SY", "BB", "SZ", "BD", "BE", "SX", "BN", "BO", "BQ", "BJ", "TC", "BL", "TA", "BM", "CZ", "SD", "CY", "SC", "CX", "CW", "SE", "SH", "CV", "SG", "CU", "SJ", "SI", "SL", "SK", "SN", "SM", "SO", "SR", "CI", "RS", "CG", "CH", "RU", "RW", "CF", "CC", "CD", "CR", "CO", "CM", "CN", "SA", "CK", "SB", "CL", "LV", "LU", "LT", "LY", "LS", "LR", "MG", "MH", "ME", "MF", "MK", "ML", "MC", "MD", "MA", "MV", "MU", "MX", "MW", "MZ", "MY", "MN", "MM", "MP", "MO", "MR", "MQ", "MT", "MS", "NF", "NG", "NI", "NL", "NA", "NC", "NE", "NZ", "NU", "NR", "NP", "NO", "OM", "PL", "PM", "PH", "PK", "PE", "PF", "PG", "PA", "HK", "ZA", "HN", "HR", "HT", "HU", "ZM", "ZW", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "YE", "IS", "IT", "JE", "YT", "JP", "JO", "JM", "KI", "KH", "KG", "KE", "KP", "KR", "KM", "KN", "KW", "KY", "KZ", "LA", "LC", "LB", "LI", "LK"];

    declare private _component: HabboPhoneNumber;

    declare private _window: IFrameWindow;

    private _inputTextNeedsClearing: boolean = true;

    declare private _locales: any[];

    constructor(param1: HabboPhoneNumber, param2: any[]) {
        this._component = param1;
        this.createWindow(param2);
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._component = null;
    }

    public handleSubmitFailure(param1: number): void {
        this._window.findChildByName("phone_number_input").caption = "";
        this._inputTextNeedsClearing = true;
        this.setInputStates(true);
    }

    private createWindow(param1: any[]): void {
        let _loc5_: string = null;
        let _loc9_: string = null;
        let _loc7_: number = 0;
        let _loc4_: string = null;
        if (this._window) {
            return;
        }
        this._window = castGuarded(this._component.windowManager.buildFromXML(XML.from(this._component.assets.getAssetByName("phonenumber_collect_xml").content)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.center();
        this._window.findChildByName("never_link").procedure = this.onInput;
        this._window.findChildByName("skip_link").procedure = this.onInput;
        this._window.findChildByName("ok_button").procedure = this.onInput;
        this._window.findChildByName("header_button_close").procedure = this.onInput;
        this._window.findChildByName("phone_number_input").procedure = this.onInput;
        castGuarded(this._window.findChildByName("phone_number_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").maxChars = 30;
        let _loc6_: string = this._component.localizationManager.getLocalization("phone.number.collect.countries") || "{}";
        let _loc3_: any = new JSONDecoder(_loc6_, false).getValue();
        let _loc8_: any[] = PhoneNumberCollectView.ALL_COUNTRY_CODES.concat();
        this._locales = [];
        for (_loc5_ of _loc8_ ?? []) {
            _loc9_ = stringOrNull(_loc3_[_loc5_]);
            if (_loc9_ != null && _loc9_.length > 0) {
                this._locales.push({ "code": _loc5_, "name": _loc9_ });
            }
        }
        this._locales.sort((a, b) => (String(a.name) < String(b.name) ? -1 : String(a.name) > String(b.name) ? 1 : 0));
        _loc7_ = param1.length - 1;
        while (_loc7_ >= 0) {
            _loc5_ = stringOrNull(param1[_loc7_]);
            if (PhoneNumberCollectView.ALL_COUNTRY_CODES.indexOf(_loc5_) != -1) {
                _loc4_ = stringOrNull(_loc3_[_loc5_]);
                this._locales.unshift({ "code": _loc5_, "name": _loc4_ });
            }
            _loc7_--;
        }
        let _loc10_: IDropListWindow = castGuarded(this._window.findChildByName("country_list"), isIDropListWindow, "com.sulake.core.window.components.IDropListWindow");
        for (const _loc2_ of this._locales ?? []) {
            _loc10_.addMenuItem(this.createCountrySelectorMenuItem(stringOrNull(_loc2_.code), stringOrNull(_loc2_.name)));
        }
        if (_loc10_.numMenuItems > 0) {
            _loc10_.selection = 0;
        }
        TextWindowUtils.setHTMLLinkStyle(asGuarded(this._window.findChildByName("collect_summary"), isITextWindow), 3369621, 16777215, 4306905);
        this._window.findChildByName("ok_button").disable();
        this.setInputStates(true);
    }

    private createCountrySelectorMenuItem(param1: string, param2: string): IWindow {
        let _loc3_: IWindowContainer = castGuarded(this._component.windowManager.buildFromXML(XML.from(this._component.assets.getAssetByName("phonenumber_country_menu_item_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.name = param1;
        _loc3_.findChildByName("country_code").caption = param2;
        return _loc3_;
    }

    private get selectedCountryCode(): string {
        let _loc2_: IDropListWindow = castGuarded(this._window.findChildByName("country_list"), isIDropListWindow, "com.sulake.core.window.components.IDropListWindow");
        if (_loc2_.selection == -1) {
            return "NOT_SELECTED";
        }
        let _loc1_: any = this._locales[_loc2_.selection];
        return stringOrNull(_loc1_ != null ? _loc1_.code : "--");
    }

    private onNeverAgainConfirmClose = (param1: IConfirmDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK" && this._component) {
            this._component.setNeverAgain();
        }
        param1.dispose();
    };

    private setInputStates(param1: boolean): void {
        this._window.findChildByName("ok_button").disable();
        if (param1) {
            this._window.findChildByName("phone_number_input").enable();
            this._window.findChildByName("never_link").visible = true;
            this._window.findChildByName("skip_link").visible = true;
            this._window.findChildByName("header_button_close").enable();
            this._window.findChildByName("country_list").enable();
        } else {
            this._window.findChildByName("phone_number_input").disable();
            this._window.findChildByName("never_link").visible = false;
            this._window.findChildByName("skip_link").visible = false;
            this._window.findChildByName("header_button_close").disable();
            this._window.findChildByName("country_list").disable();
        }
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_DOWN") {
            switch (param2.name) {
                case "header_button_close":
                case "skip_link":
                    this._component.setCollectViewMinimized(true);
                    break;
                case "never_link":
                    this._component.windowManager.confirm("${phone.number.never.again.confirm.title}", "${phone.number.never.again.confirm.text}", 0, this.onNeverAgainConfirmClose);
                    break;
                case "ok_button":
                    this._component.sendTryPhoneNumber(this.selectedCountryCode, this._window.findChildByName("phone_number_input").caption);
                    this.setInputStates(false);
                    break;
                case "phone_number_input":
                    if (this._inputTextNeedsClearing) {
                        this._window.findChildByName("phone_number_input").caption = "";
                        this._inputTextNeedsClearing = false;
                    }
                    castGuarded(this._window.findChildByName("phone_number_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").textColor = 0;
            }
        }
        if (param1.type == "WKE_KEY_UP" && param1.target.name == "phone_number_input") {
            if (this._window.findChildByName("phone_number_input").caption != null && this._window.findChildByName("phone_number_input").caption.length > 0) {
                this._window.findChildByName("ok_button").enable();
            } else {
                this._window.findChildByName("ok_button").disable();
            }
        }
    };
}
