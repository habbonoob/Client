import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class HabbletLinkHandler implements ILinkEventTracker, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.window.handlers::HabbletLinkHandler'); }

    constructor(param1: HabboWindowManagerComponent) {
        this._windowManager = param1;
    }

    declare private _windowManager: HabboWindowManagerComponent;

    public get linkPattern(): string {
        return "habblet/";
    }

    public get disposed(): boolean {
        return this._windowManager == null;
    }

    public linkReceived(param1: string): void {
        let _loc3_: string = null;
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc4_: any = _loc2_[1];
        if ("open" === _loc4_) {
            if (_loc2_.length > 2) {
                _loc3_ = stringOrNull(_loc2_[2]);
                if (_loc3_ == "credits") {
                    HabboWebTools.openWebPageAndMinimizeClient(this._windowManager.getProperty("web.shop.relativeUrl"));
                } else {
                    HabboWebTools.openWebHabblet(_loc3_);
                }
            }
        }
    }

    public dispose(): void {
        this._windowManager = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
