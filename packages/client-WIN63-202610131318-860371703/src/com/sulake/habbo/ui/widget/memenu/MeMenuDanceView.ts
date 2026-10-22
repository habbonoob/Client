import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IMeMenuView } from '@/com/sulake/habbo/ui/widget/memenu/IMeMenuView';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { RoomWidgetDanceMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDanceMessage';

export class MeMenuDanceView implements IMeMenuView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu::MeMenuDanceView'); }

    declare private _widget: MeMenuWidget;

    declare private _window: IWindowContainer;

    constructor() {
    }

    public init(param1: MeMenuWidget, param2: string): void {
        this._widget = param1;
        this.createWindow(param2);
    }

    public dispose(): void {
        this._widget = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private createWindow(param1: string): void {
        let _loc7_: number = 0;
        let _loc5_: boolean = false;
        let _loc2_: IWindow = null;
        let _loc6_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("memenu_dance"), XmlAsset);
        if (_loc6_) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc6_.content, XML)), isIWindowContainer);
        }
        if (this._window == null) {
            throw new Error("Failed to construct dance view window from XML!");
        }
        this._window.name = param1;
        let _loc3_: any[] = [];
        _loc3_.push(this._window.findChildByName("stop_dancing_button"));
        _loc3_.push(this._window.findChildByName("back_btn"));
        for (_loc2_ of _loc3_ ?? []) {
            if (_loc2_ != null) {
                _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
            }
        }
        let _loc8_: IItemListWindow = asGuarded(this._window.findChildByName("buttonContainer"), isIItemListWindow);
        let _loc4_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("memenu_dance_button"), XmlAsset);
        if (_loc8_ != null) {
            _loc7_ = 1;
            while (_loc7_ <= 4) {
                _loc5_ = false;
                if (RoomWidgetDanceMessage._SafeStr_6564.indexOf(_loc7_) >= 0) {
                    _loc5_ = this._widget.allowHabboClubDances;
                } else {
                    _loc5_ = true;
                }
                if (_loc5_) {
                    _loc2_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIWindow);
                    _loc2_.name = "dance_" + _loc7_ + "_button";
                    _loc2_.caption = "${widget.memenu.dance" + _loc7_ + "}";
                    _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
                    _loc8_.addListItemAt(_loc2_, _loc8_.numListItems - 1 >>> 0);
                    if (this._widget.hasEffectOn) {
                        _loc2_.disable();
                    } else {
                        _loc2_.enable();
                    }
                }
                _loc7_++;
            }
        }
        let _loc9_: IWindow = this._window.findChildByName("club_info");
        if (_loc9_ != null && this._widget.isHabboClubActive) {
            _loc9_.visible = false;
        }
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc5_: any[] = null;
        let _loc3_: number = 0;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc4_: string;
        switch (_loc4_ = _loc2_.name) {
            case "dance_1_button":
            case "dance_2_button":
            case "dance_3_button":
            case "dance_4_button":
                _loc5_ = _loc4_.split("_");
                _loc3_ = parseInt(stringOrNull(_loc5_[1])) | 0;
                this._widget.messageListener.processWidgetMessage(new RoomWidgetDanceMessage(_loc3_));
                this._widget.isDancing = true;
                this._widget.hide();
                HabboTracking.getInstance().trackEventLog("MeMenu", "click", "dance_start");
                break;
            case "stop_dancing_button":
                this._widget.messageListener.processWidgetMessage(new RoomWidgetDanceMessage(0));
                this._widget.isDancing = false;
                this._widget.hide();
                HabboTracking.getInstance().trackEventLog("MeMenu", "click", "dance_stop");
                break;
            case "back_btn":
                this._widget.changeView("me_menu_top_view");
                break;
            default:
                Logger.log("Me Menu Dance View: unknown button: " + _loc4_);
        }
    };

    public updateUnseenItemCount(param1: string, param2: number): void {
    }
}
