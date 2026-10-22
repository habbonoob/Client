import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { CoreCommunicationManager } from '@/com/sulake/core/communication/CoreCommunicationManager';

export class CoreCommunicationManagerBootstrap extends CoreCommunicationManager {
    static { registerClassName(this, 'com.sulake.bootstrap::CoreCommunicationManagerBootstrap'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }
}
