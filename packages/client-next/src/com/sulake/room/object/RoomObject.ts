import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomObjectEventHandlerStateTransfer } from '@/com/sulake/room/object/logic/IRoomObjectEventHandlerStateTransfer';
import type { IRoomObjectMouseHandler } from '@/com/sulake/room/object/logic/IRoomObjectMouseHandler';
import type { IRoomObjectVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { isIRoomObjectEventHandlerStateTransfer } from '@/com/sulake/room/object/logic/IRoomObjectEventHandlerStateTransfer';
import { RoomObjectModel } from '@/com/sulake/room/object/RoomObjectModel';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomObject implements IRoomObjectController {
    static { registerClassName(this, 'com.sulake.room.object::RoomObject'); }

    private static _SafeStr_6645: number = 0;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    private _type: string = "";

    declare private _SafeStr_2291: Vector3d;

    declare private _dir: Vector3d;

    declare private _SafeStr_5704: Vector3d;

    declare private _SafeStr_5835: Vector3d;

    declare private _SafeStr_3243: any[];

    declare private _SafeStr_2134: RoomObjectModel;

    declare private _visualization: IRoomObjectVisualization;

    declare private _SafeStr_2756: IRoomObjectEventHandler;

    declare private _SafeStr_2155: number;
    static { (this.prototype as any)._SafeStr_2155 = 0; }

    declare private _avatarLibraryAssetName: string;

    private _instanceId: number = 0;
    private _isInitialized: boolean = false;

    constructor(param1: number, param2: number, param3: string) {
        let _loc4_: number = NaN;
        this._id = param1;
        this._SafeStr_2291 = new Vector3d();
        this._dir = new Vector3d();
        this._SafeStr_5704 = new Vector3d();
        this._SafeStr_5835 = new Vector3d();
        this._SafeStr_3243 = new Array(param2);
        _loc4_ = param2 - 1;
        while (_loc4_ >= 0) {
            this._SafeStr_3243[_loc4_] = 0;
            _loc4_--;
        }
        this._type = param3;
        this._SafeStr_2134 = new RoomObjectModel();
        this._visualization = null;
        this._SafeStr_2756 = null;
        this._SafeStr_2155 = 0;
        this._instanceId = RoomObject._SafeStr_6645++;
    }

    public dispose(): void {
        this._SafeStr_2291 = null;
        this._dir = null;
        this._SafeStr_3243 = null;
        this._avatarLibraryAssetName = null;
        this.setVisualization(null);
        this.setEventHandler(null);
        if (this._SafeStr_2134 != null) {
            this._SafeStr_2134.dispose();
            this._SafeStr_2134 = null;
        }
    }

    public setInitialized(param1: boolean): void {
        this._isInitialized = param1;
    }

    public isInitialized(): boolean {
        return this._isInitialized;
    }

    public getId(): number {
        return this._id;
    }

    public getInstanceId(): number {
        return this._instanceId;
    }

    public getType(): string {
        return this._type;
    }

    public getLocation(): IVector3d {
        this._SafeStr_5704.assign(this._SafeStr_2291);
        return this._SafeStr_5704;
    }

    public getDirection(): IVector3d {
        this._SafeStr_5835.assign(this._dir);
        return this._SafeStr_5835;
    }

    public getModel(): IRoomObjectModel {
        return this._SafeStr_2134;
    }

    public getModelController(): IRoomObjectModelController {
        return this._SafeStr_2134;
    }

    public getState(param1: number): number {
        if (param1 >= 0 && param1 < this._SafeStr_3243.length) {
            return this._SafeStr_3243[param1] | 0;
        }
        return -1;
    }

    public getVisualization(): IRoomObjectVisualization {
        return this._visualization;
    }

    public setLocation(param1: IVector3d): void {
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_2291.x != param1.x || this._SafeStr_2291.y != param1.y || this._SafeStr_2291.z != param1.z) {
            this._SafeStr_2291.x = param1.x;
            this._SafeStr_2291.y = param1.y;
            this._SafeStr_2291.z = param1.z;
            this._SafeStr_2155 = this._SafeStr_2155 + 1;
        }
    }

    public setDirection(param1: IVector3d): void {
        if (param1 == null) {
            return;
        }
        if (this._dir.x != param1.x || this._dir.y != param1.y || this._dir.z != param1.z) {
            this._dir.x = (param1.x % 360 + 360) % 360;
            this._dir.y = (param1.y % 360 + 360) % 360;
            this._dir.z = (param1.z % 360 + 360) % 360;
            this._SafeStr_2155 = this._SafeStr_2155 + 1;
        }
    }

    public setState(param1: number, param2: number): boolean {
        if (param2 >= 0 && param2 < this._SafeStr_3243.length) {
            if (this._SafeStr_3243[param2] != param1) {
                this._SafeStr_3243[param2] = param1;
                this._SafeStr_2155 = this._SafeStr_2155 + 1;
            }
            return true;
        }
        return false;
    }

    public setVisualization(param1: IRoomObjectVisualization): void {
        if (param1 != this._visualization) {
            if (this._visualization != null) {
                this._visualization.dispose();
            }
            this._visualization = param1;
            if (this._visualization != null) {
                this._visualization.object = this;
            }
        }
    }

    public setEventHandler(param1: IRoomObjectEventHandler): void {
        if (param1 == this._SafeStr_2756) {
            return;
        }
        let _loc3_: IRoomObjectEventHandler = this._SafeStr_2756;
        let _loc2_: IRoomObjectEventHandlerStateTransfer = isIRoomObjectEventHandlerStateTransfer(param1) ? param1 : null;
        if (_loc3_ != null && _loc2_ != null) {
            _loc2_.transferStateFrom(_loc3_);
        }
        if (_loc3_ != null) {
            this._SafeStr_2756 = null;
            _loc3_.object = null;
        }
        this._SafeStr_2756 = param1;
        if (this._SafeStr_2756 != null) {
            this._SafeStr_2756.object = this;
        }
    }

    public getEventHandler(): IRoomObjectEventHandler {
        return this._SafeStr_2756;
    }

    public getUpdateID(): number {
        return this._SafeStr_2155;
    }

    public getMouseHandler(): IRoomObjectMouseHandler {
        return this.getEventHandler();
    }

    public getAvatarLibraryAssetName(): string {
        if (!this._avatarLibraryAssetName) {
            this._avatarLibraryAssetName = "avatar_" + this.getId();
        }
        return this._avatarLibraryAssetName;
    }

    public tearDown(): void {
        if (this._SafeStr_2756) {
            this._SafeStr_2756.tearDown();
        }
    }

    get [IRoomObjectController](): true {
        return true;
    }

    get [IRoomObject](): true {
        return true;
    }
}
