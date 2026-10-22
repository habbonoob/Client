import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface _SafeCls_6112 extends IUnknown {
    get events(): IEventDispatcher;
    get hasReadPermission(): boolean;
    get hasWritePermission(): boolean;
}
