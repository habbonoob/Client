import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { HighScoreDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/highscore/HighScoreDisplayWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { HighScoreStuffData } from '@/com/sulake/habbo/room/object/data/HighScoreStuffData';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class HighScoreFurniWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::HighScoreFurniWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;
    private _widget: HighScoreDisplayWidget = null;
    private _SafeStr_3021: RoomEngineObjectEvent = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_HIGH_SCORE_DISPLAY";
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set widget(param1: HighScoreDisplayWidget) {
        this._widget = param1;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this._container.addUpdateListener(this);
    }

    public dispose(): void {
        if (this._container) {
            this._container.removeUpdateListener(this);
        }
        this._disposed = true;
        this._container = null;
        this._widget = null;
    }

    public getProcessedEvents(): any[] {
        return ["RETWE_REQUEST_HIGH_SCORE_DISPLAY", "RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY"];
    }

    public processEvent(param1: Event): void {
        let _loc4_: RoomEngineObjectEvent = null;
        let _loc2_: IRoomObject = null;
        let _loc5_: IRoomObjectModel = null;
        let _loc3_: HighScoreStuffData = null;
        if (this.disposed || param1 == null) {
            return;
        }
        switch (param1.type) {
            case "RETWE_REQUEST_HIGH_SCORE_DISPLAY":
                _loc4_ = castTo(param1, RoomEngineObjectEvent);
                _loc2_ = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.objectId, _loc4_.category);
                if (_loc2_ != null) {
                    _loc5_ = _loc2_.getModel();
                    if (_loc5_ != null) {
                        _loc3_ = new HighScoreStuffData();
                        _loc3_.initializeFromRoomObjectModel(_loc5_);
                        this._widget.open(_loc4_.objectId, _loc4_.roomId, _loc3_);
                    }
                    this._SafeStr_3021 = _loc4_;
                }
                break;
            case "RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY":
                _loc4_ = castTo(param1, RoomEngineObjectEvent);
                if (_loc4_.roomId == this._widget.roomId && _loc4_.objectId == this._widget.roomObjId) {
                    this._widget.close();
                }
        }
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public update(): void {
        let _loc1_: IRoomObject = null;
        let _loc2_: Point = null;
        if (this._SafeStr_3021 && this._widget.isOpen && this._widget.roomId == this._SafeStr_3021.roomId && this._widget.roomObjId == this._SafeStr_3021.objectId) {
            _loc1_ = this._container.roomEngine.getRoomObject(this._SafeStr_3021.roomId, this._SafeStr_3021.objectId, this._SafeStr_3021.category);
            if (_loc1_ != null) {
                _loc2_ = this._container.roomEngine.getRoomObjectScreenLocation(this._SafeStr_3021.roomId, this._SafeStr_3021.objectId, this._SafeStr_3021.category);
                if (_loc2_ != null) {
                    this._widget.setRelativePositionToRoomObjectAt(_loc2_.x | 0, _loc2_.y | 0);
                }
            }
        }
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
