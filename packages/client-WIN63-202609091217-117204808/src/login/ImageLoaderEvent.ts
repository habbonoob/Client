import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Loader } from '@habbo-pixi/runtime/display/Loader';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class ImageLoaderEvent extends Event {
    static { registerClassName(this, 'login::ImageLoaderEvent'); }

    declare private _loader: Loader;

    declare private _SafeStr_2991: string;

    constructor(param1: string, param2: Loader, param3: string) {
        super(param1, false, false);
        this._loader = param2;
        this._SafeStr_2991 = param3;
    }

    public get loader(): Loader {
        return this._loader;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }
}
