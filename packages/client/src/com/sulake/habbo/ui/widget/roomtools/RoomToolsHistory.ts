import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { RoomToolsWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomToolsWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RoomToolsHistory {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomToolsHistory'); }

    private static readonly PADDING: number = 5;
    private static readonly SPACING: number = 2;

    constructor(param1: IHabboWindowManager, param2: IAssetLibrary, param3: RoomToolsWidgetHandler) {
        this._SafeStr_2143 = param3;
        this._assets = param2;
        this._windowManager = param1;
        this._window = asGuarded(param1.buildFromXML(asInstanceOf(param2.getAssetByName("room_tools_history_xml").content, XML)), isIWindowContainer);
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_2143: RoomToolsWidgetHandler;

    private _items: IWindowContainer[] = [];

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public populate(param1: GuestRoomData[]): void {
        let _loc3_: IWindow = null;
        let _loc2_: IWindowContainer = null;
        for (const _loc4_ of param1 ?? []) {
            _loc2_ = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName("room_tools_history_item_xml").content, XML)), isIWindowContainer);
            this._window.addChild(_loc2_);
            _loc2_.findChildByName("room_name").caption = _loc4_.roomName;
            if (_loc3_) {
                _loc2_.y = _loc3_.bottom + 2;
            } else {
                _loc2_.y = 5;
            }
            _loc2_.x = 5;
            _loc2_.id = _loc4_.flatId;
            _loc2_.procedure = this.onClick;
            _loc3_ = _loc2_;
            this._items.push(_loc2_);
        }
        if (_loc3_) {
            this._window.height = _loc3_.bottom + 2 * 5;
        }
    }

    public dispose(): void {
        for (const _loc1_ of this._items ?? []) {
            _loc1_.procedure = null;
            _loc1_.dispose();
        }
        this._items = null;
        this._windowManager = null;
        this._SafeStr_2143 = null;
        this._assets = null;
        this._window.dispose();
        this._window = null;
    }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._SafeStr_2143.goToPrivateRoom(param2.id);
    };
}
