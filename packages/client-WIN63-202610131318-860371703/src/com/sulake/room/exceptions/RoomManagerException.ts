import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomManagerException extends Error {
    static { registerClassName(this, 'com.sulake.room.exceptions::RoomManagerException'); }

    constructor(param1: string = "", param2: number = 0) {
        super(param1); this.errorID = param2;
    }
}
