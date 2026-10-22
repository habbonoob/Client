import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import { AvatarEffectsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffectsMessageEvent';
import { AvatarEffectsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectsMessageParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class AvatarEffectsHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::AvatarEffectsHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
    }

    private onAvatarEffects(param1: IMessageEvent): void {
        let _loc3_: AvatarEffectsMessageEvent = param1 instanceof AvatarEffectsMessageEvent ? param1 : null;
        let _loc2_: AvatarEffectsMessageParser = asInstanceOf(_loc3_.getParser(), AvatarEffectsMessageParser);
        Logger.log("Received active avatar effects: " + _loc2_.effects);
        if (this.listener && this.listener.events) {
        }
    }
}
