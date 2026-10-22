import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { JsonPoint } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonPoint';

export class JsonMaskDrawingData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera.json::JsonMaskDrawingData'); }

    constructor(param1: string, param2: JsonPoint, param3: boolean, param4: boolean) {
        this._name = param1;
        this._location = param2;
        this._flipH = param3;
        this._flipV = param4;
    }

    declare private _location: JsonPoint;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _flipH: boolean;
    static { (this.prototype as any)._flipH = false; }

    public get flipH(): boolean {
        return this._flipH;
    }

    declare private _flipV: boolean;
    static { (this.prototype as any)._flipV = false; }

    public get flipV(): boolean {
        return this._flipV;
    }

    public get location(): JsonPoint {
        return this._location;
    }
}
