import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDHabboRoomUI implements IID {
    static { registerClassName(this, 'com.sulake.iid::IIDHabboRoomUI'); }

    constructor() {
    }
}
