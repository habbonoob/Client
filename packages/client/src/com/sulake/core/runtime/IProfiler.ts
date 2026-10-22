import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import type { ProfilerAgent } from '@/com/sulake/core/utils/profiler/ProfilerAgent';

export interface IProfiler {
    get numAssetLibraryInstances(): number;
    get numBitmapAssetInstances(): number;
    get numAllocatedBitmapDataBytes(): number;
    get numTrackedBitmapDataInstances(): number;
    get numTrackedBitmapDataBytes(): number;
    getProfilerAgentForReceiver(param1: IUpdateReceiver): ProfilerAgent;
    getProfilerAgentsInArray(): any[];
    addStartEventListener(param1: (...args: any[]) => any): void;
    addStopEventListener(param1: (...args: any[]) => any): void;
    removeStartEventListener(param1: (...args: any[]) => any): void;
    removeStopEventListener(param1: (...args: any[]) => any): void;
    gc(): void;
}

export const IProfiler = Symbol('com.sulake.core.runtime::IProfiler');
registerClassName(IProfiler, 'com.sulake.core.runtime::IProfiler');

export function isIProfiler(value: unknown): value is IProfiler {
    return (value as { [IProfiler]?: true } | null | undefined)?.[IProfiler] === true;
}
