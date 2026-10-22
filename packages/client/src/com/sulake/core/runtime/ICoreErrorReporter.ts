import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';

export interface ICoreErrorReporter {
    set errorLogger(param1: ICoreErrorLogger);
    logError(param1: string, param2: boolean, param3?: number, param4?: Error): void;
}
