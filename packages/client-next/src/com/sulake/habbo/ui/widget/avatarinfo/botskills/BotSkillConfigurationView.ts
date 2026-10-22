import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface BotSkillConfigurationView extends IDisposable {
    open(param1: number, param2?: Point): void;
    close(): void;
    parseConfiguration(param1: string): void;
}
