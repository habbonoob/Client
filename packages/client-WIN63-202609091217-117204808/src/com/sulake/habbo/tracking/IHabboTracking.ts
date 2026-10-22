import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';

export interface IHabboTracking extends IUnknown {
    get latencyPingMs(): number;
    trackGoogle(param1: string, param2: string, param3?: number): void;
    legacyTrackGoogle(param1: string, param2: string, param3?: any[]): void;
    logError(param1: string): void;
    chatLagDetected(param1: number): void;
    trackEventLog(param1: string, param2: string, param3: string, param4?: string, param5?: number): void;
    trackEventLogOncePerSession(param1: string, param2: string, param3: string, param4?: string, param5?: number): void;
    trackTalentTrackOpen(param1: string, param2: string): void;
}

export const IHabboTracking = Symbol('com.sulake.habbo.tracking::IHabboTracking');
registerClassName(IHabboTracking, 'com.sulake.habbo.tracking::IHabboTracking');

export function isIHabboTracking(value: unknown): value is IHabboTracking {
    return (value as { [IHabboTracking]?: true } | null | undefined)?.[IHabboTracking] === true;
}
