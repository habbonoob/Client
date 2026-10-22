import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';

export class HabboUserDefinedRoomEventsBootstrap extends HabboUserDefinedRoomEvents {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboUserDefinedRoomEventsBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
