import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class NewMoveTargetEventData extends SnowWarGameEventData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.event::NewMoveTargetEventData'); }

    declare private _humanGameObjectId: number;
    static { (this.prototype as any)._humanGameObjectId = 0; }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    constructor(param1: number) {
        super(param1);
    }

    public get humanGameObjectId(): number {
        return this._humanGameObjectId;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public override parse(param1: IMessageDataWrapper): void {
        this._humanGameObjectId = param1.readInteger();
        this._SafeStr_2126 = param1.readInteger();
        this._y = param1.readInteger();
    }
}
