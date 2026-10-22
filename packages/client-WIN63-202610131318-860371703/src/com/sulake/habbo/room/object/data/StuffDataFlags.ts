import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class StuffDataFlags {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::StuffDataFlags'); }

    public static readonly UNIQUE_SERIAL_NUMBER: number = 256;

    constructor() {
    }
}
