import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ISynchronizedGameEvent } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameEvent';

export class SnowWarGameEvent implements ISynchronizedGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::SnowWarGameEvent'); }

    private _disposed: boolean = false;

    constructor() {
    }

    public apply(param1: SynchronizedGameStage): void {
    }

    public dispose(): void {
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [ISynchronizedGameEvent](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
