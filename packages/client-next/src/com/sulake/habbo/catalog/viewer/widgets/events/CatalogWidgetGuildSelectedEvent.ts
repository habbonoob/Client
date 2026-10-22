import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetGuildSelectedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetGuildSelectedEvent'); }

    public static readonly NO_GUILD_SELECTED: number = -1;

    declare private _guildId: number;
    static { (this.prototype as any)._guildId = 0; }

    declare private _color1: string;

    declare private _color2: string;

    declare private _badgeCode: string;

    constructor(param1: number, param2: string, param3: string, param4: string) {
        super("GUILD_SELECTED");
        this._guildId = param1;
        this._color1 = param2;
        this._color2 = param3;
        this._badgeCode = param4;
    }

    public get guildId(): number {
        return this._guildId;
    }

    public get color1(): string {
        return this._color1;
    }

    public get color2(): string {
        return this._color2;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }
}
