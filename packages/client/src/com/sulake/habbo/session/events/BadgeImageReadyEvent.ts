import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class BadgeImageReadyEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::BadgeImageReadyEvent'); }

    public static readonly BADGE_READY: string = "BIRE_BADGE_IMAGE_READY";

    constructor(param1: string, param2: BitmapData, param3: boolean = false, param4: boolean = false) {
        super("BIRE_BADGE_IMAGE_READY", param3, param4);
        this._badgeId = param1;
        this._image = param2;
    }

    declare private _badgeId: string;

    declare private _image: BitmapData;

    public get badgeId(): string {
        return this._badgeId;
    }

    public get badgeImage(): BitmapData {
        return this._image;
    }
}
