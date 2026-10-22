import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';
import type { ICoreErrorReporter } from '@/com/sulake/core/runtime/ICoreErrorReporter';
import { Logger } from '@/com/sulake/habbo/Logger';

export class CoreErrorReporter implements ICoreErrorReporter {
    static { registerClassName(this, 'com.sulake.core.runtime::CoreErrorReporter'); }

    constructor() {
    }

    public logError(param1: string, param2: boolean, param3: number = -1, param4: Error = null): void {
        Logger.log(param1, param4 != null ? param4.stack : "");
    }

    public set errorLogger(param1: ICoreErrorLogger) {
    }
}
