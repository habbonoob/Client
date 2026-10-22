import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { Util } from '@/com/sulake/habbo/friendlist/Util';

export class AlertView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::AlertView'); }

    private static _SafeStr_3599: Map<any, any> = new Dictionary();

    constructor(param1: HabboFriendList, param2: string, param3: string = null) {
        this._friendList = param1;
        this._xmlFileName = param2;
        this._title = param3;
    }

    declare private _SafeStr_2763: IFrameWindow;

    declare private _xmlFileName: string;

    declare private _title: string;

    declare private _friendList: HabboFriendList;

    public get friendList(): HabboFriendList {
        return this._friendList;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        let _loc1_: IFrameWindow = castGuarded(AlertView._SafeStr_3599.get(this._xmlFileName), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        if (_loc1_ != null) {
            _loc1_.dispose();
        }
        this._SafeStr_2763 = this.getAlert();
        if (this._title != null) {
            this._SafeStr_2763.caption = this._title;
        }
        this.setupContent(this._SafeStr_2763.content);
        let _loc2_: Rectangle = Util.getLocationRelativeTo(this._friendList.view.mainWindow, this._SafeStr_2763.width, this._SafeStr_2763.height);
        this._SafeStr_2763.x = _loc2_.x | 0;
        this._SafeStr_2763.y = _loc2_.y | 0;
        AlertView._SafeStr_3599.set(this._xmlFileName, this._SafeStr_2763);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_2763 != null) {
            this._SafeStr_2763.destroy();
            this._SafeStr_2763 = null;
        }
        this._friendList = null;
    }

    public setupContent(param1: IWindowContainer): void {
    }

    public onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.dispose();
    };

    private getAlert(): IFrameWindow {
        let _loc1_: IFrameWindow = castGuarded(this._friendList.getXmlWindow(this._xmlFileName), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        let _loc2_: IWindow = _loc1_.findChildByTag("close");
        _loc2_.procedure = this.onClose;
        return _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}
