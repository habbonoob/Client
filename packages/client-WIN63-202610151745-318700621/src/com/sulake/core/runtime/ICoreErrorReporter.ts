import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';

export interface ICoreErrorReporter {
    logError(param1: string, param2: boolean, param3?: number, param4?: Error): void;
    set errorLogger(param1: ICoreErrorLogger);
}
