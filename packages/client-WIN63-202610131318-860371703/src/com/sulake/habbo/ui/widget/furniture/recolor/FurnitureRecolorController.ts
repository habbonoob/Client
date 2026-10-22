import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FurniRecolorUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FurniRecolorUpdateMessageEvent';
import { FurniRecolorMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/FurniRecolorMessageComposer';
import { _SafeCls_6114 } from '@/com/sulake/habbo/room/object/data/_SafeCls_6114';
import { FurnitureRecolorView } from '@/com/sulake/habbo/ui/widget/furniture/recolor/FurnitureRecolorView';

export class FurnitureRecolorController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.recolor::FurnitureRecolorController'); }

    declare private _widget: InfoStandWidget;

    declare private _connection: IConnection;

    declare private _view: FurnitureRecolorView;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    private _pendingColor: number = NaN;

    declare private _messageEvents: IMessageEvent[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: InfoStandWidget) {
        this._widget = param1;
        this._connection = this.container.connection;
        this._messageEvents = Array.from([new FurniRecolorUpdateMessageEvent(this.onFurniRecolorUpdate)]);
        for (const _loc2_ of this._messageEvents ?? []) {
            this._connection.addMessageEvent(_loc2_);
        }
    }

    public open(param1: number, param2: number): void {
        if (param2 != 10 || !this.hasRights) {
            return;
        }
        this._roomId = this.container.roomSession.roomId;
        this._furniId = param1;
        let _loc4_: IRoomObject = this.furniture;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: number = _loc4_.getModel().getNumber("furniture_recolorable_color");
        if (isNaN(_loc3_)) {
            return;
        }
        this._pendingColor = NaN;
        if (this._view == null) {
            this._view = new FurnitureRecolorView(this);
        }
        this._view.open(_loc4_, _loc3_ >>> 0, this.collectRoomColors());
    }

    private collectRoomColors(): any[] {
        let _loc3_: number = 0;
        let _loc6_: IRoomObject = null;
        let _loc1_: number = NaN;
        let _loc4_: any[] = [];
        let _loc5_: any = {};
        let _loc2_: number = this.container.roomEngine.getRoomObjectCount(this._roomId, 10);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc6_ = this.container.roomEngine.getRoomObjectWithIndex(this._roomId, _loc3_, 10);
            if (_loc6_ != null) {
                _loc1_ = _loc6_.getModel().getNumber("furniture_recolorable_color");
                if (!isNaN(_loc1_) && this.allowedColors.indexOf(_loc1_ >>> 0) >= 0 && !_loc5_[_loc1_]) {
                    _loc5_[_loc1_] = true;
                    _loc4_.push(_loc1_ >>> 0);
                }
            }
            _loc3_++;
        }
        return _loc4_.sort((a, b) => a - b);
    }

    public apply(param1: number, param2: number): void {
        if (!this.hasRights || this.container.roomSession.roomId != this._roomId || this.furniture == null) {
            this._view.hide();
            return;
        }
        if (this.allowedColors.indexOf(param1) < 0) {
            return;
        }
        this._pendingColor = param1;
        this.send(new FurniRecolorMessageComposer(this._furniId, param2, param1));
    }

    private onFurniRecolorUpdate = (param1: FurniRecolorUpdateMessageEvent): void => {
        let _loc2_: any = 0;
        if (isNaN(this._pendingColor) || this.container.roomSession == null || this.container.roomSession.roomId != this._roomId) {
            return;
        }
        for (const _loc3_ of param1.getParser().updates ?? []) {
            _loc2_ = (_loc3_.red << 16 | _loc3_.green << 8 | _loc3_.blue) >>> 0;
            if (_loc2_ == this._pendingColor && _loc3_.furniIds.indexOf(this._furniId) >= 0) {
                this._pendingColor = NaN;
                this._view.updateOriginalColor(_loc2_ >>> 0);
                this._view.updateRoomColors(this.collectRoomColors());
                return;
            }
        }
    };

    public onFurnitureRemoved(param1: number, param2: number): void {
        if (this._view != null && param1 == this._furniId && param2 == 10) {
            this._view.hide();
        }
    }

    private send(param1: IMessageComposer): void {
        this.container.connection.send(param1);
    }

    private get hasRights(): boolean {
        let _loc1_: IRoomSession = this.container.roomSession;
        return _loc1_ != null && !_loc1_.playTestMode && (_loc1_.isRoomOwner || _loc1_.roomControllerLevel >= 1 || this.container.sessionDataManager.isAnyRoomController);
    }

    private get furniture(): IRoomObject {
        return this.container.roomEngine.getRoomObject(this._roomId, this._furniId, 10);
    }

    public get allowedColors(): any[] {
        let _loc3_: IRoomObject = this.furniture;
        if (_loc3_ == null) {
            return [];
        }
        let _loc2_: number = _loc3_.getModel().getNumber("furniture_type_id") | 0;
        let _loc1_: IFurnitureData = this.container.sessionDataManager.getFloorItemData(_loc2_);
        return _loc1_ == null ? [] : _SafeCls_6114.getColors(this._widget.config, _loc1_.className);
    }

    private get container(): IRoomWidgetHandlerContainer {
        return this._widget.handler.container;
    }

    public get assets(): IAssetLibrary {
        return this._widget.assets;
    }

    public get roomEngine(): IRoomEngine {
        return this.container.roomEngine;
    }

    public get windowManager(): IHabboWindowManager {
        return this._widget.windowManager;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        for (const _loc1_ of this._messageEvents ?? []) {
            this._connection.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._connection = null;
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._widget = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
