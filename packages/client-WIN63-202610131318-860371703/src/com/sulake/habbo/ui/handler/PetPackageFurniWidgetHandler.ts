import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomSessionPetPackageEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetPackageEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetPetPackageUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetPackageUpdateEvent';
import { RoomWidgetOpenPetPackageMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenPetPackageMessage';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PetPackageFurniWidgetHandler implements IRoomWidgetHandler, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::PetPackageFurniWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;
    private _objectId: number = -1;

    constructor() {
    }

    public get type(): string {
        return "RWE_FURNI_PET_PACKAGE_WIDGET";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public getWidgetMessages(): any[] {
        return ["RWOPPM_OPEN_PET_PACKAGE"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetOpenPetPackageMessage = null;
        let _loc3_: string = param1.type;
        if ("RWOPPM_OPEN_PET_PACKAGE" === _loc3_) {
            _loc2_ = param1 instanceof RoomWidgetOpenPetPackageMessage ? param1 : null;
            if (this._container != null && this._container.roomSession != null) {
                this._container.roomSession.sendOpenPetPackageMessage(_loc2_.objectId, _loc2_.name);
            }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RSOPPE_OPEN_PET_PACKAGE_REQUESTED", "RSOPPE_OPEN_PET_PACKAGE_RESULT"];
    }

    public processEvent(param1: Event): void {
        let _loc5_: RoomSessionPetPackageEvent = null;
        let _loc3_: RoomWidgetPetPackageUpdateEvent = null;
        let _loc4_: BitmapData = null;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        let _loc7_: string = null;
        if (param1 == null) {
            return;
        }
        if (this._container != null && this._container.events != null && param1 != null) {
            switch (param1.type) {
                case "RSOPPE_OPEN_PET_PACKAGE_REQUESTED":
                    _loc5_ = param1 instanceof RoomSessionPetPackageEvent ? param1 : null;
                    this._objectId = _loc5_.objectId;
                    _loc4_ = this.getPetImage(_loc5_.figureData);
                    _loc6_ = _loc5_.figureData?.typeId;
                    _loc3_ = new RoomWidgetPetPackageUpdateEvent("RWOPPUE_OPEN_PET_PACKAGE_REQUESTED", this._objectId, _loc4_, -1, null, _loc6_);
                    this._container.events.dispatchEvent(_loc3_);
                    break;
                case "RSOPPE_OPEN_PET_PACKAGE_RESULT":
                    _loc5_ = param1 instanceof RoomSessionPetPackageEvent ? param1 : null;
                    this._objectId = _loc5_.objectId;
                    _loc2_ = _loc5_.nameValidationStatus;
                    _loc7_ = _loc5_.nameValidationInfo;
                    _loc3_ = new RoomWidgetPetPackageUpdateEvent("RWOPPUE_OPEN_PET_PACKAGE_RESULT", this._objectId, null, _loc2_, _loc7_, -1);
                    this._container.events.dispatchEvent(_loc3_);
            }
        }
    }

    public update(): void {
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
        this._objectId = -1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc3_: RoomWidgetPetPackageUpdateEvent = new RoomWidgetPetPackageUpdateEvent("RWOPPUE_OPEN_PET_PACKAGE_UPDATE_PET_IMAGE", this._objectId, param2, -1, null, -1);
        this._container.events.dispatchEvent(_loc3_);
    }

    public imageFailed(param1: number): void {
    }

    private getPetImage(param1: PetFigureData): BitmapData {
        let _loc2_: any = 0;
        let _loc3_: any = 0;
        let _loc4_: ImageResult = null;
        if (param1 != null) {
            _loc2_ = parseInt(param1.color, 16) >>> 0;
            _loc3_ = 0;
            _loc4_ = this._container.roomEngine.getPetImage(param1.typeId, param1.paletteId, _loc2_ | 0, new Vector3d(90), 64, this, true, _loc3_ >>> 0);
            if (_loc4_ != null) {
                return _loc4_.data;
            }
        }
        return null;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
