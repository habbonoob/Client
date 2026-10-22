import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILogger } from '@/com/sulake/core/runtime/ILogger';

/**
 * Legacy chokepoint: classes that have not yet migrated to SimpleLogger
 * still trace through here. Migrated classes hold their own
 * debug.SimpleLogger instance and log under their qualified class name.
 */
export class Logger {
    static { registerClassName(this, 'com.sulake.core.utils.debug::Logger'); }

    public static listener: ILogger;

    public static log(...rest: any[]): void {
        console.log(rest);
    }

    constructor() {
    }
}
