import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';

export class WindowTracker {
    static { registerClassName(this, 'com.sulake.habbo.moderation::WindowTracker'); }

    public static readonly TYPE_USERINFO: number = 1;
    public static readonly _SafeStr_8281: number = 2;
    public static readonly _SafeStr_8607: number = 3;
    public static readonly _SafeStr_8518: number = 4;
    public static readonly _SafeStr_8460: number = 5;
    public static readonly _SafeStr_8672: number = 6;
    public static readonly _SafeStr_8078: number = 7;
    public static readonly TYPE_ISSUEHANDLER: number = 8;
    public static readonly TYPE_ROOMINFO: number = 9;

    constructor() {
    }

    private _SafeStr_5620: Map<any, any> = new Dictionary();

    public show(param1: ITrackedWindow, param2: IFrameWindow, param3: boolean, param4: boolean, param5: boolean, param6: boolean = false, param7: number = 0, param8: number = 0, param9: number = 0, param10: number = 0): void {
        let _loc14_: IWindow = null;
        let _loc13_: number = 0;
        let _loc11_: IWindow = null;
        let _loc12_: ITrackedWindow = this.removeWindow(param1.getType(), param1.getId());
        if (_loc12_ != null && !_loc12_.disposed) {
            if (param5) {
                param1.dispose();
                _loc12_.dispose();
                return;
            }
            param1.show();
            _loc14_ = _loc12_.getFrame();
            param1.getFrame().x = param6 ? param7 : _loc14_.x;
            param1.getFrame().y = param6 ? param8 : _loc14_.y;
            param1.getFrame().width = param6 ? param9 : _loc14_.width;
            param1.getFrame().height = param6 ? param10 : _loc14_.height;
            this.getWindowsForType(param1.getType()).set(param1.getId(), param1);
            _loc12_.dispose();
        } else if (!param4) {
            param1.show();
            if (param2 != null) {
                _loc13_ = 5;
                if (param3) {
                    param1.getFrame().x = param6 ? param7 : param2.x;
                    param1.getFrame().y = param6 ? param8 : param2.y + param2.height + _loc13_;
                } else {
                    param1.getFrame().x = param6 ? param7 : param2.x + param2.width + _loc13_;
                    param1.getFrame().y = param6 ? param8 : param2.y;
                }
            } else if (param6) {
                param1.getFrame().x = param7;
                param1.getFrame().y = param8;
            } else {
                _loc11_ = param1.getFrame().desktop;
                param1.getFrame().x = _loc11_.width / 2 - param1.getFrame().width / 2 | 0;
                param1.getFrame().y = _loc11_.height / 2 - param1.getFrame().height / 2 | 0;
            }
            param1.getFrame().x = Math.max(0, Math.min(param1.getFrame().x, param1.getFrame().desktop.width - param1.getFrame().width)) | 0;
            param1.getFrame().y = Math.max(0, Math.min(param1.getFrame().y, param1.getFrame().desktop.height - param1.getFrame().height)) | 0;
            this.getWindowsForType(param1.getType()).set(param1.getId(), param1);
        }
    }

    private removeWindow(param1: number, param2: string): ITrackedWindow {
        let _loc4_: Map<any, any> = this.getWindowsForType(param1);
        let _loc3_: ITrackedWindow = _loc4_.get(param2);
        _loc4_.set(param2, null);
        return _loc3_;
    }

    private getWindowsForType(param1: number): Map<any, any> {
        let _loc2_: Map<any, any> = this._SafeStr_5620.get(param1);
        if (_loc2_ == null) {
            _loc2_ = new Dictionary();
            this._SafeStr_5620.set(param1, _loc2_);
        }
        return _loc2_;
    }
}
