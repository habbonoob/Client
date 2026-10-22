import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';

export class ButtonMenuView extends ContextInfoView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.contextmenu::ButtonMenuView'); }

    protected static readonly ICON_MARGIN: number = 8;
    protected static readonly LINK_COLOR_MODERATE_DEFAULT: number = 16744755;
    protected static readonly LINK_COLOR_MODERATE_HOVER: number = 16756591;
    protected static readonly ICON_VIP: string = "icon_vip";
    protected static readonly ICON_DUCKET: string = "icon_ducket";
    protected static readonly ICON_ARROW_LEFT: string = "arrow_left";
    protected static readonly ICON_ARROW_RIGHT: string = "arrow_right";

    declare protected _buttons: IItemListWindow;

    constructor(param1: IContextMenuParentWidget) {
        super(param1);
        this.buttonEventProc = this.buttonEventProc.bind(this);
    }

    public override dispose(): void {
        this._buttons = null;
        super.dispose();
    }

    protected showButtonGrid(param1: string, param2: boolean = true): void {
        let _loc6_: number = 0;
        let _loc8_: IWindowContainer = null;
        let _loc7_: IBitmapWrapperWindow = null;
        if (!this._buttons) {
            return;
        }
        let _loc3_: IItemGridWindow = asGuarded(this._buttons.getListItemByName(param1), isIItemGridWindow);
        if (!_loc3_) {
            return;
        }
        _loc3_.visible = param2;
        let _loc4_: IIterator = _loc3_.iterator;
        let _loc5_: number = _loc4_.length | 0;
        if (_loc5_ > 0) {
            _loc6_ = 0;
            while (_loc6_ < _loc5_) {
                _loc8_ = asGuarded(_loc4_[_loc6_], isIWindowContainer);
                _loc7_ = asGuarded(_loc8_.findChildByTag("icon"), isIBitmapWrapperWindow);
                if (_loc7_) {
                    this.setImageAsset(_loc7_, _loc7_.name, true);
                }
                _loc6_++;
            }
        }
    }

    protected showButton(param1: string, param2: boolean = true, param3: boolean = true, param4: boolean = false, param5: boolean = false): void {
        let _loc11_: IIconWindow = null;
        let _loc8_: IIconWindow = null;
        if (!this._buttons) {
            return;
        }
        let _loc6_: IWindowContainer = asGuarded(this._buttons.getListItemByName(param1), isIWindowContainer);
        if (!_loc6_) {
            return;
        }
        _loc6_.visible = param2;
        let _loc7_: IWindowContainer = asGuarded(_loc6_.getChildByName("button"), isIWindowContainer);
        param3 ||= param4;
        param3 ? _loc7_.enable() : Boolean(_loc7_.disable());
        let _loc10_: ITextWindow = asGuarded(_loc7_.getChildByName("label"), isITextWindow);
        _loc10_.textColor = (param3 && !param4 ? 16777215 : 5789011) >>> 0;
        let _loc9_: IIconWindow = asGuarded(_loc7_.getChildByName("icon"), isIIconWindow);
        if (_loc9_) {
            _loc9_.color = (param3 ? 13947341 : 5789011) >>> 0;
            if (_loc9_.tags.indexOf("arrow_left") != -1) {
                _loc9_.x = _loc10_.x + (_loc10_.width - _loc10_.textWidth) / 2 - _loc9_.width - 8 | 0;
            }
            if (_loc9_.tags.indexOf("arrow_right") != -1) {
                _loc9_.x = _loc10_.x + (_loc10_.width + _loc10_.textWidth) / 2 + 8 | 0;
            }
            _loc9_.visible = param4 || param5;
        }
        if (param4) {
            _loc11_ = asGuarded(_loc7_.getChildByName("icon_vip"), isIIconWindow);
            if (_loc11_) {
                _loc11_.visible = param4;
            }
        }
        if (param5) {
            _loc8_ = asGuarded(_loc7_.getChildByName("icon_ducket"), isIIconWindow);
            if (_loc8_) {
                _loc8_.visible = param5;
            }
        }
    }

    protected buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        if (param1.type == "WME_OVER") {
            if (param2.name == "button") {
                param2.color = param2.tags.indexOf("moderate") > -1 ? 4288230144 : 4282950861;
            } else if (param2.tags.indexOf("link") > -1) {
                if (param2.tags.indexOf("actions") > -1) {
                    castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildAt(0), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 9552639;
                } else if (param2.tags.indexOf("moderate") > -1) {
                    castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildAt(0), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16756591;
                }
            }
            if (param2.name == "profile_link") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 9552639;
            }
        } else if (param1.type == "WME_OUT") {
            if (param2.name == "button") {
                param2.color = 4281149991;
            } else if (param2.tags.indexOf("link") > -1) {
                if (param2.tags.indexOf("actions") > -1) {
                    castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildAt(0), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16777215;
                } else if (param2.tags.indexOf("moderate") > -1) {
                    castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildAt(0), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16744755;
                }
            }
            if (param2.name == "profile_link") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16777215;
            }
        }
    }
}
