import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MySanctionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/MySanctionStatusMessageEvent';
import type { MySanctionStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/MySanctionStatusMessageParser';
import type { SanctionDTO } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/SanctionDTO';
import type { SanctionType } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/SanctionType';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class SanctionInfo implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::SanctionInfo'); }

    private _disposed: boolean = false;

    declare private _window: IWindowContainer;

    declare private _habboHelp: HabboHelp;

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public openWindow(param1: MySanctionStatusMessageEvent): void {
        let _loc10_: ITextWindow = null;
        let _loc5_: number = 0;
        let _loc2_: ITextWindow = null;
        let _loc7_: string = null;
        let _loc4_: IWindow = null;
        this.dispose();
        this._disposed = false;
        this._window = asGuarded(this._habboHelp.getXmlWindow("sanction_info"), isIWindowContainer);
        this._window.center();
        this._window.procedure = this.windowEventHandler;
        let _loc3_: MySanctionStatusMessageParser = param1 ? param1.getParser() : null;
        let _loc8_: IItemListWindow = asGuarded(this._window.findChildByName("main_contents_list"), isIItemListWindow);
        let _loc6_: ITextWindow = asGuarded(this._window.findChildByName("sanction_info"), isITextWindow);
        let _loc11_: IWindow = this._window.findChildByName("divider");
        if (!_loc8_ || !_loc6_) {
            return;
        }
        let _loc9_: any[] = this.buildSanctionDescriptions(_loc3_ ? _loc3_.sanctions : null);
        _loc8_.removeListItems();
        if (_loc9_.length == 0) {
            _loc10_ = castGuarded(_loc6_.clone(), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc10_.caption = this._habboHelp.localization.getLocalization("settings.help.sanction_information.description");
            _loc10_.height = _loc10_.textHeight + 10 | 0;
            _loc8_.addListItem(_loc10_);
        } else {
            _loc5_ = 0;
            while (_loc5_ < _loc9_.length) {
                _loc2_ = castGuarded(_loc6_.clone(), isITextWindow, "com.sulake.core.window.components.ITextWindow");
                _loc7_ = stringOrNull(_loc9_[_loc5_]);
                if (_loc5_ > 0) {
                    _loc7_ = "\n" + _loc7_ + "\n";
                }
                if (_loc5_ < _loc9_.length - 1) {
                    _loc7_ += "\n";
                }
                _loc2_.caption = _loc7_;
                _loc2_.height = _loc2_.textHeight + 10 | 0;
                _loc8_.addListItem(_loc2_);
                if (_loc5_ < _loc9_.length - 1 && _loc11_) {
                    _loc4_ = _loc11_.clone();
                    _loc8_.addListItem(_loc4_);
                }
                _loc5_++;
            }
        }
        _loc8_.arrangeListItems();
    }

    private buildSanctionDescriptions(param1: any[]): any[] {
        let _loc3_: string = null;
        let _loc4_: any[] = null;
        let _loc5_: any[] = [];
        if (!param1 || param1.length == 0) {
            return _loc5_;
        }
        for (const _loc2_ of param1 ?? []) {
            _loc3_ = stringOrNull(_loc2_ ? _loc2_._SafeStr_5549 : null);
            if (!StringUtil.isEmpty(_loc3_)) {
                _loc4_ = [_loc3_];
                if (_loc2_ && _loc2_._SafeStr_7352) {
                    this.appendGradualSanctionDetails(_loc4_, _loc2_);
                }
                _loc5_.push(_loc4_.join("\n"));
            }
        }
        return _loc5_;
    }

    private appendGradualSanctionDetails(param1: any[], param2: SanctionDTO): void {
        let _loc3_: number = 0;
        if (!param1) {
            return;
        }
        let _loc5_: boolean = !!(param2 && param2._SafeStr_5613 > 0);
        let _loc4_: string = param2 && param2._SafeStr_5941 ? param2._SafeStr_5941.name : "";
        if (!_loc5_ && StringUtil.isEmpty(_loc4_)) {
            return;
        }
        param1.push("");
        param1.push(this._habboHelp.localization.getLocalization("help.sanction.probation.reminder"));
        if (_loc5_) {
            _loc3_ = this.getProbationDaysLeft(param2);
            param1.push(this._habboHelp.localization.getLocalization("help.sanction.probation.days.left") + " " + _loc3_);
        }
        if (!StringUtil.isEmpty(_loc4_)) {
            param1.push("");
            param1.push(this.getNextSanctionDescription(param2._SafeStr_5941));
            param1.push("");
        }
    }

    private getProbationDaysLeft(param1: SanctionDTO): number {
        if (!param1 || param1._SafeStr_5613 <= 0) {
            return 0;
        }
        return Math.ceil(param1._SafeStr_5613 / 24) | 0;
    }

    private getNextSanctionDescription(param1: SanctionType): string {
        let _loc2_: number = 0;
        if (!param1 || StringUtil.isEmpty(param1.name)) {
            return "";
        }
        switch (param1.name) {
            case "ALERT":
                return this._habboHelp.localization.getLocalization("help.sanction.next.alert");
            case "MUTE":
                return this._habboHelp.localization.registerParameter("help.sanction.next.mute", "hours", param1._SafeStr_4902.toString());
            case "BAN_PERMANENT":
                return this._habboHelp.localization.getLocalization("help.sanction.next.permban");
            default:
                if (param1._SafeStr_4902 > 24) {
                    _loc2_ = param1._SafeStr_4902 / 24 | 0;
                    return this._habboHelp.localization.registerParameter("help.sanction.next.ban.days", "days", _loc2_.toString());
                }
                return this._habboHelp.localization.registerParameter("help.sanction.next.ban", "hours", param1._SafeStr_4902.toString());
        }
    }

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (this._disposed || !this._window || param1.type != "WME_CLICK" || !param2) {
            return;
        }
        switch (param2.name) {
            case "faq_link":
                this._habboHelp.openCfhFaq();
                break;
            case "header_button_close":
            case "ok_button":
                this.dispose();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
