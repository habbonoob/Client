import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RoomLayout {
    static { registerClassName(this, 'com.sulake.habbo.navigator.domain::RoomLayout'); }

    constructor(param1: number, param2: number, param3: string) {
        this._level = param1;
        this._tileSize = param2;
        this._name = param3;
    }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _tileSize: number;
    static { (this.prototype as any)._tileSize = 0; }

    declare private _view: IWindowContainer;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get requiredClubLevel(): number {
        return this._level;
    }

    public get tileSize(): number {
        return this._tileSize;
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public set view(param1: IWindowContainer) {
        this._view = param1;
    }
}
