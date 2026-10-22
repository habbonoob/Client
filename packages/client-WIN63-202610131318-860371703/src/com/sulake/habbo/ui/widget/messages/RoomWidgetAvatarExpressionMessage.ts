import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AvatarExpressionEnum } from '@/com/sulake/habbo/ui/widget/enums/AvatarExpressionEnum';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetAvatarExpressionMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetAvatarExpressionMessage'); }

    public static readonly _SafeStr_7958: string = "RWCM_MESSAGE_AVATAR_EXPRESSION";

    declare private _animation: AvatarExpressionEnum;

    constructor(param1: AvatarExpressionEnum) {
        super("RWCM_MESSAGE_AVATAR_EXPRESSION");
        this._animation = param1;
    }

    public get animation(): AvatarExpressionEnum {
        return this._animation;
    }
}
