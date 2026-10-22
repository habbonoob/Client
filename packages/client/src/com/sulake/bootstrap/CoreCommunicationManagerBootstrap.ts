import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { CoreCommunicationManager } from '@/com/sulake/core/communication/CoreCommunicationManager';

export class CoreCommunicationManagerBootstrap extends CoreCommunicationManager {
    static { registerClassName(this, 'com.sulake.bootstrap::CoreCommunicationManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0) {
        super(context, flags);
    }
}
