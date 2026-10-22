import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILogger } from '@/com/sulake/core/runtime/ILogger';

export class Logger {
    static { registerClassName(this, 'Logger'); }

    public static listener: ILogger;

    constructor() {
    }

    public static log(...rest: any[]): void {
    }
}
